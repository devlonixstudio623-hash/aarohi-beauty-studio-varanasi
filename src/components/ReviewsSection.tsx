import React, { useState, useEffect, useRef } from 'react';
import { CONFIG } from '../config';
import { Star, CheckCircle, ExternalLink, QrCode, Sparkles, Heart } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Animated counters state
  const [counts, setCounts] = useState({
    clients: 0,
    years: 0,
    reviews: 0,
    rating: 0,
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          // Animate counters
          const duration = 1600;
          const startTime = performance.now();

          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);

            setCounts({
              clients: Math.floor(easeProgress * 8500),
              years: Math.floor(easeProgress * CONFIG.yearsOfExperience),
              reviews: Math.floor(easeProgress * CONFIG.totalReviewsCount),
              rating: +(easeProgress * CONFIG.googleRating).toFixed(1),
            });

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCounts({
                clients: 8500,
                years: CONFIG.yearsOfExperience,
                reviews: CONFIG.totalReviewsCount,
                rating: CONFIG.googleRating,
              });
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  // Star breakdown percentages
  const ratingBreakdown = [
    { stars: 5, percentage: 96 },
    { stars: 4, percentage: 4 },
    { stars: 3, percentage: 0 },
    { stars: 2, percentage: 0 },
    { stars: 1, percentage: 0 },
  ];

  return (
    <section id="reviews" ref={sectionRef} className="py-16 md:py-24 bg-[#F6F1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#5F7155] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Real Words from Kashi Brides & Regulars</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B28] tracking-tight">
            Loved Across Varanasi
          </h2>
          <p className="mt-4 text-base text-[#2B2B28]/70 leading-relaxed">
            We don't buy reviews or post staged testimonials. Here is what real women who trusted us with their weddings, festivals, and self-care have shared.
          </p>
        </div>

        {/* Feature E: Animated Trust Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="bg-white p-6 rounded-3xl border border-[#E8DCC8] text-center shadow-xs">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#5F7155]">
              {counts.clients.toLocaleString('en-IN')}+
            </p>
            <p className="text-xs uppercase tracking-wider text-[#2B2B28]/70 font-semibold mt-1">
              Clients Served
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8DCC8] text-center shadow-xs">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#5F7155]">
              {counts.rating.toFixed(1)} <span className="text-[#B89B5E] text-2xl font-sans">★</span>
            </p>
            <p className="text-xs uppercase tracking-wider text-[#2B2B28]/70 font-semibold mt-1">
              Google Rating
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8DCC8] text-center shadow-xs">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#5F7155]">
              {counts.years}+
            </p>
            <p className="text-xs uppercase tracking-wider text-[#2B2B28]/70 font-semibold mt-1">
              Years in Sigra
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#E8DCC8] text-center shadow-xs">
            <p className="font-serif text-3xl sm:text-4xl font-bold text-[#5F7155]">
              {counts.reviews}+
            </p>
            <p className="text-xs uppercase tracking-wider text-[#2B2B28]/70 font-semibold mt-1">
              Verified Reviews
            </p>
          </div>
        </div>

        {/* Google Rating Summary & QR Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC8] shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Left: Overall Score & Stars */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-[#F6F1E7] border border-[#E8DCC8]">
              <span className="font-serif text-5xl font-bold text-[#2B2B28]">
                {CONFIG.googleRating}
              </span>
              <div className="flex text-[#B89B5E] mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#B89B5E] text-[#B89B5E]" />
                ))}
              </div>
              <span className="text-[11px] text-[#5F7155] font-semibold mt-1">
                {CONFIG.totalReviewsCount} Google Reviews
              </span>
            </div>

            {/* Rating distribution bars */}
            <div className="w-full sm:w-56 space-y-1.5 text-xs">
              {ratingBreakdown.map(item => (
                <div key={item.stars} className="flex items-center gap-2">
                  <span className="w-3 text-right font-medium text-[#2B2B28]/70">{item.stars}</span>
                  <div className="flex-1 h-2 bg-[#F6F1E7] rounded-full overflow-hidden border border-[#E8DCC8]/60">
                    <div
                      className="h-full bg-[#B89B5E] rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="w-8 text-[11px] text-[#2B2B28]/60">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: QR Code and Google Review Button */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 bg-[#F6F1E7] rounded-2xl border border-[#E8DCC8] text-center flex flex-col items-center">
              <QrCode className="w-12 h-12 text-[#5F7155]" />
              <span className="text-[10px] text-[#2B2B28]/70 mt-1 font-medium">Scan to Review</span>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-xs text-[#2B2B28]/80 mb-2 font-medium">
                Visited our Sigra studio recently?
              </p>
              <a
                href={CONFIG.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#8A9A7B] text-white text-xs sm:text-sm font-semibold hover:bg-[#5F7155] shadow-xs transition-all min-h-[44px]"
              >
                <span>Leave a Google Review</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* 6 Realistic Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONFIG.reviews.map((rev) => {
            const initials = rev.name.split(' ').map(n => n[0]).join('').slice(0, 2);
            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DCC8] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Top: Avatar & Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-11 h-11 rounded-full bg-[#E8DCC8]/60 text-[#5F7155] font-serif font-bold text-base flex items-center justify-center border border-[#E8DCC8]">
                      {initials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-medium text-sm text-[#2B2B28]">{rev.name}</h4>
                        {rev.verified && (
                          <CheckCircle className="w-3.5 h-3.5 text-[#5F7155] fill-[#8A9A7B]/20" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#5F7155]">{rev.location}</p>
                    </div>
                  </div>

                  {/* Stars + Event tag */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex text-[#B89B5E]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#B89B5E] text-[#B89B5E]" />
                      ))}
                    </div>
                    <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#F6F1E7] text-[#5F7155] border border-[#E8DCC8]">
                      {rev.eventType}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-[#2B2B28]/80 leading-relaxed italic">
                    "{rev.text}"
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8DCC8]/50 flex items-center justify-between text-[11px] text-[#2B2B28]/50">
                  <span>Google Verified</span>
                  <span>{rev.date}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
