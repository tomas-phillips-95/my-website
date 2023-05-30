<script setup lang="ts">
defineProps<{
  school: string;
  location: string;
  study: string;
  startDate: string;
  endDate: string;
  bulletPoints: string[];
}>();
</script>

<template>
  <div>
    <h4>
      {{ school }}, <span class="text-sm">{{ location }}</span> —
      <span class="text-sm text-black font-medium">{{ study }}</span>
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
