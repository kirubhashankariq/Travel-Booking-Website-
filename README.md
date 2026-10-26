# AURA LUXE — Curated Luxury Travel & Expeditions

A premier, fully responsive luxury travel booking web application built with **React**, **Vite**, **Tailwind CSS**, and **React Router DOM (v6+)**.

---

## 🌟 Key Features

1. **Header & Navigation Bar (`Navbar`)**
   - Active route indicators using `NavLink` with gold accent styling.
   - Dynamic notification badge counting active reserved itineraries in real-time.
   - Smooth light / dark mode toggle with persistent state in `localStorage` and HTML root synchronization.
   - Fully responsive slide-down mobile hamburger menu.

2. **Hero & Popular Destinations (`HomePage`)**
   - Striking high-contrast hero banner with multi-layered gradient overlays and call-to-action buttons.
   - "Popular Destinations" section featuring top-tier travel packages in a responsive grid.
   - "Why Aura Luxe" luxury features strip (Private Aviation, Vetted Sanctuaries, Concierge, Charters).
   - Social proof and guest testimonials.

3. **Curated World Destinations Catalog (`DestinationsPage`)**
   - Real-time search by package title or country.
   - Continent / Region filter tabs (`All`, `Europe`, `Asia`, `Americas`, `Africa`, `Oceania`).
   - Dynamic price range slider (filtering packages up to `$6,000`).
   - Sort dropdown (Featured, Price: Low to High, Price: High to Low, Highest Rated).
   - "Reset All Filters" quick-action button and custom empty search state.

4. **Expedition Details Page (`PackageDetailsPage`)**
   - Deep-linked by package ID (`/package/:id`).
   - Interactive multi-image gallery with clickable thumbnail selector.
   - Key specifications: duration, rating, group size, region, country.
   - Day-by-Day expandable itinerary accordion.
   - "What's Included" luxury inclusions list.
   - Sticky rates card with smooth scroll anchor directly to the reservation form.

5. **Real-Time Booking Form (`BookingForm`)**
   - Strict input validation: Full Name (min 3 chars), valid email regex, valid phone, travel date in the future (`min={tomorrow}`), travelers (min 1, max 20).
   - **Dynamic Price Calculation**: Real-time multiplication of `pricePerPerson × travelers` with itemized fee breakdown.
   - Saves reservation to `localStorage` under `userBookings` key with auto-generated reference number (e.g., `#AL-849201`).
   - Dispatches custom `bookingUpdated` event for immediate Navbar badge incrementation.
   - Automatic redirection to `/my-bookings` with celebratory success banner.

6. **Guest Reservations Dossier (`MyBookingsPage`)**
   - Safely parses `localStorage.getItem('userBookings')`.
   - Comprehensive card list displaying reference numbers, lead passenger details, travel dates, passenger counts, and total investments.
   - Print-ready format button (`window.print()`).
   - Interactive booking cancellation with two-step confirmation dialog.
   - Custom luxury empty state when no bookings exist.

---

## 🚀 Quick Start Guide

### 1. Navigate to Project Directory
```bash
cd travel-booking-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173` to explore the application.

### 4. Build for Production
```bash
npm run build
```
Creates an optimized static production build in `dist/`.

---

## 🎨 Design System & Color Palette
- **Obsidian / Dark Base**: `#020617` / `#0f172a`
- **Luxury Gold Accents**: `#D4AF37` / `#F59E0B`
- **Card Backgrounds**: Pure White with subtle borders (`border-slate-200`) in light mode; Slate 900 (`#0f172a`) in dark mode.
- **Typography**: `Playfair Display` (editorial serif headings) and `Plus Jakarta Sans` (ultra-clean body sans).
