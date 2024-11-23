<script lang="ts" setup>
import type { Parameter, AbstractType } from "~/types";

const props = defineProps<{
  param: Parameter;
  paramIndex: number;
  example: string |  undefined;
  parameterValue: string|undefined;
  isReturnType: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);

const localParameterValue = ref(props.parameterValue);

watch(() => props.parameterValue, (newValue) => {
  localParameterValue.value = newValue;
});
</script>
<template>
  <div class="flex flex-col gap-2">
    <div class="flex items-center gap-2 w-full">
      <label class="font-medium">
        <span
          class="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded border border-gray-200 font-mono"
        >
          {{ props.param.name }} =
        </span>
      </label>
      <label class="font-medium">
        <span
          class="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded border border-gray-200 overflow-hidden text-ellipsis whitespace-nowrap max-w-full"
        >
          {{ props.param.param_type.toPrint() }}</span
        >
      </label>
      <UPopover :popper="{ placement: 'top-end' }">
        <UButton color="white" trailing-icon="i-material-symbols-light:lightbulb-2-outline"></UButton>
        <template #panel>
          <div class="p-4">
            {{ props.example }}
          </div>
        </template>
      </UPopover>
    </div>
    <div class="w-full">
      <UInput
        v-model="localParameterValue"
        :placeholder="'Enter ' + props.param.name"
        :name="'param-' + props.paramIndex"
        class="w-full"
        @update:modelValue="emit('update:modelValue', props.isReturnType ? -1 : props.paramIndex, $event)"
      />
    </div>
  </div>
</template>

