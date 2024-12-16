import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';

const BACKEND_URL = 'https://14.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['X-Token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === StatusCodes.UNAUTHORIZED) {
        return Promise.reject(error);
      }
      throw error;
    }
  );

  return api;
};
