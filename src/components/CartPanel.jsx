import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';

export default function CartPanel() {
  const { items, removeFromCart, updateQuantity, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      alert('Please login to proceed to checkout');
      return;
    }
    
    if (user.canCheckout === false) {
      alert('Your account is not authorized for checkout. Please contact support.');
      return;
    }
    
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <div className="p-8 text-center">
        <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-gray-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-600">
                {item.selectedColor} - {item.selectedSize}
              </p>
              <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="p-1 rounded-full hover:bg-gray-100"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-lg font-medium">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          onClick={handleCheckout}
          disabled={!user || user.canCheckout === false}
          className={`mt-4 w-full py-2 px-4 rounded-md ${
            !user || user.canCheckout === false
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {!user 
            ? 'Login to Checkout'
            : user.canCheckout === false
              ? 'Checkout Not Available'
              : 'Proceed to Checkout'
          }
        </button>
      </div>
    </div>
  );
}