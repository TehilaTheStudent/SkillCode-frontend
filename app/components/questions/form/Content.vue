<script lang="ts" setup>
import { QuestionsFormItemList } from '#components';
import type { Question } from '~/types';

const props = defineProps<{ state: Question }>();
const emit = defineEmits(["updateState"]);

// Function to add a new item
const addItem = (list: any[]) => {
  list.push({ parameters: [""], expectedOutput: "" });
};

// Function to remove an item
const removeItem = (list: any[], index: number) => {
  list.splice(index, 1);
};
</script>

<template>
  <div>
    <div class="border border-blue-500 p-4 rounded-md mb-4">
      <!-- Examples -->
      <QuestionsFormItemList
        :label="'Examples'"
        :items="props.state.examples"
        :functionConfig="props.state.functionConfig"
        @addItem="() => addItem(props.state.examples)"
        @removeItem="(index) => removeItem(props.state.examples, index)"
      />
    </div>
    <div class="border border-blue-500 p-4 rounded-md">
      <!-- Test Cases -->
      <QuestionsFormItemList
        :label="'Test Cases'"
        :items="props.state.testCases"
        :functionConfig="props.state.functionConfig"
        @addItem="() => addItem(props.state.testCases)"
        @removeItem="(index) => removeItem(props.state.testCases, index)"
      />
    </div>
  </div>
</template>
