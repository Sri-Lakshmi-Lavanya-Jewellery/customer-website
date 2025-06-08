import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    id: string;
    title: string;
    image?: string;
    isNew?: boolean;
    link: string;
}

export default function ProductCard({ id, title, image, isNew, link }: ProductCardProps) {
    return (
        <Link to={link} className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <div className="relative h-64 overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500">No Image Available</span>
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