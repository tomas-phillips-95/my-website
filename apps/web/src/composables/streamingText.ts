import { ref, type Ref, watch, readonly } from "vue";
import { useIntervalFn, reactify } from "@vueuse/core";

export function useStreamingText(fulltext: Ref<string>) {
  const remainingText = ref(fulltext.value);
  const streamingText = ref("");
  const currentChar = ref<string | undefined>();
  const currentTimeout = reactify(getDelay)(currentChar);

  const { pause, resume } = useIntervalFn(
    () => {
      currentChar.value = remainingText.value.charAt(0);
      remainingText.value = remainingText.value.slice(1);
      streamingText.value = streamingText.value + currentChar.value;
    },
    currentTimeout,
    { immediate: false }
  );

  watch(fulltext, (newText) => {
    pause();
    remainingText.value = newText;
    streamingText.value = "";
    resume();
  });

  watch(remainingText, (remaining) => {
    if (remaining === "") {
      pause();
    }
  });

  return {
    streamingText: readonly(streamingText),
    start: resume,
  };
}

function getDelay(char: string | undefined) {
  switch (char) {
    case ".":
      return 500;
    case "!":
      return 500;
    case ",":
      return 125;
    default:
      return 40;
  }
}
