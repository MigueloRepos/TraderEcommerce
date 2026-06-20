export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  category: string;
  publisherId?: string;
  publisherWhatsapp?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  avatar: string;
}
