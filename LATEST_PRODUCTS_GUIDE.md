# Latest Products Implementation Guide

This document explains how to implement and use the latest products functionality with proper query parameters.

## 🎯 Overview

The latest products feature allows you to fetch and display products that were recently added to the catalog. It supports advanced filtering by time range, category, sorting, and availability.

## 🔧 API Implementation

### New API Methods

#### 1. `getLatestProducts(params)`
```typescript
async getLatestProducts(params: LatestProductsParams = {}): Promise<{ data: CatalogData; pagination: PaginationInfo }>
```

**Parameters:**
```typescript
interface LatestProductsParams {
  page?: number;           // Page number (default: 1)
  limit?: number;          // Items per page (default: 12)
  days?: number;           // Get products from last N days (default: 30)
  sortBy?: 'createdAt' | 'updatedAt' | 'title';  // Sort field (default: 'createdAt')
  sortOrder?: 'asc' | 'desc';  // Sort order (default: 'desc')
  category?: string;       // Filter by category
  subcategory?: string;    // Filter by subcategory
  inStock?: boolean;       // Show only in-stock items (default: true)
}
```

**Example Usage:**
```typescript
// Get latest products from last 7 days
const recentProducts = await apiService.getLatestProducts({
  days: 7,
  limit: 20,
  sortBy: 'createdAt',
  sortOrder: 'desc',
  inStock: true
});

// Get latest products from specific category
const categoryLatest = await apiService.getLatestProducts({
  category: 'pooja-items',
  days: 15,
  page: 1,
  limit: 12
});
```

#### 2. Enhanced Collection Methods

**New Arrivals with Parameters:**
```typescript
const newArrivals = await apiService.getNewArrivals({
  sortBy: 'createdAt',
  sortOrder: 'desc',
  limit: 24,
  category: 'silver-items'
});
```

**Featured Products with Parameters:**
```typescript
const featured = await apiService.getFeaturedProducts({
  sortBy: 'popularity',
  sortOrder: 'desc',
  limit: 16,
  inStock: true
});
```

## 🎣 React Hooks

### New Hooks Available

