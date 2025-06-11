import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, ChefHat, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Cart from './Cart';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { state, dispatch } = useApp();
  const location = useLocation();
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const cartItemCount = state.cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAdminToggle = () => {
    dispatch({ type: 'SET_ADMIN', payload: !state.isAdmin });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 transition-colors">
              <ChefHat className="h-8 w-8" />
              <span className="text-xl font-bold">Delicious</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === '/'
                    ? 'bg-orange-100 text-orange-700'
                    : 'text-gray-600 hover:text-orange-600'
                }`}
              >
                Menu
              </Link>
              {state.isAdmin && (
                <Link
                  to="/admin"
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/admin'
                      ? 'bg-orange-100 text-orange-700'
                      : 'text-gray-600 hover:text-orange-600'
                  }`}
                >
                  Admin Panel
                </Link>
              )}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>

              {/* Admin Toggle */}
              <button
                onClick={handleAdminToggle}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  state.isAdmin
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {state.isAdmin ? <LogOut className="h-4 w-4" /> : <User className="h-4 w-4" />}
                <span>{state.isAdmin ? 'Exit Admin' : 'Admin'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Cart Sidebar */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}