// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('system'); // 'light', 'dark', or 'system'
  const [resolvedTheme, setResolvedTheme] = useState('light');
  const [isInitialized, setIsInitialized] = useState(false);

  // Get system theme
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  // Resolve theme based on preference and system
  const resolveTheme = (themePreference) => {
    if (themePreference === 'system') {
      return getSystemTheme();
    }
    return themePreference;
  };

  // Apply theme to document
  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    
    if (newTheme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    
    setResolvedTheme(newTheme);
  };

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('ecommerce-theme') || 'system';
    setTheme(savedTheme);
    
    const initialResolvedTheme = resolveTheme(savedTheme);
    applyTheme(initialResolvedTheme);
    
    setIsInitialized(true);
  }, []);

  // Listen for system theme changes
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleSystemThemeChange = (e) => {
      const newSystemTheme = e.matches ? 'dark' : 'light';
      applyTheme(newSystemTheme);
      
      toast(`System theme changed to ${newSystemTheme}`, {
        icon: '🌓',
        duration: 2000,
        style: {
          background: newSystemTheme === 'dark' ? '#1f2937' : '#f3f4f6',
          color: newSystemTheme === 'dark' ? 'white' : '#1f2937',
        },
      });
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);
    return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
  }, [theme]);

  // Update resolved theme when theme preference changes
  useEffect(() => {
    if (!isInitialized) return;

    const newResolvedTheme = resolveTheme(theme);
    applyTheme(newResolvedTheme);
    localStorage.setItem('ecommerce-theme', theme);

    // Show theme change notification
    if (theme === 'system') {
      toast(`Theme set to system (${getSystemTheme()})`, {
        icon: '⚙️',
        style: {
          background: resolvedTheme === 'dark' ? '#1f2937' : '#f3f4f6',
          color: resolvedTheme === 'dark' ? 'white' : '#1f2937',
        },
      });
    } else {
      toast(`Theme set to ${theme}`, {
        icon: theme === 'dark' ? '🌙' : '☀️',
        style: {
          background: theme === 'dark' ? '#1f2937' : '#f3f4f6',
          color: theme === 'dark' ? 'white' : '#1f2937',
        },
      });
    }
  }, [theme, isInitialized]);

  const toggleTheme = () => {
    // Cycle through themes: light -> dark -> system -> light
    setTheme(current => {
      if (current === 'light') return 'dark';
      if (current === 'dark') return 'system';
      return 'light';
    });
  };

  const setThemeDirectly = (newTheme) => {
    if (['light', 'dark', 'system'].includes(newTheme)) {
      setTheme(newTheme);
    }
  };

  // Get theme icon based on current theme
  const getThemeIcon = () => {
    if (theme === 'system') {
      return resolvedTheme === 'dark' ? '🌓' : '🌓';
    }
    return theme === 'dark' ? '🌙' : '☀️';
  };

  // Get theme label
  const getThemeLabel = () => {
    if (theme === 'system') {
      return `System (${resolvedTheme})`;
    }
    return theme.charAt(0).toUpperCase() + theme.slice(1);
  };

  // Check if dark mode is active
  const isDark = resolvedTheme === 'dark';

  return (
    <ThemeContext.Provider value={{
      theme,
      resolvedTheme,
      isDark,
      toggleTheme,
      setTheme: setThemeDirectly,
      getThemeIcon,
      getThemeLabel,
      themeOptions: [
        { value: 'light', label: 'Light', icon: '☀️' },
        { value: 'dark', label: 'Dark', icon: '🌙' },
        { value: 'system', label: `System (${getSystemTheme()})`, icon: '🌓' }
      ],
      // Additional utilities
      colors: {
        light: {
          bg: '#ffffff',
          surface: '#f9fafb',
          text: '#1f2937',
          border: 'rgba(0, 0, 0, 0.1)'
        },
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          text: '#f3f4f6',
          border: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for theme-aware styles
export const useThemeAwareStyles = (lightStyles, darkStyles) => {
  const { isDark } = useTheme();
  
  return isDark ? darkStyles : lightStyles;
};

// Theme toggle component for easy integration
export const ThemeToggle = ({ className = '' }) => {
  const { theme, toggleTheme, getThemeIcon, getThemeLabel } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-glow-purple transition-all duration-300 hover:scale-110 ${className}`}
      aria-label={`Switch theme. Current: ${getThemeLabel()}`}
      title={`Switch theme. Current: ${getThemeLabel()}`}
    >
      <div className="flex items-center justify-center w-6 h-6 text-lg">
        {getThemeIcon()}
      </div>
      
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
        {getThemeLabel()}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
      </div>

      {/* Ripple effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
    </button>
  );
};

// Advanced theme selector component
export const ThemeSelector = ({ className = '' }) => {
  const { theme, setTheme, themeOptions, resolvedTheme } = useTheme();

  return (
    <div className={`glass-effect rounded-2xl p-4 space-y-3 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
        Theme Preferences
      </h3>
      
      <div className="space-y-2">
        {themeOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => setTheme(option.value)}
            className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
              theme === option.value
                ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg'
                : 'text-gray-700 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
            }`}
          >
            <span className="text-lg">{option.icon}</span>
            <span className="flex-1 text-left text-sm font-medium">
              {option.value === 'system' 
                ? `System (${resolvedTheme})` 
                : option.label
              }
            </span>
            {theme === option.value && (
              <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            )}
          </button>
        ))}
      </div>

      {/* Current theme info */}
      <div className="pt-3 border-t border-white/20 dark:border-gray-700/50">
        <div className="text-xs text-gray-500 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Active theme:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {resolvedTheme.charAt(0).toUpperCase() + resolvedTheme.slice(1)}
            </span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Preference:</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {theme.charAt(0).toUpperCase() + theme.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeContext;