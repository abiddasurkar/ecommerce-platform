// src/components/Hero.jsx
import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid-size opacity-20"></div>
      <div className="absolute w-72 h-72 bg-cyan-400/10 rounded-full -top-40 -left-40 animate-float-slow"></div>
      <div className="absolute w-96 h-96 bg-purple-400/10 rounded-full -bottom-40 -right-40 animate-float-slower"></div>
      <div className="absolute w-64 h-64 bg-cyan-400/5 rounded-full top-1/2 left-1/4 animate-float-random"></div>
      
      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">
              E-Commerce Platform
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8">
            Full-stack e-commerce solution with secure payments, inventory, and admin management
          </p>
          <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Built with modern technologies including React, Node.js, MongoDB, and Stripe integration
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#projects" 
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-glow-cyan transition-all duration-300"
            >
              View Project
            </a>
            <a 
              href="#contact" 
              className="px-8 py-4 border border-cyan-500 text-cyan-500 dark:text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;