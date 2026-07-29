import { createContext, createElement, useContext, useReducer, type Dispatch, type ReactNode } from 'react';
import { products } from '../data/products';
import type { CartAction, Product, State } from '../types';

const catalogMaximumPrice = Math.max(...products.map((product) => product.price), 0);

export const initialState: State = {
  products,
  cart: [],
  filters: {
    searchQuery: '',
    category: '',
    maxPrice: catalogMaximumPrice,
    sortBy: 'default',
  },
  isCartOpen: false,
  selectedProduct: null,
};

export function cartReducer(state: State, action: CartAction): State {
  switch (action.type) {
    case 'ADD_TO_CART': {
      if (!action.payload.inStock) return state;

      const existingItem = state.cart.find((item) => item.id === action.payload.id);
      const cart = existingItem ? state.cart.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
      )
        : [...state.cart, { ...action.payload, quantity: 1 }];

      return { ...state, cart };
    }

    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };

    case 'UPDATE_QUANTITY': {
      const quantity = Math.floor(action.payload.quantity);
      const cart =
        quantity <= 0
          ? state.cart.filter((item) => item.id !== action.payload.id)
          : state.cart.map((item) =>
            item.id === action.payload.id ? { ...item, quantity } : item,
          );

      return { ...state, cart };
    }

    case 'CLEAR_CART':
      return { ...state, cart: [] };

    case 'SET_SEARCH_QUERY':
      return { ...state, filters: { ...state.filters, searchQuery: action.payload } };

    case 'SET_CATEGORY':
      return { ...state, filters: { ...state.filters, category: action.payload } };

    case 'SET_MAX_PRICE':
      return {
        ...state,
        filters: { ...state.filters, maxPrice: Math.max(0, action.payload) },
      };

    case 'SET_SORT':
      return { ...state, filters: { ...state.filters, sortBy: action.payload } };

    case 'TOGGLE_CART':
      return { ...state, isCartOpen: action.payload ?? !state.isCartOpen };

    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };

    default:
      return state;
  }
}

export function getFilteredProducts(state: State): Product[] {
  const query = state.filters.searchQuery.trim().toLocaleLowerCase();
  const visibleProducts = state.products.filter((product) => {
    const matchesQuery = !query || product.name.toLocaleLowerCase().includes(query);
    const matchesCategory = !state.filters.category || product.category === state.filters.category;
    const matchesPrice = product.price <= state.filters.maxPrice;

    return matchesQuery && matchesCategory && matchesPrice;
  });

  return [...visibleProducts].sort((first, second) => {
    switch (state.filters.sortBy) {
      case 'price-asc':
        return first.price - second.price;
      case 'price-desc':
        return second.price - first.price;
      case 'title-asc':
        return first.name.localeCompare(second.name);
      default:
        return 0;
    }
  });
}

export const getCartItemCount = (state: State) =>
  state.cart.reduce((total, item) => total + item.quantity, 0);

export const getCartSubtotal = (state: State) =>
  state.cart.reduce((total, item) => total + item.price * item.quantity, 0);

export const getCartGrandTotal = getCartSubtotal;

interface CartContextValue {
  state: State;
  dispatch: Dispatch<CartAction>;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return createElement(CartContext.Provider, { value: { state, dispatch } }, children);
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside CartProvider.');
  }

  return context;
}
