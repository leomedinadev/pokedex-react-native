import React, { createContext, useState, PropsWithChildren } from "react";
import { UserDetails } from "../utils/userDB";

interface AuthContextValue {
  auth?: UserDetails,
  login: (userData: UserDetails) => void,
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue>({
  auth: undefined,
  login: () => {},
  logout: () => {},
});

export function AuthProvider(props: PropsWithChildren) {
  const { children } = props;
  const [auth, setAuth] = useState<UserDetails | undefined>(undefined);

  const login = (userData: UserDetails) => {
    setAuth(userData);
  };

  const logout = () => {
    setAuth(undefined);
  };

  const valueContext = {
    auth,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={valueContext}>{children}</AuthContext.Provider>
  );
}
