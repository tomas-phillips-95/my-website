<script setup lang="ts">
import { ref, watch } from "vue";
import { client } from "./client";
import { useDebounce } from "@vueuse/core";

const name = ref("");
const greeting = ref<string | undefined>();
const nameDebounced = useDebounce(name, 1000);

watch(nameDebounced, async (name) => {
  const myGreeting = await client.greetPerson.query(name);
  greeting.value = myGreeting;
});
</script>

<template id="app">
  <label>Name</label>
  <input
    type="text"
    v-model="name"
  />
  <p v-if="greeting">{{ greeting }}</p>
</template>
