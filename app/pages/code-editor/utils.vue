<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { EditorView, basicSetup } from "codemirror";
import { python } from "@codemirror/lang-python";

definePageMeta({
  layout: false,
});

const editorContainer = ref<HTMLDivElement | null>(null);

onMounted(async () => {
  const response = await fetch("/static/datastructuresutils.py");
  const fileContent = await response.text();

  new EditorView({
    doc: fileContent,
    extensions: [basicSetup, python()],
    parent: editorContainer.value,
  });
});
</script>
<template>
  <div class="p-4">
    <h1 class="text-2xl font-bold mb-4">Utilities</h1>
    <div ref="editorContainer" class="height-80vh border rounded bg-gray-50 overflow-auto"></div>
  </div>
</template>

<style scoped>
.height-80vh {
  height: 80vh;
  overflow: auto;
}
</style>
