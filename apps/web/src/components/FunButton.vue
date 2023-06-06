<script setup lang="ts">
import { useMouseInElement } from "@vueuse/core";
import { ref, computed } from "vue";

import MovingBit from "./funButton/MovingBit.vue";

import { useIsMobile, useBrowser } from "@/composables";

const props = withDefaults(
  defineProps<{
    text: string;
    totalWords?: number;
    direction?: "ltr" | "rtl";
  }>(),
  {
    totalWords: 12,
    direction: "ltr",
  }
);

const button = ref<HTMLButtonElement | null>(null);
const { isOutside: isOutsideButton } = useMouseInElement(button, {
  initialValue: { x: -1000, y: -1000 },
});

const multi = computed(() =>
  Array.from({ length: props.totalWords }, (_, i) => i - props.totalWords / 2)
);

const { isMobile } = useIsMobile();
const { isChrome } = useBrowser();

const isFun = computed(() => !isMobile.value && isChrome.value);
</script>

<template>
  <button
    ref="button"
    class="rounded-lg w-max group my-1 whitespace-nowrap duration-300 relative overflow-hidden hover:rounded-[100%]"
    :class="{
      'hover:my-0': isFun,
    }"
  >
    <div
      class="relative mx-3 my-2 inline-block duration-300"
      :class="{
        'group-hover:my-3': isFun,
      }"
    >
      <div :class="!isFun ? '' : isOutsideButton ? '' : 'invisible'">
        {{ text }}
      </div>
      <div v-if="isFun && !isOutsideButton">
        <MovingBit
          v-for="(m, index) in multi"
          :key="index"
          :pos="m"
          :total="totalWords"
          :text="text"
          :direction="direction"
          class="absolute top-0"
        >
          {{ text }}
        </MovingBit>
      </div>
    </div>
  </button>
</template>
