<script setup lang="ts">
import { createReusableTemplate } from "@vueuse/core";

import WorkItem from "./MyResume/WorkItem.vue";
import EducationItem from "./MyResume/EducationItem.vue";

import pdfUrl from "@/assets/resume.pdf";

const [DefineLink, ReuseLink] = createReusableTemplate<{
  text: string;
  href: string;
}>();

const work = [
  {
    company: "Infinia ML",
    location: "Durham NC",
    title: "Software Engineer",
    startDate: "March 2022",
    endDate: "Present",
    bulletPoints: [
      "Developed and maintained a user management system using Python (backend) and Vue 3 with TypeScript (frontend).",
      "Collaborated with data scientists to deploy intelligent document processing engines for clients.",
      "Ensured seamless operation of a document processor backend and implemented websockets for real-time communication with the frontend.",
    ],
  },
  {
    company: "OneTrust",
    location: "Remote",
    title: "Python Developer",
    startDate: "June 2021",
    endDate: "March 2022",
    bulletPoints: [
      "Developed and optimized backend document redaction software utilizing FastAPI.",
      "Implemented a reliable and secure user management system for seamless authentication and access control.",
      "Led the creation of a document review system to streamline collaboration and improve workflow efficiency.",
      "Established a standardized logging system adhering to Elastic Common Schema standards for enhanced system monitoring and performance optimization.",
    ],
  },
  {
    company: "Wine & Design",
    location: "Greensboro NC",
    title: "Painting Instructor",
    startDate: "June 2019",
    endDate: "March 2020",
    bulletPoints: [
      "Instructed acrylic painting classes for adults and children. Classes ranged from 4 to 35+ people in count.",
    ],
  },
  {
    company: "Volvo Trucks",
    location: "Greensboro NC",
    title: "Software Engineer Intern",
    startDate: "June 2016",
    endDate: "August 2016",
    bulletPoints: [
      "Developed an elegant Electron application utilizing HTML documents, effectively extracting and organizing data from Microsoft Word documents. Leveraged web technologies to create a dynamic and referential catalog of these documents, offering enhanced accessibility and seamless navigation.",
    ],
  },
];

const education = [
  {
    school: "Lambda School",
    location: "Remote",
    study: "Data Science",
    startDate: "August 2020",
    endDate: "February 2021",
    bulletPoints: [
      "An intensive 8 hour per day, 6 month-long program focusing on data science and machine learning.",
      "Worked on various group projects, including a month-long project for the non-profit Human Rights First Asylum.",
    ],
  },
  {
    school: "University of North Carolina at Greensboro",
    location: "Greensboro NC",
    study: "Studio Art",
    startDate: "August 2017",
    endDate: "June 2019",
    bulletPoints: [
      "Took various classes such as drawing, life-drawing, painting, design, and more.",
      "Played soprano/alto saxophone in the North Carolina Saxophone Ensemble.",
    ],
  },
  {
    school: "University of North Carolina at Chapel Hill",
    location: "Chapel Hill NC",
    study: "Computer Science",
    startDate: "August 2013",
    endDate: "June 2017",
    bulletPoints: [
      "Took various classes such as foundations of programming, discrete math, web fundamentals, and more.",
      "Played alto saxophone in the university’s wind ensemble.",
    ],
  },
];

const knownTools = [
  "Python",
  "Typescript",
  "Vue",
  "FastAPI / Django / Flask",
  "Docker",
  "Kubernetes",
  "Elasticsearch",
  "Postgres",
  "MongoDB",
  "Keycloak",
  "AWS",
];
</script>

<template>
  <div class="flex flex-col space-y-8 max-w-[64rem]">
    <DefineLink v-slot="{ text, href }">
      <a
        target="_blank"
        class="transition underline hover:bg-white hover:shadow-[0_0_15px_15px_white] inline-block rounded-[100%] duration-500"
        :href="href"
      >
        {{ text }}
      </a>
    </DefineLink>

    <div class="text-gray-700 text-sm">
      For a PDF version of this, click
      <ReuseLink text="here" :href="pdfUrl" />
    </div>

    <div class="flex flex-col">
      <h3 class="font-medium">Tools I've Worked With:</h3>
      <ul>
        <li v-for="(tool, index) in knownTools" :key="index" class="text-sm">
          {{ tool }}
        </li>
      </ul>
    </div>
    <div class="space-y-2">
      <h3 class="font-medium">Experience:</h3>
      <WorkItem
        v-for="(workItem, index) in work"
        :key="index"
        v-bind="workItem"
      />
    </div>
    <div class="space-y-2">
      <h3 class="font-medium">Education:</h3>
      <EducationItem
        v-for="(educationItem, index) in education"
        :key="index"
        v-bind="educationItem"
      />
    </div>
  </div>
</template>
