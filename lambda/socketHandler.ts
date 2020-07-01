import * as AWS from 'aws-sdk';
import moment from 'moment-timezone';

const dynamoDB:any = new AWS.DynamoDB.DocumentClient();
function response(statusCode: number, body: object) {
  return {
    statusCode: statusCode || 500,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify(body)
  };
};
export const getAllId = async () => {
  const params = {
    TableName: 'greedy.life.websocket',
  };
  const { Items }: any = await dynamoDB.scan(params)
    .promise()
    .catch(e => {
      throw e;
    });
  return Items.map(item => {
    return item.connectionId;
  });
};
const send = async (connectionId: string, data: any) => {
  try {

    const endpoint = 'ls82o57330.execute-api.ap-northeast-1.amazonaws.com/dev';
    const apigwManagementApi = new AWS.ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint: endpoint
    });
    const params = {
      ConnectionId: connectionId,
      Data: data || 'default data'
    };
    console.log(`getConnectionId start: params: ${JSON.stringify(params)}`);
    return apigwManagementApi.postToConnection(params).promise().catch((e) => {
      console.log('websocket error', e);
      return e;
    });
  } catch (e) {
    console.error(e);
    return 'error';
  }
}
export const socketHandler = async (evt:any) => {
  async function putConnection() {
    const params = {
      TableName: 'greedy.life.websocket',
      Item: {
        connectionId: evt.requestContext.connectionId,
        connectionStatus: evt.requestContext.eventType,
        routeKey: evt.requestContext.routeKey,
        createdAt: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss:SSS')
      }
    };
    console.log('----')
    console.log(JSON.stringify(params));
    const res = await dynamoDB.put(params)
      .promise()
      .catch(e => {
        throw e;
      });
    return res;
  }
  async function deleteConnection(){
    const params = {
      TableName: 'greedy.life.websocket',
      Key: {
        connectionId: evt.requestContext.connectionId,
      }
    }
    await dynamoDB.delete(params).promise().catch((e:any) => { throw e });

    return null;
  }
  try {
    const receiveAt = moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss.SSS');
    console.log(evt.body);
    console.log(evt.requestContext.routeKey);
    if (evt.requestContext.routeKey === '$connect') {
      await putConnection();
      send(evt.requestContext.connectionId,'Hello World!')
      console.log('connecteed')
      //await putConnection(groupId, uid);
    } 
    else if(evt.requestContext.routeKey === '$disconnect'){
      await deleteConnection();
    } else {
      const ids = await getAllId();
      console.log(ids);
      ids.forEach((id:any)=>{
        send(id, JSON.stringify({message: evt.body, sender: evt.requestContext.connectionId, time: receiveAt}));
      })
      // send(evt.requestContext.connectionId, evt.body)
      console.log(`disconnected`);
    }
    return response(200, { message: 'connected' });
  } catch ({ statusCode, message, ...e }) {
    console.error(JSON.stringify({ ...e, message: message }));
    return response(statusCode, { ...e, message: message });
  }
};


