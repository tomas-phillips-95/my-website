<script setup lang="ts">
import { createReusableTemplate } from "@vueuse/core";

import pdfUrl from "@/assets/resume.pdf";

const [DefineListItem, ReuseListItem] = createReusableTemplate<{
  text: string;
}>();

const [DefineLink, ReuseLink] = createReusableTemplate<{
  text: string;
  href: string;
}>();
</script>

<template>
  <div class="flex flex-col space-y-8 max-w-[64rem]">
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

    <div class="text-gray-700 text-xs">
      For a PDF version of this, click
      <ReuseLink text="here" :href="pdfUrl" />
    </div>

    <div class="flex flex-col">
      <h3 class="font-medium">Tools I've Worked With:</h3>
      <ul>
        <ReuseListItem text="Python" />
        <ReuseListItem text="Typescript" />
        <ReuseListItem text="Vue" />
        <ReuseListItem text="Django / Flask / FastAPI" />
        <ReuseListItem text="Docker" />
        <ReuseListItem text="Kubernetes" />
        <ReuseListItem text="Elasticsearch" />
        <ReuseListItem text="Postgres" />
        <ReuseListItem text="MongoDB" />
        <ReuseListItem text="Keycloak" />
        <ReuseListItem text="AWS" />
      </ul>
    </div>
    <div class="space-y-2">
      <h3 class="font-medium">Experience:</h3>
      <div>
        <h4>
          Infinia ML, <span class="text-sm">Durham NC</span> —
          <span class="text-sm text-black font-medium">Software Engineer</span>
        </h4>
        <span class="uppercase text-xs text-gray-500 ml-4"
          >March 2022 → Present</span
        >
        <ul class="list-disc text-gray-700 ml-4">
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
          OneTrust, <span class="text-sm">Remote</span> —
          <span class="text-sm text-black font-medium">Python Developer</span>
        </h4>
        <span class="uppercase text-xs text-gray-500 ml-4"
          >June 2021 → March 2022</span
        >
        <ul class="list-disc text-gray-700 ml-4">
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
          Wine & Design, <span class="text-sm">Greensboro NC</span> —
          <span class="text-sm text-black font-medium"
            >Painting Instructor</span
          >
        </h4>
        <span class="uppercase text-xs text-gray-500 ml-4"
          >January 2019 → March 2020</span
        >
        <ul class="list-disc text-gray-700 ml-4">
          <li class="text-sm">
            Instructed acrylic painting classes for adults and children. Classes
            ranged from 4 to 35+ people in count.
          </li>
        </ul>
      </div>
      <div>
        <h4>
          Volvo Trucks, <span class="text-sm">Greensboro NC</span> —
          <span class="text-sm text-black font-medium"
            >Software Engineer Intern</span
          >
        </h4>
        <span class="uppercase text-xs text-gray-500 ml-4"
          >June 2016 → August 2016</span
        >
        <ul class="list-disc text-gray-700 ml-4">
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
    <div class="space-y-2">
      <h3 class="font-medium">Education:</h3>
      <div>
        <h4>
          Lambda School, <span class="text-sm">Remote</span> —
          <span class="text-sm text-black font-medium">Data Science</span>
        </h4>
        <span class="uppercase text-xs text-gray-500 ml-4"
          >August 2020 → February 2021</span
        >
        <ul class="list-disc text-gray-700 ml-4">
          <li class="text-sm">
            An intensive 8 hour per day, 6 month-long program focusing on data
            science and machine learning.
          </li>
          <li class="text-sm">
            Worked on various group projects, including a month-long project for
            the non-profit Human Rights First Asylum.
          </li>
        </ul>
      </div>
      <div>
        <h4>
          University of North Carolina at Greensboro,
          <span class="text-sm">Greensboro NC</span> —
          <span class="text-sm text-black font-medium">Studio Art</span>
        </h4>
        <span class="uppercase text-xs text-gray-500 ml-4"
          >August 2017 → June 2019</span
        >
        <ul class="list-disc text-gray-700 ml-4">
          <li class="text-sm">
            Took various classes such as drawing, life-drawing, painting,
            design, and more.
          </li>
          <li class="text-sm">
            Played soprano/alto saxophone in the North Carolina Saxophone
            Ensemble.
          </li>
        </ul>
      </div>
      <div>
        <h4>
          University of North Carolina at Chapel Hill,
          <span class="text-sm">Chapel Hill NC</span> —
          <span class="text-sm text-black font-medium">Computer Science</span>
        </h4>
        <span class="uppercase text-xs text-gray-500 ml-4"
          >August 2013 → June 2017</span
        >
        <ul class="list-disc text-gray-700 ml-4">
          <li class="text-sm">
            Took various classes such as foundations of programming, discrete
            math, web fundamentals, and more.
          </li>
          <li class="text-sm">
            Played alto saxophone in the university’s wind ensemble.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
