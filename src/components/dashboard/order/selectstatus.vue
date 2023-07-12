<template>
  <Listbox v-model="state">
    <div class="relative mt-1 z-50">
      <ListboxButton
        class="relative border cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
        <span class="grid grid-flow-col justify-start gap-2 items-center truncate"><div :class="`bg-${current?.color} rounded-full h-2 w-2`" /> {{ current?.name }}</span>
        <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
          <Icon name="bi:chevron-expand" class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute transform z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption v-slot="{ active, selected }" v-for="status in data" :key="status" :value="status"
            as="template">
            <li :class="[
              active ? 'bg-amber-100 text-amber-900' : 'text-gray-900',
              'relative cursor-default select-none py-2 pl-10 pr-4',
            ]">
              <span :class="[
                selected ? 'font-medium' : 'font-normal',
                'block truncate',
              ]">{{ useStatusPreset(status)?.name }}</span>
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
const data = await $fetch('/api/v1/order/status')

const props = defineProps<{
  modelValue?: string | string[] | null
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', value?: string | string[] | null): void,
}>()

const state = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const current = computed(() => {
  if (!state.value) return undefined;
  if (state.value instanceof Array) return undefined;
  return useStatusPreset(state.value)
});
</script>