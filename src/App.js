// App.jsx
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import ECommerceDemo from './components/ECommerceDemo';
import Contact from './components/Contact';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import './index.css';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <div className="min-h-screen bg-bg-light dark:bg-bg-dark transition-colors duration-300">
          <Header />
          <Hero />
          <Projects />
          <ECommerceDemo />
          <Skills />
          <Contact />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;