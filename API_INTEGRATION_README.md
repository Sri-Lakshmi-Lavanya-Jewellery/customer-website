# API Integration Implementation

This document explains the complete API integration implementation for the Silver Website catalog.

## 🎯 Overview

The API integration provides a centralized service layer to fetch product data from the backend API with automatic fallback to local data when the API is unavailable.

## 📁 File Structure

```
src/
├── services/
│   ├── api.ts                 # Main API service
│   └── API_USAGE_GUIDE.md    # Detailed usage guide
├── hooks/
│   └── useApi.ts             # React hooks for API calls
├── pages/
│   └── CatalogPage/
│       └── CatalogPage.tsx   # Full catalog with API integration
├── components/
│   └── Home/
│       └── Home.tsx          # Updated homepage with API
├── vite-env.d.ts             # TypeScript environment types
└── .env                      # Environment variables
```

## 🔧 Key Features

### 1. Centralized API Service (`src/services/api.ts`)
- **Complete API Implementation**: All endpoints from API_DOC.MD
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Comprehensive error handling with fallbacks
- **Environment Support**: Configurable for dev/production

### 2. React Hooks (`src/hooks/useApi.ts`)
- **Easy Integration**: Simple hooks for common API calls
- **Loading States**: Built-in loading and error state management
- **Automatic Refetch**: Smart dependency handling
- **Pagination Support**: Built-in pagination helpers
- **Debounced Search**: Search with automatic debouncing

### 3. Components with API Integration
- **Home Component**: Uses `useHomepageContent()` with fallback
- **Category Page**: Uses `useCategoryPage()` with pagination
- **Catalog Page**: Full product catalog with filters and search

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Copy environment variables
cp .env.example .env

# Update API URLs if needed
VITE_API_BASE_URL=https://silver-website-backend.onrender.com/api/v1/customer
VITE_UPLOAD_BASE_URL=https://silver-website-backend.onrender.com/api/v1/upload
```

### 2. Using in Components

#### Simple Data Fetching
```typescript
import { useHomepageContent } from '../hooks/useApi';

function HomePage() {
  const { data, loading, error } = useHomepageContent();
  
  if (loading) return <LoadingSpinner />;
  if (error) console.warn('API Error:', error); // Fallback to local data
  
  return <div>{data?.hero.title}</div>;
}
```

#### Product Catalog with Filters
```typescript
import { useProductCatalog, usePagination } from '../hooks/useApi';

