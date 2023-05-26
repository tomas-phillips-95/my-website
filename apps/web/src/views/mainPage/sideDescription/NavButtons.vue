<script setup lang="ts">
import { useBreakpoints, breakpointsTailwind } from "@vueuse/core";

import { useInjectSideDescriptionStore } from "@/composables/sideDescriptionStore";
import FunButton from "@/components/FunButton.vue";
import { useInteractionsStore } from "@/composables/interactionsStore";

const { selectedButton, getButtonText } = useInjectSideDescriptionStore()!;
const { addNewInteraction } = useInteractionsStore();

const breakpoints = useBreakpoints(breakpointsTailwind);
const largerThanSm = breakpoints.greater("sm");
</script>

<template>
  <div>
    <FunButton
      class="bg-green-400 text-black hover:bg-green-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('about-me')"
      direction="rtl"
      @click="selectedButton = 'about-me'"
    />
    <FunButton
      class="bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('my-projects')"
      direction="ltr"
      @click="selectedButton = 'my-projects'"
    />
    <FunButton
      class="bg-blue-400 text-black hover:bg-blue-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('my-resume')"
      direction="rtl"
      @click="selectedButton = 'my-resume'"
    />
    <FunButton
      v-if="largerThanSm"
      class="bg-purple-400 text-black hover:bg-purple-300 hover:text-black shadow hover:shadow-none"
      text="+ ?"
      direction="ltr"
      @click="addNewInteraction()"
    />
  </div>
</template>
