import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ categories }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (slug) => {
    const params = new URLSearchParams(location.search);
    const currentCategory = params.get('category');
    
    if (slug === 'all') {
      return !currentCategory && location.pathname === '/';
    }
    return currentCategory === slug;
  };

  const handleCategoryClick = (slug) => {
    if (slug === 'all') {
      navigate('/');
    } else {
      navigate(`/?category=${slug}`);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {/* All Option */}
          <button
            onClick={() => handleCategoryClick('all')}
            className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
              isActive('all')
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All
          </button>

          {/* Category Options */}
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.slug)}
              className={`px-6 py-2 rounded-lg font-medium whitespace-nowrap transition-all ${
                isActive(category.slug)
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}

