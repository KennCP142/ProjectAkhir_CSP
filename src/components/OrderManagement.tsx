import React from 'react';
import { Clock, CheckCircle, Package } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';

const statusColors = {
  Pending: 'bg-yellow-100 text-yellow-800',
  Preparing: 'bg-blue-100 text-blue-800',
  Completed: 'bg-green-100 text-green-800',
};

const statusIcons = {
  Pending: Clock,
  Preparing: Package,
  Completed: CheckCircle,
};

export default function OrderManagement() {
  const { state, dispatch } = useApp();

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    dispatch({ type: 'UPDATE_ORDER_STATUS', payload: { id: orderId, status } });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (state.orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-16 w-16 text-gray-300 mb-4" />
        <p className="text-gray-500 text-lg">No orders yet</p>
        <p className="text-sm text-gray-400">Orders will appear here once customers place them</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {state.orders.map((order) => {
        const StatusIcon = statusIcons[order.status];
        
        return (
          <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order.id.slice(-6)}
                </h3>
                <p className="text-sm text-gray-500">{formatDate(order.timestamp)}</p>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 text-sm font-medium rounded-full flex items-center space-x-1 ${statusColors[order.status]}`}>
                  <StatusIcon className="h-4 w-4" />
                  <span>{order.status}</span>
                </span>
                
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="Pending">Pending</option>
                  <option value="Preparing">Preparing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Customer Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Information</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p><span className="font-medium">Name:</span> {order.customer.name}</p>
                  <p><span className="font-medium">Email:</span> {order.customer.email}</p>
                  <p><span className="font-medium">Phone:</span> {order.customer.phone}</p>
                  <p><span className="font-medium">Address:</span> {order.customer.address}</p>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Order Items</h4>
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
                  <div className="border-t pt-2 flex justify-between text-sm font-medium">
                    <span>Total:</span>
                    <span className="text-orange-600">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}