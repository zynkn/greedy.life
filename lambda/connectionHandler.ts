import * as AWS from 'aws-sdk';
import moment from 'moment-timezone';

const DYNAMO_DB:any = new AWS.DynamoDB.DocumentClient();
export async function connectionHandler(evt:any){
  async function putConnectionId(connectionId:string, eventType:string, routeKey:string){
    try{
      const params = {
        TableName: 'greedy.life.websocket',
        Item: {
          connectionId,
          connectionStatus: eventType,
          routeKey,
          createdAt: moment().tz('Asia/Seou').format('YYYY-MM-DD HH:mm:ss:SSS') 
        }
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
  async function sendMessage(connectionId: string, data:string){
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
      console.log(`SEND MESSAGE : ${JSON.stringify(params)}`);
      return apigwManagementApi.postToConnection(params).promise()
    }catch(e){
      throw e;
    }
  }
  try{
    console.log(evt.requestContext);
    const {routeKey, connectionId, eventType} = evt.requestContext;
    console.log(`connectionHandler, ${routeKey}, ${connectionId}, ${eventType}`);

    if(routeKey === '$connect'){
      const result = await putConnectionId(connectionId, eventType, routeKey);
      const response = await sendMessage(connectionId, "Connect!");

      console.log(result);
      //console.log(response);
      console.log('connect success')
    }else if(routeKey === '$disconnect'){
      const result = await deleteConnectionId(connectionId);
      console.log(result);
      console.log('delete Success')
    }
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type, X-Amz-Date, Authorization, X-Api-Key, X-Amz-Security-Token',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: `JSON.stringify(body)`
    };
  }catch({statusCode, message, ...e}){
    console.log('ERror');
    console.log(JSON.stringify(e));
    return null;
  }
}