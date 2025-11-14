import React from "react";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { ThemeToggle } from "../context/ThemeContext";
import Header from "../components/Header";
import Cart from "../components/Cart";
import { ShoppingCart, Sparkles, Heart, ArrowUp, Zap, Star } from 'lucide-react';

const Layout = ({
  currentView,
  setCurrentView,
  isCartOpen,
  setIsCartOpen,
  children,
}) => {
  const { getCartItemsCount, isAnimating } = useCart();
  const { isDark, theme } = useTheme();
  const cartItemsCount = getCartItemsCount();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getBackgroundGradient = () => {
    if (theme === 'dark') {
      return 'from-gray-900 via-purple-900 to-indigo-900';
    }
    if (theme === 'light') {
      return 'from-slate-50 via-cyan-50 to-indigo-100';
    }
    // System theme - use resolved dark/light
    return isDark 
      ? 'from-gray-900 via-purple-900 to-indigo-900'
      : 'from-slate-50 via-cyan-50 to-indigo-100';
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${getBackgroundGradient()} transition-all duration-1000 relative overflow-hidden`}>
      
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Dynamic Floating Orbs */}
        <div className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full -top-48 -left-48 animate-float-slow blur-xl"></div>
        <div className="absolute w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-500/20 rounded-full -bottom-40 -right-40 animate-float-slower blur-xl"></div>
        <div className="absolute w-64 h-64 bg-gradient-to-r from-green-400/15 to-teal-500/15 rounded-full top-1/2 left-1/3 animate-float-random blur-xl"></div>
        <div className="absolute w-72 h-72 bg-gradient-to-r from-orange-400/10 to-amber-500/10 rounded-full top-1/4 right-1/4 animate-float-slow blur-xl" style={{animationDelay: '3s'}}></div>
        
        {/* Dynamic Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-[0.03] dark:opacity-[0.015] transition-opacity duration-1000"></div>
        
        {/* Enhanced Animated Particles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400/40 rounded-full animate-pulse-slow"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${4 + Math.random() * 6}s`,
                opacity: 0.3 + Math.random() * 0.7
              }}
            ></div>
          ))}
        </div>

        {/* Floating Stars */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-yellow-400/30 animate-pulse"
              style={{
                top: `${10 + Math.random() * 80}%`,
                left: `${10 + Math.random() * 80}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            >
              <Star size={Math.random() * 12 + 8} className="fill-current" />
            </div>
          ))}
        </div>

        {/* Ambient Glow Effects */}
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-cyan-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Enhanced Header with Dynamic Glass Morphism */}
        <div className="sticky top-0 z-50">
          <Header
            currentView={currentView}
            setCurrentView={setCurrentView}
            onCartClick={() => setIsCartOpen(true)}
          />
        </div>

        {/* Enhanced Artistic Main Content Area */}
        <main className="container mx-auto px-4 py-8">
          <div className="relative group">
            {/* Dynamic Background Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-all duration-1000"></div>
            
            {/* Enhanced Glass Morphism Card */}
            <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/30 dark:border-gray-700/30 shadow-2xl rounded-3xl p-8 transition-all duration-500 hover:shadow-3xl hover:scale-[1.002] overflow-hidden">
              
              {/* Animated Border Gradient */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-1000"></div>
              
              {/* Decorative Top Border */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-b-full shadow-lg"></div>
              
              {/* Enhanced Animated Corner Accents */}
              <div className="absolute top-4 left-4 w-3 h-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse shadow-glow-cyan"></div>
              <div className="absolute top-4 right-4 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full animate-pulse shadow-glow-purple" style={{animationDelay: '0.5s'}}></div>
              <div className="absolute bottom-4 left-4 w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse shadow-glow-blue" style={{animationDelay: '1s'}}></div>
              <div className="absolute bottom-4 right-4 w-3 h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse shadow-glow-pink" style={{animationDelay: '1.5s'}}></div>

              {/* Content Container */}
              <div className="relative">
                {children}
              </div>

              {/* Enhanced Decorative Bottom Elements */}
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 via-purple-500/20 to-transparent"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 dark:via-white/2 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </div>

            {/* Enhanced Floating Action Buttons */}
            <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-40">
              {/* Quick Cart Button */}
              <button
                onClick={() => setIsCartOpen(true)}
                className={`group relative p-4 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl hover:shadow-glow-cyan transition-all duration-300 hover:scale-110 ${
                  isAnimating ? 'animate-bounce' : ''
                }`}
              >
                <ShoppingCart className="w-6 h-6 text-white" />
                
                {/* Dynamic Cart Badge */}
                {cartItemsCount > 0 && (
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg animate-pulse">
                    {cartItemsCount > 99 ? '99+' : cartItemsCount}
                  </div>
                )}
                
                {/* Tooltip */}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  View Cart ({cartItemsCount} items)
                  <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                </div>
              </button>

              {/* Enhanced Theme Toggle */}
              <ThemeToggle className="shadow-2xl hover:shadow-glow-purple" />

              {/* Scroll to Top Button */}
              <button
                onClick={scrollToTop}
                className="group relative p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 rounded-2xl shadow-2xl hover:shadow-glow-cyan transition-all duration-300 hover:scale-110"
              >
                <ArrowUp className="w-6 h-6 text-gray-600 dark:text-gray-300 group-hover:text-cyan-500 transition-colors" />
                
                {/* Tooltip */}
                <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-3 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                  Scroll to Top
                  <div className="absolute top-1/2 left-full transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
                </div>
              </button>

              {/* Quick Actions Menu */}
              <div className="relative group/actions">
                <button className="p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl hover:shadow-glow-purple transition-all duration-300 hover:scale-110">
                  <Zap className="w-6 h-6 text-white" />
                </button>
                
                {/* Quick Actions Dropdown */}
                <div className="absolute bottom-full right-0 mb-4 p-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 dark:border-gray-700/50 opacity-0 invisible group-hover/actions:opacity-100 group-hover/actions:visible transition-all duration-300 transform translate-y-4 group-hover/actions:translate-y-0">
                  <div className="flex flex-col gap-2">
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Sparkles className="w-4 h-4 text-yellow-500" />
                      Quick Actions
                    </button>
                    <button className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/50 dark:hover:bg-gray-700/50 transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                      <Heart className="w-4 h-4 text-red-500" />
                      Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Enhanced Cart Drawer */}
        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* Enhanced Animated Footer */}
        <footer className="relative border-t border-white/20 dark:border-gray-700/50 mt-20 bg-gradient-to-t from-white/10 dark:from-gray-800/10 to-transparent">
          <div className="container mx-auto px-4 py-12">
            <div className="text-center space-y-4">
              {/* Animated Logo */}
              <div className="flex items-center justify-center space-x-3">
                <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl shadow-glow-cyan animate-float">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                  E-Commerce Platform
                </h3>
              </div>
              
              <div className="text-gray-600 dark:text-gray-400 space-y-2">
                <p className="flex items-center justify-center gap-2 text-lg">
                  <span>Built with</span>
                  <Heart className="w-5 h-5 text-red-500 animate-pulse fill-current" />
                  <span>using React & Tailwind CSS</span>
                </p>
                <p className="text-sm opacity-75">
                  Full-stack e-commerce solution with modern design and smooth animations
                </p>
              </div>

              {/* Tech Stack Badges */}
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                {['React', 'Tailwind CSS', 'Context API', 'FakeStore API'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-medium border border-cyan-500/20"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Background Pattern */}
          <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-[0.02] pointer-events-none"></div>
        </footer>
      </div>

      {/* Enhanced Ambient Light Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-purple-500/10 via-transparent to-transparent"></div>
      </div>

      {/* Dynamic Background Music Visualizer (Placeholder) */}
      <div className="fixed bottom-4 left-4 flex items-end gap-1 h-12 opacity-10 hover:opacity-30 transition-opacity duration-300">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-t-full animate-pulse"
            style={{
              height: `${20 + Math.random() * 30}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Layout;