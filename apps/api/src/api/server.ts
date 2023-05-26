import * as trpcExpress from "@trpc/server/adapters/express";
import express, { Request, Response } from "express";
import cors from "cors";

import { appRouter } from "./router";
import { createContext } from "./trpc";

import { db } from "@/modules";

async function server() {
  const app = express();
  app.use(cors());
  app.use(async (_req: Request, _res: Response, next) => {
    db.connect();
    next();
  });
  app.use(
    "/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  app.listen(2021, () => {
    console.log("listening on port 2021");
  });
  return app;
}

export const app = server();
