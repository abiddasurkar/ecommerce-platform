// components/Header.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCart } from '../context/CartContext';
import { FiSun, FiMoon, FiGithub, FiLinkedin, FiMail, FiShoppingCart } from 'react-icons/fi';
import Cart from './Cart';

const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { getCartItemsCount, setIsCartOpen } = useCart();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md border-b border-border-light dark:border-border-dark">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
            E-Commerce Portfolio
          </div>
          
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <a href="#projects" className="hover:text-cyan-500 transition-colors">Projects</a>
              <a href="#ecommerce-demo" className="hover:text-cyan-500 transition-colors">Live Demo</a>
              <a href="#skills" className="hover:text-cyan-500 transition-colors">Skills</a>
              <a href="#contact" className="hover:text-cyan-500 transition-colors">Contact</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:text-cyan-500 transition-colors"
              >
                <FiShoppingCart size={20} />
                {getCartItemsCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartItemsCount()}
                  </span>
                )}
              </button>
              
              <a href="https://github.com" className="hover:text-cyan-500 transition-colors">
                <FiGithub size={20} />
              </a>
              <a href="https://linkedin.com" className="hover:text-cyan-500 transition-colors">
                <FiLinkedin size={20} />
              </a>
              <a href="mailto:your@email.com" className="hover:text-cyan-500 transition-colors">
                <FiMail size={20} />
              </a>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-surface-light dark:bg-surface-dark hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-colors"
              >
                {isDark ? <FiSun size={18} className="text-yellow-500" /> : <FiMoon size={18} className="text-cyan-500" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <Cart />
    </>
  );
};

export default Header;