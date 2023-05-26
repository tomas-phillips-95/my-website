<script setup lang="ts">
import {
  useVModel,
  useDraggable,
  useWindowSize,
  useTextareaAutosize,
  toRefs,
  useElementHover,
  computedAsync,
} from "@vueuse/core";
import { useProjection } from "@vueuse/math";
import { computed, ref } from "vue";

import { useDotDotDot } from "@/composables/dotDotDot";
import { useDimmer } from "@/composables/dimmer";
import FunButton from "@/components/FunButton.vue";
import {
  useInteractionsStore,
  type Interaction,
} from "@/composables/interactionsStore";

const props = defineProps<{
  index: number;
  modelValue: Interaction;
}>();

const emit = defineEmits(["update:modelValue"]);
const interaction = useVModel(props, "modelValue", emit);

const { question } = toRefs(interaction);

const { useInteraction } = useInteractionsStore()!;
const {
  remove,
  canRemove,
  canEditQuestion,
  getResponse,
  canGetResponse,
  isLoadingResponse,
} = useInteraction(interaction);

const { width, height } = useWindowSize();

const xRange = computed(
  () => [width.value / 2, width.value - width.value / 4] as const
);
const yRange = computed(
  () => [0 + height.value / 4, height.value - height.value / 4] as const
);
function useInitialPosition() {
  const rand = Math.random();
  const initialXPosition = useProjection(rand, [0, 1], xRange);
  const initialYPosition = useProjection(rand, [0, 1], yRange);
  const initialValue = computed(() => ({
    x: initialXPosition.value,
    y: initialYPosition.value,
  }));
  return initialValue;
}

const initialQuestionPosition = useInitialPosition();
const questionEl = ref<HTMLElement | null>(null);
const isQuestionElHovered = useElementHover(questionEl);
const questionHandle = ref<HTMLElement | null>(null);
const { style: questionStyle } = useDraggable(questionEl, {
  initialValue: initialQuestionPosition,
  handle: questionHandle,
  preventDefault: true,
});

const initialAnswerPosition = useInitialPosition();
const answerEl = ref<HTMLElement | null>(null);
const isAnswerElHovered = useElementHover(answerEl);
const answerHandle = ref<HTMLElement | null>(null);
const { style: answerStyle } = useDraggable(answerEl, {
  initialValue: initialAnswerPosition,
  handle: answerHandle,
  preventDefault: true,
});

const { textarea, input } = useTextareaAutosize({
  input: question,
});

useDimmer(isAnswerElHovered);
useDimmer(isQuestionElHovered);

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const isQuestionElHoveredWithDelayAtEnd = computedAsync(
  async () => {
    if (!isQuestionElHovered.value) {
      console.log("sleeping");
      await sleep(300);
    }
    return isQuestionElHovered.value;
  },
  isAnswerElHovered.value,
  { lazy: true }
);
const isAnswerElHoveredWithDelayAtEnd = computedAsync(
  async () => {
    if (!isAnswerElHovered.value) {
      await sleep(300);
    }
    return isAnswerElHovered.value;
  },
  isAnswerElHovered.value,
  { lazy: true }
);

const { dotDotDot } = useDotDotDot(isLoadingResponse);
</script>

<template>
  <div>
    <div
      v-show="true"
      ref="questionEl"
      class="px-4 pb-4 pt-2 flex flex-col bg-[#e5e7eb] w-80 shadow-lg absolute space-y-2 rounded-lg border-2 border-gray-500"
      :class="{
        'z-50':
          isQuestionElHoveredWithDelayAtEnd || isAnswerElHoveredWithDelayAtEnd,
      }"
      :style="questionStyle"
    >
      <div class="flex space-x-2">
        <div
          ref="questionHandle"
          class="self-center flex-1 select-none flex mx-2 hover:cursor-move space-x-2 items-center"
        >
          <span class="tracking-wide">::</span>
          <span
            v-if="interaction.state === 'composing-question'"
            class="text-sm"
            >Ask a question</span
          ><span v-else-if="interaction.state === 'pending'" class="text-sm"
            >Getting response{{ dotDotDot }}</span
          ><span v-else class="text-sm">Question answered!</span>
        </div>
        <FunButton
          text="send"
          class="shadow bg-[#edf0f5] ml-auto transition-all duration-100 ease-out"
          :class="{
            'opacity-0': !canGetResponse,
            invisible: !canGetResponse,
          }"
          @click="getResponse()"
        />
        <FunButton
          text="close"
          class="shadow bg-[#edf0f5] transition-all duration-100 ease-out"
          :class="{
            'opacity-0': !canRemove,
            invisible: !canRemove,
          }"
          @click="remove"
        />
      </div>
      <textarea
        ref="textarea"
        v-model="input"
        :disabled="!canEditQuestion"
        class="text-sm resize-none shadow p-4 rounded-lg w-full bg-[#edf0f5]"
      />
    </div>
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
    >
      <div
        v-show="interaction.state === 'complete'"
        ref="answerEl"
        class="px-4 pb-4 pt-2 flex flex-col bg-[#e5e7eb] w-80 shadow-lg absolute space-y-2 rounded-lg border-2 border-gray-500"
        :class="{
          'z-50':
            isQuestionElHoveredWithDelayAtEnd ||
            isAnswerElHoveredWithDelayAtEnd,
        }"
        :style="answerStyle"
      >
        <div
          ref="answerHandle"
          class="flex-1 select-none flex mx-2 hover:cursor-move space-x-2 items-center"
        >
          <span class="tracking-wide">::</span>
          <span class="text-sm">Response</span>
        </div>
        <p
          v-if="'answer' in interaction"
          ref="textarea"
          class="text-sm resize-none shadow p-4 rounded-lg w-full bg-[#edf0f5] overflow-y-auto"
        >
          {{ interaction.answer }}
        </p>
      </div>
    </Transition>
  </div>
</template>
