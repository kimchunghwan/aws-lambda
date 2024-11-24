import { APIGatewayEvent, Context, Callback, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
): Promise<APIGatewayProxyResult> => {
  console.log('Received event:', JSON.stringify(event, null, 2));

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda! updated 11111 2222',
      input: event,
    }),
  };
};
