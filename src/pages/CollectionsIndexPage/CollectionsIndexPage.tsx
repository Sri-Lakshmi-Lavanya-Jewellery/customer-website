import React from 'react';
import { Link } from 'react-router-dom';
import { usePublicStats } from '../../hooks/useApi';

const CollectionsIndexPage: React.FC = () => {
  const { data: stats, loading: statsLoading } = usePublicStats();

  const collections = [
    {
      id: 'new-arrivals',
      title: 'New Arrivals',
      description: 'Discover our latest collection of traditional silver items',
      image: '/assets/images/collections/new-arrivals.jpg',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V9.5m0 0v3m0-3h9m-9 0H3" />
        </svg>
      ),
      bgColor: 'from-green-50 to-emerald-50',
      buttonColor: 'bg-green-600 hover:bg-green-700',
      count: stats?.newProducts || '15+'
    },
    {
      id: 'featured',
      title: 'Featured Products',
      description: 'Handpicked premium items from our collection',
      image: '/assets/images/collections/featured.jpg',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      bgColor: 'from-purple-50 to-indigo-50',
      buttonColor: 'bg-purple-600 hover:bg-purple-700',
      count: '20+'
    },
    {
      id: 'trending',
      title: 'Trending Products',
      description: 'Most popular items from our collection',
      image: '/assets/images/collections/trending.jpg',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      ),
      bgColor: 'from-orange-50 to-red-50',
      buttonColor: 'bg-orange-600 hover:bg-orange-700',
      count: '25+'
    },
    {
      id: 'in-stock',
      title: 'In Stock Items',
      description: 'Products ready for immediate delivery',
      image: '/assets/images/collections/in-stock.jpg',
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'from-blue-50 to-cyan-50',
      buttonColor: 'bg-blue-600 hover:bg-blue-700',
      count: stats?.inStock || '140+'
    }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Collections</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Explore our carefully curated collections of traditional silver items. Each collection is thoughtfully organized to help you discover the perfect pieces for your needs.
        </p>
      </div>

      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-800 font-medium">Collections</span>
          </li>
        </ol>
      </nav>

      {/* Statistics Section */}
      {stats && !statsLoading && (
        <div className="mb-12">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Collection at a Glance</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-3xl font-bold text-blue-600">{stats.totalProducts}</h3>
                <p className="text-gray-600 font-medium">Total Products</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-3xl font-bold text-green-600">{stats.categoriesCount}</h3>
                <p className="text-gray-600 font-medium">Categories</p>
              </div>
              {stats.inStock && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-3xl font-bold text-emerald-600">{stats.inStock}</h3>
                  <p className="text-gray-600 font-medium">In Stock</p>
                </div>
              )}
              {stats.newProducts && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-3xl font-bold text-purple-600">{stats.newProducts}</h3>
                  <p className="text-gray-600 font-medium">New Items</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className={`bg-gradient-to-br ${collection.bgColor} rounded-lg p-8 hover:shadow-lg transition-all duration-300 group`}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="text-gray-600 group-hover:text-gray-700 transition-colors">
                {collection.icon}
              </div>
              <div className="bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {collection.count} items
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 mb-3">
              {collection.title}
            </h3>
            
            <p className="text-gray-600 mb-6 line-clamp-2">
              {collection.description}
            </p>
            
            <div className="flex gap-3">
              <Link
                to={`/collections/${collection.id}`}
                className={`inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors ${collection.buttonColor}`}
              >
                Explore Collection
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              {collection.id === 'in-stock' ? (
                <Link
                  to="/products?inStock=true"
                  className="inline-flex items-center px-4 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors border"
                >
                  View All
                </Link>
              ) : collection.id === 'trending' ? (
                <Link
                  to="/products?sortBy=popularity&sortOrder=desc"
                  className="inline-flex items-center px-4 py-3 bg-white text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors border"
                >
                  View All
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Navigation */}
      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore More</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            to="/categories"
            className="flex items-center p-4 bg-white rounded-lg hover:bg-blue-50 transition-colors border hover:border-blue-200 group"
          >
            <div className="text-blue-600 mr-4 group-hover:text-blue-700">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-700">Browse Categories</h3>
              <p className="text-sm text-gray-600">Explore by product type</p>
            </div>
          </Link>

          <Link
            to="/products"
            className="flex items-center p-4 bg-white rounded-lg hover:bg-green-50 transition-colors border hover:border-green-200 group"
          >
            <div className="text-green-600 mr-4 group-hover:text-green-700">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-green-700">Search Products</h3>
              <p className="text-sm text-gray-600">Find specific items</p>
            </div>
          </Link>

          <Link
            to="/products?sortBy=createdAt&sortOrder=desc&limit=24"
            className="flex items-center p-4 bg-white rounded-lg hover:bg-purple-50 transition-colors border hover:border-purple-200 group"
          >
            <div className="text-purple-600 mr-4 group-hover:text-purple-700">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 group-hover:text-purple-700">Latest Updates</h3>
              <p className="text-sm text-gray-600">Recently added items</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CollectionsIndexPage;
