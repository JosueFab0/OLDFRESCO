export type TicketTier = {
  id: string;
  name: string;
  price: number;
  available: number;
  total: number;
  perks?: string[];
};

export type Concert = {
  id: string;
  slug: string;
  artist: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  description: string;
  image: string;
  coverImage: string;
  genre: string[];
  tiers: TicketTier[];
  featured: boolean;
  soldOut: boolean;
};

export type CartItem = {
  concertId: string;
  concertTitle: string;
  concertDate: string;
  venue: string;
  tierId: string;
  tierName: string;
  price: number;
  quantity: number;
};

export type Subscriber = {
  id: string;
  email: string;
  name: string;
  subscribedAt: string;
  plan: "free" | "vip";
};

export type GalleryPhoto = {
  id: string;
  alt: string;
  accent: string;
  aspect: "square" | "wide" | "tall";
};

export type GalleryVideo = {
  id: string;
  title: string;
  duration: string;
  thumbnail: string;
  youtubeId?: string;
};

export type GalleryAlbum = {
  id: string;
  slug: string;
  artist: string;
  eventTitle: string;
  date: string;
  venue: string;
  city: string;
  coverAccent: string;
  photos: GalleryPhoto[];
  videos: GalleryVideo[];
};

export type Sale = {
  id: string;
  orderNumber: string;
  customer: string;
  email: string;
  concertId: string;
  concertTitle: string;
  items: { tierName: string; quantity: number; price: number }[];
  total: number;
  date: string;
  status: "confirmed" | "pending" | "refunded";
};
