import { createGlobalState } from "@vueuse/core";
import { UAParser } from "ua-parser-js";

export const useUserAgent = createGlobalState(() => {
  const ua = new UAParser(window.navigator.userAgent);

  return {
    browser: ua.getBrowser(),
  };
});
