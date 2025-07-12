import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import AuspiciousCalendar from './components/AuspiciousCalendar/AuspiciousCalendar';
import Enquiry from './pages/Enquiry/Enquiry';
import CategoryPage from './pages/CategoryPage/CategoryPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CatalogPage from './pages/CatalogPage/CatalogPage';
import CategoriesPage from './pages/CategoriesPage/CategoriesPage';
import CollectionPage from './pages/CollectionPage/CollectionPage';
import CollectionsIndexPage from './pages/CollectionsIndexPage/CollectionsIndexPage';
import LatestProductsPage from './pages/LatestProductsPage/LatestProductsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="calendar" element={<AuspiciousCalendar />} />
          <Route path="about" element={<div className="container mx-auto py-8 px-4">About Page</div>} />
          <Route path="catalog" element={<CatalogPage />} />
          <Route path="latest" element={<LatestProductsPage />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="collections" element={<CollectionsIndexPage />} />
          <Route path="collections/:collectionType" element={<CollectionPage />} />
          <Route path="products" element={<CategoriesPage />} />
          <Route path="products/:categoryId" element={<CategoryPage />} />
          <Route path="category/:slug" element={<CategoryPage />} />
          <Route path="category/:categorySlug/subcategory/:subcategorySlug" element={<CategoryPage />} />
          <Route path="product/:productId" element={<ProductPage />} />
          <Route path="weight-range" element={<div className="container mx-auto py-8 px-4">Weight Range</div>} />
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
    </BrowserRouter>
  );
}

export default App; 