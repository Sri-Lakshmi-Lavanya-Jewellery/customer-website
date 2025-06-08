import { useState, useEffect, useCallback } from 'react';

interface ProductImage {
  id: number;
  url: string;
  altText: string;
}

interface UseProductGalleryProps {
  images: ProductImage[];
  title?: string; // Made title optional
}

interface UseProductGalleryReturn {
  selectedImage: ProductImage; // Changed to ProductImage, assuming images[0] will be the default
  isModalOpen: boolean;
  isZoomed: boolean;
  zoomPosition: { x: number; y: number };
  setSelectedImage: React.Dispatch<React.SetStateAction<ProductImage>>; // Added setSelectedImage
  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void; // Changed event type
  toggleZoom: () => void;
  openModal: () => void; // Removed image argument
  closeModal: () => void;
  navigateImage: (direction: 'prev' | 'next') => void;
  disableZoomAndResetPosition: () => void; // New function
}

export const useProductGallery = ({ images, title }: UseProductGalleryProps): UseProductGalleryReturn => {
  const [selectedImage, setSelectedImage] = useState<ProductImage>(images[0]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const disableZoomAndResetPosition = useCallback(() => {
    setIsZoomed(false);
    setZoomPosition({ x: 50, y: 50 });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const toggleZoom = () => {
    // If turning zoom on, reset position.
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 });
      setIsZoomed(true);
    } else {
      // If turning zoom off, use disableZoomAndResetPosition to also reset position
      disableZoomAndResetPosition();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    disableZoomAndResetPosition(); // Ensure zoom is off and position is reset
  };

  const closeModal = () => {
    setIsModalOpen(false);
    disableZoomAndResetPosition(); // Ensure zoom is off and position is reset
  };

  const navigateImage = useCallback((direction: 'prev' | 'next') => {
    const currentIndex = images.findIndex(img => img.id === selectedImage.id);
    let newIndex;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedImage(images[newIndex]);
    disableZoomAndResetPosition(); // Ensure zoom is off and position is reset
  }, [images, selectedImage, setSelectedImage, disableZoomAndResetPosition]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          navigateImage('next');
          break;
        case 'ArrowLeft':
          e.preventDefault();
          navigateImage('prev');
          break;
        case 'Escape':
          e.preventDefault();
          closeModal();
          break;
        case ' ': // Space bar
          e.preventDefault();
          toggleZoom(); // toggleZoom now handles resetting position correctly for both states
          break;
      }
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen, navigateImage, closeModal, toggleZoom]);

  return {
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
    disableZoomAndResetPosition, // Export new function
  };
};
