import { defineStore } from 'pinia';
import { ref } from 'vue';

interface User {
  accessToken: string;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
}

export const useGlobalStore = defineStore('globalAuth', () => {
  const isLogged = ref<boolean>(false);
  const user = ref<User | null>(null);
  const accessToken = ref<string>('');
  const refreshToken = ref<string>('');

  const setUser = (userData: User) => {
    user.value = userData;
    accessToken.value = userData.accessToken;
    refreshToken.value = userData.refreshToken;
    isLogged.value = true;
  };

  const logout = () => {
    user.value = null;
    accessToken.value = '';
    refreshToken.value = '';
    isLogged.value = false;
  };

  return { isLogged, user, accessToken, refreshToken, setUser, logout };
});
