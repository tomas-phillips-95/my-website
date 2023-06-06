<script setup lang="ts">
import { createReusableTemplate, useIntervalFn } from "@vueuse/core";
import { ref } from "vue";

import MyTooltip from "@/components/MyTooltip.vue";

const [DefineHoverable, ReuseHoverable] = createReusableTemplate<{
  text: string;
}>();

const [DefineLink, ReuseLink] = createReusableTemplate<{
  text: string;
  href: string;
}>();

const clownTransform = ref({
  transform: "translate(0, 0)",
});
useIntervalFn(() => {
  clownTransform.value = {
    transform: `translate(${Math.random() * 20}px, ${
      Math.random() * 20
    }px) rotate(${50 - Math.random() * 100}deg)`,
  };
}, 100);
</script>

<template>
  <div>
    <DefineHoverable v-slot="{ text }">
      <span class="font-medium text-black cursor-default">{{ text }}</span>
    </DefineHoverable>

    <DefineLink v-slot="{ text, href }">
      <a
        target="_blank"
        class="transition underline text-black text-base font-medium hover:bg-white hover:shadow-[0_0_15px_15px_white] inline-block rounded-[100%] duration-500"
        :href="href"
      >
        {{ text }}
      </a>
    </DefineLink>

    <div class="text-gray-700 max-w-[42rem] space-y-4">
      <div class="space-y-4">
        <h1 class="text-black">
          <ReuseLink text="My current website" href="/" />
        </h1>
        <p>
          This website is a
          <MyTooltip
            ><template #content><ReuseHoverable text="TRPC" /></template
            ><template #tooltip
              >I haven't used TRPC prior to this. Wanted to see what it was
              like.</template
            ></MyTooltip
          >
          app with a Vue 3 frontend and an Express backend. The backend serves
          the chat API, utilizing OpenAI's APIs to generate embeddings and
          completions (but I disabled it on mobile, sorry). I inject some
          context about myself using embeddings + cosine similarity technique in
          order to create the prompt, but it still needs more
          <MyTooltip
            ><template #content><ReuseHoverable text="tinkering" /></template
            ><template #tooltip
              >"Prompt engineering", if you will.</template
            ></MyTooltip
          >
          because the responses can get repetitive.
        </p>
      </div>
      <div class="space-y-4">
        <h1 class="text-black">
          <ReuseLink
            text="My previous website"
            href="https://tomashphill.github.io/"
          />
        </h1>
        <p>
          The homepage of this website will occasionally flash a random face...
          Well, just the eyes and mouth of a face. I used portraits gathered
          from Rijksmuseum's API and a python script in order to extract the
          coordinates of each face's eyes and mouth. Then, I used those
          coordinates to crop the images in the right spots.
        </p>
        <p class="text-sm max-w-[64%]">
          This website also hosts a more
          <ReuseLink
            text="comprehensive portfolio"
            href="https://tomashphill.github.io/portfolio.html"
          />
          of work I completed at or outside of schooling. Please check it out to
          see more stuff—wait a moment. Actually it looks like most of the
          heroku apps aren't live anymore... Maybe just look at
          <ReuseLink
            text="this"
            href="https://tomashphill.github.io/rijks.html"
          />
          one then.
        </p>
      </div>
      <div class="space-y-4">
        <h1 class="text-black flex">
          <ReuseLink
            text='My previous "My previous website" website'
            href="https://sugar-water.github.io/"
          />
          <a
            target="_blank"
            href="https://youtu.be/GwNNpfQ9b5E?t=44"
            class="mx-2 inline-block transition-transform duration-500"
            :style="clownTransform"
            >🤡</a
          >
        </h1>
        <p>
          This is one of the first websites I made when I was applying for my
          first software developer job. It's just plain javascript, HTML, & CSS.
          The cool thing about it is that every time you refresh, the position
          of the menu will move, and a new background will load (click the top
          left square to see its source). The background is randomly retrieved
          from the Rijksmuseum's API. It's a whole bunch of old, Dutch
          paintings. If you wait long enough you can see the title of the
          painting slowly type itself at the bottom. Also, no, the links don't
          work.
        </p>
        <p class="text-sm max-w-[64%]">
          I was into functional programming and data visualization at the time
          and used an Observable (think jupyter notebooks for js ecosystem)
          which you can see
          <ReuseLink
            text="here"
            href="https://observablehq.com/@tomashphill/rikjsdata"
          />.
        </p>
      </div>
    </div>
  </div>
</template>
