// All site content lives here — a single source of truth for services, fees,
// opening hours and contact details, taken from the current inchicoredentalcentre.com
// (opening hours, Eircode and rating from the practice's Google Maps listing).

export const clinic = {
  name: 'Inchicore Dental Centre',
  tagline: 'Family dentistry · Dublin 8',
  phone: '01 454 7207',
  phoneHref: 'tel:+35314547207',
  email: 'coredental23@gmail.com',
  addressLines: ['23 Tyrconnell Road', 'Inchicore, Dublin 8', 'D08 V634'],
  addressText: '23 Tyrconnell Road, Inchicore, Dublin 8, D08 V634',
  mapsUrl: 'https://maps.google.com/?cid=7482534583431001137',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Inchicore+Dental+Centre+23+Tyrconnell+Road+Dublin+8+D08+V634',
  mapEmbed: 'https://www.google.com/maps?q=Inchicore+Dental+Centre,+23+Tyrconnell+Road,+Dublin+8,+D08+V634&z=16&output=embed',
  rating: { score: '4.8', count: 71, source: 'Google' },
  officialSite: 'https://inchicoredentalcentre.com',
};

// day: 0 = Sunday … 6 = Saturday. open/close in minutes after midnight (Irish time).
export const hours = [
  { day: 1, label: 'Monday', text: '8.30am – 5.30pm', open: 510, close: 1050 },
  { day: 2, label: 'Tuesday', text: '8.30am – 5pm', open: 510, close: 1020 },
  { day: 3, label: 'Wednesday', text: '8.30am – 5pm', open: 510, close: 1020 },
  { day: 4, label: 'Thursday', text: '8.30am – 5.30pm', open: 510, close: 1050 },
  { day: 5, label: 'Friday', text: '8.30am – 1pm', open: 510, close: 780 },
  { day: 6, label: 'Saturday', text: 'Closed' },
  { day: 0, label: 'Sunday', text: 'Closed' },
];

export const nav = [
  { label: 'Home', path: '' },
  { label: 'About Us', path: 'about' },
  { label: 'Our Team', path: 'team' },
  { label: 'Services', path: 'services' },
  { label: 'Price List', path: 'prices' },
  { label: 'Contact Us', path: 'contact' },
];

export const highlights = [
  { icon: 'alert', title: 'Emergency appointments', text: 'Regular and emergency slots.' },
  { icon: 'badge', title: '€15 PRSI check-up', text: 'Exam, scale and polish, once a year.' },
  { icon: 'users', title: 'Everyone welcome', text: 'Private, PRSI and medical card.' },
  { icon: 'car', title: 'Free parking', text: 'Tyrconnell Park, across the road.' },
];

export const team = [
  { id: 'bernice-barry', name: 'Dr Bernice Barry', role: 'Principal Dentist', quals: 'B.D.S.', initials: 'BB', bio: 'Principal dentist at Inchicore Dental Centre, caring for families in Dublin 8.' },
  { id: 'keith-mccourt', name: 'Dr Keith McCourt', role: 'Principal Dentist', quals: 'B.D.S.', initials: 'KM', bio: 'Principal dentist at Inchicore Dental Centre, caring for families in Dublin 8.' },
];

export const aboutPillars = [
  { icon: 'sparkles', title: 'Modern, digital surgery', text: 'The latest digital equipment, combined with a personal, caring service.' },
  { icon: 'heart', title: 'Nervous patients at ease', text: 'We make sure even the most nervous patients feel at ease during their visit.' },
  { icon: 'clock', title: 'Flexible appointments', text: 'Appointments from 8.30am, Monday to Friday, and emergency appointments too.' },
  { icon: 'badge', title: 'Affordable prices', text: 'A full range of dental services at very affordable prices, with the full price list online.' },
];

