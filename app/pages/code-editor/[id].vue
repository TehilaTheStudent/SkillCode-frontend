<script lang="ts" setup>
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { Question } from "~/types/index.d";

const code = ref("// Write your solution here");
const editorContainer = ref<HTMLDivElement | null>(null);
const route = useRoute();
const questionId = route.params.id;
const language = ref("javascript"); // Default language
const showModal = ref(false); // Add showModal ref
const config = useRuntimeConfig();
const apiUrl = `${config.public.backendUrl}/questions`;
// Fetch the question details
const { data: question } = await useFetch<Question>(`${apiUrl}/${questionId}`, {
  default: () => null,
});

onMounted(() => {
  let editor: EditorView | null = null;

  watchEffect(() => {
    if (editorContainer.value) {
      const langExtension = language.value === "javascript" ? javascript() : python();
      editor = new EditorView({
        doc: question.value.title || code.value,
        extensions: [basicSetup, langExtension],
        parent: editorContainer.value,
      });
    }
  });
});

// Submit code to the backend
const submitSolution = async () => {
  const response = await fetch(`${apiUrl}/${questionId}/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: code.value,
      language: language.value,
    }),
  });

  if (response.ok) {
    const result = await response.json();
    alert("Solution submitted successfully: " + JSON.stringify(result));
  } else {
    alert("Failed to submit the solution");
  }
};
</script>

<style scoped>
.modal-content {
  max-height: 80vh;
  overflow-y: auto;
}
</style>

<template>
  <div></div>
  <div class="w-full p-4 space-y-6">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-gray-800">{{ question?.title || "Loading..." }}</h1>

    <!-- Modal Trigger Button -->
    <UButton
      @click="showModal = true"
      variant="outline"
      icon="i-mdi:head-lightbulb"
      class="flex items-center space-x-2 text-blue-500 hover:underline"
    >
      <span>Description & Examples</span>
    </UButton>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded shadow-lg w-3/4 max-w-2xl modal-content">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold">Description & Examples</h2>
          <button @click="showModal = false" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path
                fill-rule="evenodd"
                d="M10 9.293l4.646-4.647a.5.5 0 01.708.708L10.707 10l4.647 4.646a.5.5 0 01-.708.708L10 10.707l-4.646 4.647a.5.5 0 01-.708-.708L9.293 10 4.646 5.354a.5.5 0 01.708-.708L10 9.293z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </div>
        <!-- Description -->
        <div class="text-gray-600 mb-4">
          <p>{{ question?.description || "Loading question description..." }}</p>
        </div>
        <!-- Examples -->
        <div class="bg-gray-100 p-4 rounded shadow-sm">
          <h2 class="text-lg font-semibold text-gray-700">Examples</h2>
          <ul class="list-disc list-inside">
            <li v-for="(example, index) in question?.examples || []" :key="index">
              <pre class="text-sm bg-gray-200 p-2 rounded">{{ JSON.stringify(example, null, 2) }}</pre>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- <ClientOnly> -->
    <QuestionsCodeEditor
      :modelValue="code"
      :supportedLanguages="question.languages"
      @update:modelValue="code = $event"
    />
    <!-- </ClientOnly> -->

    <!-- Submit Button -->
    <div class="text-right">
      <button
        @click="submitSolution"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring"
      >
        Submit Solution
      </button>
    </div>
  </div>
</template>
