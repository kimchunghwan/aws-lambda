import { APIGatewayEvent, Context as ContextLambda, Callback, APIGatewayProxyResult, APIGatewayProxyEventV2 } from 'aws-lambda';
import { inferAsyncReturnType, initTRPC } from '@trpc/server';
import { awsLambdaRequestHandler, CreateAWSLambdaContextOptions } from '@trpc/server/adapters/aws-lambda';


const createContext = ({
  event,
  context,
}: CreateAWSLambdaContextOptions<APIGatewayProxyEventV2>) => ({})
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

const appRouter = t.router({
  hello: t.procedure.query(() => {
    return 'Hello from tRPC!';
  }),
  bye: t.procedure.query(() => {
    return "Hello from tRPC! path={'bye'}"; 
  })
});

export const handler = awsLambdaRequestHandler({
  router: appRouter,
  createContext,
});
