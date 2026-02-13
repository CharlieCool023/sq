import { useState, useEffect, useCallback } from 'react';
import { signIn, signOut, onAuthStateChange, changePassword } from '@/services/supabaseService';
import type { User } from '@supabase/supabase-js';

const ADMIN_EMAIL = 'admin@sqconsulting.com';
const ADMIN_PASSWORD_HASH = 'sqadmin2025'; // In production, use proper auth

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check session storage for admin login
    const adminSession = sessionStorage.getItem('sq_admin_session');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);

    // Subscribe to auth changes
    const { data: { subscription } } = onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      // For demo purposes, using simple auth
      // In production, use Supabase Auth with proper RLS
      if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD_HASH) {
        sessionStorage.setItem('sq_admin_session', 'true');
        setIsAuthenticated(true);
        return true;
      }
      
      // Try Supabase auth as fallback
      await signIn(email, password);
      sessionStorage.setItem('sq_admin_session', 'true');
      setIsAuthenticated(true);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut();
      sessionStorage.removeItem('sq_admin_session');
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  const updatePassword = useCallback(async (newPassword: string): Promise<boolean> => {
    try {
      await changePassword(newPassword);
      return true;
    } catch (error) {
      console.error('Password change error:', error);
      return false;
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    logout,
    updatePassword,
  };
};
