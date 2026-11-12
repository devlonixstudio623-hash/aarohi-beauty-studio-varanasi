/**
 * Pure booking and schedule logic for Aarohi Beauty Studio.
 * Decoupled from React DOM for testability and deterministic operation.
 */

export interface OpeningHourDay {
  day: string; // "Monday", etc.
  open: string; // "10:00"
  close: string; // "20:00"
  closed?: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  durationMinutes: number;
  priceInr: number;
  description: string;
}

export interface BridalPackage {
  id: string;
  name: string;
  priceInr: number;
  description: string;
  inclusions: string[];
  notIncluded: string[];
  recommendedFor: string;
}

export interface BridalAddOn {
  id: string;
  name: string;
  priceInr: number;
  description: string;
}

/**
 * Validates Indian 10-digit mobile phone numbers.
 * Accepts formats: "9876543210", "+91 98765 43210", "91-9876543210", "09876543210"
 */
export function validateIndianPhone(input: string): { isValid: boolean; cleaned: string; error?: string } {
  if (!input || !input.trim()) {
    return { isValid: false, cleaned: '', error: 'Please enter your mobile number' };
  }
  // Strip all non-numeric characters
  const cleaned = input.replace(/\D/g, '');
  
  // Handle optional leading 0 or 91
  let tenDigit = cleaned;
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    tenDigit = cleaned.slice(1);
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    tenDigit = cleaned.slice(2);
  }

  if (tenDigit.length !== 10) {
    return { isValid: false, cleaned: tenDigit, error: 'Enter a valid 10-digit mobile number' };
  }

  // Indian mobile numbers must start with 6, 7, 8, or 9
  if (!/^[6-9]/.test(tenDigit)) {
    return { isValid: false, cleaned: tenDigit, error: 'Mobile number should start with 6, 7, 8, or 9' };
  }

  return { isValid: true, cleaned: tenDigit };
}

/**
 * Generates all 30-minute time slots between openTime and closeTime (e.g. "10:00" to "20:00").
 */
export function generateTimeSlots(openTime = "10:00", closeTime = "20:00"): string[] {
  const [openH, openM] = openTime.split(':').map(Number);
  const [closeH, closeM] = closeTime.split(':').map(Number);
  
  const slots: string[] = [];
  let currentMinutes = openH * 60 + openM;
  const endMinutes = closeH * 60 + closeM;

  while (currentMinutes < endMinutes) {
    const hours = Math.floor(currentMinutes / 60);
    const mins = currentMinutes % 60;
    const timeStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    slots.push(timeStr);
    currentMinutes += 30;
  }

  return slots;
}

/**
 * Deterministically marks specific slots as already booked based on the date string (YYYY-MM-DD).
 * This ensures the UI remains consistent across re-renders without jitter.
 */
export function getBookedSlotsForDate(dateStr: string, allSlots: string[]): Set<string> {
  const booked = new Set<string>();
  if (!dateStr || allSlots.length === 0) return booked;

  // Simple string hash
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  const seed = Math.abs(hash);

  // Deterministically pick 3 to 6 slots to be booked
  const numBooked = 3 + (seed % 4);
  for (let i = 0; i < numBooked; i++) {
    const slotIndex = (seed * (i + 3) + 7) % allSlots.length;
    booked.add(allSlots[slotIndex]);
  }

  return booked;
}

/**
 * Checks if a specific time slot on a specific date is in the past.
 */
export function isSlotInPast(dateStr: string, timeSlot: string, referenceDate: Date = new Date()): boolean {
  const [slotH, slotM] = timeSlot.split(':').map(Number);
  const slotDate = new Date(`${dateStr}T${String(slotH).padStart(2, '0')}:${String(slotM).padStart(2, '0')}:00`);
  return slotDate.getTime() < referenceDate.getTime();
}

/**
 * Calculates current open/closed status based on salon opening hours.
 */
