import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, getCategoryById } from '../../data/productData'; // Data fetching functions
import { Product, Category } from '../../types/product.types'; // Centralized types
import ProductGallery from '../../components/ProductGallery/ProductGallery';
import Breadcrumbs from '../../components/ProductPage/Breadcrumbs';
import ProductInformation from '../../components/ProductPage/ProductInformation';
import ProductModelSelection from '../../components/ProductPage/ProductModelSelection';
import ProductActions from '../../components/ProductPage/ProductActions';
import ProductDescription from '../../components/ProductPage/ProductDescription';
import ProductCareInstructions from '../../components/ProductPage/ProductCareInstructions';
import RelatedProducts from '../../components/ProductPage/RelatedProducts';
import { Info } from 'lucide-react';

export default function ProductPage() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [category, setCategory] = useState<Category | null | undefined>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (productId) {
      setTimeout(() => { // Simulating data fetching
        const foundProduct: Product | undefined = products.find(p => p.id === productId);
        setProduct(foundProduct);
        if (foundProduct) {
          setCategory(getCategoryById(foundProduct.category)); // Use product.category
        } else {
          setCategory(null);
        }
        setLoading(false);
      }, 300); 
    } else {
      setProduct(undefined);
      setCategory(null);
      setLoading(false);
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Info className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Product Not Found</h1>
        <p className="text-gray-600 mb-6">
          Sorry, the product you are looking for does not exist or may have been moved.
        </p>
        <Link 
          to="/" 
          className="bg-gold-500 text-white py-2 px-6 rounded-lg hover:bg-gold-600 transition-colors font-medium"
        >
          Back to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs product={product} category={category} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12">
        <div className="lg:sticky lg:top-8 self-start">
          <ProductGallery images={product.images || []} title={product.title} />
        </div>

        <div className="flex flex-col">
          <ProductInformation product={product} />
          
          {product.models && Object.keys(product.models).length > 0 && (
            <ProductModelSelection 
              productModels={product.models}
            />
          )}
          
          <ProductActions product={product} />
          <ProductDescription product={product} />
          <ProductCareInstructions />
        </div>
      </div>

      <RelatedProducts />
    </div>
  );
}
