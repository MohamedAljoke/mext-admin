import axios from 'axios';

export const API: string =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000/api/v1';

export const defaultParams = () => {
  return {
    baseURL: API,
    headers: {
      'Content-Type': 'application/json',
    },
  };
};

export const api = axios.create({
  baseURL: API,
});
