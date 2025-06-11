import React, { useState, useMemo } from 'react';
import { FoodType } from '../types';
import { useApp } from '../context/AppContext';
import FoodCard from '../components/FoodCard';
import FilterBar from '../components/FilterBar';

export default function Home() {
  const { state } = useApp();
  const [selectedFilter, setSelectedFilter] = useState<FoodType>('All');

  const filteredItems = useMemo(() => {
    if (selectedFilter === 'All') {
      return state.foodItems;
    }
    return state.foodItems.filter(item => item.type === selectedFilter);
  }, [state.foodItems, selectedFilter]);

  const itemCounts = useMemo(() => {
    const counts: Record<FoodType, number> = {
      'All': state.foodItems.length,
      'Appetizer': 0,
      'Main Course': 0,
      'Dessert': 0,
      'Drink': 0,
    };

    state.foodItems.forEach(item => {
      counts[item.type]++;
    });

    return counts;
  }, [state.foodItems]);

  return (
    <div>
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Delicious Food, <span className="text-orange-600">Delivered Fresh</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated menu of gourmet dishes, made with the finest ingredients
          and prepared by our expert chefs.
        </p>
      </div>

      {/* Filter Bar */}
      <FilterBar
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
        itemCounts={itemCounts}
      />

      {/* Food Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No items found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}