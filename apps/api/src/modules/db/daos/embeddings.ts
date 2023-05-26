import { ObjectId } from "mongodb";

import { getCollection } from "../init";

type Embedding = {
  _id: ObjectId;
  input: string;
  embedding: number[];
};

const getEmbeddingCollection = () => getCollection("embedding-store");

export async function listEmbeddings({
  next,
  limit = 10,
}: {
  next?: string;
  limit?: number;
} = {}) {
  const embeddingCollection = await getEmbeddingCollection();
  const query = next ? { _id: { $lt: new ObjectId(next) } } : {};
  const results = (await embeddingCollection
    .find(query)
    .sort({
      _id: -1,
    })
    .limit(limit)
    .toArray()) as Embedding[];
  const nextId = results[results.length - 1]?._id;
  return { embeddings: results, nextId };
}

export async function createEmbedding(input: string, embedding: number[]) {
  const embeddingCollection = await getEmbeddingCollection();
  return await embeddingCollection.insertOne({ input, embedding });
}

export async function getEmbedding(id: string) {
  const embeddingCollection = await getEmbeddingCollection();
  return await embeddingCollection.findOne({ _id: new ObjectId(id) });
}

export async function deleteEmbedding(id: string) {
  const embeddingCollection = await getEmbeddingCollection();
  await embeddingCollection.deleteOne({ _id: new ObjectId(id) });
}

export async function updateEmbedding(id: string, embedding: number[]) {
  const embeddingCollection = await getEmbeddingCollection();
  await embeddingCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { embedding } }
  );
}

export async function* iterateEmbeddings() {
  const embeddingCollection = await getEmbeddingCollection();
  const cursor = embeddingCollection
    .find()
    .filter({ embedding: { $exists: true } }); // TODO: iterate in batch?
  while (await cursor.hasNext()) {
    yield (await cursor.next()) as Embedding;
  }
}
