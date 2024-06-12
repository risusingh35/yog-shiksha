// contexts/AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

import { useRouter } from 'next/router';
import { clearAllLocalStorage, getLocalStorage, setLocalStorage } from '@/utils/loaclStorageService';

interface AuthContextProps {
  isLoggedIn: boolean; 
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    const token = getLocalStorage('token');
    if (token) {
      setIsLoggedIn(true); // Set isLoggedIn to true if token exists
    }
  }, []);
  const login = (token: string) => {
    setLocalStorage('token', token);
    setUser(token)
    setIsLoggedIn(true); 
     router.push('/dashboard');
  };
  const logout = () => {
    clearAllLocalStorage();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
