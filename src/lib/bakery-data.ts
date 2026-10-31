export interface BakeryInfo {
  name: string;
  tagline: string;
  heroHeadline: string;
  heroSubheadline: string;
  announcement: string;
  phone: string;
  email: string;
  address: string;
  hours: {
    days: string;
    time: string;
  }[];
  instagramUrl: string;
  storyPill: string;
  storyTitle: string;
  storyBody: string[];
  starterAgeYears: number;
  fermentationHours: number;
  flourSource: string;
}

export interface MenuItem {
  id: string;
  name: string;
  frenchName?: string;
  category: 'sourdough' | 'viennoiserie' | 'patisserie' | 'coffee';
  price: string;
  description: string;
  allergens: string[];
  isSignature?: boolean;
  isDailySpecial?: boolean;
  isSoldOut?: boolean;
  badge?: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'artisan-bread' | 'pastry' | 'craft' | 'space';
  image: string;
  description: string;
  aspect: 'square' | 'portrait' | 'landscape';
}

export interface StoryMilestone {
  step: string;
  title: string;
  timeframe: string;
  description: string;
  craftDetail: string;
}

export interface BakeryData {
  info: BakeryInfo;
  menu: MenuItem[];
  gallery: GalleryItem[];
  timeline: StoryMilestone[];
}

