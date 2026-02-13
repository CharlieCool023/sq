import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '@/lib/database';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Session timeout in milliseconds (30 minutes)
const SESSION_TIMEOUT = 30 * 60 * 1000;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const sessionRef = useRef<number | null>(null);

  // Clear session timeout
  const clearSessionTimeout = useCallback(() => {
    if (sessionRef.current) {
      clearTimeout(sessionRef.current);
      sessionRef.current = null;
    }
  }, []);

  // Set session timeout - logs out user after inactivity
  const setSessionTimeout = useCallback(() => {
    clearSessionTimeout();
    sessionRef.current = window.setTimeout(() => {
      console.log('Session expired due to inactivity');
      handleLogout();
    }, SESSION_TIMEOUT);
  }, [clearSessionTimeout]);

  // Reset session timeout on user activity
  const resetSessionTimeout = useCallback(() => {
    if (isAuthenticated) {
      setSessionTimeout();
    }
  }, [isAuthenticated, setSessionTimeout]);

  // Handle logout
  const handleLogout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsAuthenticated(false);
      clearSessionTimeout();
    }
  }, [clearSessionTimeout]);

  useEffect(() => {
    // Check for existing Supabase session
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          console.log('✅ Active session found for:', session.user.email);
          setIsAuthenticated(true);
          setSessionTimeout();
        } else {
          console.log('❌ No active session found');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
        setSessionTimeout();
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
        clearSessionTimeout();
      }
      setIsLoading(false);
    });

    // Set up activity listeners to reset session timeout
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      window.addEventListener(event, resetSessionTimeout);
    });

    return () => {
      subscription.unsubscribe();
      clearSessionTimeout();
      activityEvents.forEach(event => {
        window.removeEventListener(event, resetSessionTimeout);
      });
    };
  }, [setSessionTimeout, clearSessionTimeout, resetSessionTimeout]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      if (data.session) {
        console.log('✅ Login successful for:', email);
        setIsAuthenticated(true);
        setSessionTimeout();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  }, [setSessionTimeout]);

  const logout = useCallback(async () => {
    await handleLogout();
  }, [handleLogout]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
