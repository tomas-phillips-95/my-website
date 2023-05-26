import { computed, ref, type Ref } from "vue";
import { nanoid } from "nanoid";
import { useAsyncState, isDefined, createGlobalState } from "@vueuse/core";

import { client } from "@/client";

export type IncompleteInteraction = {
  id: string;
  state: "composing-question";
  question: string;
};

export type PendingInteraction = {
  id: string;
  state: "pending";
  question: string;
};

export type CompleteInteraction = {
  id: string;
  state: "complete";
  question: string;
  answer: string;
};

export type Interaction =
  | IncompleteInteraction
  | PendingInteraction
  | CompleteInteraction;

function isIncompleteInteraction(
  interaction: Interaction
): interaction is IncompleteInteraction {
  return interaction.state === "composing-question";
}

function isCompleteInteraction(
  interaction: Interaction
): interaction is CompleteInteraction {
  return interaction.state === "complete";
}

export const useInteractionsStore = createGlobalState(() => {
  const interactions = ref([] as Interaction[]);

  function addNewInteraction() {
    interactions.value.push({
      id: nanoid(),
      state: "composing-question",
      question: "",
    });
  }

  function removeInteraction(interactionId: string) {
    const index = interactions.value.findIndex(
      (interaction) => interaction.id === interactionId
    );
    interactions.value.splice(index, 1);
  }

  function updateInteractionAsPending(interactionId: string) {
    const interaction = interactions.value.find(
      (interaction) => interaction.id === interactionId
    );
    if (isDefined(interaction)) {
      interaction.state = "pending";
    }
  }

  function updateInteractionAsComplete(
    interactionId: string,
    response: string
  ) {
    const interaction = interactions.value.find(
      (interaction) => interaction.id === interactionId
    );
    if (isDefined(interaction)) {
      interaction.state = "complete";
      (interaction as CompleteInteraction).answer = response;
    }
  }

  function useInteraction(interaction: Ref<Interaction>) {
    const { isLoading: isLoadingResponse, execute: getResponse } =
      useAsyncState(
        async () => {
          updateInteractionAsPending(interaction.value.id);
          const resp = await client.chat.getChatResponse.mutate(
            interaction.value.question
          );
          updateInteractionAsComplete(interaction.value.id, resp);
        },
        undefined,
        { immediate: false }
      );

    const canRemove = computed(
      () =>
        isIncompleteInteraction(interaction.value) ||
        isCompleteInteraction(interaction.value)
    );

    const canGetResponse = computed(() =>
      isIncompleteInteraction(interaction.value)
    );

    function remove() {
      removeInteraction(interaction.value.id);
    }

    const canEditQuestion = computed(() =>
      isIncompleteInteraction(interaction.value)
    );

    return {
      canEditQuestion,
      canRemove,
      canGetResponse,
      remove,
      getResponse: () => getResponse(undefined),
      isLoadingResponse,
    };
  }

  return {
    interactions,
    addNewInteraction,
    useInteraction,
  };
});
