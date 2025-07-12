import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNewArrivals, useFeaturedProducts, usePagination } from '../../hooks/useApi';
import ProductCard from '../../components/ProductCard/ProductCard';

type CollectionType = 'new-arrivals' | 'featured';

const CollectionPage: React.FC = () => {
  const { collectionType } = useParams<{ collectionType: CollectionType }>();
  const { page, limit, nextPage, prevPage, goToPage, changeLimit } = usePagination(1, 12);
  const [sortBy, setSortBy] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Determine which hook to use based on collection type
  const isNewArrivals = collectionType === 'new-arrivals';
  const isFeatured = collectionType === 'featured';

  const newArrivalsData = useNewArrivals(
    isNewArrivals ? { page, limit, sortBy, sortOrder } : {}
  );
  
  const featuredData = useFeaturedProducts(
    isFeatured ? { page, limit, sortBy, sortOrder } : {}
  );

  // Use the appropriate data based on collection type
  const { data, loading, error } = isNewArrivals ? newArrivalsData : featuredData;

  // Collection metadata
  const collectionInfo = {
    'new-arrivals': {
      title: 'New Arrivals',
      description: 'Discover our latest collection of traditional silver items',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V9.5m0 0v3m0-3h9m-9 0H3" />
        </svg>
      ),
      bgColor: 'from-green-50 to-emerald-50',
      buttonColor: 'bg-green-600 hover:bg-green-700'
    },
    'featured': {
      title: 'Featured Products',
      description: 'Handpicked premium items from our collection',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976-2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      bgColor: 'from-purple-50 to-indigo-50',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  };

  const currentCollection = collectionInfo[collectionType || 'new-arrivals'];
  const products = data?.data?.products || [];
  const pagination = data?.pagination;

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    goToPage(1); // Reset to first page when sorting changes
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {currentCollection.title.toLowerCase()}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-600">
          <p>Error loading {currentCollection.title.toLowerCase()}: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Hero Section */}
      <div className={`bg-gradient-to-r ${currentCollection.bgColor} rounded-lg p-8 mb-8`}>
        <div className="flex items-center justify-center mb-4">
          <div className="text-gray-600">
            {currentCollection.icon}
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          {currentCollection.title}
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
          {data?.data?.description || currentCollection.description}
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
            <Link to="/collections" className="hover:text-blue-600 transition-colors">
              Collections
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-800 font-medium">{currentCollection.title}</span>
          </li>
        </ol>
      </nav>

      {/* Filters and Controls */}
      <div className="mb-6 bg-gray-50 p-6 rounded-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Sort Controls */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Sort by:</label>
            <select
              value={`${sortBy}_${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('_');
                handleSortChange(newSortBy, newSortOrder as 'asc' | 'desc');
              }}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="createdAt_desc">Newest First</option>
              <option value="createdAt_asc">Oldest First</option>
              <option value="title_asc">Name A-Z</option>
              <option value="title_desc">Name Z-A</option>
            </select>
          </div>

          {/* Items per page */}
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">Items per page:</label>
            <select
              value={limit}
              onChange={(e) => changeLimit(Number(e.target.value))}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Info */}
      {pagination && (
        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
          </div>
          
          {/* Quick Filter Buttons */}
          <div className="flex gap-2">
            <Link
              to="/collections/new-arrivals"
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                isNewArrivals 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              New Arrivals
            </Link>
            <Link
              to="/collections/featured"
              className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                isFeatured 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Featured
            </Link>
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.images?.[0] || product.commonImages?.[0] || '/assets/images/products/default.jpg'}
                isNew={product.isNewProduct || product.isNew}
                link={`/product/${product.id}`}
              />
            ))}
          </div>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center space-x-4">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              <div className="flex space-x-2">
                {/* Show first page */}
                {page > 3 && (
                  <>
                    <button
                      onClick={() => goToPage(1)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      1
                    </button>
                    {page > 4 && <span className="px-2">...</span>}
                  </>
                )}

                {/* Show pages around current page */}
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const startPage = Math.max(1, page - 2);
                  const pageNum = startPage + i;
                  if (pageNum > pagination.totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-1 rounded ${
                        page === pageNum
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Show last page */}
                {page < pagination.totalPages - 2 && (
                  <>
                    {page < pagination.totalPages - 3 && <span className="px-2">...</span>}
                    <button
                      onClick={() => goToPage(pagination.totalPages)}
                      className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                    >
                      {pagination.totalPages}
                    </button>
                  </>
                )}
              </div>

              <button
                onClick={nextPage}
                disabled={page === pagination.totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>

              <span className="text-sm text-gray-600 ml-4">
                Page {page} of {pagination.totalPages}
              </span>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">
            {currentCollection.icon}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-6">
            No products available in this collection at the moment
          </p>
          <Link
            to="/products"
            className={`inline-flex items-center px-6 py-3 text-white font-medium rounded-lg transition-colors ${currentCollection.buttonColor}`}
          >
            Browse All Products
          </Link>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
