import { Dispatch, SetStateAction, createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router, { useRouter } from 'next/router'
import { validateAndRefreshToken } from "../Services/Auth";
import { saveToken } from "../Utils/tokens";

export type UserAuthType = {
  name: string;
  email: string;
}

type AuthContextType = {
  isAuthenticated: boolean;
  user: UserAuthType | null;
  isLoading: boolean
  setUser: Dispatch<SetStateAction<UserAuthType | null>>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: JSX.Element }) {
  const [user, setUser] = useState<UserAuthType | null>(null)

  const isAuthenticated = !!user;
  const [isLoading, setIsLoading] = useState(true); //muda para true dps

  const refreshToken = async () => {
    const refreshResponse = await validateAndRefreshToken({});
    setIsLoading(false);
    return refreshResponse;
  };
  useEffect(() => {
    const { 'auth-token': token } = parseCookies()
    setIsLoading(true);
    if (token) {
      refreshToken().then(response => {
        if (response?.email && response.name) {
          setUser({ name: response.name, email: response.email });
        } else {
          setUser(null)
        }
        saveToken(response?.token || '');
        setCookie(undefined, 'auth-token', token, {
          maxAge: 60 * 60 * 24 * 7, //7days
        })
      }).catch((e) => {
        setUser(null)
      }).finally(() => {
        setIsLoading(false);
      })
    } else {
      setIsLoading(false)
    }
  }, [])
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}