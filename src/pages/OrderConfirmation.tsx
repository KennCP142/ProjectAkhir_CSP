import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Home } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = useApp();
  
  const orderId = location.state?.orderId;
  const order = orderId ? state.orders.find(o => o.id === orderId) : null;

  if (!order) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg mb-4">Order not found</p>
        <button
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
        <p className="text-gray-600">Thank you for your order. We've received it and will start preparing it soon.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="text-left space-y-4">
          <div className="flex justify-between items-center pb-4 border-b">
            <span className="font-semibold text-gray-900">Order #{order.id.slice(-6)}</span>
            <span className="flex items-center text-sm text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-1" />
              {order.status}
            </span>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Delivery Information</h3>
            <div className="text-sm text-gray-600 space-y-1">
              <p><span className="font-medium">Name:</span> {order.customer.name}</p>
              <p><span className="font-medium">Email:</span> {order.customer.email}</p>
              <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
              <p><span className="font-medium">Address:</span> {order.customer.address}</p>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Order Items</h3>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-medium text-gray-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Total:</span>
                <span className="text-orange-600">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-600">
          We'll send you updates about your order status. Estimated delivery time is 30-45 minutes.
        </p>
        
        <button
          onClick={() => navigate('/')}
          className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          <Home className="h-5 w-5" />
          <span>Back to Menu</span>
        </button>
      </div>
    </div>
  );
}