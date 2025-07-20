import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Crown, Gem } from 'lucide-react';

interface CategoryCardProps {
    title: string;
    image: string;
    description: string;
    link: string;
}

export default function CategoryCard({ title, image, description, link }: CategoryCardProps) {
    return (
        <Link to={link} className="group block">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-xl border border-gray-200 hover:border-gray-300">
                <div className="h-48 overflow-hidden relative">
                    <img 
                        src={image} 
                        alt={title} 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    />
                </div>
                
                <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
                        <ArrowRight className="w-5 h-5 text-blue-500 transform group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                    
                    <div className="h-px bg-gray-200 mb-4"></div>
                    
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">{description}</p>
                    
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-blue-600 font-semibold">View Category</span>
                        <div className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold group-hover:scale-105 transition-all duration-300">
                            Explore
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
} 