import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, Trash2, CreditCard, ShoppingBag, Sparkles, Truck, Shield, Gift } from 'lucide-react';

const Cart = ({ isOpen, onClose }) => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getCartTotal, 
    clearCart,
    createCart,
    getCartItemsCount
  } = useCart();

  const [isAnimating, setIsAnimating] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const cartId = await createCart();
      if (cartId) {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success animation
        setIsAnimating(true);
        setTimeout(() => {
          clearCart();
          onClose();
          setIsAnimating(false);
          setCheckoutLoading(false);
        }, 1000);
      }
    } catch (error) {
      alert('Checkout failed. Please try again.');
      setCheckoutLoading(false);
    }
  };

  const getShippingCost = () => {
    const total = getCartTotal();
    return total > 50 ? 0 : 4.99;
  };

  const getTotalWithShipping = () => {
    return getCartTotal() + getShippingCost();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Enhanced Backdrop with Blur */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Enhanced Cart Panel with Glass Morphism */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md transform transition-transform duration-500 ${
        isAnimating ? 'translate-x-0' : 'translate-x-0'
      }`}>
        <div className="flex flex-col h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-l border-white/20 dark:border-gray-700/50 shadow-2xl">
          
          {/* Enhanced Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-gray-700/50 bg-gradient-to-r from-cyan-500/10 to-purple-500/10">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg shadow-glow-cyan">
                <ShoppingBag className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  Shopping Cart
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {getCartItemsCount()} {getCartItemsCount() === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 dark:hover:bg-gray-700/50 rounded-xl transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <X size={20} className="text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Cart Items with Enhanced Design */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="relative mb-6">
                  <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
                  <Sparkles className="absolute top-0 right-1/4 text-yellow-500 animate-pulse" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Add some products to get started
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:shadow-glow-cyan transition-all duration-300"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div 
                  key={item.id} 
                  className="group bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm rounded-2xl p-4 border border-white/20 dark:border-gray-600/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-cyan-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                        {item.quantity}
                      </div>
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm text-gray-900 dark:text-white line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-cyan-600 dark:text-cyan-400 font-bold text-lg mt-1">
                        ${item.price}
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-600 rounded-xl p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded-lg hover:bg-white dark:hover:bg-gray-500 transition-all duration-200 hover:scale-110"
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} className={item.quantity <= 1 ? 'text-gray-400' : 'text-gray-600 dark:text-gray-400'} />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium min-w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-lg hover:bg-white dark:hover:bg-gray-500 transition-all duration-200 hover:scale-110"
                          >
                            <Plus size={16} className="text-gray-600 dark:text-gray-400" />
                          </button>
                        </div>
                        
                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-xl transition-all duration-300 hover:scale-110 group/remove"
                          title="Remove item"
                        >
                          <Trash2 size={16} className="group-hover/remove:scale-110 transition-transform" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Item Total */}
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Item Total:</span>
                    <span className="font-bold text-cyan-600 dark:text-cyan-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Enhanced Footer */}
          {cart.length > 0 && (
            <div className="border-t border-white/20 dark:border-gray-700/50 p-6 space-y-4 bg-gradient-to-t from-cyan-500/5 to-transparent">
              
              {/* Order Summary */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                    <Truck size={14} />
                    Shipping
                    {getShippingCost() === 0 && (
                      <span className="text-green-500 text-xs bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className={getShippingCost() === 0 ? 'text-green-500 font-medium' : 'font-medium'}>
                    {getShippingCost() === 0 ? 'FREE' : `$${getShippingCost()}`}
                  </span>
                </div>
                
                {getCartTotal() < 50 && (
                  <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded-lg">
                    Add ${(50 - getCartTotal()).toFixed(2)} more for free shipping!
                  </div>
                )}
                
                <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total</span>
                    <span className="text-2xl bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                      ${getTotalWithShipping().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex justify-center gap-4 py-2">
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Shield size={12} />
                  <span>Secure</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Truck size={12} />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <Gift size={12} />
                  <span>Easy Returns</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button 
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 text-white py-4 rounded-xl font-bold hover:shadow-glow-cyan transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
                >
                  {checkoutLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <>
                      <span className="relative z-10">Proceed to Checkout</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                    </>
                  )}
                </button>
                
                <button 
                  onClick={clearCart}
                  className="w-full border border-red-500 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300 hover:scale-105 group/clear"
                >
                  <span className="flex items-center justify-center space-x-2 group-hover/clear:space-x-3 transition-spacing">
                    <Trash2 size={16} />
                    <span>Clear Cart</span>
                  </span>
                </button>
              </div>
              
              {/* Security Message */}
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center flex items-center justify-center gap-2">
                <Shield size={12} />
                <span>Secure payment processing with Stripe integration</span>
              </p>
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-3 left-3 w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
          <div className="absolute top-3 right-3 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default Cart;