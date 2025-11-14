import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [demoUsers] = useState([
    { username: 'johnd', password: 'm38rmF$', userId: 1 },
    { username: 'mor_2314', password: '83r5^_', userId: 2 },
    { username: 'kevinryan', password: 'kev02937@', userId: 3 },
    { username: 'donero', password: 'ewedon', userId: 4 },
    { username: 'derek', password: 'jklg*_56', userId: 5 }
  ]);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      const savedToken = localStorage.getItem('ecommerce-token');
      const savedUser = localStorage.getItem('ecommerce-user');
      
      if (savedToken) {
        setToken(savedToken);
        // Validate token on app start
        const isValid = await validateToken(savedToken);
        if (isValid && savedUser) {
          setUser(JSON.parse(savedUser));
        } else {
          // Token is invalid, clear storage
          clearAuthStorage();
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      clearAuthStorage();
    } finally {
      setLoading(false);
    }
  };

  const validateToken = async (token) => {
    try {
      // For demo purposes, we'll consider tokens valid for 24 hours
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      const isExpired = Date.now() >= tokenData.exp * 1000;
      return !isExpired;
    } catch {
      return false;
    }
  };

  const clearAuthStorage = () => {
    localStorage.removeItem('ecommerce-token');
    localStorage.removeItem('ecommerce-user');
    setToken(null);
    setUser(null);
  };

  const generateToken = (userId) => {
    // Simple token generation for demo purposes
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { 
      userId, 
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
    };
    
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));
    
    return `${encodedHeader}.${encodedPayload}.demo_signature`;
  };

  const login = async (username, password) => {
    try {
      setLoading(true);

      // Check demo users first
      const demoUser = demoUsers.find(u => u.username === username && u.password === password);
      
      if (demoUser) {
        // Demo user found - use FakeStore API for demo
        const response = await fetch('https://fakestoreapi.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: demoUser.username,
            password: demoUser.password,
          }),
        });
        
        if (response.ok) {
          const data = await response.json();
          const generatedToken = generateToken(demoUser.userId);
          
          // Get user details from FakeStore API
          const userResponse = await fetch(`https://fakestoreapi.com/users/${demoUser.userId}`);
          const userData = await userResponse.json();
          
          const enhancedUser = {
            ...userData,
            isDemo: true,
            loginMethod: 'demo'
          };

          setToken(generatedToken);
          setUser(enhancedUser);
          
          localStorage.setItem('ecommerce-token', generatedToken);
          localStorage.setItem('ecommerce-user', JSON.stringify(enhancedUser));

          toast.success(`Welcome back, ${userData.username}!`, {
            icon: '👋',
            style: {
              background: '#10b981',
              color: 'white',
            },
          });

          return { success: true, user: enhancedUser };
        }
      }

      // Try FakeStore API directly
      const response = await fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        const generatedToken = generateToken(1); // Default user ID
        
        // Get user details - using first user as default for demo
        const userResponse = await fetch('https://fakestoreapi.com/users/1');
        const userData = await userResponse.json();
        
        const enhancedUser = {
          ...userData,
          username: username,
          isDemo: false,
          loginMethod: 'api'
        };

        setToken(generatedToken);
        setUser(enhancedUser);
        
        localStorage.setItem('ecommerce-token', generatedToken);
        localStorage.setItem('ecommerce-user', JSON.stringify(enhancedUser));

        toast.success(`Welcome back, ${username}!`, {
          icon: '👋',
          style: {
            background: '#10b981',
            color: 'white',
          },
        });

        return { success: true, user: enhancedUser };
      } else {
        const errorData = await response.json();
        toast.error('Invalid credentials. Please try again.', {
          icon: '🔒',
          style: {
            background: '#ef4444',
            color: 'white',
          },
        });
        return { success: false, error: errorData.message || 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your connection.', {
        icon: '❌',
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
      return { success: false, error: 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    const username = user?.username;
    
    clearAuthStorage();
    
    toast.success(`Goodbye${username ? `, ${username}` : ''}! Come back soon!`, {
      icon: '👋',
      style: {
        background: '#6366f1',
        color: 'white',
      },
    });
  };

  const register = async (userData) => {
    try {
      setLoading(true);

      const response = await fetch('https://fakestoreapi.com/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      if (response.ok) {
        const data = await response.json();
        
        toast.success('Account created successfully! You can now login.', {
          icon: '🎉',
          style: {
            background: '#10b981',
            color: 'white',
          },
        });

        return { success: true, user: data };
      } else {
        const errorData = await response.json();
        toast.error('Registration failed. Please try again.', {
          icon: '❌',
          style: {
            background: '#ef4444',
            color: 'white',
          },
        });
        return { success: false, error: errorData.message || 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please check your connection.', {
        icon: '❌',
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
      return { success: false, error: 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');

      const response = await fetch(`https://fakestoreapi.com/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...user, ...updates }),
      });
      
      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem('ecommerce-user', JSON.stringify(updatedUser));
        
        toast.success('Profile updated successfully!', {
          icon: '✅',
          style: {
            background: '#10b981',
            color: 'white',
          },
        });
        
        return { success: true, user: updatedUser };
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile.', {
        icon: '❌',
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
      return { success: false, error: 'Failed to update profile' };
    }
  };

  const getDemoUsers = () => {
    return demoUsers;
  };

  const quickLogin = (demoUser) => {
    return login(demoUser.username, demoUser.password);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      register,
      updateUserProfile,
      getDemoUsers,
      quickLogin,
      loading,
      isAuthenticated: !!token && !!user,
      isDemoUser: user?.isDemo || false,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Toast component for notifications (you can replace with any toast library)
const Toast = () => null; // This would be replaced with actual toast component

export default Toast;