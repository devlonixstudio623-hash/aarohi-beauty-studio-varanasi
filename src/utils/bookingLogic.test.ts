import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateIndianPhone,
  generateTimeSlots,
  getBookedSlotsForDate,
  isPeakWeddingSeason,
  calculateBridalCost,
  getSalonOpenStatus,
  formatInr,
  formatTime12h
} from './bookingLogic';

test('validateIndianPhone: correctly validates and formats 10-digit Indian phone numbers', () => {
  // Valid 10-digit formats
  assert.deepEqual(validateIndianPhone('9839012345'), { isValid: true, cleaned: '9839012345' });
  assert.deepEqual(validateIndianPhone('+91 98390 12345'), { isValid: true, cleaned: '9839012345' });
  assert.deepEqual(validateIndianPhone('09839012345'), { isValid: true, cleaned: '9839012345' });
  assert.deepEqual(validateIndianPhone('91-9839012345'), { isValid: true, cleaned: '9839012345' });
  assert.deepEqual(validateIndianPhone('7829104820'), { isValid: true, cleaned: '7829104820' });
  assert.deepEqual(validateIndianPhone('6392019284'), { isValid: true, cleaned: '6392019284' });

  // Invalid numbers
  assert.equal(validateIndianPhone('').isValid, false);
  assert.equal(validateIndianPhone('1234567890').isValid, false); // Doesn't start with 6-9
  assert.equal(validateIndianPhone('5555555555').isValid, false);
  assert.equal(validateIndianPhone('98765').isValid, false); // Too short
  assert.equal(validateIndianPhone('98765432101234').isValid, false); // Too long
});

test('generateTimeSlots: produces 30-minute intervals between open and close', () => {
  const slots = generateTimeSlots('10:00', '12:00');
  assert.deepEqual(slots, ['10:00', '10:30', '11:00', '11:30']);

  const fullDay = generateTimeSlots('10:00', '20:00');
  assert.equal(fullDay.length, 20); // 10 hours * 2 = 20 slots
  assert.equal(fullDay[0], '10:00');
  assert.equal(fullDay[fullDay.length - 1], '19:30');
});

test('getBookedSlotsForDate: returns deterministic set of slots for a given date', () => {
  const allSlots = generateTimeSlots('10:00', '20:00');
  const date1 = '2026-11-20';
  const booked1 = getBookedSlotsForDate(date1, allSlots);
  const booked1Again = getBookedSlotsForDate(date1, allSlots);

  // Determinism check
  assert.deepEqual(Array.from(booked1), Array.from(booked1Again));
  assert.ok(booked1.size >= 3 && booked1.size <= 6);

  // Different date gives different (or deterministically calculated) set
  const date2 = '2026-11-21';
  const booked2 = getBookedSlotsForDate(date2, allSlots);
  assert.ok(booked2.size >= 3);
});

test('isPeakWeddingSeason: identifies winter and summer wedding peak months in India', () => {
  // November (month index 10)
  assert.equal(isPeakWeddingSeason('2026-11-25'), true);
  // December (month index 11)
  assert.equal(isPeakWeddingSeason('2026-12-10'), true);
  // January (month index 0)
  assert.equal(isPeakWeddingSeason('2027-01-18'), true);
  // February (month index 1)
  assert.equal(isPeakWeddingSeason('2027-02-14'), true);
  // April (month index 3)
  assert.equal(isPeakWeddingSeason('2027-04-20'), true);
  // May (month index 4)
  assert.equal(isPeakWeddingSeason('2027-05-10'), true);

  // Off-season (August monsoon)
  assert.equal(isPeakWeddingSeason('2027-08-15'), false);
  // July
  assert.equal(isPeakWeddingSeason('2027-07-07'), false);
});

test('calculateBridalCost: calculates package + add-ons total and 30% advance deposit', () => {
  const pkg = {
    id: 'signature',
    name: 'Signature Royal Bridal',
    priceInr: 25000,
    description: 'HD Bridal Makeup',
    inclusions: ['HD Makeup'],
    notIncluded: ['Pre-bridal'],
    recommendedFor: 'Main wedding day'
  };

  const addOns = [
    { id: 'ext', name: 'Real Hair Extensions', priceInr: 3000, description: 'Volume' },
    { id: 'saree', name: 'Banarasi Saree Draping', priceInr: 1500, description: 'Ironed pleats' }
  ];

  const result = calculateBridalCost(pkg, addOns);
  assert.equal(result.subtotal, 25000);
  assert.equal(result.addOnsTotal, 4500);
  assert.equal(result.grandTotal, 29500);
  assert.equal(result.advanceAmount, 8850); // 30% of 29500 = 8850
});

test('getSalonOpenStatus: determines open vs closed state accurately', () => {
  const hoursMap = {
    Monday: { open: '10:00', close: '20:00' },
    Tuesday: { open: '10:00', close: '20:00' },
    Wednesday: { open: '10:00', close: '20:00' },
    Thursday: { open: '10:00', close: '20:00' },
    Friday: { open: '10:00', close: '20:00' },
    Saturday: { open: '10:00', close: '20:00' },
    Sunday: { open: '10:00', close: '20:00' }
  };

  // Mock midday (14:30 on a Wednesday)
  const openTime = new Date('2026-11-18T14:30:00');
  const statusOpen = getSalonOpenStatus(hoursMap, openTime);
  assert.equal(statusOpen.isOpen, true);
  assert.equal(statusOpen.statusText, 'Open Now');

  // Mock late night (22:30)
  const lateTime = new Date('2026-11-18T22:30:00');
  const statusClosed = getSalonOpenStatus(hoursMap, lateTime);
  assert.equal(statusClosed.isOpen, false);
  assert.equal(statusClosed.statusText, 'Closed Now');
});

test('formatInr: formats Indian currency symbols correctly', () => {
  const formatted = formatInr(25000);
  assert.ok(formatted.includes('25,000'));
});

test('formatTime12h: converts 24h strings to user-friendly 12h AM/PM strings', () => {
  assert.equal(formatTime12h('10:00'), '10:00 AM');
  assert.equal(formatTime12h('20:00'), '8:00 PM');
  assert.equal(formatTime12h('13:30'), '1:30 PM');
  assert.equal(formatTime12h('09:15'), '9:15 AM');
  assert.equal(formatTime12h('12:00'), '12:00 PM');
  assert.equal(formatTime12h('00:00'), '12:00 AM');
});
