<script setup lang="ts">
import ResumeUrl from "@/assets/resume.pdf";
</script>
<template>
  <object :data="ResumeUrl" type="application/pdf" class="h-full w-full">
    <p>
      Unable to display PDF file.
      <a :href="ResumeUrl">Download</a>
      instead.
    </p>
  </object>
</template>
