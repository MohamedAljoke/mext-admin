import { tokenKey } from '@/App/Utils/tokens';
import { api } from './axios';

export type HttpPostParams = {
  url: string;
};

export default async <P>(params: HttpPostParams): Promise<P | null> => {
  const response: P = await (
    await api.delete(params.url, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem(tokenKey),
      },
    })
  ).data;
  return response;
};
