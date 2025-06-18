import { FoodItem } from '../types';

export const initialFoodItems: FoodItem[] = [
  {
    id: '1',
    name: 'Truffle Pasta',
    description: 'Handmade pasta with black truffle, parmesan cheese, and fresh herbs',
    price: 28.99,
    image: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'Main Course',
    available: true
  },
  {
    id: '2',
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with lemon butter sauce and seasonal vegetables',
    price: 32.99,
    image: 'https://images.pexels.com/photos/1516415/pexels-photo-1516415.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'Main Course',
    available: true
  },
  {
    id: '3',
    name: 'Cheeseburger',
    description: 'Crispy romaine lettuce with homemade croutons and parmesan cheese',
    price: 14.99,
    image: 'https://images.pexels.com/photos/2282532/pexels-photo-2282532.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'Appetizer',
    available: false
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla ice cream',
    price: 9.99,
    image: 'https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'Dessert',
    available: true
  },
  {
    id: '5',
    name: 'Mojito Mocktail',
    description: 'Fresh mint leaves with lime juice and sparkling water',
    price: 7.99,
    image: 'https://images.pexels.com/photos/4021887/pexels-photo-4021887.jpeg?_gl=1*19h4lpb*_ga*MTYzODEwMTc4LjE3NTAyNTM4MTU.*_ga_8JE65Q40S6*czE3NTAyNTM4MTUkbzEkZzEkdDE3NTAyNTUwNzUkajU5JGwwJGgw',
    type: 'Drink',
    available: true
  },
  {
    id: '6',
    name: 'Margherita Pizza',
    description: 'Wood-fired pizza with fresh mozzarella, basil, and tomato sauce',
    price: 18.99,
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'Main Course',
    available: true
  },
  {
    id: '7',
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, garlic, and basil',
    price: 8.99,
    image: 'https://images.pexels.com/photos/769969/pexels-photo-769969.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'Appetizer',
    available: true
  },
  {
    id: '8',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone',
    price: 7.99,
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400',
    type: 'Dessert',
    available: true
  },
  {
    id: '9',
    name: 'Iced Tea',
    description: 'Refreshing glass of iced tea, sweetened with sugar or not',
    price: 2.99,
    image: 'https://images.pexels.com/photos/1484678/pexels-photo-1484678.jpeg?_gl=1*15h4xjt*_ga*MTYzODEwMTc4LjE3NTAyNTM4MTU.*_ga_8JE65Q40S6*czE3NTAyNTM4MTUkbzEkZzEkdDE3NTAyNTM4NzgkajU5JGwwJGgw',
    type: 'Drink',
    available: true
  }
];