import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../Carousel/Carousel';
import ProductCard from '../ProductCard/ProductCard';
import { useHomepageContent } from '../../hooks/useApi';
import { useMetalRates } from '../../hooks/useMetalRates';
import { ShieldCheck, Truck, RefreshCw, Award, ArrowRight, Phone, ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { Icon, type IconName } from '../Icon/Icon';

/* ── Section heading ── */
const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  light = false,
  align = 'center',
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  light?: boolean;
  align?: 'center' | 'left';
}) => (
  <div className={`mb-10 md:mb-14 ${align === 'center' ? 'text-center' : ''}`}>
    <p className={`text-[10px] md:text-xs font-bold tracking-[0.35em] uppercase font-indian-serif mb-3 ${light ? 'text-gold-300' : 'text-gold-600'}`}>
      {eyebrow}
    </p>
    <h2 className={`font-display text-3xl md:text-[2.75rem] lg:text-5xl font-light leading-tight ${light ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h2>
    {subtitle && (
      <p className={`mt-3 text-sm font-modern max-w-md ${align === 'center' ? 'mx-auto' : ''} ${light ? 'text-gray-400' : 'text-gray-500'}`}>
        {subtitle}
      </p>
    )}
    <div className={`flex items-center gap-3 mt-4 ${align === 'center' ? 'justify-center' : ''}`}>
      <div className={`h-px w-10 ${light ? 'bg-gold-400/40' : 'bg-gold-300'}`} />
      <span className={`text-sm ${light ? 'text-gold-400' : 'text-gold-500'}`}>✦</span>
      <div className={`h-px w-10 ${light ? 'bg-gold-400/40' : 'bg-gold-300'}`} />
    </div>
  </div>
);

/* ── Fallback lotus SVG for categories ── */
const LotusFallback = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" className={className}>
    <path d="M32 56 C32 56 12 44 12 28 C12 20 20 14 28 18 C29.5 18.6 31 19.5 32 20.5 C33 19.5 34.5 18.6 36 18 C44 14 52 20 52 28 C52 44 32 56 32 56Z" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M32 56 C32 56 22 48 22 36 C22 28 27 24 32 26 C37 24 42 28 42 36 C42 48 32 56 32 56Z" fill="currentColor" fillOpacity="0.5" stroke="currentColor" strokeWidth="1.5"/>
    <circle cx="32" cy="38" r="4" fill="currentColor"/>
  </svg>
);

/* ── Circular category tile ── */
const CircleCategoryTile = ({
  title, image, link,
}: {
  title: string; image: string; link: string;
}) => {
  const [err, setErr] = React.useState(false);
  return (
    <Link to={link} className="group flex flex-col items-center gap-3 shrink-0 w-24 md:w-28">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-transparent group-hover:border-gold-400 transition-all duration-300 bg-gold-50 shadow-sm group-hover:shadow-gold">
        {!err ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={() => setErr(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
            <LotusFallback className="w-10 h-10 text-gold-500" />
          </div>
        )}
      </div>
      <p className="text-[11px] md:text-xs font-semibold text-gray-700 font-modern text-center leading-tight group-hover:text-gold-700 transition-colors duration-200 px-1">
        {title}
      </p>
    </Link>
  );
};

/* ── Occasions ── */
const occasions: Array<{ iconName: IconName; label: string; color: string; dot: string }> = [
  { iconName: 'bridal',     label: 'Bridal & Wedding',   color: 'from-rose-50 to-pink-50',     dot: 'bg-rose-400' },
  { iconName: 'festivals',  label: 'Festivals & Puja',   color: 'from-amber-50 to-orange-50',  dot: 'bg-amber-400' },
  { iconName: 'daily-wear', label: 'Daily Wear',         color: 'from-sky-50 to-blue-50',      dot: 'bg-sky-400' },
  { iconName: 'baby',       label: 'Baby & Kids',        color: 'from-green-50 to-emerald-50', dot: 'bg-emerald-400' },
  { iconName: 'gifting',    label: 'Gifting',            color: 'from-purple-50 to-violet-50', dot: 'bg-violet-400' },
  { iconName: 'temple',     label: 'Temple & Religious', color: 'from-yellow-50 to-amber-50',  dot: 'bg-yellow-500' },
];

/* ── Testimonials ── */
const testimonials = [
  {
    quote: 'The silver Kamakshi deepam I ordered is breathtaking — the weight and finish are exactly as promised. Truly heirloom quality.',
    name: 'Lakshmi Priya',
    place: 'Hyderabad',
  },
  {
    quote: 'Honest weight, fair rate and such warm service on WhatsApp. They guided me through the whole purchase for my daughter\'s wedding.',
    name: 'Ramesh Kumar',
    place: 'Vijayawada',
  },
  {
    quote: 'Authentic craftsmanship you can feel. Our family has been buying pooja silver here for years — never once disappointed.',
    name: 'Sridevi Reddy',
    place: 'Chennai',
  },
];

const Home: React.FC = () => {
  const { data: homepageData, loading, error, refetch } = useHomepageContent();
  const rates = useMetalRates();
  const catScrollRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);

  const categories = homepageData?.popularCategories
    ? homepageData.popularCategories.map((cat: any) => ({
        title: cat.title || cat.name,
        image: cat.image || cat.thumbnail || '',
        link: `/category/${cat.slug || (cat.title || cat.name).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`,
      }))
    : [];

  const mapProduct = (p: any, forceNew = false) => ({
    id: p.id,
    title: p.title,
    image: p.images?.[0] || p.commonImages?.[0] || '',
    image2: p.images?.[1] || p.commonImages?.[1] || undefined,
    isNew: forceNew || p.isNewProduct || p.isNew || false,
    purity: p.purity || undefined,
    weight: p.weight || undefined,
    link: `/product/${p.id}`,
  });

  const latestProducts = (homepageData?.latestProducts || []).map((p: any) => mapProduct(p));
  const newArrivals = (homepageData?.newArrivals || []).map((p: any) => mapProduct(p, true));

  const bestSellers = latestProducts.slice(0, 6);
  const arrivalProducts = newArrivals.length > 0 ? newArrivals.slice(0, 8) : latestProducts.slice(0, 8);

  // Scrolling announcement — leads with today's live gold & silver rate.
  const sep = '  ✦  ';
  const rateParts: string[] = [];
  if (rates?.gold22k) rateParts.push(`Today's Gold 22K · ₹${rates.gold22k.toFixed(0)}/g`);
  if (rates?.silverPerKg) rateParts.push(`Today's Silver · ₹${rates.silverPerKg.toLocaleString('en-IN')}/kg`);
  const marqueeLine = [
    ...(rateParts.length ? rateParts : ['Authentic Silver & Gold']),
    'BIS Hallmark-Grade Silver',
    '100% Authentic Craftsmanship',
    'Sold by Honest Weight',
    'Personal WhatsApp Service',
    'Trusted Since 2001',
  ].join(sep);

  const scrollCats = (dir: 'l' | 'r') => {
    if (catScrollRef.current) catScrollRef.current.scrollBy({ left: dir === 'l' ? -240 : 240, behavior: 'smooth' });
  };
  const scrollProducts = (dir: 'l' | 'r') => {
    if (productScrollRef.current) productScrollRef.current.scrollBy({ left: dir === 'l' ? -300 : 300, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gold-300 border-t-gold-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 font-modern text-sm tracking-wide">Loading collection…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white overflow-x-hidden">

      {/* If the catalogue couldn't load, tell the user and offer a retry —
          but still render the rest of the page (hero, value props, testimonials)
          so the site never looks blank/broken. */}
      {error && (
        <div className="bg-maroon/5 border-y border-maroon/20 text-center py-3 px-4">
          <span className="text-sm text-charcoal font-modern">
            We couldn't load the latest collection just now.
          </span>
          <button
            onClick={() => refetch()}
            className="ml-3 text-sm font-semibold text-gold-700 underline hover:text-gold-800"
          >
            Retry
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════
          §1 · HERO CAROUSEL
      ═══════════════════════════════════════ */}
      <section>
        <Carousel />
      </section>

      {/* ═══════════════════════════════════════
          §2 · ANNOUNCEMENT MARQUEE
      ═══════════════════════════════════════ */}
      <section className="bg-gold-600 overflow-hidden">
        <div className="py-2.5 px-4">
          <div className="announcement-marquee whitespace-nowrap">
            <span className="inline-block text-white text-[11px] font-medium tracking-[0.15em] uppercase font-modern animate-marquee">
              {sep}{marqueeLine}{sep}{marqueeLine}{sep}
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §3 · TRUST PILLARS
      ═══════════════════════════════════════ */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { icon: ShieldCheck, label: 'BIS Hallmarked', sub: 'Certified 925 silver' },
              { icon: Truck, label: 'Free Shipping', sub: 'Orders above ₹5,000' },
              { icon: RefreshCw, label: 'Easy Returns', sub: '7-day hassle-free' },
              { icon: Award, label: 'Est. Since 2001', sub: 'Two decades of trust' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3 md:flex-col md:items-center md:text-center group">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gold-50 border border-gold-100 flex items-center justify-center shrink-0 group-hover:bg-gold-100 transition-colors duration-200">
                  <Icon size={18} className="text-gold-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-gray-800 font-modern">{label}</p>
                  <p className="text-[11px] text-gray-400 font-modern hidden md:block">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §4 · SHOP BY CATEGORY (circle tiles + horizontal scroll)
      ═══════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Browse" title="Shop by Category" />
        </div>

        {/* Scroll wrapper */}
        <div className="relative">
          {/* Desktop arrows */}
          <button
            onClick={() => scrollCats('l')}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-600 hover:border-gold-400 hover:text-gold-600 transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scrollCats('r')}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-600 hover:border-gold-400 hover:text-gold-600 transition-all"
          >
            <ChevronRight size={16} />
          </button>

          <div
            ref={catScrollRef}
            className="flex items-start gap-5 md:gap-7 overflow-x-auto scrollbar-none px-6 md:px-16 pb-2"
          >
            {(categories.length > 0
              ? categories
              : ['Necklaces', 'Bangles', 'Earrings', 'Anklets', 'Rings', 'Pendants', 'Chains', 'Waist Belt'].map(n => ({
                  title: n, image: '', link: '/categories',
                }))
            ).map((cat, i) => (
              <CircleCategoryTile key={`${cat.title}-${i}`} {...cat} />
            ))}
            {/* "View All" circle */}
            <Link to="/categories" className="group flex flex-col items-center gap-3 shrink-0 w-24 md:w-28">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-dashed border-gold-300 group-hover:border-gold-500 transition-all duration-300 bg-gold-50 flex items-center justify-center">
                <ArrowRight size={20} className="text-gold-500 group-hover:translate-x-0.5 transition-transform duration-200" />
              </div>
              <p className="text-[11px] md:text-xs font-semibold text-gold-600 font-modern text-center">View All</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §5 · BEST SELLERS (asymmetric hero grid)
      ═══════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#faf8f4]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <SectionHeading eyebrow="Most Loved" title={`Our\nBestsellers`} align="left" />
            <Link
              to="/products"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-gold-600 hover:text-gold-800 font-modern tracking-widest uppercase transition-colors mb-4 shrink-0"
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>

          {bestSellers.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              {/* First card: large (spans 2 rows on md+) */}
              {bestSellers[0] && (
                <Link to={bestSellers[0].link} className="group md:row-span-2 block">
                  <div className="relative bg-gray-50 rounded-2xl overflow-hidden h-full min-h-[260px] md:min-h-[520px] border border-gray-100 hover:border-gold-200 hover:shadow-gold transition-all duration-300">
                    {bestSellers[0].image ? (
                      <img
                        src={bestSellers[0].image}
                        alt={bestSellers[0].title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gold-50 to-gold-100 flex items-center justify-center">
                        <LotusFallback className="w-16 h-16 text-gold-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {bestSellers[0].isNew && (
                      <div className="absolute top-3 left-3 bg-gold-500 text-white text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full font-modern">
                        New
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-display text-xl md:text-2xl font-light text-white leading-snug mb-1 group-hover:text-gold-300 transition-colors duration-200">
                        {bestSellers[0].title}
                      </h3>
                      <span className="flex items-center gap-1 text-[11px] text-gold-300 font-semibold font-modern tracking-widest uppercase">
                        Enquire <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                      </span>
                    </div>
                  </div>
                </Link>
              )}
              {/* Remaining 4 smaller cards */}
              {bestSellers.slice(1, 5).map(p => (
                <ProductCard key={p.id} {...p} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
              <div className="md:row-span-2 bg-white rounded-2xl animate-pulse border border-gray-100 min-h-[260px]" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-64 animate-pulse border border-gray-100" />
              ))}
            </div>
          )}

          <div className="text-center mt-8 md:hidden">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 border border-gold-400 text-gold-600 text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-full font-modern"
            >
              View All <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §6 · FEATURED COLLECTION BANNER (split)
      ═══════════════════════════════════════ */}
      <section className="bg-gray-950 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px] md:min-h-[520px]">
          {/* Left: decorative pattern panel */}
          <div className="relative bg-[#1a1208] hidden lg:block overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-mandala" />
            {/* Large decorative lotus */}
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-80 h-80 text-gold-500 opacity-20">
                <path d="M100 180 C100 180 40 145 40 90 C40 65 60 48 80 56 C86 58.5 93 62.5 100 68 C107 62.5 114 58.5 120 56 C140 48 160 65 160 90 C160 145 100 180 100 180Z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
                <path d="M100 180 C100 180 60 155 55 115 C50 75 75 58 100 72 C125 58 150 75 145 115 C140 155 100 180 100 180Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2"/>
                <path d="M100 180 C100 180 72 160 72 122 C72 98 85 86 100 90 C115 86 128 98 128 122 C128 160 100 180 100 180Z" fill="currentColor" fillOpacity="0.6" stroke="currentColor" strokeWidth="2"/>
                <circle cx="100" cy="128" r="10" fill="currentColor"/>
              </svg>
            </div>
            {/* Gold diagonal lines */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 40px, rgba(180,130,40,0.04) 40px, rgba(180,130,40,0.04) 41px)',
            }} />
          </div>

          {/* Right: text */}
          <div className="relative flex flex-col justify-center px-8 md:px-12 py-16 md:py-20">
            <div className="absolute inset-0 opacity-5 bg-mandala lg:hidden" />
            <div className="relative z-10 max-w-md">
              <p className="text-gold-400 text-[10px] font-bold tracking-[0.4em] uppercase font-indian-serif mb-4">
                ✦ Exclusive Collection ✦
              </p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light text-white mb-2 leading-tight">
                The Shubhalagnam
              </h2>
              <h3 className="font-display text-2xl md:text-3xl font-light text-gold-400 italic mb-6">
                Bridal Silver Set
              </h3>
              <p className="text-gray-400 text-sm font-modern leading-relaxed mb-8 max-w-sm">
                Handcrafted in pure 925 silver — our signature bridal collection blends
                traditional artistry with timeless elegance. Perfect for your most sacred moments.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/collections/featured"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-white text-xs font-bold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 font-modern"
                >
                  Explore Collection <ArrowRight size={13} />
                </Link>
                <Link
                  to="/enquiry"
                  className="inline-flex items-center gap-2 border border-white/20 text-white/80 hover:border-gold-400 hover:text-gold-300 text-xs font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 font-modern"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §7 · NEW ARRIVALS (horizontal scroll on mobile)
      ═══════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8 md:mb-12">
            <SectionHeading eyebrow="Fresh In" title="New Arrivals" align="left" />
            <Link
              to="/collections/new-arrivals"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold text-gold-600 hover:text-gold-800 font-modern tracking-widest uppercase mb-4 shrink-0"
            >
              See All <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Horizontal scroll on mobile, grid on desktop */}
        <div className="md:container md:mx-auto md:px-4">
          <div className="relative">
            {/* Desktop arrow */}
            <button
              onClick={() => scrollProducts('l')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-600 hover:border-gold-400 hover:text-gold-600 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scrollProducts('r')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 hidden md:flex w-9 h-9 rounded-full bg-white border border-gray-200 shadow-sm items-center justify-center text-gray-600 hover:border-gold-400 hover:text-gold-600 transition-all"
            >
              <ChevronRight size={16} />
            </button>

            {arrivalProducts.length > 0 ? (
              /* Mobile: horizontal scroll — Desktop: grid */
              <>
                {/* Mobile scroll */}
                <div
                  ref={productScrollRef}
                  className="flex gap-4 overflow-x-auto scrollbar-none px-4 pb-2 md:hidden"
                >
                  {arrivalProducts.map(p => (
                    <div key={p.id} className="shrink-0 w-44">
                      <ProductCard {...p} />
                    </div>
                  ))}
                </div>
                {/* Desktop grid */}
                <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-5">
                  {arrivalProducts.map(p => <ProductCard key={p.id} {...p} />)}
                </div>
              </>
            ) : (
              <div className="hidden md:grid grid-cols-3 lg:grid-cols-4 gap-5">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl h-72 animate-pulse border border-gray-100" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8 px-4">
          <Link
            to="/collections/new-arrivals"
            className="inline-flex items-center gap-2 border border-gold-400 text-gold-600 hover:bg-gold-500 hover:text-white text-xs font-semibold tracking-widest uppercase px-8 py-3 rounded-full transition-all duration-300 font-modern"
          >
            See All New Arrivals <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §8 · SHOP BY OCCASION (large cards, 2×3 grid)
      ═══════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-[#faf8f4]">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Perfect For Every Moment" title="Shop by Occasion" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
            {occasions.map(({ iconName, label, color, dot }) => (
              <Link
                key={label}
                to="/collections"
                className={`group relative bg-gradient-to-br ${color} rounded-2xl p-5 md:p-7 flex flex-col gap-4 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-white`}
              >
                {/* Background pattern hint */}
                <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-white/20 -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-16 h-16 rounded-full bg-white/20 translate-y-6 -translate-x-4" />

                <div className="relative">
                  <div className={`w-2 h-2 rounded-full ${dot} mb-3`} />
                  <div className="w-9 h-9 md:w-10 md:h-10 mb-3 group-hover:scale-110 transition-transform duration-300 origin-left text-gray-700">
                    <Icon name={iconName} className="w-full h-full" />
                  </div>
                  <p className="text-sm md:text-base font-semibold text-gray-800 font-modern leading-tight">
                    {label}
                  </p>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-gray-500 font-modern tracking-widest uppercase mt-2 group-hover:text-gray-700 transition-colors">
                    Explore <ArrowRight size={9} className="group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §9 · SILVER EXCLUSIVE (3 dark material cards)
      ═══════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-gray-950 relative overflow-hidden">
        {/* Diagonal gold strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent opacity-50" />

        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Pure 925 Silver" title="Silver Exclusive" light />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                num: '01',
                title: 'Antique Silver',
                tagline: 'Heritage Craft',
                desc: 'Old-world oxidised silverwork. Each piece carries the weight of generations.',
                cta: '/categories',
                accent: 'border-white/10',
                glow: '',
              },
              {
                num: '02',
                title: 'Contemporary Silver',
                tagline: 'Trending Now',
                desc: 'Sleek modern silhouettes in pure silver. Minimal, wearable, eternally stylish.',
                cta: '/collections/featured',
                accent: 'border-gold-400/30',
                glow: 'bg-gold-500/5',
                featured: true,
              },
              {
                num: '03',
                title: 'Filigree Work',
                tagline: 'Artisan Made',
                desc: 'Intricate threadwork — a delicate art passed down through generations of craftsmen.',
                cta: '/categories',
                accent: 'border-white/10',
                glow: '',
              },
            ].map(({ num, title, tagline, desc, cta, accent, glow, featured }) => (
              <Link
                key={title}
                to={cta}
                className={`group relative rounded-2xl border ${accent} ${glow} p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400/40 overflow-hidden`}
              >
                {/* Large muted number */}
                <p className="font-display text-7xl font-light text-white/5 absolute top-4 right-6 leading-none select-none">
                  {num}
                </p>
                <div className="relative">
                  <p className={`text-[10px] font-bold tracking-[0.35em] uppercase font-modern mb-4 ${featured ? 'text-gold-400' : 'text-gray-500'}`}>
                    {tagline}
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-light text-white mb-3 group-hover:text-gold-300 transition-colors duration-200">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm font-modern leading-relaxed mb-6">
                    {desc}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase font-modern transition-colors ${featured ? 'text-gold-400 group-hover:text-gold-300' : 'text-gray-500 group-hover:text-white'}`}>
                    Shop Now <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §10 · ABOUT (split with stats)
      ═══════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
            {/* Left: decorative visual */}
            <div className="relative order-2 lg:order-1">
              <div className="relative mx-auto max-w-sm md:max-w-md">
                {/* Main decorative box */}
                <div className="aspect-square bg-gradient-to-br from-[#1a1208] to-[#2d1f08] rounded-3xl border border-gold-800/30 overflow-hidden flex items-center justify-center shadow-2xl">
                  <div className="text-center">
                    <svg viewBox="0 0 120 120" className="w-40 h-40 text-gold-500 opacity-30 mx-auto">
                      <path d="M60 108 C60 108 20 86 20 56 C20 42 30 34 42 38 C46 39.5 53 43 60 48 C67 43 74 39.5 78 38 C90 34 100 42 100 56 C100 86 60 108 60 108Z" fill="currentColor" stroke="currentColor" strokeWidth="2"/>
                      <path d="M60 108 C60 108 35 93 32 71 C29 49 48 38 60 46 C72 38 91 49 88 71 C85 93 60 108 60 108Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="2"/>
                      <path d="M60 108 C60 108 44 96 44 76 C44 62 52 56 60 58 C68 56 76 62 76 76 C76 96 60 108 60 108Z" fill="currentColor" fillOpacity="0.65" stroke="currentColor" strokeWidth="2"/>
                      <circle cx="60" cy="80" r="8" fill="currentColor"/>
                    </svg>
                    <p className="font-display text-5xl font-light text-gold-400 mt-4">Est.</p>
                    <p className="font-display text-6xl font-light text-white">2001</p>
                  </div>
                </div>

                {/* Floating stat chips */}
                <div className="absolute -top-4 -right-4 md:-right-8 bg-white border border-gold-200 rounded-2xl px-5 py-4 shadow-gold text-center">
                  <p className="font-display text-3xl font-light text-gold-600">20+</p>
                  <p className="text-[10px] text-gray-500 font-modern tracking-wide uppercase">Years</p>
                </div>
                <div className="absolute -bottom-4 -left-4 md:-left-8 bg-white border border-gold-200 rounded-2xl px-5 py-4 shadow-gold text-center">
                  <p className="font-display text-3xl font-light text-gold-600">10K+</p>
                  <p className="text-[10px] text-gray-500 font-modern tracking-wide uppercase">Customers</p>
                </div>
              </div>
            </div>

            {/* Right: text */}
            <div className="order-1 lg:order-2">
              <p className="text-gold-600 text-[10px] font-bold tracking-[0.35em] uppercase font-indian-serif mb-3">
                Our Story
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-light text-gray-900 mb-6 leading-snug">
                Crafting Silver Memories<br />
                <span className="text-gold-600 italic">Since 2001</span>
              </h2>
              <p className="text-gray-600 font-modern text-sm md:text-[15px] leading-relaxed mb-4">
                Sri Lakshmi Lavanya Jewellery was born from a deep love for traditional Indian craftsmanship.
                For over two decades, we have been curating exquisite silver jewellery that honours our
                cultural heritage while embracing modern aesthetics.
              </p>
              <p className="text-gray-600 font-modern text-sm md:text-[15px] leading-relaxed mb-8">
                Every piece is handcrafted by skilled artisans using BIS-certified 925 silver —
                quality you can pass on through generations.
              </p>
              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { num: '5000+', label: 'Designs' },
                  { num: '100%', label: 'Hallmarked' },
                  { num: '₹5K', label: 'Free Shipping' },
                ].map(({ num, label }) => (
                  <div key={label} className="text-center py-4 bg-gold-50 rounded-xl border border-gold-100">
                    <p className="font-display text-2xl font-light text-gold-600">{num}</p>
                    <p className="text-[10px] text-gray-500 font-modern mt-0.5 tracking-wide">{label}</p>
                  </div>
                ))}
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 bg-gray-900 hover:bg-gold-600 text-white text-xs font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-300 font-modern"
              >
                Read Our Story <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §10b · TESTIMONIALS
      ═══════════════════════════════════════ */}
      <section className="py-14 md:py-20 bg-ivory">
        <div className="container mx-auto px-4">
          <SectionHeading eyebrow="Words of Trust" title="What Our Patrons Say" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="relative bg-white rounded-2xl p-7 md:p-8 border border-ivory-200 shadow-card"
              >
                <Quote className="w-8 h-8 text-gold-300 mb-4" />
                <p className="text-charcoal-light font-modern text-sm leading-relaxed mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} className="fill-gold-500 text-gold-500" />
                  ))}
                </div>
                <p className="font-display text-lg text-charcoal leading-none">{t.name}</p>
                <p className="text-xs text-charcoal-muted font-modern mt-1">{t.place}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          §11 · FINAL CTA STRIP
      ═══════════════════════════════════════ */}
      <section className="relative py-16 md:py-20 overflow-hidden" style={{ background: 'linear-gradient(135deg, #0f0b04 0%, #1a1208 50%, #0f0b04 100%)' }}>
        {/* Gold corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-gold-500/20 rounded-tl-3xl" />
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-gold-500/20 rounded-tr-3xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-gold-500/20 rounded-bl-3xl" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-gold-500/20 rounded-br-3xl" />
        <div className="absolute inset-0 opacity-5 bg-rangoli-bg" />

        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="text-gold-400 text-[10px] font-bold tracking-[0.4em] uppercase font-indian-serif mb-4">
            ✦ We're Here For You ✦
          </p>
          <h2 className="font-display text-3xl md:text-5xl font-light text-white mb-4 leading-tight">
            Find Your Perfect Piece
          </h2>
          <p className="text-gray-400 font-modern text-sm max-w-md mx-auto mb-10">
            Speak with our jewellery experts — visit our store, book a video consultation,
            or send us an enquiry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/enquiry"
              className="inline-flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-white text-xs font-bold tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300 font-modern"
            >
              Send an Enquiry
            </Link>
            <a
              href="tel:+917288865969"
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white/80 hover:border-gold-400 hover:text-gold-300 text-xs font-semibold tracking-widest uppercase px-10 py-4 rounded-full transition-all duration-300 font-modern"
            >
              <Phone size={14} />
              +91 72888 65969
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
