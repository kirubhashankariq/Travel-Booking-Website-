import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowRight } from 'lucide-react';

export default function PackageCard({ packageData }) {
  const { id, title, country, region, description, price, duration, imageUrl, rating } = packageData;

  return (
    <article className="group relative flex flex-col bg-white dark:bg-slate-900/90 rounded-2xl overflow-hidden border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Region & Country Tag */}
        <div className="absolute top-3.5 left-3.5 flex items-center space-x-1.5 px-3 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-xs font-medium tracking-wide border border-white/10 shadow-sm">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>{country}</span>
          <span className="text-white/40">•</span>
          <span className="text-amber-300">{region}</span>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3.5 right-3.5 flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold shadow-md">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span>{rating.toFixed(2)}</span>
        </div>

        {/* Duration Overlay Pill */}
        <div className="absolute bottom-3 left-3.5 flex items-center space-x-1.5 text-xs text-white/90 font-medium">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{duration}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-col flex-grow p-5 sm:p-6">
        <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
          {title}
        </h3>

        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed flex-grow">
          {description}
        </p>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 dark:bg-slate-800 my-4" />

        {/* Footer: Price & CTA */}
        <div className="flex items-center justify-between mt-auto">
          <div>
            <span className="block text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-400 font-semibold">
              From
            </span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-black text-slate-900 dark:text-amber-400 font-sans tracking-tight">
                ${price.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">
                / person
              </span>
            </div>
          </div>

          <Link
            to={`/package/${id}`}
            className="inline-flex items-center space-x-1.5 px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 hover:bg-amber-500 dark:hover:bg-amber-300 font-bold text-xs uppercase tracking-wider transition-all duration-200 group-hover:shadow-md"
            aria-label={`View details for ${title}`}
          >
            <span>Explore</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}
