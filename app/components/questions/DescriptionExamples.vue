<script setup lang="ts">
import { Question } from "~/types/index.d";
import { NList, NListItem, NText } from "naive-ui";
const props = defineProps({
  selectedQuestion: {
    type: Object as () => Question,
    required: true,
  },
});
</script>

<template>
  <p>{{ selectedQuestion.description }}</p>
  <n-list v-if="selectedQuestion.examples.length">
    <n-list-item v-for="(example, index) in selectedQuestion.examples" :key="index">
      <n-text> Input: {{ example.parameters.join(", ") }} Output: {{ example.expected_output }}</n-text>
    </n-list-item>
  </n-list>
</template>
