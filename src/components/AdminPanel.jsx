import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, Package, Search, Filter, Download, Upload } from 'lucide-react';

const AdminPanel = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    averagePrice: 0
  });

  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      // Calculate statistics
      const totalValue = products.reduce((sum, product) => sum + product.price, 0);
      setStats({
        totalProducts: products.length,
        totalValue: totalValue,
        averagePrice: totalValue / products.length
      });

      // Extract unique categories
      const uniqueCategories = [...new Set(products.map(product => product.category))];
      setCategories(['all', ...uniqueCategories]);
    }
  }, [products]);

  useEffect(() => {
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, selectedCategory, products]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...newProduct,
          price: parseFloat(newProduct.price),
        }),
      });
      
      if (response.ok) {
        const addedProduct = await response.json();
        setProducts(prev => [...prev, addedProduct]);
        setShowAddForm(false);
        setNewProduct({
          title: '',
          price: '',
          description: '',
          category: '',
          image: ''
        });
        // Show success notification
        showNotification('Product added successfully!', 'success');
      }
    } catch (error) {
      showNotification('Error adding product', 'error');
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${editingProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProduct),
      });
      
      if (response.ok) {
        const updatedProduct = await response.json();
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
        setEditingProduct(null);
        showNotification('Product updated successfully!', 'success');
      }
    } catch (error) {
      showNotification('Error updating product', 'error');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`https://fakestoreapi.com/products/${productId}`, {
          method: 'DELETE',
        });
        
        setProducts(prev => prev.filter(p => p.id !== productId));
        showNotification('Product deleted successfully!', 'success');
      } catch (error) {
        showNotification('Error deleting product', 'error');
      }
    }
  };

  const showNotification = (message, type = 'info') => {
    // In a real app, you might use a proper notification system
    alert(message);
  };

  const exportProducts = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'products-export.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-500 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl shadow-glow-cyan">
            <Package className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
          Manage your product inventory, track analytics, and oversee your e-commerce operations
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-cyan-600 dark:text-cyan-400 mb-2">
            {stats.totalProducts}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Total Products</div>
        </div>
        
        <div className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            ${stats.totalValue.toFixed(2)}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Inventory Value</div>
        </div>
        
        <div className="glass-effect rounded-2xl p-6 text-center group hover:scale-105 transition-all duration-300">
          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            ${stats.averagePrice.toFixed(2)}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Average Price</div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="glass-effect rounded-2xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          <div className="flex flex-col md:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
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
          </div>

          <div className="flex gap-3">
            <button
              onClick={exportProducts}
              className="flex items-center space-x-2 px-4 py-3 border border-cyan-500 text-cyan-500 dark:text-cyan-400 rounded-xl hover:bg-cyan-500 hover:text-white transition-all duration-300"
            >
              <Download size={18} />
              <span>Export</span>
            </button>
            
            <button
              onClick={() => setShowAddForm(true)}
              className="flex items-center space-x-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Showing {filteredProducts.length} of {products.length} products
        </div>
      </div>

      {/* Add Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Add New Product</h3>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Product Title"
                  value={newProduct.title}
                  onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                />
                <input
                  type="url"
                  placeholder="Image URL"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
                />
              </div>
              <div>
                <textarea
                  placeholder="Product Description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full h-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition-all duration-300"
                  rows="8"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-glow-cyan transition-all duration-300 flex items-center space-x-2"
              >
                <Plus size={18} />
                <span>Add Product</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="glass-effect rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product, index) => (
                <tr 
                  key={product.id} 
                  className="hover:bg-cyan-50 dark:hover:bg-cyan-900/20 transition-all duration-300 group"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-4">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-12 w-12 object-cover rounded-xl group-hover:scale-110 transition-transform duration-300"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {product.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-lg font-bold text-cyan-600 dark:text-cyan-400">
                      ${product.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => setEditingProduct(product)}
                      className="text-cyan-600 hover:text-cyan-800 dark:hover:text-cyan-400 p-2 rounded-lg hover:bg-cyan-100 dark:hover:bg-cyan-900 transition-all duration-300 group"
                      title="Edit Product"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-800 dark:hover:text-red-400 p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition-all duration-300 group"
                      title="Delete Product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">No products found</p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              {searchTerm || selectedCategory !== 'all' ? 'Try adjusting your search or filter' : 'Add your first product to get started'}
            </p>
          </div>
        )}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-effect rounded-2xl p-8 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Product</h3>
              <button 
                onClick={() => setEditingProduct(null)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={editingProduct.title}
                onChange={(e) => setEditingProduct({...editingProduct, title: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              <input
                type="number"
                placeholder="Price"
                value={editingProduct.price}
                onChange={(e) => setEditingProduct({...editingProduct, price: parseFloat(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              <input
                type="text"
                placeholder="Category"
                value={editingProduct.category}
                onChange={(e) => setEditingProduct({...editingProduct, category: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
              />
              <textarea
                placeholder="Description"
                value={editingProduct.description}
                onChange={(e) => setEditingProduct({...editingProduct, description: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none transition-all duration-300"
                rows="4"
              />
            </div>
            
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setEditingProduct(null)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:shadow-glow-cyan transition-all duration-300 flex items-center space-x-2"
              >
                <Save size={18} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;