<template>
  <div>
    <div @drop.prevent="drop" @change="selectedFile">
      <div @dragenter.prevent="toggleActive" @dragleave.prevent="toggleActive" @dragover.prevent
        @drop.prevent="toggleActive" :class="{ 'active-dropzone': active }" class="dropzone">
        <span>Arraste</span>
        <span>ou</span>
        <label for="file" class="rounded-md btn btn-primary btn-sm">Selecione seu Arquivo</label>
        <input type="file" id="file" :multiple="true" ref="dropRef" class="modelValue" />
      </div>
    </div>
    <div v-if="modelValue?.length > 0" ref="parent" @click.prevent class="grid gap-4 grid-cols-3 mt-4">
      <div class="rounded-lg relative" style="aspect-ratio: 1" v-for="(image, i) in modelValue" :key="i">
        <img v-if="image" class="object-cover rounded-lg w-full h-full" :alt="`uploaded-image-${i}`" :src="url.createObjectURL(image)" />
        <Icon name="mdi:delete" class="absolute right-0 top-0 h-6 w-6 bg-white rounded-full m-2 p-1"
          @click="modelValue?.splice(i, 1)" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps<{
  modelValue: Array<File>
}>()
const emits = defineEmits<{
  (e: 'update:modelValue', value: Array<File>): void
}>()
const modelValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emits('update:modelValue', value)
  }
})

const dropRef = ref<any>();


const active = ref(false);
const toggleActive = () => {
  active.value = !active.value;
};

const url = URL;
const file = File;

const drop = (e: any) => {
  Array.prototype.forEach.call(e.dataTransfer.files, function (file) {
    if (!(file instanceof File))
      return console.error("Not a valid File");
    if (!file.type.startsWith("image/"))
      return console.error("The selected file is not an image!");
    if (file.size > 5242880)
      return console.error("The dropped file is larger than 5MB!");
    modelValue.value.push(file);
  })
};
const selectedFile = () => {
  try {
    Array.prototype.forEach.call(dropRef.value.files, function (file) {
      if (!(file instanceof File))
        return console.error("Not a valid File");
      if (!file.type.startsWith("image/"))
        return console.error("The selected file is not an image!");
      if (file.size > 5242880)
        return console.error("The dropped file is larger than 5MB!");
      modelValue.value.push(file);
    });
  } catch (e) {
    console.error("Selection stopped by user.");
  }
};
// emit to parent on change
</script>

<style scoped lang="scss">
.dropzone {
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 16px;
  @apply border-dashed border-2 rounded-xl;
  background-color: #fff;
  transition: 0.3s ease all;

  label {
    padding: 8px 12px;
    color: #fff;
    @apply bg-primary;
    transition: 0.3s ease all;
  }

  input {
    display: none;
  }
}

.active-dropzone {
  color: #fff;
  border-color: #fff;
  @apply bg-primary border-none;

  label {
    background-color: #fff;
    @apply text-black;
  }
}
</style>
