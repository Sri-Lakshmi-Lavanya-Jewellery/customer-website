import type { Product, Category, Subcategory } from '../services/api';

/**
 * Utility functions for handling product category and subcategory data
 */

/**
 * Get the category name from a product, handling both object and string formats
 */
export const getCategoryName = (product: Product): string => {
  if (typeof product.category === 'string') {
    return product.category;
  }
  return product.category?.name || 'Unknown Category';
};

/**
 * Get the category slug from a product, handling both object and string formats
 */
export const getCategorySlug = (product: Product): string => {
  if (typeof product.category === 'string') {
    return product.category.toLowerCase().replace(/\s+/g, '-');
  }
  return product.category?.slug || product.category?.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
};

/**
 * Get the category ID from a product
 */
export const getCategoryId = (product: Product): string | undefined => {
  if (typeof product.category === 'object' && product.category) {
    return product.category.id;
  }
  return undefined;
};

/**
 * Get the subcategory name from a product, handling both object and string formats
 */
export const getSubcategoryName = (product: Product): string | undefined => {
  if (!product.subcategory) return undefined;
  
  if (typeof product.subcategory === 'string') {
    return product.subcategory;
  }
  return product.subcategory?.name;
};

/**
 * Get the subcategory slug from a product, handling both object and string formats
 */
export const getSubcategorySlug = (product: Product): string | undefined => {
  if (!product.subcategory) return undefined;
  
  if (typeof product.subcategory === 'string') {
    return product.subcategory.toLowerCase().replace(/\s+/g, '-');
  }
  return product.subcategory?.slug || product.subcategory?.name?.toLowerCase().replace(/\s+/g, '-');
};

/**
 * Get the subcategory ID from a product
 */
export const getSubcategoryId = (product: Product): string | undefined => {
  if (typeof product.subcategory === 'object' && product.subcategory) {
    return product.subcategory.id;
  }
  return undefined;
};

/**
 * Generate breadcrumb items from a product
 */
export const generateProductBreadcrumbs = (product: Product) => {
  const breadcrumbs = [
    { name: 'Home', url: '/' },
    { name: 'Products', url: '/products' }
  ];

  const categoryName = getCategoryName(product);
  const categorySlug = getCategorySlug(product);
  
  breadcrumbs.push({
    name: categoryName,
    url: `/categories/${categorySlug}`
  });

  const subcategoryName = getSubcategoryName(product);
  const subcategorySlug = getSubcategorySlug(product);
  
  if (subcategoryName && subcategorySlug) {
    breadcrumbs.push({
      name: subcategoryName,
      url: `/categories/${categorySlug}/${subcategorySlug}`
    });
  }

  breadcrumbs.push({
    name: product.title,
    url: `/products/${product.id}`
  });

  return breadcrumbs;
};

/**
 * Check if a product belongs to a specific category
 */
export const productBelongsToCategory = (product: Product, categorySlug: string): boolean => {
  const productCategorySlug = getCategorySlug(product);
  return productCategorySlug === categorySlug;
};

/**
 * Check if a product belongs to a specific subcategory
 */
export const productBelongsToSubcategory = (product: Product, subcategorySlug: string): boolean => {
  const productSubcategorySlug = getSubcategorySlug(product);
  return productSubcategorySlug === subcategorySlug;
};

/**
 * Format category display text for UI
 */
export const formatCategoryDisplay = (product: Product): string => {
  const categoryName = getCategoryName(product);
  const subcategoryName = getSubcategoryName(product);
  
  if (subcategoryName) {
    return `${categoryName} > ${subcategoryName}`;
  }
  
  return categoryName;
};
