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
            class: 'w-full prose mx-auto focus:outline-none',
        },
    },
    onUpdate: () => {
        const html = editor.value?.getHTML()
        if (!html) return state.value = '';
        state.value = html
    },
    extensions: [
        StarterKit,
    ],
})

//watchEffect(() => editor.value?.commands.setContent(state.value))
watch(state, () => {
    editor.value?.commands.setContent(state.value)
})

</script>