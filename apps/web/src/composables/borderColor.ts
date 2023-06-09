import { createGlobalState } from "@vueuse/core";
import { ref } from "vue";

export const useBorderColor = createGlobalState(() => {
  const borderColor = ref("bg-gray-400");
  return {
    borderColor,
  };
});
