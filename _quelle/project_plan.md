# Fahrzeug-Prüfung-Staig Website Rebuild

## 1. Project Description
A rebuild of the German vehicle inspection station website (FSP/TÜV Rheinland partner) for Fahrzeugprüfung Staig. The site serves as an informational and appointment-booking portal for vehicle safety inspections, certifications, and related services in Staig/Steinberg, Germany.

## 2. Page Structure
- `/` - Home (Startseite) - Main landing page with welcome, services, opening hours, contact form
- `/termin-vereinbaren` - Termin vereinbaren (Appointment Booking) - Online appointment booking
- `/ueber-uns` - Über uns (About Us) - Company information and team
- `/preise` - Preise (Prices) - Service pricing
- `/oeffnungszeiten` - Öffnungszeiten (Opening Hours) - Detailed hours and holidays
- `/kontakt` - Kontakt (Contact) - Contact information and map
- `/impressum` - Impressum (Imprint) - Legal imprint

## 3. Core Features
- [x] Responsive navigation with mobile menu
- [x] Hero banner with FSP/TÜV branding
- [x] Welcome section with company introduction
- [x] Opening hours display
- [x] Services list (official and additional services)
- [x] Contact form with GDPR consent checkbox
- [x] Footer with navigation and social links
- [x] Multi-page routing for all sections
- [x] Appointment booking form
- [x] Google Maps integration on contact page

## 4. Data Model Design
No database required for this informational website. All content is static.

## 5. Backend / Third-party Integration Plan
- None required for this rebuild. The site is a static informational website.
- Contact form can be implemented via Readdy form handling.

## 6. Development Phase Plan

### Phase 1: Homepage Core
- Goal: Build the main homepage with all core sections (header, hero banner, welcome, opening hours, services, contact form, footer)
- Deliverable: Fully functional homepage matching the original design

### Phase 2: Additional Pages
- Goal: Build the remaining 6 pages (appointment, about us, prices, opening hours, contact, imprint)
- Deliverable: Complete multi-page website with all navigation routes

### Phase 3: Polish & Interactions
- Goal: Add animations, responsive mobile menu, hover effects, and final polish
- Deliverable: Production-ready website with smooth interactions

### Phase 4: Enhanced Appointment Booking
- Goal: Rebuild the appointment booking page with a full 4-step booking flow matching the original website
- Deliverable: Complete booking wizard with category selection, service selection, calendar + time slots, customer details, and summary
- Steps:
  1. Service (Kategorie + Dienst wählen)
  2. Termin (Datum + Zeitfenster)
  3. Ihre Daten (Kundendaten eingeben)
  4. Zusammenfassung (Buchungsübersicht)
- Features: Vehicle categories, service cards with prices and duration, calendar picker, time slot selection, customer form with validation, booking summary
- Backend: Mock data for now; real calendar integration planned later