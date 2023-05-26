<script setup lang="ts">
import { useIntervalFn, useElementBounding, toValue } from "@vueuse/core";
import { computed, ref, onMounted } from "vue";

const props = defineProps<{
  text: string;
  pos: number;
  total: number;
  direction: "ltr" | "rtl";
}>();

const textEl = ref<HTMLElement | null>(null);
useElementBounding(textEl); // for some reason this starts the transformation immediately

const movingPosition = ref(toValue(props.pos));
const show = ref(true);

const startPos = computed(() => {
  return props.total - (Math.floor(props.total / 2) + props.total);
});
const endPos = computed(() => {
  return Math.floor(props.total / 2) - 1;
});

const moveTextFn = computed(() => {
  if (props.direction === "ltr") {
    return () => {
      if (movingPosition.value >= endPos.value) {
        show.value = false;
        movingPosition.value = startPos.value;
      } else {
        show.value = true;
        movingPosition.value = movingPosition.value + 1;
      }
    };
  } else {
    return () => {
      if (movingPosition.value <= startPos.value) {
        show.value = false;
        movingPosition.value = endPos.value;
      } else {
        show.value = true;
        movingPosition.value = movingPosition.value - 1;
      }
    };
  }
});

const { resume } = useIntervalFn(
  () => {
    moveTextFn.value();
  },
  1000,
  { immediateCallback: true }
);

onMounted(() => {
  resume();
});
</script>

<template>
  <div
    v-show="show"
    ref="textEl"
    :style="{
      transform: `translateX(${movingPosition * 110}%)`,
      transition: show ? 'transform 1s linear' : 'none',
    }"
  >
    {{ text }}
  </div>
</template>
