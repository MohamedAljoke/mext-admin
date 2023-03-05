export const tokenKey = 'mext-auth-token';
export const saveToken = (token: string) =>
  localStorage.setItem(tokenKey, token);

export const getToken = () => localStorage.getItem(tokenKey);
