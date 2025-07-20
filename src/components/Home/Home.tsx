import React from 'react';
import Carousel from '../Carousel/Carousel';
import CategoryCard from '../CategoryCard/CategoryCard';
import ProductCard from '../ProductCard/ProductCard';
import { useHomepageContent } from '../../hooks/useApi';
import { Sparkles, Crown, Star, Gem } from 'lucide-react';

const Home: React.FC = () => {
    const { data: homepageData, loading, error } = useHomepageContent();

    // Use API data directly
    const categories = homepageData?.popularCategories 
        ? homepageData.popularCategories.map(category => {
            // Create slug from category name if not provided
            const slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            return {
                title: category.title || category.name,
                image: category.image || '/assets/images/categories/silver-cover-1.png',
                description: category.description || 'View category products',
                link: `/category/${slug}`
            };
        })
        : [];

    const latestProducts = homepageData?.latestProducts || [];
    const newArrivals = homepageData?.newArrivals || [];

    // Use latest products from API or new arrivals
    const displayProducts = latestProducts.length > 0 
        ? latestProducts.map(product => ({
            id: product.id,
            title: product.title,
            image: product.images?.[0] || product.commonImages?.[0] || '/assets/images/products/default.jpg',
            isNew: product.isNewProduct || product.isNew || false,
            link: `/product/${product.id}`
        }))
        : newArrivals.length > 0 
        ? newArrivals.map(product => ({
            id: product.id,
            title: product.title,
            image: product.images?.[0] || product.commonImages?.[0] || '/assets/images/products/default.jpg',
            isNew: product.isNewProduct || product.isNew || false,
            link: `/product/${product.id}`
        }))
        : [];

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="loading-dots relative">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                        <Crown className="w-12 h-12 text-yellow-600 mx-auto mb-4 animate-pulse" />
                    </div>
                    <p className="text-gray-600 text-lg">Loading jewelry collection...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
                    <div className="text-red-600 mb-6">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Content</h2>
                    <p className="text-gray-500 mb-6 text-sm">There was an error loading the jewelry collection.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-yellow-600 hover:bg-yellow-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-300"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen relative overflow-x-hidden">
            
            {/* Hero Carousel Section (no overlays, just image banners with navigation) */}
            <section className="mb-16 relative">
                <Carousel />
            </section>

            {/* Welcome Banner */}
            <section className="container mx-auto px-4 mb-16 relative z-10">
                <div className="bg-gray-50 rounded-3xl p-6 md:p-16 text-center relative overflow-hidden border border-gray-200 shadow-lg">
                    <div className="relative z-10">
                        <div className="flex justify-center items-center gap-2 md:gap-4 mb-8">
                            <Crown className="w-8 md:w-12 h-8 md:h-12 text-yellow-600" />
                            <h1 className="text-3xl md:text-6xl font-bold text-yellow-600">
                                Sri Lakshmi Lavanya Jewellery
                            </h1>
                            <Crown className="w-8 md:w-12 h-8 md:h-12 text-yellow-600" />
                        </div>
                        <h2 className="text-2xl md:text-4xl font-semibold text-gray-800 mb-6">
                            Silver & Gold Collection
                        </h2>
                        <p className="text-base md:text-xl text-gray-700 max-w-4xl mx-auto mb-10 leading-relaxed px-4">
                            Discover our exquisite collection of authentic silver and gold jewelry, 
                            crafted with traditional Indian artistry and divine elegance.
                        </p>
                        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 md:gap-6">
                            <div className="bg-white px-4 md:px-8 py-3 md:py-4 rounded-full border border-yellow-300 shadow-lg">
                                <span className="text-yellow-600 font-semibold text-sm md:text-lg">🏆 Authentic Quality</span>
                            </div>
                            <div className="bg-white px-4 md:px-8 py-3 md:py-4 rounded-full border border-green-300 shadow-lg">
                                <span className="text-green-600 font-semibold text-sm md:text-lg">✨ Handcrafted Art</span>
                            </div>
                            <div className="bg-white px-4 md:px-8 py-3 md:py-4 rounded-full border border-red-300 shadow-lg">
                                <span className="text-red-600 font-semibold text-sm md:text-lg">🌟 Traditional Design</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Enhanced Categories Section */}
            <section className="container mx-auto py-16 px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
                        <Gem className="w-10 h-10 text-yellow-600" />
                        <div className="h-1 w-20 bg-yellow-400 rounded-full"></div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Shop by Category
                    </h2>
                    <p className="text-gray-700 text-xl max-w-3xl mx-auto">
                        Explore our wide range of precious jewelry collections
                    </p>
                </div>

                {categories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-lg">
                        <div className="mb-6">
                            <Crown className="w-20 h-20 text-yellow-600 mx-auto" />
                        </div>
                        <p className="text-gray-500 text-lg">Categories will be available soon</p>
                    </div>
                )}
            </section>

            {/* Enhanced Latest Products Section */}
            <section className="container mx-auto py-16 px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <div className="h-1 w-20 bg-blue-400 rounded-full"></div>
                        <Sparkles className="w-10 h-10 text-blue-600" />
                        <div className="h-1 w-20 bg-blue-400 rounded-full"></div>
                    </div>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Latest Products
                    </h2>
                    <p className="text-gray-700 text-xl max-w-3xl mx-auto">
                        Discover our newest jewelry collections
                    </p>
                </div>

                {displayProducts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {displayProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                title={product.title}
                                image={product.image}
                                isNew={product.isNew}
                                link={product.link}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-lg">
                        <div className="mb-6">
                            <Star className="w-20 h-20 text-blue-600 mx-auto" />
                        </div>
                        <p className="text-gray-500 text-lg">Latest products will be available soon</p>
                    </div>
                )}
            </section>

            {/* Features Section */}
            <section className="container mx-auto py-20 px-4 relative z-10">
                <div className="bg-gray-50 rounded-3xl p-12 md:p-20 border border-gray-200 shadow-lg relative overflow-hidden">
                    <div className="text-center mb-16 relative z-10">
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">
                            Our Features
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
                        <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500">
                            <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Crown className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Authentic Quality</h3>
                            <p className="text-gray-700 text-lg">Certified pure gold and silver jewelry</p>
                        </div>
                        <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500">
                            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Gem className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Handcrafted Artistry</h3>
                            <p className="text-gray-700 text-lg">Traditional craftsmanship with modern elegance</p>
                        </div>
                        <div className="text-center p-8 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-500">
                            <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Sparkles className="w-10 h-10 text-white" />
                            </div>
                            <h3 className="text-2xl font-semibold text-gray-800 mb-3">Beautiful Designs</h3>
                            <p className="text-gray-700 text-lg">Designs inspired by Indian traditions</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;