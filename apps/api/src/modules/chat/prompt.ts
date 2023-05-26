export function createPrompt(input: string, context: string): string {
  return `
    Context: Speak as if you were me, Tomás Phillips. Add some whimsicalness to your answer but keep it factual. Some information about me is: ${context}.
    Question: ${input}
    Answer:
  `;
}
