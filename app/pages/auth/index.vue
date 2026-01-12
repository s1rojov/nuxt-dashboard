<template>
  <div
    class="min-h-screen bg-linear-to-br from-slate-50 to-slate-300 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-2">
        CRM Tizimi
      </h1>
      <p class="text-center text-gray-500 mb-8">Tizimga kiring</p>

      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Username</label
          >
          <input
            v-model="user.username"
            required
            placeholder="Username"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1"
            >Parol</label
          >
          <input
            v-model="user.password"
            type="password"
            required
            placeholder="Password"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
        <div
          v-if="errorMessage"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
        >
          {{ errorMessage }}
        </div>
        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {{ isLoading ? 'Kirish...' : 'Kirish' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  definePageMeta({
    layout: 'default',
  });
  import { ref, onMounted } from 'vue';
  import { useGlobalStore } from '~/stores/global';
  import { useRouter } from 'vue-router';
  import { AuthService } from '~/services/auth.service';

  const user = ref<{ username: string; password: string }>({
    username: 'jamesd',
    password: 'jamesdpass',
  });
  const errorMessage = ref('');
  const isLoading = ref(false);

  const globalStore = useGlobalStore();
  const router = useRouter();

  const handleLogin = async () => {
    errorMessage.value = '';
    isLoading.value = true;

    try {
      const userData = await AuthService.login(user.value);
      if (userData) {
        router.push('/dashboard');
        localStorage.setItem('userInfo', JSON.stringify(userData));
      }
    } catch (error) {
      errorMessage.value = 'Kirish jarayonida xatolik!';
      console.error('Login error:', error);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    if (globalStore.isLogged) {
      router.push('/dashboard');
    }
  });
</script>
