<script lang="ts" setup>
//this is a component that is used to display a list of QuestionsFormInputOutput
import type { InputOutput } from "~/types";
import { FunctionConfig } from "~/types/index.d";
const openEditModal = (list: InputOutput, index: number) => {
  editedItem.value = list;
  editItemIndex.value = index;
  showModal.value = true;
};

const props = defineProps<{
  label: string;
  items: InputOutput[];
  function_config: FunctionConfig;
}>();
const emit = defineEmits(["addItem", "removeItem", "editItem"]);
const editItemIndex = ref<number | null>(null);
const editedItem = ref<InputOutput>({});
const showModal = ref(false);
const saveEdit = () => {
  showModal.value = false;
  // editItemIndex.value = 0; //to avoid error?
  emit("editItem", editItemIndex.value, editedItem.value);
};
</script>

<template>
  <UFormGroup :label="props.label" :name="props.label.toLowerCase()">
    <div v-for="(item, index) in props.items" :key="index" class="space-y-2 mb-4">
      <div class="grid grid-cols-1 gap-2 w-full">
        <div class="flex justify-between items-center">
          <span>
            {{
              item.parameters.length > 0 || item.expected_output != ""
                ? item.parameters.join(", ") +
                  " => " +
                  (item.expected_output !== "" ? item.expected_output : "")
                : "edit please ----> "
            }}
          </span>
          <div>
            <UButton
              size="sm"
              color="primary"
              icon="i-heroicons-pencil-square"
              class="mr-2"
              @click="openEditModal(props.items[index], index)"
              >Edit</UButton
            >
            <UButton
              size="sm"
              color="red"
              icon="i-material-symbols:delete-forever"
              @click="emit('removeItem', index)"
              >Remove</UButton
            >
          </div>
        </div>
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

  <!-- Edit Modal for single example/test case-->
  <UModal v-model="showModal" @close="saveEdit">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>Edit Item</template>
      <QuestionsFormInputOutput
        :item="editedItem"
        :index="editItemIndex"
        :function_config="props.function_config"
      />
    </UCard>
  </UModal>
</template>
