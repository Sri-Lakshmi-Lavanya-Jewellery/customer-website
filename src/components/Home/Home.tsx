import React from 'react';
import Carousel from '../Carousel/Carousel';
import CategoryCard from '../CategoryCard/CategoryCard';
import ProductCard from '../ProductCard/ProductCard';
import { useHomepageContent } from '../../hooks/useApi';
import { categories as fallbackCategoryData } from '../../data/productData';

const Home: React.FC = () => {
    const { data: homepageData, loading, error } = useHomepageContent();

    // Convert fallback categoryData to the format expected by CategoryCard
    const fallbackCategories = fallbackCategoryData.map(category => ({
        title: category.title,
        image: category.image,
        description: category.description,
        link: `/products/${category.id}`
    }));

    // Use API data if available, otherwise fallback to local data
    const categories = homepageData?.popularCategories 
        ? homepageData.popularCategories.map(category => ({
            title: category.title || category.name,
            image: category.image || '/assets/images/categories/silver-cover-1.png',
            description: category.description || 'View category products',
            link: `/products/${category.id}`
        }))
        : fallbackCategories;

    const latestProducts = homepageData?.latestProducts || [];
    const newArrivals = homepageData?.newArrivals || [];

    // Use hero image from API if available
    const carouselImages = [
        {
            image: homepageData?.hero?.featuredImage || "/assets/images/carousel/carousel-1.png",
            title: homepageData?.hero?.title || "New Collection 2024",
            description: homepageData?.hero?.subtitle || "Discover our latest jewelry collection"
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

    // Sample latest products data as fallback
    const fallbackLatestProducts = [
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

    // Prioritize latest products from API, then new arrivals, then fallback
    const displayProducts = latestProducts.length > 0 
        ? latestProducts.map(product => ({
            id: product.id,
            title: product.title,
            image: product.images?.[0] || '/assets/images/products/default.jpg',
            isNew: product.isNewProduct || product.isNew || false,
            link: `/product/${product.id}`
        }))
        : newArrivals.length > 0 
        ? newArrivals.map(product => ({
            id: product.id,
            title: product.title,
            image: product.images?.[0] || '/assets/images/products/default.jpg',
            isNew: product.isNewProduct || product.isNew || false,
            link: `/product/${product.id}`
        }))
        : fallbackLatestProducts;

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
        console.warn('API Error, using fallback data:', error);
        // Continue with fallback data instead of showing error
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
            <section className="container mx-auto py-12 px-4 bg-gray-50">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">
                        {latestProducts.length > 0 ? 'Latest Products' : newArrivals.length > 0 ? 'New Arrivals' : 'Featured Products'}
                    </h2>
                    <p className="text-gray-600">
                        {latestProducts.length > 0 
                            ? 'Discover our latest additions to the collection'
                            : newArrivals.length > 0 
                            ? 'Discover our newest arrivals'
                            : 'Explore our featured products'
                        }
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {displayProducts.slice(0, 4).map((product) => (
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

                {/* View All Button */}
                <div className="text-center mt-8">
                    <a 
                        href="/catalog"
                        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                        View All Products
                    </a>
                </div>
            </section>
        </div>
    );
};

export default Home; 