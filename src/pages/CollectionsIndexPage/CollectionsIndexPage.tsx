import React from 'react';
import { Link } from 'react-router-dom';
import { usePublicStats } from '../../hooks/useApi';
import { ArrowRight, Sparkles, Star, Package, TrendingUp, Folder, Search, MessageCircle } from 'lucide-react';

const collections = [
  {
    id: 'new-arrivals',
    label: 'Fresh Designs',
    title: 'New Arrivals',
    description: 'The latest additions to our silver catalogue — designs you haven\'t seen before.',
    accent: 'text-gold-600',
    bg: 'bg-[#1a1410]',
    border: 'border-gold-800/30',
    icon: Sparkles,
    gradient: 'from-gold-900/40 to-transparent',
    tag: 'Just In',
    tagColor: 'bg-gold-500',
  },
  {
    id: 'featured',
    label: 'Handpicked',
    title: 'Featured',
    description: 'Curated by our artisans — the best of our silver craftsmanship, selected for you.',
    accent: 'text-silver-300',
    bg: 'bg-[#131820]',
    border: 'border-blue-900/30',
    icon: Star,
    gradient: 'from-blue-900/40 to-transparent',
    tag: 'Editor\'s Pick',
    tagColor: 'bg-silver-500',
  },
  {
    id: 'trending',
    label: 'Most Loved',
    title: 'Trending',
    description: 'What everyone is wearing right now — our most popular silver pieces this season.',
    accent: 'text-rose-400',
    bg: 'bg-[#1a1015]',
    border: 'border-rose-900/30',
    icon: TrendingUp,
    gradient: 'from-rose-900/40 to-transparent',
    tag: 'Trending',
    tagColor: 'bg-rose-500',
  },
  {
    id: 'in-stock',
    label: 'Ready to Ship',
    title: 'In Stock',
    description: 'Available for immediate delivery. Genuine 925 silver, hallmarked and ready.',
    accent: 'text-emerald-400',
    bg: 'bg-[#0f1a14]',
    border: 'border-emerald-900/30',
    icon: Package,
    gradient: 'from-emerald-900/40 to-transparent',
    tag: 'Ready to Ship',
    tagColor: 'bg-emerald-600',
  },
];

const CollectionsIndexPage: React.FC = () => {
  const { data: stats } = usePublicStats();

  const counts: Record<string, string | number> = {
    'new-arrivals': stats?.newProducts || '—',
    'featured': '—',
    'trending': stats?.totalProducts ? Math.round(Number(stats.totalProducts) * 0.4) : '—',
    'in-stock': stats?.inStock || '—',
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ── Page hero ── */}
      <section className="bg-gray-950 pt-16 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-rangoli-bg" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-gold-400 text-xs font-semibold tracking-[0.35em] uppercase font-indian-serif mb-3">
            Curated For You
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-light text-white mb-4 leading-tight">
            Our Collections
          </h1>
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-gold-400/40" />
            <span className="text-gold-500 text-lg">✦</span>
            <div className="h-px w-12 bg-gold-400/40" />
          </div>
          <p className="text-gray-400 font-modern text-sm md:text-base max-w-xl mx-auto">
            Every piece in our collections is crafted from BIS-hallmarked 925 silver
            by skilled artisans who honour tradition in every detail.
          </p>
        </div>
      </section>

      {/* ── Stats strip ── */}
      {stats && (
        <div className="bg-gold-500">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gold-400/30">
              {[
                { val: stats.totalProducts, label: 'Total Designs' },
                { val: stats.categoriesCount, label: 'Categories' },
                { val: stats.inStock || '—', label: 'In Stock' },
                { val: stats.newProducts || '—', label: 'New Arrivals' },
              ].map(({ val, label }) => (
                <div key={label} className="text-center py-4 px-6">
                  <p className="font-display text-2xl md:text-3xl font-light text-white">{val}</p>
                  <p className="text-gold-100/80 text-xs font-modern uppercase tracking-widest">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Collections grid ── */}
      <section className="py-16 md:py-24 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {collections.map(({ id, label, title, description, accent, bg, border, icon: Icon, gradient, tag, tagColor }) => (
            <Link
              key={id}
              to={`/collections/${id}`}
              className={`group relative rounded-3xl overflow-hidden ${bg} border ${border} p-8 md:p-10 flex flex-col justify-between min-h-[260px] hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Background gradient wash */}
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} pointer-events-none`} />

              {/* Tag */}
              <div className="relative z-10 flex items-start justify-between mb-6">
                <span className={`${tagColor} text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full font-modern`}>
                  {tag}
                </span>
                {counts[id] !== '—' && (
                  <span className="text-gray-500 text-xs font-modern">{counts[id]} items</span>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10">
                <Icon size={28} className={`${accent} mb-4 opacity-80`} />
                <p className={`text-[11px] font-semibold tracking-[0.3em] uppercase font-indian-serif mb-2 ${accent} opacity-70`}>
                  {label}
                </p>
                <h2 className={`font-display text-3xl md:text-4xl font-light mb-3 ${accent}`}>{title}</h2>
                <p className="text-gray-400 text-sm font-modern leading-relaxed max-w-xs">{description}</p>
              </div>

              {/* CTA */}
              <div className="relative z-10 mt-8 flex items-center justify-between">
                <span className={`flex items-center gap-2 text-xs font-semibold tracking-widest uppercase font-modern ${accent} group-hover:gap-3 transition-all duration-200`}>
                  Explore <ArrowRight size={13} />
                </span>
                <div className={`w-10 h-10 rounded-full border ${border} flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-200`}>
                  <ArrowRight size={14} className={accent} />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Bottom nav ── */}
      <section className="bg-gold-50 border-t border-gold-100 py-10">
        <div className="container mx-auto px-4">
          <p className="text-center text-gold-600 text-xs font-semibold tracking-[0.3em] uppercase font-indian-serif mb-6">
            Explore More
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { to: '/categories', icon: Folder, label: 'Browse by Category' },
              { to: '/products', icon: Search, label: 'Search All Products' },
              { to: '/enquiry', icon: MessageCircle, label: 'Custom Order Enquiry' },
            ].map(({ to, icon: Icon, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gold-200 hover:border-gold-400 hover:shadow-gold transition-all duration-200 group"
              >
                <Icon size={22} className="text-gold-600 shrink-0" />
                <span className="text-sm font-semibold text-gray-700 group-hover:text-gold-700 font-modern transition-colors">
                  {label}
                </span>
                <ArrowRight size={14} className="ml-auto text-gray-300 group-hover:text-gold-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollectionsIndexPage;
