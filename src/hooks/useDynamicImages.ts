import { useMemo } from 'react';
import type { Product } from '../data/productData';
import type { ProductImage } from './useProductGallery';

interface UseDynamicImagesProps {
  product: Product | null;
  selectedModel: string | null;
  selectedDimension: string | null;
}

export const useDynamicImages = ({ 
  product, 
  selectedModel, 
  selectedDimension 
}: UseDynamicImagesProps): ProductImage[] => {
  
  const images = useMemo(() => {
    // Return empty array if no product
    if (!product) {
      return [];
    }

    let imageUrls: string[] = [];
    
    // Try to get dimension-specific images first
    if (selectedModel && selectedDimension && product.models) {
      const modelData = product.models[selectedModel];
      if (modelData && modelData[selectedDimension] && modelData[selectedDimension].images) {
        imageUrls = modelData[selectedDimension].images;
      }
    }
    
    // Fall back to common images if no dimension-specific images
    if (imageUrls.length === 0) {
      if (product.commonImages && product.commonImages.length > 0) {
        imageUrls = product.commonImages;
      } else if (product.images && product.images.length > 0) {
        imageUrls = product.images;
      }
    }
    
    // Convert string URLs to ProductImage objects
    return imageUrls.map((url, index) => ({
      id: index + 1,
      url,
      altText: `${product.title}${selectedDimension ? ` - ${selectedDimension}` : ''} - Image ${index + 1}`
    }));
  }, [product, selectedModel, selectedDimension]);
  
  return images;
};
