import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

// Home is eager (it's the landing route); every other page is lazy-loaded so the
// initial download is small and a route's code is fetched only when visited.
const AuspiciousCalendar = React.lazy(() => import('./components/AuspiciousCalendar/AuspiciousCalendar'));
const Enquiry = React.lazy(() => import('./pages/Enquiry/Enquiry'));
const CategoryPage = React.lazy(() => import('./pages/CategoryPage/CategoryPage'));
const ProductPage = React.lazy(() => import('./pages/ProductPage/ProductPage'));
const CatalogPage = React.lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CategoriesPage = React.lazy(() => import('./pages/CategoriesPage/CategoriesPage'));
const CollectionPage = React.lazy(() => import('./pages/CollectionPage/CollectionPage'));
const CollectionsIndexPage = React.lazy(() => import('./pages/CollectionsIndexPage/CollectionsIndexPage'));
const LatestProductsPage = React.lazy(() => import('./pages/LatestProductsPage/LatestProductsPage'));
const About = React.lazy(() => import('./pages/About/About'));
const WeightRange = React.lazy(() => import('./pages/WeightRange/WeightRange'));

function RouteFallback() {
  return (
    <div className="container mx-auto py-16 px-4 flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-600"></div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="calendar" element={<AuspiciousCalendar />} />
              <Route path="about" element={<About />} />
              <Route path="products" element={<CatalogPage />} />
              <Route path="latest" element={<LatestProductsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="collections" element={<CollectionsIndexPage />} />
              <Route path="collections/:collectionType" element={<CollectionPage />} />
              <Route path="category/:slug" element={<CategoryPage />} />
              <Route path="category/:categorySlug/subcategory/:subcategorySlug" element={<CategoryPage />} />
              <Route path="product/:productId" element={<ProductPage />} />
              <Route path="weight-range" element={<WeightRange />} />
              <Route path="enquiry" element={<Enquiry />} />
              <Route path="orders" element={<div className="container mx-auto py-8 px-4">New Orders</div>} />
              <Route path="*" element={
                <div className="container mx-auto py-8 px-4">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">404: Page Not Found</h1>
                  <p className="text-gray-600">The page you're looking for doesn't exist.</p>
                </div>
              } />
            </Route>
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
