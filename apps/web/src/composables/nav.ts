import { createGlobalState, toRefs } from "@vueuse/core";
import type { Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

type NavOption = "about-me" | "my-projects" | "my-resume";

export const useNav = createGlobalState(() => {
  const { push } = useRouter();
  const { name: currentNav } = toRefs(useRoute());

  function setNav(nav: NavOption) {
    push({ name: nav });
  }

  return {
    currentNav: currentNav as Ref<NavOption>,
    setNav,
  };
});
