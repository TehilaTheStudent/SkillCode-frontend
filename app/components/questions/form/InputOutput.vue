<script lang="ts" setup>
//this is a component that is used to display a single QuestionsFormInputOutput
import { InputOutput } from '~/types';
import {FunctionConfig } from '~/types/index.d'
const props = defineProps<{
  item: InputOutput;
  index: number;
  removeItem: (index: number) => void;
  functionConfig: any; // Add this line
}>();
</script>
<template>
  <div class="grid grid-cols-3 gap-2 w-full">
    <!-- Parameter -->
    <UInput v-model="props.item.parameters[0]" :placeholder="'Parameter'" :name="'param' + props.index" />
    <!-- Expected Output -->
    <UInput
      v-model="props.item.expectedOutput"
      :placeholder="'Expected Output'"
      :name="'output' + props.index"
    />
    <!-- Delete Button -->
    <UButton
      size="sm"
      color="red"
      icon="i-material-symbols:delete-forever"
      @click="props.removeItem(props.index)"
    >
      Delete
    </UButton>
  </div>
</template>