// Services — the treatments on the practice's price list. `group` links each one to its price-list category.
// Descriptions explain each treatment in general terms; confirm the wording with the practice.
export const services = [
  {
    id: 'check-ups', group: 'general', icon: 'search', title: 'Check-ups & hygiene',
    short: 'Exams, scale and polish, and digital X-rays.',
    body: [
      'A regular examination lets your dentist spot problems early, and a scale and polish removes the build-up that brushing at home can miss.',
      'If you are PRSI qualified, an exam, scale and polish is €15 once a year.',
    ],
    fee: 'from €60 · PRSI €15',
  },
  {
    id: 'emergency', group: 'general', icon: 'alert', title: 'Emergency appointments',
    short: 'Toothache or a broken tooth? Call us.',
    body: [
      'Our flexible service means we can cater for emergency dental appointments as well as regular check-ups. Call us and we’ll work to see you as quickly as possible.',
    ],
    fee: 'Call 01 454 7207',
  },
  {
    id: 'children', group: 'general', icon: 'smile', title: 'Children’s check-ups',
    short: 'Exam and polish, with X-rays if required.',
    body: [
      'A family-friendly practice for the whole family. A child’s exam includes a polish, and X-rays if they are needed.',
    ],
    fee: '€40 – €70',
  },
  {
    id: 'gum', group: 'general', icon: 'droplet', title: 'Gum treatment',
    short: 'Advanced gum treatment, per visit.',
    body: [
      'Advanced gum treatment cleans below the gum line to treat gum disease and help keep your teeth healthy.',
    ],
    fee: '€100 – €120 per visit',
  },
  {
    id: 'fillings', group: 'restoration', icon: 'tooth', title: 'Fillings',
    short: 'Repair teeth damaged by decay.',
    body: [
      'A filling repairs a tooth that has been damaged by decay or wear, so it can work normally again.',
    ],
    fee: '€100 – €160',
  },
  {
    id: 'extractions', group: 'extractions', icon: 'minus', title: 'Extractions',
    short: 'Routine and surgical extractions.',
    body: [
      'When a tooth can’t be saved, we offer both routine and surgical extractions.',
    ],
    fee: '€100 – €200',
  },
  {
    id: 'dentures', group: 'dentures', icon: 'smile', title: 'Dentures',
    short: 'Acrylic-based and metal-based dentures.',
    body: [
      'Dentures replace missing teeth. We provide both acrylic-based and metal-based dentures.',
    ],
    fee: '€400 – €1,200',
  },
  {
    id: 'crowns', group: 'crowns', icon: 'crown', title: 'Crowns',
    short: 'Restore and protect a weakened tooth.',
    body: [
      'A crown covers a weakened or broken tooth to protect it and restore its shape.',
    ],
    fee: '€800 – €950',
  },
  {
    id: 'whitening', group: 'general', icon: 'sun', title: 'Whitening, splints & sealants',
    short: 'Tooth whitening, soft bite splints and fissure sealants.',
    body: [
      'Tooth whitening brightens your smile. A soft bite splint protects your teeth at night, and fissure sealants help protect the back teeth from decay.',
    ],
    fee: 'Whitening €250 · splint €170 · sealants €40',
  },
  {
    id: 'root-canal', group: 'root-canal', icon: 'root', title: 'Root canal treatment',
    short: 'Usually referred to a specialist.',
    body: [
      'Root canal treatment is usually referred to a specialist. Your dentist will explain your options.',
    ],
    fee: 'Referral',
  },
];

// Price list — from the practice's current price list (inchicoredentalcentre.com/price-list). Guide prices only.
export const feeGroups = [
  {
    id: 'general', title: 'General', icon: 'search',
    items: [
      ['Exam, scale and polish (once a year, if PRSI qualified)', '€15'],
      ['Examination and X-rays', '€60'],
      ['Exam, scale and polish', '€70'],
      ['Exam, scale and polish with X-rays', '€90'],
      ['Child exam, including polish and X-rays if required', '€40 – €70'],
      ['Advanced gum treatment (per visit)', '€100 – €120'],
      ['Prescription', '€50'],
      ['Tooth whitening', '€250'],
      ['Soft bite splint', '€170'],
      ['Fissure sealants', '€40'],
    ],
  },
  {
    id: 'xrays', title: 'X-rays', icon: 'scan',
    items: [
      ['Digital X-ray', '€20'],
      ['Digital X-rays (maximum charge)', '€50'],
    ],
  },
  {
    id: 'restoration', title: 'Restoration', icon: 'tooth',
    items: [
      ['Fillings', '€100 – €160'],
    ],
  },
  {
    id: 'extractions', title: 'Extractions', icon: 'minus',
    items: [
      ['Routine extraction', '€100 – €150'],
      ['Surgical extraction', '€150 – €200'],
    ],
  },
  {
    id: 'dentures', title: 'Dentures', icon: 'smile',
    items: [
      ['Acrylic-based dentures', '€400 – €600'],
      ['Metal-based dentures', '€900 – €1,200'],
    ],
  },
  {
    id: 'crowns', title: 'Crowns', icon: 'crown',
    items: [
      ['Crown', '€800 – €950'],
    ],
  },
  {
    id: 'root-canal', title: 'Root canal treatment', icon: 'root',
    items: [
      ['Root canal treatment', 'Specialist referral'],
    ],
  },
];

export const savings = [
  { title: 'PRSI patients', text: 'Exam, scale and polish for €15, once a year, if you are PRSI qualified.' },
  { title: 'Medical card welcome', text: 'We welcome all private, PRSI and medical card patients.' },
  { title: 'Emergencies', text: 'Emergency appointments are available. Call and we’ll see you as quickly as possible.' },
];

export const feeNote = 'Prices are a guide and may vary once we have seen your case. To book, or to ask about a treatment, call us on 01 454 7207.';

export const faqs = [
  { q: 'How do I book an appointment?', a: 'Call us on <a href="tel:+35314547207">01 454 7207</a> or email <a href="mailto:coredental23@gmail.com">coredental23@gmail.com</a>, and we’ll give you an appointment as quickly as possible.' },
  { q: 'I have a dental emergency. Can you see me?', a: 'Yes. We have a range of regular and emergency appointments available. Please call <a href="tel:+35314547207">01 454 7207</a>.' },
  { q: 'Do you accept PRSI and medical card patients?', a: 'Yes. We welcome all private, PRSI and medical card patients. If you are PRSI qualified, an exam, scale and polish is €15 once a year.' },
  { q: 'I get nervous at the dentist. Can you help?', a: 'We make sure even the most nervous patients feel at ease during their visit. Just let us know when you book.' },
  { q: 'Do you do root canal treatment?', a: 'Root canal treatment is usually referred to a specialist. Your dentist will talk you through it.' },
  { q: 'Where can I park?', a: 'Parking is available outside the practice, and there is free parking in Tyrconnell Park, across the road at the traffic lights.' },
];
