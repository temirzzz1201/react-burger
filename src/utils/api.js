import axios from 'axios';
import { BASE_URL } from './constants';
import Cookies from 'js-cookie';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(config => {
  const accessToken = Cookies.get('accessToken');

  if (accessToken) {
    config.headers.Authorization = accessToken;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, async error => {
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
});

const checkResponse = res => {
  return res.status === 200 ? res.data : Promise.reject(res.data);
};

export const refreshToken = async () => {
  try {
    const response = await api.post('/auth/token', {
      token: localStorage.getItem('refreshToken'),
    });
    return checkResponse(response);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const fetchWithRefresh = async (url, options) => {
  try {
    const response = await api(url, options);
    return checkResponse(response);
  } catch (error) {
    if (error.response.data.message === 'jwt expired') {
      const refreshData = await refreshToken();
      options.headers['Authorization'] = refreshData.accessToken;
      const response = await api(url, options);
      return checkResponse(response);
    } else {
      return Promise.reject(error);
    }
  }
};

export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  Cookies.set('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const loginUser = async (userData) => {
  const response = await api.post('/auth/login', userData);
  Cookies.set('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const logoutUser = async () => {
  const token = localStorage.getItem('refreshToken');
  const response = await api.post('/auth/logout', { token });
  Cookies.remove('accessToken');
  localStorage.removeItem('refreshToken');
  return response.data;
};

export const resetPasswordRequest = async (email) => {
  const response = await api.post('/password-reset', { email });
  return response.data;
};

export const setNewPasswordRequest = async (data) => {
  const response = await api.post('/password-reset/reset', data);
  return response.data;
};

export const fetchUser = async () => {
  const response = await api.get('/auth/user', {
    headers: {
      Authorization: Cookies.get('accessToken'),
    },
  });
  return response.data.user;
};

export const updateUserRequest = async (userData) => {
  const response = await api.patch('/auth/user', userData, {
    headers: {
      Authorization: Cookies.get('accessToken'),
    },
  });
  return response.data.user;
};

export default api;
