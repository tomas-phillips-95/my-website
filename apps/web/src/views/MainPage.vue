<script setup lang="ts">
import {
  useTitle,
  useFavicon,
  useIntervalFn,
  useCycleList,
} from "@vueuse/core";

import ChatApp from "./mainPage/ChatApp.vue";
import PageContent from "./mainPage/PageContent.vue";
import HeaderStuff from "./mainPage/HeaderStuff.vue";

import PeachUrl from "@/assets/peach.ico";
import AppleUrl from "@/assets/apple.ico";
import PearUrl from "@/assets/pear.ico";
import CherryUrl from "@/assets/cherry.ico";
import { useDimmerState } from "@/composables/dimmer";
const { dimmed } = useDimmerState();

const { state: faviconUrl, next } = useCycleList([
  AppleUrl,
  PeachUrl,
  PearUrl,
  CherryUrl,
]);

useFavicon(faviconUrl);
useTitle("Tomás Phillips");

useIntervalFn(next, 5000);
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
