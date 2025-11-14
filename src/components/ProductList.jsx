import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Search, Filter, Plus, ShoppingCart, Sparkles, Star, Zap, Package } from 'lucide-react';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [sortBy, setSortBy] = useState('default');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(data.map(product => product.category))];
      setCategories(['all', ...uniqueCategories]);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        // Default sorting (by ID or keep original order)
        break;
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products, sortBy]);

  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
  };

  const getRandomReviewCount = () => {
    return Math.floor(Math.random() * 1000) + 50; // Random reviews between 50 and 1050
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading amazing products...</p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">Just a moment while we prepare your shopping experience</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Enhanced Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl shadow-glow-cyan">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
            Discover Products
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Explore our curated collection of amazing products at unbeatable prices
        </p>
      </div>

      {/* Enhanced Search and Filter Section */}
      <div className="glass-effect rounded-2xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none transition-all duration-300"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 appearance-none transition-all duration-300"
              >
                <option value="default">Sort By</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400 bg-cyan-50 dark:bg-cyan-900/20 px-4 py-2 rounded-xl">
            {filteredProducts.length} of {products.length} products
          </div>
        </div>
      </div>

      {/* Enhanced Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product, index) => {
          const rating = getRandomRating();
          const reviewCount = getRandomReviewCount();
          
          return (
            <div
              key={product.id}
              className="group relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden border border-white/20 dark:border-gray-700/50"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Product Image with Overlay */}
              <div className="relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Quick Actions Overlay */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-lg hover:scale-110 transition-transform duration-200">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                  </button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-1 bg-cyan-500 text-white text-xs font-medium rounded-full shadow-lg">
                    {product.category}
                  </span>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 flex items-center space-x-1 bg-black/70 rounded-full px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                  <span className="text-xs text-white font-medium">{rating}</span>
                  <span className="text-xs text-gray-300">({reviewCount})</span>
                </div>
              </div>
              
              {/* Product Content */}
              <div className="p-5 space-y-4">
                {/* Title and Price */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors duration-300 leading-tight">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
                      ${product.price}
                    </span>
                    <div className="flex items-center space-x-1 text-green-500">
                      <Zap className="h-4 w-4" />
                      <span className="text-xs font-medium">In Stock</span>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
                
                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-xl hover:shadow-glow-cyan transition-all duration-300 hover:scale-105 group/add"
                  >
                    <ShoppingCart size={18} className="group-hover/add:scale-110 transition-transform" />
                    <span className="font-semibold">Add to Cart</span>
                  </button>
                  
                  <button className="p-3 border border-cyan-500 text-cyan-500 dark:text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-white transition-all duration-300 hover:scale-105">
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-cyan-500/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
            </div>
          );
        })}
      </div>

      {/* Enhanced Empty State */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-16 glass-effect rounded-2xl">
          <div className="max-w-md mx-auto">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || selectedCategory !== 'all' 
                ? "We couldn't find any products matching your criteria. Try adjusting your search or filters."
                : "Our product catalog is currently empty. Check back soon for amazing deals!"
              }
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSortBy('default');
                }}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-xl hover:shadow-glow-cyan transition-all duration-300"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>
      )}

      {/* Loading More Indicator (for future pagination) */}
      {filteredProducts.length > 0 && (
        <div className="text-center py-8">
          <div className="inline-flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;