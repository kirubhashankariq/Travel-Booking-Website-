import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { 
  Compass, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  BriefcaseBusiness, 
  Sparkles,
  MapPin
} from 'lucide-react';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [bookingCount, setBookingCount] = useState(0);
  const location = useLocation();

  // Close mobile menu whenever location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Track scroll position for navbar backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update booking count from localStorage
  const updateBookingCount = () => {
    try {
      const stored = localStorage.getItem('userBookings');
      if (stored) {
        const bookings = JSON.parse(stored);
        setBookingCount(Array.isArray(bookings) ? bookings.length : 0);
      } else {
        setBookingCount(0);
      }
    } catch {
      setBookingCount(0);
    }
  };

  useEffect(() => {
    updateBookingCount();
    // Listen for storage events across tabs or local triggers
    window.addEventListener('storage', updateBookingCount);
    // Custom event listener for immediate updates within same tab
    window.addEventListener('bookingUpdated', updateBookingCount);
    return () => {
      window.removeEventListener('storage', updateBookingCount);
      window.removeEventListener('bookingUpdated', updateBookingCount);
    };
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Destinations', path: '/destinations' },
    { name: 'My Bookings', path: '/my-bookings', badge: bookingCount },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-md border-b border-slate-200/80 dark:border-slate-800/80 py-3.5'
          : 'bg-white/70 dark:bg-slate-950/70 backdrop-blur-sm border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group focus:outline-none"
            aria-label="Aura Luxe Home"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl font-bold tracking-wider text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                AURA<span className="text-amber-500 font-sans text-xl ml-1 font-semibold tracking-widest">LUXE</span>
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400 font-medium">
                Curated Expeditions
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 flex items-center space-x-2 ${
                    isActive
                      ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`
                }
              >
                <span>{link.name}</span>
                {typeof link.badge === 'number' && link.badge > 0 && (
                  <span className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-bold leading-none text-slate-950 bg-amber-400 rounded-full animate-pulse shadow-sm">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons: Dark Mode Toggle & Mobile Menu */}
          <div className="flex items-center space-x-3">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              type="button"
              className="p-2.5 rounded-full text-slate-600 hover:text-amber-600 dark:text-slate-300 dark:hover:text-amber-400 bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200/80 dark:hover:bg-slate-700/80 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              aria-label={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* CTA Button for Desktop */}
            <Link
              to="/destinations"
              className="hidden lg:inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-md hover:shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore Journeys</span>
            </Link>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="md:hidden p-2.5 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-950/95 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2 shadow-2xl transition-all">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`
              }
            >
              <span>{link.name}</span>
              {typeof link.badge === 'number' && link.badge > 0 && (
                <span className="px-2.5 py-0.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-full">
                  {link.badge}
                </span>
              )}
            </NavLink>
          ))}
          <div className="pt-2">
            <Link
              to="/destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold text-sm shadow-md"
            >
              <Sparkles className="w-4 h-4" />
              <span>Explore All Journeys</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
