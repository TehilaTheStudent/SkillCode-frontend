<script lang="ts" setup>
import { AbstractType, AtomicType, type VoidType } from "~/types/index.d";
const props = defineProps<{ return_type: AbstractType | VoidType }>();
const emit = defineEmits(["updatereturn_type"]);

const openAbstractTypeSlide = ref(false);

function addreturn_type() {
  emit("updatereturn_type", new AbstractType(AtomicType.Integer));
}

function pressEditreturn_type() {
  openAbstractTypeSlide.value = true;
}

function removereturn_type() {
  emit("updatereturn_type", "VoidType");
}
</script>

<template>
  <UFormGroup label="Return Type" name="return_type">
    <div class="border border-blue-500 p-4 rounded-md space-y-4">
      <div v-if="props.return_type !== 'VoidType'" class="flex items-center space-x-4 justify-between">
        <div class="flex-1 text-left">
          <div class="font-bold text-lg mb-4 overflow-x-auto whitespace-nowrap">
            {{ props.return_type.toPrint() }}
          </div>
        </div>
        <div class="flex-1 text-right space-x-2">
          <UButton
            icon="i-heroicons-pencil-square"
            size="sm"
            color="primary"
            square
            variant="solid"
            @click="pressEditreturn_type"
          />
          <UDashboardSlideover v-model="openAbstractTypeSlide" title="Edit Return Type">
            <template #header> Edit Return Type</template>
            <template #default>
              <QuestionsFormAbstractType
                :abstractType="props.return_type"
                @update="emit('updatereturn_type', $event)"
              />
            </template>
            <template #footer>
              <UButton size="sm" color="primary" @click="openAbstractTypeSlide = false"> Close </UButton>
            </template>
          </UDashboardSlideover>
          <UButton size="sm" color="red" icon="i-material-symbols:delete-forever" @click="removereturn_type">
            Remove Return Type
          </UButton>
        </div>
      </div>
      <div v-else class="flex items-center justify-between">
        <div class="font-bold text-lg overflow-x-auto whitespace-nowrap">Void</div>
        <UButton size="sm" color="primary" icon="i-material-symbols:add-box" @click="addreturn_type">
          Add Return Type
        </UButton>
      </div>
    </div>
  </UFormGroup>
</template>
