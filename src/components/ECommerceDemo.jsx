// components/ECommerceDemo.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { FiShoppingCart, FiPlus, FiMinus, FiTrash2, FiSearch, FiFilter } from 'react-icons/fi';

const ECommerceDemo = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const { cart, addToCart, removeFromCart, updateQuantity, getCartItemsCount, setIsCartOpen } = useCart();

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
        
        // Extract unique categories
        const uniqueCategories = [...new Set(data.map(product => product.category))];
        setCategories(['all', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Add new product
  const handleAddProduct = async () => {
    const newProduct = {
      title: "New Product",
      price: 29.99,
      description: "This is a new product added via API",
      category: "electronics",
      image: "https://via.placeholder.com/300"
    };

    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts(prev => [...prev, { ...newProduct, id: data.id }]);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  // Delete product
  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
      });
      setProducts(prev => prev.filter(product => product.id !== productId));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (loading) {
    return (
      <section id="ecommerce-demo" className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading products...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="ecommerce-demo" className="py-20 bg-surface-light dark:bg-surface-dark">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          Live <span className="bg-gradient-to-r from-cyan-500 to-purple-500 bg-clip-text text-transparent">E-Commerce Demo</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Interactive demonstration of the e-commerce platform with real API integration
        </p>

        {/* Demo Controls */}
        <div className="bg-white dark:bg-surface-dark rounded-lg p-6 mb-8 shadow-lg border border-border-light dark:border-border-dark">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
              {/* Search */}
              <div className="relative flex-1">
                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-border-light dark:border-border-dark rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <FiFilter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-border-light dark:border-border-dark rounded-lg bg-transparent focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-glow-cyan transition-all duration-300 flex items-center gap-2"
            >
              <FiShoppingCart />
              Cart ({getCartItemsCount()})
            </button>

            {/* Add Product Button */}
            <button
              onClick={handleAddProduct}
              className="px-6 py-2 border border-cyan-500 text-cyan-500 dark:text-cyan-400 rounded-lg font-semibold hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              Add Product
            </button>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-surface-light dark:bg-bg-dark rounded-lg p-4 shadow-lg border border-border-light dark:border-border-dark hover:shadow-xl transition-all duration-300">
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-cyan-500 text-white px-4 py-2 rounded-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-2xl font-bold text-cyan-500">${product.price}</span>
                  <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-cyan-500 text-white py-2 rounded-lg hover:bg-cyan-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">No products found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ECommerceDemo;