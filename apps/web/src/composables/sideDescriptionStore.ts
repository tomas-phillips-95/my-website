import { createInjectionState } from "@vueuse/core";
import { useRouteQuery } from "@vueuse/router";

type Button = "about-me" | "my-projects" | "my-resume";

export const [useProvideSideDescriptionStore, useInjectSideDescriptionStore] =
  createInjectionState(() => {
    const selectedButton = useRouteQuery<Button>("selected", "about-me");

    function isButtonSelected(button: Button) {
      return selectedButton.value === button;
    }
    function getButtonText(button: Button) {
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
    }

    return {
      selectedButton,
      getButtonText,
    };
  });
