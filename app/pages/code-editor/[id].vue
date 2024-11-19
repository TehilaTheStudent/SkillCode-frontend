<script lang="ts" setup>
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { PredefinedSupportedLanguage, Question } from "~/types/index.d";

const code = ref("// Write your solution here");
const editorContainer = ref<HTMLDivElement | null>(null);
const route = useRoute();
const questionId: string = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
const language = ref<PredefinedSupportedLanguage>(PredefinedSupportedLanguage.Python); // Default language
const showDescriptionModal = ref(false); // Add showModal ref
const isSubmitting = ref(false); // Add isSubmitting ref
const submissionStatus = ref<"idle" | "success" | "error">("idle"); // Add submissionStatus ref
const config = useRuntimeConfig();
const apiUrl = `${config.public.backendUrl}/questions`;
// Fetch the question details
const question = ref<Question>(new Question());
// Ref to track loading state
const isLoading = ref(true);
onMounted(async () => {
  const data: Question = await $fetch<Question>(`${apiUrl}/${questionId}`, {
    onResponseError({ response }) {
      console.error("Failed to fetch question:", response);
    },
  });
  question.value = data;
  let editor: EditorView | null = null;
  isLoading.value = false;
  watchEffect(() => {
    if (editorContainer.value) {
      if (editor) editor.destroy(); // Cleanup the previous editor

      const langExtension =
        language.value === PredefinedSupportedLanguage.JavaScript ? javascript() : python();
      editor = new EditorView({
        doc: code.value,
        extensions: [basicSetup, langExtension],
        parent: editorContainer.value,
      });
    }
  });
});

// Submit code to the backend
const submitSolution = async () => {
  isSubmitting.value = true;
  submissionStatus.value = "idle";
  console.log("Submitting solution...");
  const response = await fetch(`${apiUrl}/${questionId}/test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: code.value,
      language: language.value,
    }),
  });

  isSubmitting.value = false;
  if (response.ok) {
    const result = await response.json();
    submissionStatus.value = "success";
    alert("Solution submitted successfully: " + JSON.stringify(result));
  } else {
    submissionStatus.value = "error";
    alert("Failed to submit the solution");
  }
};

const updateLanguage = (newLanguage: PredefinedSupportedLanguage) => {
  language.value = newLanguage;
};
</script>
<template>
  <div class="w-full p-4 space-y-6">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-gray-800">{{ question?.title || "Loading Question..." }}</h1>

    <!-- Modal Trigger Button -->
    <USkeleton v-if="isLoading" class="h-10 w-[250px]"> </USkeleton>
    <UButton
      v-else
      @click="showDescriptionModal = true"
      variant="outline"
      label="View Description & Examples"
      icon="i-heroicons-eye"
      class="flex items-center space-x-2 text-blue-500"
    />

    <!-- Modal -->
    <UDashboardModal
      title="Description & Examples"
      :ui="{ width: 'sm:max-w-2xl' }"
      v-model="showDescriptionModal"
    >
      <QuestionsDescriptionExamples :selectedQuestion="question"></QuestionsDescriptionExamples>
    </UDashboardModal>

    <USkeleton v-if="isLoading" class="h-[400px] w-full"> </USkeleton>
    <QuestionsCodeEditor
      v-else
      :modelValue="code"
      :supportedLanguages="question?.languages || []"
      :questionId="questionId"
      @update:modelValue="code = $event"
      @update:language="updateLanguage"
    />
    <!-- </ClientOnly> -->

    <!-- Submit Button -->
    <div class="text-right">
      <UButton
        @click="submitSolution"
        :loading="isSubmitting"
        :disabled="isSubmitting || question.title == ''"
        variant="solid"
        color="blue"
        class="px-4 py-2"
        icon="i-codicon:run-all"
      >
        <span v-if="isSubmitting">Submitting...</span>
        <span v-else>Submit Solution</span>
      </UButton>
      <div v-if="submissionStatus === 'success'" class="text-green-500 mt-2">
        Solution submitted successfully!
      </div>
      <div v-if="submissionStatus === 'error'" class="text-red-500 mt-2">Failed to submit the solution.</div>
    </div>
  </div>
</template>
