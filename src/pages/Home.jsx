import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { categoryService } from '../services/category';
import { productService } from '../services/product';
import SearchBar from '../components/SearchBar';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';

export default function Home() {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState([]);
  const [pagination, setPagination] = useState(null);

  // Get current filters from URL
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const minPrice = searchParams.get('minPrice');
  const maxPrice = searchParams.get('maxPrice');
  const minDiscount = searchParams.get('minDiscount');
  const sortBy = searchParams.get('sortBy');
  const page = searchParams.get('page') || '1';

  // Determine if we're showing "All" (homepage mode)
  const isHomepageMode = !category && !search && !minPrice && !maxPrice && !minDiscount && !sortBy;

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryService.getCategories();
      if (response.success) {
        setCategories(response.categories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);

      // Check if homepage mode based on current params
      const isHomepage = !category && !search && !minPrice && !maxPrice && !minDiscount && !sortBy;
      
      let params = {};
      
      if (!isHomepage) {
        // Only add params when NOT in homepage mode
        if (category) params.category = category;
        if (search) params.search = search;
        if (minPrice) params.minPrice = minPrice;
        if (maxPrice) params.maxPrice = maxPrice;
        if (minDiscount) params.minDiscount = minDiscount;
        if (sortBy) params.sortBy = sortBy;
        params.page = page;
        params.limit = 20;
      }
      // For homepage mode, params remains empty {}

      const response = await productService.getProducts(params);

      if (response.success) {
        if (isHomepage) {
          // Homepage mode - products grouped by category
          setProductsByCategory(response.data);
          setProducts([]);
          setPagination(null);
        } else {
          // Filter mode - flat product list with pagination
          setProducts(response.data);
          setPagination(response.pagination);
          setProductsByCategory([]);
        }
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  }, [category, search, minPrice, maxPrice, minDiscount, sortBy, page]);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [fetchCategories, fetchProducts]);

  const handleApplyFilters = (filters) => {
    const params = new URLSearchParams();
    
    if (category) params.set('category', category);
    if (search) params.set('search', search);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    if (filters.minDiscount) params.set('minDiscount', filters.minDiscount);
    if (filters.sortBy) params.set('sortBy', filters.sortBy);

    const queryString = params.toString();
    window.location.href = queryString ? `/?${queryString}` : '/';
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    window.location.href = `/?${params.toString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Logo and Search */}
          <div className="flex items-center gap-6 mb-4">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">
              Fynd Store
            </h1>
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Navbar */}
      <Navbar categories={categories} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Filters - Only show when not in homepage mode */}
        {!isHomepageMode && (
          <Filters
            onApplyFilters={handleApplyFilters}
            initialFilters={{ minPrice, maxPrice, minDiscount, sortBy }}
          />
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
              <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
            </div>
          </div>
        ) : (
          <>
            {/* Homepage Mode - Products by Category */}
            {isHomepageMode && productsByCategory.length > 0 && (
              <div className="space-y-12">
                {productsByCategory.map((categoryGroup) => (
                  <div key={categoryGroup.category.id}>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      {categoryGroup.category.name}
                      <span className="text-sm font-normal text-gray-500">
                        ({categoryGroup.products.length} products)
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {categoryGroup.products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Filter Mode - Flat Product List */}
            {!isHomepageMode && (
              <>
                {products.length === 0 ? (
                  <div className="text-center py-20">
                    <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
                    <p className="text-gray-600">Try adjusting your filters or search terms</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <p className="text-gray-600">
                        Showing {products.length} {products.length === 1 ? 'product' : 'products'}
                        {pagination && ` (Page ${pagination.page} of ${pagination.totalPages})`}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                      ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                      <div className="mt-10 flex justify-center items-center gap-3">
                        <button
                          onClick={() => handlePageChange(pagination.page - 1)}
                          disabled={pagination.page === 1}
                          className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700 transition-all"
                        >
                          Previous
                        </button>

                        <span className="px-4 py-2 text-gray-700 font-medium">
                          Page {pagination.page} of {pagination.totalPages}
                        </span>

                        <button
                          onClick={() => handlePageChange(pagination.page + 1)}
                          disabled={pagination.page === pagination.totalPages}
                          className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-gray-700 transition-all"
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )}
              </>
            )}

            {/* Empty State for Homepage */}
            {isHomepageMode && productsByCategory.length === 0 && (
              <div className="text-center py-20">
                <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products available</h3>
                <p className="text-gray-600">Check back soon for new arrivals!</p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-8 text-center">
          <p className="text-gray-400">© 2025 Fynd E-Commerce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

