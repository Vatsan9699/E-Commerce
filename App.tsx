import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, Star, DollarSign, Percent, Truck, Package, Palette, CreditCard, Store, Box } from 'lucide-react';
import { products, Product, categories } from './data/products';
import { ProductCard } from './components/ProductCard';
import { Toast } from './components/Toast';
import { ScrollToTop } from './components/ScrollToTop';
import { Navbar } from './components/Navbar';
import { Cart } from './components/Cart';
import type { CartItem } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('');
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prevItems, { ...product, quantity: 1 }];
    });
    
    setShowToast(true);
  };

  const handleUpdateQuantity = (productId: number, change: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.description.toLowerCase().includes(query)
      );
    }
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Apply sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  // Simulate loading
  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        cartItems={cartItems}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
      />

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <aside className={`md:w-64 space-y-6 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filters
              </h2>
              
              <div className="space-y-4">
                {/* Delivery Options */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Truck size={16} />
                    Delivery Day
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-sm">Get It by Tomorrow</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-sm">Get It in 2 Days</span>
                    </label>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Package size={16} />
                    Category
                  </h3>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <DollarSign size={16} />
                    Price Range
                  </h3>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <span>-</span>
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button className="px-2 py-1 bg-gray-100 rounded">Go</button>
                  </div>
                </div>

                {/* Discount */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Percent size={16} />
                    Discount
                  </h3>
                  <div className="space-y-2">
                    {[10, 25, 35, 50, 60, 70].map(discount => (
                      <label key={discount} className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-indigo-600" />
                        <span className="text-sm">{discount}% Off or more</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Palette size={16} />
                    Color
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {['bg-black', 'bg-gray-500', 'bg-white', 'bg-red-500', 'bg-green-500', 'bg-blue-500', 'bg-yellow-500', 'bg-purple-500'].map((color) => (
                      <button
                        key={color}
                        className={`w-6 h-6 rounded-full ${color} border border-gray-300`}
                        aria-label={`Select ${color.replace('bg-', '')}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Payment Options */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <CreditCard size={16} />
                    Payment Options
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-sm">Pay On Delivery</span>
                    </label>
                  </div>
                </div>

                {/* Seller */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Store size={16} />
                    Seller
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-sm">Premium Sellers</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-sm">Local Sellers</span>
                    </label>
                  </div>
                </div>

                {/* Availability */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                    <Box size={16} />
                    Availability
                  </h3>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" className="rounded text-indigo-600" />
                      <span className="text-sm">Include Out of Stock</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {selectedCategory || 'All Products'}
                    <span className="text-gray-500 text-sm ml-2">
                      ({filteredAndSortedProducts.length} items)
                    </span>
                  </h2>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="md:hidden flex items-center gap-2 text-gray-600"
                  >
                    <Filter size={20} />
                    Filters
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>

      {showToast && (
        <Toast
          message="Product added to cart!"
          onClose={() => setShowToast(false)}
        />
      )}

      <ScrollToTop />
    </div>
  );
}