<script setup lang="ts">
import { row } from "@unovis/ts/components/timeline/style";
import { InputOutput, Question, PredefinedCategory, Difficulty } from "~/types/index.d";
const router = useRouter();
const toast = useToast();
const defaultColumns = [
  // { key: "id", label: "ID" }, // Remove ID column
  { key: "title", label: "Title" },
  { key: "details", label: "Details" }, // New column for description
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
const descriptionTitle = ref("");
const currentSelectedQuestion = ref<Question | null>(null);
const formIsEdit = ref(false);
const isDeleteModalOpen = ref(false);
const questionToDelete = ref<Question | null>(null);
const config = useRuntimeConfig();
const apiUrl = `${config.public.backendUrl}/questions`;

const questions = ref<Question[]>([]); // Replace useFetch with a ref
const pending = ref(false); // Replace useFetch pending state

async function refreshQuestions() {
  pending.value = true; // Start loading
  try {
    const response = await $fetch<Question[]>(apiUrl, {
      query: query.value, // Pass computed query parameters
    });
    questions.value = response; // Update questions with fetched data
  } catch (error) {
    console.error("Error fetching questions:", error);
    questions.value = []; // Reset questions on error
  } finally {
    pending.value = false; // End loading
  }
}

// Trigger data fetching when the component is mounted
onMounted(() => {
  refreshQuestions();
});

function onViewDescription(row: Question) {
  descriptionTitle.value = row.title || "";
  descriptionContent.value = row.description || "";
  currentSelectedQuestion.value = row;
  isDescriptionModalOpen.value = true;
}

const truncateTitle = (title: string) => {
  return title.length > 20 ? title.slice(0, 20) + "..." : title;
};

const columns = computed(() => defaultColumns.filter((column) => selectedColumns.value.includes(column)));

const query = computed(() => ({
  q: q.value,
  categories: selectedCategories.value.join(","),
  difficulties: selectedDifficulties.value.join(","),
  sort: sort.value.column,
  order: sort.value.direction,
}));
watch(query, () => {
  refreshQuestions();
});

// const { data: questions, pending } = await useFetch<Question[]>(apiUrl, {
//   query, // Pass query parameters if needed
//   default: () => [],
// });
const defaultCategories = Object.values(PredefinedCategory);
const defaultDifficulties = Object.values(Difficulty);

function onSelect(row: Question) {
  const index = selected.value.findIndex((item) => item.id === row.id);
  if (index === -1) {
    selected.value.push(row);
  } else {
    selected.value.splice(index, 1);
  }
}

function onEdit(row: Question) {
  currentSelectedQuestion.value = row;
  isOpenFormModal.value = true;
  onOpenQuestionForm(row, true);
}

function onQuestionFormClose() {
  isOpenFormModal.value = false;
  refreshQuestions();
}

async function onDeleteConfirm() {
  if (questionToDelete.value) {
    try {
      await $fetch(`${apiUrl}/${questionToDelete.value.id}`, { method: "DELETE" });
      questions.value = questions.value.filter((q) => q.id !== questionToDelete.value!.id);
      toast.add({ icon: "i-heroicons-check-circle", title: "Question deleted successfully", color: "green" });
    } catch (error) {
      toast.add({ icon: "i-heroicons-exclamation-circle", title: "Failed to delete question", color: "red" });
    } finally {
      isDeleteModalOpen.value = false;
    }
  }
}

function onDelete(row: Question) {
  questionToDelete.value = row;
  isDeleteModalOpen.value = true;
}

function onRowClick(row: Question) {
  //route to code-editor/:id
  router.push(`/code-editor/${row.id}`);
}
function onOpenQuestionForm(row: Question | null = null, isEdit = false) {
  currentSelectedQuestion.value = row;
  isOpenFormModal.value = true;
  // Pass isEdit to the form
  formIsEdit.value = isEdit;
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
        :ui="{ width: 'sm:max-w-2xl' }"
      >
        <QuestionsDescriptionExamples :selectedQuestion="currentSelectedQuestion" />
      </UDashboardModal>
      <UModal v-model="isOpenFormModal" fullscreen>
        <QuestionsFormTabs
          @close="onQuestionFormClose"
          :selectedQuestion="currentSelectedQuestion"
          :isEdit="formIsEdit"
        />
      </UModal>
      <SettingsDeleteQuestionModal v-model="isDeleteModalOpen" @confirm="onDeleteConfirm" />
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
          <span class="text-gray-900 dark:text-white font-medium truncate w-10">{{
            truncateTitle(row.title)
          }}</span>
        </template>

        <!-- Details column -->
        <template #details-data="{ row }">
          <div class="flex justify-center truncate w-10">
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
            <UTooltip text="Solve">
              <UButton
                icon="i-material-symbols:code-blocks"
                size="md"
                variant="solid"
                @click="onRowClick(row)"
              >
                Solve
              </UButton>
            </UTooltip>
            <UTooltip text="Edit">
              <UButton size="xs" variant="ghost" @click="onEdit(row)" icon="i-heroicons-pencil">
                Edit
              </UButton>
            </UTooltip>
            <UTooltip text="Delete">
              <UButton size="xs" variant="ghost" color="red" @click="onDelete(row)" icon="i-heroicons-trash">
                Delete
              </UButton>
            </UTooltip>
          </div>
        </template>
      </UTable>
    </UDashboardPanel>
  </UDashboardPage>
</template>
