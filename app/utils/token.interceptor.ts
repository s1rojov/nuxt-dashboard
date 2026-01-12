import { useGlobalStore } from '~/stores/global';
import { AuthService } from '~/services/auth.service';
export const setupTokenInterceptor = () => {
  const store = useGlobalStore();

  $fetch.create({
    onResponseError: async ({ response }) => {
      if (response?.status === 401 && store.refreshToken) {
        try {
          await AuthService.refreshToken();
          return response;
        } catch (error) {
          store.logout();
          await navigateTo('/auth');
        }
      }
    },
  });
};
