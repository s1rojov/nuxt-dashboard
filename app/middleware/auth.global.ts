import { useGlobalStore } from "~/stores/global";

export default defineNuxtRouteMiddleware((to, from) => {
  const globalStore = useGlobalStore();

  // Auth sahifalariga faqat login qilmagan foydalanuvchi kirishi mumkin
  if (!globalStore.isLogged && to.path !== "/auth") {
    return navigateTo("/auth");
  }

  // Login qilgandan keyin /auth'ga qayta kirish taqiqlangan
  if (globalStore.isLogged && to.path === "/auth") {
    return navigateTo("/dashboard");
  }
});
