import React from 'react';

interface ThumbnailItemProps {
  imageSrc: string;
  altText: string;
  isSelected: boolean;
  onClick: () => void;
  customClassName?: string; // For size and other specific overrides
}

export default function ThumbnailItem({
  imageSrc,
  altText,
  isSelected,
  onClick,
  customClassName = 'w-20 h-20', // Default size, can be overridden
}: ThumbnailItemProps) {
  const baseClasses = "relative overflow-hidden rounded-md border-2 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const selectedClasses = "border-blue-500 ring-2 ring-blue-300 shadow-md";
  const unselectedClasses = "border-gray-200 hover:border-gray-400";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${isSelected ? selectedClasses : unselectedClasses} ${customClassName}`}
      aria-label={altText}
      aria-pressed={isSelected}
    >
      <img
        src={imageSrc}
        alt={altText}
        className="w-full h-full object-cover" // Ensure image fills the button
      />
    </button>
  );
}
