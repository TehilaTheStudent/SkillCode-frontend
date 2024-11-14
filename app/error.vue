<script setup lang="ts">
import type { NuxtError } from '#app'

useSeoMeta({
  title: 'SkillCode - Page not found',
  description: 'We couldn’t find the page you were looking for. Return to practice and continue improving your skills.'
})

defineProps({
  error: {
    type: Object as PropType<NuxtError>,
    required: true
  }
})

useHead({
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<template>
  <div>
    <UMain>
      <UContainer>
        <UPage>
          <UPageError :error="error" />
        </UPage>
      </UContainer>
    </UMain>

    <UNotifications />
  </div>
</template>
