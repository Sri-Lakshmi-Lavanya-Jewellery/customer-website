import React, { useState } from 'react';
import type { Product } from '../../services/api';
import { WHATSAPP_CONFIG, openWhatsApp } from '../../utils/whatsapp-new';
import ProductEnquiry from './ProductEnquiry';

interface ProductActionsProps {
  inStock: boolean;
  product: Product;
}

const ProductActions: React.FC<ProductActionsProps> = ({ inStock, product }) => {
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);

  const handleWhatsAppConnect = () => {
    const message = inStock 
      ? WHATSAPP_CONFIG.getProductInquiryMessage(product)
      : WHATSAPP_CONFIG.getOutOfStockMessage(product);
    
    openWhatsApp(WHATSAPP_CONFIG.businessNumber, message);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleWhatsAppConnect}
          className={`w-full sm:w-auto font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2 ${
            inStock 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {/* WhatsApp Icon */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
          </svg>
          {inStock ? 'Connect via WhatsApp' : 'Ask about Availability'}
        </button>

        <button
          onClick={() => setIsEnquiryModalOpen(true)}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Send Enquiry
        </button>

        <button className="w-full sm:w-auto border border-gray-300 hover:bg-gray-50 font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          Add to Wishlist
        </button>
      </div>

      {/* Product Enquiry Modal */}
      {isEnquiryModalOpen && (
        <ProductEnquiry
          product={product}
          isModal={true}
          onClose={() => setIsEnquiryModalOpen(false)}
        />
      )}
    </>
  );
};

export default ProductActions;
