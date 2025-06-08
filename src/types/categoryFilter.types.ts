import { Category, Product } from './product.types'; // Assuming product.types.ts is already created

export type SortByType = 'newest' | 'name-asc' | 'name-desc';

export interface FilterValues {
  selectedSubcategory: string | null;
  inStock: boolean;
  sortBy: SortByType;
}

export interface FilterSetters {
  setSelectedSubcategory: (subcategoryId: string | null) => void;
  // Ensure 'value' is typed correctly if possible, or use 'any' if it truly varies.
  // 'keyof Omit<FilterValues, 'selectedSubcategory'>' is good for type safety for filterType.
  handleFilterChange: (filterType: keyof Omit<FilterValues, 'selectedSubcategory'>, value: any) => void;
}

export interface CategoryFilterControlsProps {
  category: Category | undefined;
  filterValues: FilterValues;
  filterSetters: FilterSetters;
}

// Type for the return value of the useCategoryFilters hook
export interface UseCategoryFiltersReturn {
    filteredProducts: Product[];
    filterValues: FilterValues;
    filterSetters: FilterSetters;
}
