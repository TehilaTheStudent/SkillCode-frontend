<script setup lang="ts">
import type { Question, Parameter, AbstractType, Difficulty, InputOutput } from "~/types";
import { CompositeType, AtomicType } from "~/types/index.d";
import * as yup from "yup";

const emitForm = defineEmits(["submit", "cancel", "close"]);

const state = reactive<Question>({
  id: "", // Can be auto-generated
  title: "",
  description: "",
  difficulty: "Easy" as Difficulty,
  category: "Other",
  stats: 0, // Default stats
  examples: [{ parameters: [], expectedOutput: "" }],
  testCases: [] as InputOutput[],
  functionConfig: {
    name: "",
    parameters: [] as Parameter[],
    returnType: { type: AtomicType.Integer } as AbstractType,
  },
  languages: [],
});

//TODO: maybe get them from the backend
const predefinedCategories = ["Array", "String", "Tree", "Graph", "Dynamic Programming", "Other"];


const inputOutputSchema = yup.object().shape({
  parameters: yup.array().of(yup.string()).required(""),
  expectedOutput: yup.string().required(),
});

// Yup validation schema
const schema = yup.object().shape({
  title: yup.string().required("Title is required."),
  description: yup.string().required("Description is required."),
  functionConfig: yup.object().shape({
    name: yup.string().required("Function name is required."),
    parameters: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("Parameter name is required."),
          paramType: yup.object().shape({
            type: yup.string().required("Parameter type is required."),
          }),
        })
      )
      .min(1, "At least one parameter is required."),
  }),
  testCases: yup.array().of(
    yup.object().shape({
      parameters: yup.array().of(yup.string()).required(),
    })
  ),
  examples: yup
    .array()
    .of(
      yup.object().shape({
        parameters: yup.array().of(yup.string().required("Example parameter is required.")).required(),
        expectedOutput: yup.string().required("Expected output is required."),
      })
    )
    .min(1, "At least one example is required."),
  category: yup.string().required("Category is required."),
});

// Validation function
const validate = async (): Promise<void> => {
  try {
    await schema.validate(state, { abortEarly: false });
    errors.value = [];
    errorMessages.title = "";
    errorMessages.description = "";
    errorMessages.name = "";
    errorMessages.parameters = [];
    errorMessages.examples = [];
    errorMessages.category = "";
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errors.value = err.errors;
      err.inner.forEach((error) => {
        if (error.path === "title") errorMessages.title = error.message;
        if (error.path === "description") errorMessages.description = error.message;
        if (error.path === "functionConfig.name") errorMessages.name = error.message;
        if (error.path?.startsWith("functionConfig.parameters")) {
          const index = parseInt(error.path.split("[")[1].split("]")[0]);
          errorMessages.parameters[index] = error.message;
        }
        if (error.path?.startsWith("examples")) {
          const index = parseInt(error.path.split("[")[1].split("]")[0]);
          errorMessages.examples[index] = error.message;
        }
        if (error.path === "category") errorMessages.category = error.message;
      });
    } else {
      errors.value = ["Validation failed"];
    }
  }
};

const validateField = async (field: string) => {
  try {
    await schema.validateAt(field, state);
    if (field === "title") errorMessages.title = "";
    if (field === "description") errorMessages.description = "";
    if (field === "functionConfig.name") errorMessages.name = "";
    if (field.startsWith("functionConfig.parameters")) {
      const index = parseInt(field.split("[")[1].split("]")[0]);
      errorMessages.parameters[index] = "";
    }
    if (field.startsWith("examples")) {
      const index = parseInt(field.split("[")[1].split("]")[0]);
      errorMessages.examples[index] = "";
    }
    if (field === "category") errorMessages.category = "";
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      if (field === "title") errorMessages.title = err.message;
      if (field === "description") errorMessages.description = err.message;
      if (field === "functionConfig.name") errorMessages.name = err.message;
      if (field.startsWith("functionConfig.parameters")) {
        const index = parseInt(field.split("[")[1].split("]")[0]);
        errorMessages.parameters[index] = err.message;
      }
      if (field.startsWith("examples")) {
        const index = parseInt(field.split("[")[1].split("]")[0]);
        errorMessages.examples[index] = err.message;
      }
      if (field === "category") errorMessages.category = err.message;
    }
  }
};

// Submit handler
const onSubmit = async () => {
  await validate();
  if (errors.value.length) {
    return;
  }
  emitForm("submit", state);
};

// Cancel handler
const onCancel = () => emitForm("cancel");
import { computed } from "vue";

const exampleParameters = computed({
  get: () => state.examples.map((example) => example.parameters.join(", ")),
  set: (value) => {
    value.forEach((val, index) => {
      state.examples[index].parameters = val.split(",").map((param) => param.trim());
    });
  },
});

const updateExampleParameters = (value, index) => {
  state.examples[index].parameters = value.split(",").map((param) => param.trim());
};

const props = defineProps<{ question: Question | null }>();

const form = ref<Question | null>(null);

