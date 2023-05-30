<script setup lang="ts">
import { useTitle } from "@vueuse/core";

import ChatApp from "./mainPage/ChatApp.vue";
import PageContent from "./mainPage/PageContent.vue";
import HeaderStuff from "./mainPage/HeaderStuff.vue";

import { useDimmerState } from "@/composables/dimmer";
const { dimmed } = useDimmerState();

useTitle("Tomás Phillips");
</script>

<template>
  <div class="flex flex-col p-6">
    <HeaderStuff class="flex-initial pb-3" />
    <div class="flex flex-1 bg-gray-200 pt-3">
      <PageContent class="flex-1 max-w-[56rem]" />
      <ChatApp />
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
