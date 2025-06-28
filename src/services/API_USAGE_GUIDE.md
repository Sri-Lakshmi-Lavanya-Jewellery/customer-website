# API Integration Guide

This guide shows how to use the centralized API service in your React components.

## Quick Start

The API service is already configured and ready to use. Here are the main ways to interact with it:

### 1. Using React Hooks (Recommended)

```typescript
import { useHomepageContent, useProductCatalog, useCategories } from '../hooks/useApi';

function MyComponent() {
  const { data, loading, error } = useHomepageContent();
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return <div>{data?.hero.title}</div>;
}
```

### 2. Direct API Service Usage

```typescript
import { apiService } from '../services/api';

async function fetchData() {
  try {
    const homepage = await apiService.getHomepageContent();
    const products = await apiService.getProductCatalog({ page: 1, limit: 12 });
    console.log(homepage, products);
  } catch (error) {
    console.error('API Error:', error);
  }
}
```

## Available Hooks

### Homepage Content
```typescript
const { data, loading, error } = useHomepageContent();
// Returns: hero, featuredProducts, categories, newArrivals, stats
```

### Product Catalog
```typescript
const { data, loading, error } = useProductCatalog({ 
  page: 1, 
  limit: 12, 
  category: 'pooja-items' 
});
// Returns: { data: { products, filters }, pagination }
```

### Categories
```typescript
const { data: categories, loading, error } = useCategories();
// Returns: Category[]
```

### Category Page
```typescript
const { data, loading, error } = useCategoryPage('pooja-items', { page: 1 });
// Returns: { data: { category, products, breadcrumbs }, pagination }
```

### Product Details
```typescript
const { data: product, loading, error } = useProductDetails('product-id');
// Returns: Product with relatedProducts, breadcrumbs, seo data
```

### Search
```typescript
const { data, loading, error } = useProductSearch({ q: 'deepam', page: 1 });
// Returns: { data: { query, products, suggestions }, pagination, message }
```

### Debounced Search
```typescript
const { query, setQuery, data, loading } = useDebouncedSearch();
// Automatically debounces search queries
```

## API Service Methods

### Homepage & Content
- `getHomepageContent()` - Get homepage data
- `getNavigation()` - Get site navigation menu
- `getPublicStats()` - Get public statistics

### Products & Catalog
- `getProductCatalog(params)` - Get paginated product catalog
- `getProductDetails(productId)` - Get single product details
- `getRelatedProducts(productId, limit)` - Get related products
- `searchProducts(params)` - Search products

### Categories
- `getAllCategories()` - Get all categories
- `getCategoryPage(categoryId, params)` - Get category with products

### Collections
- `getNewArrivals(params)` - Get new arrivals
- `getFeaturedProducts(params)` - Get featured products

### Image Upload
- `uploadSingleImage(file)` - Upload single image
- `uploadMultipleImages(files)` - Upload multiple images

## Example Components

### Product List Component
```typescript
import React from 'react';
import { useProductCatalog, usePagination } from '../hooks/useApi';

const ProductList: React.FC = () => {
  const { page, limit, nextPage, prevPage } = usePagination();
  const { data, loading, error } = useProductCatalog({ page, limit });

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.data.products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3>{product.title}</h3>
            <img src={product.images[0]} alt={product.title} />
            <p>In Stock: {product.inStock ? 'Yes' : 'No'}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between mt-4">
        <button onClick={prevPage} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page} of {data?.pagination.totalPages}</span>
        <button 
          onClick={nextPage} 
          disabled={page === data?.pagination.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};
```

### Search Component
```typescript
import React from 'react';
import { useDebouncedSearch } from '../hooks/useApi';

const SearchComponent: React.FC = () => {
  const { query, setQuery, data, loading } = useDebouncedSearch();

  return (
    <div>
      <input
        type="text"
        placeholder="Search products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2 rounded"
      />
      
      {loading && <div>Searching...</div>}
      
      {data?.data && (
        <div>
          <p>Found {data.pagination.total} products for "{data.data.query}"</p>
          <div className="grid gap-4">
            {data.data.products.map(product => (
              <div key={product.id} className="border p-4">
                <h3>{product.title}</h3>
                <p>{product.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
```

### Image Upload Component
```typescript
import React from 'react';
import { useImageUpload } from '../hooks/useApi';

const ImageUploadComponent: React.FC = () => {
  const { uploadSingle, uploading, error } = useImageUpload();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadSingle(file);
      console.log('Uploaded:', result);
      // Use result.url or result.urls.thumbnail, etc.
    } catch (err) {
      console.error('Upload failed:', err);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        disabled={uploading}
      />
      {uploading && <div>Uploading...</div>}
      {error && <div>Error: {error}</div>}
    </div>
  );
};
```

## Error Handling

The API service includes built-in error handling:

```typescript
// Automatic error handling in hooks
const { data, loading, error } = useProductCatalog();

// Manual error handling with direct API calls
try {
  const data = await apiService.getProductCatalog();
} catch (error) {
  if (error instanceof ApiError) {
    console.log('API Error:', error.message, error.status);
  } else {
    console.log('Network Error:', error);
  }
}
```

## Environment Configuration

Set these environment variables in your `.env` file:

```bash
# Production API
VITE_API_BASE_URL=https://silver-website-backend.onrender.com/api/v1/customer
VITE_UPLOAD_BASE_URL=https://silver-website-backend.onrender.com/api/v1/upload

# Local development API
# VITE_API_BASE_URL=http://localhost:3000/api/v1/customer
# VITE_UPLOAD_BASE_URL=http://localhost:3000/api/v1/upload
```

## Best Practices

1. **Use hooks for component data** - They handle loading states and errors automatically
2. **Implement fallback data** - Always have local/static data as backup
3. **Handle loading states** - Show loading indicators for better UX
4. **Cache data when appropriate** - Consider using React Query for advanced caching
5. **Error boundaries** - Implement error boundaries for graceful error handling
6. **Optimize images** - Use appropriate image sizes (thumbnail, medium, large)
7. **Debounce search** - Use the useDebouncedSearch hook for search inputs

## Debugging

Enable debug logging by checking the browser console. All API calls are logged with:
- Request URL and parameters
- Response data or error details
- Performance timing

You can also check network requests in browser DevTools to see the actual API calls being made.
