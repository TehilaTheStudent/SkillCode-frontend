<script lang="ts" setup>
const props = defineProps<{ state: Question }>();
const emit = defineEmits(["updateState"]);
import { AtomicType, CompositeType, AbstractType, Question } from "~/types/index.d";
import type { Parameter, VoidType } from "~/types/";

// Function to add a new parameter
const addParameter = () => {
  if (Array.isArray(props.state.functionConfig.parameters)) {
    props.state.functionConfig.parameters.push({ name: "", paramType: new AbstractType(AtomicType.Integer) });
  } else if (props.state.functionConfig.parameters === 'VoidType') {
    props.state.functionConfig.parameters = [{ name: "", paramType: new AbstractType(AtomicType.Integer) }];
  }
};

// Function to remove a parameter
const removeParameter = (index: number) => {
  if (Array.isArray(props.state.functionConfig.parameters)) {
    props.state.functionConfig.parameters.splice(index, 1);
    if (props.state.functionConfig.parameters.length === 0) {
      props.state.functionConfig.parameters = 'VoidType';
    }
  }
};

// Function to add a return type
const addReturnType = () => {
  if (!props.state.functionConfig.returnType) {
    props.state.functionConfig.returnType = new AbstractType(AtomicType.Integer); // Default return type
  }
};

// Function to remove the return type
const removeReturnType = () => {
  props.state.functionConfig.returnType = null;
};

const clickedEditParamInIndex = (index: number) => {
  console.log("Clicked edit param in index:", index);
  openAbstractTypeSlideParam.value = true;
  selectedParamIndex.value = index;
};

const clickedEditReturnType = () => {
  openAbstractTypeSlideRet.value = true;
};

const openAbstractTypeSlideParam = ref(false);
const openAbstractTypeSlideRet = ref(false);

const selectedParamIndex = ref<number | null>(null);

const updateParameter = (updatedParam: AbstractType) => {
  if (selectedParamIndex.value !== null && Array.isArray(props.state.functionConfig.parameters)) {
    props.state.functionConfig.parameters[selectedParamIndex.value].paramType = updatedParam;
    emit("updateState", props.state);
  }
};

const updateReturnType = (updatedReturnType: AbstractType) => {
  props.state.functionConfig.returnType = updatedReturnType;
  emit("updateState", props.state);
};
</script>

<template>
  <div>
    <!-- Function Name -->
    <UFormGroup :label="'Function Name'" :name="'functionName'">
      <UInput v-model="state.functionConfig.name" />
    </UFormGroup>

    <!-- Parameters -->
    <UFormGroup :label="'Parameters'" :name="'parameters'">
      <div class="border border-blue-500 p-4 rounded-md">
        <div
          v-if="state.functionConfig.parameters !== 'VoidType'"
          v-for="(param, index) in state.functionConfig.parameters"
          :key="index"
          class="flex space-x-4 items-center mb-2"
        >
          <!-- Parameter Name -->
          <div class="flex-1 space-y-4">
            <UInput
              v-model="param.name"
              :placeholder="'Parameter Name'"
              :name="'paramName' + index"
              size="sm"
            />
          </div>
          <!-- String Preview -->

          <div class="font-bold text-lg mb-4 overflow-x-auto whitespace-nowrap">
            {{ param.paramType.toPrint() }}
          </div>

          <!-- Edit Parameter Button -->
          <div class="flex-1 text-right space-x-2">
            <UButton
              icon="i-heroicons-pencil-square"
              size="sm"
              color="primary"
              square
              variant="solid"
              @click="clickedEditParamInIndex(index)"
            />
            <UDashboardSlideover v-model="openAbstractTypeSlideParam" title="Edit Parameter">
              <template #header>
                Edit Parameter {{ state.functionConfig.parameters[selectedParamIndex]?.name }}
              </template>
              <template #default>
                <QuestionsFormAbstractType
                  :abstractType="state.functionConfig.parameters[selectedParamIndex]?.paramType"
                  @update="updateParameter"
                />
              </template>
              <template #footer>
                <UButton size="sm" color="primary" @click="openAbstractTypeSlideParam = false">
                  Close
                </UButton>
              </template>
            </UDashboardSlideover>

            <!-- Remove Parameter Button -->
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
          <div class="font-bold text-lg mb-4 overflow-x-auto whitespace-nowrap">
            Void
          </div>
        </div>
        <!-- Add Parameter Button -->
        <div class="text-right mt-2">
          <UButton size="sm" color="primary" icon="i-material-symbols:add-box" @click="addParameter">
            Add Parameter
          </UButton>
        </div>
      </div>
    </UFormGroup>

    <!-- Return Type -->
    <UFormGroup :label="'Return Type'" :name="'returnType'">
      <div class="border border-blue-500 p-4 rounded-md space-y-4">
        <div class="flex items-center space-x-4 justify-between">
          <div class="flex-1 text-left">
            <!-- String Preview -->

            <div class="font-bold text-lg mb-4 overflow-x-auto whitespace-nowrap">
              {{
                state.functionConfig.returnType && state.functionConfig.returnType !== "VoidType"
                  ? state.functionConfig.returnType.toPrint()
                  : "Void"
              }}
            </div>
          </div>
          <div class="flex-1 text-right space-x-2">
            <UButton
              v-if="state.functionConfig.returnType"
              icon="i-heroicons-pencil-square"
              size="sm"
              color="primary"
              square
              variant="solid"
              @click="clickedEditReturnType"
            />
            <UDashboardSlideover v-model="openAbstractTypeSlideRet" title="Edit Return Type">
              <template #header> Edit Return Type</template>
              <template #default>
                <QuestionsFormAbstractType
                  :abstractType="state.functionConfig.returnType as AbstractType"
                  @update="updateReturnType"
                />
              </template>
              <template #footer>
                <UButton size="sm" color="primary" @click="openAbstractTypeSlideRet = false"> Close </UButton>
              </template>
            </UDashboardSlideover>

            <!-- Delete Return Type Button -->
            <UButton
              v-if="state.functionConfig.returnType"
              size="sm"
              color="red"
              icon="i-material-symbols:delete-forever"
              @click="removeReturnType"
            >
              Remove Return Type
            </UButton>

            <!-- Add Return Type Button -->
            <UButton
              v-else
              size="sm"
              color="primary"
              icon="i-material-symbols:add-box"
              @click="addReturnType"
            >
              Add Return Type
            </UButton>
          </div>
        </div>
      </div>
    </UFormGroup>
  </div>
</template>
