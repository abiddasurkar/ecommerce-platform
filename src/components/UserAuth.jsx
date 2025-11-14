import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User, Sparkles, Eye, EyeOff, Shield, Key, ArrowRight } from 'lucide-react';

const UserAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [shake, setShake] = useState(false);
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const result = await login(formData.username, formData.password);
        if (!result.success) {
          triggerShake();
          alert(result.error);
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          triggerShake();
          alert("Passwords don't match");
          return;
        }
        
        const result = await register({
          email: formData.email,
          username: formData.username,
          password: formData.password,
          name: {
            firstname: formData.username,
            lastname: 'User'
          },
          address: {
            city: 'kilcoole',
            street: '7835 new road',
            number: 3,
            zipcode: '12926-3874',
            geolocation: {
              lat: '-37.3159',
              long: '81.1496'
            }
          },
          phone: '1-570-236-7033'
        });
        
        if (result.success) {
          alert('Registration successful! Please login.');
          setIsLogin(true);
          resetForm();
        } else {
          triggerShake();
          alert(result.error);
        }
      }
    } catch (error) {
      triggerShake();
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const resetForm = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      <div className={`w-full max-w-md transform transition-all duration-500 ${shake ? 'animate-shake' : ''}`}>
        
        {/* Enhanced Card with Glass Morphism */}
        <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden border border-white/20 dark:border-gray-700/50">
          
          {/* Header Section with Gradient */}
          <div className="bg-gradient-to-r from-cyan-500 to-purple-500 p-8 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
            </div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                {isLogin ? (
                  <LogIn className="h-8 w-8 text-white" />
                ) : (
                  <UserPlus className="h-8 w-8 text-white" />
                )}
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">
                {isLogin ? 'Welcome Back' : 'Join Us Today'}
              </h2>
              <p className="text-cyan-100 text-lg">
                {isLogin ? 'Sign in to your account' : 'Create your new account'}
              </p>
            </div>

            {/* Decorative Elements */}
            <Sparkles className="absolute top-4 left-4 h-6 w-6 text-yellow-300 animate-pulse" />
            <Sparkles className="absolute bottom-4 right-4 h-6 w-6 text-yellow-300 animate-pulse" style={{animationDelay: '1s'}} />
          </div>

          {/* Form Section */}
          <div className="p-8 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Username Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <User className="inline h-4 w-4 mr-2 text-cyan-500" />
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your username"
                  />
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Email Field (Sign Up Only) */}
              {!isLogin && (
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Mail className="inline h-4 w-4 mr-2 text-purple-500" />
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="Enter your email"
                    />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-purple-500/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Password Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  <Key className="inline h-4 w-4 mr-2 text-blue-500" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-4 pr-12 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
                </div>
              </div>

              {/* Confirm Password Field (Sign Up Only) */}
              {!isLogin && (
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    <Shield className="inline h-4 w-4 mr-2 text-green-500" />
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-4 pr-12 bg-white/50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-green-500/30 rounded-xl transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full group relative bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-xl font-bold hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center space-x-2">
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>{isLogin ? 'Signing In...' : 'Creating Account...'}</span>
                    </>
                  ) : (
                    <>
                      {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
                      <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </button>
            </form>

            {/* Mode Toggle */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={toggleMode}
                className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all duration-300 font-semibold group"
              >
                <span className="flex items-center justify-center space-x-2">
                  {isLogin ? (
                    <>
                      <span>Don't have an account?</span>
                      <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                        Sign Up
                      </span>
                    </>
                  ) : (
                    <>
                      <span>Already have an account?</span>
                      <span className="bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                        Sign In
                      </span>
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Security Note */}
            <div className="text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center space-x-1">
                <Shield className="h-3 w-3" />
                <span>Your data is securely encrypted and protected</span>
              </p>
            </div>
          </div>
        </div>

        {/* Demo Credentials Hint */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm text-amber-700 dark:text-amber-300">
              Demo: Use any credentials to test
            </span>
          </div>
        </div>
      </div>

      {/* Add shake animation to tailwind config */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default UserAuth;