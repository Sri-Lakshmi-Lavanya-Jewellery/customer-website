import React from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../hooks/useApi';
import CategoryCard from '../../components/CategoryCard/CategoryCard';

const CategoriesPage: React.FC = () => {
  const { data: apiCategories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const categories = apiCategories || [];

  if (categoriesLoading) {
    return (
      <div className="container mx-auto py-24 px-4 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-gold-200 border-t-gold-600 rounded-full animate-spin mb-4" />
        <p className="text-charcoal-muted font-modern text-sm tracking-wide">Loading categories…</p>
      </div>
    );
  }

  if (categoriesError) {
    return (
      <div className="container mx-auto py-24 px-4 text-center">
        <h2 className="font-display text-2xl text-charcoal mb-2">Unable to load categories</h2>
        <p className="text-charcoal-muted font-modern mb-6">Please check your connection and try again.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gold-500 hover:bg-gold-600 text-white px-7 py-3 rounded-full font-modern text-xs font-semibold tracking-widest uppercase transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto py-12 md:py-16 px-4">

        {/* Header */}
        <div className="mb-12 text-center">
          <p className="text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase font-indian-serif text-gold-600 mb-3">
            Browse
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-light text-charcoal leading-tight">
            Shop by Category
          </h1>
          <p className="mt-3 text-sm text-charcoal-muted font-modern max-w-md mx-auto">
            Explore our collection of traditional silver & gold articles, organised to help you
            find exactly the right piece.
          </p>
          <div className="flex items-center gap-3 mt-4 justify-center">
            <div className="h-px w-10 bg-gold-300" />
            <span className="text-sm text-gold-500">✦</span>
            <div className="h-px w-10 bg-gold-300" />
          </div>
        </div>

        {/* Breadcrumb */}
        <nav className="mb-8 text-sm font-modern" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center">
            <li><Link to="/" className="text-charcoal-muted hover:text-gold-700 transition-colors">Home</Link></li>
            <li className="mx-2 text-gold-300">/</li>
            <li className="text-charcoal" aria-current="page">Categories</li>
          </ol>
        </nav>

        {/* Grid */}
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {categories.map((category) => {
              const slug = category.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
              return (
                <div key={category.id} className="group">
                  <CategoryCard
                    title={category.title || category.name}
                    image={category.image || '/assets/images/categories/silver-cover-1.png'}
                    description={category.description || 'Explore this category'}
                    link={`/category/${slug}`}
                  />

                  {/* Subcategory chips */}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {category.subcategories.slice(0, 4).map((subcategory) => {
                        const subSlug = subcategory.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
                        return (
                          <Link
                            key={subcategory.id}
                            to={`/category/${slug}/subcategory/${subSlug}`}
                            className="inline-flex items-center px-2.5 py-1 text-[11px] font-modern text-charcoal-light bg-gold-50 rounded-full hover:bg-gold-100 hover:text-gold-700 transition-colors border border-gold-100"
                          >
                            {subcategory.name}
                          </Link>
                        );
                      })}
                      {category.subcategories.length > 4 && (
                        <Link
                          to={`/category/${slug}`}
                          className="inline-flex items-center px-2.5 py-1 text-[11px] font-modern text-gold-700 bg-gold-50 rounded-full hover:bg-gold-100 transition-colors border border-gold-100"
                        >
                          +{category.subcategories.length - 4} more
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="font-display text-xl text-charcoal mb-2">No categories yet</h3>
            <p className="text-charcoal-muted font-modern">Categories will appear here once they are added.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
