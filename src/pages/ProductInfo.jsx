import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productService } from '../services/product';

export default function ProductInfo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [buyLoading, setBuyLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getProductById(id);
      if (response.success) {
        setProduct(response.data);
      }
    } catch (error) {
      console.error('Failed to fetch product:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  const handleBuyNow = () => {
    setBuyLoading(true);
    // Simulate processing
    setTimeout(() => {
      navigate('/order-placed');
    }, 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  const images = product.images || [];
  const currentImage = images[selectedImage]?.image || 'https://via.placeholder.com/600x600?text=No+Image';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Shopping</span>
          </button>
        </div>
      </header>

      {/* Product Details */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Image Gallery */}
            <div>
              {/* Main Image */}
              <div className="mb-4 bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={currentImage}
                  alt={product.title}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Thumbnail Images */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-blue-600 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={image.image}
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-20 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              {/* Category Badge */}
              <div className="mb-3">
                <span className="inline-block px-4 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {product.category.name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Description */}
              <p className="text-gray-600 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Pricing */}
              <div className="mb-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    ₹{product.final_price.toFixed(2)}
                  </span>
                  {product.discount > 0 && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₹{product.price.toFixed(2)}
                      </span>
                      <span className="px-3 py-1 bg-red-500 text-white rounded-full text-sm font-bold">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
                {product.discount > 0 && (
                  <p className="text-green-600 font-semibold text-lg">
                    You save ₹{(product.price - product.final_price).toFixed(2)}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mb-6 space-y-2 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-gray-700">
                  <span>MRP (Price):</span>
                  <span className="font-semibold">₹{product.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Discount:</span>
                  <span className="font-semibold text-green-600">{product.discount}%</span>
                </div>
                <div className="h-px bg-gray-300 my-2"></div>
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Final Price:</span>
                  <span>₹{product.final_price.toFixed(2)}</span>
                </div>
              </div>

              {/* Buy Now Button */}
              <button
                onClick={handleBuyNow}
                disabled={buyLoading}
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transition-all font-bold text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {buyLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Buy Now'
                )}
              </button>

              {/* Additional Info */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Free Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>7 Days Return</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

