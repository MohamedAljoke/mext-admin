import { tokenKey } from '@/App/Utils/tokens';
import { api } from './axios';

export default async <T>(url: string): Promise<T | null> => {
  const response: T = await (
    await api.get(url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(tokenKey),
      },
    })
  ).data;
  return response;
};
