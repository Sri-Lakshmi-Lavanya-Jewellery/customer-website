import React, { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { Crown, Sparkles, Star, Gem } from 'lucide-react';

const carouselItems = [
    {
        image: "/assets/images/carousel/carousel-1.png"
    },
    {
        image: "/assets/images/carousel/carousel-2.png"
    }
];

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
        }, 6000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    };

    return (
        <div className="relative w-full h-[600px] overflow-hidden rounded-3xl container mx-auto px-4 shadow-2xl border-4 border-gold-200">
            {/* Carousel Items */}
            <div 
                className="flex transition-transform duration-700 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {carouselItems.map((item, index) => (
                    <div 
                        key={index} 
                        className="min-w-full h-full relative"
                    >
                        {/* Background Image */}
                        <div 
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
                            style={{ 
                                backgroundImage: `url(${item.image})`,
                            }}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation Buttons */}
            <button 
                onClick={prevSlide}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-gold-gradient hover:bg-gold-600 rounded-full p-4 transition-all duration-300 shadow-gold hover:scale-110 z-30 group"
            >
                <BsChevronLeft size={28} className="text-white group-hover:text-indian-maroon" />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gold-gradient hover:bg-gold-600 rounded-full p-4 transition-all duration-300 shadow-gold hover:scale-110 z-30 group"
            >
                <BsChevronRight size={28} className="text-white group-hover:text-indian-maroon" />
            </button>

            {/* Enhanced Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 z-30">
                {carouselItems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`relative transition-all duration-300 ${
                            currentSlide === index 
                                ? 'w-12 h-4 bg-gold-gradient rounded-full shadow-gold' 
                                : 'w-4 h-4 bg-white/40 rounded-full hover:bg-white/60 hover:scale-110'
                        }`}
                    >
                        {currentSlide === index && (
                            <div className="absolute inset-0 bg-gold-gradient rounded-full animate-pulse"></div>
                        )}
                    </button>
                ))}
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
                <div 
                    className="h-full bg-gold-gradient transition-all duration-300"
                    style={{ width: `${((currentSlide + 1) / carouselItems.length) * 100}%` }}
                ></div>
            </div>
        </div>
    );
}