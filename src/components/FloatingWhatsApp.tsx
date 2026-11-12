import React, { useState } from 'react';
import { CONFIG } from '../config';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const prefilledMessage = encodeURIComponent(
    `Namaste Aarohi Beauty Studio,\nI would like to inquire about an appointment or bridal styling.`
  );

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      {/* Speech Bubble / Greeting */}
      {showTooltip && (
        <div className="pointer-events-auto mb-2 bg-white text-[#2B2B28] p-3 rounded-2xl shadow-xl border border-[#E8DCC8] max-w-[210px] text-xs relative animate-fade-in">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center text-[10px]"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
          <p className="font-semibold text-[#5F7155]">Have a question?</p>
          <p className="text-[11px] text-[#2B2B28]/70 mt-0.5">
            Chat directly with our front desk on WhatsApp.
          </p>
          <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white border-b border-r border-[#E8DCC8] rotate-45" />
        </div>
      )}

      {/* WhatsApp Floating Button */}
      <a
        href={`https://wa.me/${CONFIG.whatsappNumber}?text=${prefilledMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Aarohi Studio on WhatsApp"
        className="pointer-events-auto flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
      >
        <MessageCircle className="w-7 h-7 fill-white stroke-[1.5]" />
      </a>
    </div>
  );
};
