export const defaultHomepageContent = {
  siteSettings: {
    brandName: "STITCH",
    navLinks: [
      { label: "Home", href: "#hero", sortOrder: 1 },
      { label: "Story", href: "#story", sortOrder: 2 },
      { label: "Portfolio", href: "#portfolio", sortOrder: 3 },
      { label: "Services", href: "#services", sortOrder: 4 },
      { label: "Contact", href: "#contact", sortOrder: 5 }
    ],
    socialLinks: [
      { label: "INSTAGRAM", href: "#" },
      { label: "TWITTER", href: "#" },
      { label: "FACEBOOK", href: "#" },
      { label: "VIMEO", href: "#" }
    ],
    seo: {
      title: "STITCH Photography",
      description: "Editorial photography portfolio and premium visual storytelling."
    }
  },
  hero: {
    heading: "Capturing Timeless Moments",
    subheading: "",
    images: [
      { url: "/assets/hero_bg_1777618052927.png", publicId: "", alt: "Hero image 1" },
      { url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80", publicId: "", alt: "Hero image 2" },
      { url: "/assets/portfolio_wedding_1777618132221.png", publicId: "", alt: "Hero image 3" },
      { url: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1920&q=80", publicId: "", alt: "Hero image 4" },
      { url: "/assets/portfolio_commercial_1777618337873.png", publicId: "", alt: "Hero image 5" }
    ]
  },
  featuredGallery: {
    title: "Gallery",
    ctaLabel: "Book a Session",
    ctaHref: "#contact",
    cards: {
      lead: {
        image: { url: "/assets/portfolio_wedding_1777618132221.png", publicId: "", alt: "Wedding" },
        title: "Eternal\nWedding Stories"
      },
      stat: {
        image: { url: "/assets/portrait_2.png", publicId: "", alt: "Portrait background" },
        stat: "100+",
        text: "Weddings captured with elegance and grace."
      },
      wide: {
        image: { url: "/assets/portfolio_party_1777618183108.png", publicId: "", alt: "Party" },
        title: "Vibrant Party & Event Coverage"
      },
      cta: {
        image: { url: "/assets/Gemini_Generated_Image_ls2h9dls2h9dls2h.png", publicId: "", alt: "CTA" }
      },
      tall: {
        image: { url: "/assets/portrait_1.png", publicId: "", alt: "Baby" },
        title: "Newborn\nWonders"
      },
      short: {
        image: { url: "/assets/portfolio_birthday_1777618252010.png", publicId: "", alt: "Birthday" },
        title: "Birthday\nMilestones"
      },
      family: {
        image: { url: "/assets/portrait_8.png", publicId: "", alt: "Family" },
        accentTitle: "ONE",
        lineOne: "family,",
        lineTwo: "Memory",
        lineThree: "Book"
      }
    }
  },
  story: {
    eyebrow: "The Artist",
    title: "The Story Behind the Lens",
    paragraphs: [
      "With over a decade of experience in visual storytelling, Elias focuses on the quiet moments that often go unnoticed. His work is a reflection of his belief that photography should not just document, but evoke a visceral emotional response.",
      "Based in London, available worldwide for those who seek an editorial approach to their most cherished memories. Every click is a chapter in a larger story, meticulously crafted to stand the test of time."
    ],
    image: { url: "/assets/photographer_portrait_1777618104247.png", publicId: "", alt: "Elias Thorne" }
  },
  portfolioSection: {
    title: "Selected Works",
    intro: "A curated collection of human connection and light across the globe.",
    loadMoreLabel: "Load More",
    initialVisibleCount: 8,
    loadMoreStep: 8,
    filters: [
      { value: "all", label: "All", sortOrder: 1 },
      { value: "wedding", label: "Wedding", sortOrder: 2 },
      { value: "party", label: "Party", sortOrder: 3 },
      { value: "birthday", label: "Birthday", sortOrder: 4 },
      { value: "baby", label: "Baby", sortOrder: 5 },
      { value: "pre-wedding", label: "Pre-Wedding", sortOrder: 6 },
      { value: "commercial", label: "Commercial", sortOrder: 7 }
    ]
  },
  servicesSection: {
    subtitle: "Curated Experiences",
    title: "Our Services"
  },
  speciality: {
    title: "Our Speciality",
    description: "We specialize in \"Quiet Luxury\" photography, where every image feels effortless yet deeply intentional. Our technical mastery combined with an artistic soul allows us to capture what others miss.",
    bullets: [
      "Low Light Mastery & Atmospheric Shots",
      "Cinematic Drone Cinematography",
      "35mm Analog Film Photography"
    ],
    image: { url: "/assets/portfolio_commercial_1777618337873.png", publicId: "", alt: "Speciality" }
  },
  contact: {
    subtitle: "Connect With Us",
    title: "Let's create something \nextraordinary together.",
    body: "Whether you're planning a wedding, a commercial shoot, or a private event, we're here to capture the essence of your story.",
    submitLabel: "Send Inquiry",
    successMessage: "Thank you for your inquiry. Elias will get back to you shortly.",
    details: [
      { label: "Email", value: "hello@elias-photography.com", href: "mailto:hello@elias-photography.com" },
      { label: "Phone", value: "+1 (555) 123-4567", href: "tel:+15551234567" },
      { label: "Studio", value: "123 Arts District\nNew York, NY 10013", href: "" },
      { label: "Follow", value: "@elias_frames", href: "" }
    ]
  },
  footer: {
    logoText: "STITCH",
    copyrightText: "© 2024 STITCH PHOTOGRAPHY. ALL RIGHTS RESERVED."
  }
};

export const defaultPortfolioItems = [
  { category: "wedding", image: { url: "/assets/portfolio_wedding_1777618132221.png", publicId: "", alt: "The Ethereal Union" }, title: "The Ethereal Union", subtitle: "Wedding Series • Paris", sortOrder: 1, published: true },
  { category: "party", image: { url: "/assets/portfolio_party_1777618183108.png", publicId: "", alt: "Nocturnal Vibes" }, title: "Nocturnal Vibes", subtitle: "Event • New York", sortOrder: 2, published: true },
  { category: "birthday", image: { url: "/assets/portfolio_birthday_1777618252010.png", publicId: "", alt: "Golden Years" }, title: "Golden Years", subtitle: "Celebration • Rome", sortOrder: 3, published: true },
  { category: "commercial", image: { url: "/assets/portfolio_commercial_1777618337873.png", publicId: "", alt: "Urban Reverie" }, title: "Urban Reverie", subtitle: "Editorial • Tokyo", sortOrder: 4, published: true },
  { category: "wedding", image: { url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Serene Vows" }, title: "Serene Vows", subtitle: "Wedding Series • Tuscany", sortOrder: 5, published: true },
  { category: "party", image: { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Electric Night" }, title: "Electric Night", subtitle: "Celebration • Berlin", sortOrder: 6, published: true },
  { category: "birthday", image: { url: "https://images.unsplash.com/photo-1464349172961-1fee4652028a?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Candlelight Glow" }, title: "Candlelight Glow", subtitle: "Private Event • London", sortOrder: 7, published: true },
  { category: "commercial", image: { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Structured Grace" }, title: "Structured Grace", subtitle: "Architecture • Dubai", sortOrder: 8, published: true },
  { category: "wedding", image: { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Floral Elegance" }, title: "Floral Elegance", subtitle: "Garden Wedding • Kyoto", sortOrder: 9, published: true },
  { category: "wedding", image: { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "The Quiet Vow" }, title: "The Quiet Vow", subtitle: "Portrait Series", sortOrder: 10, published: true },
  { category: "party", image: { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Neon Pulse" }, title: "Neon Pulse", subtitle: "Afterhours • Ibiza", sortOrder: 11, published: true },
  { category: "commercial", image: { url: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Silent Peak" }, title: "Silent Peak", subtitle: "Nature Editorial", sortOrder: 12, published: true },
  { category: "baby", image: { url: "https://images.unsplash.com/photo-1519689689378-073f13d31c63?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Pure Innocence" }, title: "Pure Innocence", subtitle: "Newborn Series • Paris", sortOrder: 13, published: true },
  { category: "pre-wedding", image: { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Eternal Promise" }, title: "Eternal Promise", subtitle: "Pre-Wedding • Venice", sortOrder: 14, published: true },
  { category: "baby", image: { url: "https://images.unsplash.com/photo-1544126592-807daa2b5282?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Gentle Dreams" }, title: "Gentle Dreams", subtitle: "Portrait • London", sortOrder: 15, published: true },
  { category: "pre-wedding", image: { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80", publicId: "", alt: "Golden Hour Vows" }, title: "Golden Hour Vows", subtitle: "Sunset Session • Bali", sortOrder: 16, published: true }
];

export const defaultServiceItems = [
  {
    name: "Wedding",
    desc: "Editorial Stories",
    subtitle: "Cinematic vows and timeless storytelling",
    longDescription: "Our wedding coverage blends editorial direction with documentary honesty. We shape elegant portraits, preserve the atmosphere of the day, and capture fleeting emotional details so your full celebration feels immersive long after the event is over.",
    color: "linear-gradient(135deg, #e52d4c, #b60a2b)",
    panelColor: "linear-gradient(135deg, #b62543 0%, #86182f 100%)",
    image: { url: "/assets/tanrica-ai-generated-9519468.png", publicId: "", alt: "Wedding" },
    sortOrder: 1,
    published: true
  },
  {
    name: "Birthday",
    desc: "Special Milestones",
    subtitle: "Joyful celebrations with a polished finish",
    longDescription: "Birthday sessions are designed to feel vibrant, personal, and effortless. From styled portraits to candid interactions, we create a visual record that highlights the energy of the celebration while still feeling refined and beautifully composed.",
    color: "linear-gradient(135deg, #185aab, #0f3669)",
    panelColor: "linear-gradient(135deg, #1b65c2 0%, #134791 100%)",
    image: { url: "/assets/semja-ai-generated-7840987.png", publicId: "", alt: "Birthday" },
    sortOrder: 2,
    published: true
  },
  {
    name: "Commercial",
    desc: "Office Celebrations",
    subtitle: "Brand-focused imagery with human presence",
    longDescription: "Our commercial photography is built for brands that want clarity, polish, and emotion in the same frame. We combine purposeful art direction with clean production to deliver visuals that strengthen campaigns, websites, launches, and internal storytelling.",
    color: "linear-gradient(135deg, #408140, #225122)",
    panelColor: "linear-gradient(135deg, #4a9950 0%, #2b6d33 100%)",
    image: { url: "/assets/lucianavieira-businessman-6718509.png", publicId: "", alt: "Commercial" },
    sortOrder: 3,
    published: true
  },
  {
    name: "Baby",
    desc: "New Beginnings",
    subtitle: "Soft, intimate moments for growing families",
    longDescription: "Baby sessions focus on tenderness, comfort, and natural connection. We use a calm pace and gentle styling to create images that feel warm and expressive, preserving the quiet beauty of early family memories without making the experience feel forced.",
    color: "linear-gradient(135deg, #202b4d, #11172a)",
    panelColor: "linear-gradient(135deg, #324678 0%, #1a2544 100%)",
    image: { url: "/assets/thehappygraphics-fairy-8065764.png", publicId: "", alt: "Baby" },
    sortOrder: 4,
    published: true
  }
];

export const defaultParallaxBlocks = [
  { image: { url: "/assets/portfolio_wedding_1777618132221.png", publicId: "", alt: "The Art of Connection" }, subtitle: "The Art of Connection", title: "Timeless Narratives", variant: "1", sortOrder: 1, published: true },
  { image: { url: "/assets/portfolio_party_1777618183108.png", publicId: "", alt: "Light & Shadow" }, subtitle: "Light & Shadow", title: "Organic Frames", variant: "2", sortOrder: 2, published: true },
  { image: { url: "/assets/portfolio_commercial_1777618337873.png", publicId: "", alt: "Aesthetic Excellence" }, subtitle: "Aesthetic Excellence", title: "Visual Mastery", variant: "3", sortOrder: 3, published: true },
  { image: { url: "/assets/portfolio_birthday_1777618252010.png", publicId: "", alt: "Precision & Soul" }, subtitle: "Precision & Soul", title: "Technical Artistry", variant: "4", sortOrder: 4, published: true },
  { image: { url: "/assets/hero_bg_1777618052927.png", publicId: "", alt: "Eternal Moments" }, subtitle: "Eternal Moments", title: "The Final Chapter", variant: "5", sortOrder: 5, published: true }
];
