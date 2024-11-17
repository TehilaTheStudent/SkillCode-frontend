<script lang="ts" setup>
import type { InputOutput } from "~/types";
import { Question } from "~/types/index.d";

const props = defineProps<{ state: Question }>();
const emit = defineEmits(["updateState"]);

const editItem = (index: number, item: InputOutput, isExample: boolean) => {
  // console.log("Edit item");
};
// Function to add a new item
const addItem = (list: InputOutput[]) => {
  list.push({ parameters: [], expected_output: "" });
};

// Function to remove an item
const removeItem = (list: InputOutput[], index: number) => {
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
        :function_config="props.state.function_config"
        @addItem="() => addItem(props.state.examples)"
        @editItem="(index, newItem) => editItem(index, newItem, true)"
        @removeItem="(index) => removeItem(props.state.examples, index)"
      />
    </div>
    <div class="border border-blue-500 p-4 rounded-md">
      <!-- Test Cases -->
      <QuestionsFormItemList
        :label="'Test Cases'"
        :items="props.state.test_cases"
        :function_config="props.state.function_config"
        @addItem="() => addItem(props.state.test_cases)"
        @removeItem="(index) => removeItem(props.state.test_cases, index)"
        @editItem="(index, newItem) => editItem(index, newItem, false)"
      />
    </div>
  </div>
</template>
