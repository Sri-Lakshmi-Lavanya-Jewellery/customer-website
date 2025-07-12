import { useState, useEffect, useMemo } from 'react';
import { apiService, ApiResponse } from '../services/api';

// Generic hook for API calls
export function useApiCall<T>(
  apiMethod: () => Promise<T>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await apiMethod();
        if (isMounted) {
          setData(result);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, dependencies);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiMethod();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}

// Specific hooks for common API calls
export function useHomepageContent() {
  return useApiCall(() => apiService.getHomepageContent());
}

export function useProductCatalog(params: any = {}) {
  return useApiCall(
    () => apiService.getProductCatalog(params),
    [JSON.stringify(params)]
  );
}

export function useCategories() {
  return useApiCall(() => apiService.getAllCategories());
}

export function useCategoryBySlug(slug: string) {
  return useApiCall(
    () => apiService.getCategoryBySlug(slug),
    [slug]
  );
}

export function useSubcategoriesByCategory(categorySlug: string) {
  return useApiCall(
    () => apiService.getSubcategoriesByCategory(categorySlug),
    [categorySlug]
  );
}

export function useSubcategoryBySlug(categorySlug: string, subcategorySlug: string) {
  return useApiCall(
    () => apiService.getSubcategoryBySlug(categorySlug, subcategorySlug),
    [categorySlug, subcategorySlug]
  );
}

export function useCategoryPageBySlug(slug: string, params: any = {}) {
  return useApiCall(
    () => apiService.getCategoryPageBySlug(slug, params),
    [slug, JSON.stringify(params)]
  );
}

export function useProductDetails(productId: string) {
  return useApiCall(
    () => apiService.getProductDetails(productId),
    [productId]
  );
}

// Enhanced product details hook with model/dimension functionality
export function useProductDetailsWithModels(productId: string) {
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedDimension, setSelectedDimension] = useState<string>('');
  
  const { data: productDetails, loading, error } = useProductDetails(productId);
  
  // Debug logging
  console.log('Product Details API Response:', { productDetails, loading, error, productId });
  
  // Extract the product from the API response structure
  const product = productDetails?.product;
  
  const modelKeys = useMemo(() => {
    if (product?.models && typeof product.models === 'object') {
      return Object.keys(product.models);
    }
    return [];
  }, [product]);
  
  const currentModelData = useMemo(() => {
    if (product?.models && selectedModel && product.models[selectedModel]) {
      return product.models[selectedModel] as Record<string, any>;
    }
    return null;
  }, [product, selectedModel]);
  
  const dimensionKeys = useMemo(() => {
    if (currentModelData && typeof currentModelData === 'object') {
      return Object.keys(currentModelData);
    }
    return [];
  }, [currentModelData]);
  
  const dimensionRangeSet = useMemo(() => {
    if (!currentModelData) return null;

    const allDimensions = Object.values(currentModelData);
    if (allDimensions.length === 0) return null;

    const parseAndCollect = (prop: string): number[] =>
      allDimensions
        .map(dim => {
          if (dim && typeof dim === 'object' && prop in dim) {
            const value = (dim as any)[prop];
            return value ? parseFloat(String(value).replace(/[^\d.]/g, '')) : null;
          }
          return null;
        })
        .filter((val): val is number => val !== null);

    const getUnit = (prop: string, defaultUnit: string): string => {
      for (const dim of allDimensions) {
        if (dim && typeof dim === 'object' && prop in dim) {
          const value = (dim as any)[prop];
          if (value) return String(value).replace(/[\d.]/g, '') || defaultUnit;
        }
      }
      return defaultUnit;
    };

    const lengths = parseAndCollect('length');
    const breadths = parseAndCollect('breadth');
    const heights = parseAndCollect('height');
    const weights = parseAndCollect('weight');

    return {
      length: lengths.length > 0 ? { min: Math.min(...lengths), max: Math.max(...lengths), unit: getUnit('length', 'cm') } : null,
      breadth: breadths.length > 0 ? { min: Math.min(...breadths), max: Math.max(...breadths), unit: getUnit('breadth', 'cm') } : null,
      height: heights.length > 0 ? { min: Math.min(...heights), max: Math.max(...heights), unit: getUnit('height', 'cm') } : null,
      weight: weights.length > 0 ? { min: Math.min(...weights), max: Math.max(...weights), unit: getUnit('weight', 'g') } : null,
    };
  }, [currentModelData]);
  
  // Initialize selected model when product loads
  useEffect(() => {
    if (modelKeys.length > 0 && !selectedModel) {
      setSelectedModel(modelKeys[0]);
    }
  }, [modelKeys, selectedModel]);
  
  // Initialize selected dimension when model changes
  useEffect(() => {
    if (dimensionKeys.length > 0) {
      setSelectedDimension(dimensionKeys[0]);
    } else {
      setSelectedDimension('');
    }
  }, [dimensionKeys]);
  
  const handleModelChange = (modelKey: string) => {
    setSelectedModel(modelKey);
  };

  const handleDimensionChange = (dimensionKey: string) => {
    setSelectedDimension(dimensionKey);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    } else if (newQuantity < 1) {
      setQuantity(1);
    }
  };
  
  return {
    productDetails,
    product: product || null,
    loading,
    error,
    quantity,
    selectedModel,
    modelKeys,
    selectedDimension,
    dimensionKeys,
    currentModelData,
    dimensionRangeSet,
    handleModelChange,
    handleDimensionChange,
    handleQuantityChange,
  };
}

