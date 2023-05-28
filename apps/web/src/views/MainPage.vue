<script setup lang="ts">
import { useTitle } from "@vueuse/core";

import ChatApp from "./mainPage/ChatApp.vue";
import SideDescription from "./mainPage/SideDescription.vue";
import HeaderStuff from "./mainPage/HeaderStuff.vue";

import { useDimmerState } from "@/composables/dimmer";
const { dimmed } = useDimmerState();

useTitle("Tomás Phillips");
</script>

<template>
  <div class="h-full flex flex-col">
    <HeaderStuff class="flex-initial px-6 pt-6 pb-2 md:pb-4 sticky top-0" />
    <div
      class="flex flex-1 space-x-6 justify-between flex-wrap overscroll-none md:overflow-y-auto mr-6 md:mr-0 bg-gray-200 sm:bg-transparent"
    >
      <SideDescription class="flex-1 min-w-[18rem] max-w-[56rem] h-min" />
      <ChatApp class="flex-1 min-w-[18rem] max-w-[42 rem] mt-8 md:mt-0" />
    </div>
  </div>
  <div class="opacity-20">
    <Transition
      enter-active-class="transition-opacity duration-300 ease-in"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-400 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="dimmed" class="fixed w-full h-full bg-gray-600 top-0 left-0" />
    </Transition>
  </div>
</template>
