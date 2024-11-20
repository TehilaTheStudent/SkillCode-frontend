<script lang="ts" setup>
// Import necessary libraries
import { ref, watch, onMounted, onUnmounted, nextTick } from "vue";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { StateEffect } from "@codemirror/state";
import { PredefinedSupportedLanguage } from "~/types/index.d";

// Ensure a default fallback
const props = defineProps<{
  questionId: string; // The question ID to fetch the function signature
  modelValue: string; // Initial content for the editor
  supportedLanguages: PredefinedSupportedLanguage[]; // Supported languages
}>();
const emit = defineEmits(["update:modelValue", "update:language"]);

// Ref to hold the currently selected language
const currentLanguage = ref(
  props.supportedLanguages[0] || PredefinedSupportedLanguage.Python // Default to Python
);

// Ref for the editor container
const editorContainer = ref<HTMLDivElement | null>(null);

// Ref for the CodeMirror editor instance
let editor: EditorView | null = null;

// Ref to hold the fetched function signature
const functionSignature = ref("");
const config = useRuntimeConfig();
const apiUrl = `${config.public.backendUrl}/questions`;
// Fetch the function signature from the backend
async function fetchFunctionSignature() {
  try {
    const response = await fetch(
      `${apiUrl}/${props.questionId}/signature?language=${(
        currentLanguage.value || PredefinedSupportedLanguage.Python
      ).toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch function signature");
    }
    const data = await response.json();
    functionSignature.value = data.function_signature + "\n".repeat(16);
    emit("update:modelValue", data.function_signature);
  } catch (error) {
    console.error("Error fetching function signature:", error);
    functionSignature.value = "// Unable to fetch function signature.";
  }
}

// Initialize CodeMirror editor on mount
onMounted(async () => {
  await fetchFunctionSignature(); // Fetch the function signature

  await nextTick(); // Wait for DOM to be available

  if (editorContainer.value) {
    // Initialize the editor with the fetched function signature or blank lines
    const initialContent = functionSignature.value || props.modelValue;

    editor = new EditorView({
      doc: initialContent,
      extensions: [
        basicSetup, // Basic features (line numbers, bracket matching, etc.)
        currentLanguage.value === PredefinedSupportedLanguage.JavaScript ? javascript() : python(),
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

  console.log("Editor initialized");
});

// Watch for changes in the selected language
watch(currentLanguage, async (newLang) => {
  if (editor) {
    // Fetch the function signature for the new language
    await fetchFunctionSignature();
    emit("update:language", newLang);

    // Update the editor's content with the new function signature
    const newContent = functionSignature.value || ""; // Ensure fallback to empty string
    editor.dispatch({
      changes: { from: 0, to: editor.state.doc.length, insert: newContent },
      effects: StateEffect.reconfigure.of([
        basicSetup,
        newLang === PredefinedSupportedLanguage.JavaScript ? javascript() : python(),
        // Rebind the update listener to track changes
        EditorView.updateListener.of((viewUpdate) => {
          if (viewUpdate.docChanged) {
            const updatedValue = viewUpdate.state.doc.toString();
            emit("update:modelValue", updatedValue);
          }
        }),
      ]),
    });

    // Emit the new content to keep the parent in sync
    emit("update:modelValue", newContent);
  }
});

// Watch for changes in `modelValue` to keep the editor in sync
watch(
  () => props.modelValue,
  (newValue) => {
    if (editor && newValue !== editor.state.doc.toString()) {
      editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: newValue },
      });
    }
  }
);

async function openUtilsWindow() {
  try {
    // Fetch the utils content from the backend
    const response = await fetch(
      `${config.public.backendUrl}/utils?language=${currentLanguage.value.toLowerCase()}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch utils file");
    }

    // Get the utils file content as text
    const utilsContent = await response.text();
    // Fetch the template HTML file
    const templateResponse = await fetch("/static/utils-template.html");
    if (!templateResponse.ok) {
      throw new Error("Failed to load the template");
    }

    // Get the template HTML as a string
    let templateHtml = await templateResponse.text();

    // Replace placeholders with dynamic values
    templateHtml = templateHtml.replace(/{{LANGUAGE}}/g, currentLanguage.value.toLowerCase());
    templateHtml = templateHtml.replace(
      '<pre id="utils-content"></pre>',
      `<pre id="utils-content" class="language-${currentLanguage.value.toLowerCase()}"><code>${utilsContent}</code></pre>`
    );
    // Open a new window and write the dynamically generated HTML
    const newWindow = window.open("", "_blank", "width=1200,height=800,scrollbars=yes");
    if (newWindow) {
      newWindow.document.open();
      newWindow.document.write(templateHtml);
      newWindow.document.close();
    } else {
      console.error("Failed to open a new window");
    }
  } catch (error) {
    console.error("Error opening utils window:", error);
    alert("Failed to load utils content. Please try again later.");
  }
}

// Cleanup editor on component unmount
onUnmounted(() => {
  if (editor) {
    editor.destroy();
    editor = null;
  }
});
</script>

<template>
  <div>
    <div class="space-y-4">
      <!-- Language Selector and Show Utils Button -->
      <div class="flex items-center space-x-4">
        <label for="language" class="font-medium">Select Language:</label>
        <select
          id="language"
          v-model="currentLanguage"
          class="p-2 border rounded text-gray-700 focus:outline-none focus:ring"
        >
          <option v-for="(lang, index) in props.supportedLanguages || []" :key="index" :value="lang">
            {{ lang }}
          </option>
        </select>
        <UButton @click="openUtilsWindow" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Show Data Strucutes & Utils
        </UButton>
      </div>

      <!-- Code Editor -->
      <div>
        <div ref="editorContainer" class="h-80 border rounded overflow-scroll bg-gray-50"></div>
      </div>
    </div>
  </div>
</template>
