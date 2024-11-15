import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addToCart = (product, color, size) => {
    setItems(currentItems => {
      const existingItem = currentItems.find(
        item => item.id === product.id && 
        item.selectedColor === color && 
        item.selectedSize === size
      );

      if (existingItem) {
        return currentItems.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      const { description, ...productWithoutDescription } = product;
      return [...currentItems, {
        ...productWithoutDescription,
        quantity: 1,
        selectedColor: color,
        selectedSize: size
      }];
    });
  };

  const removeFromCart = (productId) => {
    setItems(items => items.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setItems(items =>
      items.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, total }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}