import { inferAsyncReturnType, initTRPC } from "@trpc/server";
import * as trpcExpress from "@trpc/server/adapters/express";

export const createContext = ({
  req,
}: trpcExpress.CreateExpressContextOptions) => ({ req });
type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const router = t.router;
export const publicProcedure = t.procedure;
