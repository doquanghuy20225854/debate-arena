import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authApi } from "../api/auth.js";
import { clearToken, getToken, setToken } from "../api/client.js";

const AuthContext = createContext(null);

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider />");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [booting, setBooting] = useState(true);

  const isAuthenticated = !!user;

  async function refreshMe() {
    const token = getToken();
    if (!token) return { ok: false };

    const res = await authApi.me();
    if (res?.success) {
      setUser(res.data);
      return { ok: true, user: res.data };
    }

    // Token lỗi/hết hạn
    clearToken();
    setUser(null);
    return { ok: false, message: res?.message };
  }

  useEffect(() => {
    // Auto-login nếu có token
    (async () => {
      try {
        await refreshMe();
      } finally {
        setBooting(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function login(identifier, password) {
    const res = await authApi.login({ username: identifier, password });

    if (res?.success && res?.data?.token) {
      setToken(res.data.token);
      setUser(res.data.user);
      return { ok: true };
    }

    return { ok: false, message: res?.message || "Đăng nhập thất bại" };
  }

  async function register(payload) {
    const res = await authApi.register(payload);
    if (res?.success) return { ok: true, message: res?.message || "Đăng ký thành công" };
    return { ok: false, message: res?.message || "Đăng ký thất bại" };
  }

  async function logout() {
    try {
      await authApi.logout();
    } catch {
      // ignore
    } finally {
      clearToken();
      setUser(null);
    }
  }

  const value = useMemo(
    () => ({
      user,
      booting,
      isAuthenticated,
      login,
      register,
      logout,
      refreshMe,
    }),
    [user, booting, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
