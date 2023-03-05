import { LoginResponseType, LoginSchemaType } from '../Schema/Auth.Schema';
import { post } from './base';

export const login = async (
  data: LoginSchemaType
): Promise<LoginResponseType | null> => {
  const response = await post<LoginSchemaType, LoginResponseType>({
    url: '/auth/admin-login',
    body: data,
  });
  return response;
};
export const validateAndRefreshToken =
  async ({}): Promise<LoginResponseType | null> => {
    const response = await post<undefined, LoginResponseType>({
      url: '/auth/admin-refresh',
    });
    return response;
  };
