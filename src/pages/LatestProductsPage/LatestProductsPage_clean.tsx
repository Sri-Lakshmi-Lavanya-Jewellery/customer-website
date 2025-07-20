import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLatestProducts, usePagination } from '../../hooks/useApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Crown } from 'lucide-react';

const LatestProductsPage: React.FC = () => {
  const { page, limit, nextPage, prevPage, goToPage, changeLimit } = usePagination(1, 12);
  const [days, setDays] = useState<number>(30); // Get products from last N days
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<'createdAt' | 'updatedAt' | 'title'>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [inStock, setInStock] = useState<boolean>(true);

  const { data: latestProducts, loading, error } = useLatestProducts({
    page,
    limit,
    days,
    category: selectedCategory,
    sortBy,
    sortOrder,
    inStock
  });

  const totalPages = latestProducts ? Math.ceil(latestProducts.pagination.total / limit) : 0;
  const products = latestProducts?.data?.products || [];

  const timeRangeOptions = [
    { value: 7, label: 'Last 7 days' },
    { value: 14, label: 'Last 2 weeks' },
    { value: 30, label: 'Last month' },
    { value: 90, label: 'Last 3 months' },
    { value: 180, label: 'Last 6 months' },
    { value: 365, label: 'Last year' }
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Date Added' },
    { value: 'updatedAt', label: 'Last Updated' },
    { value: 'title', label: 'Name' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <Crown className="w-16 h-16 text-yellow-500 animate-bounce mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading Latest Products</h2>
          <p className="text-gray-500">Please wait while we fetch the newest arrivals...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Unable to Load Products</h2>
          <p className="text-gray-500 mb-4">There was an error loading the latest products. Please try again.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-8 mb-8 shadow-sm border">
            <div className="flex items-center justify-center mb-4">
              <div className="text-blue-600">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V9.5m0 0v3m0-3h9m-9 0H3" />
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">Latest Products</h1>
            <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
              Discover our newest arrivals and stay updated with the latest additions to our jewelry collection.
            </p>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-lg p-6 mb-8 shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Time Range Filter */}
            <div>
              <label htmlFor="time-range" className="block text-sm font-medium text-gray-700 mb-2">
                Time Range
              </label>
              <select
                id="time-range"
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                {timeRangeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By Filter */}
            <div>
              <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'createdAt' | 'updatedAt' | 'title')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order Filter */}
            <div>
              <label htmlFor="sort-order" className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <select
                id="sort-order"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>

            {/* Stock Filter */}
            <div>
              <label htmlFor="stock-filter" className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                id="stock-filter"
                value={inStock ? 'in-stock' : 'all'}
                onChange={(e) => setInStock(e.target.value === 'in-stock')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value="in-stock">In Stock Only</option>
                <option value="all">All Products</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              <span className="font-semibold text-gray-800">{latestProducts?.pagination.total || 0}</span> products found
              {days && (
                <span className="text-gray-500">
                  {' '}from the last {days} {days === 1 ? 'day' : 'days'}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="items-per-page" className="text-sm text-gray-600">
                Items per page:
              </label>
              <select
                id="items-per-page"
                value={limit}
                onChange={(e) => changeLimit(Number(e.target.value))}
                className="px-3 py-1 border border-gray-300 rounded focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
                <option value={96}>96</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  image={product.images?.[0]}
                  isNew={true}
                  link={`/product/${product.id}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg p-12 text-center shadow-sm border">
            <div className="text-gray-400 mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">No Products Found</h3>
            <p className="text-gray-500 mb-6">
              No products were added in the selected time period. Try adjusting your filters or time range.
            </p>
            <div className="space-x-4">
              <button
                onClick={() => setDays(90)}
                className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
              >
                Show Last 3 Months
              </button>
              <Link
                to="/categories"
                className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors inline-block"
              >
                Browse All Categories
              </Link>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-lg p-6 mt-8 shadow-sm border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((page - 1) * limit) + 1} to {Math.min(page * limit, latestProducts?.pagination.total || 0)} of {latestProducts?.pagination.total || 0} products
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                
                <div className="flex items-center space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => goToPage(pageNum)}
                        className={`px-3 py-2 text-sm font-medium rounded-lg ${
                          page === pageNum
                            ? 'bg-yellow-500 text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                
                <button
                  onClick={nextPage}
                  disabled={page >= totalPages}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LatestProductsPage;
