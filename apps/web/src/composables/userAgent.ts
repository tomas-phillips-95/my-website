import { createGlobalState } from "@vueuse/core";
import { UAParser } from "ua-parser-js";
import { ref } from "vue";

export const useBrowser = createGlobalState(() => {
  const ua = new UAParser(window.navigator.userAgent);
  const browser = ua.getBrowser();

  const isChrome = ref(browser.name === "Chrome");
  const isSafari = ref(browser.name === "Safari");
  const isFirefox = ref(browser.name === "Firefox");

  return {
    isChrome,
    isSafari,
    isFirefox,
  };
});
