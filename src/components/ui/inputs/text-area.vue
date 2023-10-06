<template>
    <div>
        <EditorContent :editor="editor" />
    </div>
</template>

<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const props = defineProps<{ modelValue: string }>()
const emits = defineEmits<{
    (e: 'update:modelValue', value: string): void,
}>()

const state = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emits('update:modelValue', value)
    }
})

const editor = useEditor({
    content: state.value,
    editorProps: {
        attributes: {
            class: 'w-full prose my-6 mx-auto focus:outline-none',
        },
    },
    onUpdate: () => {
        state.value = editor.value?.getHTML()
    },
    extensions: [
        StarterKit,
    ],
})
</script>