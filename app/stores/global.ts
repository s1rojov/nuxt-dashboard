import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const useGlobalStore = defineStore("globalAuth", () => {
  const isLogged = ref<boolean>(false);
  const user = ref<User | null>(null);
  const users = ref<User[]>([
    { id: 1, name: "Admin", email: "admin@crm.uz", role: "admin" },
    { id: 2, name: "Javohir Valiyev", email: "javohir@crm.uz", role: "sales" },
    {
      id: 3,
      name: "Dilshod Xusainov",
      email: "dilshod@crm.uz",
      role: "support",
    },
  ]);

  const login = (email: string, password: string) => {
    // Simple login logic - in real app use API
    const foundUser = users.value.find((u) => u.email === email);
    if (foundUser && password === "password") {
      isLogged.value = true;
      user.value = foundUser;
      localStorage.setItem("user", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    isLogged.value = false;
    user.value = null;
    localStorage.removeItem("user");
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      user.value = JSON.parse(savedUser);
      isLogged.value = true;
    }
  };

  return { isLogged, user, users, login, logout, checkAuth };
});
