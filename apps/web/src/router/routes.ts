import type { RouteRecordRaw } from "vue-router";

import MainPage from "@/views/MainPage.vue";

export const routes = [
  {
    path: "/",
    name: "main-page",
    component: MainPage,
  },
] as unknown as readonly RouteRecordRaw[];
