<script setup lang="ts">
import { type Feedback } from "~/types/index.d";
import { computed } from "vue";

// Props for the feedback object
const props = defineProps<{ feedback: Feedback }>();

// Dynamic classes for the overall status
const statusClasses = computed(() =>
  props.feedback.status === "success"
    ? "bg-green-50 border-green-300 text-green-700"
    : "bg-red-50 border-red-300 text-red-700"
);

// Define progress for compilation, testing, and validation
const stages = computed(() => {
  const stages = [
    { name: "Compilation", status: "pending" },
    { name: "Testing", status: "pending" },
    { name: "Validation", status: "pending" },
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
      case "schema validation":
        stages[0].status = "success";
        stages[1].status = "success";
        stages[2].status = "fail";
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
    <h2 class="text-2xl font-bold text-gray-800">Feedback</h2>

    <!-- Overall Status -->
    <div :class="statusClasses" class="flex items-center space-x-3 p-4 rounded-lg">
      <span v-if="feedback.status === 'success'" class="i-heroicons-check-circle-20-solid text-lg"></span>
      <span v-else class="i-heroicons-x-circle-20-solid text-lg"></span>
      <span class="text-lg font-medium">{{ feedback.status === 'success' ? 'All stages passed!' : 'Some stages failed' }}</span>
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
            'bg-gray-50 border-gray-300': stage.status === 'pending'
          }"
        >
          <span
            :class="{
              'i-heroicons-check-circle-20-solid text-green-600': stage.status === 'success',
              'i-heroicons-x-circle-20-solid text-red-600': stage.status === 'fail',
              'i-heroicons-clock-20-solid text-gray-600': stage.status === 'pending'
            }"
            class="mr-3"
          ></span>
          <span class="text-sm font-medium">{{ stage.name }}</span>
          <span
            class="ml-auto text-sm font-semibold"
            :class="{
              'text-green-600': stage.status === 'success',
              'text-red-600': stage.status === 'fail',
              'text-gray-600': stage.status === 'pending'
            }"
          >
            {{ stage.status === 'success' ? '✔️ Passed' : stage.status === 'fail' ? '❌ Failed' : '⏳ Pending' }}
          </span>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-if="feedback.results.length > 0" class="space-y-4">
      <h3 class="text-xl font-semibold text-gray-700">Test Case Results</h3>
      <div class="space-y-2">
        <div
          v-for="(result, index) in feedback.results"
          :key="index"
          class="flex items-center justify-between p-4 border rounded-lg"
          :class="{ 'bg-green-50 border-green-300': result.status === 'pass', 'bg-red-50 border-red-300': result.status === 'fail' }"
        >
          <div>
            <p class="text-sm font-medium text-gray-800">Parameters:</p>
            <pre class="bg-gray-100 p-2 rounded text-sm text-gray-700">{{ result.parameters.join(', ') }}</pre>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">Expected Output:</p>
            <span class="text-sm text-gray-700">{{ result.expected_output }}</span>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-800">Actual Output:</p>
            <span
              :class="{ 'text-green-600': result.status === 'pass', 'text-red-600': result.status === 'fail' }"
              class="text-sm font-semibold"
            >
              {{ result.actual_output }}
            </span>
          </div>
          <div>
            <span
              :class="{ 'text-green-600': result.status === 'pass', 'text-red-600': result.status === 'fail' }"
              class="font-bold"
            >
              {{ result.status === 'pass' ? '✔️ Pass' : '❌ Fail' }}
            </span>
          </div>
        </div>
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
