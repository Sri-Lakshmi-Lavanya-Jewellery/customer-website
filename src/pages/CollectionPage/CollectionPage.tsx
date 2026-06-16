import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useNewArrivals, useFeaturedProducts, usePagination } from '../../hooks/useApi';
import ProductCard from '../../components/ProductCard/ProductCard';
import { ArrowRight, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

type CollectionType = 'new-arrivals' | 'featured' | 'trending' | 'in-stock';

const collectionMeta: Record<string, { title: string; eyebrow: string; description: string }> = {
  'new-arrivals': {
    title: 'New Arrivals',
    eyebrow: 'Fresh Designs',
    description: 'The latest additions to our silver catalogue — designs you haven\'t seen before.',
  },
  'featured': {
    title: 'Featured Collection',
    eyebrow: 'Handpicked by Our Artisans',
    description: 'Premium silver pieces curated for exceptional craftsmanship and design.',
  },
  'trending': {
    title: 'Trending Now',
    eyebrow: 'Most Loved',
    description: 'Our most popular silver pieces this season — loved by thousands of customers.',
  },
  'in-stock': {
    title: 'In Stock',
    eyebrow: 'Ready to Ship',
    description: 'Available for immediate delivery. BIS hallmarked and ready.',
  },
};

const CollectionPage: React.FC = () => {
  const { collectionType } = useParams<{ collectionType: CollectionType }>();
  const { page, limit, nextPage, prevPage, goToPage, changeLimit } = usePagination(1, 12);
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showFilters, setShowFilters] = useState(false);

  const isNewArrivals = collectionType === 'new-arrivals';
  // Skip the collection we're NOT viewing so only one request fires.
  const newData = useNewArrivals({ page, limit, sortBy, sortOrder }, !isNewArrivals);
  const featuredData = useFeaturedProducts({ page, limit, sortBy, sortOrder }, isNewArrivals);
  const { data, loading } = isNewArrivals ? newData : featuredData;

  const meta = collectionMeta[collectionType || 'new-arrivals'];
  const products = data?.data?.products || [];
  const pagination = data?.pagination;

  const handleSort = (val: string) => {
    const [sb, so] = val.split('_');
    setSortBy(sb);
    setSortOrder(so as 'asc' | 'desc');
    goToPage(1);
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ── Page header ── */}
      <section className="bg-gray-950 pt-14 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-mandala" />
        <div className="relative z-10 container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-modern mb-6">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <span>/</span>
            <Link to="/collections" className="hover:text-gold-400 transition-colors">Collections</Link>
            <span>/</span>
            <span className="text-gray-300">{meta.title}</span>
          </nav>

          <p className="text-gold-400 text-xs font-semibold tracking-[0.3em] uppercase font-indian-serif mb-3">
            {meta.eyebrow}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-white mb-4">{meta.title}</h1>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10 bg-gold-400/40" />
            <span className="text-gold-500">✦</span>
            <div className="h-px w-10 bg-gold-400/40" />
          </div>
          <p className="text-gray-400 font-modern text-sm max-w-lg">{meta.description}</p>
        </div>
      </section>

      {/* ── Tab switcher ── */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-30 shadow-sm">
        <div className="container mx-auto px-4 flex items-center justify-between gap-4 py-3">
          {/* Collection tabs */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-none">
            {Object.entries(collectionMeta).map(([id, { title }]) => (
              <Link
                key={id}
                to={`/collections/${id}`}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold font-modern transition-all duration-200 ${
                  collectionType === id
                    ? 'bg-gold-500 text-white'
                    : 'text-gray-500 hover:text-gold-600 hover:bg-gold-50'
                }`}
              >
                {title}
              </Link>
            ))}
          </div>

          {/* Sort + filter */}
          <div className="flex items-center gap-3 shrink-0">
            {pagination && (
              <span className="text-xs text-gray-400 font-modern hidden md:block">
                {pagination.total} items
              </span>
            )}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-1.5 text-xs text-gray-600 hover:text-gold-600 font-modern transition-colors border border-gray-200 rounded-full px-3 py-1.5"
            >
              <SlidersHorizontal size={12} /> Sort
            </button>
          </div>
        </div>

        {/* Sort dropdown */}
        {showFilters && (
          <div className="bg-white border-t border-gray-100 px-4 py-3">
            <div className="container mx-auto flex flex-wrap gap-2">
              {[
                { val: 'createdAt_desc', label: 'Newest First' },
                { val: 'createdAt_asc', label: 'Oldest First' },
                { val: 'title_asc', label: 'Name A–Z' },
                { val: 'title_desc', label: 'Name Z–A' },
              ].map(({ val, label }) => (
                <button
                  key={val}
                  onClick={() => { handleSort(val); setShowFilters(false); }}
                  className={`px-4 py-1.5 rounded-full text-xs font-modern transition-all ${
                    `${sortBy}_${sortOrder}` === val
                      ? 'bg-gold-500 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gold-50 hover:text-gold-700'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Products ── */}
      <div className="container mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map(p => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  image={p.images?.[0] || (p as any).commonImages?.[0]}
                  isNew={p.isNewProduct || (p as any).isNew}
                  link={`/product/${p.id}`}
                />
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-14">
                <button
                  onClick={prevPage}
                  disabled={page === 1}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gold-400 hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                    .filter(n => n === 1 || n === pagination.totalPages || Math.abs(n - page) <= 1)
                    .reduce<(number | '…')[]>((acc, n, i, arr) => {
                      if (i > 0 && typeof arr[i - 1] === 'number' && n - (arr[i - 1] as number) > 1)
                        acc.push('…');
                      acc.push(n);
                      return acc;
                    }, [])
                    .map((n, i) =>
                      n === '…' ? (
                        <span key={`e${i}`} className="text-gray-400 text-sm px-1">…</span>
                      ) : (
                        <button
                          key={n}
                          onClick={() => goToPage(n as number)}
                          className={`w-9 h-9 rounded-full text-xs font-semibold font-modern transition-all ${
                            page === n
                              ? 'bg-gold-500 text-white shadow-gold'
                              : 'text-gray-600 hover:bg-gold-50 hover:text-gold-700'
                          }`}
                        >
                          {n}
                        </button>
                      )
                    )}
                </div>

                <button
                  onClick={nextPage}
                  disabled={page === pagination.totalPages}
                  className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gold-400 hover:text-gold-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-24">
            <p className="font-display text-3xl font-light text-gray-300 mb-3">No items found</p>
            <p className="text-gray-400 text-sm font-modern mb-8">Check back soon or browse all products.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-full transition-all font-modern"
            >
              Browse All <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
