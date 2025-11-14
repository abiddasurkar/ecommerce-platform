import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartId, setCartId] = useState(null);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    const savedCartId = localStorage.getItem('ecommerce-cart-id');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedCartId) {
      setCartId(savedCartId);
    }
  }, []);

  // Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem('ecommerce-cart', JSON.stringify(cart));
    if (cartId) {
      localStorage.setItem('ecommerce-cart-id', cartId);
    }
  }, [cart, cartId]);

  const addToCart = async (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });

    // Sync with API if we have a cart ID
    if (cartId) {
      try {
        await fetch(`https://fakestoreapi.com/carts/${cartId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: 1,
            date: new Date().toISOString(),
            products: cart.map(item => ({
              productId: item.id,
              quantity: item.quantity,
            })),
          }),
        });
      } catch (error) {
        console.error('Error syncing cart with API:', error);
      }
    }
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const createCart = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1,
          date: new Date().toISOString(),
          products: [],
        }),
      });
      const data = await response.json();
      setCartId(data.id);
      return data.id;
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      cartId,
      createCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};