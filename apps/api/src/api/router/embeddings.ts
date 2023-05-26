import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import {
  db,
  // chat
} from "../../modules";

const EmbeddingListQuery = z
  .object({
    next: z.string().optional(),
    count: z.number().optional(),
  })
  .optional();

// const EmbeddingCreate = z.object({
//   input: z.string().min(50),
// });

export const embeddingsRouter = router({
  get: publicProcedure.input(EmbeddingListQuery).query(async ({ input }) => {
    const { nextId, embeddings } = await db.daos.embeddings.listEmbeddings({
      next: input?.next,
      limit: input?.count,
    });
    return {
      next: nextId?.toString(),
      results: embeddings.map(({ embedding, _id, input }) => ({
        id: _id.toString(),
        input,
        embedding,
      })),
    };
  }),
  // create: publicProcedure.input(EmbeddingCreate).mutation(async ({ input }) => {
  //   const embedding = await chat.openai.getEmbedding(input.input);
  //   const { insertedId } = await db.daos.embeddings.createEmbedding(
  //     input.input,
  //     embedding
  //   );
  //   return { id: insertedId.toString(), input: input.input, embedding };
  // }),
  // delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
  //   await db.daos.embeddings.deleteEmbedding(input);
  // }),
});
