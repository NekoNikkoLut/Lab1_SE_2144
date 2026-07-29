export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export type SortBy = 'default' | 'price-asc' | 'price-desc' | 'title-asc';

export interface Filters {
  searchQuery: string;
  category: string;
  maxPrice: number;
  sortBy: SortBy;
}

export interface State {
  products: Product[];
  cart: CartItem[];
  filters: Filters;
  isCartOpen: boolean;
  selectedProduct: Product | null;
}

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'SET_MAX_PRICE'; payload: number }
  | { type: 'SET_SORT'; payload: SortBy }
  | { type: 'TOGGLE_CART'; payload?: boolean }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null };
