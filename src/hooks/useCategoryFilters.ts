import { useState, useMemo } from 'react'; // Removed useEffect
import { Product } from '../types/product.types'; // Centralized Product type
import { getProductsBySubcategory } from '../data/productData'; // Assuming this stays for data fetching logic
import { FilterValues, FilterSetters, UseCategoryFiltersReturn, SortByType } from '../types/categoryFilter.types';

export function useCategoryFilters(initialProducts: Product[], categoryId: string | undefined): UseCategoryFiltersReturn {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    inStock: false,
    sortBy: 'newest' as SortByType, // Use imported SortByType
  });

  const handleFilterChange = (
    filterType: keyof Omit<FilterValues, 'selectedSubcategory'>, 
    value: any
  ) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const filteredProducts = useMemo(() => {
    let result: Product[] = [];

    if (selectedSubcategory && categoryId) {
      // This assumes getProductsBySubcategory is still valid and returns Product[]
      result = getProductsBySubcategory(categoryId, selectedSubcategory); 
    } else {
      result = [...initialProducts];
    }
    
    if (filters.inStock) {
      result = result.filter(product => product.inStock);
    }

    if (filters.sortBy === 'newest') {
      const newProducts = result.filter(product => product.isNew);
      const oldProducts = result.filter(product => !product.isNew);
      result = [...newProducts, ...oldProducts];
    } else if (filters.sortBy === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'name-desc') {
      result.sort((a, b) => b.title.localeCompare(a.title));
    }
    
    return result;
  }, [initialProducts, selectedSubcategory, filters, categoryId]);

  const currentFilterValues: FilterValues = { // Renamed to avoid conflict with imported FilterValues type
    selectedSubcategory,
    ...filters,
  };

  const currentFilterSetters: FilterSetters = { // Renamed to avoid conflict
    setSelectedSubcategory,
    handleFilterChange,
  };

  return {
    filteredProducts,
    filterValues: currentFilterValues, // Use the local const for the return value
    filterSetters: currentFilterSetters, // Use the local const for the return value
  };
}
