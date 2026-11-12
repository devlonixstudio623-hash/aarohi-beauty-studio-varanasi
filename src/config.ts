/**
 * CLIENT CONFIGURATION FILE
 * ============================================================================
 * To re-skin this website for any other salon or bridal studio, edit ONLY
 * this file. All text, services, packages, stylists, contact info, pricing,
 * and media assets are driven entirely by this CONFIG object.
 * ============================================================================
 */

import heroBrideImg from './assets/images/hero_bride_1794440229030.jpg';
import stylistSunitaImg from './assets/images/stylist_sunita_1794440277457.jpg';
import stylistPriyankaImg from './assets/images/stylist_priyanka_1794440278579.jpg';
import stylistAnanyaImg from './assets/images/stylist_ananya_1794440279037.jpg';
import stylistTanviImg from './assets/images/stylist_tanvi_1794440278544.jpg';
import goldFacialSpaImg from './assets/images/gold_facial_spa_1794440257600.jpg';
import jasmineBraidImg from './assets/images/jasmine_braid_1794440232215.jpg';
import bridalNailArtImg from './assets/images/bridal_nail_art_1794440257217.jpg';
import haldiBrideImg from './assets/images/haldi_bride_1794440232264.jpg';
import salonStudioImg from './assets/images/salon_studio_1794440231913.jpg';
import hairSmoothAfterImg from './assets/images/hair_smooth_after_1794440231016.jpg';
import hairFrizzBeforeImg from './assets/images/hair_frizz_before_1794440229664.jpg';
import bridalBeforeImg from './assets/images/bridal_before_1794440228195.jpg';
import bridalAfterImg from './assets/images/bridal_after_1794440229368.jpg';
import facialDetanBeforeImg from './assets/images/facial_detan_before_1794440254251.jpg';
import facialDetanAfterImg from './assets/images/facial_detan_after_1794440255470.jpg';

export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'skin' | 'makeup' | 'nails';
  durationMinutes: number;
  priceInr: number;
  description: string;
  popular?: boolean;
}

export interface BridalPackage {
  id: string;
  name: string;
  tier: 'Classic' | 'Signature' | 'Luxe';
  priceInr: number;
  description: string;
  inclusions: string[];
  notIncluded: string[];
  recommendedFor: string;
  badge?: string;
}

export interface BridalAddOn {
  id: string;
  name: string;
  priceInr: number;
  description: string;
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialty: string;
  photoUrl: string;
  bio: string;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  date: string;
  eventType: string;
  text: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  tag: string;
}

export interface BeforeAfterPair {
  id: string;
  title: string;
  treatment: string;
  notes: string;
  beforeUrl: string;
  afterUrl: string;
}

export interface Offer {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  code: string;
  validity: string;
  details: string[];
}

