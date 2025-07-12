import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories, usePublicStats } from '../../hooks/useApi';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

const CategoriesPage: React.FC = () => {
  const { data: apiCategories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: stats, loading: statsLoading } = usePublicStats();

  // Use API data directly - no fallbacks
  const categories = apiCategories || [];

  if (categoriesLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Unable to Load Categories</h2>
          <p className="text-gray-600 mb-4">There was an error loading the categories.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Categories</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Explore our diverse collection of traditional silver items, organized by category to help you find exactly what you're looking for.
        </p>
      </div>

      {/* Statistics Section */}
      {stats && !statsLoading && (
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Collection</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-3xl font-bold text-blue-600">{stats.totalProducts}</h3>
                <p className="text-gray-600 font-medium">Total Products</p>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="text-3xl font-bold text-green-600">{stats.categoriesCount}</h3>
                <p className="text-gray-600 font-medium">Categories</p>
              </div>
              {stats.inStock && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-3xl font-bold text-emerald-600">{stats.inStock}</h3>
                  <p className="text-gray-600 font-medium">In Stock</p>
                </div>
              )}
              {stats.newProducts && (
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <h3 className="text-3xl font-bold text-purple-600">{stats.newProducts}</h3>
                  <p className="text-gray-600 font-medium">New Arrivals</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li className="flex items-center">
            <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span className="text-gray-800 font-medium">Categories</span>
          </li>
        </ol>
      </nav>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
        {categories.map((category) => {
          // Create slug from category name if not provided
          const slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
          return (
            <div key={category.id} className="group">
              <CategoryCard
                title={category.title || category.name}
                image={category.image || '/assets/images/categories/silver-cover-1.png'}
                description={category.description || 'Explore this category'}
                link={`/category/${slug}`}
              />
              
              {/* Subcategories */}
              {category.subcategories && category.subcategories.length > 0 && (
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Subcategories:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.subcategories.slice(0, 6).map((subcategory) => {
                      const subcategorySlug = subcategory.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                      return (
                        <Link
                          key={subcategory.id}
                          to={`/category/${slug}/subcategory/${subcategorySlug}`}
                          className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors border"
                        >
                          {subcategory.name}
                        </Link>
                      );
                    })}
                    {category.subcategories.length > 6 && (
                      <Link
                        to={`/category/${slug}`}
                        className="inline-flex items-center px-3 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full hover:bg-blue-200 transition-colors"
                      >
                        +{category.subcategories.length - 6} more
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Explore More</h2>
        <p className="text-gray-600 mb-6">Can't find what you're looking for? Try these options</p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/catalog"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Browse All Products
          </Link>
          
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 0v1m-2 0V6a2 2 0 00-2 0v1m2 0V9.5m0 0v3m0-3h9m-9 0H3" />
            </svg>
            New Arrivals
          </Link>
          
          <Link
            to="/collections/featured"
            className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            Featured Items
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
