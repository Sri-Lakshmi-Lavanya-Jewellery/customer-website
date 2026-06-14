import React from 'react';
import { Link } from 'react-router-dom';
import { Crown, Shield, Scale, Sparkles, Heart, Award, Hammer, CheckCircle2 } from 'lucide-react';

const WHATSAPP = '917288865969';
const waLink = (msg: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

const stats = [
  { value: '25+', label: 'Years of Trust' },
  { value: '100%', label: 'Authentic Silver' },
  { value: '6+', label: 'Pooja Ranges' },
];

const craft = [
  { icon: Hammer, title: 'Hand-Crafted', text: 'Every article is shaped, engraved and polished by hand by our master silversmiths.' },
  { icon: Scale, title: 'Honest Weight', text: "Each piece is weighed transparently and priced at the day's prevailing silver rate." },
  { icon: Shield, title: 'Quality Assurance', text: 'Multi-stage checks ensure authentic purity and a flawless finish, every single time.' },
];

const why = [
  { icon: Award, title: 'Trusted Brand', text: 'Generations of devotees' },
  { icon: Shield, title: 'Authentic Silver', text: 'Hallmark-grade purity' },
  { icon: Sparkles, title: 'Master Craft', text: 'Hand-finished articles' },
  { icon: Heart, title: 'Devoted Service', text: 'Personal WhatsApp care' },
];

const certs = [
  { title: 'Hallmark Grade', text: 'Assured silver purity' },
  { title: 'Pure Silver 999', text: 'Coins, cups & deepams' },
  { title: '925 Sterling', text: 'For finer articles' },
  { title: 'Sold by Weight', text: "Today's fair rate" },
];

const About: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-gold-700 via-gold-600 to-amber-700 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-mandala opacity-10 pointer-events-none" />
        <div className="container mx-auto relative text-center">
          <p className="uppercase tracking-[0.3em] text-gold-100 text-sm mb-3">Since Generations</p>
          <h1 className="font-display text-4xl md:text-6xl font-semibold mb-4">Our Story</h1>
          <p className="max-w-2xl mx-auto text-gold-50/90 text-lg">
            A legacy of trust, artistry and devotion — the journey of Sri Lakshmi Lavanya Jewellery.
          </p>
        </div>
      </section>

      {/* Brand story */}
      <section className="container mx-auto py-16 px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="rounded-2xl overflow-hidden shadow-gold-lg aspect-[4/3] bg-silver-100">
            <img
              src="https://cdn.jsdelivr.net/gh/Sri-Lakshmi-Lavanya-Jewellery/customer-website@main/public/assets/images/products/kamakshi-deepam/1.jpg"
              alt="Silver Kamakshi Deepam"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="uppercase tracking-[0.25em] text-gold-600 text-xs font-semibold mb-3">Welcome to SLLJ</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-800 mb-5">
              Where Tradition Meets Timeless Devotion
            </h2>
            <p className="text-gray-600 mb-4 leading-relaxed">
              Sri Lakshmi Lavanya Jewellery was born from a simple belief — that silver is not merely metal,
              but a keeper of blessings and a part of every sacred moment in an Indian home.
            </p>
            <p className="text-gray-600 mb-8 leading-relaxed">
              For over two decades, our family has hand-crafted authentic silver pooja &amp; temple articles —
              deepams, cups, stands and bells — for India's most cherished households and celebrations.
              Every piece carries the blessing of Goddess Lakshmi and the assurance of honest weight and purity.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-3xl font-semibold text-gold-600">{s.value}</div>
                  <div className="text-sm text-gray-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship */}
      <section className="bg-gold-50/40 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.25em] text-gold-600 text-xs font-semibold mb-2">The Art of Making</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-800">Craftsmanship</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {craft.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-white rounded-2xl p-8 shadow-sm border border-gold-100 text-center card-hover">
                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gold-gradient flex items-center justify-center text-white">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container mx-auto py-16 px-4">
        <div className="text-center mb-12">
          <p className="uppercase tracking-[0.25em] text-gold-600 text-xs font-semibold mb-2">The SLLJ Difference</p>
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-800">Why Choose Us</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {why.map(({ icon: Icon, title, text }) => (
            <div key={title} className="text-center p-6 rounded-2xl hover:bg-gold-50/50 transition-colors">
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-gold-100 flex items-center justify-center text-gold-700">
                <Icon className="w-7 h-7" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-1">{title}</h3>
              <p className="text-sm text-gray-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-silver-50 py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <p className="uppercase tracking-[0.25em] text-gold-600 text-xs font-semibold mb-2">Assured &amp; Authentic</p>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-gray-800">Our Assurance</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certs.map((c) => (
              <div key={c.title} className="bg-white rounded-2xl p-8 text-center shadow-sm border border-silver-200">
                <CheckCircle2 className="w-10 h-10 mx-auto mb-4 text-gold-600" />
                <h3 className="font-display text-lg font-semibold text-gray-800">{c.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-gold-800 to-amber-900 text-white p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 bg-lotus opacity-10 pointer-events-none" />
            <Crown className="w-12 h-12 mx-auto mb-4 text-gold-200 relative" />
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3 relative">Visit Us or Message Anytime</h2>
            <p className="text-gold-50/90 max-w-xl mx-auto mb-8 relative">
              Tell us the silver article you need — we'll share the current price, customisation and delivery on WhatsApp.
            </p>
            <div className="flex flex-wrap gap-4 justify-center relative">
              <a href={waLink('Namaste SLLJ 🙏 I would like to know more about your silver articles.')}
                 target="_blank" rel="noopener noreferrer"
                 className="btn-gold px-8 py-3 rounded-full">Chat on WhatsApp</a>
              <Link to="/products" className="border-2 border-white/70 text-white px-8 py-3 rounded-full hover:bg-white hover:text-gold-800 transition-colors">
                Browse Collection
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
