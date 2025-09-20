// src/context/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import type { User, AuthResponse, Role } from "../types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, role?: Role) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Persist token and user in localStorage
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [token, user]);

  /**
   * Login function
   * Supports:
   * - Mock mode (no backend)
   * - Real backend API call if VITE_API_URL is set
   */
  const login = async (email: string, password: string, role: Role = "user") => {
    setLoading(true);
    try {
      // If no backend URL, use mock login
      if (!import.meta.env.VITE_API_URL) {
        if (
          (email === "admin@admin.com" && password === "password") ||
          (email === "user@user.com" && password === "password")
        ) {
          const mockUser: User = {
            id: email.includes("admin") ? 1 : 2,
            name: email.includes("admin") ? "Admin User" : "Regular User",
            email,
            role: email.includes("admin") ? "admin" : "user",
          };
          setUser(mockUser);
          setToken("mock-token");
          return;
        } else {
          throw new Error("Invalid credentials. Try admin@admin.com or user@user.com with password 'password'.");
        }
      }

      // Real API call to backend
      const res = await api.post<AuthResponse>("/auth/login", { email, password, role });
      setToken(res.data.token);
      setUser(res.data.user);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout function
   * Clears both state and localStorage
   */
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
