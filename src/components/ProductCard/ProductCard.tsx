import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Sparkles, Crown, Gem } from 'lucide-react';

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
        <Link to={link} className="group block">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl border border-gray-200 hover:border-blue-400 relative">
                
                <div className="relative h-64 overflow-hidden">
                    {image && !imageError ? (
                        <>
                            {imageLoading && (
                                <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                                    <div className="animate-pulse flex flex-col items-center">
                                        <Crown className="w-8 h-8 text-yellow-500 mb-2" />
                                        <div className="w-16 h-2 bg-yellow-300 rounded-full"></div>
                                    </div>
                                </div>
                            )}
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                style={{ display: imageLoading ? 'none' : 'block' }}
                            />
                        </>
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <div className="text-center">
                                <Crown className="mx-auto h-12 w-12 text-yellow-500 mb-2" />
                                <span className="text-yellow-600 text-sm font-medium">Jewelry Item</span>
                            </div>
                        </div>
                    )}
                    
                    {/* New Badge */}
                    {isNew && (
                        <div className="absolute top-3 right-3 z-20">
                            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                New
                            </div>
                        </div>
                    )}
                    
                    {/* Premium indicator */}
                    <div className="absolute top-3 left-3 z-20">
                        <div className="bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            Premium
                        </div>
                    </div>
                </div>
                
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                        {title}
                    </h3>
                    
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-medium text-green-600">Price on Request</span>
                        <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium group-hover:bg-blue-600 transition-colors duration-300">
                            View Details
                        </div>
                    </div>
                    
                    {/* Quality indicators */}
                    <div className="flex items-center justify-center gap-4 pt-3 border-t border-gray-200">
                        <div className="flex items-center gap-1 text-xs text-yellow-600">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                            <span>Authentic</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-green-600">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Pure</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-purple-600">
                            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                            <span>Handmade</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
} 