import { useState, useEffect, useMemo } from 'react';
import type { Product } from '../../data/productData'; // Assuming Product type is exported from productData

// If getProductsBySubcategory is to be used directly and it's not already imported,
// it would need to be imported here. However, the plan is to replicate its logic
// or filter the provided 'allProductsForCategory'.
// For now, we'll assume direct filtering.

export interface ProductFiltersState {
  inStock: boolean;
  sortBy: string; // 'newest', 'name-asc', 'name-desc'
}

interface UseProductFiltersProps {
  allProductsForCategory: Product[];
  initialCategoryId: string | undefined; // Keep categoryId for potential direct re-fetch logic if needed
}

interface UseProductFiltersReturn {
  filteredProducts: Product[];
  selectedSubcategory: string | null;
  filters: ProductFiltersState;
  handleSubcategorySelect: (subcategoryId: string | null) => void;
  handleFilterChange: (filterType: keyof ProductFiltersState, value: any) => void;
}

export const useProductFilters = ({
  allProductsForCategory,
  initialCategoryId, // Though categoryId is used to fetch allProductsForCategory, it might be useful for subcategory logic
}: UseProductFiltersProps): UseProductFiltersReturn => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProductsForCategory);
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFiltersState>({
    inStock: false,
    sortBy: 'newest', // Default sort
  });

  useEffect(() => {
    let result: Product[] = [...allProductsForCategory];

    // Filter by subcategory if selected
    if (selectedSubcategory) {
      // Assuming direct filtering on allProductsForCategory.
      // If getProductsBySubcategory from productData.ts is used, it needs access to the global 'products' array.
      // For a hook, it's better to work with the passed 'allProductsForCategory'.
      result = result.filter(product => product.subcategory === selectedSubcategory);
    }

    // Filter by in-stock status
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Sort products
    if (filters.sortBy === 'newest') {
      // This sort puts new items first, then the rest, maintaining original relative order for non-new.
      const newItems = result.filter(product => product.isNew);
      const oldItems = result.filter(product => !product.isNew);
      result = [...newItems, ...oldItems];
    } else if (filters.sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(result);
  }, [allProductsForCategory, selectedSubcategory, filters, initialCategoryId]);


  const handleSubcategorySelect = (subcategoryId: string | null) => {
    setSelectedSubcategory(subcategoryId);
  };

  const handleFilterChange = (filterType: keyof ProductFiltersState, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return {
    filteredProducts,
    selectedSubcategory,
    filters,
    handleSubcategorySelect,
    handleFilterChange,
  };
};
