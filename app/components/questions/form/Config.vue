<script lang="ts" setup>
import { AtomicType, AbstractType, Question, FunctionConfig } from "~/types/index.d";
import type { Parameter, VoidType } from "~/types";
const props = defineProps<{ state: Question }>();
const emit = defineEmits(["updateState"]);

function updateState() {
  emit("updateState", props.state);
}
function updateParameters(parameters: Parameter[] | VoidType) {
  // console.log("updateParameters", parameters);
  props.state.function_config.parameters = parameters;
  updateState();
}
function updatereturn_type(return_type: AbstractType | VoidType) {
  // console.log("updatereturn_type", return_type);
  props.state.function_config.return_type = return_type;
  updateState();
}
</script>

<template>
  <div>
    <UFormGroup label="Function Name" name="functionName">
      <UInput v-model="props.state.function_config.name" />
    </UFormGroup>
    <QuestionsFormParametersSection
      :parameters="props.state.function_config.parameters"
      @updateParameters="updateParameters"
    />
    <QuestionsFormReturnTypeSection
      :return_type="props.state.function_config.return_type"
      @updatereturn_type="updatereturn_type"
    />
  </div>
</template>
