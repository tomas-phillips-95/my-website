import { computed, ref, watch, type Ref, onUnmounted } from "vue";
import { createGlobalState } from "@vueuse/core";
import { nanoid } from "nanoid";

export const useDimmerState = createGlobalState(() => {
  const dimmers = ref<string[]>([]);
  const dimmed = computed(() => dimmers.value.length > 0);

  function addDimmer() {
    const id = nanoid();
    dimmers.value.push(id);
    return id;
  }
  function removeDimmer(id: string) {
    dimmers.value = dimmers.value.filter((dimmer) => dimmer !== id);
  }

  return {
    dimmed,
    addDimmer,
    removeDimmer,
  };
});

export function useDimmer(bool: Ref<boolean>) {
  const { addDimmer, removeDimmer } = useDimmerState();
  const dimmerId = ref<string | null>(null);

  watch(bool, (value) => {
    if (value) {
      dimmerId.value = addDimmer();
    } else {
      if (!dimmerId.value) return;
      removeDimmer(dimmerId.value);
    }
  });

  onUnmounted(() => {
    if (!dimmerId.value) return;
    removeDimmer(dimmerId.value);
  });
}
