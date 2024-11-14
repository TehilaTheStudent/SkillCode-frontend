<script setup lang="ts">
import type { InputOutput } from "~/types";
import { NList, NListItem, NText } from "naive-ui";
defineProps({
  title: {
    type: String,
    required: true,
    default: "",
  },
  description: {
    type: String,
    required: true,
    default: "",
  },
  examples: {
    type: Object as () => InputOutput[],
    required: false,
    default: () => [],
  },
});
</script>

<template>
  <p>{{ title }}</p>
  <p>{{ description }}</p>
  <n-list v-if="examples.length">
    <n-list-item v-for="(example, index) in examples" :key="index">
      <n-text> Input: {{ example.parameters.join(", ") }} Output: {{ example.expectedOutput }}</n-text>
    </n-list-item>
  </n-list>
</template>
