import React, { createContext, useContext, useState, useEffect } from 'react';
import { api, getAuthToken, setAuthToken, removeAuthToken } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoMode, setDemoMode] = useState(() => {
    const saved = localStorage.getItem('mood_to_move_demo_mode');
    if (saved !== null) return saved === 'true';
    return import.meta.env.VITE_DEMO_MODE === 'true';
  });

  const toggleDemoMode = () => {
    setDemoMode((prev) => {
      const next = !prev;
      localStorage.setItem('mood_to_move_demo_mode', String(next));
      return next;
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await api.auth.getMe();
        if (data.success && data.user) {
          setUser(data.user);
        } else {
          removeAuthToken();
        }
      } catch (err) {
        removeAuthToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    const data = await api.auth.login({ email, password });
    if (data.token) {
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const register = async (name, email, password, confirmPassword) => {
    const data = await api.auth.register({ name, email, password, confirmPassword });
    if (data.token) {
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const demoLogin = async () => {
    const data = await api.auth.demoLogin();
    if (data.token) {
      setAuthToken(data.token);
      setUser(data.user);
    }
    return data;
  };

  const logout = async () => {
    try {
      await api.auth.logout();
    } finally {
      removeAuthToken();
      setUser(null);
    }
  };

  const updateUser = (updatedFields) => {
    setUser((prev) => ({ ...prev, ...updatedFields }));
  };

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    demoMode,
    toggleDemoMode,
    login,
    register,
    demoLogin,
    logout,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
