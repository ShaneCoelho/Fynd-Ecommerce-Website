import api from './api';

export const categoryService = {
  // Get all active categories
  getCategories: async () => {
    const response = await api.get('/categories');
    return response.data;
  },
};

