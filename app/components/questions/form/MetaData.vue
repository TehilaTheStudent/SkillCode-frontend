<script lang="ts" setup>
import type { Question } from "~/types";
import { PredefinedCategory, PredefinedSupportedLanguage } from "~/types/index.d";

// Props and Emits
const props = defineProps<{ state: Question }>();
const emit = defineEmits(["updateState"]);
</script>

<template>
  <div>
    <!-- Title Input -->
    <UFormGroup :label="'Title'" :name="'title'">
      <UInput v-model="props.state.title" />
    </UFormGroup>

    <!-- Description Input -->
    <UFormGroup :label="'Description'" :name="'description'">
      <UInput v-model="props.state.description" />
    </UFormGroup>

    <!-- Difficulty Selection -->
    <UFormGroup :label="'Difficulty'" :name="'difficulty'">
      <USelect v-model="props.state.difficulty" :options="['Easy', 'Medium', 'Hard']" />
    </UFormGroup>

    <!-- Category Selection -->
    <UFormGroup :label="'Category'" :name="'category'">
      <USelectMenu
        searchable
        searchable-placeholder="Search a category..."
        class="w-full lg:w-48"
        placeholder="Select a category"
        v-model="props.state.category"
        :options="Object.values(PredefinedCategory)"
      />
    </UFormGroup>

    <!-- Supported Languages Selection -->
    <UFormGroup :label="'Languages'" :name="'languages'">
      <USelectMenu
        v-model="props.state.languages"
        :options="Object.values(PredefinedSupportedLanguage)"
        multiple
      />
    </UFormGroup>

    <!-- Display Chosen Languages -->

    <div class="flex flex-wrap gap-2 mt-4 mb-2">
      <span
        v-for="(language, index) in props.state.languages"
        :key="index"
        class="inline-block px-2 py-1 text-sm font-medium text-gray-800 bg-gray-100 rounded border border-gray-200"
      >
        {{ language }}
      </span>
    </div>
  </div>
</template>
