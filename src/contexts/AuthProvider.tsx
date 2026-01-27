import { useState, useEffect, ReactNode } from 'react';
import { AuthContext, User, LoginResult } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('beres_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Gagal parse user dari storage", e);
        localStorage.removeItem('beres_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<LoginResult> => {
    try {
      const res = await fetch('http://localhost/beres-api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setUser(data.user);
        localStorage.setItem('beres_user', JSON.stringify(data.user));
        return { success: true, role: data.user.role };
      } else {
        return { success: false, message: data.message || "Login gagal" };
      }
    } catch (error: any) {
      console.error("Login Error:", error);
      return { success: false, message: "Gagal terhubung ke server (XAMPP)" };
    }
  };

  const signOut = async () => {
    localStorage.removeItem('beres_user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, setUser, signOut, login }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};