#### 1. `useLatestProducts(params)`
```typescript
import { useLatestProducts } from '../hooks/useApi';

function LatestProductsComponent() {
  const { data, loading, error } = useLatestProducts({
    days: 30,
    category: 'pooja-items',
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {data?.data.products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

#### 2. Enhanced Hooks
- `useTrendingProducts(params)` - Get trending/popular products
- `useProductsByCategory(categoryId, params)` - Enhanced category filtering

## 📄 Pages Implementation

### 1. Categories Page (`/categories`)
- **Features**: Lists all product categories with stats
- **API Integration**: Uses `useCategories()` and `usePublicStats()`
- **Enhancements**: Shows subcategories, product counts, quick navigation

### 2. Collections Index Page (`/collections`)
- **Features**: Overview of all collections (New Arrivals, Featured, Trending)
- **API Integration**: Uses `usePublicStats()` for dynamic counts
- **Routes**: Links to specific collections

### 3. Collection Page (`/collections/:collectionType`)
- **Supported Types**: `new-arrivals`, `featured`
- **Features**: Paginated collection display with sorting
- **API Integration**: Uses collection-specific hooks

### 4. Latest Products Page (`/latest`)
- **Features**: Advanced filtering by time range, category, sorting
- **API Integration**: Uses `useLatestProducts()` with dynamic parameters
- **Filters**: 
  - Time range (7, 15, 30, 60, 90 days)
  - Category selection
  - Sort by date added, last updated, or name
  - Availability filter

## 🔗 Route Structure

```
/                              # Homepage with API integration
├── /categories               # All categories page
├── /collections             # Collections overview
│   ├── /new-arrivals       # New arrivals collection
│   ├── /featured           # Featured products collection
│   └── /trending           # Trending products (if implemented)
├── /latest                 # Latest products with advanced filters
├── /catalog                # Full product catalog
├── /products/:categoryId   # Category-specific products
└── /product/:productId     # Individual product details
```

## ⚙️ Query Parameters in URLs

### Latest Products Page
```
/latest?days=7&category=pooja-items&sortBy=createdAt&sortOrder=desc&inStock=true
```

### Collections with Filters
```
/collections/new-arrivals?page=2&limit=24&sortBy=title&sortOrder=asc
```

### Category Pages with Subcategory
```
/products/pooja-items?subcategory=kamakshi-deepam&page=1&limit=12
```

## 🎨 UI Components

### Filter Components

#### Time Range Filter
```typescript
const TimeRangeFilter = ({ days, onChange }) => {
  const options = [
    { value: 7, label: 'Last 7 days' },
    { value: 15, label: 'Last 15 days' },
    { value: 30, label: 'Last 30 days' },
    { value: 60, label: 'Last 2 months' },
    { value: 90, label: 'Last 3 months' }
  ];

  return (
    <select value={days} onChange={(e) => onChange(Number(e.target.value))}>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
```

#### Category Filter
```typescript
const CategoryFilter = ({ categories, selected, onChange }) => (
  <select value={selected} onChange={(e) => onChange(e.target.value)}>
    <option value="">All Categories</option>
    {categories?.map(category => (
      <option key={category.id} value={category.id}>
        {category.name || category.title}
      </option>
    ))}
  </select>
);
```

## 📊 API Endpoints and Query Parameters

### Latest Products Endpoint
```
GET /api/v1/customer/catalog/latest?days=30&category=pooja-items&sortBy=createdAt&sortOrder=desc&page=1&limit=12&inStock=true
```

### Enhanced Collections Endpoints
```
GET /api/v1/customer/collections/new-arrivals?sortBy=createdAt&sortOrder=desc&limit=24
GET /api/v1/customer/collections/featured?sortBy=popularity&sortOrder=desc&limit=16
```

### Category with Enhanced Filtering
```
GET /api/v1/customer/categories/pooja-items?subcategory=kamakshi-deepam&sortBy=createdAt&sortOrder=desc&page=1&limit=12&inStock=true
```

## 🔍 Example Implementations

### 1. Homepage with Latest Products
```typescript
import { useHomepageContent, useLatestProducts } from '../hooks/useApi';

function HomePage() {
  const { data: homepage } = useHomepageContent();
  const { data: latest } = useLatestProducts({ days: 7, limit: 4 });

  return (
    <div>
      <HeroSection data={homepage?.hero} />
      
      {/* Show latest products from last 7 days */}
      <section>
        <h2>This Week's New Arrivals</h2>
        <div className="grid grid-cols-4 gap-4">
          {latest?.data.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
```

### 2. Category Page with Recent Filter
```typescript
import { useCategoryPage, useLatestProducts } from '../hooks/useApi';

function CategoryPage({ categoryId }) {
  const [showRecent, setShowRecent] = useState(false);
  
  const categoryData = useCategoryPage(categoryId, { page: 1, limit: 12 });
  const recentData = useLatestProducts({ 
    category: categoryId, 
    days: 15, 
    limit: 12 
  });

  const data = showRecent ? recentData : categoryData;

  return (
    <div>
      <CategoryHeader category={data?.data.category} />
      
      {/* Toggle between all products and recent products */}
      <div className="mb-4">
        <button 
          onClick={() => setShowRecent(false)}
          className={!showRecent ? 'active' : ''}
        >
          All Products
        </button>
        <button 
          onClick={() => setShowRecent(true)}
          className={showRecent ? 'active' : ''}
        >
          Recent (Last 15 days)
        </button>
      </div>
      
      <ProductGrid products={data?.data.products} />
    </div>
  );
}
```

### 3. Search with Recent Filter
```typescript
import { useProductSearch, useLatestProducts } from '../hooks/useApi';

function SearchPage() {
  const [query, setQuery] = useState('');
  const [recentOnly, setRecentOnly] = useState(false);
  
  const searchData = useProductSearch({ 
    q: query, 
    page: 1, 
    limit: 12 
  });
  
  const recentData = useLatestProducts({ 
    search: query, 
    days: 30, 
    limit: 12 
  });

  const data = recentOnly ? recentData : searchData;

  return (
    <div>
      <SearchInput value={query} onChange={setQuery} />
      
      <label>
        <input 
          type="checkbox" 
          checked={recentOnly}
          onChange={(e) => setRecentOnly(e.target.checked)}
        />
        Show only recent items (last 30 days)
      </label>
      
      <SearchResults data={data} />
    </div>
  );
}
```

## 🚀 Performance Tips

### 1. Caching Strategy
```typescript
// Cache latest products for shorter periods
const cacheConfig = {
  latest: '5 minutes',
  newArrivals: '15 minutes',
  featured: '30 minutes',
  categories: '1 hour'
};
```

### 2. Pagination Best Practices
```typescript
// Use reasonable limits for latest products
const paginationLimits = {
  mobile: 8,
  tablet: 12,
  desktop: 16
};
```

### 3. Filter Debouncing
```typescript
// Debounce filter changes to reduce API calls
const debouncedFilters = useDebounce(filters, 300);
```

## 🐛 Error Handling

### Graceful Degradation
```typescript
function LatestProducts() {
  const { data, loading, error } = useLatestProducts({ days: 30 });
  
  if (error) {
    // Fallback to showing all products or cached data
    console.warn('Latest products API failed, showing fallback');
    return <FallbackProductGrid />;
  }
  
  if (loading) return <LoadingSpinner />;
  
  return <ProductGrid products={data?.data.products} />;
}
```

## 📈 Analytics and Tracking

### Track User Interactions
```typescript
// Track which time ranges users prefer
const trackTimeRangeSelection = (days: number) => {
  analytics.track('latest_products_time_range_selected', { days });
};

// Track category filters usage
const trackCategoryFilter = (category: string) => {
  analytics.track('latest_products_category_filtered', { category });
};
```

---

**Implementation Status**: ✅ Complete
**API Integration**: ✅ Full API support with query parameters
**UI Components**: ✅ Responsive design with advanced filters
**Error Handling**: ✅ Graceful fallbacks implemented
**Performance**: ✅ Optimized with pagination and caching considerations
