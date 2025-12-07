import api from './api';

export const productService = {
  // Get products with filters (or all products by category for homepage)
  getProducts: async (params = {}) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  // Search autocomplete
  searchAutocomplete: async (prefix) => {
    const response = await api.get('/products/search/autocomplete', {
      params: { prefix },
    });
    return response.data;
  },
};

