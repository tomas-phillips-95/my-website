/**
 * Finds the most similar embedding to the given input.
 * @param embeddingInput The embedding to compare against.
 * @param embeddingIterator An iterator of embeddings to compare against.
 * @returns The most similar embedding.
 */
export async function findMostSimilarEmbedding(
  embeddingInput: number[],
  embeddingIterator: AsyncIterable<{ input: string; embedding: number[] }>
) {
  let highestScore: number | undefined;
  let bestMatch: { input: string; embedding: number[] } | undefined;
  for await (const embedding of embeddingIterator) {
    const score = getCosineSimilarity(embeddingInput, embedding.embedding);
    if (highestScore === undefined || score > highestScore) {
      highestScore = score;
      bestMatch = embedding;
    }
  }
  return bestMatch;
}

/**
 * Calculates the cosine similarity between two vectors.
 * @param a The first vector.
 * @param b The second vector.
 * @returns The cosine similarity between the two vectors.
 */
function getCosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  normA = Math.sqrt(normA);
  normB = Math.sqrt(normB);
  return dotProduct / (normA * normB);
}
