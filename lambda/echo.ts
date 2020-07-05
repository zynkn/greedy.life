import * as AWS from 'aws-sdk';

export async function echo(evt:any){
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
  try{
    const { routeKey, connectionId, eventType} = evt.requestContext;
    if(routeKey === 'echo'){
      await send(connectionId, `Echod:: ${eventType}, ${connectionId}` )
    }
    return {statusCode: 200, body: 'connected'}
  }catch(e){
    return { statusCode: 200, body: 'error'}

  }
}