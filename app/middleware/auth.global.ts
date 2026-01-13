import { useGlobalStore } from '~/stores/global';

export default defineNuxtRouteMiddleware((to, from) => {
  const globalStore = useGlobalStore();

  if (!globalStore.isLogged && typeof window !== 'undefined') {
    globalStore.loadFromStorage();
  }

  if (!globalStore.isLogged && to.path !== '/auth') {
    return navigateTo('/auth');
  }
  if (globalStore.isLogged && to.path === '/auth') {
    return navigateTo('/dashboard');
  }
});
