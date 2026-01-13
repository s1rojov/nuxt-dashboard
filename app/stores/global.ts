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
    localStorage.setItem('userInfo', JSON.stringify(userData));
  };

  const loadFromStorage = () => {
    const savedUser = localStorage.getItem('userInfo');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        user.value = userData;
        accessToken.value = userData.accessToken;
        refreshToken.value = userData.refreshToken;
        isLogged.value = true;
      } catch (error) {
        console.error('Error loading user from storage:', error);
        logout();
      }
    }
  };

  const logout = () => {
    user.value = null;
    accessToken.value = '';
    refreshToken.value = '';
    isLogged.value = false;
    localStorage.removeItem('userInfo');
  };

  return {
    isLogged,
    user,
    accessToken,
    refreshToken,
    setUser,
    logout,
    loadFromStorage,
  };
});
