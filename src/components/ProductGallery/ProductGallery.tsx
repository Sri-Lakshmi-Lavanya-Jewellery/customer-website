import React from 'react';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useProductGallery } from '../../hooks/useProductGallery';
import type { ProductImage } from '../../hooks/useProductGallery';

interface ProductGalleryProps {
  images?: ProductImage[];
  title?: string;
}

export default function ProductGallery({ 
  images, 
  title = "Product Gallery" 
}: ProductGalleryProps) {
  const {
    selectedImage,
    isModalOpen,
    isZoomed,
    zoomPosition,
    setSelectedImage,
    handleMouseMove,
    toggleZoom,
    openModal,
    closeModal,
    navigateImage,
    disableZoomAndResetPosition,
  } = useProductGallery({ images: images || [], title });

  const [isMouseEntered, setIsMouseEntered] = React.useState(false);

  // Check for no images
  if (!images || images.length === 0) {
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

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Main Image Display */}
      <div className="relative bg-white rounded-lg overflow-hidden shadow-lg mb-4">
        <div 
          className="relative w-full h-96 md:h-[500px] cursor-pointer group"
          onClick={openModal}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => {
            setIsMouseEntered(true);
            if (!isMouseEntered) toggleZoom();
          }}
          onMouseLeave={() => {
            setIsMouseEntered(false);
            disableZoomAndResetPosition();
          }}
        >
          <img
            src={selectedImage.url}
            alt={selectedImage.altText}
            className="w-full h-full object-contain transition-transform duration-200"
            style={{
              transform: isZoomed ? 'scale(2)' : 'scale(1)',
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            }}
          />
        </div>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className={`relative overflow-hidden rounded-md border-2 transition-all duration-200 hover:scale-105 ${
                selectedImage.id === img.id
                  ? 'border-gold-500 ring-2 ring-gold-200 shadow-md'
                  : 'border-gold-100 hover:border-gold-300'
              }`}
            >
              <img
                src={img.url}
                alt={img.altText}
                className="w-full h-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="relative max-w-7xl max-h-full w-full h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-semibold">{title}</h2>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Main Image Container */}
            <div className="flex-1 flex items-center justify-center relative">
              <div 
                className="relative max-w-full max-h-full cursor-pointer"
                onMouseMove={handleMouseMove}
                onClick={toggleZoom}
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.altText}
                  className="max-w-full max-h-[70vh] object-contain transition-transform duration-300"
                  style={{
                    transform: isZoomed ? 'scale(2)' : 'scale(1)',
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
                  }}
                />
                
                {/* Zoom indicator */}
                {!isZoomed && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                    <ZoomIn className="h-4 w-4" />
                    Click to zoom
                  </div>
                )}
                
                {isZoomed && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    Press ESC or click to exit zoom
                  </div>
                )}
              </div>

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('prev');
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigateImage('next');
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>

            {/* Modal Thumbnails */}
            {images.length > 1 && (
              <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
                {images.map((img) => (
                  <button
                    key={img.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImage(img);
                      if (isZoomed) toggleZoom();
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 hover:scale-110 ${
                      selectedImage.id === img.id
                        ? 'border-gold-400 ring-2 ring-gold-300 bg-transparent'
                        : 'border-gray-600 hover:border-gray-400 bg-transparent'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.altText}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Instructions */}
            <div className="mt-4 text-center text-gray-400 text-sm">
              Use arrow keys to navigate • Press Space to zoom • Press ESC to close
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
