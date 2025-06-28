# Customer-Facing API Documentation

**Base URL:** `https://silver-website-backend.onrender.com/api/v1/customer`

This API provides customer-facing endpoints optimized for website display, SEO, and user experience. These endpoints are designed to be used by frontend applications to display products, categories, and other content to website visitors.

## Overview

The Customer API is designed with the following principles:
- **SEO-friendly**: URLs and responses optimized for search engines
- **Performance**: Minimal data transfer with smart defaults
- **User Experience**: Structured data for easy frontend consumption
- **Caching-ready**: Responses designed for effective caching strategies

## Key Features

- 🏠 **Homepage Content**: Pre-structured data for homepage components
- 📱 **Responsive Pagination**: Optimized for both desktop and mobile
- 🔍 **Smart Search**: Intelligent search with suggestions
- 🗂️ **Category Navigation**: Hierarchical category browsing
- 🏷️ **Product Collections**: Curated product groupings
- 📊 **SEO Metadata**: Rich metadata for better search visibility
- 🍞 **Breadcrumbs**: Navigation context for better UX
- 📷 **Image Management**: Cloudinary-powered image uploads with automatic optimization
- 🌐 **CDN Delivery**: Fast global image delivery through Cloudinary CDN
- 🔧 **Multi-format Support**: Automatic WebP/AVIF conversion for modern browsers

## Authentication

**All customer endpoints are public** - no authentication required. These are designed for website visitors to browse products and content.

## Quick Start

### Test Server Health
```bash
GET /health
# Returns: {"status": "OK", "timestamp": "..."}
```

### Get Homepage Content
```bash
GET /api/v1/customer/homepage
```

## Homepage & Landing Pages

### 1. Homepage Content
```bash
GET /customer/homepage
```

**Response Structure:**
```json
{
  "success": true,
  "data": {
    "hero": {
      "title": "Discover Beautiful Traditional Items",
      "subtitle": "Handcrafted with love, delivered with care",
      "featuredImage": "/assets/images/hero-banner.jpg"
    },
    "featuredProducts": [...],
    "categories": [...],
    "newArrivals": [...],
    "stats": {
      "totalProducts": 150,
      "categoriesCount": 8
    }
  }
}
```

**Use Case:** Perfect for homepage components - hero section, featured products, category grid, and stats display.

## Product Catalog & Browsing

