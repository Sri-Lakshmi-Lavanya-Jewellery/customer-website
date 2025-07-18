import type { Product } from '../services/api';
import { formatCategoryDisplay } from './productUtils';

// WhatsApp Configuration
export const WHATSAPP_CONFIG = {
  // Replace this with your actual WhatsApp Business number
  // Format: Include country code without + or spaces (e.g., "919876543210" for India)
  businessNumber: "917288865969", // Update this with your WhatsApp Business number
  
  // Default message template for product inquiries
  getProductInquiryMessage: (product: Product) => {
    const categoryDisplay = formatCategoryDisplay(product);
    
    return `Hi! I'm interested in the ${product.title} from your ${categoryDisplay} collection.

Product Details:
- Name: ${product.title}
- Category: ${categoryDisplay}${product.weight ? `\n- Weight: ${product.weight}` : ''}
${product.inStock ? '- Status: In Stock' : '- Status: Out of Stock'}

Could you please provide more information about pricing, availability, and delivery options?

Thank you!`;
  },

  // Alternative message for general inquiries
  getGeneralInquiryMessage: () => {
    return `Hi! I'm interested in your silver jewelry collection. Could you please share your catalog and pricing details?

Thank you!`;
  },

  // Message for out of stock products
  getOutOfStockMessage: (product: Product) => {
    const categoryDisplay = formatCategoryDisplay(product);
    
    return `Hi! I noticed that the ${product.title} from your ${categoryDisplay} collection is currently out of stock.

Could you please let me know:
- When it will be back in stock?
- If there are similar alternatives available?

Thank you!`;
  }
};

// Utility function to open WhatsApp
export const openWhatsApp = (phoneNumber: string, message: string) => {
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
};

export default WHATSAPP_CONFIG;
