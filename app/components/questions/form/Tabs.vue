<script lang="ts" setup>
//Component to hold the 3 steps tabs in filling new question form
//Used inside the modal
import type { Parameter, Difficulty } from "~/types"; //interfaces and types
import {
  PredefinedCategory,
  PredefinedSupportedLanguage,
  CompositeType,
  AtomicType,
  AbstractType,
  FunctionConfig,
  Question,
  InputOutput,
} from "~/types/index.d"; //enums and classes
import * as yup from "yup";
import type { FormSubmitEvent } from "#ui/types";

const emit = defineEmits(["close", "updateState"]);
const props = defineProps<{ selectedQuestion: Question }>();

function close() {
  emit("close"); // Emit the updated value to the parent
}
//tabs

const items = [
  {
    key: "metadata",
    label: "MetaData",
    description: "title, description, difficulty , category, languages",
  },
  {
    key: "config",
    label: "Config",
    description: "function name, parameters and return type",
  },
  {
    key: "content",
    label: "Content",
    description: "examples and test cases",
  },
];

//form
const schema = yup.object({
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Must be at least 8 characters").required("Required"),
});

type Schema = yup.InferType<typeof schema>;

const state = reactive({
  title: "", // Title of the question
  description: "", // Description of the question
  difficulty: "Medium" as Difficulty, // Difficulty, default value
  category: PredefinedCategory.Array, // Category, default value
  examples: [
    {
      parameters: [""], // Example input parameters (initially empty)
      expectedOutput: "", // Expected output (initially empty)
    },
  ],
  testCases: [
    {
      parameters: [""], // Test case input parameters
      expectedOutput: "", // Test case expected output
    },
  ],
  functionConfig: {
    name: "", // Function name
    parameters: [
      { name: "n", paramType: new AbstractType(AtomicType.Integer) }, // Parameter definitions
    ],
    returnType: new AbstractType(AtomicType.Integer), // Return type of the function
  },
  languages: [PredefinedSupportedLanguage.Python], // Supported languages
  stats: 0, // Add the missing 'stats' property
});

const predefinedCategories = Object.values(PredefinedCategory);
const predefinedLanguages = Object.values(PredefinedSupportedLanguage);

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
}

function updateState(newState: any) {
  Object.assign(state, newState);
}
</script>
<template>
  <div>
    <UCard
      :ui="{
        base: 'h-full flex flex-col',
        rounded: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: 'grow',
        },
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
            {{ selectedQuestion ? "Edit Question" : "New Question" }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="close"
          />
        </div>
      </template>
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
        <UButton type="submit"> Submit </UButton>
        <UTabs :items="items" class="w-full">
          <template #item="{ item }">
            <UCard>
              <template #header>
                <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                  {{ item.label }}
                </p>
                <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {{ item.description }}
                </p>
              </template>

              <div v-if="item.key === 'metadata'" class="space-y-3">
                <QuestionsFormMetaData
                  :state="state"
                  :predefinedCategories="predefinedCategories"
                  :predefinedLanguages="predefinedLanguages"
                  @updateState="updateState"
                ></QuestionsFormMetaData>
              </div>

              <div v-else-if="item.key === 'config'" class="space-y-3">
                <QuestionsFormConfig :state="state" @updateState="updateState"></QuestionsFormConfig>
              </div>

              <div v-else-if="item.key === 'content'" class="space-y-3">
                <QuestionsFormContent :state="state" @updateState="updateState"></QuestionsFormContent>
              </div>
            </UCard>
          </template>
        </UTabs>
      </UForm>
    </UCard>
  </div>
</template>
