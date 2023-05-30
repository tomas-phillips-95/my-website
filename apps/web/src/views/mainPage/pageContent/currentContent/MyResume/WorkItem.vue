<script setup lang="ts">
defineProps<{
  company: string;
  location: string;
  title: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
}>();
</script>

<template>
  <div>
    <h4>
      <span>{{ company }}</span
      >, <span class="text-sm">Durham NC</span> —
      <span class="text-sm text-black font-medium">{{ title }}</span>
    </h4>
    <span class="uppercase text-xs text-gray-500 ml-4"
      >{{ startDate }} → {{ endDate }}</span
    >
    <ul class="list-disc text-gray-700 ml-4">
      <li
        v-for="(bulletPoint, index) in bulletPoints"
        :key="index"
        class="text-base"
      >
        {{ bulletPoint }}
      </li>
    </ul>
  </div>
</template>
