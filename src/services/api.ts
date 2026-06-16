// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://silver-website-backend.onrender.com/api/v1/customer';
const UPLOAD_BASE_URL = import.meta.env.VITE_UPLOAD_BASE_URL || 'https://silver-website-backend.onrender.com/api/v1/upload';

// Types based on API documentation
export interface ApiResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface HeroData {
  title: string;
  subtitle: string;
  featuredImage: string;
}

export interface StatsData {
  totalProducts: number;
  categoriesCount: number;
  inStock?: number;
  newProducts?: number;
}

export interface HomepageData {
  hero: HeroData;
  latestProducts: Product[];
  popularCategories: Category[];
  newArrivals: Product[];
  stats: StatsData;
}

export interface Product {
  id: string;
  title: string;
  images: string[];
  category: Category | string; // Can be either object or string for backward compatibility
  subcategory?: Subcategory | string; // Can be either object or string for backward compatibility
  inStock: boolean;
  models?: any;
  weight?: string;
  purity?: string;
  description?: string;
  isNew?: boolean;
  isNewProduct?: boolean; // API uses this field name
  commonImages?: string[];
  isActive?: boolean;
  createdBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug?: string;
  title?: string;
  description?: string;
  image?: string;
  thumbnail?: string;
  parentCategory?: string | null;
  subcategories?: Subcategory[];
  isActive?: boolean;
  sortOrder?: number;
  createdBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface Subcategory {
  id: string;
  name: string;
  slug?: string;
  title?: string;
  description?: string;
  categoryId?: string;
  parentCategory?: string;
  isActive?: boolean;
  sortOrder?: number;
  createdBy?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductDetails {
  product: Product;
  relatedProducts: Product[];
  breadcrumbs: BreadcrumbItem[];
  seo: SEOData;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string;
  image: string;
}

export interface FilterOptions {
  categories: Category[];
  sortOptions: SortOption[];
}

export interface SortOption {
  value: string;
  label: string;
}

export interface CatalogData {
  products: Product[];
  filters: FilterOptions;
}

export interface SearchData {
  query: string;
  products: Product[];
  suggestions: string[];
}

export interface NavigationData {
  main: NavigationItem[];
  footer: NavigationItem[];
}

export interface NavigationItem {
  name: string;
  url: string;
  children?: NavigationItem[];
}

export interface CollectionData {
  title: string;
  description: string;
  products: Product[];
}

export interface CategoryPageData {
  category: Category;
  subcategories?: Subcategory[];
  products: Product[];
  breadcrumbs: BreadcrumbItem[];
  currentSubcategory?: Subcategory | null;
}

export interface UploadImageData {
  publicId: string;
  filename: string;
  originalName: string;
  size: number;
  url: string;
  urls: {
    thumbnail: string;
    medium: string;
    large: string;
    original: string;
  };
  cloudinary: boolean;
}

export interface MultipleUploadData {
  images: UploadImageData[];
  count: number;
}

export interface EnquiryRequest {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  subject: string;
  message: string;
  type?: 'general' | 'product' | 'order' | 'complaint' | 'suggestion' | 'other';
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  productId?: string;
  tags?: string[];
}

export interface EnquiryResponse {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  subject: string;
  message: string;
  type: string;
  priority: string;
  status: string;
  productId?: string;
  responses: any[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Query parameter interfaces
export interface CatalogParams {
  page?: number;
  limit?: number;
  category?: string;
  subcategory?: string;
  inStock?: boolean;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  q: string;
  page?: number;
  limit?: number;
}

export interface CollectionParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  category?: string;
  inStock?: boolean;
}

export interface CategoryParams {
  page?: number;
  limit?: number;
  subcategory?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  inStock?: boolean;
}

// New interface for latest products with specific parameters
export interface LatestProductsParams {
  page?: number;
  limit?: number;
  days?: number; // Get products from last N days
  sortBy?: 'createdAt' | 'updatedAt' | 'title';
  sortOrder?: 'asc' | 'desc';
  category?: string;
  subcategory?: string;
  inStock?: boolean;
}

// Helper function to build query string
const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value.toString());
    }
  });
  
  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

// How long to wait for the backend before giving up. Without this, a slow or
// hung backend (cold-starting host, dropped TCP, Mongo buffering) leaves every
// fetch pending forever and the page spins indefinitely. 12s is generous enough
// for a cold-starting host but short enough that the UI can show an error.
const REQUEST_TIMEOUT_MS = 12000;

// Base fetch wrapper with error handling + a hard timeout.
const fetchWithErrorHandling = async <T>(url: string, options?: RequestInit): Promise<ApiResponse<T>> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      signal: controller.signal,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const data: ApiResponse<T> = await response.json();

    if (!data.success) {
      throw new Error(data.message || 'API request failed');
    }

    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.error('API Error: request timed out', url);
      throw new Error('The server is taking too long to respond. Please try again.');
    }
    console.error('API Error:', error);
    throw error;
  } finally {
    clearTimeout(timer);
  }
};

