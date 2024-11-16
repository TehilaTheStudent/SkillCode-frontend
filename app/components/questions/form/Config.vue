<script lang="ts" setup>
import { AtomicType, AbstractType, Question, FunctionConfig } from "~/types/index.d";
import type { Parameter, VoidType } from "~/types";
const props = defineProps<{ state: Question }>();
const emit = defineEmits(["updateState"]);

function updateState() {
  emit("updateState", props.state);
}
function updateParameters(parameters: Parameter[] | VoidType) {
  console.log("updateParameters", parameters);
  props.state.functionConfig.parameters = parameters;
  updateState();
}
function updateReturnType(returnType: AbstractType | VoidType) {
  console.log("updateReturnType", returnType);
  props.state.functionConfig.returnType = returnType;
  updateState();
}
</script>

<template>
  <div>
    <UFormGroup label="Function Name" name="functionName">
      <UInput v-model="props.state.functionConfig.name" />
    </UFormGroup>
    <QuestionsFormParametersSection
      :parameters="props.state.functionConfig.parameters"
      @updateParameters="updateParameters"
    />
    <QuestionsFormReturnTypeSection
      :returnType="props.state.functionConfig.returnType"
      @updateReturnType="updateReturnType"
    />
  </div>
</template>
