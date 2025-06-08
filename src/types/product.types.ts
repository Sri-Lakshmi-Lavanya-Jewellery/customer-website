// Base type for any dimension detail
export interface DimensionDetails {
  length?: string;
  width?: string; // Changed from breadth for consistency if possible, or keep breadth
  height?: string;
  diameter?: string;
  thickness?: string;
  size?: string; // For general sizes like S, M, L, XL or numeric sizes
  weight?: string; // Weight specific to this dimension/size
  // Add any other specific dimension properties that might exist
}

// Represents a specific variant or SKU within a model, keyed by a dimension identifier (e.g., "dimensions1", "small", "6inch")
export type ModelDimensions = Record<string, DimensionDetails>;

// Represents a single product model, which has a name and a set of dimensions
export interface ProductModel {
  name?: string; // Optional name for the model itself, e.g., "Type 1 (Double Stand)"
  material?: string; // Material of this specific model, if it varies
  dimensions: ModelDimensions;
  // Add any other model-specific properties that might exist
}

// Product.models will be a collection of these ProductModel, keyed by a model identifier (e.g., "Model 1", "Type A")
export type ProductModels = Record<string, ProductModel>;

export interface Product {
  id: string;
  title: string;
  description?: string; 
  isNew?: boolean;
  images?: string[];
  category: string; // Aligning with productData.ts actual data
  subcategory: string; // Aligning with productData.ts actual data (assuming it's always present if used)
  weight?: string; 
  purity?: string;
  inStock: boolean;
  models?: ProductModels; // Use the more specific type
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  title: string;
  image: string;
  description: string;
  subcategories: Subcategory[];
}

// These might be more specific to UI presentation of ranges, might not be "core" product types.
// (Originally noted for ProductPage.tsx's getDimensionRange, now used in ProductModelSelection.tsx)
export interface DimensionRange {
  min: number;
  max: number;
  unit: string;
}

export interface DimensionRangeSet {
  length: DimensionRange | null;
  breadth: DimensionRange | null; // Or width
  weight: DimensionRange | null;
  height: DimensionRange | null;
}
