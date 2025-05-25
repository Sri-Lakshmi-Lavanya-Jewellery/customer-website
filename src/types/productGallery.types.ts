// Props for the main ProductGallery component
export interface ProductGalleryProps {
  images?: string[]; // Array of image URLs
  title?: string;    // Optional title for alt text and modal header
}

// Props for the ProductGalleryModal component
export interface ProductGalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedImage: string;
  setSelectedImage: (image: string) => void;
  images: string[];
  title: string; // Title is not optional for the Modal
}

// Props for the ProductGalleryThumbnails component
export interface ProductGalleryThumbnailsProps {
  images: string[];
  selectedImage: string;
  onSelectImage: (image: string) => void;
  title: string; // Title is used for alt text on thumbnails
}
