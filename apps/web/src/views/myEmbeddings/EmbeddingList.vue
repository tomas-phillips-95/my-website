<script setup lang="ts">
import { useAsyncState } from "@vueuse/core";
import { computed, watch } from "vue";
import { UseMouseInElement } from "@vueuse/components";

import { client } from "@/client";

const {
  isLoading: isLoadingEmbeddings,
  state: embeddingsResult,
  execute: getEmbeddings,
} = useAsyncState(client.embeddings.get.query, null, {
  resetOnExecute: false,
});

const { isReady: isDeleted, execute: deleteEmbedding } = useAsyncState(
  client.embeddings.delete.mutate,
  null,
  { immediate: false }
);

watch(isDeleted, (isDeleted) => {
  if (isDeleted) {
    getEmbeddings();
  }
});

const embeddings = computed(() => {
  if (embeddingsResult.value) {
    return embeddingsResult.value.results;
  }
  return [];
});
</script>

<template>
  <div
    v-if="embeddings.length === 0 && isLoadingEmbeddings"
    class="p-2 text-sm cursor-default"
  >
    Loading...
  </div>
  <div
    v-else-if="embeddingsResult && embeddings.length > 0"
    class="w-full border divide-y cursor-default"
  >
    <div v-for="embedding in embeddings" :key="embedding.id">
      <UseMouseInElement
        v-slot="{ isOutside }"
        class="flex text-sm space-x-4 items-center p-2"
      >
        <div
          class="basis-24 overflow-hidden text-ellipsis flex-none text-gray-500 text-xs"
          :title="embedding.id"
        >
          {{ embedding.id }}
        </div>
        <div class="grow">{{ embedding.input }}</div>
        <button
          class="ml-auto bg-gray-200 h-6 py-0.5 px-1.5 border border-gray-300 rounded cursor-default text-xs hover:bg-gray-300"
          :class="isOutside ? 'invisible' : ''"
          @click="deleteEmbedding(undefined, embedding.id)"
        >
          Delete
        </button>
      </UseMouseInElement>
    </div>
  </div>
  <div v-else class="p-2 text-sm cursor-default">No results...</div>
</template>
