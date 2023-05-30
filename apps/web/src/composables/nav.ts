import { createGlobalState } from "@vueuse/core";
import { useRouteQuery } from "@vueuse/router";

type NavOption = "AboutMe" | "MyProjects" | "MyResume";

export const useNav = createGlobalState(() => {
  const currentNav = useRouteQuery<NavOption>("selected", "AboutMe");
  return {
    currentNav,
  };
});
