// src/types/index.ts

// User roles
export type Role = "user" | "admin";

// User object returned from backend
export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt?: string;
  updatedAt?: string;
}

// Authentication response
export interface AuthResponse {
  token: string;
  user: User;
}
