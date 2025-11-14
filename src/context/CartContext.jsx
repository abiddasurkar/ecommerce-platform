import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';

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
  const [recentlyAdded, setRecentlyAdded] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ecommerce-cart');
    const savedCartId = localStorage.getItem('ecommerce-cart-id');
    
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setCart(parsedCart);
        
        // Show welcome back message if cart has items
        if (parsedCart.length > 0) {
          const totalItems = parsedCart.reduce((sum, item) => sum + item.quantity, 0);
          toast.success(`Welcome back! You have ${totalItems} items in your cart`, {
            icon: '🛒',
            style: {
              background: '#10b981',
              color: 'white',
            },
          });
        }
      } catch (error) {
        console.error('Error parsing saved cart:', error);
        localStorage.removeItem('ecommerce-cart');
      }
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

  const addToCart = async (product, quantity = 1) => {
    setRecentlyAdded(product);
    setIsAnimating(true);
    
    // Reset animation after delay
    setTimeout(() => {
      setIsAnimating(false);
      setRecentlyAdded(null);
    }, 2000);

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        toast.success(`Added ${quantity} more ${product.title} to cart!`, {
          icon: '➕',
          style: {
            background: '#10b981',
            color: 'white',
          },
        });
      } else {
        newCart = [...prevCart, { ...product, quantity }];
        
        toast.success(`Added ${product.title} to cart!`, {
          icon: '🎉',
          style: {
            background: '#10b981',
            color: 'white',
          },
        });
      }

      return newCart;
    });

    // Sync with API if we have a cart ID
    if (cartId) {
      try {
        await syncCartWithAPI();
      } catch (error) {
        console.error('Error syncing cart with API:', error);
        toast.error('Failed to sync cart with server', {
          icon: '❌',
          style: {
            background: '#ef4444',
            color: 'white',
          },
        });
      }
    }
  };

  const removeFromCart = (productId, productName = 'item') => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      
      toast.error(`Removed ${productName} from cart`, {
        icon: '🗑️',
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
      
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity, productName = 'item') => {
    if (quantity <= 0) {
      removeFromCart(productId, productName);
      return;
    }
    
    setCart(prevCart => {
      const newCart = prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
      
      if (quantity > 0) {
        toast.success(`Updated ${productName} quantity to ${quantity}`, {
          icon: '✏️',
          style: {
            background: '#3b82f6',
            color: 'white',
          },
        });
      }
      
      return newCart;
    });
  };

  const clearCart = () => {
    const itemCount = getCartItemsCount();
    setCart([]);
    
    toast.success(`Cleared ${itemCount} items from cart`, {
      icon: '🧹',
      style: {
        background: '#f59e0b',
        color: 'white',
      },
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartSummary = () => {
    const total = getCartTotal();
    const itemCount = getCartItemsCount();
    const shippingCost = total > 50 ? 0 : 4.99;
    const tax = total * 0.08; // 8% tax for demo
    const finalTotal = total + shippingCost + tax;

    return {
      subtotal: total,
      shipping: shippingCost,
      tax,
      total: finalTotal,
      itemCount,
      qualifiesForFreeShipping: total > 50,
      amountNeededForFreeShipping: total > 50 ? 0 : (50 - total).toFixed(2)
    };
  };

  const syncCartWithAPI = async () => {
    if (!cartId) return;

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
      throw new Error('Failed to sync cart with API');
    }
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
          products: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity,
          })),
        }),
      });
      
      if (!response.ok) throw new Error('Failed to create cart');
      
      const data = await response.json();
      setCartId(data.id);
      
      toast.success('Cart saved to server!', {
        icon: '💾',
        style: {
          background: '#10b981',
          color: 'white',
        },
      });
      
      return data.id;
    } catch (error) {
      console.error('Error creating cart:', error);
      toast.error('Failed to save cart to server', {
        icon: '❌',
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
      throw error;
    }
  };

  const applyDiscountCode = (code) => {
    // Demo discount codes
    const discounts = {
      'WELCOME10': 0.1,  // 10% off
      'SAVE20': 0.2,     // 20% off
      'FREESHIP': 'free_shipping', // Free shipping
    };

    const discount = discounts[code.toUpperCase()];
    
    if (discount) {
      if (typeof discount === 'number') {
        toast.success(`Applied ${discount * 100}% discount!`, {
          icon: '🎁',
          style: {
            background: '#8b5cf6',
            color: 'white',
          },
        });
      } else {
        toast.success('Free shipping applied!', {
          icon: '🚚',
          style: {
            background: '#8b5cf6',
            color: 'white',
          },
        });
      }
      return discount;
    } else {
      toast.error('Invalid discount code', {
        icon: '❌',
        style: {
          background: '#ef4444',
          color: 'white',
        },
      });
      return null;
    }
  };

  const moveToWishlist = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product) {
      removeFromCart(productId, product.title);
      // In a real app, you would add to wishlist here
      toast('Moved to wishlist!', {
        icon: '❤️',
        style: {
          background: '#ec4899',
          color: 'white',
        },
      });
    }
  };

  const getRecommendedProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=4');
      const products = await response.json();
      return products.filter(product => 
        !cart.some(item => item.id === product.id)
      );
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      return [];
    }
  };

  const isProductInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <CartContext.Provider value={{
      cart,
      cartId,
      recentlyAdded,
      isAnimating,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartItemsCount,
      getCartSummary,
      createCart,
      syncCartWithAPI,
      applyDiscountCode,
      moveToWishlist,
      getRecommendedProducts,
      isProductInCart,
      getProductQuantity,
      // Helper properties
      isEmpty: cart.length === 0,
      totalUniqueItems: cart.length,
      cartSummary: getCartSummary(),
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Toast component for notifications
const Toast = () => null;

export default Toast;