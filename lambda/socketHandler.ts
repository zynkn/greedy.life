import * as AWS from 'aws-sdk';

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
export const socketHandler = async (evt:any) => {
  async function putConnection() {
    const params = {
      TableName: 'smatoos_websocket',
      Item: {
        connectionId: evt.requestContext.connectionId,
        connectionStatus: evt.requestContext.eventType,
        routeKey: evt.requestContext.routeKey,
      }
    };
    const res = await dynamoDB.put(params)
      .promise()
      .catch(e => {
        throw e;
      });
    return res;
  }
  try {
    await putConnection();
    console.log(evt);
    console.log(evt.requestContext);
    console.log(evt.requestContext.routeKey);
    if (evt.requestContext.routeKey === '$connect') {
      console.log('connecteed')
      //await putConnection(groupId, uid);
    } else {
      console.log(`else`);
    }
    return response(200, { message: 'connected' });
  } catch ({ statusCode, message, ...e }) {
    console.error(JSON.stringify({ ...e, message: message }));
    return response(statusCode, { ...e, message: message });
  }
};

