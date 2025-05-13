
import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'sonner';

// Define types
interface User {
  id: string;
  name: string;
  email: string;
  provider?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, provider?: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Create auth context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('auth_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function
  const login = async (email: string, password: string, provider?: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (!email.includes('@') || password.length < 5) {
      setIsLoading(false);
      throw new Error("Credenciales inválidas");
    }
    
    // Create mock user (in a real app this would come from an API)
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name: email.split('@')[0],
      email,
      provider
    };
    
    // Store user in local storage and state
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  };
  
  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation
    if (!email.includes('@') || password.length < 5) {
      setIsLoading(false);
      throw new Error("Datos inválidos");
    }
    
    // Create mock user
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      email,
    };
    
    // Store user in local storage and state
    localStorage.setItem('auth_user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  };
  
  // Logout function
  const logout = (): void => {
    localStorage.removeItem('auth_user');
    setUser(null);
    toast.success("Has cerrado sesión correctamente");
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
