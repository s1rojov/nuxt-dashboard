import { useGet } from './api.service';

export const ProductService = {
  getAll(params: any) {
    return useGet('products', params);
  },
  UpdateOrCreate(id, data: any) {
    if (id === 0 || id) {
      return usePost('products/add', data);
    } else {
      return usePut(`products/${id}`, data);
    }
  },
  getById(id: number | string) {
    return useGet(`products/${id}`);
  },
};
