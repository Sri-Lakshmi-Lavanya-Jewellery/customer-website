import React, { useState, useEffect } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

const carouselItems = [
    {
        image: "/assets/images/carousel/carousel-1.png",
    },
    {
        image: "/assets/images/carousel/carousel-2.png",
    }
];

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselItems.length) % carouselItems.length);
    };

    return (
        <div className="relative w-full h-[500px] overflow-hidden">
            {/* Carousel Items */}
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {carouselItems.map((item, index) => (
                    <div 
                        key={index} 
                        className="min-w-full h-full relative"
                    >
                        <div 
                            className="absolute inset-0 bg-cover bg-center"
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
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
            >
                <BsChevronLeft size={24} className="text-white" />
            </button>
            <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
            >
                <BsChevronRight size={24} className="text-white" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {carouselItems.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-colors ${
                            currentSlide === index ? 'bg-white' : 'bg-white/50'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}