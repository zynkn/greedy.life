import * as AWS from 'aws-sdk';

module.exports.hello = async event => {
  async function send(connectionId, data){
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
      return apigwManagementApi.postToConnection(params).promise();
    }catch(e){
      throw e;
    }
  }
  try{
    if(event.requestContext.routeKey === '$connect'){
      send(event.requestContext.connectionId, "Connected!");
    }
    return {
      statusCode: 200,
      body: 'connected'
    };
  }catch(e){
    return {
      statusCode: 500,
      body: 'eorror'
    };
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};
