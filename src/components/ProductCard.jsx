import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const defaultColor = product.colors[0];
  const defaultSize = product.sizes[0];
  const [showAdded, setShowAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, defaultColor, defaultSize);
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden relative">
      {showAdded && (
        <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-md text-sm">
          Added to cart!
        </div>
      )}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
          <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
          </span>
        </div>
        <div className="mt-3">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || product.addToCartDisabled}
            className={`w-full flex items-center justify-center space-x-2 py-2 px-4 rounded-md ${
              product.stock > 0 && !product.addToCartDisabled
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-gray-300 cursor-not-allowed text-gray-500'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}