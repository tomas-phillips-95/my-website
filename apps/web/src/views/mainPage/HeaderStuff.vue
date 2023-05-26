<script setup lang="ts">
import { createReusableTemplate } from "@vueuse/core";

const [DefineLink, ReuseLink] = createReusableTemplate<{
  text: string;
  href: string;
}>();
</script>

<template>
  <div>
    <DefineLink v-slot="{ text, href }">
      <a target="_blank" class="text-right" :href="href">
        {{ text }}
      </a>
    </DefineLink>

    <header class="flex justify-between">
      <h1><a href="/">Tomás Phillips</a></h1>
      <div class="flex flex-col">
        <h1 class="text-right mb-2 select-none relative">Contact</h1>
        <ReuseLink text="Email" href="mailto:tomas.phillips.95@gmail.com" />
        <ReuseLink
          text="LinkedIn"
          href="https://www.linkedin.com/in/tomas-phillips"
        />
        <ReuseLink
          text="Github"
          href="https://www.github.com/tomas-phillips-95"
        />
      </div>
    </header>
  </div>
</template>
