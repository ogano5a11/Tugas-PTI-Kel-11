import { createContext } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'partner';
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default AuthContext;
