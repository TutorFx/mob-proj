<template>
  <div v-for="(s, i) in Theme" :key="i" class="relative">
    <input
      :id="s"
      v-model="state"
      type="radio"
      class="peer absolute opacity-0"
      :value="s"
    />
    <label :for="s" class="block">
      <span
        :data-theme="s"
        class="bg-base-100 hover:bg-base-200 text-base-content block w-full cursor-pointer font-sans"
      >
        <span class="grid grid-cols-5 grid-rows-3">
          <span
            class="col-span-5 row-span-3 row-start-1 flex items-center gap-2 px-4 py-3"
          >
            <span
              class="bg-base-200 grid items-center justify-center aspect-square p-1 rounded-full"
            >
              <!-- Show on checked -->
              <Icon
                v-show="s === state"
                name="ic:outline-check-circle-outline"
              />
              <!-- Hide on checked -->
              <Icon v-show="s !== state" name="ic:outline-circle" />
            </span>
            <span class="flex-grow text-sm truncate">{{ s }}</span>
            <span class="flex h-full flex-shrink-0 flex-wrap gap-1">
              <span class="bg-primary w-2 rounded"></span>
              <span class="bg-secondary w-2 rounded"></span>
              <span class="bg-accent w-2 rounded"></span>
              <span class="bg-neutral w-2 rounded"></span>
            </span>
          </span>
        </span>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
import { Theme } from "@prisma/client";

const props = defineProps<{
  modelValue: Theme;
}>();

const emits = defineEmits<(e: "update:modelValue", value: Theme) => void>();

const state = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits("update:modelValue", value);
  },
});
</script>
