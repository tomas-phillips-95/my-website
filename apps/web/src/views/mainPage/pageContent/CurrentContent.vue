<script setup lang="ts">
import { computed, type Component } from "vue";

import MyProjects from "./currentContent/MyProjects.vue";
import MyResume from "./currentContent/MyResume.vue";
import AboutMe from "./currentContent/AboutMe.vue";

import { useNav } from "@/composables";

const { currentNav } = useNav();

function getComponent(): Component {
  switch (currentNav.value) {
    case "AboutMe":
      return AboutMe;
    case "MyResume":
      return MyResume;
    case "MyProjects":
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
