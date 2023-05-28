<script setup lang="ts">
import { useMouseInElement } from "@vueuse/core";
import { ref, computed } from "vue";

import MovingBit from "./funButton/MovingBit.vue";

import { useIsMobile } from "@/composables/isMobile";

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

const isMobile = useIsMobile();
</script>

<template>
  <button
    ref="button"
    class="rounded-lg w-max group my-1 duration-300 whitespace-nowrap hover:my-0 relative overflow-hidden transition-all hover:rounded-[100%]"
  >
    <div
      class="relative mx-3 my-2 group-hover:my-3 inline-block transition-all duration-300"
    >
      <div
        :class="isMobile ? '' : isOutsideButton ? '' : 'invisible'"
        class="text-xs md:text-base"
      >
        {{ text }}
      </div>
      <div v-if="!isMobile && !isOutsideButton">
        <MovingBit
          v-for="(m, index) in multi"
          :key="index"
          :pos="m"
          :total="totalWords"
          :text="text"
          :direction="direction"
          class="absolute top-0 text-xs md:text-base"
        >
          {{ text }}
        </MovingBit>
      </div>
    </div>
  </button>
</template>
