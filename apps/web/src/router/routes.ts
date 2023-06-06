import type { RouteRecordRaw } from "vue-router";

import MainPage from "@/views/MainPage.vue";
import ResumePDF from "@/views/ResumePDF.vue";

export const routes = [
  {
    path: "/",
    redirect: "/about-me",
  },
  {
    path: "/about-me",
    name: "about-me",
    component: MainPage,
  },
  {
    path: "/my-projects",
    name: "my-projects",
    component: MainPage,
  },
  {
    path: "/my-resume",
    name: "my-resume",
    component: MainPage,
  },
  {
    path: "/my-resume/pdf",
    name: "my-resume-pdf",
    component: ResumePDF,
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
] as unknown as readonly RouteRecordRaw[];
