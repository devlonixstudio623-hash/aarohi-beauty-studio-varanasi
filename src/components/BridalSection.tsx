import React, { useState } from 'react';
import { CONFIG, BridalPackage, BridalAddOn } from '../config';
import { formatInr, calculateBridalCost, isPeakWeddingSeason } from '../utils/bookingLogic';
import { Sparkles, Check, X, Calendar, MessageCircle, AlertCircle, ArrowRight } from 'lucide-react';

interface BridalSectionProps {
  onSelectBridalPackageForBooking: (pkg: BridalPackage) => void;
}

export const BridalSection: React.FC<BridalSectionProps> = ({ onSelectBridalPackageForBooking }) => {
  // Bridal Package Builder State
  const [builderDate, setBuilderDate] = useState<string>('2026-12-12');
  const [builderPackageId, setBuilderPackageId] = useState<string>('signature');
  const [selectedAddOnIds, setSelectedAddOnIds] = useState<string[]>(['addon-ext', 'addon-saree']);

  const selectedPackage = CONFIG.bridalPackages.find(p => p.id === builderPackageId) || CONFIG.bridalPackages[1];
  const selectedAddOns = CONFIG.bridalAddOns.filter(a => selectedAddOnIds.includes(a.id));

  const { subtotal, addOnsTotal, grandTotal, advanceAmount } = calculateBridalCost(
    selectedPackage,
    selectedAddOns
  );

  const isPeakSeason = isPeakWeddingSeason(builderDate);

  const toggleAddOn = (addonId: string) => {
    setSelectedAddOnIds(prev =>
      prev.includes(addonId) ? prev.filter(id => id !== addonId) : [...prev, addonId]
    );
  };

  // Generate WhatsApp inquiry text
  const generateWhatsAppMessage = () => {
    const formattedDate = builderDate
      ? new Date(builderDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        })
      : 'Date to be decided';

    const addOnsNames = selectedAddOns.map(a => a.name).join(', ') || 'None';

    const text = `Namaste Sunita ji & Aarohi Beauty Studio Team,\n\nI would like to inquire about booking my bridal look for my wedding in Varanasi.\n\n📅 Wedding Date: ${formattedDate}\n👑 Selected Package: ${selectedPackage.name} (${formatInr(selectedPackage.priceInr)})\n✨ Add-ons: ${addOnsNames} (${formatInr(addOnsTotal)})\n💰 Estimated Total: ${formatInr(grandTotal)}\n🔒 30% Advance Deposit: ${formatInr(advanceAmount)}\n\nCould you please check artist availability for this date? Looking forward to your guidance!`;

    return encodeURIComponent(text);
  };

  return (
    <section id="bridal" className="py-16 md:py-24 bg-[#F6F1E7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E8DCC8]/50 text-[#5F7155] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>The Bridal Studio &bull; Varanasi Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B28] tracking-tight">
            Handcrafted Bridal Artistry That Stays Luminous
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#2B2B28]/70 leading-relaxed">
            From sunrise temple pheras at Kashi Vishwanath to grand evening receptions at Taj Ganges, our bridal bases are formulated to withstand heat, tears, and long ceremonies without losing their soft inner glow.
          </p>
        </div>

        {/* 3 Bridal Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-20">
          {CONFIG.bridalPackages.map((pkg) => {
            const isSignature = pkg.tier === 'Signature';
            return (
              <div
                key={pkg.id}
                className={`relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 transition-all duration-300 ${
                  isSignature
                    ? 'bg-white border-2 border-[#8A9A7B] shadow-xl ring-4 ring-[#8A9A7B]/10 -translate-y-1'
                    : 'bg-white/80 border border-[#E8DCC8] hover:border-[#8A9A7B]/50 hover:shadow-md'
                }`}
              >
                {/* Popular Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#5F7155] text-[#F6F1E7] text-[11px] font-semibold tracking-wider uppercase shadow-sm">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="text-center pb-6 border-b border-[#E8DCC8]">
                    <span className="text-xs uppercase tracking-widest font-semibold text-[#5F7155]">
                      {pkg.tier} Experience
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2B28] mt-1 font-normal">
                      {pkg.name}
                    </h3>
                    <div className="mt-3 flex items-baseline justify-center gap-1">
                      <span className="font-serif text-3xl sm:text-4xl font-semibold text-[#2B2B28]">
                        {formatInr(pkg.priceInr)}
                      </span>
                      <span className="text-xs text-[#2B2B28]/60">all inclusive</span>
                    </div>
                    <p className="mt-3 text-xs sm:text-sm text-[#2B2B28]/70 italic">
                      {pkg.description}
                    </p>
                  </div>

                  {/* Recommended For */}
                  <div className="my-5 p-3 rounded-xl bg-[#F6F1E7] border border-[#E8DCC8]/60 text-xs text-[#5F7155]">
                    <span className="font-bold block mb-0.5">Best Suited For:</span>
                    {pkg.recommendedFor}
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-3 mb-6">
                    <p className="text-xs uppercase font-semibold text-[#2B2B28]/60 tracking-wider">
                      What's Included:
                    </p>
                    {pkg.inclusions.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2B2B28]/85">
                        <Check className="w-4 h-4 text-[#5F7155] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  {/* Not Included */}
                  {pkg.notIncluded && pkg.notIncluded.length > 0 && (
                    <div className="space-y-2 mb-6 pt-4 border-t border-[#E8DCC8]/40">
                      <p className="text-xs uppercase font-semibold text-[#2B2B28]/40 tracking-wider">
                        Not Included:
                      </p>
                      {pkg.notIncluded.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#2B2B28]/50">
                          <X className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom CTA */}
                <div className="pt-6 border-t border-[#E8DCC8]">
                  <button
                    onClick={() => onSelectBridalPackageForBooking(pkg)}
                    className={`w-full py-3 px-4 rounded-full text-xs sm:text-sm font-semibold transition-all min-h-[44px] cursor-pointer ${
                      isSignature
                        ? 'bg-[#5F7155] text-white hover:bg-[#5F7155]/90 shadow-sm'
                        : 'bg-[#F6F1E7] text-[#2B2B28] border border-[#E8DCC8] hover:border-[#8A9A7B] hover:bg-[#8A9A7B] hover:text-[#F6F1E7]'
                    }`}
                  >
                    Select {pkg.tier} & Book
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* FEATURE B: Interactive Bridal Package Builder */}
        <div className="rounded-3xl bg-white border border-[#E8DCC8] shadow-lg p-6 sm:p-10 lg:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#8A9A7B]/10 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-3xl mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#5F7155] inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
              Feature &bull; Interactive Estimator
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#2B2B28] mt-1">
              Custom Bridal Package Builder & Availability Check
            </h3>
            <p className="text-sm text-[#2B2B28]/70 mt-2">
              Select your wedding date and choose the exact finishing touches you need. See a transparent live breakdown and estimated 30% advance deposit to secure your date.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Controls (8 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Wedding Date Picker */}
              <div className="space-y-2">
                <label htmlFor="builder-wedding-date" className="block text-xs font-semibold uppercase tracking-wider text-[#2B2B28]">
                  1. Your Proposed Wedding Date
                </label>
                <div className="relative max-w-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5F7155]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <input
                    id="builder-wedding-date"
                    type="date"
                    value={builderDate}
                    onChange={(e) => setBuilderDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E8DCC8] bg-[#F6F1E7]/40 text-sm font-medium text-[#2B2B28] focus:outline-none focus:ring-2 focus:ring-[#8A9A7B] min-h-[44px]"
                  />
                </div>

                {/* Auspicious Season Notice */}
                {isPeakSeason && (
                  <div className="mt-2.5 p-3 rounded-xl bg-[#B89B5E]/10 border border-[#B89B5E]/30 text-xs text-[#2B2B28] flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#B89B5E] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#2B2B28]">Peak Varanasi Lagna Season</span>
                      <p className="text-[#2B2B28]/80 text-[11px] mt-0.5">
                        Dates in November–February and April–May are auspicious and tend to fill 3 to 6 months in advance. We recommend checking artist dates early.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Step 2: Choose Base Package */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2B28]">
                  2. Choose Base Bridal Artistry
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {CONFIG.bridalPackages.map((p) => {
                    const isSelected = builderPackageId === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setBuilderPackageId(p.id)}
                        className={`p-3.5 rounded-xl text-left border transition-all min-h-[44px] cursor-pointer ${
                          isSelected
                            ? 'border-[#5F7155] bg-[#F6F1E7] ring-2 ring-[#5F7155]/20 shadow-xs'
                            : 'border-[#E8DCC8] bg-white hover:border-[#8A9A7B]'
                        }`}
                      >
                        <p className="text-xs font-semibold text-[#5F7155] uppercase tracking-wide">
                          {p.tier}
                        </p>
                        <p className="font-serif text-lg font-medium text-[#2B2B28]">
                          {formatInr(p.priceInr)}
                        </p>
                        <p className="text-[11px] text-[#2B2B28]/70 mt-1 line-clamp-1">
                          {p.name}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Choose Add-Ons */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2B28]">
                  3. Select Finishing Add-Ons (Optional)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CONFIG.bridalAddOns.map((addon) => {
                    const isChecked = selectedAddOnIds.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          isChecked
                            ? 'border-[#8A9A7B] bg-[#F6F1E7]/50 shadow-xs'
                            : 'border-[#E8DCC8] bg-white hover:border-[#8A9A7B]/60'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border ${
                          isChecked
                            ? 'bg-[#5F7155] border-[#5F7155] text-white'
                            : 'border-stone-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <span className="text-xs font-semibold text-[#2B2B28]">{addon.name}</span>
                            <span className="text-xs font-bold text-[#5F7155]">{formatInr(addon.priceInr)}</span>
                          </div>
                          <p className="text-[11px] text-[#2B2B28]/60 mt-0.5 leading-snug">
                            {addon.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Right Summary Card (5 cols) */}
            <div className="lg:col-span-5 bg-[#F6F1E7] rounded-2xl p-6 border border-[#E8DCC8] shadow-sm flex flex-col justify-between">
              <div>
                <h4 className="font-serif text-xl text-[#2B2B28] pb-3 border-b border-[#E8DCC8]">
                  Your Estimated Bridal Investment
                </h4>

                <div className="mt-4 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between text-[#2B2B28]/80">
                    <span>Base: {selectedPackage.name}</span>
                    <span className="font-semibold text-[#2B2B28]">{formatInr(subtotal)}</span>
                  </div>

                  <div className="flex justify-between text-[#2B2B28]/80">
                    <span>Add-ons ({selectedAddOns.length}):</span>
                    <span className="font-semibold text-[#2B2B28]">{formatInr(addOnsTotal)}</span>
                  </div>

                  {selectedAddOns.map(a => (
                    <div key={a.id} className="pl-3 text-[11px] text-[#5F7155] flex justify-between">
                      <span>+ {a.name}</span>
                      <span>{formatInr(a.priceInr)}</span>
                    </div>
                  ))}

                  <div className="pt-3 border-t border-[#E8DCC8] flex justify-between items-baseline">
                    <span className="font-semibold text-sm text-[#2B2B28]">Estimated Total:</span>
                    <span className="font-serif text-2xl font-bold text-[#2B2B28]">
                      {formatInr(grandTotal)}
                    </span>
                  </div>

                  {/* 30% Advance Deposit Notice */}
                  <div className="p-3 rounded-xl bg-white border border-[#E8DCC8] mt-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#5F7155] font-semibold">Advance to Reserve Date (30%):</span>
                      <span className="font-bold text-[#5F7155] text-sm">{formatInr(advanceAmount)}</span>
                    </div>
                    <p className="text-[10px] text-[#2B2B28]/60 mt-1">
                      Balance payable on your wedding day post draping. We block the entire bridal suite exclusively for you.
                    </p>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="mt-6 space-y-3">
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 rounded-full bg-[#25D366] text-white text-xs sm:text-sm font-semibold hover:bg-[#20ba5a] shadow-sm flex items-center justify-center gap-2 transition-all min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-white" />
                  <span>Send Bridal Enquiry on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => onSelectBridalPackageForBooking(selectedPackage)}
                  className="w-full py-2.5 px-4 rounded-full bg-white text-[#2B2B28] border border-[#E8DCC8] hover:border-[#8A9A7B] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all min-h-[44px] cursor-pointer"
                >
                  <span>Book in Online Calendar</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#5F7155]" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
