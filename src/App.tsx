/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CONFIG, Service, BridalPackage, Stylist } from './config';
import { DemoStrip } from './components/DemoStrip';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { BridalSection } from './components/BridalSection';
import { GallerySection } from './components/GallerySection';
import { TeamSection } from './components/TeamSection';
import { BookingSection } from './components/BookingSection';
import { ReviewsSection } from './components/ReviewsSection';
import { OffersSection } from './components/OffersSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  // Pre-seed with one signature service for a warm, ready-to-book experience
  const [selectedServices, setSelectedServices] = useState<Service[]>([
    CONFIG.services[0], // Botanical Keratin Infusion & Silk Spa
  ]);
  const [selectedStylistId, setSelectedStylistId] = useState<string | null>(null);

  // Smooth scroll helpers
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookNowClick = () => {
    scrollToSection('booking');
  };

  const handlePlanBridalClick = () => {
    scrollToSection('bridal');
  };

  // Toggle service in booking list
  const handleToggleService = (service: Service) => {
    setSelectedServices(prev => {
      const exists = prev.some(s => s.id === service.id);
      if (exists) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  // Select Bridal package and jump to booking
  const handleSelectBridalPackageForBooking = (pkg: BridalPackage) => {
    // Add bridal package as a special service item
    const bridalServiceItem: Service = {
      id: `bridal-${pkg.id}`,
      name: `${pkg.tier}: ${pkg.name}`,
      category: 'makeup',
      durationMinutes: 180,
      priceInr: pkg.priceInr,
      description: pkg.description,
      popular: true,
    };

    setSelectedServices([bridalServiceItem]);
    scrollToSection('booking');
  };

  // Select Stylist from team section and jump to booking
  const handleSelectStylist = (stylist: Stylist) => {
    setSelectedStylistId(stylist.id);
    scrollToSection('booking');
  };

  return (
    <div className="min-h-screen bg-[#F6F1E7] text-[#2B2B28] flex flex-col font-sans selection:bg-[#8A9A7B]/20 selection:text-[#2B2B28]">
      {/* 0. Demo Notice Strip */}
      <DemoStrip />

      {/* 1. Sticky Header */}
      <Header onBookNowClick={handleBookNowClick} />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <Hero
          onBookAppointment={handleBookNowClick}
          onPlanBridalLook={handlePlanBridalClick}
        />

        {/* 3. Services Section */}
        <ServicesSection
          selectedServiceIds={selectedServices.map(s => s.id)}
          onToggleService={handleToggleService}
          onGoToBooking={handleBookNowClick}
        />

        {/* 4. Bridal Section with Package Builder */}
        <BridalSection
          onSelectBridalPackageForBooking={handleSelectBridalPackageForBooking}
        />

        {/* 5. Gallery Section with Before/After Slider */}
        <GallerySection />

        {/* 6. Team Section */}
        <TeamSection onSelectStylist={handleSelectStylist} />

        {/* 7. Booking Section (Feature A) */}
        <BookingSection
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          selectedStylistId={selectedStylistId}
          onSelectStylistId={setSelectedStylistId}
        />

        {/* 8. Reviews Section */}
        <ReviewsSection />

        {/* 9. Offers & Memberships */}
        <OffersSection />

        {/* 10. Contact Section */}
        <ContactSection />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* 12. Floating WhatsApp Button */}
      <FloatingWhatsApp />
    </div>
  );
}
