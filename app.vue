<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "~/stores/global";

const globalStore = useGlobalStore();

onMounted(() => {
  globalStore.checkAuth();
});
</script>
