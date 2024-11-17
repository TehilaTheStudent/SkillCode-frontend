<script lang="ts" setup>
// This is a component that is used to display a single QuestionsFormInputOutput
import type { Parameter, VoidType } from "~/types";
import { FunctionConfig, InputOutput } from "~/types/index.d";

const props = defineProps<{
  item: InputOutput;
  index: number;
  function_config: FunctionConfig; // The function configuration
}>();
// console.log(props.function_config);
// Helper function to check if parameters are VoidType
const isVoidType = (parameters: Parameter[] | "VoidType"): boolean => {
  return parameters === "VoidType";
};
</script>

<template>
  <div class="grid grid-cols-1 gap-8 w-full border border-blue-500 p-4 rounded">
    <div class="text-gray-600 font-bold">#{{ props.index + 1 }}</div>
    <!-- Dynamic Inputs Based on FunctionConfig -->
    <div v-if="!isVoidType(props.function_config.parameters)">
      <div
        v-for="(param, paramIndex) in props.function_config.parameters"
        :key="'param-' + paramIndex"
        class="grid grid-cols-1 gap-4 mb-4"
      >
        <!-- Parameter Name and Input -->
        <div class="flex items-center gap-2">
          <div class="flex items-center gap-2 w-full">
            <label class="font-medium">
              <span
                class="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded border border-gray-200 font-mono"
              >
                {{ (param as Parameter).name }} =
              </span>
            </label>
            <label class="font-medium">
              <span
                class="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded border border-gray-200 overflow-hidden overflow-ellipsis whitespace-nowrap max-w-xs"
              >
                {{ (param as Parameter).param_type.toPrint() }}</span
              >
            </label>
          </div>
          <UInput
            v-model="props.item.parameters[paramIndex]"
            :placeholder="'Enter ' + (param as Parameter).name"
            :name="'param-' + props.index + '-' + paramIndex"
            class="w-full"
          />
        </div>
      </div>
    </div>

    <!-- Expected Output -->
    <div>
      <label class="font-medium">Expected Output:</label>
      <UInput
        v-model="props.item.expected_output"
        :placeholder="'Enter Expected Output'"
        :name="'output-' + props.index"
        class="w-full"
      />
    </div>
  </div>
</template>