export const INITIAL_BAKERY_DATA: BakeryData = {
  info: {
    name: "Star Bakery",
    tagline: "Artisanal Heritage Sourdough & Hearth Bakery",
    heroHeadline: "Wild Fermentation. Golden Crumb. Pure Patience.",
    heroSubheadline: "Stoneground organic flours, an 18-year living starter, and 36-hour slow fermentation in the heart of the city.",
    announcement: "Daily bake fresh from oven at 07:00 AM • Croissants rest by 14:00",
    phone: "+1 (555) 234-8901",
    email: "bonjour@laurabakery.com",
    address: "482 Saint-Honoré Boulevard, Atelier District",
    hours: [
      { days: "Wednesday – Friday", time: "07:00 – 16:00" },
      { days: "Saturday – Sunday", time: "08:00 – 15:00" },
      { days: "Monday – Tuesday", time: "Baking & Fermentation (Closed)" },
    ],
    instagramUrl: "https://instagram.com/laurabakery",
    storyPill: "Founded 2012 • 18-Year Mother Culture",
    storyTitle: "Nothing rushed. Flour, water, sea salt, and time.",
    storyBody: [
      "We opened L'Aura with a single stone deck oven, sacks of organic heritage grains from regional millers, and our mother starter named Solange nurtured since 2006.",
      "Industrial baking replaced fermentation with chemical leaveners. We do the exact opposite. Every loaf undergoes a 36-hour cold autolyse and fermentation to develop complex lactic acidity, an open glossy crumb, and blistered caramelized crust that stays digestible and stays fresh for days."
    ],
    starterAgeYears: 18,
    fermentationHours: 36,
    flourSource: "100% Certified Organic Stoneground"
  },
  menu: [
    {
      id: "menu-1",
      name: "Heritage Country Boule",
      frenchName: "Pain de Campagne",
      category: "sourdough",
      price: "$10.50",
      description: "85% hydration country sourdough crafted with whole spelt, rye, and high-protein wheat. Deep roasted blistered crust with notes of dark honey and mild lactic tang.",
      allergens: ["Gluten"],
      isSignature: true,
      badge: "Signature Bake",
      image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "menu-2",
      name: "Toasted Sesame & Sea Salt Sourdough",
      frenchName: "Sourdough Sésame Grillé",
      category: "sourdough",
      price: "$11.00",
      description: "Rolled in white and black unhulled sesame seeds, crusting with a nutty toasted aroma as it bakes on direct stone.",
      allergens: ["Gluten", "Sesame"],
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "menu-3",
      name: "Rosemary Kalamata Olive Batard",
      frenchName: "Bâtard aux Olives et Romarin",
      category: "sourdough",
      price: "$12.00",
      description: "Studded with sun-cured Kalamata olives and fresh garden rosemary infused with cold-pressed olive oil.",
      allergens: ["Gluten"],
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "menu-4",
      name: "81-Layer Isigny Butter Croissant",
      frenchName: "Croissant Pur Beurre AOP",
      category: "viennoiserie",
      price: "$5.25",
      description: "Three-day lamination process using AOP Charentes-Poitou butter. Feather-light honeycomb interior with a golden, shatteringly crisp crust.",
      allergens: ["Gluten", "Dairy"],
      isSignature: true,
      badge: "Baker's Pride",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "menu-5",
      name: "Valrhona Pain au Chocolat",
      frenchName: "Chocolatine aux Deux Bâtons",
      category: "viennoiserie",
      price: "$6.00",
      description: "Folded with double batons of Valrhona 66% Caraïbe dark chocolate, balanced with flake sea salt.",
      allergens: ["Gluten", "Dairy", "Soy"],
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "menu-6",
      name: "Cardamom & Brown Sugar Morning Bun",
      frenchName: "Brioche Roulée à la Cardamome",
      category: "viennoiserie",
      price: "$6.50",
      description: "Croissant dough trimmings rolled in freshly crushed organic green cardamom, muscovado sugar, and citrus zest.",
      allergens: ["Gluten", "Dairy"],
      isDailySpecial: true,
      badge: "Limited Daily",
      image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "menu-7",
      name: "Burnt Basque Vanilla Cheesecake",
      frenchName: "Tarta de Queso Caramélisée",
      category: "patisserie",
      price: "$8.50",
      description: "Baked at high heat for a dark caramelized top and a silken, molten center infused with Madagascar bourbon vanilla bean.",
      allergens: ["Dairy", "Eggs"],
      isSignature: true,
      image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "menu-8",
      name: "Pistachio Raspberry Tartlet",
      frenchName: "Tartelette Pistache Framboise",
      category: "patisserie",
      price: "$9.00",
      description: "Crisp almond sable crust filled with roasted Sicilian pistachio frangipane, tart raspberry reduction, and fresh berries.",
      allergens: ["Gluten", "Dairy", "Nuts", "Eggs"],
      image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=1000&q=80"
    },
    {
      id: "menu-9",
      name: "Artisan Flat White & Cortado",
      frenchName: "Café de Spécialité",
      category: "coffee",
      price: "$4.75",
      description: "Single-origin Ethiopian Yirgacheffe espresso pulled with silky steamed whole milk or house-made oat milk.",
      allergens: ["Dairy (Optional)"],
      image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=1000&q=80"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Score & Bloom",
      category: "craft",
      description: "Razor lame scoring moments before loading onto 250°C stone decks.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=85",
      aspect: "portrait"
    },
    {
      id: "gal-2",
      title: "Morning Glow in the Atelier",
      category: "space",
      description: "Sunlight falling through frosted glass onto morning prep marble.",
      image: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&w=1200&q=85",
      aspect: "landscape"
    },
    {
      id: "gal-3",
      title: "Laminated Butter Sheets",
      category: "pastry",
      description: "Folding cold butter into dough for 81 crisp layers.",
      image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85",
      aspect: "square"
    },
    {
      id: "gal-4",
      title: "Open Crumb Structure",
      category: "artisan-bread",
      description: "Custardy crumb and wild aeration from 36-hour cold retard.",
      image: "https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=1200&q=85",
      aspect: "portrait"
    },
    {
      id: "gal-5",
      title: "Fresh Out of The Hearth",
      category: "artisan-bread",
      description: "The audible singing of crackling crusts as they cool on wooden racks.",
      image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=1200&q=85",
      aspect: "square"
    },
    {
      id: "gal-6",
      title: "Hand-Crafted Viennoiserie",
      category: "pastry",
      description: "Pain au chocolat dusted with powdered cacao nibs.",
      image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?auto=format&fit=crop&w=1200&q=85",
      aspect: "landscape"
    }
  ],
  timeline: [
    {
      step: "01",
      title: "Flour Selection & Autolyse",
      timeframe: "Hour 0 – 3",
      description: "Stoneground flours from heritage grain mills meet filtered spring water for enzymatic starch breakdown.",
      craftDetail: "Hydration calibrated precisely at 82%–85% according to ambient humidity."
    },
    {
      step: "02",
      title: "Inoculation & Fold Series",
      timeframe: "Hour 3 – 8",
      description: "Our 18-year wild starter Solange is folded into the dough every 45 minutes to build elastic gluten tension.",
      craftDetail: "No mechanical kneading; solely gentle coil folds by hand."
    },
    {
      step: "03",
      title: "Cold Fermentation",
      timeframe: "Hour 8 – 34",
      description: "Dough rests in spruce wood bannetons inside a 4°C retarder cellar for 26 continuous hours.",
      craftDetail: "Allows beneficial bacteria to synthesize deep aroma, lactic nuances, and natural shelf-life."
    },
    {
      step: "04",
      title: "Stone Hearth Baking",
      timeframe: "Hour 35 – 36",
      description: "Transferred onto screaming hot refractory stone with a blast of initial steam for maximum blister and oven spring.",
      craftDetail: "Baked at 245°C until deep dark golden caramelization is reached."
    }
  ]
};
