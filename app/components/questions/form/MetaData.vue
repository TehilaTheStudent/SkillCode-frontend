<script lang="ts" setup>
import type { Question } from '~/types';
import { PredefinedCategory,PredefinedSupportedLanguage} from '~/types/index.d';
const props = defineProps<{ state: Question}>();
const emit = defineEmits(["updateState"]);
</script>
<template>
  <div>
    <UFormGroup :label="'Title'" :name="'title'">
      <UInput v-model="state.title" />
    </UFormGroup>

    <UFormGroup :label="'Description'" :name="'description'">
      <UInput v-model="state.description" />
    </UFormGroup>

    <UFormGroup :label="'Difficulty'" :name="'difficulty'">
      <USelect v-model="state.difficulty" :options="['Easy', 'Medium', 'Hard']" />
    </UFormGroup>

    <UFormGroup :label="'Category'" :name="'category'">
      <USelectMenu
        searchable
        searchable-placeholder="Search a category..."
        class="w-full lg:w-48"
        placeholder="Select a category"
          v-model="state.category"
        :options="Object.values(PredefinedCategory)"
      />
    </UFormGroup>
    <UFormGroup :label="'Languages'" :name="'languages'">
      <USelectMenu v-model="state.languages" required :options="Object.values(PredefinedSupportedLanguage)" multiple />
    </UFormGroup>

    <!-- Display Chosen Languages -->
    <div class="chosen-languages">
      <h4>Chosen Languages:</h4>
      <ul>
        <li v-for="(language, index) in state.languages" :key="index">
          {{ language }}
        </li>
      </ul>
    </div>
  </div>
</template>
