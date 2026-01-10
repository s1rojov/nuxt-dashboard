<template>
  <div
    class="redirect-container min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-800"
  >
    <div class="text-center text-white">
      <h1 class="text-4xl font-bold mb-4">CRM Tizimiga Xush Kelibsiz</h1>
      <p class="text-xl text-blue-100 mb-8">Bosh sahifaga o'tish...</p>
      <div
        class="animate-spin w-12 h-12 border-4 border-blue-300 border-t-white rounded-full mx-auto"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

onMounted(() => {
  router.push("/dashboard");
});
</script>
