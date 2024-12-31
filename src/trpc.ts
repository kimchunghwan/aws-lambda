import * as trpc from '@trpc/server';
import { z } from 'zod';

type Context = {
  // Define the properties of your context here
};
// [...]
export const appRouter = trpc.router<Context>().query('hello', {
  input: z
    .object({
      text: z.string().nullish(),
    })
    .nullish(),
  resolve({ input }) {
    return {
      greeting: `hello ${input?.text ?? 'world'}`,
    };
  },
});
export type AppRouter = typeof appRouter;