export const CONFIG = {
  // Brand identity
  businessName: "Aarohi Beauty Studio",
  tagline: "Where Banarasi Grace Meets Contemporary Elegance",
  shortDescription: "Varanasi's premier luxury salon and bridal makeup sanctuary in Sigra. Handcrafted HD & Airbrush bridal artistry, organic skin therapies, and bespoke hair rituals in a tranquil boutique setting.",
  ownerName: "Sunita Jaiswal",
  yearsOfExperience: 14,
  clientsServed: "8,500+",
  googleRating: 4.9,
  totalReviewsCount: 428,

  // Contact details
  phone: "+91 98390 12345",
  phoneRaw: "9839012345",
  whatsappNumber: "919839012345",
  email: "contact@aarohibeautystudio.com",
  address: "B-27/42, Durgakund Road, Near Sigra Crossing",
  area: "Sigra, Varanasi",
  city: "Varanasi, Uttar Pradesh 221010",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14428.45265416035!2d82.97746412151608!3d25.30058204273295!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398e2de260027cc7%3A0x7d6f7f2d80d29255!2sSigra%2C%20Varanasi%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1709841234567!5m2!1sen!2sin",
  googleMapsDirectionsUrl: "https://maps.google.com/?q=Sigra+Varanasi+Aarohi+Beauty+Studio",
  googleReviewUrl: "https://g.page/r/aarohi-beauty-studio-varanasi/review",
  instagramUrl: "https://instagram.com/aarohibeautystudio",
  instagramHandle: "@aarohibeautystudio",

  // Demo Strip control
  showDemoStrip: true,
  demoStripText: "Demo prepared for Aarohi Beauty Studio by Devlonix",

  // Master Hero Image
  heroImage: heroBrideImg,

  // Brand Palette
  colors: {
    cream: "#F6F1E7",
    beige: "#E8DCC8",
    sage: "#8A9A7B",
    deepSage: "#5F7155",
    charcoal: "#2B2B28",
    gold: "#B89B5E"
  },

  // Operating Hours
  openingHours: {
    Monday: { open: "10:00", close: "20:00" },
    Tuesday: { open: "10:00", close: "20:00" },
    Wednesday: { open: "10:00", close: "20:00" },
    Thursday: { open: "10:00", close: "20:00" },
    Friday: { open: "10:00", close: "20:00" },
    Saturday: { open: "10:00", close: "20:30" },
    Sunday: { open: "10:00", close: "20:30" }
  },

  // Service Catalog with realistic Varanasi pricing and benefit-first copy
  services: [
    // Hair
    {
      id: "h1",
      name: "Botanical Keratin Infusion & Silk Spa",
      category: "hair",
      durationMinutes: 90,
      priceInr: 2800,
      description: "Restores deep moisture and eliminates frizz caused by Varanasi humidity with cold-pressed argan and keratin peptides.",
      popular: true
    },
    {
      id: "h2",
      name: "Precision Layered Cut & Blowout",
      category: "hair",
      durationMinutes: 45,
      priceInr: 850,
      description: "Facial contouring cut tailored to your hair texture, finished with an anti-humidity bouncy blowout."
    },
    {
      id: "h3",
      name: "Balayage / Global Ammonia-Free Color",
      category: "hair",
      durationMinutes: 120,
      priceInr: 4500,
      description: "Sun-kissed hand-painted highlights or deep rich tones that grow out softly without harsh lines."
    },
    {
      id: "h4",
      name: "Ayurvedic Scalp Detox & Kansa Wand Therapy",
      category: "hair",
      durationMinutes: 60,
      priceInr: 1600,
      description: "Warm herbal oil massage followed by steam and Kansa wand acupressure to stimulate hair roots and ease tension."
    },
    {
      id: "h5",
      name: "Olaplex Bond Multiplier Treatment",
      category: "hair",
      durationMinutes: 60,
      priceInr: 2200,
      description: "Repairs chemical and heat damage from the inside out, returning natural elasticity to dull hair."
    },

    // Skin & Facial
    {
      id: "s1",
      name: "Kashi Gold Radiance Bridal Facial",
      category: "skin",
      durationMinutes: 75,
      priceInr: 3200,
      description: "24K gold foil infusion with saffron extracts and lymphatic drainage for an unmistakably regal glow.",
      popular: true
    },
    {
      id: "s2",
      name: "Hydra-Infusion MediCleanse Facial",
      category: "skin",
      durationMinutes: 60,
      priceInr: 2400,
      description: "Vacuum blackhead extraction with hyaluronic acid and antioxidant infusion for glass skin without redness."
    },
    {
      id: "s3",
      name: "O3+ Radiant Glow & Detan Therapy",
      category: "skin",
      durationMinutes: 60,
      priceInr: 1800,
      description: "Instantly reverses sun tanning and urban dust pollution, soothing hyperpigmentation."
    },
    {
      id: "s4",
      name: "Kumkumadi & Rose Quartz Lifting Ritual",
      category: "skin",
      durationMinutes: 50,
      priceInr: 1950,
      description: "Pure Kashmiri saffron oil combined with chilled rose quartz roller sculpting for jawline definition."
    },
    {
      id: "s5",
      name: "Back Polishing & Glow Scrub",
      category: "skin",
      durationMinutes: 45,
      priceInr: 1500,
      description: "Walnut and sandalwood buffing for backless blouses, leaving skin soft, even, and luminous."
    },

    // Makeup
    {
      id: "m1",
      name: "Royal HD Bridal Artistry",
      category: "makeup",
      durationMinutes: 150,
      priceInr: 18000,
      description: "High-definition camera-ready finish that looks natural up close, paired with jewellery setting and saree styling.",
      popular: true
    },
    {
      id: "m2",
      name: "Airbrush Muhurtham Bridal Experience",
      category: "makeup",
      durationMinutes: 180,
      priceInr: 26000,
      description: "Featherlight silicone-based airbrush foundation that stays waterproof and sweatproof through 14 hours of pheras."
    },
    {
      id: "m3",
      name: "Sangeet & Cocktail Smoky Glam",
      category: "makeup",
      durationMinutes: 90,
      priceInr: 7500,
      description: "Smoldering kohled eyes or champagne glitter, sculpted contour, and long-wear dance-proof setting."
    },
    {
      id: "m4",
      name: "Haldi & Mehendi Dewy Fresh Look",
      category: "makeup",
      durationMinutes: 75,
      priceInr: 6000,
      description: "Soft flushed cheeks, floral-accented braids, and lightweight skin tint made for daytime sunlight."
    },
    {
      id: "m5",
      name: "Sister of Bride / Guest Elegance",
      category: "makeup",
      durationMinutes: 60,
      priceInr: 4500,
      description: "Polished party makeup, lashes, hair blowout or soft curls, and dupatta styling."
    },

    // Nails & Waxing
    {
      id: "n1",
      name: "Russian Gel Extensions with Nail Art",
      category: "nails",
      durationMinutes: 90,
      priceInr: 2200,
      description: "Ultra-clean cuticle work, durable gel extensions with hand-painted French, ombre, or bridal chrome.",
      popular: true
    },
    {
      id: "n2",
      name: "Rose & Almond Luxury Spa Pedicure",
      category: "nails",
      durationMinutes: 60,
      priceInr: 1100,
      description: "Warm rose petal milk soak, exfoliating brown sugar scrub, calloused heel buff, and soothing calf massage."
    },
    {
      id: "n3",
      name: "Rica White Chocolate Brazilian Wax",
      category: "nails",
      durationMinutes: 45,
      priceInr: 1600,
      description: "Colophony-free Italian waxing that grips hair gently without pulling the skin, preventing bumps."
    },
    {
      id: "n4",
      name: "Full Body Rica Aloe Glow Waxing",
      category: "nails",
      durationMinutes: 90,
      priceInr: 3200,
      description: "Complete limbs, underarms, and back wax finished with soothing chamomile aftercare lotion."
    },
    {
      id: "n5",
      name: "Bridal Chrome & Stone Nail Package",
      category: "nails",
      durationMinutes: 100,
      priceInr: 3000,
      description: "Custom length extensions with Swarovski crystals and gold foil accents to match your lehenga embroidery."
    }
  ] as Service[],

  // Bridal Packages
  bridalPackages: [
    {
      id: "classic",
      name: "The Varanasi Heritage Bride",
      tier: "Classic",
      priceInr: 18000,
      description: "Designed for the bride who wants timeless Kashi grace without feeling heavily made up.",
      inclusions: [
        "HD Bridal Makeup with sweatproof base",
        "Classic bridal bun or floral braid styling",
        "Premium mink false lashes & eye accents",
        "Traditional Banarasi saree / lehenga draping",
        "Jewellery placement & floral accessory pinning",
        "Bridal touch-up kit for pheras"
      ],
      notIncluded: [
        "Airbrush equipment",
        "Pre-bridal skin sessions",
        "Hair extensions (available as add-on)"
      ],
      recommendedFor: "Morning weddings, Arya Samaj ceremonies, or intimate temple pheras"
    },
    {
      id: "signature",
      name: "The Royal Kashi Signature",
      tier: "Signature",
      priceInr: 28000,
      badge: "Most Loved in Varanasi",
      description: "Our most requested package. 16-hour humidity-proof artistry with senior artist Sunita Jaiswal.",
      inclusions: [
        "Ultra-HD or Silicone Airbrush base (customized to skin type)",
        "Advanced bridal hairstyle with real floral arrangement",
        "Natural human-hair extensions included for volume",
        "Designer saree / multi-dupatta draping with safety locking",
        "Lashes, cosmetic lenses & bindi placement",
        "Full groom touch-up (beard groom & matte shine control)",
        "Personalized pre-consultation & skin prep roadmap"
      ],
      notIncluded: [
        "Multiple event switch on same night",
        "Full pre-bridal 3-day package"
      ],
      recommendedFor: "Evening grand weddings, Taj Ganges receptions, and outdoor mandaps"
    },
    {
      id: "luxe",
      name: "The Maharani Imperial Luxe",
      tier: "Luxe",
      priceInr: 45000,
      badge: "Complete Bridal Journey",
      description: "From pre-wedding glow to the final vidaai: a comprehensive concierge experience.",
      inclusions: [
        "Two events covered (e.g. Sangeet + Wedding, or Wedding + Reception)",
        "Premium Airbrush HD Makeup with waterproof setting",
        "Complete 7-day Pre-Bridal Care (Gold Facial, Body Polish, Rica Wax)",
        "Russian Gel Manicure & Spa Pedicure with custom nail art",
        "Unlimited hair extensions, padding, and fresh floral coordination",
        "Dedicated artist stays with you through pheras until Vidaai",
        "Groom grooming ritual and mother-of-bride express styling"
      ],
      notIncluded: [
        "Outstation travel beyond Varanasi district"
      ],
      recommendedFor: "Multi-day destination weddings, palace venues, and brides wanting zero stress"
    }
  ] as BridalPackage[],

  // Bridal Add-Ons
  bridalAddOns: [
    {
      id: "addon-ext",
      name: "Premium Real Hair Extensions & Padding",
      priceInr: 3000,
      description: "Adds natural thickness and length for traditional flower-woven long braids or voluminous royal buns."
    },
    {
      id: "addon-saree",
      name: "Banarasi Saree / Double Dupatta Draping",
      priceInr: 1500,
      description: "Crisp ironed pleats, weight-balanced shoulder pinning, and secure head dupatta that will not slip during pheras."
    },
    {
      id: "addon-facial",
      name: "Pre-Bridal 24K Gold Hydra Glow Session",
      priceInr: 3500,
      description: "Done 2-3 days before the wedding to ensure skin is deeply plumped, smooth, and radiant beneath makeup."
    },
    {
      id: "addon-mehendi",
      name: "Bridal Mehendi Color-Enhance Polish",
      priceInr: 1200,
      description: "Herbal clove and eucalyptus seal treatment that deepens mehendi stain to a rich mahogany shade."
    },
    {
      id: "addon-lens",
      name: "Comfort Color Lenses & Lash Upgrades",
      priceInr: 1400,
      description: "Breathable honey/hazel lenses that look striking in high-res photography without irritating eyes."
    },
    {
      id: "addon-groom",
      name: "Groom Camera-Ready Touchup",
      priceInr: 2500,
      description: "Discreet shine-control skin prep, beard sculpting, under-eye brightening, and safa/turban pinning."
    }
  ] as BridalAddOn[],

  // Stylists
  stylists: [
    {
      id: "sunita",
      name: "Sunita Jaiswal",
      role: "Founder & Master Bridal Artist",
      experienceYears: 14,
      specialty: "Airbrush Bridal & Banarasi Heritage Looks",
      photoUrl: stylistSunitaImg,
      bio: "Trained under top Mumbai and Delhi academy mentors, Sunita has draped and styled over 2,200 brides across Eastern Uttar Pradesh. Her signature is skin that still breathes."
    },
    {
      id: "priyanka",
      name: "Priyanka Mishra",
      role: "Senior Skin Therapist & Aesthetician",
      experienceYears: 9,
      specialty: "Hydra-Infusion & Ayurvedic Kumkumadi Care",
      photoUrl: stylistPriyankaImg,
      bio: "Certified clinical aesthetician who tailors every facial to the exact mineral balance and humidity needs of Varanasi skin."
    },
    {
      id: "ananya",
      name: "Ananya Verma",
      role: "Creative Hair Sculptor & Colorist",
      experienceYears: 7,
      specialty: "Botanical Keratin & Traditional Floral Braids",
      photoUrl: stylistAnanyaImg,
      bio: "Obsessed with hair health first. Ananya creates bridal buns that feel feather-light even with heavy matha pattis."
    },
    {
      id: "tanvi",
      name: "Tanvi Patel",
      role: "Nail Artist & Sangeet Makeup Stylist",
      experienceYears: 6,
      specialty: "Russian Gel Extensions & Cocktail Glam",
      photoUrl: stylistTanviImg,
      bio: "Known for sharp winged liners, dewy glass-skin finishes, and bespoke hand-painted bridal nail art."
    }
  ] as Stylist[],

  // Reviews: Natural Hinglish-friendly, real local context
  reviews: [
    {
      id: "r1",
      name: "Shreya Srivastava",
      location: "Bhelupur, Varanasi",
      rating: 5,
      date: "November 2025",
      eventType: "Wedding at Taj Ganges",
      text: "Sunita didi is pure magic. I was terrified of looking cakey or white, but my base stayed dewy throughout the 4-hour open-air pheras. Even my dadi remarked that I looked like myself, just glowing. The double dupatta didn't shift an inch!",
      verified: true
    },
    {
      id: "r2",
      name: "Dr. Pallavi Upadhyay",
      location: "Lanka, Varanasi",
      rating: 5,
      date: "January 2026",
      eventType: "HydraCleanse & Hair Spa",
      text: "The salon in Sigra is so peaceful. Stepping inside feels like escaping Varanasi's noise and dust. The Hydra facial unclogged all the festival congestion without a single red patch. Worth every single rupee.",
      verified: true
    },
    {
      id: "r3",
      name: "Rhea Chaurasia",
      location: "Mahmoorganj, Varanasi",
      rating: 5,
      date: "December 2025",
      eventType: "Sangeet & Reception Looks",
      text: "Booked Tanvi and Sunita for both my Sangeet and Reception. The smoky eye on the cocktail night got so many compliments! And the team arrived at the venue 15 minutes before time, which is so rare in Varanasi.",
      verified: true
    },
    {
      id: "r4",
      name: "Ankita Banerji",
      location: "Ravindrapuri, Varanasi",
      rating: 5,
      date: "October 2025",
      eventType: "Pre-Bridal Package",
      text: "Took their 7-day pre-bridal regime before my wedding. The Kumkumadi massage and back polishing made a visible difference. The girls are extremely polite, maintain super hygiene, and never push unnecessary products.",
      verified: true
    },
    {
      id: "r5",
      name: "Pooja Pandey",
      location: "Sigra, Varanasi",
      rating: 5,
      date: "February 2026",
      eventType: "Russian Gel Nails & Hair Color",
      text: "Finally a salon in Sigra that does proper Russian manicures! My gel extensions lasted 5 weeks without lifting. Also got honey balayage from Ananya, hair feels softer than before.",
      verified: true
    },
    {
      id: "r6",
      name: "Meera Agarwal",
      location: "Cantonment, Varanasi",
      rating: 5,
      date: "November 2025",
      eventType: "Muhurtham Airbrush Bride",
      text: "We booked the Royal Signature package. The airbrush stayed intact despite tears during the vidaai. If you want peace of mind on your wedding morning, just book Sunita ji blindly.",
      verified: true
    }
  ] as Review[],

  // Gallery: Curated high aesthetic images matching Varanasi luxury salon
  gallery: [
    {
      id: "g1",
      title: "Royal Crimson Banarasi Bride",
      category: "Bridal",
      tag: "Signature HD",
      imageUrl: heroBrideImg
    },
    {
      id: "g2",
      title: "24K Gold & Saffron Facial Ritual",
      category: "Facial",
      tag: "Kashi Gold Ritual",
      imageUrl: goldFacialSpaImg
    },
    {
      id: "g3",
      title: "Traditional Jasmine-Woven Braid",
      category: "Hair",
      tag: "Heritage Styling",
      imageUrl: jasmineBraidImg
    },
    {
      id: "g4",
      title: "Handcrafted Bridal Gel Nail Art",
      category: "Nails",
      tag: "Russian Extensions",
      imageUrl: bridalNailArtImg
    },
    {
      id: "g5",
      title: "Haldi Ceremony Joyful Amber Glow",
      category: "Bridal",
      tag: "Daytime Glow",
      imageUrl: haldiBrideImg
    },
    {
      id: "g6",
      title: "Luxury Sigra Salon Sanctuary",
      category: "Studio",
      tag: "Private Bridal Suite",
      imageUrl: salonStudioImg
    },
    {
      id: "g7",
      title: "Frizz-Free Silk Keratin Finish",
      category: "Hair",
      tag: "Silk Therapy",
      imageUrl: hairSmoothAfterImg
    },
    {
      id: "g8",
      title: "Royal Muhurtham HD Makeup",
      category: "Makeup",
      tag: "Airbrush Base",
      imageUrl: bridalAfterImg
    }
  ] as GalleryItem[],

  // Before/After Pairs - Authentically matched transformations
  beforeAfterPairs: [
    {
      id: "ba1",
      title: "Wedding Day Skin & Bridal Artistry",
      treatment: "Hydra-Infusion & HD Bridal Base",
      notes: "Smoothed post-acne texture and dark circles without heavy cake-like layering.",
      beforeUrl: bridalBeforeImg,
      afterUrl: bridalAfterImg
    },
    {
      id: "ba2",
      title: "Frizz-Free Botanical Keratin Therapy",
      treatment: "Organic Keratin & Gloss Treatment",
      notes: "Tamed coarse, humidity-damaged waves into smooth silk that lasts through monsoon.",
      beforeUrl: hairFrizzBeforeImg,
      afterUrl: hairSmoothAfterImg
    },
    {
      id: "ba3",
      title: "Kashi Gold Radiance Detan Ritual",
      treatment: "Ayurvedic Kumkumadi & 24K Leaf Facial",
      notes: "Reversed stubborn sun tanning and brought out natural high-point luminosity.",
      beforeUrl: facialDetanBeforeImg,
      afterUrl: facialDetanAfterImg
    }
  ] as BeforeAfterPair[],

  // Offers & Memberships
  offers: [
    {
      id: "off-welcome",
      badge: "Welcome Privilege",
      title: "First Visit: 15% Off Any Ritual",
      subtitle: "For new clients stepping into our Sigra sanctuary",
      code: "AAROHI15",
      validity: "Valid on all hair & skin services above ₹1,000",
      details: [
        "Complimentary digital scalp or skin analysis",
        "Includes consultation with senior aesthetician",
        "Valid Monday to Friday upon prior booking"
      ]
    },
    {
      id: "off-bridal",
      badge: "Bridal Early Booking",
      title: "Complimentary Pre-Bridal Gold Session",
      subtitle: "Book your 2026-2027 bridal date 60 days in advance",
      code: "BRIDEGLOW",
      validity: "Available on Signature & Luxe packages",
      details: [
        "Free 24K Kashi Gold Facial (worth ₹3,200)",
        "Free Banarasi saree pleating session",
        "Priority reservation for peak lagna dates"
      ]
    },
    {
      id: "off-club",
      badge: "Salon Privé Club",
      title: "Annual Glow Pass (Save 30%)",
      subtitle: "Personalized monthly grooming & seasonal hair rituals",
      code: "GLOWCLUB",
      validity: "12-month rolling access",
      details: [
        "12 Luxury Facials or Botanical Hair Spas",
        "Unlimited precision trims & blowouts",
        "Complimentary sister / mother companion pass twice a year"
      ]
    }
  ] as Offer[]
};
