import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Sparkles, ArrowRight, Info } from 'lucide-react';

const WHATSAPP = '917288865969';
const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const buckets = [
  { label: 'Under 100 g', note: 'Bells, spoons, small cups & gifting', to: '/products?weight=under-100' },
  { label: '100 – 250 g', note: 'Cups, agarbatti stands & daily pooja', to: '/products?weight=100-250' },
  { label: '250 – 500 g', note: 'Harathi stands & medium articles', to: '/products?weight=250-500' },
  { label: 'Above 500 g', note: 'Kamakshi deepams & statement pieces', to: '/products?weight=above-500' },
];

const WeightRange: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-silver-700 via-silver-600 to-silver-800 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-mandala opacity-10 pointer-events-none" />
        <div className="container mx-auto relative text-center">
          <p className="uppercase tracking-[0.3em] text-silver-100 text-sm mb-3">Sold by Weight</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4">Shop by Weight</h1>
          <p className="max-w-2xl mx-auto text-silver-50/90 text-lg">
            Silver articles are priced by weight at the day's rate. Pick a weight range to find pieces that suit your need and budget.
          </p>
        </div>
      </section>

      {/* How pricing works */}
      <section className="container mx-auto py-12 px-4">
        <div className="flex items-start gap-4 bg-gold-50/50 border border-gold-100 rounded-2xl p-6 max-w-4xl mx-auto">
          <Info className="w-6 h-6 text-gold-600 flex-shrink-0 mt-0.5" />
          <p className="text-gray-700 text-sm leading-relaxed">
            <span className="font-semibold">How pricing works:</span> the price of each silver article is calculated as
            <span className="font-semibold"> (weight × today's silver rate) + making charges</span>. Heavier pieces cost more,
            but carry more pure silver. Tell us your preferred weight on WhatsApp and we'll share an exact quote.
          </p>
        </div>
      </section>

      {/* Weight buckets */}
      <section className="container mx-auto pb-16 px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {buckets.map((b) => (
            <Link
              key={b.label}
              to={b.to}
              className="group bg-white rounded-2xl p-8 text-center shadow-sm border border-silver-200 card-hover"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-silver-gradient flex items-center justify-center text-white">
                <Scale className="w-8 h-8" />
              </div>
              <div className="font-display text-2xl font-semibold text-gray-800">{b.label}</div>
              <p className="text-sm text-gray-500 mt-2 mb-4">{b.note}</p>
              <span className="inline-flex items-center gap-1 text-gold-700 font-semibold text-sm group-hover:gap-2 transition-all">
                Browse <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gold-50/40 py-16 px-4">
        <div className="container mx-auto text-center max-w-2xl">
          <Sparkles className="w-10 h-10 mx-auto mb-4 text-gold-600" />
          <h2 className="font-display text-3xl font-semibold text-gray-800 mb-3">Not Sure About the Weight?</h2>
          <p className="text-gray-600 mb-8">
            Share the article and occasion, and we'll recommend the right weight and finish for you.
          </p>
          <a
            href={waLink('Namaste SLLJ 🙏 I need help choosing the right weight for a silver article.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold px-8 py-3 rounded-full inline-block"
          >
            Ask us on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
};

export default WeightRange;
