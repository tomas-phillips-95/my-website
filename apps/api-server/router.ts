import { initTRPC } from "@trpc/server";
import * as schemas from "./schemas";

const t = initTRPC.create();

export const appRouter = t.router({
  greetPerson: t.procedure.input(schemas.Person).query(({ input: name }) => {
    return `Hello ${name}!`;
  }),
});

export type AppRouter = typeof appRouter;
