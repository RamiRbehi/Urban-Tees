import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
  const { items, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  if (!user) {
    navigate('/');
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.selectedColor} - {item.selectedSize}
                  </p>
                  <p className="text-sm">Quantity: {item.quantity}</p>
                </div>
                <span className="text-right">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Shipping Information</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                required
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="Last Name"
                required
                className="p-2 border rounded w-full"
              />
            </div>
            
            <input
              type="email"
              placeholder="Email"
              required
              className="p-2 border rounded w-full"
            />
            
            <textarea
              placeholder="Address"
              required
              className="p-2 border rounded w-full"
              rows={3}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="City"
                required
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="ZIP Code"
                required
                pattern="[0-9]*"
                className="p-2 border rounded w-full"
              />
            </div>

            <h2 className="text-2xl font-bold mt-8 mb-4">Payment Information</h2>
            
            <input
              type="text"
              placeholder="Card Number"
              required
              pattern="[0-9]{16}"
              className="p-2 border rounded w-full"
            />
            
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                required
                pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                className="p-2 border rounded w-full"
              />
              <input
                type="text"
                placeholder="CVV"
                required
                pattern="[0-9]{3,4}"
                className="p-2 border rounded w-full"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 mt-6"
            >
              Place Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}