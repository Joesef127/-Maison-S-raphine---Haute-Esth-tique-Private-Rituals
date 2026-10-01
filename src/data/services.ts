import { ServiceItem, AddOnItem } from '../types';

export const SERVICES: ServiceItem[] = [
  // NAILS
  {
    id: 'nail-japanese-gel',
    name: 'Japanese Gel Architectonic Sculpting',
    tagline: 'Non-toxic, ultra-durable precision overlay tailored to your natural nail apex',
    category: 'nails',
    categoryLabel: 'Couture Nails',
    price: 155,
    duration: 75,
    description: 'A bespoke Japanese soak-off gel method designed to fortify the natural nail plate without dehydration or excessive filing. Includes precision e-file dry cuticle curation, anatomical apex sculpting, and high-gloss mineral finish.',
    included: [
      'Comprehensive dry cuticle couture curation',
      'Plate balance & structural apex architecture',
      'Organic Japanese mineral gel base & reinforcement',
      'Dual-cured glass luster topcoat',
      'Warm botanical camellia oil massage'
    ],
    preparation: 'Arrive with clean, bare nails if possible. Avoid submerging hands in hot water 2 hours prior to service.',
    aftercare: 'Apply organic cuticle nectar nightly. Wear gloves when using active household detergents.',
    popular: true,
    signature: true,
    accentNote: 'Natural apex reinforcement · 4+ weeks retention',
    audioGuideScript: 'Welcome to your Japanese Gel Sculpting overview at Maison Séraphine. Our master artisans focus on structural harmony, preserving the biological integrity of your nail plate while constructing a resilient, featherlight apex designed to endure over four weeks.',
    artStyle: 'nails'
  },
  {
    id: 'nail-cashmere-chrome',
    name: 'Cashmere Velvet Chrome & Micro-Leaf Art',
    tagline: 'Editorial minimalist metallic glazing with hand-applied 24k gold leaf accents',
    category: 'nails',
    categoryLabel: 'Couture Nails',
    price: 185,
    duration: 90,
    description: 'An elevated artistic manifestation for lovers of quiet luxury. Hand-burnished cashmere chrome pigments combined with micro-fine Japanese line work or authentic 24-karat gold leaf inlays.',
    included: [
      'Full dry e-file Russian cuticle treatment',
      'Structural BIAB or Japanese Gel foundation',
      'Triple-sifted silk chrome burnishing',
      'Hand-painted bespoke micro-geometric art or gold leaf',
      'Cold-pressed marula hand & forearm hydration'
    ],
    preparation: 'Browse our seasonal lookbook or bring inspirational moodboards.',
    aftercare: 'Protect tips from direct abrasive friction and keep moisturized.',
    popular: false,
    signature: false,
    accentNote: 'Bespoke hand-painted details · 24K inlays',
    audioGuideScript: 'The Cashmere Velvet Chrome ritual is an editorial homage to tactile surfaces. Each nail is treated as a miniature canvas with micro-fine burnished powders and pure gold leaf.',
    artStyle: 'nails'
  },
  {
    id: 'nail-russian-manicure',
    name: 'The Obsidian Russian Precision Manicure',
    tagline: 'Deep medical-grade cuticle architecture with zero water soaking',
    category: 'nails',
    categoryLabel: 'Couture Nails',
    price: 135,
    duration: 60,
    description: 'A meticulous dry-hardware methodology utilizing diamond-coated bits to achieve impeccable, seamless eponychium contouring. Allows gel lacquer to be applied under the proximal fold for 2 extra weeks of visible growth-free elegance.',
    included: [
      'Five-stage surgical diamond bit e-file protocol',
      'Ultra-deep proximal fold refinement',
      'Natural nail shaping & contour balancing',
      'Fortifying keratin barrier treatment',
      'Ultrasonic hot towel compress'
    ],
    preparation: 'Please do not clip or aggressively trim cuticles for at least 7 days prior.',
    aftercare: 'Do not pick at the periungual area; massage nourishing balm daily.',
    popular: false,
    signature: true,
    accentNote: 'Deep seamless margin · Ultra-refined line',
    audioGuideScript: 'Our Obsidian Russian Precision Manicure provides unmatched precision through diamond-grit hardware, delivering the cleanest nail contour in modern cosmetology.',
    artStyle: 'nails'
  },

  // LASHES
  {
    id: 'lash-cashmere-featherweight',
    name: 'Cashmere Featherweight Lash Architecture',
    tagline: 'Weightless, airy extensions customized to your orbital bone structure',
    category: 'lashes',
    categoryLabel: 'Bespoke Lashes',
    price: 220,
    duration: 90,
    description: 'Crafted with premium matte cashmere fibers that weigh 70% less than standard synthetic lashes. Our certified master lash artists map diameter, curl, and length to complement your natural lash health and eye aperture.',
    included: [
      'Orbital symmetry consultation & bespoke lash mapping',
      'Gentle peptide eye prep & foaming cleansing ritual',
      'Full set application of 0.05mm cashmere fibers',
      'Nano-mist cyanoacrylate seal for immediate cure',
      'Maison Séraphine bespoke spoolie & cleanse kit'
    ],
    preparation: 'Arrive free of all eye makeup, mascara, and oil-based serums. Discontinue waterproof mascara 48h prior.',
    aftercare: 'Brush gently each morning. Cleanse daily with our oil-free foaming lash wash.',
    popular: true,
    signature: true,
    accentNote: 'Featherlight 0.05mm cashmere · Zero lash strain',
    audioGuideScript: 'Welcome to your Cashmere Featherweight Lash journey. We apply specialized ultra-fine fibers individually matched to the angle and curvature of your natural lash line, granting a soft, whisper-light flutter.',
    artStyle: 'lashes'
  },
  {
    id: 'lash-wet-look-volume',
    name: 'Bespoke Wispy Wet-Look & Kim K Spikes',
    tagline: 'Glossy, textured bundles creating an effortless editorial mascara aesthetic',
    category: 'lashes',
    categoryLabel: 'Bespoke Lashes',
    price: 260,
    duration: 105,
    description: 'An artful combination of closed volume fans and strategic spike extensions that mimics the luminous, clustered texture of freshly conditioned lashes. Delivers striking depth and high-fashion definition.',
    included: [
      'In-depth style analysis & eye-shape blueprint',
      'Application of textured closed-fan spikes and wisps',
      'Soothing de-puffing collagen under-eye hydrogels',
      'Hypoallergenic medical adhesive pairing',
      'Finishing thermal bond reinforcement'
    ],
    preparation: 'Remove contact lenses prior to service. Avoid caffeine 3 hours before to prevent eyelid twitching.',
    aftercare: 'Avoid heavy steam or hot saunas for 24 hours. Sleep on a silk or satin pillowcase.',
    popular: false,
    signature: false,
    accentNote: 'Editorial textured spikes · Dimensional luster',
    audioGuideScript: 'The Wispy Wet-Look set is designed for clients seeking depth and editorial magnetism. By utilizing closed fan bundles, we establish an effortlessly dewy, structured allure.',
    artStyle: 'lashes'
  },
  {
    id: 'lash-keratin-glaze',
    name: 'Silk Keratin Infusion Lash Lift & Glaze',
    tagline: 'Natural lift, deep midnight tint, and plant-collagen hydration',
    category: 'lashes',
    categoryLabel: 'Bespoke Lashes',
    price: 140,
    duration: 60,
    description: 'An organic alternative to extensions that curls and lengthens your own natural lashes from the root. Infused with vegan keratin peptides and blue-black botanical pigments to deliver 6-8 weeks of dramatic natural allure.',
    included: [
      'Silicone rod selection based on eye curvature',
      'Gentle plant-derived perm solution & neutralizer',
      'Deep midnight black-blue tint infusion',
      'Silk protein & panthenol moisture glaze',
      'Take-home nourishing lash essence sample'
    ],
    preparation: 'Discontinue lash growth serums 48 hours beforehand. Remove contact lenses.',
    aftercare: 'Keep lashes dry and steam-free for 24 hours. Brush gently upward.',
    popular: false,
    signature: false,
    accentNote: 'Natural lash lift · 6-8 weeks lasting curve',
    audioGuideScript: 'Our Silk Keratin Lash Lift celebrates your natural beauty. We reshape and tint your existing lashes from base to tip, infusing concentrated peptide proteins to maintain flexibility.',
    artStyle: 'lashes'
  },

  // BROWS
  {
    id: 'brow-micro-sculpting',
    name: 'Architectural Micro-Sculpting & Hybrid Stain',
    tagline: 'Precision razor contour, thread balance, and botanical dye lasting up to 7 weeks',
    category: 'brows',
    categoryLabel: 'Sculpted Brows',
    price: 125,
    duration: 50,
    description: 'A transformative brow ritual combining golden-ratio facial mapping, bespoke organic threading, tweezing, and our high-definition hybrid tint that stains both skin and hair for structured, immaculate arches.',
    included: [
      'Golden Ratio anatomical brow mapping',
      'Organic cotton thread shaping & razor detail',
      'Custom-blended hybrid tint shade matching',
      'Hydrating soothing chamomile compress',
      'Highbrow styling gel finish'
    ],
    preparation: 'Avoid brow exfoliating acids, retinoids, or self-tanners for 5 days before treatment.',
    aftercare: 'Do not wash or apply active skin products to the brow area for the first 24 hours.',
    popular: true,
    signature: true,
    accentNote: 'Golden ratio mapping · 7-week skin & hair stain',
    audioGuideScript: 'At Maison Séraphine, brow sculpting is a structural discipline. We harmonize the arch with your cheekbone cadence, utilizing gentle threading and bespoke hybrid pigments.',
    artStyle: 'brows'
  },
  {
    id: 'brow-lamination-ritual',
    name: 'Atelier Keratin Brow Lamination & Tint',
    tagline: 'Feathery, full, and brushed-up fullness with nourishing ceramides',
    category: 'brows',
    categoryLabel: 'Sculpted Brows',
    price: 145,
    duration: 60,
    description: 'Realigns the direction of brow hair growth to create an expansive, fluffy runway aesthetic. Nourished with ceramides and argan oil to ensure fibers remain soft, supple, and easily stylable.',
    included: [
      'Gentle keratin smoothing & directional resetting',
      'Custom arch grooming & trimming',
      'Subtle tone-on-tone tint enrichment',
      'Bond-building ceramide treatment',
      'Styling spoolie and setting wax'
    ],
    preparation: 'Grow brows out for at least 3 weeks prior. Avoid chemical peels 2 weeks prior.',
    aftercare: 'Keep brows dry and untouched for 24 hours. Brush upward with nourishing oil each morning.',
    popular: false,
    signature: false,
    accentNote: 'Fluffy editorial volume · Ceramide enrichment',
    audioGuideScript: 'Brow lamination relaxes stubborn hair bonds, allowing us to reposition each strand into a feathery, uniform silhouette that adds instant lift to the upper face.',
    artStyle: 'brows'
  },

  // SKINCARE & FACIALS
  {
    id: 'skin-buccal-sculpting',
    name: 'Sculpting French Buccal & Lymphatic Ritual',
    tagline: 'Intra-oral deep muscle release, fascial contouring, and non-surgical face lift',
    category: 'skincare',
    categoryLabel: 'Cellular Skincare',
    price: 320,
    duration: 90,
    description: 'Our world-renowned sculptural facial. Incorporates external myofascial release followed by sterile intra-oral (inside the mouth) massage to release chronic tension in the masseter, lift cheekbones, and drain lymphatic blockages.',
    included: [
      'Double enzymatic oil & milky cleanse',
      'Lymphatic neck & clavicle opening strokes',
      'Intra-oral buccal muscular tension release',
      'Gua sha cold obsidian stone contouring',
      'Custom peptide biocellulose sheet mask'
    ],
    preparation: 'Ensure you have not received facial neurotoxins or dermal fillers in the past 4 weeks.',
    aftercare: 'Drink plenty of water to assist lymphatic drainage. Avoid intense physical workouts on the same evening.',
    popular: true,
    signature: true,
    accentNote: 'Intra-oral myofascial contour · Immediate cheekbone lift',
    audioGuideScript: 'The French Buccal and Lymphatic Ritual works from within. By releasing deep tension along the jawline and masseter muscles, facial contours are lifted and cellular drainage is stimulated.',
    artStyle: 'skincare'
  },
  {
    id: 'skin-cellular-cryo',
    name: 'Cellular Cryo-Glow Oxygen Renewal',
    tagline: 'Sub-zero thermal shock therapy, hyperbaric oxygen, and hyaluronic infusion',
    category: 'skincare',
    categoryLabel: 'Cellular Skincare',
    price: 275,
    duration: 75,
    description: 'Harnesses controlled sub-zero cryotherapy to constrict capillaries, flush out stagnant toxins, and spark collagen synthesis. Followed by a stream of 98% pure pressurized oxygen delivering low-molecular hyaluronic acid.',
    included: [
      'Ultrasonic pore deep-cleansing exfoliation',
      'Medical-grade Cryo-Glow precision wand treatment',
      'Hyperbaric oxygen hyaluronic serum infusion',
      'Blue & red phototherapy LED canopy',
      'Cold quartz eye contour compress'
    ],
    preparation: 'Suitable for all skin types, including sensitive and rosacea-prone skin.',
    aftercare: 'Enjoy instant radiant glass skin with zero downtime. Maintain with high-factor SPF.',
    popular: false,
    signature: false,
    accentNote: 'Sub-zero thermal shock · 98% pure oxygen infusion',
    audioGuideScript: 'Our Cellular Cryo-Glow treatment revitalizes fatigued skin through extreme cold therapy followed by medical oxygen infusion, generating instant luminescence.',
    artStyle: 'skincare'
  },
  {
    id: 'skin-24k-gold-collagen',
    name: '24K Pure Aurum Imperial Collagen Infusion',
    tagline: 'Pure 24k gold leaf sheets, micro-current lifting, and caviar essence',
    category: 'skincare',
    categoryLabel: 'Cellular Skincare',
    price: 380,
    duration: 90,
    description: 'The pinnacle of regal beauty. Authentic 24-karat gold leaf sheets are massaged directly into the dermis using low-frequency micro-current and caviar peptides, accelerating cell regeneration and defending against glycation.',
    included: [
      'Gold enzyme radiance peel',
      'Targeted micro-current muscular stimulation',
      'Full facial application of 24k pure gold leaf',
      'Sonic peptide infusion and jade roller massage',
      'Caviar and white truffle replenishing cream'
    ],
    preparation: 'No retinol use for 48 hours prior. Ideal 24-48 hours before high-profile events.',
    aftercare: 'Let the gold nanoparticles work overnight without washing. Wake up to gilded radiance.',
    popular: false,
    signature: true,
    accentNote: 'Pure 24K gold sheets · Micro-current sculpting',
    audioGuideScript: 'The Imperial 24K Gold Collagen Infusion represents the zenith of our skincare rituals. Pure gold ions bind with marine collagen to restore elasticity and unmatched luminescence.',
    artStyle: 'skincare'
  },

  // MAKEUP & ARTISTRY
  {
    id: 'makeup-haute-editorial',
    name: 'Haute Couture Occasion & Red Carpet Glow',
    tagline: 'Bespoke complexion tailoring, subtle sculpting, and camera-ready permanence',
    category: 'makeup',
    categoryLabel: 'Artistry & Makeup',
    price: 240,
    duration: 75,
    description: 'Designed for galas, red-carpet appearances, or milestone celebrations. Our artists specialize in second-skin complexion work that looks breathtaking in both harsh daylight and 4K digital flash photography.',
    included: [
      'Cellular skin prep with cryo-rollers and primers',
      'Airbrush or hand-buffed custom foundation match',
      'Bespoke eye design & individual feather lash placement',
      'Waterproof lip contouring & transfer-resistant setting',
      'Atelier touch-up pouch with mini lip glaze & blotting papers'
    ],
    preparation: 'Arrive with freshly washed face and unstyled hair pinned back if having hair done elsewhere.',
    aftercare: 'Remove with our recommended double-cleansing botanical balm.',
    popular: true,
    signature: true,
    accentNote: '4K flash camera calibrated · Touch-up kit included',
    audioGuideScript: 'For your red carpet or gala appearance, our makeup artists compose a second-skin veil that catches the light naturally while maintaining endurance through the evening.',
    artStyle: 'makeup'
  },
  {
    id: 'makeup-bridal-masterpiece',
    name: 'Atelier Bridal Masterpiece & Rehearsal',
    tagline: 'Two-session bridal prestige consultation, preview trial, and wedding day artistry',
    category: 'makeup',
    categoryLabel: 'Artistry & Makeup',
    price: 520,
    duration: 150,
    description: 'The complete bridal aesthetic journey. Includes a dedicated 75-minute trial consultation to test veil pairings, lighting variations, and skincare rituals, followed by full VIP wedding morning application at the atelier or suite.',
    included: [
      'Comprehensive 75-minute bridal trial session',
      'Color harmonization with dress, floral, and lighting plan',
      'Wedding morning deluxe cellular radiance prep',
      'Complete long-wear artistry and individual silk lashes',
      'Full-size luxury touch-up lipstick and setting spray'
    ],
    preparation: 'Bring photos of your bridal gown, jewelry, hairstyle concepts, and floral palette.',
    aftercare: 'Enjoy flawless, tear-resistant elegance from the first photograph through the final waltz.',
    popular: false,
    signature: true,
    accentNote: 'Includes full trial session + wedding day luxury kit',
    audioGuideScript: 'Your wedding day demands tranquil perfection. Our Bridal Masterpiece includes extensive trial harmonizations so you step into your celebration completely composed and radiant.',
    artStyle: 'makeup'
  },

  // SIGNATURE PACKAGES
  {
    id: 'pkg-grand-soiree',
    name: 'The Grand Soirée Comprehensive Ritual',
    tagline: 'Four hours of private atelier sanctuary: Nails, Lashes, Facial, and Makeup',
    category: 'packages',
    categoryLabel: 'Signature Packages',
    price: 580,
    duration: 210,
    description: 'Our most sought-after indulgence. Enjoy private suite seclusion while two artisans simultaneously tend to your nails and lashes, followed by a customized sculpting facial and red-carpet makeup styling.',
    included: [
      'Private sanctuary suite with organic tea & champagne service',
      'Japanese Gel Architectonic Sculpting',
      'Cashmere Featherweight Full Lash Set',
      'French Buccal or Cryo-Glow Radiance Facial',
      'Editorial Occasion Makeup & Luxury Gift Suite'
    ],
    preparation: 'Clear your afternoon for total relaxation. Complimentary valet and refreshments provided.',
    aftercare: 'Detailed personalized homecare regimen provided by Master Director.',
    popular: true,
    signature: true,
    accentNote: 'Four-hour private sanctuary · Dual-artisan simultaneous service',
    audioGuideScript: 'The Grand Soirée Ritual is our signature full-spectrum transformation. Relax in your private sanctuary suite while our masters harmonize your nails, lashes, skin, and makeup in seamless unity.',
    artStyle: 'package'
  },
  {
    id: 'pkg-monolith-radiance',
    name: 'The Monolith Radiance Quick Refresh',
    tagline: 'Streamlined 2.5-hour overhaul: Russian Manicure, Hybrid Brows, and Cryo Glow',
    category: 'packages',
    categoryLabel: 'Signature Packages',
    price: 440,
    duration: 150,
    description: 'The essential executive and jet-set recharge. In two and a half hours, refresh your natural architectural foundation with immaculate Russian nails, Golden Ratio brows, and sub-zero Cryo skin renewal.',
    included: [
      'Obsidian Russian Precision Manicure',
      'Architectural Micro-Sculpting & Hybrid Brow Stain',
      'Cellular Cryo-Glow Oxygen Express Facial',
      'Head, neck, and hand acupressure tension release'
    ],
    preparation: 'Ideal for pre-travel or before a high-stakes week.',
    aftercare: 'High-protection antioxidant serum recommended daily.',
    popular: false,
    signature: false,
    accentNote: 'Complete beauty reset in 150 minutes',
    audioGuideScript: 'Designed for the modern schedule, The Monolith Radiance delivers our three foundational services in a synchronized two-and-a-half-hour appointment.',
    artStyle: 'package'
  }
];

