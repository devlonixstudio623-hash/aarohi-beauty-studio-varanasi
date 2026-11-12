import React, { useState, useEffect } from 'react';
import { CONFIG } from '../config';
import { SafeImage } from './SafeImage';
import { Star, Clock, Sparkles, ArrowRight, ShieldCheck, Info } from 'lucide-react';

interface HeroProps {
  onBookAppointment: () => void;
  onPlanBridalLook: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onBookAppointment, onPlanBridalLook }) => {
  // Feature C: Live queue and wait-time simulator (0-5 people)
  const [queueState, setQueueState] = useState<{ waiting: number; waitMinutes: number }>({
    waiting: 2,
    waitMinutes: 15,
  });
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Realistic simulation every 24 seconds within 0 to 5 people
    const interval = setInterval(() => {
      setQueueState(() => {
        // Believable variation around salon rush hours
        const randomWaiting = Math.floor(Math.random() * 5); // 0 to 4
        const minutesPerPerson = 12;
        const waitMinutes = randomWaiting === 0 ? 0 : randomWaiting * minutesPerPerson;
        return { waiting: randomWaiting, waitMinutes };
      });
    }, 24000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 lg:pt-16 lg:pb-32 bg-[#F6F1E7]">
      {/* Subtle background ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8DCC8]/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-[#8A9A7B]/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 text-left">
            
            {/* Feature C: Live Queue Badge */}
            <div className="inline-flex items-center gap-2">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/90 border border-[#E8DCC8] shadow-xs text-xs font-medium text-[#2B2B28]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                
                {queueState.waiting > 0 ? (
                  <span>
                    <strong className="text-[#5F7155]">{queueState.waiting} {queueState.waiting === 1 ? 'client' : 'clients'}</strong> in studio &bull; ~{queueState.waitMinutes}m wait
                  </span>
                ) : (
                  <span className="text-[#5F7155] font-semibold">
                    Studio ready &bull; Walk-ins welcome right now
                  </span>
                )}

                {/* Info Tooltip for Demo Data */}
                <div className="relative inline-block ml-1">
                  <button
                    onClick={() => setShowTooltip(!showTooltip)}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    className="text-[#8A9A7B] hover:text-[#5F7155] p-0.5 focus:outline-none"
                    aria-label="Queue information note"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                  {showTooltip && (
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-52 p-2 bg-[#2B2B28] text-[#F6F1E7] text-[11px] rounded-lg shadow-xl z-30 leading-snug">
                      <p className="font-semibold text-[#B89B5E] mb-0.5">Live Salon Queue</p>
                      Simulated in demo. In production, this syncs with studio front-desk check-ins.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#5F7155] flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
                Exclusive Sanctuary for Ladies in Varanasi
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#2B2B28] leading-[1.12] tracking-tight">
                Your wedding morning is already stressful. <br />
                <span className="italic font-serif text-[#5F7155]">We make sure you look like yourself,</span> just glowing.
              </h1>
            </div>

            {/* Subheadline: benefit-first, anti-slop */}
            <p className="text-base sm:text-lg text-[#2B2B28]/80 max-w-2xl leading-relaxed">
              Handcrafted HD & Airbrush bridal artistry that stays luminous through 14 hours of pheras, alongside calm botanical hair and skin rituals designed specifically for Varanasi’s climate.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#8A9A7B] text-[#F6F1E7] text-base font-medium hover:bg-[#5F7155] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 min-h-[48px] cursor-pointer"
              >
                <span>Book an Appointment</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onPlanBridalLook}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#2B2B28] text-base font-medium border border-[#E8DCC8] hover:border-[#8A9A7B] hover:bg-[#F6F1E7] transition-all min-h-[48px] cursor-pointer"
              >
                <span>Plan My Bridal Look</span>
              </button>
            </div>

            {/* Trust Row */}
            <div className="pt-6 border-t border-[#E8DCC8]/70 flex flex-wrap items-center gap-y-4 gap-x-8 text-xs text-[#2B2B28]/80">
              {/* Google Rating */}
              <div className="flex items-center gap-2">
                <div className="flex text-[#B89B5E]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#B89B5E] text-[#B89B5E]" />
                  ))}
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2B2B28]">{CONFIG.googleRating}</span>
                  <span className="text-[#5F7155] ml-1">({CONFIG.totalReviewsCount} Google Reviews)</span>
                </div>
              </div>

              {/* Experience */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E8DCC8]/50 flex items-center justify-center text-[#5F7155]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2B2B28]">{CONFIG.yearsOfExperience}+ Years</span>
                  <span className="text-[#5F7155] ml-1">in Sigra, Varanasi</span>
                </div>
              </div>

              {/* Brides & Clients */}
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#E8DCC8]/50 flex items-center justify-center text-[#5F7155]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-sm text-[#2B2B28]">{CONFIG.clientsServed}</span>
                  <span className="text-[#5F7155] ml-1">Happy Brides & Guests</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual Image Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative arched border */}
              <div className="absolute -inset-3 rounded-t-[140px] rounded-b-3xl border border-[#B89B5E]/30 -z-10 translate-x-2 translate-y-2 pointer-events-none" />
              
              <div className="relative rounded-t-[130px] rounded-b-2xl overflow-hidden shadow-2xl border-4 border-white group">
                <SafeImage
                  src={CONFIG.heroImage}
                  alt="Aarohi Beauty Studio handcrafted bridal artistry in Varanasi"
                  className="w-full h-[460px] sm:h-[540px] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  aspectRatioClass="aspect-[4/5]"
                />
                
                {/* Floating pill badge */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl border border-[#E8DCC8] shadow-lg flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold tracking-wider uppercase text-[#5F7155]">Real Varanasi Bride</p>
                    <p className="text-xs text-[#2B2B28] font-serif italic text-base">Shreya's Wedding at Taj Ganges</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-[#F6F1E7] text-[#5F7155] border border-[#E8DCC8] font-medium">
                    Signature HD
                  </span>
                </div>
              </div>

              {/* Floating aesthetic stamp */}
              <div className="absolute -top-4 -right-4 bg-[#5F7155] text-[#F6F1E7] p-3 rounded-full shadow-lg border-2 border-[#F6F1E7] hidden sm:flex flex-col items-center justify-center w-20 h-20 text-center animate-bounce-slow">
                <Sparkles className="w-4 h-4 text-[#B89B5E] mb-0.5" />
                <span className="text-[9px] font-semibold uppercase tracking-wider">Sigra</span>
                <span className="text-[9px] opacity-90">Studio</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
