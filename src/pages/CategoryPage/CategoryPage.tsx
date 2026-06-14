import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Crown } from 'lucide-react';
import ProductCard from '../../components/ProductCard/ProductCard';
import { useProductFilters } from '../../hooks/useProductFilters';
import { useCategoryPageBySlug, usePagination, useSubcategoryPage } from '../../hooks/useApi';

// Import new components
import CategoryHeader from '../../components/CategoryPage/CategoryHeader';
import SubcategoryFilterList from '../../components/CategoryPage/SubcategoryFilterList';
import AvailabilityFilter from '../../components/CategoryPage/AvailabilityFilter';
import SortByFilter from '../../components/CategoryPage/SortByFilter';
import ProductCountDisplay from '../../components/CategoryPage/ProductCountDisplay';
import NoProductsMessage from '../../components/CategoryPage/NoProductsMessage';

export default function CategoryPage() {
  const { categoryId, slug, categorySlug, subcategorySlug } = useParams<{ 
    categoryId?: string; 
    slug?: string; 
    categorySlug?: string; 
    subcategorySlug?: string; 
  }>();
  const { page, limit, nextPage, prevPage, goToPage } = usePagination();
  
  // Determine the category identifier (either ID or slug)
  const categoryIdentifier = categoryId || slug || categorySlug || '';
  
  // Determine if this is a subcategory page
  const isSubcategoryPage = !!(categorySlug && subcategorySlug);
  
  // Fetch from API - no fallback
  const { data: apiData, loading, error } = isSubcategoryPage
    ? useSubcategoryPage(categorySlug!, subcategorySlug!, { page, limit })
    : useCategoryPageBySlug(categoryIdentifier, { page, limit });

  // Determine which data to use
  const category = apiData?.data.category;
  // Memoised so the array reference is stable across renders (otherwise the
  // downstream filter hook recomputes every render).
  const products = useMemo(() => apiData?.data.products || [], [apiData]);
  const subcategories = useMemo(() => apiData?.data.subcategories || [], [apiData]);
  
  // Generate breadcrumbs based on page type
  const generateBreadcrumbs = () => {
    if (isSubcategoryPage && categorySlug && subcategorySlug) {
      return [
        { name: 'Home', url: '/' },
        { name: 'Categories', url: '/categories' },
        { name: category?.title || categorySlug, url: `/category/${categorySlug}` },
        { name: subcategorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), url: `/category/${categorySlug}/subcategory/${subcategorySlug}` }
      ];
    } else {
      return [
        { name: 'Home', url: '/' },
        { name: 'Categories', url: '/categories' },
        { name: category?.title || 'Category', url: slug ? `/category/${slug}` : `/products/${categoryId}` }
      ];
    }
  };
  
  const breadcrumbs = apiData?.data.breadcrumbs || generateBreadcrumbs();

  // Instantiate the hook with API data
  const {
    filteredProducts,
    selectedSubcategory,
    filters,
    handleSubcategorySelect,
    handleFilterChange,
  } = useProductFilters({
    allProductsForCategory: products,
    initialCategoryId: categoryIdentifier
  });

  // Loading state
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
          <p className="text-gray-600 text-lg">Loading category...</p>
        </div>
      </div>
    );
  }

  // Error state - no fallback
  if (error) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Category</h2>
          <p className="text-gray-600 mb-4">There was an error loading the category.</p>
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

  if (!category) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h1>
          <p className="text-gray-600">The requested category could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8">
          <CategoryHeader title={category.title || category.name || 'Category'} description={category.description || ''} />

          <SubcategoryFilterList
            subcategories={subcategories}
            selectedSubcategory={selectedSubcategory}
            onSubcategorySelect={handleSubcategorySelect}
          />
        </div>

        {/* Advanced Filters */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter Products</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AvailabilityFilter
              inStock={filters.inStock}
              onFilterChange={handleFilterChange as (filterType: 'inStock', value: boolean) => void}
            />
            <SortByFilter
              sortBy={filters.sortBy}
              onFilterChange={handleFilterChange as (filterType: 'sortBy', value: string) => void}
            />

            {/* Product Type Filter - Placeholder for future implementation (was Weight Range before) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
              <select
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
                defaultValue="all"
              >
                <option value="all">All Types</option>
                <option value="gift">Gift Items</option>
                <option value="ceremonial">Ceremonial Items</option>
                <option value="traditional">Traditional Items</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Listing */}
        <ProductCountDisplay count={filteredProducts.length} />

        {/* Products Grid */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
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

              {/* Pagination Controls (only for API data) */}
              {apiData?.pagination && (
                <div className="flex justify-center items-center space-x-4 mt-8 pt-8 border-t border-gray-200">
                  <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  
                  <div className="flex space-x-2">
                    {Array.from({ length: Math.min(5, apiData.pagination.totalPages) }, (_, i) => {
                      const pageNum = i + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => goToPage(pageNum)}
                          className={`px-3 py-2 rounded-lg transition-colors ${
                            page === pageNum
                              ? 'bg-yellow-500 text-white shadow-md'
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
                    disabled={page === apiData.pagination.totalPages}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                  
                  <span className="text-sm text-gray-600 ml-4">
                    Page {page} of {apiData.pagination.totalPages} 
                    ({apiData.pagination.total} total products)
                  </span>
                </div>
              )}
            </>
          ) : (
            <NoProductsMessage />
          )}
        </div>
      </div>
    </div>
  );
}
