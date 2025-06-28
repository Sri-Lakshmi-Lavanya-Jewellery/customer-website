import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLatestProducts, usePagination } from '../../hooks/useApi';
import ProductCard from '../../components/ProductCard/ProductCard';

const LatestProductsPage: React.FC = () => {
  const { page, limit, nextPage, prevPage, goToPage, changeLimit } = usePagination(1, 12);
  const [days, setDays] = useState<number>(30); // Get products from last N days
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'updatedAt' | 'title'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [inStock, setInStock] = useState<boolean>(true);

  // API call with specific parameters for latest products
  const { data, loading, error } = useLatestProducts({
    page,
    limit,
    days,
    category: selectedCategory || undefined,
    sortBy,
    sortOrder,
    inStock
  });

  const products = data?.data?.products || [];
  const pagination = data?.pagination;
  const filters = data?.data?.filters;

  const handleFilterChange = () => {
    goToPage(1); // Reset to first page when filters change
  };

  const dayOptions = [
    { value: 7, label: 'Last 7 days' },
    { value: 15, label: 'Last 15 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 60, label: 'Last 2 months' },
    { value: 90, label: 'Last 3 months' }
  ];

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading latest products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-600">
          <p>Error loading latest products: {error}</p>
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
      {/* Page Header */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-8 mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-blue-600">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V9.5m0 0v3m0-3h9m-9 0H3" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Latest Products</h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Discover our newest additions - fresh arrivals from the last {days} days
          </p>
        </div>
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
            <span className="text-gray-800 font-medium">Latest Products</span>
          </li>
        </ol>
      </nav>

      {/* Advanced Filters */}
      <div className="mb-6 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Latest Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {/* Time Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Time Range</label>
            <select
              value={days}
              onChange={(e) => {
                setDays(Number(e.target.value));
                handleFilterChange();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {dayOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => {
                setSelectedCategory(e.target.value);
                handleFilterChange();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {filters?.categories?.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name || category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as 'createdAt' | 'updatedAt' | 'title');
                handleFilterChange();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="createdAt">Date Added</option>
              <option value="updatedAt">Last Updated</option>
              <option value="title">Product Name</option>
            </select>
          </div>

          {/* Sort Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
            <select
              value={sortOrder}
              onChange={(e) => {
                setSortOrder(e.target.value as 'asc' | 'desc');
                handleFilterChange();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="desc">Newest First</option>
              <option value="asc">Oldest First</option>
            </select>
          </div>

          {/* Availability */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              value={inStock.toString()}
              onChange={(e) => {
                setInStock(e.target.value === 'true');
                handleFilterChange();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="true">In Stock Only</option>
              <option value="false">All Products</option>
            </select>
          </div>
        </div>

        {/* Items per page */}
        <div className="mt-4 flex items-center gap-4">
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

      {/* Results Info */}
      {pagination && (
        <div className="mb-6 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Found {pagination.total} products from the last {days} days
            <br />
            Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </div>
          
          {/* Quick Time Range Buttons */}
          <div className="flex gap-2">
            {dayOptions.slice(0, 3).map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setDays(option.value);
                  handleFilterChange();
                }}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  days === option.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard
                  id={product.id}
                  title={product.title}
                  image={product.images?.[0] || '/assets/images/products/default.jpg'}
                  isNew={product.isNew}
                  link={`/product/${product.id}`}
                />
                {/* New Badge for recent items */}
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                    NEW
                  </div>
                )}
              </div>
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
                {/* Simplified pagination for better UX */}
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
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No new products found</h3>
          <p className="text-gray-500 mb-6">
            No products were added in the last {days} days with the current filters.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setDays(90);
                setSelectedCategory('');
                setInStock(true);
                goToPage(1);
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Expand Time Range
            </button>
            <Link
              to="/catalog"
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestProductsPage;
