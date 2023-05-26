import { getCollection } from "./init";

export async function getEmbeddingStore() {
  const collection = await getCollection("embedding-store");
  return collection;
}
