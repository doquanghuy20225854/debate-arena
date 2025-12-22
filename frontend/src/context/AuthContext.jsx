import React, { createContext, useState } from 'react';

export const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const login = (u) => setUser(u);
  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
};
