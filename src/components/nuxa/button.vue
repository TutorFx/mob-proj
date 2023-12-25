<script setup lang="ts">
import type { RouteLocationRaw } from "#vue-router";
import { twMerge } from "tailwind-merge";

const NuxtLink = resolveComponent("NuxtLink");

const styles = {
  primary: {
    inside: "text-primary-content",
    insideOutlined: "text-primary",
    outside: "bg-primary hover:bg-primary/80",
    outsideOutlined: "bg-none border border-primary",
  },
  secondary: {
    inside: "text-secondary-content",
    insideOutlined: "text-secondary",
    outside: "bg-secondary hover:bg-secondary/80",
    outsideOutlined: "bg-none border border-secondary",
  },
  success: {
    inside: "text-success-content",
    insideOutlined: "text-success",
    outside: "bg-success hover:bg-success/80",
    outsideOutlined: "bg-none border border-success",
  },
  danger: {
    inside: "text-error-content",
    insideOutlined: "text-error",
    outside: "bg-error hover:bg-error/80",
    outsideOutlined: "bg-none border border-error",
  },
};

const sizes = {
  md: {
    inside: "text-md",
    outside: "px-3 py-2 rounded-lg",
  },
  sm: {
    inside: "text-sm",
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
    color?: Style;
    rounded?: boolean;
    loading?: boolean;
  }>(),
  {
    color: "primary",
    size: "md",
    outlined: false,
    loading: false,
    rounded: false,
  },
);

const outside = computed(() =>
  twMerge(
    "cursor-pointer",
    sizes[props.size].outside,
    styles[props.color][props.outlined ? "outsideOutlined" : "outside"],
  ),
);

const inside = computed(() =>
  twMerge(
    "text-center uppercase",
    sizes[props.size].inside,
    styles[props.color][props.outlined ? "insideOutlined" : "inside"],
  ),
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
      <Icon
        v-if="loading"
        class="mr-3"
        size="20"
        name="line-md:loading-twotone-loop"
      />
      <slot v-else />
    </div>
  </component>
</template>
