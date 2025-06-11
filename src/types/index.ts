export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  type: 'Appetizer' | 'Main Course' | 'Dessert' | 'Drink';
  available: boolean;
}

export interface CartItem extends FoodItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  status: 'Pending' | 'Preparing' | 'Completed';
  timestamp: string;
}

export type FoodType = 'All' | 'Appetizer' | 'Main Course' | 'Dessert' | 'Drink';