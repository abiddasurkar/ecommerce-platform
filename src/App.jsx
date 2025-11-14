import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import UserAuth from './components/UserAuth';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('products');
  const [isCartOpen, setIsCartOpen] = useState(false);

  const renderView = () => {
    switch (currentView) {
      case 'products':
        return <ProductList />;
      case 'admin':
        return <AdminPanel />;
      case 'auth':
        return <UserAuth />;
      default:
        return <ProductList />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header 
            currentView={currentView}
            setCurrentView={setCurrentView}
            onCartClick={() => setIsCartOpen(true)}
          />
          <main className="container mx-auto px-4 py-8">
            {renderView()}
          </main>
          <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;