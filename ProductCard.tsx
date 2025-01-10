import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
import type { Product } from '../data/products';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="group relative bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <div className="text-sm text-indigo-600 font-medium mb-1">{product.category}</div>
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.description}</p>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={16}
              className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full
                     transform transition-all duration-300 hover:bg-indigo-700 active:scale-95"
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}