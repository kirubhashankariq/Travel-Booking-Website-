import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  MapPin, 
  Trash2, 
  Compass, 
  CheckCircle, 
  Sparkles, 
  Printer, 
  ExternalLink,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState('');
  const [confirmCancelId, setConfirmCancelId] = useState(null);

  const location = useLocation();

  // Load bookings from localStorage safely
  const loadBookings = () => {
    try {
      const stored = localStorage.getItem('userBookings');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setBookings(parsed);
          return;
        }
      }
      setBookings([]);
    } catch (e) {
      console.error('Error reading userBookings from localStorage:', e);
      setBookings([]);
    }
  };

  useEffect(() => {
    loadBookings();

    // Check if coming from fresh booking submission
    if (location.state?.newBookingSuccess) {
      setNotificationMsg(
        `Welcome! Your booking for "${location.state.packageTitle}" (Ref: ${location.state.bookingRef}) has been confirmed.`
      );
      setShowNotification(true);
      const timer = setTimeout(() => setShowNotification(false), 8000);
      return () => clearTimeout(timer);
    }
  }, [location]);

  // Cancel / Delete a booking
  const handleCancelBooking = (bookingId) => {
    const updated = bookings.filter((b) => b.id !== bookingId);
    setBookings(updated);
    localStorage.setItem('userBookings', JSON.stringify(updated));
    window.dispatchEvent(new Event('bookingUpdated'));
    setConfirmCancelId(null);
  };

  const handlePrint = () => {
    window.print();
  };

  // Format date helper
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Notification for fresh booking */}
        {showNotification && (
          <div className="mb-8 p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 flex items-center justify-between text-emerald-900 dark:text-emerald-100 shadow-lg animate-fade-in">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <p className="text-sm font-semibold">{notificationMsg}</p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-950 text-xs font-bold underline ml-4 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pt-6 pb-8 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-500 dark:text-amber-400 text-xs font-bold tracking-widest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Guest Portal</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
              My Reserved Expeditions
            </h1>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2">
              Review and manage your confirmed bespoke travel itineraries and reservations.
            </p>
          </div>

          {bookings.length > 0 && (
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrint}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 shadow-sm transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Schedule</span>
              </button>
              <Link
                to="/destinations"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-sm transition-colors"
              >
                <Compass className="w-4 h-4" />
                <span>Book Another</span>
              </Link>
            </div>
          )}
        </div>

        {/* Content Section */}
        {bookings.length === 0 ? (
          /* EMPTY STATE */
          <div className="py-20 max-w-xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/40 text-amber-500 flex items-center justify-center mx-auto mb-6 shadow-inner">
              <Compass className="w-10 h-10 stroke-[1.5]" />
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
              No Bespoke Journeys Reserved Yet
            </h2>

            <p className="mt-3 text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-md mx-auto">
              Your personal travel dossier is currently empty. Explore our hand-curated collection of private luxury packages across Europe, Asia, Africa, and beyond.
            </p>

            <div className="mt-8">
              <Link
                to="/destinations"
                className="inline-flex items-center space-x-2 px-8 py-4 rounded-full bg-slate-900 text-white dark:bg-amber-400 dark:text-slate-950 font-extrabold text-xs uppercase tracking-wider shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4" />
                <span>Explore Destinations Catalog</span>
              </Link>
            </div>
          </div>
        ) : (
          /* BOOKINGS LIST */
          <div className="mt-8 space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Thumbnail & Package Title (5 Cols) */}
                  <div className="lg:col-span-5 flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-5">
                    <img
                      src={booking.packageImage}
                      alt={booking.packageTitle}
                      className="w-full sm:w-28 sm:h-28 rounded-2xl object-cover object-center border border-slate-200 dark:border-slate-800 flex-shrink-0"
                    />
                    <div>
                      <div className="flex items-center space-x-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                          {booking.status || 'Confirmed'}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          Ref: #{booking.referenceNumber}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white line-clamp-1">
                        {booking.packageTitle}
                      </h3>

                      <p className="flex items-center text-xs text-slate-500 dark:text-slate-400 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-amber-500 mr-1" />
                        {booking.country} • {booking.duration}
                      </p>
                    </div>
                  </div>

                  {/* Travel Date & Travelers (3 Cols) */}
                  <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 gap-3 py-2 border-y lg:border-y-0 lg:border-x border-slate-100 dark:border-slate-800 lg:px-6">
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Departure Date
                      </span>
                      <div className="flex items-center space-x-1.5 mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>{formatDate(booking.travelDate)}</span>
                      </div>
                    </div>

                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Travelers
                      </span>
                      <div className="flex items-center space-x-1.5 mt-1 text-sm font-semibold text-slate-800 dark:text-slate-200">
                        <Users className="w-4 h-4 text-amber-500" />
                        <span>
                          {booking.travelers} {booking.travelers > 1 ? 'Guests' : 'Guest'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Total Price (2 Cols) */}
                  <div className="lg:col-span-2">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Total Investment
                    </span>
                    <div className="text-2xl font-black text-slate-900 dark:text-amber-400 font-sans mt-0.5">
                      ${booking.totalPrice?.toLocaleString()}
                    </div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      (${booking.pricePerPerson?.toLocaleString()} / guest)
                    </span>
                  </div>

                  {/* Actions (2 Cols) */}
                  <div className="lg:col-span-2 flex items-center lg:flex-col justify-end lg:justify-center gap-2">
                    <Link
                      to={`/package/${booking.packageId}`}
                      className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-colors w-full"
                    >
                      <span>View</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {confirmCancelId === booking.id ? (
                      <div className="flex items-center space-x-2 w-full animate-fade-in">
                        <button
                          onClick={() => handleCancelBooking(booking.id)}
                          className="px-2.5 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 flex-1 transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmCancelId(null)}
                          className="px-2.5 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 flex-1 transition-colors cursor-pointer"
                        >
                          Keep
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmCancelId(booking.id)}
                        className="inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-xs font-semibold transition-colors w-full cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Cancel</span>
                      </button>
                    )}
                  </div>

                </div>

                {/* Booking Footer Details (Passenger Name, Email, Notes) */}
                <div className="bg-slate-50/80 dark:bg-slate-950/40 px-6 sm:px-8 py-3.5 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center space-x-4">
                    <span>Lead Guest: <strong className="text-slate-700 dark:text-slate-200">{booking.fullName}</strong></span>
                    <span>•</span>
                    <span>Email: <strong className="text-slate-700 dark:text-slate-200">{booking.email}</strong></span>
                    <span>•</span>
                    <span>Phone: <strong className="text-slate-700 dark:text-slate-200">{booking.phone}</strong></span>
                  </div>

                  {booking.specialRequests && (
                    <div className="text-xs italic text-amber-600 dark:text-amber-400">
                      &ldquo;{booking.specialRequests}&rdquo;
                    </div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
