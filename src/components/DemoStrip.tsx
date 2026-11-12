import React, { useState } from 'react';
import { CONFIG } from '../config';
import { Sparkles, X } from 'lucide-react';

export const DemoStrip: React.FC = () => {
  const [dismissed, setDismissed] = useState(false);

  if (!CONFIG.showDemoStrip || dismissed) {
    return null;
  }

  return (
    <aside aria-label="Demo Notice" className="bg-[#2B2B28] text-[#F6F1E7] text-xs py-2 px-4 relative z-50 border-b border-[#B89B5E]/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 text-[#B89B5E] shrink-0 animate-pulse" />
          <span className="font-light tracking-wide text-center">
            {CONFIG.demoStripText}
          </span>
          <span className="hidden md:inline-block text-[#E8DCC8]/60 text-[11px] ml-2 pl-2 border-l border-[#E8DCC8]/20">
            Fully editable via single CONFIG file
          </span>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-[#E8DCC8]/60 hover:text-white transition-colors p-1"
          aria-label="Dismiss demo notice"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
