import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from './constants';
import Cookies from 'js-cookie';
import { IUser, IUserResponse, IFetchOptions, IRefreshTokenResponse } from '../types';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  error => Promise.reject(error)
);

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshData = await refreshToken();
        Cookies.set('accessToken', refreshData.accessToken);
        localStorage.setItem('refreshToken', refreshData.refreshToken);
        api.defaults.headers.common['Authorization'] = `Bearer ${refreshData.accessToken}`;
        originalRequest.headers['Authorization'] = `Bearer ${refreshData.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

const checkResponse = <T>(res: AxiosResponse<T>): Promise<T> => {
  return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res.data);
};

export const refreshToken = async (): Promise<IRefreshTokenResponse> => {
  try {
    const response = await api.post<IRefreshTokenResponse>('/auth/token', {
      token: localStorage.getItem('refreshToken'),
    });
    return checkResponse(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchWithRefresh = async <T>(url: string, options: IFetchOptions): Promise<T> => {
  try {
    const response = await api(url, options);
    return checkResponse(response);
  } catch (error) {
    const axiosError = error as { response: { data: { message: string } } };
    if (axiosError.response.data.message === 'jwt expired') {
      const refreshData = await refreshToken();
      options.headers = { ...options.headers, Authorization: `Bearer ${refreshData.accessToken}` };
      const response = await api(url, options);
      return checkResponse(response);
    } else {
      return Promise.reject(error);
    }
  }
};

export const registerUser = async (userData: IUser): Promise<IUserResponse> => {
  const response = await api.post<IUserResponse>('/auth/register', userData);
  Cookies.set('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const loginUser = async (userData: IUser): Promise<IUserResponse> => {
  const response = await api.post<IUserResponse>('/auth/login', userData);
  Cookies.set('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const logoutUser = async (): Promise<void> => {
  const token = localStorage.getItem('refreshToken');
  await api.post<{ message: string }>('/auth/logout', { token });
  Cookies.remove('accessToken');
  localStorage.removeItem('refreshToken');
};


export const resetPasswordRequest = async (email: string): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/password-reset', { email });
  return response.data;
};

export const setNewPasswordRequest = async (data: { password: string; token: string }): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>('/password-reset/reset', data);
  return response.data;
};

export const fetchUser = async (): Promise<IUser> => {
  const response = await api.get<{ user: IUser }>('/auth/user', {
    headers: {
      Authorization: `${Cookies.get('accessToken')}`,
    },
  });
  return response.data.user;
};

export const updateUserRequest = async (userData: Partial<IUser>): Promise<IUser> => {
  const response = await api.patch<{ user: IUser }>('/auth/user', userData, {
    headers: {
      Authorization: `${Cookies.get('accessToken')}`,
    },
  });
  return response.data.user;
};

export default api;
