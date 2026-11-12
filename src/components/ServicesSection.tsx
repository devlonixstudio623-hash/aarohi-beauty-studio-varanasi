import React, { useState } from 'react';
import { CONFIG, Service } from '../config';
import { formatInr } from '../utils/bookingLogic';
import { Clock, Plus, Check, Sparkles, Scissors, Sparkle, Heart, Flame } from 'lucide-react';

interface ServicesSectionProps {
  selectedServiceIds: string[];
  onToggleService: (service: Service) => void;
  onGoToBooking: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  selectedServiceIds,
  onToggleService,
  onGoToBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hair' | 'skin' | 'makeup' | 'nails'>('all');

  const categories = [
    { id: 'all', label: 'All Services', icon: Sparkles },
    { id: 'hair', label: 'Hair & Spa', icon: Scissors },
    { id: 'skin', label: 'Skin & Facial', icon: Sparkle },
    { id: 'makeup', label: 'Artistry Makeup', icon: Flame },
    { id: 'nails', label: 'Nails & Waxing', icon: Heart },
  ];

  const filteredServices = activeCategory === 'all'
    ? CONFIG.services
    : CONFIG.services.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-16 md:py-24 bg-[#F6F1E7]/60 border-t border-[#E8DCC8]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#5F7155] text-xs font-semibold uppercase tracking-widest mb-3">
            <span>Salon Rituals & Care</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B28] tracking-tight">
            Curated Services for Everyday & Celebration
          </h2>
          <p className="mt-4 text-base text-[#2B2B28]/70 leading-relaxed">
            Every ritual begins with a gentle consultation. We use professional organic formulations, strictly single-use hygiene kits, and temperature-controlled comfort suites.
          </p>

          {/* Category Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[44px] cursor-pointer ${
                    isActive
                      ? 'bg-[#5F7155] text-[#F6F1E7] shadow-sm'
                      : 'bg-white text-[#2B2B28] border border-[#E8DCC8] hover:border-[#8A9A7B] hover:bg-[#E8DCC8]/30'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F6F1E7]' : 'text-[#8A9A7B]'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => {
            const isSelected = selectedServiceIds.includes(service.id);
            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border transition-all duration-300 hover:shadow-md ${
                  isSelected
                    ? 'border-[#8A9A7B] ring-2 ring-[#8A9A7B]/20 bg-[#F6F1E7]/30'
                    : 'border-[#E8DCC8] hover:border-[#8A9A7B]/60'
                }`}
              >
                <div>
                  {/* Top line: popular tag + duration */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 text-xs text-[#5F7155] font-medium bg-[#E8DCC8]/40 px-2.5 py-0.5 rounded-full">
                      <Clock className="w-3 h-3 text-[#5F7155]" />
                      <span>{service.durationMinutes} mins</span>
                    </span>
                    {service.popular && (
                      <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#B89B5E]/15 text-[#B89B5E] border border-[#B89B5E]/30">
                        Studio Signature
                      </span>
                    )}
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-serif text-xl sm:text-2xl text-[#2B2B28] font-medium leading-snug">
                      {service.name}
                    </h3>
                  </div>

                  <p className="font-serif text-lg font-semibold text-[#5F7155] mb-3">
                    {formatInr(service.priceInr)}
                  </p>

                  {/* Description */}
                  <p className="text-sm text-[#2B2B28]/70 leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-4 border-t border-[#E8DCC8]/40 flex items-center justify-between">
                  <button
                    onClick={() => onToggleService(service)}
                    className={`inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-4 rounded-full text-xs font-semibold transition-all min-h-[44px] cursor-pointer ${
                      isSelected
                        ? 'bg-[#5F7155] text-white hover:bg-[#5F7155]/90'
                        : 'bg-[#F6F1E7] text-[#2B2B28] border border-[#E8DCC8] hover:border-[#8A9A7B] hover:bg-[#8A9A7B] hover:text-[#F6F1E7]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="w-4 h-4 stroke-[2.5]" />
                        <span>Added to Booking (Tap to Remove)</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Add to Booking</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Services Counter Floating Banner */}
        {selectedServiceIds.length > 0 && (
          <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-white border border-[#8A9A7B] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
            <div className="flex items-center gap-3 text-center sm:text-left">
              <div className="w-10 h-10 rounded-full bg-[#8A9A7B] text-white flex items-center justify-center font-bold text-sm shrink-0">
                {selectedServiceIds.length}
              </div>
              <div>
                <p className="font-medium text-sm text-[#2B2B28]">
                  {selectedServiceIds.length} {selectedServiceIds.length === 1 ? 'service' : 'services'} selected for your appointment
                </p>
                <p className="text-xs text-[#5F7155]">
                  Proceed to select your preferred artist, date, and 30-min time slot.
                </p>
              </div>
            </div>

            <button
              onClick={onGoToBooking}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#8A9A7B] text-white text-xs sm:text-sm font-semibold hover:bg-[#5F7155] transition-all min-h-[44px] cursor-pointer"
            >
              Continue to Step 2 (Stylist & Time) &rarr;
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
