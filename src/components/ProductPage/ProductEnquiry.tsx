import React from 'react';
import { useEnquiryForm } from '../../hooks/useEnquiryForm';
import type { Product } from '../../services/api';
import { getCategoryName, formatCategoryDisplay } from '../../utils/productUtils';

interface ProductEnquiryProps {
  product: Product;
  onClose?: () => void;
  isModal?: boolean;
}

const ProductEnquiry: React.FC<ProductEnquiryProps> = ({ product, onClose, isModal = false }) => {
  const categoryDisplay = formatCategoryDisplay(product);
  
  const {
    formData,
    isSubmitted,
    isSubmitting,
    error,
    handleChange,
    handleSubmit,
    resetForm
  } = useEnquiryForm({
    type: 'product',
    productId: product.id,
    subject: `Inquiry about ${product.title}`,
    message: `Hi,

I am interested in the ${product.title} from your ${categoryDisplay} collection.

Product Details:
- Name: ${product.title}
- Category: ${categoryDisplay}${product.weight ? `\n- Weight: ${product.weight}` : ''}
- Status: ${product.inStock ? 'In Stock' : 'Out of Stock'}

Could you please provide more information about:
- Pricing and availability
- Delivery options
- Any customization options

Thank you!`
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    await handleSubmit(e);
    // If it's a modal and submission was successful, close after a delay
    if (isModal && !error) {
      setTimeout(() => {
        onClose?.();
      }, 2000);
    }
  };

  const content = (
    <div className={`${isModal ? 'p-6' : 'container mx-auto px-4 py-12'}`}>
      <div className={`${isModal ? 'max-w-lg' : 'max-w-2xl mx-auto'}`}>
        {!isModal && (
          <>
            <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Product Enquiry</h1>
            <p className="text-gray-600 mb-8 text-center">
              Fill out the form below to inquire about this specific product.
            </p>
          </>
        )}

        {/* Product Info */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-4">
            {product.images && product.images.length > 0 && (
              <img 
                src={product.images[0]} 
                alt={product.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
            )}
            <div>
              <h3 className="font-semibold text-gray-900">{product.title}</h3>
              <p className="text-sm text-gray-600">Category: {categoryDisplay}</p>
              {product.weight && (
                <p className="text-sm text-gray-600">Weight: {product.weight}</p>
              )}
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>
        </div>

        {isSubmitted ? (
          <div className="text-center py-8">
            <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-8 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <svg className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Enquiry Submitted!</h3>
              <p>We'll get back to you within 24 hours about the {product.title}.</p>
              {isModal && (
                <p className="text-sm mt-2">This window will close automatically...</p>
              )}
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="customerName" className="block text-gray-700 font-medium mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="customerName"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    required
                    maxLength={100}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="customerEmail" className="block text-gray-700 font-medium mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="customerEmail"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-gray-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  value={formData.customerPhone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-gray-700 font-medium mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  maxLength={200}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-1">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  maxLength={2000}
                  rows={6}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex gap-3 pt-4">
                {isModal && onClose && (
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`${isModal ? 'flex-1' : 'w-full'} px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    'Submit Enquiry'
                  )}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">
                Product Enquiry
              </h3>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {content}
          </div>
        </div>
      </div>
    );
  }

  return content;
};

export default ProductEnquiry;
