export interface Product {
  id: string;
  title: string;
  isNew?: boolean;
  images?: string[]; // Common/default images
  commonImages?: string[]; // Explicit common images that show when no dimension-specific images
  category: string;
  subcategory: string;
  weight?: string;
  purity?: string;
  inStock: boolean;
  models?: any;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  description: string;
  slug: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}