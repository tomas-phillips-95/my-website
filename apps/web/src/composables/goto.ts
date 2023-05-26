import { createGlobalState } from "@vueuse/core";

export const useGoto = createGlobalState(() => {
  function embeddings() {
    return {
      name: "Embeddings",
    };
  }

  function chat() {
    return {
      name: "Chat",
    };
  }

  return {
    embeddings,
    chat,
  };
});
