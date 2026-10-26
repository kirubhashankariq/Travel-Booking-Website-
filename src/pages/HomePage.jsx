import React from 'react';
import { Link } from 'react-router-dom';
import { TRAVEL_PACKAGES } from '../data/mockData';
import PackageCard from '../components/PackageCard';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  ShieldCheck, 
  Award, 
  Plane, 
  Gem, 
  Anchor,
  Clock,
  Star
} from 'lucide-react';

export default function HomePage() {
  // Get top 4 featured packages for the Popular Destinations section
  const popularPackages = TRAVEL_PACKAGES.filter((pkg) => pkg.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      
      {/* HERO SECTION */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-20">
        {/* Hero Background Image with Luxury Dark Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=85"
            alt="Luxury Travel Sanctuary"
            className="w-full h-full object-cover object-center scale-105 animate-pulse-slow"
          />
          {/* Multi-layered dark overlay for extreme contrast & luxury mood */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/50" />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 sm:py-28">
          
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-widest uppercase mb-6 backdrop-blur-md shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Curated Journeys • World's Premier Expeditions</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Bespoke Escapes for the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 italic">
              Discerning Explorer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto text-base sm:text-xl text-slate-200/90 leading-relaxed font-light mb-10">
            Immerse yourself in cliffside sanctuaries, private yacht charters, and tailor-made expeditions orchestrated with unmatched discretion.
          </p>

          {/* Call to Actions (CTAs) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
            <Link
              to="/destinations"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/my-bookings"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold text-sm tracking-wide backdrop-blur-md transition-all hover:scale-105 active:scale-95"
            >
              <Compass className="w-4 h-4 text-amber-300" />
              <span>My Itineraries</span>
            </Link>
          </div>

          {/* Hero Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t border-white/15 text-white/90">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">100%</p>
              <p className="text-xs uppercase tracking-wider text-slate-300 mt-1">Tailor-Made</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">4.98/5</p>
              <p className="text-xs uppercase tracking-wider text-slate-300 mt-1">Guest Satisfaction</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">24/7</p>
              <p className="text-xs uppercase tracking-wider text-slate-300 mt-1">Dedicated Concierge</p>
            </div>
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-black text-amber-400 font-sans">50+</p>
              <p className="text-xs uppercase tracking-wider text-slate-300 mt-1">Exclusive Sanctuaries</p>
            </div>
          </div>

        </div>
      </section>

      {/* POPULAR DESTINATIONS SECTION */}
      <section className="py-20 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-amber-500 font-bold text-xs uppercase tracking-widest mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Handpicked Escapes</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              Popular Destinations
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Curated top-tier packages designed with private aviation, ultra-luxury lodging, and exclusive local access.
            </p>
          </div>

          <Link
            to="/destinations"
            className="mt-6 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 group"
          >
            <span>View All Packages</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Responsive Grid of Cards (3-4 packages) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {popularPackages.map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>

        {/* View All CTA Banner */}
        <div className="mt-12 text-center">
          <Link
            to="/destinations"
            className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-full border-2 border-slate-900 dark:border-amber-400 text-slate-900 dark:text-amber-400 hover:bg-slate-900 hover:text-white dark:hover:bg-amber-400 dark:hover:text-slate-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            <span>Discover Full Catalog ({TRAVEL_PACKAGES.length} Itineraries)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* LUXURY FEATURES / THE AURA DIFFERENCE */}
      <section className="py-20 bg-slate-100 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
              Uncompromising Standards
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mt-2">
              The Aura Luxe Difference
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-3">
              We eliminate every friction point so you can immerse fully in the romance of travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center mb-5">
                <Plane className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                Private Aviation & Transit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Seamless tarmac VIP transfers, private helicopter connections, and executive chauffeur service throughout.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center mb-5">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                Handpicked Sanctuaries
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Stay in cliffside cave suites, royal ryokans, and overwater pavilions vetted individually by our directors.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center mb-5">
                <Anchor className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                Private Yacht Charters
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Access secluded lagoons, private atolls, and secret coastal coves inaccessible to conventional cruises.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800/80 p-8 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 shadow-sm hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-xl bg-amber-400/20 text-amber-500 flex items-center justify-center mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900 dark:text-white mb-2">
                24/7 Lifestyle Concierge
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Personalized support on speed dial for Michelin bookings, itinerary alterations, and bespoke requests.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* EDITORIAL QUOTE / SOCIAL PROOF */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-1 text-amber-400 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current" />
          ))}
        </div>
        <blockquote className="font-serif text-2xl sm:text-3xl text-slate-800 dark:text-slate-200 font-medium italic leading-relaxed">
          &ldquo;Aura Luxe sets the gold standard for bespoke global expeditions. The seamlessness of the private Capri charter and Kyoto ryokan booking made our journey genuinely unforgettable.&rdquo;
        </blockquote>
        <div className="mt-6">
          <p className="font-bold text-sm text-slate-900 dark:text-white">Sir Edward & Lady Evelyn Vance</p>
          <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 mt-1">Virtuoso Travel Patrons</p>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="py-16 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-center px-4">
        <div className="max-w-3xl mx-auto space-y-5">
          <h2 className="font-serif text-3xl sm:text-4xl font-black">
            Ready to Design Your Bespoke Escape?
          </h2>
          <p className="text-sm sm:text-base font-medium text-slate-900/80 max-w-xl mx-auto">
            Browse our hand-curated collection of world destinations or view your active reservations anytime.
          </p>
          <div className="pt-2">
            <Link
              to="/destinations"
              className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-slate-950 text-white hover:bg-slate-900 font-extrabold text-xs uppercase tracking-wider shadow-2xl transition-all hover:scale-105"
            >
              <span>Explore All Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
