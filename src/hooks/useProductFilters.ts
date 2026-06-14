import { useState, useMemo } from 'react';
import type { Product } from '../services/api'; // Import Product type from API service

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
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filters, setFilters] = useState<ProductFiltersState>({
    inStock: false,
    sortBy: 'newest', // Default sort
  });

  // Derive the filtered/sorted list with useMemo. (Previously this used a
  // useEffect + setState, which infinite-looped: `allProductsForCategory` is a
  // fresh array reference every render, so the effect re-fired endlessly →
  // "Maximum update depth exceeded".)
  const filteredProducts = useMemo<Product[]>(() => {
    let result: Product[] = [...allProductsForCategory];

    // Filter by subcategory if selected
    if (selectedSubcategory) {
      result = result.filter(product => product.subcategory === selectedSubcategory);
    }

    // Filter by in-stock status
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    // Sort products
    if (filters.sortBy === 'newest') {
      // New items first, then the rest, preserving original relative order.
      const newItems = result.filter(product => product.isNew);
      const oldItems = result.filter(product => !product.isNew);
      result = [...newItems, ...oldItems];
    } else if (filters.sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }

    return result;
  }, [allProductsForCategory, selectedSubcategory, filters]);


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
