import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, User, LogOut, Settings, Store, Menu, X, Sparkles, Crown } from 'lucide-react';

const Header = ({ currentView, setCurrentView, onCartClick }) => {
  const { getCartItemsCount } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    {
      id: 'products',
      label: 'Products',
      icon: Store,
      color: 'from-cyan-500 to-blue-500'
    },
    ...(isAuthenticated ? [{
      id: 'admin',
      label: 'Admin',
      icon: Crown,
      color: 'from-purple-500 to-pink-500'
    }] : [])
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl border-b border-white/20 dark:border-gray-700/50' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          
          {/* Logo Section */}
          <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => setCurrentView('products')}>
            <div className="relative">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl shadow-glow-cyan group-hover:scale-110 transition-transform duration-300">
                <Store className="h-6 w-6 text-white" />
              </div>
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-yellow-400 animate-pulse" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300">
                E-Commerce
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Premium Shopping
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`group relative flex items-center space-x-2 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg scale-105`
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  <Icon size={20} className={isActive ? 'text-white' : ''} />
                  <span className="font-medium">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-current rounded-full animate-pulse"></div>
                  )}
                  
                  {/* Hover effect */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  )}
                </button>
              );
            })}

            {/* Cart Button */}
            <button
              onClick={onCartClick}
              className="group relative flex items-center space-x-2 px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-all duration-300 hover:scale-105"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg animate-bounce">
                    {getCartItemsCount()}
                  </span>
                )}
              </div>
              <span className="font-medium">Cart</span>
              
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            {/* Auth Section */}
            <div className="flex items-center space-x-2 pl-2">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20">
                    <User size={16} className="text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {user?.username}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className="group flex items-center space-x-2 px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 hover:scale-105"
                  >
                    <LogOut size={16} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setCurrentView('auth')}
                  className="group flex items-center space-x-2 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
                >
                  <User size={18} />
                  <span className="font-medium">Login</span>
                </button>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Cart Button for Mobile */}
            <button
              onClick={onCartClick}
              className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ShoppingCart size={20} />
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {getCartItemsCount()}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 dark:border-gray-700/50 pt-4">
            <div className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentView(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
              
              {/* Auth Section for Mobile */}
              <div className="pt-2 border-t border-white/20 dark:border-gray-700/50">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-3 text-gray-600 dark:text-gray-300">
                      <User size={20} />
                      <span className="font-medium">{user?.username}</span>
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    >
                      <LogOut size={20} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentView('auth');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-glow-cyan transition-all duration-300"
                  >
                    <User size={20} />
                    <span className="font-medium">Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
      
      {/* Ambient Light Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
    </header>
  );
};

export default Header;