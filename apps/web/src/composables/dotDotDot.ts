import { ref, watch, type Ref, readonly } from "vue";
import { useIntervalFn } from "@vueuse/core";

export function useDotDotDot(running: Ref<boolean>) {
  const dotDotDot = ref("");

  const { resume, pause } = useIntervalFn(
    () => {
      dotDotDot.value += ".";
      if (dotDotDot.value.length > 3) {
        dotDotDot.value = "";
      }
    },
    500,
    { immediate: false }
  );

  watch(
    running,
    (running) => {
      if (running) {
        dotDotDot.value = "";
        resume();
      } else {
        pause();
      }
    },
    { immediate: true }
  );

  return {
    dotDotDot: readonly(dotDotDot),
  };
}
