<script lang="ts" setup>
import { AtomicType, CompositeType } from "~/types/index.d";

const props = defineProps<{
  index: number;
  selectedVarTypeInIndex: string;
}>();
// console.log(props.selectedVarTypeInIndex);
const selected = ref<string>(props.selectedVarTypeInIndex);

const emit = defineEmits<{
  (event: "update-in-index", payload: { index: number; value: CompositeType | AtomicType }): void;
}>();

const onSelect = (value: CompositeType | AtomicType) => {
  selected.value = value;
  // console.log("Selected value:", value);
  emit("update-in-index", { index: props.index, value: value });
};
</script>

<template>
  <div>
    <UFormGroup :name="'type' + props.index" class="w-full text-center">
      <div class="flex items-center space-x-4 w-full justify-center">
        <p style="margin-right: 10px">{{ props.index }}</p>
        <USelectMenu
          v-model="selected"
          :options="Object.values(AtomicType).concat(Object.values(CompositeType) as any)"
          size="sm"
          class="text-center"
          @update:modelValue="onSelect"
        />
      </div>
    </UFormGroup>
  </div>
</template>
