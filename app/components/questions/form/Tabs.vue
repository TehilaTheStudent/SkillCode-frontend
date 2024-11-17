<script lang="ts" setup>
//Component to hold the 3 steps tabs in filling new question form
//Used inside the modal, this has the submit button is the parent of Question state
import type { Parameter, Difficulty, VoidType } from "~/types"; //interfaces and types
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
import { useRouter } from 'vue-router';

const emit = defineEmits(["close", "updateState"]);
const props = defineProps<{ selectedQuestion: Question; isEdit: boolean }>();

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
function handleFunctionParameters(parameters: Parameter[] | VoidType): Parameter[] | VoidType {
  if (parameters === "VoidType") {
    return "VoidType";
  }

  if (Array.isArray(parameters)) {
    return parameters.map((param) => ({
      name: param.name,
      paramType:
        param.paramType instanceof AbstractType
          ? new AbstractType(param.paramType.type, param.paramType.tChildren)
          : new AbstractType(AtomicType.Integer), // Default fallback
    }));
  }

  // Fallback to an empty array if parameters is invalid
  return [];
}

type Schema = yup.InferType<typeof schema>;

const state = reactive<Question>(
  props.isEdit
    ? new Question(
        props.selectedQuestion.title,
        props.selectedQuestion.description,
        props.selectedQuestion.difficulty,
        props.selectedQuestion.category,
        props.selectedQuestion.examples.map(
          (example) => new InputOutput(example.parameters, example.expectedOutput)
        ),
        // [],
        props.selectedQuestion.testCases.map(
          (testCase) => new InputOutput(testCase.parameters, testCase.expectedOutput)
        ),
        // [],
        new FunctionConfig(
          props.selectedQuestion.functionConfig.name,
          props.selectedQuestion.functionConfig.parameters === "VoidType"
            ? "VoidType"
            : handleFunctionParameters(props.selectedQuestion.functionConfig.parameters),
          // [],

          props.selectedQuestion.functionConfig.returnType instanceof AbstractType
            ? props.selectedQuestion.functionConfig.returnType
            : "VoidType"
        ),
        props.selectedQuestion.languages
        // []
      )
    : new Question()
);

const predefinedCategories = Object.values(PredefinedCategory);
const predefinedLanguages = Object.values(PredefinedSupportedLanguage);

const router = useRouter();

async function updateQuestion(id: string, updatedQuestion: Question) {
  const response = await fetch(`/questions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedQuestion),
  });

  if (!response.ok) {
    throw new Error("Failed to update question");
  }

  return await response.json();
}

async function addQuestion(newQuestion: Question) {
  const response = await fetch(`/questions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuestion),
  });

  if (!response.ok) {
    throw new Error("Failed to add question");
  }

  return await response.json();
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with event.data
  console.log(event.data);
  try {
    if (props.isEdit) {
      await updateQuestion(props.selectedQuestion.id, state);
    } else {
      await addQuestion(state);
    }
    emit("close");
  } catch (error) {
    console.error("Failed to submit the form:", error);
  }
}
// //TODO: repalce with more efficient way to update state like this:
// const updateState = (key: string, value: any, index?: number, subKey?: string) => {
//   console.log("Updating state with:");
//   console.log("Updating state with:", key, value, index, subKey);
//   // Handle updates for nested objects or arrays
//   if (index !== undefined && subKey !== undefined) {
//     // Updating a specific subKey in an array (e.g., examples[index].parameters)
//     if (Array.isArray(state[key])) {
//       const targetArray = state[key] as any[];
//       if (targetArray[index]) {
//         targetArray[index][subKey] = value;
//       }
//     }
//   } else if (index !== undefined) {
//     // Updating a specific element in an array (e.g., examples[index])
//     if (Array.isArray(state[key])) {
//       const targetArray = state[key] as any[];
//       if (targetArray[index]) {
//         targetArray[index] = value;
//       }
//     }
//   } else {
//     // Updating top-level properties (e.g., title, description, etc.)
//     (state as any)[key] = value;
//   }
// };
function updateState(newState: any) {
  console.log("Updating state with:");
  console.log("Updating state with:", newState);

  Object.assign(state, newState);
}
</script>
<template>
  <div>
    <pre class="text-xs leading-none overflow-auto max-h-64">{{ JSON.stringify(state, null, 2) }}</pre>
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
            {{ props.selectedQuestion?.id ? "Edit Question" : "Add Question" }}
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
