import * as AWS from 'aws-sdk';
const DYNAMO_DB:any = new AWS.DynamoDB.DocumentClient();
export async function join(evt:any){
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
  async function getAllId(){
    try{
      const params = {
        TableName: 'greedy.life.websocket',
      };
      const { Items }: any = await DYNAMO_DB.scan(params)
        .promise()
      return Items.map(item => {
        return item.connectionId;
      });
    }catch(e){
      throw e;
    }

  };
  
  
  try{
    const { routeKey, connectionId, eventType} = evt.requestContext;
    console.log(routeKey);
    if(routeKey === 'join'){
      const ids = await getAllId();
      console.log(ids);
      await send(connectionId, `{count: ${ids.length}}` );
      for await (let id of ids){
        console.log(id);
        if(id !== connectionId){
          await send(id, `{count: ${ids.length}}` );
        }
      }

    }
    return {statusCode: 200, body: 'connected'}
  }catch(e){
    return { statusCode: 200, body: 'error'}
  }
}