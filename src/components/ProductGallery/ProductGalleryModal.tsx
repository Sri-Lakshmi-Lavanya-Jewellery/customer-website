import React, { useEffect, useState } from 'react'; // Added useState
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductGalleryModalProps } from '../../types/productGallery.types';
import ThumbnailItem from './ThumbnailItem'; // Import the new component

export default function ProductGalleryModal({
  isOpen,
  onClose,
  selectedImage,
  setSelectedImage,
  images,
  title,
}: ProductGalleryModalProps) {
  const [isZoomedInModal, setIsZoomedInModal] = useState<boolean>(false); // Changed to useState
  const [zoomPositionInModal, setZoomPositionInModal] = useState({ x: 50, y: 50 }); // Changed to useState

  const handleMouseMoveInModal = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomedInModal) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPositionInModal({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const toggleZoomInModal = () => {
    setIsZoomedInModal(!isZoomedInModal);
    if (!isZoomedInModal) {
      setZoomPositionInModal({ x: 50, y: 50 });
    }
  };

  const navigateImageInModal = (direction: 'prev' | 'next') => {
    const currentIndex = images.indexOf(selectedImage);
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedImage(images[newIndex]);
    setIsZoomedInModal(false); 
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          navigateImageInModal('next');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateImageInModal('prev');
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
        case ' ': 
          e.preventDefault();
          toggleZoomInModal();
          break;
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedImage, images, onClose, setSelectedImage]); 

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center p-4"
      onClick={onClose} 
    >
      <div
        className="relative max-w-7xl max-h-full w-full h-full flex flex-col"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-full"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center relative">
          <div
            className="relative max-w-full max-h-full cursor-pointer"
            onMouseMove={handleMouseMoveInModal}
            onClick={toggleZoomInModal}
          >
            <img
              src={selectedImage}
              alt={title}
              className="max-w-full max-h-[70vh] object-contain transition-transform duration-300"
              style={{
                transform: isZoomedInModal ? 'scale(2)' : 'scale(1)',
                transformOrigin: `${zoomPositionInModal.x}% ${zoomPositionInModal.y}%`,
              }}
            />
            {!isZoomedInModal && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                <ZoomIn className="h-4 w-4" /> Click to zoom
              </div>
            )}
            {isZoomedInModal && (
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                Press Space or click to exit zoom
              </div>
            )}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImageInModal('prev'); }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); navigateImageInModal('next'); }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-200 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="mt-4 flex justify-center gap-2 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <ThumbnailItem
                key={`modal-thumb-${index}`}
                imageSrc={img}
                altText={`${title} - Thumbnail ${index + 1}`}
                isSelected={selectedImage === img}
                onClick={(e) => { // Need to ensure onClick in ThumbnailItem doesn't need event
                  if (e && typeof e.stopPropagation === 'function') {
                    e.stopPropagation(); // If ThumbnailItem's onClick passes event
                  } else {
                    // If ThumbnailItem's onClick doesn't pass event, this direct call is fine
                    // but the problem is the outer div's onClick might trigger.
                    // The solution is that ThumbnailItem's own button has stopPropagation.
                    // For safety, we can add it here too if ThumbnailItem's onClick prop type allows it.
                    // Let's assume ThumbnailItem's onClick is a simple () => void for now.
                  }
                  setSelectedImage(img);
                  setIsZoomedInModal(false);
                }}
                customClassName="w-16 h-16 flex-shrink-0" // Modal thumbnails are smaller
                 // Added flex-shrink-0 to prevent issues in flex container
              />
            ))}
          </div>
        )}
        <div className="mt-4 text-center text-gray-400 text-sm">
          Use arrow keys to navigate • Press Space to zoom • Press ESC to close
        </div>
      </div>
    </div>
  );
}
