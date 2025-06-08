import React, { useState, useEffect } from 'react'; // Keep useState for category, useEffect for data fetching
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { 
  getCategoryById, 
  getProductsByCategory, 
  // getProductsBySubcategory, // This is now handled within the hook based on allProductsForCategory
  Category,
  Product,
  Subcategory, // Keep Subcategory if SubcategoryFilterList expects it, or adjust SubcategoryFilterList prop
  Category, 
  Product,
} from '../../data/productData';
import { useProductFilters } from '../../hooks/useProductFilters';

// Import new components
import CategoryHeader from '../../components/CategoryPage/CategoryHeader';
import SubcategoryFilterList from '../../components/CategoryPage/SubcategoryFilterList';
import AvailabilityFilter from '../../components/CategoryPage/AvailabilityFilter';
import SortByFilter from '../../components/CategoryPage/SortByFilter';
import ProductCountDisplay from '../../components/CategoryPage/ProductCountDisplay'; // Import ProductCountDisplay
import NoProductsMessage from '../../components/CategoryPage/NoProductsMessage'; // Import NoProductsMessage

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | undefined>(undefined);
  // This state will hold the initial products for the category, to be passed to the hook
  const [initialCategoryProducts, setInitialCategoryProducts] = useState<Product[]>([]);

  // Effect to fetch category details and initial products for that category
  useEffect(() => {
    if (categoryId) {
      const categoryData = getCategoryById(categoryId);
      setCategory(categoryData);
      
      const productsData = getProductsByCategory(categoryId);
      setInitialCategoryProducts(productsData);
    }
  }, [categoryId]);

  // Instantiate the hook
  const {
    filteredProducts,
    selectedSubcategory,
    filters,
    handleSubcategorySelect,
    handleFilterChange,
  } = useProductFilters({
    allProductsForCategory: initialCategoryProducts,
    initialCategoryId: categoryId
  });

  if (!category) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <CategoryHeader title={category.title} description={category.description} />

      <SubcategoryFilterList
        subcategories={category.subcategories}
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
      ) : (
        <NoProductsMessage />
      )}
    </div>
  );
}
