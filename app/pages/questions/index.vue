<script setup lang="ts">
import type { InputOutput, Question } from "~/types";
const config = useRuntimeConfig();
const defaultColumns = [
  { key: "id", label: "ID" },
  { key: "title", label: "Title" },
  { key: "description", label: "Description" }, // New column for description
  { key: "category", label: "Category", sortable: true },
  { key: "stats", label: "Stats", sortable: true },
  { key: "difficulty", label: "Difficulty", sortable: true },
  { key: "actions", label: "Actions" }, // New column for actions
];

const q = ref("");
const selected = ref<Question[]>([]);
const selectedColumns = ref(defaultColumns);
const selectedCategories = ref([]);
const selectedDifficulties = ref([]);
const sort = ref({ column: "stats", direction: "desc" as const });
const input = ref<{ input: HTMLInputElement }>();
const isDescriptionModalOpen = ref(false);
const isOpenFormModal = ref(false);
const descriptionContent = ref("");
const examples = ref<InputOutput[]>([]);
const descriptionTitle = ref("");
const currentQuestion = ref<Question | null>(null);

function onViewDescription(row: Question) {
  descriptionTitle.value = row.title || "";
  descriptionContent.value = row.description || "";
  examples.value = row.examples || [];
  isDescriptionModalOpen.value = true;
}

const truncateTitle = (title: string) => {
  return title.length > 30 ? title.slice(0, 30) + "..." : title;
};

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)));

const query = computed(() => ({
  q: q.value,
  categories: selectedCategories.value.join(","),
  difficulties: selectedDifficulties.value.join(","),
  sort: sort.value.column,
  order: sort.value.direction,
}));

const { data: questions, pending } = await useFetch<Question[]>("/api/questions", {
  query, // Pass query parameters if needed
  default: () => [],
});

const defaultCategories = questions.value.reduce((acc, question) => {
  if (!acc.includes(question.category)) {
    acc.push(question.category);
  }
  return acc;
}, [] as string[]);

const defaultDifficulties = questions.value.reduce((acc, question) => {
  if (!acc.includes(question.difficulty)) {
    acc.push(question.difficulty);
  }
  return acc;
}, [] as string[]);

function onSelect(row: Question) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}

function onEdit(row: Question) {
  currentQuestion.value = row;
  isOpenFormModal.value = true;
}

function onDelete(row: Question) {
  console.log("Delete:", row);
}

function onRowClick(row: Question) {
  window.open(`/code-editor/${row.id}`, "_blank");
}
function onOpenQuestionForm(row: Question | null = null) {
  currentQuestion.value = row;
  isOpenFormModal.value = true;
}

defineShortcuts({
  "/": () => {
    input.value?.input?.focus();
  },
});
</script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Questions" :badge="questions.length">
        <template #right>
          <!-- Moved filter input to display section -->
          <UButton icon="i-heroicons-plus" @click="onOpenQuestionForm"> New Question </UButton>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <USelectMenu
            v-model="selectedCategories"
            icon="i-heroicons-tag"
            placeholder="Categories"
            multiple
            :options="defaultCategories"
            :ui-menu="{ option: { base: 'capitalize' } }"
          />
          <USelectMenu
            v-model="selectedDifficulties"
            icon="i-heroicons-light-bulb"
            placeholder="Difficulties"
            :options="defaultDifficulties"
            multiple
          />
        </template>

        <template #right>
          <UInput
            ref="input"
            v-model="q"
            icon="i-heroicons-funnel"
            autocomplete="off"
            placeholder="Filter questions..."
            class="hidden lg:block"
            @keydown.esc="$event.target.blur()"
          >
            <template #trailing>
              <UKbd value="/" />
            </template>
          </UInput>
        </template>
      </UDashboardToolbar>

      <UDashboardModal
        v-model="isDescriptionModalOpen"
        title="Description & Examples"
        description="See description and examples of the question"
        :ui="{ width: 'sm:max-w-md' }"
      >
        <QuestionsQuestionDescription
          :title="descriptionTitle"
          :description="descriptionContent"
          :examples="examples"
        />
      </UDashboardModal>
      <UModal v-model="isOpenFormModal" fullscreen>
        <QuestionsQuestionForm @close="isOpenFormModal = false" :question="currentQuestion" />
      </UModal>

      <UTable
        :rows="questions"
        v-model:sort="sort"
        :columns="defaultColumns"
        :loading="pending"
        sort-mode="manual"
        class="w-full"
        :ui="{ divide: 'divide-gray-200 dark:divide-gray-800' }"
        @row-click="onRowClick"
      >
        <!-- Title column -->
        <template #title-data="{ row }">
          <span class="text-gray-900 dark:text-white font-medium">{{ truncateTitle(row.title) }}</span>
        </template>

        <!-- Description column -->
        <template #description-data="{ row }">
          <div class="flex justify-center">
            <UTooltip text="View Description & Examples">
              <UButton icon="i-heroicons-eye" size="md" variant="ghost" @click="onViewDescription(row)" />
            </UTooltip>
          </div>
        </template>

        <!-- Category column -->
        <template #category-data="{ row }">
          <span class="capitalize">{{ row.category }}</span>
        </template>

        <!-- Stats column -->
        <template #stats-data="{ row }">
          <span>{{ row.stats }} attempts</span>
        </template>

        <!-- Difficulty column -->
        <template #difficulty-data="{ row }">
          <UBadge
            :label="row.difficulty"
            :color="row.difficulty === 'Easy' ? 'green' : row.difficulty === 'Medium' ? 'orange' : 'red'"
            variant="subtle"
          />
        </template>

        <!-- Actions column -->
        <template #actions-data="{ row }">
          <div class="flex space-x-2">
            <UTooltip text="Edit">
              <UButton icon="i-heroicons-pencil" size="xs" variant="ghost" @click="onEdit(row)" />
            </UTooltip>
            <UTooltip text="Delete">
              <UButton
                icon="i-heroicons-trash"
                size="xs"
                variant="ghost"
                color="red"
                @click="onDelete(row)"
              />
            </UTooltip>
          </div>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
