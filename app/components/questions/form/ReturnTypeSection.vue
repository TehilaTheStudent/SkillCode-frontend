<script lang="ts" setup>
import { AbstractType, AtomicType, type VoidType } from "~/types/index.d";
const props = defineProps<{ returnType: AbstractType | VoidType }>();
const emit = defineEmits(["updateReturnType"]);

const openAbstractTypeSlide = ref(false);

function addReturnType() {
  emit("updateReturnType", new AbstractType(AtomicType.Integer));
}

function pressEditReturnType() {
  openAbstractTypeSlide.value = true;
}

function removeReturnType() {
  emit("updateReturnType", "VoidType");
}
</script>

<template>
  <UFormGroup label="Return Type" name="returnType">
    <div class="border border-blue-500 p-4 rounded-md space-y-4">
      <div v-if="props.returnType !== 'VoidType'" class="flex items-center space-x-4 justify-between">
        <div class="flex-1 text-left">
          <div class="font-bold text-lg mb-4 overflow-x-auto whitespace-nowrap">
            {{ props.returnType.toPrint() }}
          </div>
        </div>
        <div class="flex-1 text-right space-x-2">
          <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="primary"
            square
            variant="solid"
            @click="pressEditReturnType"
          />
          <UDashboardSlideover v-model="openAbstractTypeSlide" title="Edit Return Type">
            <template #header> Edit Return Type</template>
            <template #default>
              <QuestionsFormAbstractType
                :abstractType="props.returnType"
                @update="emit('updateReturnType', $event)"
              />
            </template>
            <template #footer>
              <UButton size="sm" color="primary" @click="openAbstractTypeSlide = false"> Close </UButton>
            </template>
          </UDashboardSlideover>
          <UButton size="sm" color="red" icon="i-material-symbols:delete-forever" @click="removeReturnType">
            Remove Return Type
          </UButton>
        </div>
      </div>
      <div v-else class="flex items-center justify-between">
        <div class="font-bold text-lg overflow-x-auto whitespace-nowrap">Void</div>
        <UButton size="sm" color="primary" icon="i-material-symbols:add-box" @click="addReturnType">
          Add Return Type
        </UButton>
      </div>
    </div>
  </UFormGroup>
</template>
