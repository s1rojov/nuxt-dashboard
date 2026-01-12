<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
  import { useGlobalStore } from '~/stores/global';
  import { AuthService } from '~/services/auth.service';

  const globalStore = useGlobalStore();

  onMounted(async () => {
    const savedUser = localStorage.getItem('userInfo');

    if (savedUser && globalStore.accessToken) {
      try {
        await AuthService.getMe();
        globalStore.isLogged = true;
      } catch (error) {
        if (globalStore.refreshToken) {
          try {
            await AuthService.refreshToken();
          } catch (refreshError) {
            globalStore.logout();
            await navigateTo('/auth');
          }
        }
      }
    }
  });
</script>
