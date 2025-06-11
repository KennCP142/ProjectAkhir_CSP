import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { FoodItem, CartItem, Order } from '../types';
import { initialFoodItems } from '../data/initialFoodItems';

interface AppState {
  foodItems: FoodItem[];
  cartItems: CartItem[];
  orders: Order[];
  isAdmin: boolean;
}

type AppAction =
  | { type: 'SET_FOOD_ITEMS'; payload: FoodItem[] }
  | { type: 'ADD_FOOD_ITEM'; payload: FoodItem }
  | { type: 'UPDATE_FOOD_ITEM'; payload: FoodItem }
  | { type: 'DELETE_FOOD_ITEM'; payload: string }
  | { type: 'ADD_TO_CART'; payload: FoodItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_CART_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { id: string; status: Order['status'] } }
  | { type: 'SET_ADMIN'; payload: boolean }
  | { type: 'LOAD_FROM_STORAGE'; payload: Partial<AppState> };

const initialState: AppState = {
  foodItems: initialFoodItems,
  cartItems: [],
  orders: [],
  isAdmin: false,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOAD_FROM_STORAGE':
      return { ...state, ...action.payload };
    
    case 'SET_FOOD_ITEMS':
      return { ...state, foodItems: action.payload };
    
    case 'ADD_FOOD_ITEM':
      return { ...state, foodItems: [...state.foodItems, action.payload] };
    
    case 'UPDATE_FOOD_ITEM':
      return {
        ...state,
        foodItems: state.foodItems.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    
    case 'DELETE_FOOD_ITEM':
      return {
        ...state,
        foodItems: state.foodItems.filter(item => item.id !== action.payload),
      };
    
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    
    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id
            ? { ...order, status: action.payload.status }
            : order
        ),
      };
    
    case 'SET_ADMIN':
      return { ...state, isAdmin: action.payload };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('foodOrderingApp');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: parsedData });
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever state changes
  useEffect(() => {
    const dataToSave = {
      foodItems: state.foodItems,
      cartItems: state.cartItems,
      orders: state.orders,
      isAdmin: state.isAdmin,
    };
    localStorage.setItem('foodOrderingApp', JSON.stringify(dataToSave));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}