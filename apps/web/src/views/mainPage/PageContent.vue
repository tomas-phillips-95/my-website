<script setup lang="ts">
import NavButtons from "./pageContent/NavButtons.vue";
import CurrentContent from "./pageContent/CurrentContent.vue";
</script>

<template>
  <div class="space-y-4">
    <NavButtons
      class="sticky top-0 bg-[#e5e7eb] shadow-[0_0_15px_15px_#e5e7eb] py-2"
    />
    <CurrentContent />
  </div>
</template>
