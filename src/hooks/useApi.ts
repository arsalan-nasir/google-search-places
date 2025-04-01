import { IHistory } from "@/types/history";
import axios, { AxiosError, AxiosInstance } from "axios";
import { useCallback, useMemo } from "react";

const BASE_URL = "https://maps.googleapis.com/";
const API_TIMEOUT = 30000; // 30 seconds

interface GoogleResponse {
  status: string;
  results: IHistory[];
}

export const useApi = () => {
  const axiosInstance: AxiosInstance = useMemo(() => {
    const instance = axios.create({
      baseURL: BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        console.log({ error });
        return Promise.reject(error);
      }
    );

    return instance;
  }, []);

  const get = useCallback(
    async (endpoint: string): Promise<GoogleResponse> => {
      const response = await axiosInstance.get(endpoint);
      return response.data;
    },
    [axiosInstance]
  );

  return { get };
};