### 1. Product Catalog (Main Listing)
```bash
GET /customer/catalog?page=1&limit=12&category=pooja-items&sortBy=createdAt&sortOrder=desc
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Filter by category
- `subcategory` - Filter by subcategory
- `inStock` - Show only in-stock items (default: true)
- `search` - Search query
- `sortBy` - Sort field (createdAt, title)
- `sortOrder` - asc or desc (default: desc)

**Response:**
```json
{
  "success": true,
  "data": {
    "products": [...],
    "filters": {
      "categories": [...],
      "sortOptions": [
        {"value": "createdAt_desc", "label": "Newest First"},
        {"value": "title_asc", "label": "Name A-Z"}
      ]
    }
  },
  "pagination": {
    "page": 1,
    "limit": 12,
    "total": 150,
    "totalPages": 13
  }
}
```

## Category Navigation

### 1. All Categories
```bash
GET /customer/categories
```

### 2. Category Page with Products
```bash
GET /customer/categories/pooja-items?page=1&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": {
    "category": {
      "name": "Pooja Items",
      "description": "Traditional items for worship..."
    },
    "products": [...],
    "breadcrumbs": [
      {"name": "Home", "url": "/"},
      {"name": "Categories", "url": "/categories"},
      {"name": "Pooja Items", "url": "/categories/pooja-items"}
    ]
  },
  "pagination": {...}
}
```

## Product Details

### 1. Single Product Details
```bash
GET /customer/products/:productId
```

**Response:**
```json
{
  "success": true,
  "data": {
    "product": {
      "id": "...",
      "title": "Silver Kamakshi Deepam",
      "images": [...],
      "category": "pooja-items",
      "inStock": true,
      "models": {...}
    },
    "relatedProducts": [...],
    "breadcrumbs": [...],
    "seo": {
      "title": "Silver Kamakshi Deepam | Traditional Items Store",
      "description": "Beautiful traditional deepam...",
      "keywords": "pooja-items, kamakshi-deepam, traditional",
      "image": "/assets/images/products/deepam/1.jpg"
    }
  }
}
```

### 2. Related Products
```bash
GET /customer/products/:productId/related?limit=4
```

## Search Functionality

### 1. Product Search
```bash
GET /customer/search?q=deepam&page=1&limit=12
```

**Response:**
```json
{
  "success": true,
  "data": {
    "query": "deepam",
    "products": [...],
    "suggestions": []
  },
  "pagination": {...},
  "message": "Found 25 products for \"deepam\""
}
```

## Product Collections

### 1. New Arrivals
```bash
GET /customer/collections/new-arrivals?page=1&limit=12
```

### 2. Featured Products
```bash
GET /customer/collections/featured?page=1&limit=12
```

**Collection Response:**
```json
{
  "success": true,
  "data": {
    "title": "New Arrivals",
    "description": "Discover our latest collection...",
    "products": [...]
  },
  "pagination": {...}
}
```

## Navigation & Site Structure

### 1. Navigation Menu
```bash
GET /customer/navigation
```

**Response:**
```json
{
  "success": true,
  "data": {
    "main": [
      {"name": "Home", "url": "/"},
      {"name": "All Products", "url": "/catalog"},
      {"name": "New Arrivals", "url": "/collections/new-arrivals"},
      {
        "name": "Categories", 
        "url": "/categories",
        "children": [...]
      }
    ],
    "footer": [
      {"name": "About Us", "url": "/about"},
      {"name": "Contact", "url": "/contact"}
    ]
  }
}
```

## Statistics & Analytics

### 1. Public Statistics
```bash
GET /customer/stats
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalProducts": 150,
    "inStock": 142,
    "categories": 8,
    "newProducts": 25
  }
}
```

## Image Upload & Management

The API includes Cloudinary-powered image upload functionality for product images, category banners, and other visual content. The system supports both local storage (development) and Cloudinary (production) based on configuration.

### Image Upload Endpoints

#### 1. Upload Single Image
```bash
POST /api/v1/upload/image
Content-Type: multipart/form-data
```

**Form Data:**
- `image` - Image file (required)

**Supported Formats:** JPEG, PNG, GIF, WebP
**File Size Limit:** 10MB (Cloudinary) / 5MB (Local)

**Response:**
```json
{
  "success": true,
  "data": {
    "publicId": "product-1751234567890-123456789",
    "filename": "product-1751234567890-123456789.jpg",
    "originalName": "silver-bowl.jpg",
    "size": 2048576,
    "url": "https://res.cloudinary.com/yourcloud/image/upload/v1234567890/silverwebsite/products/product-1751234567890-123456789.jpg",
    "urls": {
      "thumbnail": "https://res.cloudinary.com/.../w_200,h_200,c_fill/product-1751234567890-123456789.jpg",
      "medium": "https://res.cloudinary.com/.../w_500,h_500,c_limit/product-1751234567890-123456789.jpg",
      "large": "https://res.cloudinary.com/.../w_1000,h_1000,c_limit/product-1751234567890-123456789.jpg",
      "original": "https://res.cloudinary.com/.../q_auto,f_auto/product-1751234567890-123456789.jpg"
    },
    "cloudinary": true
  },
  "message": "Image uploaded successfully"
}
```

#### 2. Upload Multiple Images
```bash
POST /api/v1/upload/multiple-images
Content-Type: multipart/form-data
```

**Form Data:**
- `images` - Array of image files (max 10 files)

**Response:**
```json
{
  "success": true,
  "data": {
    "images": [
      {
        "publicId": "product-1751234567890-123456789",
        "filename": "product-1751234567890-123456789.jpg",
        "originalName": "silver-bowl.jpg",
        "size": 2048576,
        "url": "https://res.cloudinary.com/.../product-1751234567890-123456789.jpg",
        "urls": {
          "thumbnail": "...",
          "medium": "...",
          "large": "...",
          "original": "..."
        },
        "cloudinary": true
      }
    ],
    "count": 1
  },
  "message": "1 images uploaded successfully"
}
```

### Image Optimization Features

When using Cloudinary (production mode), images are automatically optimized:

1. **Auto-Quality**: Intelligent quality adjustment based on content
2. **Auto-Format**: Automatic format selection (WebP, AVIF when supported)
3. **Responsive Sizes**: Multiple sizes generated automatically
4. **Compression**: Lossless compression applied
5. **CDN Delivery**: Global CDN for fast image loading

### Image URL Formats

#### Cloudinary URLs (Production)
```javascript
// Original image
https://res.cloudinary.com/yourcloud/image/upload/v1234567890/silverwebsite/products/product-123.jpg

