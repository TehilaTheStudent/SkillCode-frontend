<script setup lang="ts">
import { type Feedback, type Result } from "~/types/index.d";

// Props for the feedback object
const props = defineProps<{ feedback: Feedback }>();
// Dynamic classes for the overall status
const statusClasses = computed(() =>
  props.feedback.status === "success"
    ? "bg-green-50 border-green-300 text-green-700"
    : "bg-red-50 border-red-300 text-red-700"
);

const failedTestsCount = computed(() => props.feedback.results.filter((result) => result.status === 'fail').length)

// Define progress for compilation, testing, and validation
const stages = computed(() => {
  const stages = [
    { name: "Compilation", status: "didnt execute" },
    { name: "Testing", status: "didnt execute" },
  ];

  // Determine progress based on error
  if (props.feedback.error) {
    switch (props.feedback.error) {
      case "compilation":
        stages[0].status = "fail";
        break;
      case "fail tests":
        stages[0].status = "success";
        stages[1].status = "fail";
        break;
    }
  } else {
    stages.forEach((stage) => (stage.status = "success"));
  }

  return stages;
});
</script>

<template>
  <div class="space-y-6 p-6 bg-white shadow rounded-lg">
    <!-- Overall Status -->
    <div :class="statusClasses" class="flex items-center space-x-3 p-4 rounded-lg">
      <span v-if="feedback.status === 'success'" class="i-heroicons-check-circle-20-solid text-lg"></span>
      <span v-else class="i-heroicons-x-circle-20-solid text-lg"></span>
      <span class="text-lg font-medium">{{
        feedback.status === "success" ? "All stages passed!" : "Some stages failed"
      }}</span>
    </div>

    <!-- Stages -->
    <div class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Progress</h3>
      <div class="space-y-2">
        <div
          v-for="(stage, index) in stages"
          :key="index"
          class="flex items-center p-4 rounded-lg border"
          :class="{
            'bg-green-50 border-green-300': stage.status === 'success',
            'bg-red-50 border-red-300': stage.status === 'fail',
            'bg-gray-50 border-gray-300': stage.status === 'didnt execute',
          }"
        >
          <span
            :class="{
              'i-heroicons-check-circle-20-solid text-green-600': stage.status === 'success',
              'i-heroicons-x-circle-20-solid text-red-600': stage.status === 'fail',
              'i-heroicons-clock-20-solid text-gray-600': stage.status === 'didnt execute',
            }"
            class="mr-3"
          ></span>
          <span class="text-sm font-medium">{{ stage.name }}</span>
          <span
            class="ml-auto text-sm font-semibold"
            :class="{
              'text-green-600': stage.status === 'success',
              'text-red-600': stage.status === 'fail',
              'text-gray-600': stage.status === 'didnt execute',
            }"
          >
            {{
              stage.status === "success"
                ? "✔️ Passed"
                : stage.status === "fail"
                ? "❌ Failed"
                : "⏳ Didnt Execute "
            }}
          </span>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="feedback.results.length > 0" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Failed Tests {{ failedTestsCount }}/{{ feedback.results.length }}</h3>
      <div class="space-y-2">
        <QuestionsTestCaseFeedback
          v-for="(result, index) in feedback.results.filter((result) => result.status === 'fail')"
          :key="index"
          :result="result"
        />
      </div>
    </div>

    <!-- Error and Details -->
    <div v-if="feedback.error" class="space-y-2 p-4 bg-red-50 border border-red-300 rounded-lg">
      <h3 class="text-xl font-semibold text-red-600">Error</h3>
      <p class="text-sm text-red-800 font-medium">Type: {{ feedback.error }}</p>
      <p class="text-sm text-red-800">Details: {{ feedback.details }}</p>
    </div>
  </div>
</template>

<style scoped>
pre {
  white-space: pre-wrap; /* Allow line wrapping for long parameter strings */
}
</style>
