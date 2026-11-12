import React, { useMemo } from 'react';
import { CONFIG } from '../config';
import { getSalonOpenStatus, formatTime12h } from '../utils/bookingLogic';
import { MapPin, Phone, Mail, Clock, MessageCircle, Navigation, Sparkles } from 'lucide-react';

export const ContactSection: React.FC = () => {
  // Real-time calculation of Open / Closed Status
  const statusInfo = useMemo(() => {
    return getSalonOpenStatus(CONFIG.openingHours, new Date());
  }, []);

  const daysList = [
    { name: 'Monday', hours: CONFIG.openingHours.Monday },
    { name: 'Tuesday', hours: CONFIG.openingHours.Tuesday },
    { name: 'Wednesday', hours: CONFIG.openingHours.Wednesday },
    { name: 'Thursday', hours: CONFIG.openingHours.Thursday },
    { name: 'Friday', hours: CONFIG.openingHours.Friday },
    { name: 'Saturday', hours: CONFIG.openingHours.Saturday },
    { name: 'Sunday', hours: CONFIG.openingHours.Sunday },
  ];

  const currentDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F6F1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#5F7155] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Visit Us in Sigra</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B28] tracking-tight">
            Our Sigra Studio & Hours
          </h2>
          <p className="mt-4 text-base text-[#2B2B28]/70 leading-relaxed">
            Conveniently located near Sigra crossing with dedicated valet assistance for bridal cars and client parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards & Hours (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Live Open / Closed Status Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DCC8] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#E8DCC8]">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${statusInfo.isOpen ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                    <span className={`relative inline-flex rounded-full h-3 w-3 ${statusInfo.isOpen ? 'bg-emerald-600' : 'bg-rose-500'}`} />
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-[#2B2B28] font-medium">
                      Studio Status
                    </h3>
                    <p className="text-xs font-semibold text-[#5F7155]">
                      {statusInfo.statusText} &bull; {statusInfo.nextTransition}
                    </p>
                  </div>
                </div>

                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusInfo.isOpen ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-stone-100 text-stone-600 border border-stone-200'}`}>
                  {statusInfo.isOpen ? 'Welcome In' : 'Closed'}
                </span>
              </div>

              {/* Hours List */}
              <div className="mt-4 space-y-2 text-xs">
                {daysList.map((d) => {
                  const isToday = d.name.toLowerCase() === currentDayName.toLowerCase();
                  return (
                    <div
                      key={d.name}
                      className={`flex justify-between py-1.5 px-2 rounded-lg ${
                        isToday ? 'bg-[#F6F1E7] font-semibold text-[#5F7155]' : 'text-[#2B2B28]/80'
                      }`}
                    >
                      <span className="flex items-center gap-1.5">
                        {d.name}
                        {isToday && <span className="text-[10px] uppercase font-bold text-[#B89B5E]">(Today)</span>}
                      </span>
                      <span>{formatTime12h(d.hours.open)} – {formatTime12h(d.hours.close)}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Address & Fast Connect Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E8DCC8] shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-[#E8DCC8]/50 flex items-center justify-center text-[#5F7155] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#5F7155]">Address</h4>
                  <p className="font-serif text-lg text-[#2B2B28] mt-0.5">{CONFIG.address}</p>
                  <p className="text-xs text-[#2B2B28]/70">{CONFIG.city}</p>
                  <a
                    href={CONFIG.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#5F7155] hover:text-[#2B2B28] mt-2"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions in Google Maps</span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-[#E8DCC8]">
                {/* Call Button */}
                <a
                  href={`tel:${CONFIG.phoneRaw}`}
                  className="py-3 px-4 rounded-full border border-[#E8DCC8] hover:border-[#8A9A7B] bg-[#F6F1E7] text-[#2B2B28] text-xs font-semibold flex items-center justify-center gap-2 transition-all min-h-[44px]"
                >
                  <Phone className="w-4 h-4 text-[#5F7155]" />
                  <span>Call {CONFIG.phone}</span>
                </a>

                {/* WhatsApp Chat Button */}
                <a
                  href={`https://wa.me/${CONFIG.whatsappNumber}?text=Namaste%20Aarohi%20Studio%2C%20I%20would%20like%20to%20inquire%20about%20a%20service.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-full bg-[#25D366] text-white text-xs font-semibold hover:bg-[#20ba5a] flex items-center justify-center gap-2 transition-all min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed (6 cols) */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-3 border border-[#E8DCC8] shadow-sm overflow-hidden">
            <div className="w-full h-[440px] rounded-2xl overflow-hidden bg-[#E8DCC8]/30 relative">
              <iframe
                title="Aarohi Beauty Studio Location in Sigra Varanasi"
                src={CONFIG.googleMapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[15%] contrast-[1.05]"
              />
            </div>
            <div className="p-3 text-center">
              <p className="text-xs text-[#2B2B28]/60">
                Landmark: Near Sigra Crossing &bull; 10 mins from Varanasi Cantt Railway Station
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
