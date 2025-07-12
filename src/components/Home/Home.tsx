import React from 'react';
import Carousel from '../Carousel/Carousel';
import CategoryCard from '../CategoryCard/CategoryCard';
import ProductCard from '../ProductCard/ProductCard';
import { useHomepageContent } from '../../hooks/useApi';

const Home: React.FC = () => {
    const { data: homepageData, loading, error } = useHomepageContent();

    // Use API data directly - no fallbacks
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

    // Use latest products from API or new arrivals - no fallback
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
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading homepage content...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Content</h2>
                    <p className="text-gray-600 mb-4">There was an error loading the homepage content.</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

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
                    <div className="text-center py-8">
                        <p className="text-gray-500">Categories will be available soon.</p>
                    </div>
                )}
            </section>

            {/* Latest Products Section */}
            <section className="container mx-auto py-8 px-4">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">Latest Products</h2>
                    <p className="text-gray-600">Discover our newest jewelry collections</p>
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
                    <div className="text-center py-8">
                        <p className="text-gray-500">Latest products will be available soon.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;