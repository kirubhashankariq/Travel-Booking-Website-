import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Users, 
  User, 
  Mail, 
  Phone, 
  CheckCircle, 
  ShieldCheck, 
  Sparkles,
  Info,
  Loader2
} from 'lucide-react';

export default function BookingForm({ packageData }) {
  const navigate = useNavigate();

  // Calculate tomorrow's date for minimum travel date (future date requirement)
  const tomorrowStr = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }, []);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: tomorrowStr,
    travelers: 2,
    specialRequests: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  // Dynamic Total Price Calculation
  const totalPrice = useMemo(() => {
    const travelerCount = Math.max(1, parseInt(formData.travelers, 10) || 1);
    return packageData.price * travelerCount;
  }, [packageData.price, formData.travelers]);

  // Validation function
  const validateField = (name, value) => {
    let error = '';
    if (name === 'fullName') {
      if (!value.trim()) error = 'Full name is required.';
      else if (value.trim().length < 3) error = 'Name must be at least 3 characters.';
    }
    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = 'Email address is required.';
      else if (!emailRegex.test(value.trim())) error = 'Please enter a valid email address.';
    }
    if (name === 'phone') {
      if (!value.trim()) error = 'Phone number is required.';
      else if (value.trim().replace(/\D/g, '').length < 7) error = 'Please enter a valid phone number.';
    }
    if (name === 'travelDate') {
      if (!value) {
        error = 'Travel date is required.';
      } else {
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate <= today) {
          error = 'Travel date must be in the future.';
        }
      }
    }
    if (name === 'travelers') {
      const count = parseInt(value, 10);
      if (!count || count < 1) error = 'Travelers must be at least 1.';
      else if (count > 20) error = 'For groups larger than 20, contact our VIP Private Charter team.';
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validation clearance
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== 'specialRequests') {
        const err = validateField(key, formData[key]);
        if (err) newErrors[key] = err;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    // Simulate luxury booking reservation processing
    setTimeout(() => {
      try {
        const existingBookingsStr = localStorage.getItem('userBookings');
        let existingBookings = [];
        if (existingBookingsStr) {
          try {
            existingBookings = JSON.parse(existingBookingsStr);
            if (!Array.isArray(existingBookings)) existingBookings = [];
          } catch {
            existingBookings = [];
          }
        }

        const newBooking = {
          id: 'bk_' + Date.now(),
          referenceNumber: 'AL-' + Math.floor(100000 + Math.random() * 900000),
          packageId: packageData.id,
          packageTitle: packageData.title,
          packageImage: packageData.imageUrl,
          country: packageData.country,
          duration: packageData.duration,
          fullName: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          travelDate: formData.travelDate,
          travelers: parseInt(formData.travelers, 10),
          pricePerPerson: packageData.price,
          totalPrice: totalPrice,
          specialRequests: formData.specialRequests.trim(),
          createdAt: new Date().toISOString(),
          status: 'Confirmed',
        };

        const updatedBookings = [newBooking, ...existingBookings];
        localStorage.setItem('userBookings', JSON.stringify(updatedBookings));

        // Notify Navbar of new booking
        window.dispatchEvent(new Event('bookingUpdated'));

        setSuccessMessage(`Booking confirmed! Reference: ${newBooking.referenceNumber}`);
        setIsSubmitting(false);

        // Redirect to My Bookings with confirmation state
        setTimeout(() => {
          navigate('/my-bookings', { 
            state: { 
              newBookingSuccess: true, 
              bookingRef: newBooking.referenceNumber,
              packageTitle: packageData.title
            } 
          });
        }, 1200);

      } catch (err) {
        console.error('Failed to save booking:', err);
        setIsSubmitting(false);
        setErrors({ submit: 'An error occurred while saving your booking. Please try again.' });
      }
    }, 900);
  };

  return (
    <div id="booking-section" className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl transition-all">
      <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-amber-500">
            Instant Confirmation
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mt-1">
            Reserve This Expedition
          </h2>
        </div>
        <div className="hidden sm:flex items-center space-x-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
          <ShieldCheck className="w-4 h-4" />
          <span>Best Price Guarantee</span>
        </div>
      </div>

      {successMessage ? (
        <div className="py-12 text-center space-y-4 animate-fade-in">
          <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-9 h-9" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
            Reservation Secured!
          </h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-md mx-auto text-sm">
            {successMessage}
          </p>
          <p className="text-xs text-amber-600 dark:text-amber-400 animate-pulse font-medium">
            Redirecting to your bespoke itinerary schedule...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
          {errors.submit && (
            <div className="p-3 text-sm text-rose-600 bg-rose-50 dark:bg-rose-950/40 rounded-xl border border-rose-200 dark:border-rose-800">
              {errors.submit}
            </div>
          )}

          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="fullName"
                type="text"
                name="fullName"
                placeholder="e.g. Lord Harrison Montgomery"
                value={formData.fullName}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                  errors.fullName
                    ? 'border-rose-400 focus:ring-rose-400/30'
                    : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                }`}
              />
            </div>
            {errors.fullName && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.fullName}</p>}
          </div>

          {/* Email & Phone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@domain.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.email
                      ? 'border-rose-400 focus:ring-rose-400/30'
                      : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                  }`}
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Phone Number <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                    errors.phone
                      ? 'border-rose-400 focus:ring-rose-400/30'
                      : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                  }`}
                />
              </div>
              {errors.phone && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.phone}</p>}
            </div>
          </div>

          {/* Travel Date & Number of Travelers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Travel Date */}
            <div>
              <label htmlFor="travelDate" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Departure Date <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  id="travelDate"
                  type="date"
                  name="travelDate"
                  min={tomorrowStr}
                  value={formData.travelDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.travelDate
                      ? 'border-rose-400 focus:ring-rose-400/30'
                      : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                  }`}
                />
              </div>
              {errors.travelDate && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.travelDate}</p>}
            </div>

            {/* Travelers Count */}
            <div>
              <label htmlFor="travelers" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Travelers <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Users className="w-4 h-4" />
                </div>
                <input
                  id="travelers"
                  type="number"
                  name="travelers"
                  min="1"
                  max="20"
                  value={formData.travelers}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.travelers
                      ? 'border-rose-400 focus:ring-rose-400/30'
                      : 'border-slate-200 dark:border-slate-700 focus:border-amber-500 focus:ring-amber-500/20'
                  }`}
                />
              </div>
              {errors.travelers && <p className="mt-1 text-xs text-rose-500 font-medium">{errors.travelers}</p>}
            </div>
          </div>

          {/* Special Requests (Optional) */}
          <div>
            <label htmlFor="specialRequests" className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Special Requests & Concierge Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
            </label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              rows={2}
              placeholder="E.g., dietary restrictions, anniversary arrangements, private jet transfer preferences..."
              value={formData.specialRequests}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none"
            />
          </div>

          {/* Real-time Dynamic Price Calculation Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <span>Rate Per Traveler</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                ${packageData.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <span>Travelers Count</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">
                × {Math.max(1, parseInt(formData.travelers, 10) || 1)}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <span className="flex items-center space-x-1">
                <span>VIP Lifestyle Concierge & Taxes</span>
                <Info className="w-3.5 h-3.5 text-amber-500" />
              </span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Complimentary ($0)
              </span>
            </div>

            <div className="h-px bg-slate-200 dark:bg-slate-700 my-2" />

            <div className="flex items-baseline justify-between pt-1">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Total Investment
                </span>
                <p className="text-[11px] text-slate-400">Includes all taxes & private transfers</p>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-amber-400 font-sans">
                ${totalPrice.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-extrabold text-base uppercase tracking-wider shadow-lg shadow-amber-500/25 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Securing Reservation...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Confirm & Reserve Booking</span>
              </>
            )}
          </button>

          <div className="flex items-center justify-center space-x-4 text-[11px] text-slate-400 dark:text-slate-500 pt-1 text-center">
            <span>🔒 256-Bit SSL Encryption</span>
            <span>•</span>
            <span>Zero cancellation fee within 14 days</span>
          </div>
        </form>
      )}
    </div>
  );
}
