import React from 'react';
import { ProductGalleryThumbnailsProps } from '../../types/productGallery.types';
import ThumbnailItem from './ThumbnailItem'; // Import the new component

export default function ProductGalleryThumbnails({
  images,
  selectedImage,
  onSelectImage,
  title,
}: ProductGalleryThumbnailsProps) {
  if (!images || images.length <= 1) {
    return null; 
  }

  return (
    <div className="grid grid-cols-4 gap-2">
      {images.map((img, index) => (
        <ThumbnailItem
          key={`page-thumb-${index}`}
          imageSrc={img}
          altText={`${title} - View ${index + 1}`}
          isSelected={selectedImage === img}
          onClick={() => onSelectImage(img)}
          // The original className for the image was "w-full h-20 object-cover"
          // The button itself had sizing implicitly from the grid.
          // ThumbnailItem has default w-20 h-20.
          // We'll rely on the grid to size the button, and the img inside ThumbnailItem is w-full h-full.
          // If specific sizing for the button itself is needed beyond grid, customClassName could be used.
          // For now, let's assume the grid handles button sizing, and internal img fills it.
          // The image class in the original was "w-full h-20 object-cover".
          // The ThumbnailItem's internal image is "w-full h-full object-cover".
          // So, if the button needs to be h-20, we pass that to customClassName.
          customClassName="w-full h-20" // This will size the button
        />
      ))}
    </div>
  );
}
