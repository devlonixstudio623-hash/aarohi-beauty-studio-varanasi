import React, { useState, useMemo } from 'react';
import { CONFIG, Service, Stylist } from '../config';
import {
  formatInr,
  generateTimeSlots,
  getBookedSlotsForDate,
  isSlotInPast,
  validateIndianPhone,
  generateIcsCalendar
} from '../utils/bookingLogic';
import {
  Check,
  Calendar as CalendarIcon,
  Clock,
  User,
  Sparkles,
  Phone,
  MessageCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  X,
  AlertCircle
} from 'lucide-react';

interface BookingSectionProps {
  selectedServices: Service[];
  onToggleService: (service: Service) => void;
  selectedStylistId: string | null;
  onSelectStylistId: (id: string | null) => void;
}

export const BookingSection: React.FC<BookingSectionProps> = ({
  selectedServices,
  onToggleService,
  selectedStylistId,
  onSelectStylistId,
}) => {
  // Step State: 1 = Services, 2 = Stylist, 3 = Date & Time, 4 = Details, 5 = Confirmed
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Generate next 14 days
  const upcomingDates = useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const iso = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-IN', { weekday: 'short' });
      const dayNumber = d.getDate();
      const monthName = d.toLocaleDateString('en-IN', { month: 'short' });
      dates.push({ iso, dayName, dayNumber, monthName, fullDate: d });
    }
    return dates;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(upcomingDates[0].iso);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  // Customer Contact Info
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string | null>(null);
  const [nameError, setNameError] = useState<string | null>(null);

  // Confirmation state
  const [bookingRef, setBookingRef] = useState<string>('');

  // Calculations
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.priceInr, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.durationMinutes, 0);

  const selectedStylist = CONFIG.stylists.find(s => s.id === selectedStylistId);

  // Available Time Slots for Selected Date
  const allTimeSlots = useMemo(() => {
    return generateTimeSlots(CONFIG.openingHours.Monday.open, CONFIG.openingHours.Monday.close);
  }, []);

  const bookedSlots = useMemo(() => {
    return getBookedSlotsForDate(selectedDate, allTimeSlots);
  }, [selectedDate, allTimeSlots]);

  // Handle Step Navigation with Validation
  const handleProceedToStep2 = () => {
    if (selectedServices.length === 0) return;
    setCurrentStep(2);
  };

  const handleProceedToStep3 = () => {
    setCurrentStep(3);
  };

  const handleProceedToStep4 = () => {
    if (!selectedDate || !selectedTimeSlot) return;
    setCurrentStep(4);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    let hasError = false;

    if (!customerName.trim()) {
      setNameError('Please enter your full name');
      hasError = true;
    } else {
      setNameError(null);
    }

    const phoneValidation = validateIndianPhone(customerPhone);
    if (!phoneValidation.isValid) {
      setPhoneError(phoneValidation.error || 'Invalid phone number');
      hasError = true;
    } else {
      setPhoneError(null);
    }

    if (hasError) return;

    // Generate deterministic clean booking reference
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const ref = `ABS-VNS-${randomSuffix}`;
    setBookingRef(ref);
    setCurrentStep(5); // Success Screen
  };

  // WhatsApp Pre-filled Confirmation Message
  const generateWhatsAppConfirmationUrl = () => {
    const serviceList = selectedServices.map(s => s.name).join(', ');
    const stylistName = selectedStylist ? selectedStylist.name : 'Any Available Senior Artist';
    const formattedDate = new Date(selectedDate).toLocaleDateString('en-IN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const message = `Namaste Aarohi Beauty Studio,\n\nI have booked an appointment on your website!\n\n🔖 Booking Ref: ${bookingRef}\n👤 Name: ${customerName}\n📱 Phone: ${customerPhone}\n📅 Date: ${formattedDate}\n⏰ Time: ${selectedTimeSlot}\n💇 Artist: ${stylistName}\n💅 Services: ${serviceList}\n💰 Total: ${formatInr(totalPrice)} (~${totalDuration} mins)\n${customerNotes ? `📝 Note: ${customerNotes}\n` : ''}\nPlease confirm my slot. Thank you!`;

    return `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  // Download .ics Calendar File
  const handleDownloadCalendar = () => {
    const serviceList = selectedServices.map(s => s.name).join(', ');
    const stylistName = selectedStylist ? selectedStylist.name : 'Aarohi Studio Artist';
    const icsContent = generateIcsCalendar({
      title: `Aarohi Studio Appointment: ${serviceList}`,
      description: `Appointment with ${stylistName} at Aarohi Beauty Studio. Booking Ref: ${bookingRef}. Total: ${formatInr(totalPrice)}.`,
      location: `${CONFIG.address}, ${CONFIG.area}`,
      dateStr: selectedDate,
      timeStr: selectedTimeSlot,
      durationMinutes: totalDuration || 60,
    });

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Aarohi-Appointment-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetBooking = () => {
    setCurrentStep(1);
    setSelectedTimeSlot('');
    setBookingRef('');
    setCustomerNotes('');
  };

  return (
    <section id="booking" className="py-16 md:py-24 bg-[#F6F1E7]/70 border-t border-[#E8DCC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8DCC8]/50 text-[#5F7155] text-xs font-semibold uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B89B5E]" />
            <span>Instant Reservation</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#2B2B28] tracking-tight">
            Reserve Your Personal Ritual
          </h2>
          <p className="mt-3 text-base text-[#2B2B28]/70">
            Select your treatments, choose your artist, and pick an available 30-minute time slot. No advance payment required for standard appointments.
          </p>
        </div>

        {/* 4-Step Progress Bar (Hidden on Success step 5) */}
        {currentStep <= 4 && (
          <div className="max-w-2xl mx-auto mb-10">
            <div className="grid grid-cols-4 gap-2 text-center text-xs">
              {[
                { step: 1, label: 'Services' },
                { step: 2, label: 'Stylist' },
                { step: 3, label: 'Date & Time' },
                { step: 4, label: 'Your Info' },
              ].map((item) => {
                const isPassed = currentStep > item.step;
                const isCurrent = currentStep === item.step;
                return (
                  <div key={item.step} className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-xs mb-1.5 transition-all ${
                        isPassed
                          ? 'bg-[#5F7155] text-white'
                          : isCurrent
                          ? 'bg-[#8A9A7B] text-white ring-4 ring-[#8A9A7B]/20'
                          : 'bg-white border border-[#E8DCC8] text-[#2B2B28]/60'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : item.step}
                    </div>
                    <span
                      className={`text-[11px] font-medium tracking-tight ${
                        isCurrent ? 'text-[#5F7155] font-bold' : 'text-[#2B2B28]/60'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
            
            {/* Connecting line */}
            <div className="relative mt-2 h-1 bg-[#E8DCC8] rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-[#5F7155] transition-all duration-300"
                style={{ width: `${((currentStep - 1) / 3) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* STEP 5: SUCCESS CONFIRMATION SCREEN */}
        {currentStep === 5 ? (
          <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-10 border border-[#8A9A7B] shadow-xl text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#8A9A7B]/20 text-[#5F7155] flex items-center justify-center mx-auto mb-5">
              <Check className="w-9 h-9 stroke-[2.5]" />
            </div>

            <span className="text-xs uppercase tracking-widest font-semibold text-[#5F7155]">
              Appointment Requested Successfully
            </span>
            <h3 className="font-serif text-3xl text-[#2B2B28] mt-1">
              We Look Forward to Welcoming You, {customerName.split(' ')[0]}!
            </h3>

            {/* Reference Badge */}
            <div className="inline-block mt-4 px-4 py-2 rounded-xl bg-[#F6F1E7] border border-[#E8DCC8]">
              <span className="text-xs text-[#2B2B28]/70 mr-2">Booking Reference:</span>
              <strong className="font-mono text-sm text-[#5F7155] tracking-wider">{bookingRef}</strong>
            </div>

            {/* Appointment Summary Card */}
            <div className="mt-6 p-5 rounded-2xl bg-[#F6F1E7]/50 border border-[#E8DCC8] text-left text-xs sm:text-sm space-y-3">
              <div className="flex justify-between pb-2 border-b border-[#E8DCC8]">
                <span className="text-[#2B2B28]/70">Date & Time:</span>
                <strong className="text-[#2B2B28]">
                  {new Date(selectedDate).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })} at {selectedTimeSlot}
                </strong>
              </div>

              <div className="flex justify-between pb-2 border-b border-[#E8DCC8]">
                <span className="text-[#2B2B28]/70">Preferred Artist:</span>
                <strong className="text-[#2B2B28]">
                  {selectedStylist ? selectedStylist.name : 'Any Available Senior Artist'}
                </strong>
              </div>

              <div className="flex justify-between pb-2 border-b border-[#E8DCC8]">
                <span className="text-[#2B2B28]/70">Services:</span>
                <span className="font-medium text-[#2B2B28] text-right max-w-[240px]">
                  {selectedServices.map(s => s.name).join(', ')}
                </span>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <span className="text-sm font-semibold text-[#2B2B28]">Total Amount:</span>
                <span className="font-serif text-xl font-bold text-[#5F7155]">
                  {formatInr(totalPrice)}
                </span>
              </div>

              <div className="text-[11px] text-[#5F7155] pt-1">
                📍 Location: {CONFIG.address}, {CONFIG.area}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 space-y-3">
              <a
                href={generateWhatsAppConfirmationUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-full bg-[#25D366] text-white text-sm font-semibold hover:bg-[#20ba5a] shadow-md flex items-center justify-center gap-2.5 transition-all min-h-[44px]"
              >
                <MessageCircle className="w-5 h-5 fill-white text-white" />
                <span>Confirm on WhatsApp (One Tap)</span>
              </a>

              <button
                type="button"
                onClick={handleDownloadCalendar}
                className="w-full py-3 px-6 rounded-full bg-white text-[#2B2B28] border border-[#E8DCC8] hover:border-[#8A9A7B] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all min-h-[44px] cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#5F7155]" />
                <span>Add to Phone Calendar (.ics)</span>
              </button>

              <button
                type="button"
                onClick={handleResetBooking}
                className="w-full py-2 text-xs text-[#2B2B28]/60 hover:text-[#2B2B28] transition-colors"
              >
                Book Another Appointment
              </button>
            </div>
          </div>
        ) : (
          /* STEPS 1-4 CONTAINER WITH STICKY SUMMARY */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Steps Content (8 cols) */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DCC8] shadow-sm">
              
              {/* STEP 1: CHOOSE SERVICES */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DCC8]">
                    <div>
                      <h3 className="font-serif text-2xl text-[#2B2B28]">1. Select Your Services</h3>
                      <p className="text-xs text-[#2B2B28]/70 mt-0.5">
                        Choose one or multiple rituals. You can also pick from the menu above.
                      </p>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#F6F1E7] text-[#5F7155]">
                      {selectedServices.length} selected
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[440px] overflow-y-auto pr-1">
                    {CONFIG.services.map((service) => {
                      const isSelected = selectedServices.some(s => s.id === service.id);
                      return (
                        <div
                          key={service.id}
                          onClick={() => onToggleService(service)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                            isSelected
                              ? 'border-[#5F7155] bg-[#F6F1E7]/60 ring-2 ring-[#5F7155]/20 shadow-xs'
                              : 'border-[#E8DCC8] bg-white hover:border-[#8A9A7B]'
                          }`}
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2">
                              <span className="font-serif text-base font-semibold text-[#2B2B28]">
                                {service.name}
                              </span>
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 border ${
                                isSelected
                                  ? 'bg-[#5F7155] border-[#5F7155] text-white'
                                  : 'border-stone-300'
                              }`}>
                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                              </div>
                            </div>
                            <p className="text-xs text-[#2B2B28]/60 mt-1 line-clamp-2">
                              {service.description}
                            </p>
                          </div>

                          <div className="mt-3 pt-2.5 border-t border-[#E8DCC8]/40 flex items-center justify-between text-xs">
                            <span className="text-[#5F7155] font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {service.durationMinutes} mins
                            </span>
                            <span className="font-bold text-[#2B2B28]">
                              {formatInr(service.priceInr)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 1 Actions */}
                  <div className="pt-4 border-t border-[#E8DCC8] flex justify-end">
                    <button
                      type="button"
                      disabled={selectedServices.length === 0}
                      onClick={handleProceedToStep2}
                      className="px-6 py-3 rounded-full bg-[#8A9A7B] text-white text-xs sm:text-sm font-semibold hover:bg-[#5F7155] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 transition-all min-h-[44px] cursor-pointer"
                    >
                      <span>Continue to Stylist</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: CHOOSE STYLIST */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DCC8]">
                    <div>
                      <h3 className="font-serif text-2xl text-[#2B2B28]">2. Choose Your Artist</h3>
                      <p className="text-xs text-[#2B2B28]/70 mt-0.5">
                        Select a specific senior artist or let us assign whoever is best available.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* "Any Available" Option */}
                    <div
                      onClick={() => onSelectStylistId(null)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                        selectedStylistId === null
                          ? 'border-[#5F7155] bg-[#F6F1E7]/60 ring-2 ring-[#5F7155]/20'
                          : 'border-[#E8DCC8] bg-white hover:border-[#8A9A7B]'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-[#8A9A7B]/20 text-[#5F7155] flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-sm text-[#2B2B28]">Any Available Artist</p>
                          {selectedStylistId === null && <Check className="w-4 h-4 text-[#5F7155] stroke-[3]" />}
                        </div>
                        <p className="text-xs text-[#2B2B28]/60 mt-0.5">
                          Fastest scheduling &bull; Assigned based on your specific treatment
                        </p>
                      </div>
                    </div>

                    {/* Stylist Options */}
                    {CONFIG.stylists.map((stylist) => {
                      const isSelected = selectedStylistId === stylist.id;
                      return (
                        <div
                          key={stylist.id}
                          onClick={() => onSelectStylistId(stylist.id)}
                          className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                            isSelected
                              ? 'border-[#5F7155] bg-[#F6F1E7]/60 ring-2 ring-[#5F7155]/20'
                              : 'border-[#E8DCC8] bg-white hover:border-[#8A9A7B]'
                          }`}
                        >
                          <img
                            src={stylist.photoUrl}
                            alt={stylist.name}
                            className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#E8DCC8]"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-semibold text-sm text-[#2B2B28]">{stylist.name}</p>
                              {isSelected && <Check className="w-4 h-4 text-[#5F7155] stroke-[3]" />}
                            </div>
                            <p className="text-xs text-[#5F7155] font-medium mt-0.5">{stylist.role}</p>
                            <p className="text-[11px] text-[#2B2B28]/60 mt-0.5">{stylist.specialty}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Step 2 Actions */}
                  <div className="pt-4 border-t border-[#E8DCC8] flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="px-5 py-2.5 rounded-full border border-[#E8DCC8] text-xs font-semibold hover:bg-[#F6F1E7] flex items-center gap-2 min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Services</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleProceedToStep3}
                      className="px-6 py-2.5 rounded-full bg-[#8A9A7B] text-white text-xs sm:text-sm font-semibold hover:bg-[#5F7155] flex items-center gap-2 min-h-[44px] cursor-pointer"
                    >
                      <span>Continue to Date & Time</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CHOOSE DATE & TIME */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-[#E8DCC8]">
                    <div>
                      <h3 className="font-serif text-2xl text-[#2B2B28]">3. Select Date & Slot</h3>
                      <p className="text-xs text-[#2B2B28]/70 mt-0.5">
                        Slots are in 30-minute intervals. Taken slots appear greyed out.
                      </p>
                    </div>
                  </div>

                  {/* 14-Day Date Selector Scroll */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2B28] mb-2.5">
                      Select Date (Next 14 Days)
                    </label>
                    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                      {upcomingDates.map((item) => {
                        const isSelected = selectedDate === item.iso;
                        return (
                          <button
                            key={item.iso}
                            type="button"
                            onClick={() => {
                              setSelectedDate(item.iso);
                              setSelectedTimeSlot(''); // reset slot when date changes
                            }}
                            className={`flex flex-col items-center justify-center p-3 rounded-2xl min-w-[70px] border transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#5F7155] text-white border-[#5F7155] shadow-xs'
                                : 'bg-[#F6F1E7]/50 text-[#2B2B28] border-[#E8DCC8] hover:border-[#8A9A7B]'
                            }`}
                          >
                            <span className="text-[11px] uppercase font-medium">{item.dayName}</span>
                            <span className="text-xl font-serif font-bold my-0.5">{item.dayNumber}</span>
                            <span className="text-[10px] opacity-80">{item.monthName}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots Grid */}
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#2B2B28]">
                        Available Time Slots
                      </label>
                      <div className="flex items-center gap-3 text-[11px] text-[#2B2B28]/70">
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#E8DCC8]" />
                          Available
                        </span>
                        <span className="flex items-center gap-1">
                          <span className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                          Booked
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2.5">
                      {allTimeSlots.map((time) => {
                        const isBooked = bookedSlots.has(time);
                        const isPast = isSlotInPast(selectedDate, time);
                        const isDisabled = isBooked || isPast;
                        const isSelected = selectedTimeSlot === time;

                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={isDisabled}
                            onClick={() => setSelectedTimeSlot(time)}
                            className={`py-2.5 px-3 rounded-xl text-xs font-medium transition-all text-center border min-h-[44px] ${
                              isSelected
                                ? 'bg-[#8A9A7B] text-white border-[#8A9A7B] shadow-xs ring-2 ring-[#8A9A7B]/20'
                                : isDisabled
                                ? 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed line-through'
                                : 'bg-white text-[#2B2B28] border-[#E8DCC8] hover:border-[#8A9A7B] hover:bg-[#F6F1E7]/50'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 3 Actions */}
                  <div className="pt-4 border-t border-[#E8DCC8] flex justify-between">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="px-5 py-2.5 rounded-full border border-[#E8DCC8] text-xs font-semibold hover:bg-[#F6F1E7] flex items-center gap-2 min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="button"
                      disabled={!selectedTimeSlot}
                      onClick={handleProceedToStep4}
                      className="px-6 py-2.5 rounded-full bg-[#8A9A7B] text-white text-xs sm:text-sm font-semibold hover:bg-[#5F7155] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 min-h-[44px] cursor-pointer"
                    >
                      <span>Continue to Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: ENTER DETAILS & CONFIRM */}
              {currentStep === 4 && (
                <form onSubmit={handleConfirmBooking} className="space-y-6">
                  <div className="pb-4 border-b border-[#E8DCC8]">
                    <h3 className="font-serif text-2xl text-[#2B2B28]">4. Guest Contact & Confirmation</h3>
                    <p className="text-xs text-[#2B2B28]/70 mt-0.5">
                      We'll send your instant booking confirmation via WhatsApp.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="customer-name" className="block text-xs font-semibold uppercase tracking-wider text-[#2B2B28] mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5F7155]">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="customer-name"
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => {
                            setCustomerName(e.target.value);
                            if (nameError) setNameError(null);
                          }}
                          placeholder="e.g. Radhika Sharma"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#F6F1E7]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A7B] min-h-[44px]"
                        />
                      </div>
                      {nameError && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {nameError}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="customer-phone" className="block text-xs font-semibold uppercase tracking-wider text-[#2B2B28] mb-1">
                        WhatsApp Mobile Number * (10 Digits)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#5F7155]">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          id="customer-phone"
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => {
                            setCustomerPhone(e.target.value);
                            if (phoneError) setPhoneError(null);
                          }}
                          placeholder="e.g. 98390 12345"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#E8DCC8] bg-[#F6F1E7]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A7B] min-h-[44px]"
                        />
                      </div>
                      {phoneError ? (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {phoneError}
                        </p>
                      ) : (
                        <p className="text-[11px] text-[#2B2B28]/60 mt-1">
                          We will never send spam. Used only for your appointment reminder.
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="customer-notes" className="block text-xs font-semibold uppercase tracking-wider text-[#2B2B28] mb-1">
                        Special Requests or Skin Sensitivities (Optional)
                      </label>
                      <textarea
                        id="customer-notes"
                        rows={2}
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                        placeholder="e.g. Sensitive skin, getting ready for cousin's sangeet tomorrow..."
                        className="w-full p-3 rounded-xl border border-[#E8DCC8] bg-[#F6F1E7]/30 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A9A7B]"
                      />
                    </div>
                  </div>

                  {/* Step 4 Actions */}
                  <div className="pt-4 border-t border-[#E8DCC8] flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="px-5 py-2.5 rounded-full border border-[#E8DCC8] text-xs font-semibold hover:bg-[#F6F1E7] flex items-center gap-2 min-h-[44px]"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back</span>
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3 rounded-full bg-[#5F7155] text-white text-xs sm:text-sm font-semibold hover:bg-[#5F7155]/90 shadow-md flex items-center gap-2 min-h-[44px] cursor-pointer"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Confirm Appointment</span>
                    </button>
                  </div>
                </form>
              )}

            </div>

            {/* Right Sticky Summary Card (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E8DCC8] shadow-sm sticky top-28">
              <h4 className="font-serif text-xl text-[#2B2B28] pb-3 border-b border-[#E8DCC8]">
                Appointment Summary
              </h4>

              <div className="mt-4 space-y-3.5 text-xs">
                {/* Services */}
                <div>
                  <span className="text-[11px] font-semibold uppercase text-[#5F7155] tracking-wider block mb-1">
                    Selected Rituals ({selectedServices.length})
                  </span>
                  {selectedServices.length === 0 ? (
                    <p className="text-stone-400 italic">No services chosen yet</p>
                  ) : (
                    <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                      {selectedServices.map(s => (
                        <div key={s.id} className="flex justify-between items-start gap-2">
                          <span className="text-[#2B2B28] font-medium leading-snug">{s.name}</span>
                          <span className="font-semibold text-[#2B2B28] shrink-0">{formatInr(s.priceInr)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Stylist */}
                <div className="pt-2.5 border-t border-[#E8DCC8]/50">
                  <span className="text-[11px] font-semibold uppercase text-[#5F7155] tracking-wider block mb-0.5">
                    Artist Preference
                  </span>
                  <p className="font-medium text-[#2B2B28]">
                    {selectedStylist ? selectedStylist.name : 'Any Available Senior Artist'}
                  </p>
                </div>

                {/* Date & Time */}
                <div className="pt-2.5 border-t border-[#E8DCC8]/50">
                  <span className="text-[11px] font-semibold uppercase text-[#5F7155] tracking-wider block mb-0.5">
                    Reserved Slot
                  </span>
                  <p className="font-medium text-[#2B2B28]">
                    {new Date(selectedDate).toLocaleDateString('en-IN', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short'
                    })} &bull; {selectedTimeSlot || 'Time not chosen'}
                  </p>
                </div>

                {/* Running Total & Duration */}
                <div className="pt-3 border-t border-[#E8DCC8] space-y-1">
                  <div className="flex justify-between text-stone-500">
                    <span>Est. Total Duration:</span>
                    <span className="font-medium text-[#2B2B28]">{totalDuration} minutes</span>
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <span className="font-semibold text-sm text-[#2B2B28]">Total:</span>
                    <span className="font-serif text-2xl font-bold text-[#5F7155]">
                      {formatInr(totalPrice)}
                    </span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F6F1E7] border border-[#E8DCC8]/60 text-[11px] text-[#5F7155]">
                  Pay at salon after service &bull; Free cancellation up to 2 hours prior.
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