export function getSalonOpenStatus(
  hoursMap: Record<string, { open: string; close: string; closed?: boolean }>,
  currentDate: Date = new Date()
): { isOpen: boolean; statusText: string; nextTransition: string } {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayName = days[currentDate.getDay()];
  const todayHours = hoursMap[dayName] || { open: '10:00', close: '20:00' };

  if (todayHours.closed) {
    return {
      isOpen: false,
      statusText: 'Closed Today',
      nextTransition: 'Opens tomorrow at 10:00 AM'
    };
  }

  const currentMinutes = currentDate.getHours() * 60 + currentDate.getMinutes();
  const [openH, openM] = todayHours.open.split(':').map(Number);
  const [closeH, closeM] = todayHours.close.split(':').map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    // Format closing time to 12h
    const closePeriod = closeH >= 12 ? 'PM' : 'AM';
    const displayH = closeH % 12 || 12;
    const displayM = closeM === 0 ? '' : `:${String(closeM).padStart(2, '0')}`;
    return {
      isOpen: true,
      statusText: 'Open Now',
      nextTransition: `Closes at ${displayH}${displayM} ${closePeriod}`
    };
  } else if (currentMinutes < openMinutes) {
    const displayH = openH % 12 || 12;
    return {
      isOpen: false,
      statusText: 'Closed Now',
      nextTransition: `Opens today at ${displayH}:00 AM`
    };
  } else {
    return {
      isOpen: false,
      statusText: 'Closed Now',
      nextTransition: 'Opens tomorrow at 10:00 AM'
    };
  }
}

/**
 * Calculates total price and 30% advance deposit for bridal package and add-ons.
 */
export function calculateBridalCost(
  pkg: BridalPackage | undefined,
  selectedAddOns: BridalAddOn[]
): { subtotal: number; addOnsTotal: number; grandTotal: number; advanceAmount: number } {
  const subtotal = pkg ? pkg.priceInr : 0;
  const addOnsTotal = selectedAddOns.reduce((sum, item) => sum + item.priceInr, 0);
  const grandTotal = subtotal + addOnsTotal;
  const advanceAmount = Math.round(grandTotal * 0.3); // 30% advance

  return { subtotal, addOnsTotal, grandTotal, advanceAmount };
}

/**
 * Detects if a date falls into the peak Varanasi wedding season:
 * Typically November to February (winter wedding boom) and April to May (summer auspicious lagna).
 */
export function isPeakWeddingSeason(dateStr: string): boolean {
  if (!dateStr) return false;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return false;
  const month = date.getMonth(); // 0 = Jan, 1 = Feb, ..., 10 = Nov, 11 = Dec
  // Nov (10), Dec (11), Jan (0), Feb (1), Apr (3), May (4)
  return [10, 11, 0, 1, 3, 4].includes(month);
}

/**
 * Generates an .ics calendar file content for seamless appointment addition.
 */
export function generateIcsCalendar(params: {
  title: string;
  description: string;
  location: string;
  dateStr: string; // YYYY-MM-DD
  timeStr: string; // HH:MM
  durationMinutes: number;
}): string {
  const { title, description, location, dateStr, timeStr, durationMinutes } = params;
  const cleanDate = dateStr.replace(/-/g, '');
  const cleanTime = timeStr.replace(/:/g, '') + '00';
  
  // Calculate end time
  const [startH, startM] = timeStr.split(':').map(Number);
  const startDate = new Date(`${dateStr}T${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}:00`);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60 * 1000);
  
  const endYear = endDate.getFullYear();
  const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
  const endDay = String(endDate.getDate()).padStart(2, '0');
  const endH = String(endDate.getHours()).padStart(2, '0');
  const endM = String(endDate.getMinutes()).padStart(2, '0');
  const endDt = `${endYear}${endMonth}${endDay}T${endH}${endM}00`;

  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Aarohi Beauty Studio//Appointment Booking//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${Date.now()}@aarohibeautystudio.com`,
    `DTSTAMP:${cleanDate}T${cleanTime}Z`,
    `DTSTART:${cleanDate}T${cleanTime}`,
    `DTEND:${endDt}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ];

  return icsLines.join('\r\n');
}

/**
 * Formats Indian Currency (INR) with proper comma separators: e.g. 24,999 or 1,200.
 */
export function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Formats 24h time string (e.g. "20:00" or "10:00") into a user-friendly 12h format ("8:00 PM" or "10:00 AM").
 */
export function formatTime12h(timeStr: string): string {
  if (!timeStr || !timeStr.includes(':')) return timeStr;
  const [hStr, mStr] = timeStr.split(':');
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  if (isNaN(h) || isNaN(m)) return timeStr;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayH = h % 12 || 12;
  const displayM = String(m).padStart(2, '0');
  return `${displayH}:${displayM} ${period}`;
}
