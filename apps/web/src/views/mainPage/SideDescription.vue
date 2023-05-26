<script setup lang="ts">
import NavButtons from "./sideDescription/NavButtons.vue";
import CurrentDescription from "./sideDescription/CurrentDescription.vue";

import { useProvideSideDescriptionStore } from "@/composables/sideDescriptionStore";

useProvideSideDescriptionStore();
</script>

<template>
  <div class="flex flex-col max-w-[48rem] h-full">
    <NavButtons
      class="flex flex-1 pl-6 space-x-2 sticky top-0 bg-[#e5e7eb] shadow-[0_0_15px_15px_#e5e7eb] pt-6 md:pt-0"
    />
    <div class="flex-1 pl-6 pb-6 pt-4 overflow-y-auto">
      <CurrentDescription />
    </div>
  </div>
</template>
