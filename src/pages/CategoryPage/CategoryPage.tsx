import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { 
  getCategoryById, 
  getProductsByCategory, 
  Category,
  Product,
} from '../../data/productData';
import { useProductFilters } from '../../hooks/useProductFilters';
import { useCategoryPage, usePagination } from '../../hooks/useApi';

// Import new components
import CategoryHeader from '../../components/CategoryPage/CategoryHeader';
import SubcategoryFilterList from '../../components/CategoryPage/SubcategoryFilterList';
import AvailabilityFilter from '../../components/CategoryPage/AvailabilityFilter';
import SortByFilter from '../../components/CategoryPage/SortByFilter';
import ProductCountDisplay from '../../components/CategoryPage/ProductCountDisplay';
import NoProductsMessage from '../../components/CategoryPage/NoProductsMessage';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { page, limit, nextPage, prevPage, goToPage } = usePagination();
  
  // Try to fetch from API first, fallback to local data
  const { data: apiData, loading, error } = useCategoryPage(categoryId || '', { page, limit });
  
  // Fallback state for local data
  const [fallbackCategory, setFallbackCategory] = useState<Category | undefined>(undefined);
  const [fallbackProducts, setFallbackProducts] = useState<Product[]>([]);

  // Effect to fetch category details and initial products for that category (fallback)
  useEffect(() => {
    if (categoryId) {
      const categoryData = getCategoryById(categoryId);
      setFallbackCategory(categoryData);
      
      const productsData = getProductsByCategory(categoryId);
      setFallbackProducts(productsData);
    }
  }, [categoryId]);

  // Determine which data to use
  const category = apiData?.data.category || fallbackCategory;
  const products = apiData?.data.products || fallbackProducts;
  const breadcrumbs = apiData?.data.breadcrumbs || [
    { name: 'Home', url: '/' },
    { name: 'Categories', url: '/categories' },
    { name: category?.title || 'Category', url: `/products/${categoryId}` }
  ];

  // Instantiate the hook with API or fallback data
  const {
    filteredProducts,
    selectedSubcategory,
    filters,
    handleSubcategorySelect,
    handleFilterChange,
  } = useProductFilters({
    allProductsForCategory: products,
    initialCategoryId: categoryId
  });

  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading category...</p>
        </div>
      </div>
    );
  }

  // Error state (but continue with fallback data)
  if (error) {
    console.warn('API Error, using fallback data:', error);
  }

  if (!category) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <CategoryHeader title={category.title || 'Category'} description={category.description || ''} />

      <SubcategoryFilterList
        subcategories={category.subcategories || []}
        selectedSubcategory={selectedSubcategory}
        onSubcategorySelect={handleSubcategorySelect}
      />

      {/* Advanced Filters */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
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
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Type</h3>
            <div className="flex items-center space-x-2">
              <select
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
      </div>

      {/* Product Listing */}
      <ProductCountDisplay count={filteredProducts.length} />

      {filteredProducts.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                image={product.images?.[1]}
                isNew={product.isNew}
                link={`/product/${product.id}`}
              />
            ))}
          </div>

          {/* Pagination Controls (only for API data) */}
          {apiData?.pagination && (
            <div className="flex justify-center items-center space-x-4 mt-8">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                disabled={page === apiData.pagination.totalPages}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              
              <span className="text-sm text-gray-600">
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
  );
}
