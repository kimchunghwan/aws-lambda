import { APIGatewayEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';
import * as AWS from 'aws-sdk';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  const lambda = new AWS.Lambda();

  const params = {
    FunctionName: 'function_01',
    InvocationType: 'RequestResponse',
    Payload: JSON.stringify(event),
  };

  try {
    const result = await lambda.invoke(params).promise();
    console.log('Result from another Lambda:', result);
    
  } catch (error) {
    console.error('Error invoking another Lambda:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error invoking another Lambda',
        error: (error as Error).message,
      }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda! updated 11111 2222',
      input: event,
    }),
  };
};
