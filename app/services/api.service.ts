import { useGlobalStore } from '~/stores/global';

const base_url = 'https://dummyjson.com/';

interface FetchParams {
  page?: number;
  limit?: number;
}

const getAuthHeaders = () => {
  const store = useGlobalStore();
  const headers: any = {
    'Content-Type': 'application/json',
  };

  if (store.accessToken) {
    headers.Authorization = `Bearer ${store.accessToken}`;
  }

  return headers;
};

export const usePost = async (url: string, data: any) => {
  return await useFetch(`${base_url}${url}`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
};

export const useGet = async (url: string, params?: FetchParams) => {
  let fullUrl = `${base_url}${url}`;

  if (params) {
    const query = new URLSearchParams(params as any).toString();
    fullUrl += `?${query}`;
  }

  return await useFetch(fullUrl, {
    method: 'GET',
    headers: getAuthHeaders(),
  });
};

export const usePut = async (url: string, data: any) => {
  return await useFetch(`${base_url}${url}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
};

export const useDelete = async (url: string) => {
  return await useFetch(`${base_url}${url}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
};
