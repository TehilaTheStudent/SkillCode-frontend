<script setup lang="ts">
const model = defineModel({
  type: Boolean
})

const toast = useToast()
const emit = defineEmits(["confirm"]);

const loading = ref(false)

function onDelete() {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    model.value = false
    emit("confirm");
  }, 1)
}
</script>

<template>
  <UDashboardModal
    v-model="model"
    title="Delete question"
    description="Are you sure you want to delete your question?"
    icon="i-heroicons-exclamation-circle"
    prevent-close
    :close-button="null"
    :ui="{
      icon: {
        base: 'text-red-500 dark:text-red-400'
      } as any,
      footer: {
        base: 'ml-16'
      } as any
    }"
  >
    <template #footer>
      <UButton
        color="red"
        label="Delete"
        :loading="loading"
        @click="onDelete"
      />
      <UButton
        color="white"
        label="Cancel"
        @click="model = false"
      />
    </template>
  </UDashboardModal>
</template>
