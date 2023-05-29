import { createApp } from "vue";
import { inject } from "@vercel/analytics";

import { router } from "./router";

import App from "@/App.vue";
import "./assets/base.css";

// @ts-expect-error
const app = createApp(App);
app.use(router);
app.mount("#app");

inject();
