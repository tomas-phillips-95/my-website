<script setup lang="ts">
import ChatInteraction from "./chatApp/ChatInteraction.vue";

import { useInteractionsStore } from "@/composables/interactionsStore";

const { interactions } = useInteractionsStore();
</script>

<template>
  <TransitionGroup
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    enter-active-class="transition-all ease-out duration-300"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
    leave-active-class="transition-all ease-in duration-200"
  >
    <ChatInteraction
      v-for="(interaction, index) in interactions"
      :key="interaction.id"
      v-model="interactions[index]"
      :index="index"
    />
  </TransitionGroup>
</template>
