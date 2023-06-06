<script setup lang="ts">
import { computed } from "vue";
import { until, useWindowScroll } from "@vueuse/core";

import { useNav, useIsMobile, useInteractionsStore } from "@/composables";
import FunButton from "@/components/FunButton.vue";

const { isMobile } = useIsMobile();
const { addNewInteraction } = useInteractionsStore();

const { currentNav, setNav } = useNav();

const { y: scrollY } = useWindowScroll();
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
  window.scrollTo({ top: 0, behavior: "smooth" });
  await until(isScrollTop).toBe(true);
  setNav(nav);
}
</script>

<template>
  <div class="flex space-x-2">
    <FunButton
      class="bg-green-400 text-black hover:bg-green-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('about-me')"
      direction="rtl"
      @click="buttonSetNav('about-me')"
    />
    <FunButton
      class="bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('my-projects')"
      direction="ltr"
      @click="buttonSetNav('my-projects')"
    />
    <FunButton
      class="bg-blue-400 text-black hover:bg-blue-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('my-resume')"
      direction="rtl"
      @click="buttonSetNav('my-resume')"
    />
    <FunButton
      class="bg-purple-400 text-black hover:bg-purple-300 hover:text-black shadow hover:shadow-none hidden md:block"
      text="+ ?"
      direction="ltr"
      @click="addNewInteraction()"
    />
  </div>
</template>
