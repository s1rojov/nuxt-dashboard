import { usePost, useGet } from './api.service';
import { useGlobalStore } from '~/stores/global';

interface LoginPayload {
  username: string;
  password: string;
}

export const AuthService = {
  async login(data: LoginPayload) {
    const { data: response, error } = await usePost('auth/login', data);

    if (error.value) {
      throw new Error(error.value);
    }

    if (response.value) {
      const store = useGlobalStore();
      store.setUser(response.value);
      return response.value;
    }

    throw new Error('Login failed');
  },

  async refreshToken() {
    const store = useGlobalStore();

    if (!store.refreshToken) {
      throw new Error('No refresh token available');
    }

    const { data: response, error } = await usePost('auth/refresh', {
      refreshToken: store.refreshToken,
    });

    if (error.value) {
      store.logout();
      throw new Error('Token refresh failed');
    }

    if (response.value) {
      store.setUser(response.value);
      return response.value;
    }

    throw new Error('Token refresh failed');
  },

  async getMe() {
    const { data: response, error } = await useGet('auth/me');

    if (error.value) {
      throw new Error('Failed to get user info');
    }

    if (response.value) {
      const store = useGlobalStore();
      store.setUser(response.value);
      return response.value;
    }

    throw new Error('Failed to get user info');
  },

  logout() {
    const store = useGlobalStore();
    store.logout();
  },
};
