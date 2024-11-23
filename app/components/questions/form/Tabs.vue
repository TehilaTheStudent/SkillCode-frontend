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
import { useRouter } from "vue-router";

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
  title: yup.string().required("Title cannot be empty"),
  description: yup.string().required("Description cannot be empty"),
  languages: yup.array().min(1, "At least one language must be selected"),
  function_config: yup
    .object({
      name: yup.string().required("Function name cannot be empty"),
      parameters: yup.mixed().required("Parameters cannot be empty"),
      return_type: yup.mixed().required("Return type cannot be empty"),
    })
    .test(
      "return_type-and-parameters",
      "Both return_type and parameters cannot be VoidType",
      function (value) {
        return !(value.return_type === "VoidType" && value.parameters === "VoidType");
      }
    ),
  examples: yup.array().min(1, "Examples cannot be empty"),
  test_cases: yup.array().min(1, "Test cases cannot be empty"),
});

function handleFunctionParameters(parameters: Parameter[] | VoidType): Parameter[] | VoidType {
  if (parameters === "VoidType") {
    return "VoidType";
  }

  if (Array.isArray(parameters)) {
    return parameters.map((param) => ({
      name: param.name,
      param_type: createAbstractType(param.param_type), // Use a helper function for clarity
    }));
  }

  return "VoidType";
}

/**
 * Helper function to iteratively create an AbstractType instance.
 */
function createAbstractType(param_type: AbstractType): AbstractType {
  const root = new AbstractType(param_type.type);
  let current = root;
  let child = param_type.type_children;

  while (child) {
    current.type_children = new AbstractType(child.type);
    current = current.type_children;
    child = child.type_children;
  }

  return root;
}

type Schema = yup.InferType<typeof schema>;
// console.log(props.selectedQuestion.function_config);
const state = reactive<Question>(
  props.isEdit
    ? new Question(
        props.selectedQuestion.id,
        props.selectedQuestion.title,
        props.selectedQuestion.description,
        props.selectedQuestion.difficulty,
        props.selectedQuestion.category,
        props.selectedQuestion.examples.map(
          (example: InputOutput) => new InputOutput(example.parameters, example.expected_output)
        ),
        // [],
        props.selectedQuestion.test_cases.map(
          (testCase: InputOutput) => new InputOutput(testCase.parameters, testCase.expected_output)
        ),
        // [],
        new FunctionConfig(
          props.selectedQuestion.function_config.name,
          // "",
          props.selectedQuestion.function_config.parameters === "VoidType"
            ? "VoidType"
            : handleFunctionParameters(props.selectedQuestion.function_config.parameters),
          // "VoidType",

          props.selectedQuestion.function_config.return_type === "VoidType"
            ? "VoidType"
            : new AbstractType(
                props.selectedQuestion.function_config.return_type.type,
                props.selectedQuestion.function_config.return_type?.type_children
              )
        ),
        props.selectedQuestion.languages
      )
    : new Question()
);

const predefinedCategories = Object.values(PredefinedCategory);
const predefinedLanguages = Object.values(PredefinedSupportedLanguage);

const router = useRouter();
const config = useRuntimeConfig();
const apiUrl = `${config.public.backendUrl}/questions`;
const toast = useToast();

async function updateQuestion(id: string, updatedQuestion: Question) {
  const response = await fetch(`${apiUrl}/${id}`, {
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
  // console.log(newQuestion);
  const response = await fetch(`${apiUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newQuestion),
  });
  if (!response.ok) {
    
    const errorData = await response.json();
    // console.log(errorData);
    throw new Error(errorData.error);
  }

  return await response.json();
}

async function onSubmit(event: FormSubmitEvent<Schema>) {

  // Do something with event.data
  try {
    console.log("trying to submit:",state);
    await schema.validate(state, { abortEarly: false });
    if (props.isEdit) {
      await updateQuestion(props.selectedQuestion.id, state);
      toast.add({ title: "Question updated successfully!", icon: "ep:success-filled", color: "green" });
    } else {
      await addQuestion(state);
      toast.add({ title: "Question added successfully!", icon: "ep:success-filled", color: "green" });
    }
    emit("close");
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      error.inner.forEach((err) => {
        toast.add({
          title: err.message,
          icon: "i-material-symbols:chat-error-rounded",
          color: "red",
        });
      });
    } else {
      // console.log(error);
      toast.add({
        title: "Server: Failed to submit the form.",
        icon: "i-material-symbols:chat-error-rounded",
        color: "red",
        description:error.message
      });
    }
  }
}

function updateState(newState: any) {
  // console.log("Updating state with:");
  // console.log("Updating state with:", newState);

  Object.assign(state, newState);
}
</script>
<template>
  <div>
    <!-- <pre class="text-xs leading-none overflow-auto max-h-64">{{ JSON.stringify(state, null, 2) }}</pre> -->
    <!-- <pre class="text-xs leading-none overflow-auto max-h-64">{{
      JSON.stringify(props.selectedQuestion, null, 2)
    }}</pre> -->
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
      <!-- <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit"> -->
      <UForm :state="state" class="space-y-4" @submit="onSubmit">
        <UButton type="submit"> Submit </UButton>
        <p class="text-sm text-gray-500 dark:text-gray-400">
          ✨✨  You don't have to worry about language-specific naming conventions! We will take care of that! ✨✨
        </p>
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