// API Service Class
class ApiService {
  
  // Health Check
  async checkHealth(): Promise<{ status: string; timestamp: string }> {
    const response = await fetchWithErrorHandling<{ status: string; timestamp: string }>('/health');
    return response.data;
  }

  // Homepage & Landing Pages
  async getHomepageContent(): Promise<HomepageData> {
    const response = await fetchWithErrorHandling<HomepageData>(`${API_BASE_URL}/homepage`);
    return response.data;
  }

  // Product Catalog & Browsing
  async getProductCatalog(params: CatalogParams = {}): Promise<{ data: CatalogData; pagination: PaginationInfo }> {
    const queryString = buildQueryString(params);
    const response = await fetchWithErrorHandling<CatalogData>(`${API_BASE_URL}/products${queryString}`);
    return {
      data: response.data,
      pagination: response.pagination!
    };
  }

  // Category Navigation

  // Fetch all categories from the API (no fallback)
  async getAllCategories(): Promise<Category[]> {
    const response = await fetchWithErrorHandling<Category[]>(`${API_BASE_URL}/categories`);
    return response.data;
  }

  // Fetch category by slug
  async getCategoryBySlug(slug: string): Promise<Category> {
    const response = await fetchWithErrorHandling<Category>(`${API_BASE_URL}/categories/slug/${slug}`);
    return response.data;
  }

  // Fetch all subcategories for a specific category (by slug)
  async getSubcategoriesByCategory(categorySlug: string): Promise<{ subcategories: Subcategory[] }> {
    const response = await fetchWithErrorHandling<{ subcategories: Subcategory[] }>(`${API_BASE_URL}/categories/${categorySlug}`);
    return response.data;
  }

  // Fetch specific subcategory details by slugs
  async getSubcategoryBySlug(categorySlug: string, subcategorySlug: string): Promise<Subcategory> {
    const response = await fetchWithErrorHandling<Subcategory>(`${API_BASE_URL}/categories/slug/${categorySlug}/subcategories/${subcategorySlug}`);
    return response.data;
  }

  // Fetch subcategory page with products
  async getSubcategoryPage(categorySlug: string, subcategorySlug: string, params: CategoryParams = {}): Promise<{ data: CategoryPageData; pagination: PaginationInfo }> {
    const queryString = buildQueryString(params);
    const response = await fetchWithErrorHandling<CategoryPageData>(`${API_BASE_URL}/categories/slug/${categorySlug}/subcategories/${subcategorySlug}${queryString}`);
    return {
      data: response.data,
      pagination: response.pagination!
    };
  }

  // Fetch category page by slug
  async getCategoryPageBySlug(slug: string, params: CategoryParams = {}): Promise<{ data: CategoryPageData; pagination: PaginationInfo }> {
    const queryString = buildQueryString(params);
    const response = await fetchWithErrorHandling<CategoryPageData>(`${API_BASE_URL}/categories/${slug}${queryString}`);
    return {
      data: response.data,
      pagination: response.pagination!
    };
  }

  // Product Details
  async getProductDetails(productId: string): Promise<ProductDetails> {
    const response = await fetchWithErrorHandling<ProductDetails>(`${API_BASE_URL}/products/${productId}`);
    return response.data;
  }

  async getRelatedProducts(productId: string, limit: number = 4): Promise<Product[]> {
    const response = await fetchWithErrorHandling<Product[]>(`${API_BASE_URL}/products/${productId}/related?limit=${limit}`);
    return response.data;
  }

  // Search Functionality
  async searchProducts(params: SearchParams): Promise<{ data: SearchData; pagination: PaginationInfo; message: string }> {
    const queryString = buildQueryString(params);
    const response = await fetchWithErrorHandling<SearchData>(`${API_BASE_URL}/search${queryString}`);
    return {
      data: response.data,
      pagination: response.pagination!,
      message: response.message || ''
    };
  }

  // Product Collections
  async getNewArrivals(params: CollectionParams = {}): Promise<{ data: CollectionData; pagination: PaginationInfo }> {
    // Set default parameters for new arrivals
    const defaultParams = {
      sortBy: 'createdAt',
      sortOrder: 'desc' as const,
      limit: 12,
      page: 1,
      ...params
    };
    
    const queryString = buildQueryString(defaultParams);
    const response = await fetchWithErrorHandling<CollectionData>(`${API_BASE_URL}/collections/new-arrivals${queryString}`);
    return {
      data: response.data,
      pagination: response.pagination!
    };
  }

