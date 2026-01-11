import { defineStore } from "pinia";
import { ref } from "vue";

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

export const useGlobalStore = defineStore("globalAuth", () => {
  const isLogged = ref<boolean>(false);
  const user = ref<User | null>(null);

  return { isLogged, user };
});
