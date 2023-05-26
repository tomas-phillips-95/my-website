<script setup lang="ts">
import { useAsyncState } from "@vueuse/core";
import { computed, ref, watch } from "vue";

import { client } from "@/client";

const { isReady: isEmbeddingCreated, execute: createEmbedding } = useAsyncState(
  client.embeddings.create.mutate,
  null,
  { immediate: false }
);

const createEmbeddingInput = ref("");
const rows = computed(() => {
  return createEmbeddingInput.value.split("\n").length;
});

const buttonDisabled = computed(() => {
  return createEmbeddingInput.value.length < 50;
});

watch(isEmbeddingCreated, (isEmbeddingCreated) => {
  if (isEmbeddingCreated) {
    createEmbeddingInput.value = "";
  }
});
</script>

<template>
  <div class="flex p-2 text-sm border-t border-x space-x-2">
    <textarea
      v-model="createEmbeddingInput"
      class="text-sm inline-block grow resize-none place-self-center whitespace-nowrap"
      :rows="rows"
      placeholder="Enter text to create an embedding."
    />
    <button
      class="bg-gray-200 py-0.5 px-1.5 border h-6 border-gray-300 rounded ml-auto cursor-default text-xs"
      :class="buttonDisabled ? 'opacity-50' : 'hover:bg-gray-300'"
      :disabled="buttonDisabled"
      @click="createEmbedding(undefined, { input: createEmbeddingInput })"
    >
      Create
    </button>
  </div>
</template>
