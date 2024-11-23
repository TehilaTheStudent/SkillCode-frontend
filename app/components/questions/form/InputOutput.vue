<script lang="ts" setup>
// This is a component that is used to display a single QuestionsFormInputOutput,
//in the list if ItemList, to edit single testcase/example (parameters + return type)
import type { Parameter, VoidType } from "~/types";
import { FunctionConfig, InputOutput, AbstractType } from "~/types/index.d";
import { onMounted } from "vue";

const returnTypeExample = ref<string>("");
const props = defineProps<{
  item: InputOutput;
  index: number;
  function_config: FunctionConfig; // The function configuration
}>();

// Helper function to check if parameters are VoidType
const isVoidType = (parameters: Parameter[] | "VoidType"): boolean => {
  return parameters === "VoidType";
};
const config = useRuntimeConfig();
const parametersExamples = ref<string[]>(
  props.function_config.parameters !== "VoidType"
    ? Array(props.function_config.parameters.length).fill("")
    : []
);
const apiUrl = `${config.public.backendUrl}/ds_utils/examples`;
const fetchExample = async (type: AbstractType): Promise<string> => {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(type),
    });
    const data = await response.json();
    return data.example;
  } catch (error) {
    console.error("Error fetching example:", error);
    return "Error fetching example";
  }
};

const updateParameterValue = (index: number, value: string) => {
  if (index === -1) {
    props.item.expected_output = value;
  } else {
    props.item.parameters[index] = value;
  }
};

if (!isVoidType(props.function_config.parameters)) {
  for (const [index, param] of (props.function_config.parameters as Parameter[]).entries()) {
    parametersExamples.value[index] = await fetchExample(param.param_type);
  }
}
if (props.function_config.return_type !== "VoidType")
  returnTypeExample.value = await fetchExample(props.function_config.return_type);
</script>

<template>
 
  <div >
    <div class="text-gray-600 font-bold">#{{ props.index + 1 }}</div>
    <!-- Dynamic Inputs Based on FunctionConfig -->
    <p>Parameters:</p>
    <div v-if="!isVoidType(props.function_config.parameters)">
      <div
        v-for="(param, paramIndex) in props.function_config.parameters"
        :key="'param-' + paramIndex"
        class="grid grid-cols-1 gap-4 mb-4"
      >
        <QuestionsFormSingleParameter
          :param="(param as Parameter)"
          :paramIndex="paramIndex"
          :example="parametersExamples[paramIndex]"
          :parameterValue="props.item.parameters[paramIndex]"
          :isReturnType="false"
          @update:modelValue="updateParameterValue"
        />
      </div>
    </div>
    <div v-else>Void</div>
    <!-- Expected Output -->
    <p class="font-medium">Expected Output:</p>
    <div v-if="props.function_config.return_type !== 'VoidType'" class="flex items-center gap-2">
      <QuestionsFormSingleParameter
        :param="{ name: 'expected output', param_type: props.function_config.return_type }"
        :paramIndex="props.index"
        :example="returnTypeExample"
        :parameterValue="props.item.expected_output"
        :isReturnType="true"
        @update:modelValue="updateParameterValue"
      />
    </div>
    <div v-else>Void</div>
  </div>
</template>
