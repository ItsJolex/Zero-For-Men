import { createContext, useContext, useReducer, useEffect, type ReactNode } from 'react';
import type { Product } from '../data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'UPDATE_QUANTITY'; productId: string; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_DRAWER' }
  | { type: 'OPEN_DRAWER' }
  | { type: 'CLOSE_DRAWER' }
  | { type: 'LOAD_CART'; items: CartItem[] };

const CART_STORAGE_KEY = 'zero-for-men-cart';

const initialState: CartState = {
  items: [],
  isDrawerOpen: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.product.id
      );
      if (existingIndex >= 0) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
        return { ...state, items: updatedItems, isDrawerOpen: true };
      }
      return {
        ...state,
        items: [...state.items, { product: action.product, quantity: 1 }],
        isDrawerOpen: true,
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.product.id !== action.productId),
      };
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.product.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.product.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'TOGGLE_DRAWER':
      return { ...state, isDrawerOpen: !state.isDrawerOpen };
    case 'OPEN_DRAWER':
      return { ...state, isDrawerOpen: true };
    case 'CLOSE_DRAWER':
      return { ...state, isDrawerOpen: false };
    case 'LOAD_CART':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

function getNumericPrice(price: string): number {
  const match = price.match(/[\d.]+/);
  return match ? parseFloat(match[0]) : 0;
}

interface CartContextType {
  items: CartItem[];
  isDrawerOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleDrawer: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  totalItems: number;
  totalPrice: number;
  isWholesale: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {}
  return [];
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const storedItems = loadCartFromStorage();
    if (storedItems.length > 0) {
      dispatch({ type: 'LOAD_CART', items: storedItems });
    }
  }, []);

  useEffect(() => {
    if (state.items.length > 0) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
    } else {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, [state.items]);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce(
    (sum, item) => sum + getNumericPrice(item.product.price) * item.quantity,
    0
  );
  const isWholesale = totalItems >= 5;

  const value: CartContextType = {
    items: state.items,
    isDrawerOpen: state.isDrawerOpen,
    addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
    removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
    updateQuantity: (productId, quantity) =>
      dispatch({ type: 'UPDATE_QUANTITY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR_CART' }),
    toggleDrawer: () => dispatch({ type: 'TOGGLE_DRAWER' }),
    openDrawer: () => dispatch({ type: 'OPEN_DRAWER' }),
    closeDrawer: () => dispatch({ type: 'CLOSE_DRAWER' }),
    totalItems,
    totalPrice,
    isWholesale,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
