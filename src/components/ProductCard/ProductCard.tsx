import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: string;
    title: string;
    image?: string;
    isNew?: boolean;
    link: string;
}

export default function ProductCard({ id, title, image, isNew, link }: ProductCardProps) {
    const [imageError, setImageError] = useState(false);
    const [imageLoading, setImageLoading] = useState(true);

    const handleImageError = () => {
        setImageError(true);
        setImageLoading(false);
    };

    const handleImageLoad = () => {
        setImageLoading(false);
    };

    return (
        <Link to={link} className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                    {image && !imageError ? (
                        <>
                            {imageLoading && (
                                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                                    <div className="animate-pulse">
                                        <div className="w-16 h-16 bg-gray-300 rounded"></div>
                                    </div>
                                </div>
                            )}
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                style={{ display: imageLoading ? 'none' : 'block' }}
                            />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="text-gray-500 text-sm">No Image Available</span>
                            </div>
                        </div>
                    )}
                    {isNew && (
                        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                            New
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{title}</h3>
                    <div className="mt-2">
                        <span className="text-sm font-medium text-blue-600">Connect on Request</span>
                    </div>
                </div>
            </div>
        </Link>
    );
} 