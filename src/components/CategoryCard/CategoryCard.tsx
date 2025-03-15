import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
    title: string;
    image: string;
    description: string;
    link: string;
}

export default function CategoryCard({ title, image, description, link }: CategoryCardProps) {
    return (
        <Link to={link} className="group">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                    <p className="text-gray-600 text-sm">{description}</p>
                </div>
            </div>
        </Link>
    );
} 