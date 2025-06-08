import React, { useState, useEffect } from 'react';
import ProductGalleryModal from './ProductGalleryModal';
import ProductGalleryThumbnails from './ProductGalleryThumbnails';
import { ProductGalleryProps } from '../../types/productGallery.types';

export default function ProductGallery({ 
  images = [], // Default to empty array if undefined
  title = "Product Gallery" 
}: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string>(images[0] || '');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  
  // State for main page image hover zoom (distinct from modal zoom)
  const [isMainPageZoomed, setIsMainPageZoomed] = useState<boolean>(false);
  const [mainPageZoomPosition, setMainPageZoomPosition] = useState({ x: 50, y: 50 });

  // Effect to update selectedImage if images prop changes and selectedImage is no longer valid
  useEffect(() => {
    if (images.length > 0 && !images.includes(selectedImage)) {
      setSelectedImage(images[0]);
    } else if (images.length === 0 && selectedImage !== '') {
      setSelectedImage(''); // Clear selected image if images array becomes empty
    }
  }, [images, selectedImage]);


  if (images.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-100 flex items-center justify-center rounded-lg">
        <div className="text-gray-400 text-center">
          <div className="w-16 h-16 mx-auto mb-2 bg-gray-300 rounded flex items-center justify-center">
            <span className="text-2xl">📷</span>
          </div>
          <p>No images available</p>
        </div>
      </div>
    );
  }

  const handleMainPageImageMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isMainPageZoomed) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMainPageZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };
  
  const openModal = () => {
    if (selectedImage) { // Only open modal if there's an image to show
        setIsModalOpen(true);
        setIsMainPageZoomed(false); // Turn off main page zoom when modal opens
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectThumbnail = (image: string) => {
    setSelectedImage(image);
    setIsMainPageZoomed(false); // Reset zoom when a new thumbnail is selected
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Image Display */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg mb-4">
        <div 
          className="relative w-full h-96 md:h-[500px] cursor-pointer group"
          onClick={openModal}
          onMouseMove={handleMainPageImageMouseMove}
          onMouseEnter={() => selectedImage && setIsMainPageZoomed(true)} // Only zoom if there's an image
          onMouseLeave={() => {
            setIsMainPageZoomed(false);
            setMainPageZoomPosition({ x: 50, y: 50 }); // Reset position
          }}
        >
          <img
            src={selectedImage}
            alt={title}
            className="w-full h-full object-contain transition-transform duration-200"
            style={{
              transform: isMainPageZoomed ? 'scale(1.5)' : 'scale(1)',
              transformOrigin: `${mainPageZoomPosition.x}% ${mainPageZoomPosition.y}%`
            }}
          />
           {!isMainPageZoomed && selectedImage && ( // Show overlay only if there's an image
             <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-4 py-2 bg-black bg-opacity-50 rounded-md">
                  Click to view gallery
                </span>
             </div>
           )}
        </div>
      </div>

      <ProductGalleryThumbnails
        images={images}
        selectedImage={selectedImage}
        onSelectImage={handleSelectThumbnail}
        title={title}
      />

      {selectedImage && <ProductGalleryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage} // Allows modal to change the selected image
        images={images}
        title={title}
      />}
    </div>
  );
}