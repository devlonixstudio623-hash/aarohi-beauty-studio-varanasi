import React, { useState } from 'react';
import { CONFIG } from '../config';
import { Tag, Sparkles, Check, Copy } from 'lucide-react';

export const OffersSection: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section id="offers" className="py-16 md:py-24 bg-[#F6F1E7]/50 border-t border-[#E8DCC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#5F7155] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Privileges & Seasonal Passes</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B28] tracking-tight">
            Curated Privileges for You
          </h2>
          <p className="mt-4 text-base text-[#2B2B28]/70 leading-relaxed">
            Whether it's your first time stepping into our Sigra boutique or you're planning a year of regular self-care, explore our transparent privileges.
          </p>
        </div>

        {/* 3 Offer Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CONFIG.offers.map((offer) => {
            const isCopied = copiedCode === offer.code;
            return (
              <div
                key={offer.id}
                className="bg-white rounded-3xl p-7 border border-[#E8DCC8] shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Badge */}
                  <span className="inline-block text-[11px] font-semibold tracking-wider uppercase px-3 py-1 rounded-full bg-[#B89B5E]/15 text-[#B89B5E] border border-[#B89B5E]/30 mb-4">
                    {offer.badge}
                  </span>

                  <h3 className="font-serif text-2xl text-[#2B2B28] font-medium leading-snug">
                    {offer.title}
                  </h3>
                  <p className="text-xs text-[#5F7155] font-medium mt-1">
                    {offer.subtitle}
                  </p>

                  <div className="mt-5 space-y-2.5">
                    {offer.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-[#2B2B28]/80">
                        <Check className="w-4 h-4 text-[#5F7155] shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-5 border-t border-[#E8DCC8]">
                  <p className="text-[11px] text-[#2B2B28]/50 mb-3 italic">
                    {offer.validity}
                  </p>

                  {/* Promo Code Pill & Copy Button */}
                  <div className="flex items-center justify-between p-2 rounded-xl bg-[#F6F1E7] border border-[#E8DCC8]">
                    <div className="flex items-center gap-1.5 pl-2">
                      <Tag className="w-3.5 h-3.5 text-[#5F7155]" />
                      <span className="font-mono text-xs font-bold tracking-wider text-[#2B2B28]">
                        {offer.code}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleCopyCode(offer.code)}
                      className="px-3 py-1.5 rounded-lg bg-white border border-[#E8DCC8] hover:border-[#8A9A7B] text-xs font-semibold text-[#5F7155] hover:text-[#2B2B28] transition-all flex items-center gap-1 min-h-[32px] cursor-pointer"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Code</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
