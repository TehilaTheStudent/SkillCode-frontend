<script setup lang="ts"></script>

<template>
  <UDashboardPage>
    <UDashboardPanel grow>
      <UDashboardNavbar title="Home">
        <template #right>
          <!-- <UTooltip text="Notifications" :shortcuts="['N']"> -->
          <!-- <UButton color="gray" variant="ghost" square @click="isNotificationsSlideoverOpen = true"> -->
          <!-- <UChip color="red" inset>
                <UIcon name="i-heroicons-bell" class="w-5 h-5" />
              </UChip> -->
          <!-- </UButton> -->
          <!-- </UTooltip> -->

          <!-- <UDropdown :items="items">
            <UButton icon="i-heroicons-plus" size="md" class="ml-1.5 rounded-full" />
          </UDropdown> -->
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <!-- ~/components/home/HomeDateRangePicker.vue -->
          <!-- <HomeDateRangePicker v-model="range" class="-ml-2.5" /> -->

          <!-- ~/components/home/HomePeriodSelect.vue -->
          <!-- <HomePeriodSelect v-model="period" :range="range" /> -->
        </template>
      </UDashboardToolbar>

      <UDashboardPanelContent>
        <!-- ~/components/home/HomeChart.vue -->
        <!-- <HomeChart :period="period" :range="range" /> -->

        <ULandingCard
          title="SkillCode platform"
          description="skillcode is a platform for learning and practicing programming languages."
          icon="i-heroicons-academic-cap"
          color="fuchsia"
        />

        <div class="grid lg:grid-cols-2 lg:items-start gap-8 mt-8">
          <!-- ~/components/home/HomeSales.vue -->
          <!-- <HomeSales /> -->
          <!-- ~/components/home/HomeCountries.vue -->
          <!-- <HomeCountries /> -->
        </div>
      </UDashboardPanelContent>
    </UDashboardPanel>
  </UDashboardPage>
</template>
