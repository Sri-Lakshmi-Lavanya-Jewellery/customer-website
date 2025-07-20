import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories, usePublicStats } from '../../hooks/useApi';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { Crown } from 'lucide-react';

const CategoriesPage: React.FC = () => {
  const { data: apiCategories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { data: stats, loading: statsLoading } = usePublicStats();

  // Use API data directly - no fallbacks
  const categories = apiCategories || [];

  if (categoriesLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="text-center">
          <div className="flex flex-col items-center justify-center min-h-[400px]">
            <Crown className="w-12 h-12 text-yellow-500 mb-4 animate-pulse" />
            <div className="flex space-x-1 mb-4">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
            <p className="text-gray-600">Loading categories...</p>
          </div>
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="bg-white rounded-lg shadow-sm border p-8 mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Product Categories</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our diverse collection of traditional silver and gold items, organized by category to help you find exactly what you're looking for.
          </p>
        </div>

        {/* Statistics Section */}
        {stats && !statsLoading && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm border p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Collection</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-yellow-50 rounded-lg p-4 shadow-sm border border-yellow-200">
                  <h3 className="text-3xl font-bold text-yellow-600">{stats.totalProducts}</h3>
                  <p className="text-gray-600 font-medium">Total Products</p>
                </div>
                <div className="bg-blue-50 rounded-lg p-4 shadow-sm border border-blue-200">
                  <h3 className="text-3xl font-bold text-blue-600">{stats.categoriesCount}</h3>
                  <p className="text-gray-600 font-medium">Categories</p>
                </div>
                {stats.inStock && (
                  <div className="bg-green-50 rounded-lg p-4 shadow-sm border border-green-200">
                    <h3 className="text-3xl font-bold text-green-600">{stats.inStock}</h3>
                    <p className="text-gray-600 font-medium">In Stock</p>
                  </div>
                )}
                {stats.newProducts && (
                  <div className="bg-purple-50 rounded-lg p-4 shadow-sm border border-purple-200">
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
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {categories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
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
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Subcategories:</h4>
                        <div className="flex flex-wrap gap-2">
                          {category.subcategories.slice(0, 6).map((subcategory) => {
                            const subcategorySlug = subcategory.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                            return (
                              <Link
                                key={subcategory.id}
                                to={`/category/${slug}/subcategory/${subcategorySlug}`}
                                className="inline-flex items-center px-3 py-1 text-xs font-medium bg-white text-gray-700 rounded-full hover:bg-yellow-50 hover:text-yellow-700 transition-colors border border-gray-300"
                              >
                                {subcategory.name}
                              </Link>
                            );
                          })}
                          {category.subcategories.length > 6 && (
                            <Link
                              to={`/category/${slug}`}
                              className="inline-flex items-center px-3 py-1 text-xs font-medium bg-yellow-50 text-yellow-700 rounded-full hover:bg-yellow-100 transition-colors border border-yellow-200"
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
          ) : (
            /* Empty State */
            <div className="text-center py-16">
              <div className="mb-6">
                <Crown className="w-16 h-16 text-gray-400 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No categories available</h3>
              <p className="text-gray-500">Categories will be displayed here once they are added.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
