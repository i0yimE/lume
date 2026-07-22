export type StyleTag = "minimalista" | "statement" | "clasico" | "contemporaneo";

export type Category = "anillos" | "collares" | "aros" | "pulseras";

export interface ProductVariants {
  metales?: string[];
  tallas?: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  compareAtPrice?: number | null;
  shortDescription: string;
  story: string;
  materials: string[];
  sustainability: string;
  careInstructions: string;
  images: string[];
  variants: ProductVariants;
  tags: StyleTag[];
  rating: number;
  reviewCount: number;
  bestSeller?: boolean;
  newArrival?: boolean;
  inStock: boolean;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  verified: boolean;
}

export interface SelectedVariant {
  metal?: string;
  talla?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  variant: SelectedVariant;
}

export type SortOption =
  | "relevancia"
  | "precio-asc"
  | "precio-desc"
  | "novedades"
  | "mejor-valorados";
