<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
        CRM Tizimi
      </h1>
      <p class="text-center text-gray-500 mb-8">Tizimga kiring</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <!-- Email -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            required
            placeholder="admin@crm.uz"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Parol</label
          >
          <input
            v-model="password"
            type="password"
            required
            placeholder="password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          {{ errorMessage }}
        </div>

        <!-- Demo Users -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
          <p class="font-semibold text-blue-900 mb-2">Demo foydalanuvchilar:</p>
          <p class="text-blue-800">📧 admin@crm.uz</p>
          <p class="text-blue-800">🔑 password</p>
        </div>

        <!-- Login Button -->
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {{ isLoading ? "Kirish..." : "Kirish" }}
        </button>
      </form>

      <p class="text-center text-gray-600 text-sm mt-4">
        Bu demo CRM tizimi. Parol:
        <code class="bg-gray-100 px-1 rounded">password</code>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useGlobalStore } from "~/stores/global";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "default",
});

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const isLoading = ref(false);

const globalStore = useGlobalStore();
const router = useRouter();

const handleLogin = async () => {
  errorMessage.value = "";
  isLoading.value = true;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = globalStore.login(email.value, password.value);
    if (success) {
      await router.push("/dashboard");
    } else {
      errorMessage.value = "Email yoki parol noto'g'ri!";
    }
  } catch (error) {
    errorMessage.value = "Kirish jarayonida xatolik!";
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  globalStore.checkAuth();
  if (globalStore.isLogged) {
    router.push("/dashboard");
  }
});
</script>
