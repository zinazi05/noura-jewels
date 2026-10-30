export type JewelryCategory =
  | 'All Jewelry'
  | 'Necklaces & Pendants'
  | 'Earrings'
  | 'Bracelets'
  | 'Rings'
  | 'Traditional Sets'
  | 'Brooches & Fibulas';

export type JewelryMaterial =
  | 'Solid Silver (925)'
  | 'Gold Plated / Gilded'
  | 'Hand-Poured Enamel'
  | 'Coral & Semi-Precious'
  | 'Chiseled Copper'
  | 'Silver'
  | 'Gold'
  | 'Copper'
  | 'Coral & Stones'
  | 'Enamel'
  | 'Mixed Materials';

export type JewelryOccasion =
  | 'Everyday / Casual'
  | 'Wedding & Bridal'
  | 'Traditional Celebrations'
  | 'Meaningful Gifts'
  | 'Engagement'
  | 'Gifts';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

export type AvailabilityStatus = 'Available' | 'Made to Order' | 'Out of Stock';

export type ActivePage =
  | 'home'
  | 'shop'
  | 'product'
  | 'bag'
  | 'checkout'
  | 'confirmation'
  | 'story'
  | 'contact';

export interface JewelryProduct {
  id: string;
  name: string;
  region: string;
  provenanceLabel?: string;
  craftTag?: string;
  category: Exclude<JewelryCategory, 'All Jewelry'>;
  priceDZD: number;
  badge?: 'HERITAGE' | 'NEW' | 'LIMITED';
  materials: JewelryMaterial[];
  verifiedMaterialSummary: string;
  occasions: JewelryOccasion[];
  availability: AvailabilityStatus;
  shortDescription: string;
  fullDescription: string;
  dimensions: string;
  weight: string;
  careInstructions: string;
  deliveryInfo: string;
  primaryImage: string;
  secondaryImage: string;
  galleryImages: {
    url: string;
    caption: string;
  }[];
  options?: {
    label: string;
    choices: string[];
  };
  featuredOrder?: number;
  isNewArrival?: boolean;
}

export interface BagItem {
  productId: string;
  selectedOption?: string;
  quantity: number;
}

export interface ShopFilterState {
  category: JewelryCategory;
  materials: JewelryMaterial[];
  occasions: JewelryOccasion[];
  minPrice: string;
  maxPrice: string;
  searchQuery: string;
  sortBy: SortOption;
}

export interface CheckoutFormData {
  fullName: string;
  phone: string;
  email: string;
  wilayaCode: string;
  commune: string;
  streetAddress: string;
  deliveryNotes: string;
  deliveryMethod: 'home_delivery' | 'atelier_pickup';
  paymentMethod: 'cod' | 'baridimob_ccp';
}

export interface OrderReceipt {
  referenceId: string;
  submittedAt: string;
  customer: CheckoutFormData;
  items: {
    product: JewelryProduct;
    selectedOption?: string;
    quantity: number;
    lineTotalDZD: number;
  }[];
  subtotalDZD: number;
  deliveryFeeDZD: number;
  totalDZD: number;
  orderNote?: string;
}
