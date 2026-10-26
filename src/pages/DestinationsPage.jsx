import React, { useState, useMemo } from 'react';
import { TRAVEL_PACKAGES, REGIONS } from '../data/mockData';
import PackageCard from '../components/PackageCard';
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  RotateCcw, 
  Compass, 
  DollarSign, 
  MapPin,
  Sparkles
} from 'lucide-react';

export default function DestinationsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [maxPrice, setMaxPrice] = useState(6000);
  const [sortBy, setSortBy] = useState('featured');

  // Find min and max price across all packages
  const minPackagePrice = useMemo(() => {
    return Math.min(...TRAVEL_PACKAGES.map((p) => p.price));
  }, []);

  const maxPackagePrice = useMemo(() => {
    return Math.max(...TRAVEL_PACKAGES.map((p) => p.price));
  }, []);

  // Filter and sort packages
  const filteredPackages = useMemo(() => {
    return TRAVEL_PACKAGES.filter((pkg) => {
      // Search term matching title or country
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
        pkg.country.toLowerCase().includes(searchTerm.toLowerCase().trim());

      // Region filter
      const matchesRegion =
        selectedRegion === 'All' || pkg.region.toLowerCase() === selectedRegion.toLowerCase();

      // Price filter
      const matchesPrice = pkg.price <= maxPrice;

      return matchesSearch && matchesRegion && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      // Default: featured first
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [searchTerm, selectedRegion, maxPrice, sortBy]);

  const isFiltered = searchTerm !== '' || selectedRegion !== 'All' || maxPrice < maxPackagePrice || sortBy !== 'featured';

  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedRegion('All');
    setMaxPrice(maxPackagePrice);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="pt-6 pb-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-500 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Catalog</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
            Curated World Destinations
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Filter our exclusive private sanctuaries and expeditions by continent, budget, or destination preference.
          </p>
        </div>

        {/* Filter & Search Bar Container */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md mb-10 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            
            {/* Search Input (5 Cols on large) */}
            <div className="lg:col-span-5">
              <label htmlFor="search-destinations" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Search Destination or Country
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Search className="w-4 h-4" />
                </div>
                <input
                  id="search-destinations"
                  type="text"
                  placeholder="e.g. Italy, Bora Bora, Japan, Tanzania..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Price Filter Slider (4 Cols on large) */}
            <div className="lg:col-span-4">
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="price-slider" className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
                  Max Price Per Person
                </label>
                <span className="text-sm font-extrabold text-amber-600 dark:text-amber-400 font-sans">
                  Up to ${maxPrice.toLocaleString()}
                </span>
              </div>
              <input
                id="price-slider"
                type="range"
                min={minPackagePrice}
                max={maxPackagePrice}
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                <span>${minPackagePrice.toLocaleString()}</span>
                <span>${maxPackagePrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Sort Options (3 Cols on large) */}
            <div className="lg:col-span-3">
              <label htmlFor="sort-by" className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2">
                Sort Journeys By
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

          </div>

          {/* Region Tabs / Pills */}
          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-amber-500" />
                Region:
              </span>
              {REGIONS.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedRegion === region
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

            {/* Reset Filters Button */}
            {isFiltered && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center space-x-1 text-xs font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition-colors py-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
            Showing <span className="font-bold text-slate-900 dark:text-white">{filteredPackages.length}</span> of {TRAVEL_PACKAGES.length} luxury packages
          </p>
          {selectedRegion !== 'All' && (
            <span className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full">
              Region: <strong>{selectedRegion}</strong>
            </span>
          )}
        </div>

        {/* Grid of Destination Packages */}
        {filteredPackages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard key={pkg.id} packageData={pkg} />
            ))}
          </div>
        ) : (
          /* Empty Search & Filter State */
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm max-w-lg mx-auto">
            <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Compass className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white mb-2">
              No Expeditions Match Your Criteria
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-6 leading-relaxed">
              We couldn&apos;t find any travel packages matching &ldquo;{searchTerm || selectedRegion}&rdquo; within your selected price threshold. Try expanding your search or resetting your filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
