<script lang="ts" setup>
import { number } from "yup";
import { AbstractType, type VoidType, type Parameter, AtomicType } from "~/types/index.d";
const props = defineProps<{ parameters: Parameter[] | VoidType }>();
const emit = defineEmits(["updateParameters"]);

const openAbstractTypeSlide = ref<boolean[]>([]);

function addParameter() {
  const parameters = props.parameters === "VoidType" ? [] : [...props.parameters];
  parameters.push({ name: "number", param_type: new AbstractType(AtomicType.Integer) });
  openAbstractTypeSlide.value.push(false); // Add the corresponding slide state
  emit("updateParameters", parameters);
}

function removeParameter(index: number) {
  if (props.parameters !== "VoidType") {
    const parameters = [...props.parameters];
    parameters.splice(index, 1);
    openAbstractTypeSlide.value.splice(index, 1); // Remove the corresponding slide state

    emit("updateParameters", parameters.length === 0 ? "VoidType" : parameters);
  }
}

function updateParameter(index: number, newType: AbstractType) {
  if (props.parameters !== "VoidType") {
    const parameters = [...props.parameters];
    parameters[index] = { ...parameters[index], param_type: newType }; // Ensure immutability
    emit("updateParameters", parameters);
  }
}

watch(
  () => props.parameters,
  (newParameters) => {
    if (newParameters !== "VoidType" && newParameters.length !== openAbstractTypeSlide.value.length) {
      openAbstractTypeSlide.value = new Array(newParameters.length).fill(false);
    }
  },
  { immediate: true }
);
</script>

<template>
  <UFormGroup label="Parameters" name="parameters">
    <div class="border border-blue-500 p-4 rounded-md">
      <div
        v-if="props.parameters !== 'VoidType'"
        v-for="(param, index) in props.parameters"
        :key="index"
        class="flex space-x-4 items-center mb-2"
      >
        <div class="flex-1 space-y-4">
          <UInput v-model="param.name" placeholder="Parameter Name" :name="'paramName' + index" size="sm" />
        </div>
        <div class="font-bold text-lg mb-4 overflow-x-auto whitespace-nowrap">
          {{ param.param_type.toPrint() }}
        </div>
        <div class="flex-1 text-right space-x-2">
          <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="primary"
            square
            variant="solid"
            @click="openAbstractTypeSlide[index] = true"
          />
          <UDashboardSlideover v-model="openAbstractTypeSlide[index]" title="Edit Parameter">
            <template #header> Edit Parameter {{ props.parameters[index].name }} </template>
            <template #default>
              <QuestionsFormAbstractType
                :abstractType="props.parameters[index].param_type"
                @update="(newVal) => updateParameter(index, newVal)"
              />
            </template>
            <template #footer>
              <UButton size="sm" color="primary" @click="openAbstractTypeSlide[index] = false">
                Close
              </UButton>
            </template>
          </UDashboardSlideover>
          <UButton
            size="sm"
            color="red"
            icon="i-material-symbols:delete-forever"
            @click="removeParameter(index)"
          >
            Remove
          </UButton>
        </div>
      </div>
      <div v-else>
        <div class="font-bold text-lg mb-4 overflow-x-auto whitespace-nowrap">Void</div>
      </div>
      <div class="text-right mt-2">
        <UButton size="sm" color="primary" icon="i-material-symbols:add-box" @click="addParameter">
          Add Parameter
        </UButton>
      </div>
    </div>
  </UFormGroup>
</template>
