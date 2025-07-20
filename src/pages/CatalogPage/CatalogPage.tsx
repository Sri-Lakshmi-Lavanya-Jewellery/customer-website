import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useProductCatalog, usePagination, useDebouncedSearch, useCategories, useSubcategoriesByCategory } from '../../hooks/useApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { Crown } from 'lucide-react';

const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page, limit, nextPage, prevPage, goToPage, changeLimit } = usePagination(1, 12);
  
  // Get initial values from URL parameters
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get('category') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>(searchParams.get('subcategory') || '');
  const [sortBy, setSortBy] = useState<string>(searchParams.get('sortBy') || 'createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>((searchParams.get('sortOrder') as 'asc' | 'desc') || 'desc');
  const [inStock, setInStock] = useState<boolean>(searchParams.get('inStock') !== 'false');

  // Search functionality
  const { query, setQuery, data: searchData, loading: searchLoading } = useDebouncedSearch();

  // Load categories with subcategories separately
  const { data: categoriesData, loading: categoriesLoading } = useCategories();
  
  // Load subcategories for selected category using the hook
  const { data: subcategoriesResponse, loading: subcategoriesLoading, error: subcategoriesError } = useSubcategoriesByCategory(selectedCategory || '');
  
  // Extract subcategories from the API response - the response has a data.subcategories structure
  const subcategories = subcategoriesResponse?.subcategories || [];

  // Main catalog data
  const { data: catalogData, loading: catalogLoading, error } = useProductCatalog({
    page,
    limit,
    category: selectedCategory || undefined,
    subcategory: selectedSubcategory || undefined,
    search: query || undefined,
    sortBy,
    sortOrder,
    inStock
  });

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (selectedSubcategory) params.set('subcategory', selectedSubcategory);
    if (sortBy !== 'createdAt') params.set('sortBy', sortBy);
    if (sortOrder !== 'desc') params.set('sortOrder', sortOrder);
    if (!inStock) params.set('inStock', 'false');
    
    setSearchParams(params);
  }, [selectedCategory, selectedSubcategory, sortBy, sortOrder, inStock, setSearchParams]);

  const loading = query ? searchLoading : catalogLoading;
  const data = query ? searchData : catalogData;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedSubcategory(''); // Reset subcategory when category changes
    goToPage(1); // Reset to first page when filter changes
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    goToPage(1);
  };

  const handleSortChange = (newSortBy: string, newSortOrder: 'asc' | 'desc') => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
    goToPage(1);
  };

  if (loading && !data) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Crown className="w-12 h-12 text-yellow-500 mb-4 animate-pulse" />
            <div className="flex space-x-1 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center text-red-600">
          <p>Error loading products: {error}</p>
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

  const products = data?.data?.products || [];
  const pagination = data?.pagination;
  const filters = catalogData?.data?.filters;
  
  // Use categories from useCategories hook if available, otherwise fall back to filters
  const categories = categoriesData || filters?.categories || [];

  // Get display names for selected filters
  const selectedCategoryName = categories?.find(cat => cat.slug === selectedCategory)?.name || 
                               categories?.find(cat => cat.id === selectedCategory)?.name || 
                               selectedCategory;
  const selectedSubcategoryName = selectedCategory && selectedSubcategory && Array.isArray(subcategories) ? 
    subcategories.find(sub => sub.slug === selectedSubcategory)?.name ||
    subcategories.find(sub => sub.id === selectedSubcategory)?.name ||
    selectedSubcategory : '';

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          {selectedCategory && selectedSubcategory ? 
            `${selectedCategoryName} - ${selectedSubcategoryName}` :
            selectedCategory ? 
              selectedCategoryName :
              'Product Catalog'
          }
        </h1>
        <p className="text-gray-600">
          {query ? `Search results for "${query}"` : 
           selectedCategory ? 
             `Browse products in ${selectedCategoryName}${selectedSubcategoryName ? ` - ${selectedSubcategoryName}` : ''}` :
             'Browse our complete product collection'
          }
        </p>
      </div>

      {/* Breadcrumbs */}
      {(selectedCategory || selectedSubcategory) && (
        <nav className="mb-6 text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link to="/" className="hover:text-blue-600">Home</Link>
            </li>
            <li className="flex items-center">
              <span className="mx-2">/</span>
              <Link to="/products" className="hover:text-blue-600">Catalog</Link>
            </li>
            {selectedCategory && (
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <Link to={`/products?category=${selectedCategory}`} className="hover:text-blue-600">
                  {selectedCategoryName}
                </Link>
              </li>
            )}
            {selectedSubcategory && (
              <li className="flex items-center">
                <span className="mx-2">/</span>
                <span className="text-gray-800">{selectedSubcategoryName}</span>
              </li>
            )}
          </ol>
        </nav>
      )}

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Filters */}
      <div className="mb-6 bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category.id} value={category.slug}>
                  {category.name || category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Subcategory Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Subcategory</label>
            <select
              value={selectedSubcategory}
              onChange={(e) => handleSubcategoryChange(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              disabled={!selectedCategory || subcategoriesLoading}
            >
              <option value="">
                {!selectedCategory ? 'Select a category first' : 
                 subcategoriesLoading ? 'Loading subcategories...' : 
                 'All Subcategories'}
              </option>
              {selectedCategory && Array.isArray(subcategories) && subcategories.length > 0 && subcategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.slug || subcategory.id}>
                  {subcategory.name || subcategory.title}
                </option>
              ))}
            </select>
            {subcategoriesError && (
              <p className="mt-1 text-sm text-red-600">{subcategoriesError}</p>
            )}
          </div>

          {/* Sort Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={`${sortBy}_${sortOrder}`}
              onChange={(e) => {
                const [newSortBy, newSortOrder] = e.target.value.split('_');
                handleSortChange(newSortBy, newSortOrder as 'asc' | 'desc');
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {filters?.sortOptions?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              )) || (
                <>
                  <option value="createdAt_desc">Newest First</option>
                  <option value="title_asc">Name A-Z</option>
                  <option value="title_desc">Name Z-A</option>
                </>
              )}
            </select>
          </div>

          {/* Availability Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
            <select
              value={inStock.toString()}
              onChange={(e) => setInStock(e.target.value === 'true')}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="true">In Stock Only</option>
              <option value="false">All Products</option>
            </select>
          </div>

          {/* Items per page */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Items per page</label>
            <select
              value={limit}
              onChange={(e) => changeLimit(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        <div className="mb-4 text-sm text-gray-600">
          Showing {((pagination.page - 1) * pagination.limit) + 1} - {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} products
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
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500 mb-4">
            {query 
              ? `No products match your search for "${query}"`
              : 'No products available with the current filters'
            }
          </p>
          <button
            onClick={() => {
              setQuery('');
              setSelectedCategory('');
              setInStock(true);
              goToPage(1);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Loading overlay for search */}
      {loading && data && (
        <div className="fixed top-4 right-4 bg-blue-100 border border-blue-400 text-blue-700 px-4 py-2 rounded">
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
            {query ? 'Searching...' : 'Loading...'}
          </div>
        </div>
      )}
    </div>
  );
};

export default CatalogPage;
