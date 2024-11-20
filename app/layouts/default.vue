<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();
const { isHelpSlideoverOpen } = useDashboard();

const links = [
  {
    id: "home",
    label: "Home",
    icon: "i-heroicons-home",
    to: "/",
    tooltip: {
      text: "Home",
      shortcuts: ["G", "H"],
    },
  },
  {
    id: "questions",
    label: "Questions",
    icon: "i-heroicons-academic-cap",
    to: "/questions",
    tooltip: {
      text: "Questions",
      shortcuts: ["G", "Q"],
    },
  },
];

const footerLinks = [
  {
    label: "Help & Support",
    icon: "i-heroicons-question-mark-circle",
    click: () => (isHelpSlideoverOpen.value = true),
  },
];
// TODO: Update the groups array to include platform-relevant commands (e.g., "Search Questions").
const groups = [
  {
    key: "links",
    label: "Go to",
    commands: links.map((link) => ({ ...link, shortcuts: link.tooltip?.shortcuts })),
  },
  {
    key: "code",
    label: "Code",
    commands: [
      {
        id: "source",
        label: "View page source",
        icon: "i-simple-icons-github",
        click: () => {
          window.open(`https://github.com/TehilaTheStudent/SkillCode-frontend`, "_blank");
        },
      },
    ],
  },
];
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel :width="250" :resizable="{ min: 200, max: 300 }" collapsible>
      <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }"> </UDashboardNavbar>

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />
        <!-- TODO: "Help & Support" could open a custom FAQ page -->
        <UDivider class="sticky bottom-0" />
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
