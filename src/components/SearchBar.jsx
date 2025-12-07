import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/product';

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef(null);

  // Debounce timer
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const response = await productService.searchAutocomplete(searchTerm);
        if (response.success) {
          setSuggestions(response.data);
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (title) => {
    setSearchTerm(title);
    navigate(`/?search=${encodeURIComponent(title)}`);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form onSubmit={handleSearch}>
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for products..."
            className="w-full px-6 py-4 pr-12 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Autocomplete Suggestions */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 max-h-80 overflow-y-auto z-50">
          {suggestions.map((title, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(title)}
              className="w-full text-left px-6 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span className="text-gray-700">{title}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

