import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TRAVEL_PACKAGES } from '../data/mockData';
import BookingForm from '../components/BookingForm';
import { 
  Star, 
  Clock, 
  MapPin, 
  ChevronRight, 
  CheckCircle2, 
  CalendarDays, 
  ShieldCheck, 
  ArrowLeft,
  Share2,
  Bookmark,
  ChevronDown,
  Sparkles
} from 'lucide-react';

export default function PackageDetailsPage() {
  const { id } = useParams();
  
  // Find package by ID
  const packageData = TRAVEL_PACKAGES.find((pkg) => pkg.id === parseInt(id, 10));

  // State for active image gallery
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('itinerary'); // 'itinerary' | 'inclusions'
  const [expandedDay, setExpandedDay] = useState(1);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (packageData) {
      setActiveImage(packageData.imageUrl);
      window.scrollTo(0, 0);
    }
  }, [packageData]);

  if (!packageData) {
    return (
      <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
        <div className="text-center max-w-md bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl">
          <div className="w-16 h-16 bg-rose-100 dark:bg-rose-950/40 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
            Expedition Not Found
          </h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
            The travel package you requested does not exist or may have been retired from our private catalog.
          </p>
          <Link
            to="/destinations"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Destinations</span>
          </Link>
        </div>
      </div>
    );
  }

  const scrollToBooking = () => {
    const el = document.getElementById('booking-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs font-semibold text-slate-500 dark:text-slate-400 py-4">
          <Link to="/" className="hover:text-amber-500 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link to="/destinations" className="hover:text-amber-500 transition-colors">
            Destinations
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-none">
            {packageData.title}
          </span>
        </nav>

        {/* Title Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between py-4 mb-6 gap-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold uppercase tracking-wider">
                {packageData.region}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="flex items-center text-xs font-semibold text-slate-600 dark:text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1" />
                {packageData.country}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight">
              {packageData.title}
            </h1>
          </div>

          {/* Social Share & Save Buttons */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleShare}
              className="p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 shadow-sm transition-colors cursor-pointer"
              title="Share Itinerary Link"
              aria-label="Share package link"
            >
              <Share2 className="w-4 h-4" />
            </button>
            {copied && (
              <span className="text-xs font-bold text-emerald-500 animate-fade-in">
                Link Copied!
              </span>
            )}
            <button
              onClick={() => setSaved(!saved)}
              className={`p-3 rounded-full border shadow-sm transition-colors cursor-pointer ${
                saved
                  ? 'bg-amber-400 text-slate-950 border-amber-400'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500'
              }`}
              title="Save to Wishlist"
              aria-label="Save package to wishlist"
            >
              <Bookmark className={`w-4 h-4 ${saved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hero Gallery Section */}
        <div className="space-y-4 mb-12">
          {/* Main Large Image */}
          <div className="relative aspect-[16/9] sm:aspect-[21/9] max-h-[520px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900">
            <img
              src={activeImage || packageData.imageUrl}
              alt={packageData.title}
              className="w-full h-full object-cover object-center transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

            {/* Quick Floating Badges */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-3 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-white text-xs sm:text-sm font-semibold">
                <Clock className="w-4 h-4 text-amber-400" />
                <span>{packageData.duration}</span>
                <span className="text-white/30">•</span>
                <div className="flex items-center space-x-1 text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="font-bold text-white">{packageData.rating.toFixed(2)}</span>
                  <span className="text-white/50 text-xs">(Bespoke Verified)</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center space-x-2 bg-amber-400 text-slate-950 px-4 py-2 rounded-2xl font-bold text-xs uppercase tracking-wider shadow-lg">
                <Sparkles className="w-4 h-4" />
                <span>Handcrafted by Aura Concierge</span>
              </div>
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          {packageData.gallery && packageData.gallery.length > 1 && (
            <div className="flex items-center space-x-3 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveImage(packageData.imageUrl)}
                className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  activeImage === packageData.imageUrl
                    ? 'border-amber-400 ring-2 ring-amber-400/30'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={packageData.imageUrl} alt="Main view" className="w-full h-full object-cover" />
              </button>

              {packageData.gallery.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImage === imgUrl
                      ? 'border-amber-400 ring-2 ring-amber-400/30'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Gallery view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Two-Column Grid: Details & Sticky Booking Card / Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Itinerary, Inclusions, Overview (7 Cols) */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Overview Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Expedition Overview
              </h2>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-base">
                {packageData.description}
              </p>
            </div>

            {/* Navigation Tabs (Itinerary vs Inclusions) */}
            <div className="flex items-center space-x-3 border-b border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveTab('itinerary')}
                className={`pb-4 px-2 font-serif text-lg font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'itinerary'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                Day-by-Day Itinerary ({packageData.itinerary?.length || 0} Days)
              </button>
              <button
                onClick={() => setActiveTab('inclusions')}
                className={`pb-4 px-2 font-serif text-lg font-bold border-b-2 transition-all cursor-pointer ${
                  activeTab === 'inclusions'
                    ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                    : 'border-transparent text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                }`}
              >
                What's Included ({packageData.inclusions?.length || 0})
              </button>
            </div>

            {/* Tab 1: Day-by-Day Itinerary Accordion */}
            {activeTab === 'itinerary' && (
              <div className="space-y-4">
                {packageData.itinerary && packageData.itinerary.map((item) => (
                  <div
                    key={item.day}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setExpandedDay(expandedDay === item.day ? null : item.day)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center space-x-4">
                        <span className="flex-shrink-0 w-9 h-9 rounded-full bg-amber-400/20 text-amber-600 dark:text-amber-400 font-bold text-xs flex items-center justify-center font-sans">
                          D{item.day}
                        </span>
                        <h4 className="font-serif text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                      </div>
                      <ChevronDown
                        className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
                          expandedDay === item.day ? 'rotate-180 text-amber-500' : ''
                        }`}
                      />
                    </button>

                    {expandedDay === item.day && (
                      <div className="px-5 pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/50">
                        {item.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: What's Included */}
            {activeTab === 'inclusions' && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white mb-4">
                  All-Inclusive Luxury Amenities
                </h3>
                <div className="space-y-3">
                  {packageData.inclusions && packageData.inclusions.map((inc, i) => (
                    <div key={i} className="flex items-start space-x-3 text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Pricing & Booking Form (5 Cols) */}
          <div className="lg:col-span-5 space-y-8 sticky top-28">
            
            {/* Quick Pricing Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs uppercase font-bold tracking-widest text-amber-400">
                Guaranteed Best Rate
              </span>

              <div className="flex items-baseline space-x-2 mt-2">
                <span className="text-3xl sm:text-4xl font-black font-sans text-amber-400">
                  ${packageData.price.toLocaleString()}
                </span>
                <span className="text-sm text-slate-400 font-normal">/ person</span>
              </div>

              <p className="text-xs text-slate-400 mt-2">
                Customized private travel itinerary. Zero booking fees.
              </p>

              {/* Book Now Button */}
              <button
                onClick={scrollToBooking}
                className="w-full mt-6 py-4 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-400/20 hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Book This Package Now</span>
                <ChevronRight className="w-4 h-4" />
              </button>

              <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Free cancellation up to 14 days</span>
                <span>Immediate confirmation</span>
              </div>
            </div>

            {/* The Booking Form Section */}
            <BookingForm packageData={packageData} />

          </div>

        </div>

      </div>
    </div>
  );
}
