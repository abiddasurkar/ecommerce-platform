// src/services/api.js

const BASE_URL = "https://fakestoreapi.com";

const api = {
  // ------------------------------------
  // PRODUCTS API
  // ------------------------------------

  getProducts: async () => {
    const res = await fetch(`${BASE_URL}/products`);
    return res.json();
  },

  addProduct: async (product) => {
    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return res.json();
  },

  updateProduct: async (id, product) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return res.json();
  },

  deleteProduct: async (id) => {
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};

export default api;
