import { Configuration, OpenAIApi } from "openai";

const EMBEDDING_MODEL = "text-embedding-ada-002";
const COMPLETIONS_MODEL = "text-davinci-003";

let openai: OpenAIApi | undefined;

function getOpenai(): OpenAIApi {
  if (!openai) {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    openai = new OpenAIApi(configuration);
  }
  return openai;
}

/**
 * Get the embedding for a string.
 * @param input The string to get the embedding for.
 * @returns The embedding for the string.
 */
export async function getEmbedding(input: string) {
  const openai = getOpenai();
  const result = await openai.createEmbedding({
    model: EMBEDDING_MODEL,
    input,
  });
  return result.data.data[0].embedding;
}

/**
 * Get the completion for a string.
 * @param input The string to get the completion for.
 * @returns The completion for the string.
 */
export async function getCompletion(input: string) {
  const openai = getOpenai();
  const result = await openai.createCompletion({
    model: COMPLETIONS_MODEL,
    prompt: input,
    max_tokens: 124,
  });
  return result.data.choices[0].text as string;
}
