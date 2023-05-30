<script setup lang="ts">
import { computed, type UnwrapRef } from "vue";

import FunButton from "@/components/FunButton.vue";
import { useInteractionsStore } from "@/composables/interactionsStore";
import { useNav, useIsMobile } from "@/composables";

const { currentNav } = useNav();
const { isMobile } = useIsMobile();
const { addNewInteraction } = useInteractionsStore();

const getButtonText = computed(() => {
  return isMobile.value
    ? (nav: UnwrapRef<typeof currentNav>) => {
        let text: string;
        switch (nav) {
          case "AboutMe":
            text = "About me";
            break;
          case "MyProjects":
            text = "Projects";
            break;
          case "MyResume":
            text = "Resume";
            break;
        }
        return nav === currentNav.value ? text.toUpperCase() : text;
      }
    : (nav: UnwrapRef<typeof currentNav>) => {
        let text: string;
        switch (nav) {
          case "AboutMe":
            text = "About me";
            break;
          case "MyProjects":
            text = "My projects";
            break;
          case "MyResume":
            text = "My resume";
            break;
        }
        return nav === currentNav.value ? text.toUpperCase() : text;
      };
});
</script>

<template>
  <div class="flex space-x-2">
    <FunButton
      class="bg-green-400 text-black hover:bg-green-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('AboutMe')"
      direction="rtl"
      @click="currentNav = 'AboutMe'"
    />
    <FunButton
      class="bg-yellow-400 text-black hover:bg-yellow-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('MyProjects')"
      direction="ltr"
      @click="currentNav = 'MyProjects'"
    />
    <FunButton
      class="bg-blue-400 text-black hover:bg-blue-300 hover:text-black shadow hover:shadow-none"
      :text="getButtonText('MyResume')"
      direction="rtl"
      @click="currentNav = 'MyResume'"
    />
    <FunButton
      class="bg-purple-400 text-black hover:bg-purple-300 hover:text-black shadow hover:shadow-none hidden md:block"
      text="+ ?"
      direction="ltr"
      @click="addNewInteraction()"
    />
  </div>
</template>
