<script setup lang="ts">
import { computed } from "vue";

import MyProjects from "./currentDescription/MyProjects.vue";
import MyResume from "./currentDescription/MyResume.vue";
import AboutMe from "./currentDescription/AboutMe.vue";

import { useInjectSideDescriptionStore } from "@/composables/sideDescriptionStore";

const { selectedButton } = useInjectSideDescriptionStore()!;

function getComponent() {
  switch (selectedButton.value) {
    case "about-me":
      return AboutMe;
    case "my-resume":
      return MyResume;
    case "my-projects":
      return MyProjects;
  }
}

const component = computed(getComponent);
</script>

<template>
  <Transition
    mode="out-in"
    enter-active-class="transition-none md:transition-opacity duration-100 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-none md:transition-opacity duration-100 ease-out"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    ><component :is="component"
  /></Transition>
</template>
