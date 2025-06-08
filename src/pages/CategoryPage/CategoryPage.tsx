import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import { 
  getCategoryById, 
  getProductsByCategory, 
  getProductsBySubcategory, 
  Category, 
  Product,
  Subcategory
} from '../../data/productData';

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    inStock: false,
    sortBy: 'newest'
  });

  useEffect(() => {
    if (categoryId) {
      const categoryData = getCategoryById(categoryId);
      setCategory(categoryData);
      
      const productsData = getProductsByCategory(categoryId);
      setProducts(productsData);
      setFilteredProducts(productsData);
    }
  }, [categoryId]);

  useEffect(() => {
    applyFilters();
  }, [selectedSubcategory, filters, products]);

  const handleSubcategorySelect = (subcategoryId: string | null) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleFilterChange = (filterType: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const applyFilters = () => {
    let result = [...products];

    // Filter by subcategory if selected
    if (selectedSubcategory && categoryId) {
      result = getProductsBySubcategory(categoryId, selectedSubcategory);
    }

    // Filter by in-stock status
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Price filtering removed as per requirement

    // Sort products - only by newest now
    if (filters.sortBy === 'newest') {
      result = result.filter(product => product.isNew).concat(result.filter(product => !product.isNew));
    } else if (filters.sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(result);
  };

  if (!category) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Category Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.title}</h1>
        <p className="text-gray-600">{category.description}</p>
      </div>

      {/* Subcategory Filters */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Subcategories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => handleSubcategorySelect(null)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              selectedSubcategory === null 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            All
          </button>
          {category.subcategories.map((subcategory) => (
            <button
              key={subcategory.id}
              onClick={() => handleSubcategorySelect(subcategory.id)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedSubcategory === subcategory.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              {subcategory.name}
            </button>
          ))}
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Availability Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Availability</h3>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => handleFilterChange('inStock', e.target.checked)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">In Stock Only</span>
            </label>
          </div>

          {/* Sort By Filter */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="newest">Newest First</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>

          {/* Weight Range Filter - Placeholder for future implementation */}
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
      <div className="mb-4">
        <p className="text-gray-600">{filteredProducts.length} products found</p>
      </div>

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
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your filters or selecting a different subcategory.</p>
        </div>
      )}
    </div>
  );
}
