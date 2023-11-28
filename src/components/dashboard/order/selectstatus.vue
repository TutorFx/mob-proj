<template>
  <Listbox v-model="state">
    <div class="relative z-50 mt-1">
      <ListboxButton
        class="shadow-md relative cursor-default rounded-lg border bg-white py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
      >
        <span class="grid grid-flow-col items-center justify-start gap-2 truncate"><div :class="`bg-${current?.color} rounded-full h-2 w-2`" /> {{ current?.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Icon name="bi:chevron-expand" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="shadow-lg absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          <ListboxOption
            v-for="status in data"
            v-slot="{ active, selected }"
            :key="status"
            :value="status"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
              >{{ useStatusPreset(status)?.name }}</span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                <Icon name="material-symbols:check-box-outline" class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup lang="ts">
import type { IObjectStatus } from '~/types'

const props = defineProps<{
  data: IObjectStatus,
  modelValue?: string | string[] | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value?: string | string[] | null): void,
}>()

const state = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emits('update:modelValue', value)
  }
})

const current = computed(() => {
  if (!state.value) { return undefined }
  if (state.value instanceof Array) { return undefined }
  return useStatusPreset(state.value)
})
</script>
