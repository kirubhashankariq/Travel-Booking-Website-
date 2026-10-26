import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
      <div className="text-center max-w-md bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/50 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
          <Compass className="w-8 h-8" />
        </div>
        <span className="text-xs font-bold uppercase tracking-widest text-amber-500">
          404 Error
        </span>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white mt-1">
          Uncharted Territory
        </h1>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
          The sanctuary or destination you are seeking cannot be reached. Return to known latitudes.
        </p>
        <Link
          to="/"
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-md"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