// Optimized thumbnail (200x200, cropped)
https://res.cloudinary.com/yourcloud/image/upload/w_200,h_200,c_fill/v1234567890/silverwebsite/products/product-123.jpg

// Medium size (500x500, fit within bounds)
https://res.cloudinary.com/yourcloud/image/upload/w_500,h_500,c_limit/v1234567890/silverwebsite/products/product-123.jpg

// Auto-optimized (quality and format)
https://res.cloudinary.com/yourcloud/image/upload/q_auto,f_auto/v1234567890/silverwebsite/products/product-123.jpg
```

#### Local URLs (Development)
```javascript
// All sizes point to the same local file
http://localhost:3000/assets/images/product-1751234567890-123456789.jpg
```

### Upload Examples

#### JavaScript/Frontend Upload
```javascript
// Single image upload
const uploadSingleImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);

  try {
    const response = await fetch('/api/v1/upload/image', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.success) {
      console.log('Image uploaded:', result.data.url);
      console.log('Available sizes:', result.data.urls);
      return result.data;
    }
  } catch (error) {
    console.error('Upload failed:', error);
  }
};

// Multiple images upload
const uploadMultipleImages = async (files) => {
  const formData = new FormData();
  files.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch('/api/v1/upload/multiple-images', {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    return result.data.images;
  } catch (error) {
    console.error('Upload failed:', error);
  }
};
```

#### cURL Examples
```bash
# Upload single image
curl -X POST \
  http://localhost:3000/api/v1/upload/image \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@/path/to/your/image.jpg'

# Upload multiple images
curl -X POST \
  http://localhost:3000/api/v1/upload/multiple-images \
  -H 'Content-Type: multipart/form-data' \
  -F 'images=@/path/to/image1.jpg' \
  -F 'images=@/path/to/image2.jpg'
```

### Configuration

The image upload system uses environment variables for configuration:

```bash
# Cloudinary Configuration (Production)
USE_CLOUDINARY=true
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Local Storage (Development)
USE_CLOUDINARY=false
```

### Best Practices

1. **Image Sizes**: Use appropriate image sizes for different contexts
   - `thumbnail` (200x200): Product grids, search results
   - `medium` (500x500): Product detail modals, category pages
   - `large` (1000x1000): Full-screen product views
   - `original`: High-quality downloads, zoom functionality

2. **Performance**: Always use the smallest appropriate size for better loading times

3. **Responsive Images**: Use different sizes for different screen sizes:
   ```html
   <img 
     src="/api/v1/upload/image-medium.jpg" 
     srcset="/api/v1/upload/image-large.jpg 1000w, 
             /api/v1/upload/image-medium.jpg 500w,
             /api/v1/upload/image-thumbnail.jpg 200w"
     sizes="(max-width: 500px) 200px, (max-width: 1000px) 500px, 1000px"
     alt="Product image"
   />
   ```

4. **Error Handling**: Always handle upload errors gracefully:
   ```javascript
   if (!result.success) {
     switch(response.status) {
       case 400:
         alert('Invalid file type or size');
         break;
       case 413:
         alert('File too large');
         break;
       default:
         alert('Upload failed, please try again');
     }
   }
   ```

## Frontend Implementation Guide

### 1. Homepage Implementation
```javascript
// Fetch homepage data
const getHomepageData = async () => {
  const response = await fetch('/api/v1/customer/homepage');
  const data = await response.json();
  
  // Use data.hero for hero section
  // Use data.featuredProducts for featured grid
  // Use data.categories for category navigation
  // Use data.newArrivals for new arrivals section
  
  return data;
};
```

### 2. Product Catalog with Filters
```javascript
// Product listing with filters and pagination
const getProductCatalog = async (filters = {}) => {
  const params = new URLSearchParams({
    page: filters.page || 1,
    limit: filters.limit || 12,
    ...filters
  });
  
  const response = await fetch(`/api/v1/customer/catalog?${params}`);
  const data = await response.json();
  
  return {
    products: data.data.products,
    pagination: data.pagination,
    filters: data.data.filters
  };
};
```

### 3. Category Navigation
```javascript
// Build category navigation menu
const getCategoryNavigation = async () => {
  const response = await fetch('/api/v1/customer/navigation');
  const data = await response.json();
  
  return data.data.main.find(item => item.name === 'Categories');
};
```

### 4. Product Search
```javascript
// Search with debouncing
const searchProducts = async (query, page = 1) => {
  if (query.length < 2) return { products: [], pagination: {} };
  
  const params = new URLSearchParams({
    q: query,
    page,
    limit: 12
  });
  
  const response = await fetch(`/api/v1/customer/search?${params}`);
  return response.json();
};
```

### 5. Product Details Page
```javascript
// Get product details with SEO data
const getProductDetails = async (productId) => {
  const response = await fetch(`/api/v1/customer/products/${productId}`);
  const data = await response.json();
  
  // Use data.product for product display
  // Use data.relatedProducts for "You might also like"
  // Use data.seo for meta tags
  // Use data.breadcrumbs for navigation
  
  return data.data;
};
```

### 6. Image Upload Component (React)
```javascript
// React Image Upload Component
import React, { useState } from 'react';

const ImageUpload = ({ onUploadSuccess, multiple = false }) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (files) => {
    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    
    if (multiple) {
      Array.from(files).forEach(file => {
        formData.append('images', file);
      });
    } else {
      formData.append('image', files[0]);
    }

    try {
      const endpoint = multiple ? '/api/v1/upload/multiple-images' : '/api/v1/upload/image';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        onUploadSuccess(multiple ? result.data.images : result.data);
      } else {
        alert('Upload failed: ' + result.message);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="image-upload">
      <input
        type="file"
        accept="image/*"
        multiple={multiple}
        onChange={(e) => handleFileUpload(e.target.files)}
        disabled={uploading}
        style={{ marginBottom: '10px' }}
      />
      
      {uploading && (
        <div className="upload-progress">
          <p>Uploading...</p>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Usage Example
const ProductForm = () => {
  const [productImages, setProductImages] = useState([]);

  const handleImageUpload = (uploadedImages) => {
    if (Array.isArray(uploadedImages)) {
      setProductImages([...productImages, ...uploadedImages]);
    } else {
      setProductImages([...productImages, uploadedImages]);
    }
  };

  return (
    <div>
      <h3>Upload Product Images</h3>
      <ImageUpload 
        multiple={true} 
        onUploadSuccess={handleImageUpload} 
      />
      
      <div className="image-preview">
        {productImages.map((image, index) => (
          <div key={index} className="image-item">
            <img 
              src={image.urls.thumbnail} 
              alt={image.originalName}
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
            <p>{image.originalName}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

## SEO Optimization Features

### 1. Meta Tags & Social Sharing
Each product and category endpoint includes SEO metadata:
- Page title optimized for search engines
- Meta description with key information
- Keywords for better categorization
- Open Graph image for social sharing

### 2. Breadcrumb Navigation
All pages include breadcrumb data for:
- Better user navigation
- Search engine understanding
- Rich snippets in search results

### 3. Structured URLs
Clean, SEO-friendly URL patterns:
- `/categories/pooja-items`
- `/products/silver-kamakshi-deepam`
- `/collections/new-arrivals`

## Performance Recommendations

### 1. Caching Strategy
- Cache category lists for 1 hour
- Cache product lists for 15 minutes
- Cache individual products for 30 minutes
- Cache navigation menu for 24 hours

### 2. Image Optimization
- Use Cloudinary's automatic optimization features (q_auto, f_auto)
- Implement lazy loading for product images
- Use appropriate image sizes for different screen sizes
- Leverage Cloudinary's CDN for faster global delivery
- Use responsive images with srcset for different screen densities
- Enable browser caching for Cloudinary URLs (automatically handled)
- Consider using WebP format for modern browsers (automatic with f_auto)

### 3. Pagination Best Practices
- Use reasonable page sizes (12-24 items)
- Implement infinite scroll or load more buttons
- Show total count and page numbers

## Error Handling

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Product not found"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `400` - Bad Request (invalid parameters)
- `404` - Resource not found
- `500` - Server error

## Rate Limiting

Customer API endpoints are designed for high traffic but implement reasonable rate limiting:
- 1000 requests per hour per IP
- Burst limit of 100 requests per minute

## Example Website Structure

Here's how you might structure your website using these endpoints:

```
Homepage (/) → GET /customer/homepage
├── Product Catalog (/catalog) → GET /customer/catalog
├── Categories (/categories) → GET /customer/categories
│   └── Category Page (/categories/pooja-items) → GET /customer/categories/pooja-items
├── Product Details (/products/:id) → GET /customer/products/:id
├── Search Results (/search) → GET /customer/search
└── Collections
    ├── New Arrivals (/collections/new-arrivals) → GET /customer/collections/new-arrivals
    └── Featured (/collections/featured) → GET /customer/collections/featured
```

## Development Tips

### 1. Environment Variables
```bash
# Set appropriate base URL for your environment
REACT_APP_API_BASE_URL=http://localhost:3000/api/v1/customer
```

### 2. Error Boundaries
Implement proper error handling for network failures:
```javascript
try {
  const data = await fetch('/api/v1/customer/homepage');
  // Handle success
} catch (error) {
  // Handle network errors
  console.error('Failed to load homepage data:', error);
}
```

### 3. Loading States
Always show loading indicators while fetching data:
```javascript
const [loading, setLoading] = useState(true);
const [data, setData] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/v1/customer/homepage');
      const result = await response.json();
      setData(result.data);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
```

## Testing the API

You can test all endpoints using curl:

```bash
# Homepage content
curl http://localhost:3000/api/v1/customer/homepage

# Product catalog
curl "http://localhost:3000/api/v1/customer/catalog?page=1&limit=5"

# Category page
curl http://localhost:3000/api/v1/customer/categories/pooja-items

# Product details
curl http://localhost:3000/api/v1/customer/products/PRODUCT_ID

# Search
curl "http://localhost:3000/api/v1/customer/search?q=deepam"

# Navigation menu
curl http://localhost:3000/api/v1/customer/navigation

# Statistics
curl http://localhost:3000/api/v1/customer/stats

# Upload single image
curl -X POST \
  http://localhost:3000/api/v1/upload/image \
  -H 'Content-Type: multipart/form-data' \
  -F 'image=@/path/to/your/image.jpg'

# Upload multiple images
curl -X POST \
  http://localhost:3000/api/v1/upload/multiple-images \
  -H 'Content-Type: multipart/form-data' \
  -F 'images=@/path/to/image1.jpg' \
  -F 'images=@/path/to/image2.jpg'
```

---

**Need Help?** 
- Check the main API documentation in `API_DOCUMENTATION.md` for admin endpoints
- Review `FRONTEND_API_GUIDE.md` for detailed API usage examples
- Contact the development team for implementation support
