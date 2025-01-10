export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  description: string;
}

export const categories = [
  "Electronics",
  "Fashion",
  "Home & Kitchen",
  "Books",
  "Sports & Outdoors",
  "Beauty & Personal Care",
  "Toys & Games",
  "Automotive",
] as const;

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 299.99,
    category: "Electronics",
    description: "High-quality wireless headphones with noise cancellation",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80"
  },
  {
    id: 2,
    name: "Smart Watch Series X",
    price: 399.99,
    category: "Electronics",
    description: "Advanced smartwatch with health tracking features",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"
  },
  {
    id: 3,
    name: "Portable Bluetooth Speaker",
    price: 129.99,
    category: "Electronics",
    description: "Waterproof portable speaker with 20-hour battery life",
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80"
  },
  {
    id: 4,
    name: "Designer Leather Backpack",
    price: 89.99,
    category: "Fashion",
    description: "Stylish and durable leather backpack for everyday use",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80"
  },
  {
    id: 5,
    name: "Wireless Earbuds Pro",
    price: 159.99,
    category: "Electronics",
    description: "Premium wireless earbuds with active noise cancellation",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&q=80"
  },
  {
    id: 6,
    name: "Premium Sunglasses",
    price: 179.99,
    category: "Fashion",
    description: "UV-protected premium sunglasses with polarized lenses",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80"
  },
  {
    id: 7,
    name: "Smart Home Security Camera",
    price: 199.99,
    category: "Home & Kitchen",
    description: "HD security camera with night vision and motion detection",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?w=800&q=80"
  },
  {
    id: 8,
    name: "Bestselling Novel Collection",
    price: 49.99,
    category: "Books",
    description: "Collection of award-winning contemporary novels",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80"
  },
  {
    id: 9,
    name: "Professional Yoga Mat",
    price: 45.99,
    category: "Sports & Outdoors",
    description: "Non-slip yoga mat with carrying strap",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&q=80"
  },
  {
    id: 10,
    name: "Luxury Skincare Set",
    price: 129.99,
    category: "Beauty & Personal Care",
    description: "Complete skincare routine with natural ingredients",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80"
  },
  {
    id: 11,
    name: "Remote Control Drone",
    price: 299.99,
    category: "Toys & Games",
    description: "Professional drone with 4K camera and GPS",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=800&q=80"
  },
  {
    id: 12,
    name: "Car Diagnostic Tool",
    price: 89.99,
    category: "Automotive",
    description: "Professional OBD2 scanner for all vehicles",
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1487754180451-c456f719a1fc?w=800&q=80"
  }
];