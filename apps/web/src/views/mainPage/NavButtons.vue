<script setup lang="ts">
import { computed, inject } from "vue";
import { until, useScroll } from "@vueuse/core";

import {
  useNav,
  useIsMobile,
  useInteractionsStore,
  useBorderColor,
} from "@/composables";
import FunButton from "@/components/FunButton.vue";

const { isMobile } = useIsMobile();
const { addNewInteraction } = useInteractionsStore();
const { borderColor } = useBorderColor();

const { currentNav, setNav } = useNav();

const scrollContainer = inject<HTMLElement | null>("scrollContainer");
const { y: scrollY } = useScroll(scrollContainer, { behavior: "smooth" });
const isScrollTop = computed(() => scrollY.value === 0);

type Nav = "about-me" | "my-projects" | "my-resume";

const getButtonText = computed(() => {
  return isMobile.value
    ? (nav: Nav) => {
        let text: string;
        switch (nav) {
          case "about-me":
            text = "About me";
            break;
          case "my-projects":
            text = "Projects";
            break;
          case "my-resume":
            text = "Resume";
            break;
        }
        return nav === currentNav.value ? text.toUpperCase() : text;
      }
    : (nav: Nav) => {
        let text: string;
        switch (nav) {
          case "about-me":
            text = "About me";
            break;
          case "my-projects":
            text = "My projects";
            break;
          case "my-resume":
            text = "My resume";
            break;
        }
        return nav === currentNav.value ? text.toUpperCase() : text;
      };
});

async function buttonSetNav(nav: Nav) {
  scrollY.value = 0;
  await until(isScrollTop).toBe(true);
  setNav(nav);
  setBorderColor(nav);
}

function setBorderColor(nav: Nav) {
  switch (nav) {
    case "about-me":
      borderColor.value = "bg-green-400";
      break;
    case "my-projects":
      borderColor.value = "bg-yellow-300";
      break;
    case "my-resume":
      borderColor.value = "bg-blue-400";
      break;
  }
}

setBorderColor(currentNav.value);
</script>

<template>
  <div class="flex space-x-2">
    <FunButton
      class="bg-green-400 text-black hover:bg-green-300 hover:text-black hover:shadow-none"
      :class="{
        'shadow-md': currentNav !== 'about-me',
      }"
      :text="getButtonText('about-me')"
      direction="rtl"
      @click="buttonSetNav('about-me')"
    />
    <FunButton
      class="bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black hover:shadow-none"
      :class="{
        'shadow-md': currentNav !== 'my-projects',
      }"
      :text="getButtonText('my-projects')"
      direction="ltr"
      @click="buttonSetNav('my-projects')"
    />
    <FunButton
      class="bg-blue-400 text-black hover:bg-blue-300 hover:text-black hover:shadow-none"
      :class="{
        'shadow-md': currentNav !== 'my-resume',
      }"
      :text="getButtonText('my-resume')"
      direction="rtl"
      @click="buttonSetNav('my-resume')"
    />
    <FunButton
      class="bg-purple-400 text-black hover:bg-purple-300 shadow-md hover:text-black hover:shadow-none hidden md:block"
      text="+ ?"
      direction="ltr"
      @click="addNewInteraction()"
    />
  </div>
</template>
