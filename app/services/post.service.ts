import { usePost, useGet } from './api.service';
import { useGlobalStore } from '~/stores/global';

export const PostService = {
  getAll(params: any) {
    return useGet('posts', params);
  },
};
