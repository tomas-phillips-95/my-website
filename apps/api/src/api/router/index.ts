import { chatRouter } from "./chat";
import { embeddingsRouter } from "./embeddings";

import { router } from "../trpc";

export const appRouter = router({
  chat: chatRouter,
  embeddings: embeddingsRouter,
});
export type AppRouter = typeof appRouter;
