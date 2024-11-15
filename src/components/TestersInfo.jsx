import React, { useState } from 'react';
import { users } from '../data/users';
import { ChevronDown } from 'lucide-react';

export default function TestersInfo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-md hover:bg-yellow-200"
      >
        <span>Testers Info</span>
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
          <h3 className="font-bold text-gray-900 mb-2">Test Users</h3>
          <div className="space-y-3">
            {users.map(user => (
              <div key={user.id} className="text-sm">
                <p className="font-medium text-gray-900">{user.username}</p>
                <p className="text-gray-600">Password: {user.password}</p>
                <p className="text-xs text-gray-500">
                  {/* {user.canCheckout === false ? '(Checkout disabled)' : '(Can checkout)'} */}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}