import { useMemo } from 'react';
import type { Product } from '../services/api';
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
    
    // Add dimension-specific images if they exist
    if (selectedModel && selectedDimension && product.models) {
      const modelData = product.models[selectedModel];
      if (modelData && modelData[selectedDimension] && modelData[selectedDimension].images) {
        const dimensionImages = modelData[selectedDimension].images;
        // Only add dimension images that aren't already in the main images
        const newImages = dimensionImages.filter(img => !imageUrls.includes(img));
        imageUrls = [...imageUrls, ...newImages];
        console.log('🎯 Added dimension-specific images:', newImages, 'for dimension:', selectedDimension);
      }
    }

    if(imageUrls.length === 0){
       // Always start with top-level product images (these should be visible in all dimensions)
      if (product.images && product.images.length > 0) {
        imageUrls = [...product.images];
        console.log('🖼️ Starting with top-level product images:', imageUrls);
      } else if (product.commonImages && product.commonImages.length > 0) {
        imageUrls = [...product.commonImages];
        console.log('📦 Starting with common images:', imageUrls);
      }
    }
    
    // Convert string URLs to ProductImage objects
    const convertedImages = imageUrls.map((url, index) => ({
      id: index + 1,
      url,
      altText: `${product.title}${selectedDimension ? ` - ${selectedDimension}` : ''} - Image ${index + 1}`
    }));
    
    console.log('✨ Final converted images:', convertedImages);
    return convertedImages;
  }, [product, selectedModel, selectedDimension]);
  
  return images;
};
