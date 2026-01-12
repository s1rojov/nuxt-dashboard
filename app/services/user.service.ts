import { usePost, useGet } from './api.service';
import { useGlobalStore } from '~/stores/global';

export const UserService = {
  getAll(params: any) {
    return useGet('users', params);
  },
};
