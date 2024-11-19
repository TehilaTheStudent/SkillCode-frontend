import { defineStore } from "pinia";
import { ref } from "vue";
import { useRuntimeConfig } from "#app"; // For Nuxt to access runtime config

export const useConfigStore = defineStore("config", () => {
  const configs = ref(null); // Holds the backend configurations
  const isLoading = ref(false); // Tracks loading state
  const error = ref<string | null>(null); // Tracks error state

  const fetchConfigs = async () => {
    if (configs.value) return; // Avoid re-fetching if already loaded

    const config = useRuntimeConfig(); // Access runtime configuration
    const apiUrl = `${config.public.backendUrl}/configs`;

    isLoading.value = true;
    error.value = null;

    try {
      const response = await $fetch(apiUrl); // Fetch configurations
      configs.value = response;
    } catch (err: any) {
      error.value = err.message || "Failed to fetch configs";
    } finally {
      isLoading.value = false;
    }
  };

  return {
    configs,
    isLoading,
    error,
    fetchConfigs,
  };
});