watch(
  () => props.question,
  (newQuestion) => {
    form.value = newQuestion
      ? { ...newQuestion }
      : {
          title: "",
          description: "",
          category: "",
          difficulty: "Easy",
          stats: 0,
          examples: [],
          id: "",
          testCases: [],
          functionConfig: {
            name: "",
            parameters: [],
            returnType: { type: AtomicType.Boolean },
          },
          languages: [],
        };
  }
);

function close() {
  emitForm("close"); // Emit the updated value to the parent
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
            {{ question ? "Edit Question" : "New Question" }}
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
      <UForm :state="state" class="space-y-6" @submit.prevent="onSubmit">
        <!-- Display errors -->
        <div v-if="errors.length" class="text-red-500">
          <ul>
            <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
          </ul>
        </div>
        <!-- Title -->
        <UFormGroup label="Title" name="title" required>
          <UInput v-model="state.title" placeholder="Enter question title" @blur="validateField('title')" />
          <div v-if="errorMessages.title" class="text-red-500">{{ errorMessages.title }}</div>
        </UFormGroup>

        <!-- Description -->
        <UFormGroup label="Description" name="description" required>
          <UTextarea
            v-model="state.description"
            placeholder="Enter detailed description"
            :rows="4"
            @blur="validateField('description')"
          />
          <div v-if="errorMessages.description" class="text-red-500">{{ errorMessages.description }}</div>
        </UFormGroup>

        <!-- Difficulty -->
        <UFormGroup label="Difficulty" name="difficulty" required>
          <USelectMenu
            v-model="state.difficulty"
            :options="['Easy', 'Medium', 'Hard']"
            placeholder="Select difficulty"
          />
        </UFormGroup>

        <!-- Category -->
        <UFormGroup label="Category" name="category" required>
          <USelectMenu
            v-model="state.category"
            :options="predefinedCategories"
            placeholder="Select category"
            allow-new
            @blur="validateField('category')"
          />
          <div v-if="errorMessages.category" class="text-red-500">{{ errorMessages.category }}</div>
        </UFormGroup>

        <!-- Languages -->
        <UFormGroup label="Supported Languages" name="languages">
          <USelectMenu
            v-model="state.languages"
            :options="['python', 'javascript', 'java', 'csharp', 'cpp', 'golang']"
            multiple
            placeholder="Select supported languages"
          />
        </UFormGroup>

        <!-- Function Config -->
        <UFormGroup label="Function Name" name="name" required>
          <UInput
            v-model="state.functionConfig.name"
            placeholder="Enter function name"
            @blur="validateField('functionConfig.name')"
          />
          <div v-if="errorMessages.name" class="text-red-500">{{ errorMessages.name }}</div>
        </UFormGroup>

        <div>
          <h4 class="text-lg font-medium">Parameters</h4>
          <div v-for="(parameter, index) in state.functionConfig.parameters" :key="index" class="flex gap-4">
            <UInput
              v-model="parameter.name"
              placeholder="Parameter name"
              class="flex-1"
              required
              @blur="validateField(`functionConfig.parameters[${index}].name`)"
            />
            <div v-if="errorMessages.parameters[index]" class="text-red-500">
              {{ errorMessages.parameters[index] }}
            </div>
            <USelectMenu
              v-model="parameter.paramType.type"
              :options="(Object.values(AtomicType) as unknown as AtomicType[]).concat(Object.values(CompositeType) as unknown as AtomicType[])"
              placeholder="Parameter type"
              class="flex-1"
            />
            <UButton
              icon="i-heroicons-trash"
              color="red"
              variant="ghost"
              @click="state.functionConfig.parameters.splice(index, 1)"
            />
          </div>
          <UButton
            label="Add Parameter"
            icon="i-heroicons-plus"
            color="green"
            @click="
              state.functionConfig.parameters.push({ name: '', paramType: { type: AtomicType.Integer } })
            "
          />
        </div>

        <!-- Examples -->
        <div>
          <h4 class="text-lg font-medium">Examples</h4>
          <div v-for="(example, index) in state.examples" :key="index" class="flex gap-4">
            <UTextarea
              v-model="exampleParameters[index]"
              @input="updateExampleParameters($event.target.value, index)"
              placeholder="Example parameters"
              :rows="2"
              class="flex-1"
              @blur="validateField(`examples[${index}].parameters`)"
            />
            <div v-if="errorMessages.examples[index]" class="text-red-500">
              {{ errorMessages.examples[index] }}
            </div>
            <UTextarea
              v-model="example.expectedOutput"
              placeholder="Expected output"
              :rows="2"
              class="flex-1"
              @blur="validateField(`examples[${index}].expectedOutput`)"
            />
            <div v-if="errorMessages.examples[index]" class="text-red-500">
              {{ errorMessages.examples[index] }}
            </div>
            <UButton
              icon="i-heroicons-trash"
              color="red"
              variant="ghost"
              @click="state.examples.splice(index, 1)"
            />
          </div>
          <UButton
            label="Add Example"
            icon="i-heroicons-plus"
            color="green"
            @click="state.examples.push({ parameters: [], expectedOutput: '' })"
          />
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-3">
          <UButton label="Cancel" color="gray" variant="ghost" @click="onCancel" />
          <UButton type="submit" label="Save" color="black" />
        </div>
      </UForm>
    </UCard>
  </div>
</template>
