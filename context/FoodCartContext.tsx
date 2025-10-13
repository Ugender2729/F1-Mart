'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './AuthContext';

interface FoodCartItem {
  id: string;
  menu_item_id: string;
  restaurant_id: string;
  name: string;
  price: number;
  quantity: number;
  special_instructions?: string;
  image_url?: string;
}

interface FoodCartState {
  items: FoodCartItem[];
  restaurantId: string | null;
  loading: boolean;
  error: string | null;
}

type FoodCartAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_RESTAURANT'; payload: string | null }
  | { type: 'ADD_ITEM'; payload: FoodCartItem }
  | { type: 'UPDATE_ITEM'; payload: { id: string; quantity: number; special_instructions?: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: FoodCartItem[] };

const initialState: FoodCartState = {
  items: [],
  restaurantId: null,
  loading: false,
  error: null,
};

function foodCartReducer(state: FoodCartState, action: FoodCartAction): FoodCartState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_RESTAURANT':
      return { ...state, restaurantId: action.payload };
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.menu_item_id === action.payload.menu_item_id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.menu_item_id === action.payload.menu_item_id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, action.payload],
        restaurantId: action.payload.restaurant_id,
      };
    case 'UPDATE_ITEM':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity, special_instructions: action.payload.special_instructions }
            : item
        ),
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        restaurantId: null,
      };
    case 'SET_CART':
      return {
        ...state,
        items: action.payload,
        restaurantId: action.payload.length > 0 ? action.payload[0].restaurant_id : null,
      };
    default:
      return state;
  }
}

interface FoodCartContextType {
  state: FoodCartState;
  addToCart: (item: Omit<FoodCartItem, 'id'>) => Promise<void>;
  updateItem: (id: string, quantity: number, special_instructions?: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalPrice: () => number;
  getItemCount: () => number;
  canAddFromRestaurant: (restaurantId: string) => boolean;
}

const FoodCartContext = createContext<FoodCartContextType | undefined>(undefined);

export function FoodCartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(foodCartReducer, initialState);
  const { user } = useAuth();

  // Load cart from localStorage on mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('food-cart');
        if (savedCart) {
          const cartData = JSON.parse(savedCart);
          dispatch({ type: 'SET_CART', payload: cartData.items || [] });
          if (cartData.restaurantId) {
            dispatch({ type: 'SET_RESTAURANT', payload: cartData.restaurantId });
          }
        }
      } catch (error) {
        console.error('Error loading food cart:', error);
      }
    };

    loadCart();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    const saveCart = () => {
      try {
        const cartData = {
          items: state.items,
          restaurantId: state.restaurantId,
        };
        localStorage.setItem('food-cart', JSON.stringify(cartData));
      } catch (error) {
        console.error('Error saving food cart:', error);
      }
    };

    saveCart();
  }, [state.items, state.restaurantId]);

  const addToCart = async (item: Omit<FoodCartItem, 'id'>) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      // Check if we're adding from a different restaurant
      if (state.restaurantId && state.restaurantId !== item.restaurant_id) {
        // Clear existing cart and add new item
        dispatch({ type: 'CLEAR_CART' });
      }

      const cartItem: FoodCartItem = {
        ...item,
        id: `${item.menu_item_id}-${Date.now()}`,
      };

      dispatch({ type: 'ADD_ITEM', payload: cartItem });

      // Save to database if user is logged in
      if (user) {
        const { error } = await supabase
          .from('food_cart_items')
          .upsert({
            user_id: user.id,
            restaurant_id: item.restaurant_id,
            menu_item_id: item.menu_item_id,
            quantity: item.quantity,
            special_instructions: item.special_instructions,
          });

        if (error) {
          console.error('Error saving to database:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to save item to cart' });
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to add item to cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const updateItem = async (id: string, quantity: number, special_instructions?: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      if (quantity <= 0) {
        await removeItem(id);
        return;
      }

      dispatch({ type: 'UPDATE_ITEM', payload: { id, quantity, special_instructions } });

      // Update in database if user is logged in
      if (user) {
        const item = state.items.find(item => item.id === id);
        if (item) {
          const { error } = await supabase
            .from('food_cart_items')
            .update({
              quantity,
              special_instructions,
            })
            .eq('user_id', user.id)
            .eq('menu_item_id', item.menu_item_id);

          if (error) {
            console.error('Error updating in database:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to update item in cart' });
          }
        }
      }
    } catch (error) {
      console.error('Error updating item:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to update item in cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const removeItem = async (id: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      dispatch({ type: 'REMOVE_ITEM', payload: id });

      // Remove from database if user is logged in
      if (user) {
        const item = state.items.find(item => item.id === id);
        if (item) {
          const { error } = await supabase
            .from('food_cart_items')
            .delete()
            .eq('user_id', user.id)
            .eq('menu_item_id', item.menu_item_id);

          if (error) {
            console.error('Error removing from database:', error);
            dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
          }
        }
      }
    } catch (error) {
      console.error('Error removing item:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to remove item from cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const clearCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });

      dispatch({ type: 'CLEAR_CART' });

      // Clear from database if user is logged in
      if (user) {
        const { error } = await supabase
          .from('food_cart_items')
          .delete()
          .eq('user_id', user.id);

        if (error) {
          console.error('Error clearing from database:', error);
          dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
        }
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Failed to clear cart' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getTotalPrice = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  const canAddFromRestaurant = (restaurantId: string) => {
    return !state.restaurantId || state.restaurantId === restaurantId;
  };

  const value: FoodCartContextType = {
    state,
    addToCart,
    updateItem,
    removeItem,
    clearCart,
    getTotalPrice,
    getItemCount,
    canAddFromRestaurant,
  };

  return (
    <FoodCartContext.Provider value={value}>
      {children}
    </FoodCartContext.Provider>
  );
}

export function useFoodCart() {
  const context = useContext(FoodCartContext);
  if (context === undefined) {
    throw new Error('useFoodCart must be used within a FoodCartProvider');
  }
  return context;
}