export function useRelatedProducts(productId: string, limit: number = 4) {
  return useApiCall(
    () => apiService.getRelatedProducts(productId, limit),
    [productId, limit]
  );
}

export function useSearchProducts(params: any = {}) {
  return useApiCall(
    () => apiService.searchProducts(params),
    [JSON.stringify(params)]
  );
}

export function useNewArrivals(params: any = {}) {
  return useApiCall(
    () => apiService.getNewArrivals(params),
    [JSON.stringify(params)]
  );
}

export function useFeaturedProducts(params: any = {}) {
  return useApiCall(
    () => apiService.getFeaturedProducts(params),
    [JSON.stringify(params)]
  );
}

export function useLatestProducts(params: any = {}) {
  return useApiCall(
    () => apiService.getLatestProducts(params),
    [JSON.stringify(params)]
  );
}

export function useTrendingProducts(params: any = {}) {
  return useApiCall(
    () => apiService.getTrendingProducts(params),
    [JSON.stringify(params)]
  );
}

export function useNavigation() {
  return useApiCall(() => apiService.getNavigation());
}

export function usePublicStats() {
  return useApiCall(() => apiService.getPublicStats());
}

// Hook for image upload with progress
export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const uploadSingle = async (file: File) => {
    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);
      
      const result = await apiService.uploadSingleImage(file);
      setUploadProgress(100);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const uploadMultiple = async (files: File[]) => {
    try {
      setUploading(true);
      setError(null);
      setUploadProgress(0);
      
      const result = await apiService.uploadMultipleImages(files);
      setUploadProgress(100);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
      throw err;
    } finally {
      setUploading(false);
    }
  };

  return {
    uploadSingle,
    uploadMultiple,
    uploading,
    uploadProgress,
    error
  };
}

// Hook for pagination
export function usePagination(initialPage = 1, initialLimit = 12) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const nextPage = () => setPage(prev => prev + 1);
  const prevPage = () => setPage(prev => Math.max(1, prev - 1));
  const goToPage = (pageNumber: number) => setPage(pageNumber);
  const changeLimit = (newLimit: number) => {
    setLimit(newLimit);
    setPage(1); // Reset to first page when limit changes
  };

  return {
    page,
    limit,
    nextPage,
    prevPage,
    goToPage,
    changeLimit,
    setPage,
    setLimit
  };
}

// Hook for search with debouncing
export function useDebounce(value: string, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Combined hook for search with debouncing
export function useDebouncedSearch(initialQuery = '', delay = 500) {
  const [query, setQuery] = useState(initialQuery);
  const debouncedQuery = useDebounce(query, delay);
  
  const searchResults = useSearchProducts(
    debouncedQuery.length >= 2 ? { q: debouncedQuery, page: 1, limit: 12 } : null
  );

  return {
    query,
    setQuery,
    debouncedQuery,
    ...searchResults
  };
}

export function useSubcategoryPage(categorySlug: string, subcategorySlug: string, params: any = {}) {
  return useApiCall(
    () => apiService.getSubcategoryPage(categorySlug, subcategorySlug, params),
    [categorySlug, subcategorySlug, JSON.stringify(params)]
  );
}
