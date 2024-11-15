
<script lang="ts" setup>
//this is a component that is used to display a list of QuestionsFormInputOutput
import { defineProps, defineEmits } from 'vue';
import type { InputOutput } from '~/types';
import  { FunctionConfig } from '~/types/index.d';

const props = defineProps<{
  label: string;
  items: InputOutput[];
  functionConfig: FunctionConfig;
}>();
const emit = defineEmits(['addItem', 'removeItem']);
</script>

<template>
  <UFormGroup :label="props.label" :name="props.label.toLowerCase()">
    <div v-for="(item, index) in props.items" :key="index" class="space-y-2 mb-4">
      <div class="grid grid-cols-3 gap-2 w-full">
        <QuestionsFormInputOutput
          :functionConfig="props.functionConfig"
          :item="item"
          :index="index"
          :removeItem="() => emit('removeItem', index)"
          class="flex-grow"
        />
      </div>
    </div>
    <!-- Add Item Button -->
    <UButton
      size="sm"
      color="primary"
      icon="i-material-symbols:add-box"
      class="mt-2"
      @click="emit('addItem')"
    >
      Add {{ props.label }}
    </UButton>
  </UFormGroup>
</template>