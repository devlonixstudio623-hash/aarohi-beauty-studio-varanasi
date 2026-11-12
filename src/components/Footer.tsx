import React from 'react';
import { CONFIG } from '../config';
import { Instagram, Phone, MessageCircle, MapPin, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  // Schema.org LocalBusiness structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "name": CONFIG.businessName,
    "description": CONFIG.shortDescription,
    "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c",
    "telephone": CONFIG.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": CONFIG.address,
      "addressLocality": "Varanasi",
      "addressRegion": "UP",
      "postalCode": "221010",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 25.300582,
      "longitude": 82.977464
    },
    "url": "https://aarohibeautystudio.com",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday", "Sunday"],
        "opens": "10:00",
        "closes": "20:30"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": CONFIG.googleRating,
      "reviewCount": CONFIG.totalReviewsCount
    },
    "priceRange": "₹₹ - ₹₹₹"
  };

  return (
    <footer className="bg-[#2B2B28] text-[#F6F1E7] pt-16 pb-12 border-t border-[#B89B5E]/20">
      {/* Inject Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-3xl tracking-tight text-white">
                {CONFIG.businessName.split(' ')[0]}
              </span>
              <span className="font-serif italic text-3xl text-[#B89B5E]">
                {CONFIG.businessName.split(' ').slice(1).join(' ')}
              </span>
            </div>
            
            <p className="text-xs uppercase tracking-[0.2em] text-[#B89B5E] font-medium">
              Varanasi • Sigra
            </p>

            <p className="text-sm text-[#E8DCC8]/70 max-w-sm leading-relaxed">
              {CONFIG.shortDescription}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8A9A7B] flex items-center justify-center text-white transition-colors"
                aria-label="Instagram profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${CONFIG.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#25D366] flex items-center justify-center text-white transition-colors"
                aria-label="WhatsApp chat"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={`tel:${CONFIG.phoneRaw}`}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#8A9A7B] flex items-center justify-center text-white transition-colors"
                aria-label="Phone number"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B89B5E]">
              Studio Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-[#E8DCC8]/80">
              <li>
                <a href="#services" className="hover:text-white transition-colors">Hair & Facial Rituals</a>
              </li>
              <li>
                <a href="#bridal" className="hover:text-white transition-colors">Bridal Packages & Builder</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Before / After Slider</a>
              </li>
              <li>
                <a href="#team" className="hover:text-white transition-colors">Artists & Aestheticians</a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">Verified Google Reviews</a>
              </li>
              <li>
                <a href="#offers" className="hover:text-white transition-colors">Welcome Offers & Passes</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Location & Hours</a>
              </li>
            </ul>
          </div>

          {/* Location & Timings (4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-xs sm:text-sm text-[#E8DCC8]/80">
            <h4 className="text-xs uppercase tracking-widest font-semibold text-[#B89B5E]">
              Visiting Sigra Sanctuary
            </h4>
            
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-[#8A9A7B] shrink-0 mt-0.5" />
              <span>{CONFIG.address}, {CONFIG.area}, {CONFIG.city}</span>
            </div>

            <div className="pt-2">
              <span className="font-semibold text-white block mb-1">Open 7 Days a Week:</span>
              <p className="text-xs text-[#E8DCC8]/70">Mon – Fri: 10:00 AM – 8:00 PM</p>
              <p className="text-xs text-[#E8DCC8]/70">Sat – Sun: 10:00 AM – 8:30 PM</p>
            </div>

            <p className="text-[11px] text-[#8A9A7B] pt-2">
              Exclusive boutique for ladies & bridal entourages.
            </p>
          </div>

        </div>

        {/* Bottom Credits & Devlonix Badge */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E8DCC8]/60 text-center sm:text-left">
          <p>
            &copy; {new Date().getFullYear()} {CONFIG.businessName}. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5 text-xs text-[#E8DCC8]/80">
            <span>Website handcrafted with pride by</span>
            <span className="font-semibold text-[#B89B5E] tracking-wide">Devlonix</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
