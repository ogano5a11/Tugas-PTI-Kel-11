import { createContext } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}

export interface LoginResult {
  success: boolean;
  role?: string;
  message?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => Promise<LoginResult>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);