import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Mail, ArrowRight, ShieldCheck, Award, HeartHandshake, CheckCircle } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-black dark:text-slate-400 border-t border-slate-800 transition-colors">
      {/* Trust Badges Strip */}
      <div className="border-b border-slate-800/80 py-8 bg-slate-950/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="flex items-center justify-center space-x-3">
              <Award className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-200">Virtuoso Preferred</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <ShieldCheck className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-200">100% Financial Protection</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <Compass className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-200">Private Jet & Yacht Access</span>
            </div>
            <div className="flex items-center justify-center space-x-3">
              <HeartHandshake className="w-5 h-5 text-amber-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-200">24/7 Dedicated Concierge</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg">
                <Compass className="w-5 h-5 text-slate-950 stroke-[2.5]" />
              </div>
              <span className="font-serif text-2xl font-bold tracking-wider text-white">
                AURA<span className="text-amber-400 font-sans text-xl ml-1 font-semibold tracking-widest">LUXE</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Crafting bespoke global expeditions, secluded sanctuaries, and unforgettable private voyages for discerning explorers since 2012.
            </p>
            <div className="pt-2 text-xs text-slate-500 space-y-1">
              <p>Headquarters: 450 Park Avenue, Penthouse Level, New York, NY</p>
              <p>Direct Concierge: +1 (800) 892-AURA</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-4">
              Expeditions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/destinations" className="hover:text-amber-400 transition-colors">
                  All Destinations
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-amber-400 transition-colors">
                  Mediterranean Odyssey
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-amber-400 transition-colors">
                  Alpine Sanctuaries
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-amber-400 transition-colors">
                  Private African Safari
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-amber-400 transition-colors">
                  Polynesian Overwater
                </Link>
              </li>
            </ul>
          </div>

          {/* Guest Services */}
          <div>
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400 mb-4">
              Guest Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/my-bookings" className="hover:text-amber-400 transition-colors">
                  My Bookings
                </Link>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
                  Private Aviation Charter
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
                  Superyacht Concierge
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
                  Bespoke Gift Vouchers
                </span>
              </li>
              <li>
                <span className="text-slate-400 hover:text-slate-200 cursor-pointer transition-colors">
                  Safety & Privacy Protocol
                </span>
              </li>
            </ul>
          </div>

          {/* VIP Newsletter */}
          <div className="space-y-4">
            <h4 className="text-xs uppercase font-bold tracking-widest text-amber-400">
              The Aura Gazette
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive private invitation-only itineraries and seasonal editorial releases.
            </p>
            {subscribed ? (
              <div className="flex items-center space-x-2 text-xs text-amber-400 bg-amber-950/40 border border-amber-800/80 p-3 rounded-xl">
                <CheckCircle className="w-4 h-4 flex-shrink-0" />
                <span>You have been subscribed to our private dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your private email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400"
                  />
                  <button
                    type="submit"
                    aria-label="Subscribe to newsletter"
                    className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-10 mt-10 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AURA LUXE Journeys International Inc. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Charter</span>
            <span className="hover:text-slate-400 cursor-pointer">Guest Protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
