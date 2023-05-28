import { createInjectionState } from "@vueuse/core";
import { useRouteQuery } from "@vueuse/router";
import { computed } from "vue";

import { useIsMobile } from "@/composables/isMobile";

type Button = "about-me" | "my-projects" | "my-resume";

export const [useProvideSideDescriptionStore, useInjectSideDescriptionStore] =
  createInjectionState(() => {
    const selectedButton = useRouteQuery<Button>("selected", "about-me");
    const isMobile = useIsMobile();

    function isButtonSelected(button: Button) {
      return selectedButton.value === button;
    }

    const getButtonText = computed(() => {
      return isMobile.value
        ? (button: Button) => {
            let text: string;
            switch (button) {
              case "about-me":
                text = "About me";
                break;
              case "my-projects":
                text = "Projects";
                break;
              case "my-resume":
                text = "Resume";
                break;
            }
            return isButtonSelected(button) ? text.toUpperCase() : text;
          }
        : (button: Button) => {
            let text: string;
            switch (button) {
              case "about-me":
                text = "About me";
                break;
              case "my-projects":
                text = "My projects";
                break;
              case "my-resume":
                text = "My resume";
                break;
            }
            return isButtonSelected(button) ? text.toUpperCase() : text;
          };
    });

    return {
      selectedButton,
      getButtonText,
    };
  });
