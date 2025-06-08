import { useState, useEffect, useMemo } from 'react';
import { products as allProducts, Product } from '../data/productData'; // Corrected path

// --- Dimension Interfaces and Helper Function ---
export interface Dimension {
  length?: string;
  breadth?: string;
  weight?: string;
  height?: string;
}

export interface DimensionRange {
  min: number;
  max: number;
  unit: string;
}

export interface DimensionRangeSet {
  length: DimensionRange | null;
  breadth: DimensionRange | null;
  weight: DimensionRange | null;
  height: DimensionRange | null;
}

const getDimensionRange = (modelData: Record<string, Dimension> | null | undefined): DimensionRangeSet | null => {
  if (!modelData) return null;

  const allDimensions = Object.values(modelData);
  if (allDimensions.length === 0) return null;

  const parseAndCollect = (prop: keyof Dimension): number[] =>
    allDimensions
      .map(dim => dim[prop] ? parseFloat(String(dim[prop]).replace(/[^\d.]/g, '')) : null)
      .filter((val): val is number => val !== null);

  const getUnit = (prop: keyof Dimension, defaultUnit: string): string => {
    for (const dim of allDimensions) {
      if (dim[prop]) return String(dim[prop]).replace(/[\d.]/g, '') || defaultUnit;
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
};

// --- Hook Definition ---
interface UseProductDetailsReturn {
  product: Product | null;
  loading: boolean;
  quantity: number;
  selectedModel: string;
  modelKeys: string[];
  selectedDimension: string;
  dimensionKeys: string[];
  currentModelData: Record<string, Dimension> | null;
  dimensionRangeSet: DimensionRangeSet | null;
  handleModelChange: (modelKey: string) => void;
  handleDimensionChange: (dimensionKey: string) => void;
  handleQuantityChange: (newQuantity: number) => void;
}

export const useProductDetails = (productId: string | undefined): UseProductDetailsReturn => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [modelKeys, setModelKeys] = useState<string[]>([]);
  const [selectedDimension, setSelectedDimension] = useState<string>('');
  const [dimensionKeys, setDimensionKeys] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true);
    if (productId) {
      const foundProduct = allProducts.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);

        if (foundProduct.models && Object.keys(foundProduct.models).length > 0) {
          const firstModelKey = Object.keys(foundProduct.models)[0];
          setModelKeys(Object.keys(foundProduct.models));
          setSelectedModel(firstModelKey);
          // Dimension initialization will be handled by the effect below, triggered by selectedModel change
        } else {
          setModelKeys([]);
          setSelectedModel('');
          setDimensionKeys([]);
          setSelectedDimension('');
        }
      } else {
        setProduct(null); // Product not found
      }
    } else {
      setProduct(null); // No productId
    }
    setLoading(false);
  }, [productId]);

  const currentModelData = useMemo(() => {
    if (product && product.models && selectedModel && product.models[selectedModel]) {
      return product.models[selectedModel] as Record<string, Dimension>;
    }
    return null;
  }, [product, selectedModel]);

  // Effect to update dimension keys and selected dimension when model changes (currentModelData changes)
  useEffect(() => {
    if (currentModelData) {
      const dimKeys = Object.keys(currentModelData);
      setDimensionKeys(dimKeys);
      setSelectedDimension(dimKeys.length > 0 ? dimKeys[0] : '');
    } else {
      setDimensionKeys([]);
      setSelectedDimension('');
    }
  }, [currentModelData]);

  const dimensionRangeSet = useMemo(() => {
    return getDimensionRange(currentModelData);
  }, [currentModelData]);

  const handleModelChange = (modelKey: string) => {
    setSelectedModel(modelKey);
    // Dimension keys and selected dimension will update via the useEffect watching currentModelData
  };

  const handleDimensionChange = (dimensionKey: string) => {
    setSelectedDimension(dimensionKey);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) { // Assuming max 10 for now
      setQuantity(newQuantity);
    } else if (newQuantity < 1) {
      setQuantity(1);
    }
  };

  return {
    product,
    loading,
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
};
