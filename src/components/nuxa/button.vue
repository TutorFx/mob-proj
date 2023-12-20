<script setup lang="ts">
import type { RouteLocationRaw } from "#vue-router";
import { twMerge } from "tailwind-merge";

const NuxtLink = resolveComponent("NuxtLink");

const styles = {
  primary: {
    inside: "",
    outside: "bg-primary hover:bg-primary/80",
    outsideOutlined: "bg-none border border-primary",
  },
  secondary: {
    inside: "",
    outside: "bg-primary hover:bg-primary/80",
    outsideOutlined: "bg-none border border-primary",
  },
};

const sizes = {
  md: {
    inside: "",
    outside: "px-3 py-2 rounded-lg",
  },
  sm: {
    inside: "",
    outside: "px-2 py-1 rounded-md",
  },
};

type Style = keyof typeof styles;
type Size = keyof typeof sizes;

const props = withDefaults(
  defineProps<{
    to?: RouteLocationRaw | string;
    outlined?: boolean;
    size?: Size;
    style?: Style;
  }>(),
  {
    style: "primary",
    size: "md",
    outlined: false,
  },
);

const outside = computed(() =>
  twMerge(
    "cursor-pointer",
    sizes[props.size].outside,
    styles[props.style][props.outlined ? "outsideOutlined" : "outside"],
  ),
);

const inside = computed(() =>
  twMerge("text-center", sizes[props.size].inside, styles[props.style].inside),
);
</script>

<template>
  <component
    :is="to ? NuxtLink : 'div'"
    class="select-none"
    :class="outside"
    :to="to"
  >
    <div class="select-none" :class="inside">
      <slot />
    </div>
  </component>
</template>