  async getFeaturedProducts(params: CollectionParams = {}): Promise<{ data: CollectionData; pagination: PaginationInfo }> {
    // Set default parameters for featured products
    const defaultParams = {
      sortBy: 'createdAt',
      sortOrder: 'desc' as const,
      limit: 12,
      page: 1,
      ...params
    };
    
    const queryString = buildQueryString(defaultParams);
    const response = await fetchWithErrorHandling<CollectionData>(`${API_BASE_URL}/collections/featured${queryString}`);
    return {
      data: response.data,
      pagination: response.pagination!
    };
  }

  // New method: Get latest products with specific parameters
  async getLatestProducts(params: LatestProductsParams = {}): Promise<{ data: CatalogData; pagination: PaginationInfo }> {
    // Set default parameters for latest products
    const defaultParams = {
      sortBy: 'createdAt' as const,
      sortOrder: 'desc' as const,
      limit: 12,
      page: 1,
      days: 30, // Get products from last 30 days by default
      inStock: true,
      ...params
    };
    
    const queryString = buildQueryString(defaultParams);
    const response = await fetchWithErrorHandling<CatalogData>(`${API_BASE_URL}/products/latest${queryString}`);
    return {
      data: response.data,
      pagination: response.pagination!
    };
  }

  // New method: Get trending products (most viewed/popular)
  async getTrendingProducts(params: CollectionParams = {}): Promise<{ data: CatalogData; pagination: PaginationInfo }> {
    const defaultParams = {
      sortBy: 'popularity',
      sortOrder: 'desc' as const,
      limit: 12,
      page: 1,
      inStock: true,
      ...params
    };
    
    const queryString = buildQueryString(defaultParams);
    const response = await fetchWithErrorHandling<CatalogData>(`${API_BASE_URL}/products/trending${queryString}`);
    return {
      data: response.data,
      pagination: response.pagination!
    };
  }

  // Navigation & Site Structure
  async getNavigation(): Promise<NavigationData> {
    const response = await fetchWithErrorHandling<NavigationData>(`${API_BASE_URL}/navigation`);
    return response.data;
  }

  // Statistics & Analytics
  async getPublicStats(): Promise<StatsData> {
    const response = await fetchWithErrorHandling<StatsData>(`${API_BASE_URL}/stats`);
    return response.data;
  }

  // Image Upload & Management
  async uploadSingleImage(file: File): Promise<UploadImageData> {
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch(`${UPLOAD_BASE_URL}/image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result: ApiResponse<UploadImageData> = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Upload failed');
      }

      return result.data;
    } catch (error) {
      console.error('Image upload error:', error);
      throw error;
    }
  }

  async uploadMultipleImages(files: File[]): Promise<MultipleUploadData> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('images', file);
    });

    try {
      const response = await fetch(`${UPLOAD_BASE_URL}/multiple-images`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status} ${response.statusText}`);
      }

      const result: ApiResponse<MultipleUploadData> = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'Upload failed');
      }

      return result.data;
    } catch (error) {
      console.error('Multiple images upload error:', error);
      throw error;
    }
  }

  // Enquiry Management
  async submitEnquiry(enquiryData: EnquiryRequest): Promise<EnquiryResponse> {
    try {
      const response = await fetchWithErrorHandling<EnquiryResponse>(
        `${API_BASE_URL}/enquiry`,
        {
          method: 'POST',
          body: JSON.stringify(enquiryData),
        }
      );
      return response.data;
    } catch (error) {
      console.error('Enquiry submission error:', error);
      throw error;
    }
  }
}

// Create and export a singleton instance
export const apiService = new ApiService();

// Export individual methods for convenience
export const {
  checkHealth,
  getHomepageContent,
  getProductCatalog,
  getAllCategories,
  getCategoryBySlug,
  getSubcategoriesByCategory,
  getSubcategoryBySlug,
  getSubcategoryPage,
  getCategoryPageBySlug,
  getProductDetails,
  getRelatedProducts,
  searchProducts,
  getNewArrivals,
  getFeaturedProducts,
  getLatestProducts,
  getTrendingProducts,
  getNavigation,
  getPublicStats,
  uploadSingleImage,
  uploadMultipleImages,
  submitEnquiry,
} = apiService;

// Helper hooks for React components (optional)
export const useApi = () => {
  return apiService;
};

// Error handling utilities
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public response?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

// Response interceptor utility
export const withErrorInterceptor = <T extends (...args: any[]) => Promise<any>>(
  apiMethod: T
): T => {
  return (async (...args: any[]) => {
    try {
      return await apiMethod(...args);
    } catch (error) {
      // You can add global error handling here
      // For example, show toast notifications, log errors, etc.
      console.error('API Method Error:', error);
      throw error;
    }
  }) as T;
};

export default apiService;
