import React from 'react';
import { CONFIG, Stylist } from '../config';
import { SafeImage } from './SafeImage';
import { Sparkles, Calendar, Award } from 'lucide-react';

interface TeamSectionProps {
  onSelectStylist: (stylist: Stylist) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onSelectStylist }) => {
  return (
    <section id="team" className="py-16 md:py-24 bg-[#F6F1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#5F7155] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Master Artists &bull; Sigra Studio</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B28] tracking-tight">
            Meet the Hands Behind Your Glow
          </h2>
          <p className="mt-4 text-base text-[#2B2B28]/70 leading-relaxed">
            Our senior artists and aestheticians are rigorously trained in skin-safe formulations, non-damaging hair styling, and the art of listening before styling.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CONFIG.stylists.map((stylist) => (
            <div
              key={stylist.id}
              className="group flex flex-col justify-between bg-white rounded-3xl p-6 border border-[#E8DCC8] shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div>
                {/* Photo with arched top */}
                <div className="relative rounded-2xl overflow-hidden mb-5 aspect-[4/5] bg-[#E8DCC8]/40 border border-[#E8DCC8]">
                  <SafeImage
                    src={stylist.photoUrl}
                    alt={`${stylist.name} - ${stylist.role}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    aspectRatioClass="aspect-[4/5]"
                  />
                  
                  {/* Experience Badge */}
                  <div className="absolute bottom-3 left-3 bg-[#2B2B28]/85 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                    <Award className="w-3 h-3 text-[#B89B5E]" />
                    <span>{stylist.experienceYears}+ Years</span>
                  </div>
                </div>

                {/* Details */}
                <h3 className="font-serif text-2xl text-[#2B2B28] leading-tight font-medium">
                  {stylist.name}
                </h3>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#5F7155] mt-1">
                  {stylist.role}
                </p>
                <div className="mt-2.5 pt-2.5 border-t border-[#E8DCC8]/50">
                  <p className="text-xs font-medium text-[#B89B5E]">Specialty:</p>
                  <p className="text-xs text-[#2B2B28]/85 font-medium mt-0.5">
                    {stylist.specialty}
                  </p>
                </div>
                <p className="text-xs text-[#2B2B28]/60 mt-3 line-clamp-3 leading-relaxed">
                  {stylist.bio}
                </p>
              </div>

              {/* Book With Her Action Button */}
              <div className="pt-5 mt-4 border-t border-[#E8DCC8]">
                <button
                  onClick={() => onSelectStylist(stylist)}
                  className="w-full py-2.5 px-4 rounded-full bg-[#F6F1E7] text-[#2B2B28] hover:bg-[#5F7155] hover:text-white border border-[#E8DCC8] hover:border-[#5F7155] text-xs font-semibold flex items-center justify-center gap-2 transition-all min-h-[44px] cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {stylist.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
