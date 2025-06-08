import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import CategoryFilterControls from '../../components/CategoryPage/CategoryFilterControls';
import { useCategoryFilters } from '../../hooks/useCategoryFilters';
import { 
  getCategoryById, 
  getProductsByCategory, 
} from '../../data/productData'; // Data fetching functions
import { Category, Product } from '../../types/product.types'; // Centralized types

export default function CategoryPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | undefined>(undefined);
  const [initialProducts, setInitialProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (categoryId) {
      const categoryData = getCategoryById(categoryId); // Assumes this returns Category | undefined
      setCategory(categoryData);
      
      const productsData = categoryData ? getProductsByCategory(categoryId) : []; // Assumes this returns Product[]
      setInitialProducts(productsData);
    } else {
      setCategory(undefined);
      setInitialProducts([]);
    }
  }, [categoryId]);

  const { 
    filteredProducts, 
    filterValues, 
    filterSetters 
  } = useCategoryFilters(initialProducts, categoryId);

  if (!category) {
    return (
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Category not found</h1>
        <p className="text-gray-600">
          The category you are looking for does not exist or may have been moved.
        </p>
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

      {/* Filter Controls */}
      <CategoryFilterControls
        category={category}
        filterValues={filterValues}
        filterSetters={filterSetters}
      />

      {/* Product Listing */}
      <div className="mb-4">
        <p className="text-gray-600">{filteredProducts.length} products found</p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => ( // product is inferred as Product from filteredProducts
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
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
