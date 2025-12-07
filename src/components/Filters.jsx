import { useState } from 'react';

export default function Filters({ onApplyFilters, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    minPrice: initialFilters.minPrice || '',
    maxPrice: initialFilters.maxPrice || '',
    minDiscount: initialFilters.minDiscount || '',
    sortBy: initialFilters.sortBy || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
  };

  const handleReset = () => {
    const resetFilters = {
      minPrice: '',
      maxPrice: '',
      minDiscount: '',
      sortBy: '',
    };
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Filters & Sort</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Min Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Price (₹)
          </label>
          <input
            type="number"
            name="minPrice"
            value={filters.minPrice}
            onChange={handleChange}
            placeholder="0"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Max Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price (₹)
          </label>
          <input
            type="number"
            name="maxPrice"
            value={filters.maxPrice}
            onChange={handleChange}
            placeholder="999999"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Min Discount */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Min Discount (%)
          </label>
          <input
            type="number"
            name="minDiscount"
            value={filters.minDiscount}
            onChange={handleChange}
            placeholder="0"
            min="0"
            max="100"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sort By
          </label>
          <select
            name="sortBy"
            value={filters.sortBy}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Latest</option>
            <option value="low_price">Price: Low to High</option>
            <option value="high_price">Price: High to Low</option>
            <option value="high_discount">Discount: High to Low</option>
            <option value="created_at">Latest Arrivals</option>
          </select>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mt-6">
        <button
          onClick={handleApply}
          className="flex-1 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md"
        >
          Apply Filters
        </button>
        <button
          onClick={handleReset}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

