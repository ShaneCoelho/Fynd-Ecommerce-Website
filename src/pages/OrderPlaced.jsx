import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function OrderPlaced() {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to home after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-12 text-center">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Order Placed Successfully! 🎉
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed and will be delivered soon.
        </p>

        {/* Order Details Card */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-center gap-2 text-gray-700">
            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Your order is being processed</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/')}
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all font-medium shadow-md"
          >
            Continue Shopping
          </button>
          <p className="text-sm text-gray-500">
            Redirecting to home in 5 seconds...
          </p>
        </div>

        {/* Additional Info */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>Email Sent</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Track Order</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

