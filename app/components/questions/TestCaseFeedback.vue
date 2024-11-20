<script lang="ts" setup>
import { type Result } from "~/types";
// Props for the test case result
const props = defineProps<{ result: Result }>();
</script>
<template>
  <div
    class="flex flex-col p-4 border rounded-lg"
    :class="{
      'bg-green-50 border-green-300': result.status === 'pass',
      'bg-red-50 border-red-300': result.status === 'fail',
    }"
  >
    <div class="mb-2 flex">
      <p class="text-sm font-medium text-gray-800 mr-2">Parameters:</p>
      <span class="text-sm text-gray-700">{{ result.parameters.join(", ") }}</span>
    </div>
    <div class="mb-2 flex">
      <p class="text-sm font-medium text-gray-800 mr-2">Expected Output:</p>
      <span class="text-sm text-gray-700">{{ result.expected_output }}</span>
    </div>
    <div class="mb-2 flex">
      <p class="text-sm font-medium text-gray-800 mr-2">Actual Output:</p>
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
      </span>
    </div>
  </div>
</template>
