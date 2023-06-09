<script setup lang="ts">
import { useTitle, useFavicon } from "@vueuse/core";
import { provide, ref } from "vue";

import ChatApp from "./mainPage/ChatApp.vue";
import PageContent from "./mainPage/PageContent.vue";
import HeaderStuff from "./mainPage/HeaderStuff.vue";
import NavButtons from "./mainPage/NavButtons.vue";

import FaviconUrl from "@/assets/favicon.ico";
import { useDimmerState, useBorderColor } from "@/composables";

const { borderColor } = useBorderColor();
const { dimmed } = useDimmerState();

useFavicon(FaviconUrl);
useTitle("Tomás Phillips");

const scrollContainer = ref<HTMLElement | null>();
provide("scrollContainer", scrollContainer);
</script>

<template>
  <div
    class="absolute top-0 left-0 h-screen w-screen p-2 md:p-3 leading-6 overflow-hidden transition-colors duration-500"
    :class="borderColor"
  >
    <div
      ref="scrollContainer"
      class="h-full w-full overflow-y-scroll bg-gray-200"
    >
      <div class="flex flex-col p-6 md:p-8">
        <HeaderStuff class="flex-initial pb-3 md:pb-4" />
        <NavButtons
          class="sticky top-0 py-3 md:py-4 border-y border-gray-300 bg-gray-200"
        />
        <div class="flex flex-1 bg-gray-200 pt-3 md:pt-4">
          <PageContent class="flex-1" />
          <ChatApp />
        </div>
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
        <div
          v-if="dimmed"
          class="fixed w-full h-full bg-gray-600 top-0 left-0"
        />
      </Transition>
    </div>
  </div>
</template>
