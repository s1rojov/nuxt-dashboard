import { usePost } from "./api.service";

export const AuthService = {
  login(data: any) {
    return usePost("auth/login", data);
  },
};
