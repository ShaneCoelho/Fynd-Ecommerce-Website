import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  
  const firstImage = product.images && product.images.length > 0 
    ? product.images[0].image 
    : 'https://via.placeholder.com/300x300?text=No+Image';

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-100">
        <img
          src={firstImage}
          alt={product.title}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
        />
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
          {product.title}
        </h3>

        {/* Pricing */}
        <div className="mb-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.final_price.toFixed(2)}
            </span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price.toFixed(2)}
              </span>
            )}
          </div>
          {product.discount > 0 && (
            <span className="text-sm text-green-600 font-medium">
              You save ₹{(product.price - product.final_price).toFixed(2)}
            </span>
          )}
        </div>

        {/* View Details Button */}
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md"
        >
          View Details
        </button>
      </div>
    </div>
  );
}

