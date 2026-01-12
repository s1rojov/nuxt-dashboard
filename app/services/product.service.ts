import { useGet } from './api.service';

export const ProductService = {
  getAll(params: any) {
    return useGet('products', params);
  },
};
