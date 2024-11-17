<script lang="ts" setup>
// Import necessary libraries
import { ref, watch, onMounted } from "vue";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

import { PredefinedSupportedLanguage } from "~/types/index.d";

// Ensure a default fallback

const props = defineProps<{
  modelValue: string;
  supportedLanguages: (string | PredefinedSupportedLanguage)[];
}>();
const supportedLanguages = ref(props.supportedLanguages || ["javascript"]);

const emit = defineEmits(["update:modelValue"]);

// Ref to hold the currently selected language
const currentLanguage = ref(props.supportedLanguages[0]);

// Ref for the editor container
const editorContainer = ref<HTMLDivElement | null>(null);

// Ref for the CodeMirror editor instance
let editor: EditorView | null = null;

onMounted(async () => {
  await nextTick(); // Wait for DOM to be available

  // console.log("Mounted QuestionsCodeEditor");

  if (editorContainer.value) {
    // Initialize the editor with 20 blank lines
    const initialContent = props.modelValue + "\n".repeat(16);

    editor = new EditorView({
      doc: initialContent, // Initial code with 20 blank lines
      extensions: [
        basicSetup, // Basic features (line numbers, bracket matching, etc.)
        currentLanguage.value === "javascript" ? javascript() : python(),
        EditorView.updateListener.of((viewUpdate) => {
          if (viewUpdate.docChanged) {
            // Emit the new value when the document changes
            const newValue = viewUpdate.state.doc.toString();
            emit("update:modelValue", newValue);
          }
        }),
      ],
      parent: editorContainer.value,
    });
  }
});

// Watch for changes in the selected language and reconfigure the editor
watch(currentLanguage, (newLang) => {
  if (editor) {
    const newLanguageExtension = newLang === "javascript" ? javascript() : python();

    // Reconfigure editor with the new language
    // editor.dispatch({
    //   effects: EditorView.updateListener.reconfigure(newLanguageExtension),
    // });
  }
});
</script>

<template>
  <div>
    <!-- <ClientOnly> -->
    <div class="space-y-4">
      Language Selector
      <div class="flex items-center space-x-4">
        <label for="language" class="font-medium">Select Language:</label>
        <select
          id="language"
          v-model="currentLanguage"
          class="p-2 border rounded text-gray-700 focus:outline-none focus:ring"
        >
          <option v-for="(lang, index) in props.supportedLanguages" :key="index" :value="lang">
            {{ lang }}
          </option>
        </select>
      </div>

      <!-- Code Editor -->
      <div>
        <h2 class="text-lg font-semibold text-gray-700 mb-2">Code Editor</h2>
        <div ref="editorContainer" class="h-80 border rounded overflow-scroll bg-gray-50"></div>
      </div>
    </div>
    <!-- </ClientOnly> -->
  </div>
</template>
