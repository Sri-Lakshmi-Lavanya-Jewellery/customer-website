import React from 'react';
import Carousel from '../Carousel/Carousel';
import CategoryCard from '../CategoryCard/CategoryCard';
import ProductCard from '../ProductCard/ProductCard';

// Sample category data
const categories = [
    {
        title: "Gold Jewelry",
        image: "/assets/images/categories/gold-collection.jpg",
        description: "Timeless 22K & 24K gold jewelry crafted for elegance",
        link: "/products/gold"
    },
    {
        title: "Silver Jewelry",
        image: "/assets/images/categories/silver-collection.jpg",
        description: "Contemporary silver designs for everyday luxury",
        link: "/products/silver"
    },
    {
        title: "Diamond Jewelry",
        image: "/assets/images/categories/diamond-collection.jpg",
        description: "Certified diamonds in exquisite settings",
        link: "/products/diamond"
    },
    {
        title: "Bridal Collection",
        image: "/assets/images/categories/bridal-collection.jpg",
        description: "Complete wedding jewelry sets for the perfect bride",
        link: "/products/bridal"
    },
    {
        title: "Traditional Jewelry",
        image: "/assets/images/categories/traditional-collection.jpg",
        description: "Heritage pieces inspired by Indian craftsmanship",
        link: "/products/traditional"
    },
    {
        title: "Modern Collection",
        image: "/assets/images/categories/modern-collection.jpg",
        description: "Minimalist designs for the contemporary woman",
        link: "/products/modern"
    }
];

// Sample carousel images
const carouselImages = [
    {
        image: "/assets/images/carousel/carousel-1.png",
        title: "New Collection 2024",
        description: "Discover our latest jewelry collection"
    },
    {
        image: "/assets/images/carousel/carousel-2.png",
        title: "Wedding Season",
        description: "Special bridal jewelry collection"
    },
    {
        image: "/assets/images/carousel/carousel-3.png",
        title: "Festival Offers",
        description: "Exclusive deals on gold and diamond jewelry"
    }
];

// Sample latest products data
const latestProducts = [
    {
        id: "1",
        title: "22K Gold Antique Necklace",
        image: "/assets/images/products/gold-necklace-1.jpg",
        price: "₹85,000",
        oldPrice: "₹95,000",
        isNew: true,
        link: "/product/gold-necklace-1"
    },
    {
        id: "2",
        title: "Diamond Studded Bracelet",
        image: "/assets/images/products/diamond-bracelet-1.jpg",
        price: "₹1,25,000",
        isNew: true,
        link: "/product/diamond-bracelet-1"
    },
    {
        id: "3",
        title: "Traditional Silver Anklets",
        image: "/assets/images/products/silver-anklets-1.jpg",
        price: "₹12,500",
        oldPrice: "₹15,000",
        isNew: true,
        link: "/product/silver-anklets-1"
    },
    {
        id: "4",
        title: "Bridal Gold Bangles Set",
        image: "/assets/images/products/gold-bangles-1.jpg",
        price: "₹1,45,000",
        isNew: true,
        link: "/product/gold-bangles-1"
    }
];

export default function Home() {
    return (
        <div>
            {/* Hero Carousel Section */}
            <section className="mb-12">
                <Carousel />
            </section>

            {/* Categories Section */}
            <section className="container mx-auto py-8 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Shop by Category</h2>
                    <p className="text-gray-600">Explore our wide range of jewelry collections</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category, index) => (
                        <CategoryCard
                            key={index}
                            title={category.title}
                            image={category.image}
                            description={category.description}
                            link={category.link}
                        />
                    ))}
                </div>
            </section>

            {/* Latest Products Section */}
            <section className="container mx-auto py-12 px-4 bg-gray-50">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Products</h2>
                    <p className="text-gray-600">Discover our newest additions to the collection</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {latestProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            title={product.title}
                            image={product.image}
                            price={product.price}
                            oldPrice={product.oldPrice}
                            isNew={product.isNew}
                            link={product.link}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
} 