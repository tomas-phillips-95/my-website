<script setup lang="ts">
import { useTimeAgo, createReusableTemplate } from "@vueuse/core";

import MyTooltip from "@/components/MyTooltip.vue";

const timeAgo = useTimeAgo(new Date(1995, 8, 2), { rounding: "floor" });
const [DefineHoverable, ReuseHoverable] = createReusableTemplate<{
  text: string;
}>();
</script>

<template>
  <div>
    <DefineHoverable v-slot="{ text }">
      <span class="font-medium text-black cursor-default">{{ text }}</span>
    </DefineHoverable>

    <div class="text-gray-700 max-w-[42rem] space-y-4">
      <p>
        Hi, I'm
        <MyTooltip
          ><template #content><ReuseHoverable text="Tomás." /></template
          ><template #tooltip
            >Born {{ timeAgo }} in Curitiba, Brazil.</template
          ></MyTooltip
        >
        I currently work full-time as a full-stack developer at a small startup.
        I've mostly done backend work, but recently I've been heavily involved
        with a frontend project... so I've done a lot of Vue 3 and
        <MyTooltip
          ><template #content><ReuseHoverable text="Typescript" /></template
          ><template #tooltip>Go types!</template></MyTooltip
        >
        programming lately, and wanted to
        <MyTooltip
          ><template #content><ReuseHoverable text="zhuzh" /></template
          ><template #tooltip
            ><span class="italic text-xs text-gray-500">verb</span>
            <div class="ml-4">
              <p class="text-sm">
                make something more stylish, lively, or attractive.
              </p>
              <p class="text-xs text-gray-500">
                "the bag is a cool but economical way to zhuzh up many an
                outfit"
              </p>
            </div></template
          ></MyTooltip
        >
        up my personal website after learning all that I did.
      </p>
      <p>
        I first went to college at
        <MyTooltip
          ><template #content
            ><ReuseHoverable text="UNC Chapel Hill" /></template
          ><template #tooltip>Go Tar Heels!</template></MyTooltip
        >
        where I studied computer science for a bit... then got a little lost and
        switched to an art major, then transferred to
        <MyTooltip
          ><template #content><ReuseHoverable text="UNC Greensboro" /></template
          ><template #tooltip>Go Spartans!</template></MyTooltip
        >, and then attended
        <MyTooltip
          ><template #content><ReuseHoverable text="Lambda School" /></template
          ><template #tooltip
            >Now rebranded as Bloomtech. There's a lot of controversy
            surrounding the school. 👀 Google if you're curious.</template
          ></MyTooltip
        >
        coding bootcamp for data science.
      </p>
      <p>
        Since LLMs and ChatGPT are all the rage now, I made a little chat app on
        this page where you can
        <MyTooltip
          ><template #content><ReuseHoverable text='"chat with me"' /></template
          ><template #tooltip
            ><span class="text-xs italic">Spolier alert:</span><br />It's not
            really me.</template
          ></MyTooltip
        >
        and learn a little more about me.
      </p>
      <p>
        Ok, so since I'm working in VS Code with
        <MyTooltip
          ><template #content
            ><ReuseHoverable text="GitHub Copilot," /></template
          ><template #tooltip
            ><p class="text-sm italic">
              » "Say hi to the person reading this right now, GitHub Copilot!" «
            </p>
            <p class="text-sm italic text-right">» "Hi there! 👋" «</p>
          </template></MyTooltip
        >
        I'm now going to let it autocomplete the rest of my "About Me", let's
        see how it does:
      </p>
      <p class="text-xs text-gray-500 py-2">
        I love playing video games, I'm a big fan of RPGs and MMOs, I love to
        read, I love to write, I love to draw, I love to play music, I love to
        play guitar, I love to play piano, I love to play violin, I love to play
        bassoon, I love to play saxophone, I love to play clarinet, I love to
        play flute, I love to play drums, I love to play trumpet, I love to play
        trombone, I love to play euphonium, I love to play tuba, I love to play
        cello, I love to play viola, I love to play double bass, I love to play
        accordion, I love to play banjo, I love to play harmonica, I love to
        play ukulele, I love to play mandolin, I love to play sitar, I love to
        play oud, I love to play lyre, I love to play lute, I love to play
        theorbo, I love to play hurdy-gurdy, I love to play kora, I love to play
        bagpipes, I love to play recorder, I love to play ocarina, I love to
        play tin whistle, I love to play bass guitar, I love to play electric
        guitar, I love to play acoustic guitar, I love to play classical guitar,
        I love to play bass clarinet, I love to play contrabass clarinet, I love
        to play contrabass saxophone, I love to play contrabassoon, I love to
        play bass trombone, I love to play piccolo, I love to play oboe, I love
        to play english horn, I love to play cor anglais, I love to play
        bassoon, I love to play contrabassoon, I love to play baritone
        saxophone, I love to play alto saxophone, I love to play soprano
        saxophone, I love to play sopranino saxophone, I love to play
        subcontrabass saxophone, I love to play bass saxophone, I love to play
        contrabass saxophone, I love to play tubax, I love to play heckelphone,
        I love to play contr
      </p>

      <p class="text-lg">
        <MyTooltip
          ><template #content
            ><span class="cursor-default text-xl">😳</span></template
          ><template #tooltip>Well that's pretty weird.</template></MyTooltip
        >
      </p>
    </div>
  </div>
</template>