export const ADD_ONS: AddOnItem[] = [
  {
    id: 'addon-led-light',
    name: 'Medical-Grade LED Phototherapy Canopy',
    price: 45,
    duration: 20,
    description: 'Near-infrared & red LED light waves that stimulate adenosine triphosphate (ATP) for accelerated cellular collagen synthesis.',
    applicableCategories: ['skincare', 'packages', 'makeup']
  },
  {
    id: 'addon-collagen-hand-wrap',
    name: 'Warm Cashmere & Peptide Hand Infusion',
    price: 35,
    duration: 15,
    description: 'Heated bio-cellulose gloves loaded with shea, squalane, and multi-weight ceramides worn while you rest.',
    applicableCategories: ['nails', 'lashes', 'skincare', 'packages']
  },
  {
    id: 'addon-cryo-eye-de-puff',
    name: 'Sub-Zero Cryo Roller Eye Drainage',
    price: 40,
    duration: 15,
    description: 'Targeted cooling therapy around the periorbital zone to instantly dispel dark circles and fluid congestion.',
    applicableCategories: ['skincare', 'lashes', 'brows', 'makeup']
  },
  {
    id: 'addon-gold-leaf-nail',
    name: '24K Solid Gold Leaf Accent Inlay (2 Nails)',
    price: 30,
    duration: 10,
    description: 'Genuine beaten 24k gold leaf inlays encapsulated beneath high-luster Japanese builder gel.',
    applicableCategories: ['nails']
  },
  {
    id: 'addon-bottom-lash-tint',
    name: 'Midnight Bottom Lash Tint & Conditioning',
    price: 25,
    duration: 15,
    description: 'Defines delicate lower lashes with rich blue-black vegetable stain and keratin glaze.',
    applicableCategories: ['lashes', 'brows']
  }
];
