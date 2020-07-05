import * as AWS from 'aws-sdk';
import moment from 'moment-timezone';

const DYNAMO_DB:any = new AWS.DynamoDB.DocumentClient();

export async function connectionManager(evt:any ){

  async function send(connectionId:string, data: string){
    try{
      const endpoint = 'ls82o57330.execute-api.ap-northeast-1.amazonaws.com/dev';
      const apigwManagementApi = new AWS.ApiGatewayManagementApi({
        apiVersion: '2018-11-29',
        endpoint: endpoint
      });
      const params = {
        ConnectionId: connectionId,
        Data: data || 'NULL'
      };
      return apigwManagementApi.postToConnection(params).promise()
    }catch(e){
      throw e;
    }

  }
  async function putConnectionId(item:any){
    try{
      const params = {
        TableName: 'greedy.life.websocket',
        Item: item
      };
      const result = await DYNAMO_DB.put(params).promise();
      return result;
    }catch(e){
      throw e;
    }
  }
  async function deleteConnectionId(connectionId:string){
    try{
      const params = {
        TableName: 'greedy.life.websocket',
        Key:{
          connectionId
        }
      }
      const result = await DYNAMO_DB.delete(params).promise();
      return result;
    }catch(e){
      throw e;
    }
  }
  try{
    const { routeKey, connectionId, eventType} = evt.requestContext;
    if(routeKey === '$connect'){
      //await send(connectionId,'connected');
      await putConnectionId({connectionId, routeKey, eventType, createdAt: moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss.SSS')})
    }else if(routeKey === '$disconnect'){
      await deleteConnectionId(connectionId);
    }
    return {statusCode: 200, body: 'connected'}
  }catch(e){
    return { statusCode: 200, body: 'error'}
  }
}