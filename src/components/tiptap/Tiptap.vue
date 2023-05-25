<template>
  <editor-content :editor="editor!" />
</template>

<script setup lang="ts">
  import { EditorContent, useEditor } from '@tiptap/vue-3';
  import { StarterKit } from '@tiptap/starter-kit';

  const editor = useEditor({
    content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    extensions: [StarterKit],
  });

  // onMounted(() => {
  //   editor = new Editor({
  //     content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
  //     extensions: [StarterKit],
  //   });
  // });
  //
  // onBeforeMount(() => {
  //   editor?.destroy();
  // });
</script>