function ProductList() {
  const { page, limit, nextPage, prevPage } = usePagination();
  const { data, loading, error } = useProductCatalog({ 
    page, 
    limit, 
    category: 'pooja-items' 
  });

  return (
    <div>
      {data?.data.products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      <Pagination 
        page={page} 
        totalPages={data?.pagination.totalPages} 
        onNext={nextPage} 
        onPrev={prevPage} 
      />
    </div>
  );
}
```

#### Search with Debouncing
```typescript
import { useDebouncedSearch } from '../hooks/useApi';

function SearchBox() {
  const { query, setQuery, data, loading } = useDebouncedSearch();
  
  return (
    <div>
      <input 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
      />
      {loading && <Spinner />}
      {data?.data.products.map(product => (
        <SearchResult key={product.id} product={product} />
      ))}
    </div>
  );
}
```

## 📊 API Endpoints Implemented

### Core Endpoints
- ✅ `GET /homepage` - Homepage content
- ✅ `GET /catalog` - Product catalog with filters
- ✅ `GET /categories` - All categories
- ✅ `GET /categories/:id` - Category with products
- ✅ `GET /products/:id` - Product details
- ✅ `GET /search` - Product search
- ✅ `GET /navigation` - Site navigation
- ✅ `GET /stats` - Public statistics

### Collections
- ✅ `GET /collections/new-arrivals` - New arrivals
- ✅ `GET /collections/featured` - Featured products

### Image Upload
- ✅ `POST /upload/image` - Single image upload
- ✅ `POST /upload/multiple-images` - Multiple image upload

## 🔄 Fallback Strategy

The implementation uses a graceful fallback strategy:

1. **Try API First**: Always attempt to fetch from API
2. **Fallback to Local Data**: If API fails, use local `productData.ts`
3. **Show Loading States**: User sees loading indicators
4. **Log Errors**: Errors are logged but don't break the UI
5. **Seamless Experience**: Users get data regardless of API status

```typescript
// Example fallback implementation
const categories = homepageData?.categories 
  ? homepageData.categories.map(apiCategory => transformApiData(apiCategory))
  : fallbackCategoryData.map(localCategory => transformLocalData(localCategory));
```

## 🎨 UI Components Updated

### Home Component (`src/components/Home/Home.tsx`)
- **API Integration**: Uses `useHomepageContent()`
- **Fallback Data**: Local data when API unavailable
- **Loading States**: Spinner during API calls
- **Statistics Display**: Shows API stats if available

### Category Page (`src/pages/CategoryPage/CategoryPage.tsx`)
- **API Integration**: Uses `useCategoryPage()`
- **Pagination**: Full pagination support for API data
- **Breadcrumbs**: Uses API breadcrumb data
- **Filter Integration**: Maintains existing filter functionality

### Catalog Page (`src/pages/CatalogPage/CatalogPage.tsx`)
- **Full API Integration**: Complete product catalog
- **Advanced Filters**: Category, sort, availability filters
- **Search**: Integrated debounced search
- **Pagination**: Full pagination with page numbers
- **Loading States**: Smooth loading indicators

## 🔍 Testing the Integration

### 1. Check API Connectivity
```bash
# Test API health
curl https://silver-website-backend.onrender.com/api/v1/customer/homepage

# Test local development
curl http://localhost:3000/api/v1/customer/homepage
```

### 2. Component Testing
- Navigate to `/` - Should load homepage with API data
- Navigate to `/catalog` - Should show product catalog
- Navigate to `/products/pooja-items` - Should show category page
- Use search functionality - Should show debounced search results

### 3. Fallback Testing
- Disconnect internet or set wrong API URL
- Components should still work with local data
- Check console for API error logs (should not break UI)

## 🐛 Troubleshooting

### Common Issues

1. **TypeScript Errors**
   ```bash
   # If you see import.meta.env errors
   # Make sure vite-env.d.ts is in src/ directory
   ```

2. **API CORS Issues**
   ```javascript
   // Check that API has CORS enabled for your domain
   // Check browser Network tab for CORS errors
   ```

3. **Environment Variables Not Loading**
   ```bash
   # Make sure .env is in project root
   # Variables must start with VITE_
   # Restart dev server after changing .env
   ```

4. **Hook Dependency Warnings**
   ```javascript
   // Make sure to include all dependencies in hook arrays
   // Use JSON.stringify for object dependencies
   ```

### Debug Tools

```javascript
// Add to any component for debugging
console.log('API Data:', data);
console.log('Loading:', loading);
console.log('Error:', error);

// Check network requests in browser DevTools
// API calls should show in Network tab
```

## 🚀 Production Deployment

### Environment Variables
```bash
# Production .env
VITE_API_BASE_URL=https://silver-website-backend.onrender.com/api/v1/customer
VITE_UPLOAD_BASE_URL=https://silver-website-backend.onrender.com/api/v1/upload
```

### Build Optimization
```bash
# Build for production
npm run build

# Check bundle size
npm run preview
```

### Performance Tips
1. **Image Optimization**: Use appropriate image sizes from API
2. **Lazy Loading**: Implement lazy loading for product images
3. **Caching**: Consider implementing React Query for advanced caching
4. **Error Boundaries**: Add error boundaries for graceful error handling

## 📈 Next Steps

### Potential Enhancements
1. **React Query Integration**: Advanced caching and sync
2. **Offline Support**: Service worker for offline functionality
3. **Image Lazy Loading**: Better performance for large product lists
4. **Advanced Search**: Filters, facets, autocomplete
5. **Real-time Updates**: WebSocket integration for live data
6. **Analytics**: Track user interactions and API performance

### API Extensions
1. **Wishlist**: Save favorite products
2. **Reviews**: Product ratings and reviews
3. **Recommendations**: ML-powered product suggestions
4. **Inventory**: Real-time stock updates
5. **Pricing**: Dynamic pricing and promotions

## 📝 Additional Resources

- **API Documentation**: See `API_DOC.MD` for complete API reference
- **Usage Guide**: See `src/services/API_USAGE_GUIDE.md` for detailed examples
- **Type Definitions**: Check `src/services/api.ts` for all TypeScript interfaces
- **React Hooks**: See `src/hooks/useApi.ts` for all available hooks

---

**Created by**: GitHub Copilot  
**Date**: June 28, 2025  
**Version**: 1.0.0
