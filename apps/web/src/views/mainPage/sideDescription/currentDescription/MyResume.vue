<script setup lang="ts">
import { createReusableTemplate } from "@vueuse/core";

const [DefineListItem, ReuseListItem] = createReusableTemplate<{
  text: string;
}>();

const [DefineLink, ReuseLink] = createReusableTemplate<{
  text: string;
  href: string;
}>();
</script>

<template>
  <div class="flex flex-col space-y-2 max-w-[64rem]">
    <DefineListItem v-slot="{ text }">
      <li class="text-xs">{{ text }}</li>
    </DefineListItem>

    <DefineLink v-slot="{ text, href }">
      <a
        target="_blank"
        class="transition underline hover:bg-white hover:shadow-[0_0_15px_15px_white] inline-block rounded-[100%] duration-500"
        :href="href"
      >
        {{ text }}
      </a>
    </DefineLink>

    <div class="text-gray-700 max-w-[42rem] space-y-4 text-sm">
      For a more official PDF version, click this
      <ReuseLink text="link." href="https://sugar-water.github.io/" />
    </div>

    <div class="flex flex-col">
      <h3>Tools I've Worked With:</h3>
      <ul>
        <ReuseListItem text="Python" />
        <ReuseListItem text="Typescript" />
        <ReuseListItem text="Vue" />
        <ReuseListItem text="Django / Flask / FastAPI" />
        <ReuseListItem text="Docker" />
        <ReuseListItem text="Kubernetes" />
        <ReuseListItem text="Elasticsearch" />
        <ReuseListItem text="Postgres" />
        <ReuseListItem text="Keycloak" />
        <ReuseListItem text="AWS" />
      </ul>
    </div>
    <div class="space-y-2">
      <h3>Experience:</h3>
      <div>
        <h4>
          InfiniaML, Durham NC —
          <span class="text-sm text-gray-600 italic">Software Engineer</span>
        </h4>
        <ul class="list-disc text-gray-700">
          <li class="text-sm">
            Developed and maintained a user management system using Python
            (backend) and Vue 3 with TypeScript (frontend).
          </li>
          <li class="text-sm">
            Collaborated with data scientists to deploy intelligent document
            processing engines for clients.
          </li>
          <li class="text-sm">
            Ensured seamless operation of a document processor backend and
            implemented websockets for real-time communication with the
            frontend.
          </li>
        </ul>
      </div>
      <div>
        <h4>
          OneTrust, Remote —
          <span class="text-sm text-gray-600 italic">Python Developer</span>
        </h4>
        <ul class="list-disc text-gray-700">
          <li class="text-sm">
            Developed and optimized backend document redaction software
            utilizing FastAPI.
          </li>
          <li class="text-sm">
            Implemented a reliable and secure user management system for
            seamless authentication and access control.
          </li>
          <li class="text-sm">
            Led the creation of a document review system to streamline
            collaboration and improve workflow efficiency.
          </li>
          <li class="text-sm">
            Established a standardized logging system adhering to Elastic Common
            Schema standards for enhanced system monitoring and performance
            optimization.
          </li>
        </ul>
      </div>
      <div>
        <h4>
          Wine & Design, Greensboro NC —
          <span class="text-sm text-gray-600 italic">Painting Instructor</span>
        </h4>
        <ul class="list-disc text-gray-700">
          <li class="text-sm">
            Instructed acrylic painting classes for adults and children. Classes
            ranged from 4 to 35+ people in count.
          </li>
        </ul>
      </div>
      <div>
        <h4>
          Volvo Trucks, Greensboro NC —
          <span class="text-sm text-gray-600 italic"
            >Software Engineer Intern</span
          >
        </h4>
        <ul class="list-disc text-gray-700">
          <li class="text-sm">
            Developed an elegant Electron application utilizing HTML documents,
            effectively extracting and organizing data from Microsoft Word
            documents. Leveraged web technologies to create a dynamic and
            referential catalog of these documents, offering enhanced
            accessibility and seamless navigation.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
