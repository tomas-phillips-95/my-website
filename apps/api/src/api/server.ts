import * as trpcExpress from "@trpc/server/adapters/express";
import express, { Request, Response } from "express";
import cors from "cors";

import { appRouter } from "./router";
import { createContext } from "./trpc";

import { db } from "@/modules";

async function server() {
  const app = express();
  app.use(
    cors({
      origin: process.env.MY_WEBSITE_ORIGIN,
    })
  );
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
  return app;
}

export const app = server();
