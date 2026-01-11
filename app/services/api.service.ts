const base_url = "https://dummyjson.com/";

interface FetchParams {
  page?: number;
  limit?: number;
}

export const usePost = async (url: string, data: any) => {
  return await useFetch(`${base_url}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};
