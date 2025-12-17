import React, { createContext, useState } from 'react';

interface AuthState {
  user: { name?: string; email?: string } | null;
  login: (u: any) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthState>({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);
  const login = (u: any) => setUser(u);
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
