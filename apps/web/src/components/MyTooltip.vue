<script setup lang="ts">
import { useFloating, autoUpdate, flip, shift, offset } from "@floating-ui/vue";
import {
  useElementHover,
  useAnimate,
  whenever,
  refDebounced,
} from "@vueuse/core";
import { ref } from "vue";

import { useBrowser } from "@/composables";

const { isSafari } = useBrowser();

const reference = ref<HTMLElement | null>(null);
const floating = ref<HTMLElement | null>(null);
const revealer = ref<HTMLElement | null>(null);

const isHovering = useElementHover(reference);
const isHoveringDebounced = refDebounced(isHovering, 200);

const { floatingStyles } = useFloating(reference, floating, {
  whileElementsMounted: autoUpdate,
  middleware: [flip(), shift(), offset(12)],
});

const { playState, play } = useAnimate(
  revealer,
  [
    { width: "100%", "background-color": "#eff2f7" },
    { width: "0%", "background-color": "#eff2f7" },
  ],
  {
    duration: 1000,
    delay: 200,
    immediate: false,
  }
);
const hasPlayed = ref(false);

const randomRotation = ref("");
whenever(isHovering, () => {
  randomRotation.value =
    Math.random() < 0.5 ? "hover:rotate-6" : "hover:-rotate-6";
});
whenever(isHoveringDebounced, () => {
  if (isSafari.value && hasPlayed.value) {
    return;
  }
  play();
  hasPlayed.value = true;
});
</script>

<template>
  <div
    ref="reference"
    class="inline-block transition-transform"
    :class="randomRotation"
  >
    <slot name="content" />
  </div>
  <Transition
    enter-active-class="transition-opacity duration-500 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-500 ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-show="isHoveringDebounced"
      ref="floating"
      :style="floatingStyles"
      class="max-w-[20rem] text-sm py-1 px-8 relative bg-[#e5e7eb] shadow-[0_0_50px_50px_#e5e7eb]"
    >
      <slot name="tooltip" />
      <div
        v-show="playState === 'running'"
        ref="revealer"
        class="absolute h-full w-full bottom-0 right-0 bg-[#e5e7eb] shadow-[0_0_5px_5px_#e5e7eb] ml-auto"
      />
    </div>
  </Transition>
</template>
