import React from 'react';
import { FoodType } from '../types';

interface FilterBarProps {
  selectedFilter: FoodType;
  onFilterChange: (filter: FoodType) => void;
  itemCounts: Record<FoodType, number>;
}

const filters: FoodType[] = ['All', 'Appetizer', 'Main Course', 'Dessert', 'Drink'];

export default function FilterBar({ selectedFilter, onFilterChange, itemCounts }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedFilter === filter
              ? 'bg-orange-600 text-white shadow-lg transform scale-105'
              : 'bg-white text-gray-600 hover:bg-orange-50 hover:text-orange-600 shadow-sm'
          }`}
        >
          {filter}
          {itemCounts[filter] > 0 && (
            <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
              selectedFilter === filter
                ? 'bg-orange-500 text-white'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {itemCounts[filter]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}