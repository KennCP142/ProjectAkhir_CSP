import React from 'react';
import { Plus, AlertCircle } from 'lucide-react';
import { FoodItem } from '../types';
import { useApp } from '../context/AppContext';

interface FoodCardProps {
  item: FoodItem;
}

export default function FoodCard({ item }: FoodCardProps) {
  const { dispatch } = useApp();

  const addToCart = () => {
    if (item.available) {
      dispatch({ type: 'ADD_TO_CART', payload: item });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105 ${
            !item.available ? 'grayscale opacity-50' : ''
          }`}
        />
        
        {!item.available && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="bg-white bg-opacity-90 px-3 py-1 rounded-full flex items-center space-x-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium text-red-600">Out of Stock</span>
            </div>
          </div>
        )}

        <div className="absolute top-3 left-3">
          <span className="bg-white bg-opacity-90 text-orange-600 text-xs font-medium px-2 py-1 rounded-full">
            {item.type}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
            {item.name}
          </h3>
          <span className="text-lg font-bold text-orange-600">${item.price.toFixed(2)}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
        
        <button
          onClick={addToCart}
          disabled={!item.available}
          className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-lg font-medium transition-colors ${
            item.available
              ? 'bg-orange-600 text-white hover:bg-orange-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Plus className="h-4 w-4" />
          <span>{item.available ? 'Add to Cart' : 'Unavailable'}</span>
        </button>
      </div>
    </div>
  );
}