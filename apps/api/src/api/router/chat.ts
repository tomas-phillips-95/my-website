import { z } from "zod";

import { publicProcedure, router } from "../trpc";
import { db, chat } from "../../modules";

const Prompt = z.string().min(3).max(240);

export const chatRouter = router({
  getChatResponse: publicProcedure.input(Prompt).mutation(async ({ input }) => {
    const embedding = await chat.openai.getEmbedding(input);
    const mostSimilar = await chat.embedding.findMostSimilarEmbedding(
      embedding,
      db.daos.embeddings.iterateEmbeddings()
    );
    if (!mostSimilar) {
      return "Oops!";
    }
    const prompt = chat.prompt.createPrompt(input, mostSimilar.input); // TODO: handle undefined
    const completion = await chat.openai.getCompletion(prompt);
    return completion;
  }),
});
