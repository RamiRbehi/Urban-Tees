import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import CartPanel from './components/CartPanel';
import LoginDropdown from './components/LoginDropdown';
import TestersInfo from './components/TestersInfo';
import { ShoppingCart } from 'lucide-react';

function App() {
  const [isCartOpen, setIsCartOpen] = React.useState(false);
  const [cartItems, setCartItems] = React.useState([]);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm">
              <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <a href="/Urban-Tees" className="text-2xl font-bold text-gray-900">
                      Urban Tees
                    </a>
                    <TestersInfo />
                  </div>
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => setIsCartOpen(!isCartOpen)}
                      className="flex items-center space-x-2 text-gray-700 hover:text-gray-900 relative"
                    >
                      <ShoppingCart className="h-6 w-6" />
                      <span>Cart</span>
                      {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {totalItems}
                        </span>
                      )}
                    </button>
                    <LoginDropdown />
                  </div>
                </div>
              </div>
            </header>

            {isCartOpen && (
              <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform z-50">
                <div className="p-4 border-b">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                      Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                    </h2>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      X
                    </button>
                  </div>
                </div>
                <CartPanel />
              </div>
            )}

            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/Urban-Tees" element={<HomePage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
              </Routes>
            </main>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;