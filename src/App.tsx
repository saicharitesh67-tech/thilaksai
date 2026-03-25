import Header from './components/Header';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ProductModal from './components/ProductModal';
import CartDrawer from './components/CartDrawer';
import SearchOverlay from './components/SearchOverlay';
import AddressModal from './components/AddressModal';
import BrandReferral from './components/BrandReferral';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Clock, MapPin, ChevronRight, Sparkles, ShieldCheck, Search, X, ShoppingCart, Share2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { Toaster, toast } from 'sonner';

const FEATURED_PRODUCTS = [
  {
    id: 1,
    name: 'US Polo',
    price: '₹1,400',
    originalPrice: '₹3,500',
    numericPrice: 1400,
    discountPercentage: 60,
    rating: 4.9,
    time: '2-3 Days',
    reviews: [
      { id: 1, user: 'Rahul S.', rating: 5, comment: 'Amazing cleaning service! My shoes look brand new.', date: '2 days ago' },
      { id: 2, user: 'Priya K.', rating: 4, comment: 'Very professional. Took a bit longer than expected but the result was worth it.', date: '1 week ago' }
    ],
    image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=500&q=80',
    category: 'Cleaning',
    keywords: ['cleaning', 'restoration', 'us polo', 'classic', 'wash'],
    description: 'Our signature deep-cleaning service specifically designed for US Polo models. We use specialized brushes and eco-friendly solutions to restore the canvas, leather, and classic silhouettes to their original glory.',
    features: ['Deep canvas cleaning', 'Leather conditioning', 'Midsole whitening', 'Deodorizing treatment'],
    colors: ['Original Color', 'Triple White', 'Triple Black', 'Navy Blue'],
    sizes: ['IND 6', 'IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 2,
    name: 'Nike',
    price: '₹6,400',
    originalPrice: '₹15,999',
    numericPrice: 6400,
    discountPercentage: 60,
    rating: 5.0,
    time: 'Express Ship',
    reviews: [
      { id: 3, user: 'Amit V.', rating: 5, comment: 'Best sneakers I have ever owned. Super comfortable!', date: '3 days ago' },
      { id: 4, user: 'Sneha M.', rating: 5, comment: 'The quality is top-notch. Highly recommended.', date: '5 days ago' }
    ],
    image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=500&q=80',
    category: 'Sneakers',
    keywords: ['nike', 'air', 'swoosh', 'sneakers', 'shoes'],
    description: 'The timeless classic that defines the sneaker culture. This Nike model features premium materials, the iconic Swoosh, and encapsulated Air-Sole cushioning for all-day comfort and style.',
    features: ['Premium leather upper', 'Iconic Swoosh branding', 'Air-Sole cushioning', 'Durable rubber outsole'],
    colors: ['Red/Black', 'Blue/White', 'Shadow Grey'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 3,
    name: 'Cut Shoe',
    price: '₹1,000',
    originalPrice: '₹2,499',
    numericPrice: 1000,
    discountPercentage: 60,
    rating: 4.8,
    time: 'In Stock',
    reviews: [
      { id: 5, user: 'Karan J.', rating: 4, comment: 'Great formal shoes for the price.', date: '1 month ago' }
    ],
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=500&q=80',
    category: 'Formal',
    keywords: ['cut shoe', 'formal', 'leather', 'shoes', 'classic'],
    description: 'A sophisticated leather loafer perfect for formal occasions or professional settings. Crafted from genuine leather with a cushioned insole for maximum comfort during long hours.',
    features: ['Genuine leather upper', 'Slip-on design', 'Cushioned footbed', 'Non-slip sole'],
    colors: ['Black', 'Dark Brown', 'Tan'],
    sizes: ['IND 6', 'IND 7', 'IND 8', 'IND 9', 'IND 10']
  },
  {
    id: 4,
    name: 'Sneakers',
    price: '₹4,200',
    originalPrice: '₹10,500',
    numericPrice: 4200,
    discountPercentage: 60,
    rating: 4.7,
    time: 'Next Day',
    reviews: [
      { id: 6, user: 'Anjali R.', rating: 5, comment: 'Perfect for my morning runs. Very lightweight.', date: '2 weeks ago' }
    ],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80',
    category: 'Athletic',
    keywords: ['sneakers', 'performance', 'athletic', 'shoes', 'style'],
    description: 'The ultimate fusion of style and performance. These versatile sneakers feature a breathable knit upper and responsive foam technology, perfect for both the track and the street.',
    features: ['Breathable knit upper', 'Responsive foam midsole', 'Lightweight construction', 'Enhanced traction pattern'],
    colors: ['Neon Green', 'Electric Blue', 'Stealth Black'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 5,
    name: 'New Balance',
    price: '₹3,600',
    originalPrice: '₹8,999',
    numericPrice: 3600,
    discountPercentage: 60,
    rating: 4.8,
    time: '2-3 Days',
    reviews: [
      { id: 7, user: 'Vikram S.', rating: 5, comment: 'Classic look, never goes out of style.', date: '1 week ago' }
    ],
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    keywords: ['new balance', 'nb', 'lifestyle', 'classic', 'comfort'],
    description: 'The New Balance 574 is a true icon. With its clean lines and classic profile, this sneaker makes a standout, everyday statement that remains true to its 80s heritage.',
    features: ['ENCAP midsole technology', 'EVA foam cushioning', 'Suede and mesh upper', 'Durable rubber outsole'],
    colors: ['Grey', 'Navy', 'Burgundy'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 6,
    name: 'Reebok',
    price: '₹2,200',
    originalPrice: '₹5,499',
    numericPrice: 2200,
    discountPercentage: 60,
    rating: 4.6,
    time: '3-4 Days',
    reviews: [
      { id: 8, user: 'Rohan D.', rating: 4, comment: 'Good comfort and durability.', date: '4 days ago' }
    ],
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80',
    category: 'Classic',
    keywords: ['reebok', 'classic', 'vector', 'vintage', 'sport'],
    description: 'Step into timeless style with the Reebok Classic Leather. Originally a running shoe, it has evolved into a street-style staple known for its clean, minimalist design and superior comfort.',
    features: ['Soft garment leather upper', 'Die-cut EVA midsole', 'Molded polyurethane sockliner', 'High-abrasion rubber outsole'],
    colors: ['White', 'Black', 'Gum'],
    sizes: ['IND 6', 'IND 7', 'IND 8', 'IND 9', 'IND 10']
  },
  {
    id: 7,
    name: 'Adidas',
    price: '₹3,200',
    originalPrice: '₹7,999',
    numericPrice: 3200,
    discountPercentage: 60,
    rating: 4.9,
    time: '2-3 Days',
    reviews: [
      { id: 9, user: 'Meera G.', rating: 5, comment: 'Love the shell-toe design. Very iconic.', date: '2 days ago' }
    ],
    image: 'https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=500&q=80',
    category: 'Originals',
    keywords: ['adidas', 'originals', 'three stripes', 'superstar', 'classic'],
    description: 'The Adidas Superstar is a cultural icon. From the basketball court to the hip-hop stage, its shell-toe design and three-stripe branding have made it one of the most recognizable sneakers in history.',
    features: ['Full grain leather upper', 'Classic rubber shell toe', 'Textile lining', 'Herringbone-pattern rubber cupsole'],
    colors: ['White/Black', 'Black/White', 'All White'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 8,
    name: 'Converse',
    price: '₹1,800',
    originalPrice: '₹4,499',
    numericPrice: 1800,
    discountPercentage: 60,
    rating: 4.8,
    time: '2-3 Days',
    reviews: [
      { id: 10, user: 'Arjun K.', rating: 5, comment: 'The most versatile shoe in my collection.', date: '3 days ago' }
    ],
    image: 'https://images.unsplash.com/photo-1494496195158-c3becb4f2475?auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    keywords: ['converse', 'chuck taylor', 'all star', 'canvas', 'classic'],
    description: 'The Converse Chuck Taylor All Star is the most iconic sneaker in the world. Originally designed as a basketball shoe, it has become a symbol of self-expression for generations.',
    features: ['Canvas upper for lightweight flexibility', 'Medial eyelets for airflow', 'Classic All Star ankle patch', 'Durable rubber outsole'],
    colors: ['Black', 'White', 'Red', 'Navy'],
    sizes: ['IND 6', 'IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 9,
    name: 'Vans',
    price: '₹2,120',
    originalPrice: '₹5,299',
    numericPrice: 2120,
    discountPercentage: 60,
    rating: 4.7,
    time: '3-4 Days',
    reviews: [
      { id: 11, user: 'Sonia P.', rating: 4, comment: 'Great grip and classic skate style.', date: '1 week ago' }
    ],
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80',
    category: 'Skate',
    keywords: ['vans', 'old skool', 'skate', 'off the wall', 'classic'],
    description: 'The Vans Old Skool, the first to bare the iconic side stripe, is a low top lace-up shoe. It is lined, has padded collars for comfort, re-enforced toecaps to withstand repeated wear, and features the Vans signature waffle outsole for a firmer grip.',
    features: ['Suede and canvas upper', 'Reinforced toe caps', 'Padded collars', 'Signature rubber waffle outsole'],
    colors: ['Black/White', 'Navy', 'Checkered'],
    sizes: ['IND 6', 'IND 7', 'IND 8', 'IND 9', 'IND 10']
  },
  {
    id: 10,
    name: 'Fila',
    price: '₹2,600',
    originalPrice: '₹6,499',
    numericPrice: 2600,
    discountPercentage: 60,
    rating: 4.7,
    time: '2-3 Days',
    reviews: [
      { id: 12, user: 'Ji-won L.', rating: 5, comment: 'The chunky sole is so trendy and comfortable!', date: '2 days ago' }
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    keywords: ['fila', 'disruptor', 'chunky', 'korean', 'trend'],
    description: 'The Fila Disruptor II is the quintessential chunky sneaker. Originally an Italian brand and now Korean-owned, Fila has redefined streetwear with this bold, aggressive silhouette that offers both height and comfort.',
    features: ['Premium leather and synthetic upper', 'Lightweight EVA midsole', 'Aggressive rubber outsole', 'Padded collar and tongue'],
    colors: ['Triple White', 'Pink', 'Black'],
    sizes: ['IND 5', 'IND 6', 'IND 7', 'IND 8', 'IND 9']
  },
  {
    id: 11,
    name: 'Akiii Classic',
    price: '₹2,920',
    originalPrice: '₹7,299',
    numericPrice: 2920,
    discountPercentage: 60,
    rating: 4.9,
    time: '4-5 Days',
    reviews: [
      { id: 13, user: 'Min-ho K.', rating: 5, comment: 'Authentic Korean style. Very unique design.', date: '1 week ago' }
    ],
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80',
    category: 'Lifestyle',
    keywords: ['akiii classic', 'korean', 'lifestyle', 'sneakers', 'k-style'],
    description: 'Akiii Classic is a leading Korean lifestyle brand known for its unique designs and superior comfort. These sneakers represent the modern K-style, blending athletic performance with high-fashion aesthetics.',
    features: ['High-quality synthetic leather', 'Ortholite insole for comfort', 'Durable non-slip outsole', 'Breathable mesh panels'],
    colors: ['Cream/Beige', 'White/Grey', 'All Black'],
    sizes: ['IND 6', 'IND 7', 'IND 8', 'IND 9', 'IND 10']
  },
  {
    id: 12,
    name: 'Ralf Ringer',
    price: '₹2,320',
    originalPrice: '₹5,800',
    numericPrice: 2320,
    discountPercentage: 60,
    rating: 4.8,
    time: '5-7 Days',
    reviews: [
      { id: 14, user: 'Ivan P.', rating: 5, comment: 'Incredibly durable and perfect for cold weather.', date: '2 weeks ago' }
    ],
    image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=500&q=80',
    category: 'Formal',
    keywords: ['ralf ringer', 'russian', 'leather', 'durable', 'classic'],
    description: 'Ralf Ringer is one of Russia\'s most famous footwear brands, renowned for its exceptional durability and high-quality leather. These shoes are built to withstand tough conditions while maintaining a classic, professional look.',
    features: ['Genuine high-grade leather', 'Shock-absorbing sole', 'Reinforced stitching', 'Ergonomic fit'],
    colors: ['Black', 'Dark Brown'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 13,
    name: 'Affex',
    price: '₹2,480',
    originalPrice: '₹6,200',
    numericPrice: 2480,
    discountPercentage: 60,
    rating: 4.7,
    time: '4-6 Days',
    reviews: [
      { id: 15, user: 'Dmitry S.', rating: 4, comment: 'Great modern design from a local brand.', date: '3 weeks ago' }
    ],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80',
    category: 'Sneakers',
    keywords: ['affex', 'russian', 'streetwear', 'sneakers', 'modern'],
    description: 'Affex is a modern Russian brand that blends urban streetwear aesthetics with practical design. Their sneakers are popular for their clean lines, high-quality materials, and focus on the contemporary urban lifestyle.',
    features: ['Premium suede and mesh', 'Lightweight construction', 'Urban-ready traction', 'Soft textile lining'],
    colors: ['Grey/White', 'Navy/Tan', 'Forest Green'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 14,
    name: 'Li-Ning',
    price: '₹3,600',
    originalPrice: '₹8,999',
    numericPrice: 3600,
    discountPercentage: 60,
    rating: 4.9,
    time: '3-5 Days',
    reviews: [
      { id: 16, user: 'Wei Z.', rating: 5, comment: 'Incredible cushioning and support for basketball.', date: '4 days ago' }
    ],
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
    category: 'Basketball',
    keywords: ['li-ning', 'chinese', 'performance', 'basketball', 'way of wade'],
    description: 'Li-Ning is a global leader in athletic footwear, particularly famous for its professional basketball line. Known for innovative cushioning technology and bold designs, Li-Ning provides elite-level performance for athletes worldwide.',
    features: ['BOOM technology for energy return', 'Carbon fiber plate for stability', 'High-grip rubber outsole', 'Breathable textile upper'],
    colors: ['White/Red', 'Black/Gold', 'Electric Blue'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11', 'IND 12']
  },
  {
    id: 15,
    name: 'ANTA',
    price: '₹3,000',
    originalPrice: '₹7,499',
    numericPrice: 3000,
    discountPercentage: 60,
    rating: 4.8,
    time: '4-6 Days',
    reviews: [
      { id: 17, user: 'Chen L.', rating: 5, comment: 'Very lightweight and great for long distance runs.', date: '1 week ago' }
    ],
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80',
    category: 'Running',
    keywords: ['anta', 'chinese', 'running', 'performance', 'kt'],
    description: 'ANTA is one of the world\'s largest sportswear brands, offering high-performance footwear that combines cutting-edge technology with exceptional value. Their running and basketball lines are trusted by professional athletes globally.',
    features: ['Nitroedge technology for lightweight cushioning', 'A-Flashfoam for impact protection', 'Dynamic fit system', 'Durable traction pattern'],
    colors: ['Neon Green', 'White/Blue', 'Black/Red'],
    sizes: ['IND 6', 'IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 16,
    name: 'Campus',
    price: '₹899',
    originalPrice: '₹2,999',
    numericPrice: 899,
    discountPercentage: 70,
    rating: 4.7,
    time: '2-4 Days',
    reviews: [
      { id: 18, user: 'Suresh M.', rating: 5, comment: 'Excellent value for money. Very comfortable for daily wear.', date: '3 days ago' }
    ],
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80',
    category: 'Athletic',
    keywords: ['campus', 'indian', 'running', 'affordable', 'comfort'],
    description: 'Campus is one of India\'s most popular athletic footwear brands, known for delivering high-quality, stylish, and comfortable shoes at exceptional value. Their running and lifestyle collections are designed for the modern active individual.',
    features: ['Yoga Max insole for extra comfort', 'Breathable mesh upper', 'Phylon sole for lightweight cushioning', 'Trendy design patterns'],
    colors: ['Jet Black', 'Slate Grey', 'Royal Blue'],
    sizes: ['IND 6', 'IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 17,
    name: 'Nike Yellow Streak',
    price: '₹2,499',
    originalPrice: '₹12,499',
    numericPrice: 2499,
    discountPercentage: 80,
    rating: 4.9,
    time: 'Express Ship',
    reviews: [
      { id: 19, user: 'Arjun V.', rating: 5, comment: 'The yellow is so vibrant! Love the black accents.', date: '1 day ago' }
    ],
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=500&q=80',
    category: 'Sneakers',
    keywords: ['nike', 'yellow', 'black lines', 'streak', 'performance'],
    description: 'The Nike Yellow Streak is a bold statement piece. Featuring a vibrant yellow upper with sharp black lines, this shoe combines Nike\'s legendary comfort with an aggressive, high-energy design.',
    features: ['Vibrant yellow synthetic upper', 'Sleek black line accents', 'Responsive cushioning', 'High-traction rubber sole'],
    colors: ['Yellow/Black'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 18,
    name: 'Adidas Fusion',
    price: '₹2,999',
    originalPrice: '₹9,999',
    numericPrice: 2999,
    discountPercentage: 70,
    rating: 4.8,
    time: '2-3 Days',
    reviews: [
      { id: 20, user: 'Sanya G.', rating: 5, comment: 'The red and green combo is so unique! Very comfortable.', date: '2 days ago' }
    ],
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=500&q=80',
    category: 'Originals',
    keywords: ['adidas', 'fusion', 'red', 'green', 'colorful', 'three stripes'],
    description: 'The Adidas Fusion brings a vibrant pop of color to your wardrobe. This model features a striking red and green colorway, combining classic Adidas heritage with a modern, energetic twist.',
    features: ['Vibrant red and green upper', 'Classic three-stripe branding', 'Cushioned midsole for comfort', 'Durable rubber outsole'],
    colors: ['Red/Green'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  },
  {
    id: 19,
    name: 'Royal Oxford',
    price: '₹1,500',
    originalPrice: '₹10,000',
    numericPrice: 1500,
    discountPercentage: 85,
    rating: 4.9,
    time: 'Next Day',
    reviews: [
      { id: 21, user: 'Vikram A.', rating: 5, comment: 'Unbelievable deal for such quality leather!', date: 'Today' }
    ],
    image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&w=800&q=80',
    category: 'Formal',
    keywords: ['formal', 'oxford', 'leather', 'royal', 'discount'],
    description: 'The Royal Oxford is the pinnacle of formal elegance. Handcrafted from premium full-grain leather, these shoes offer a timeless silhouette that commands respect in any boardroom or black-tie event.',
    features: ['Full-grain premium leather', 'Hand-stitched detailing', 'Breathable leather lining', 'Anti-fatigue cushioned insole'],
    colors: ['Midnight Black', 'Oxford Brown'],
    sizes: ['IND 7', 'IND 8', 'IND 9', 'IND 10', 'IND 11']
  }
];

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState<any>(null);
  const [backendStatus, setBackendStatus] = useState<string>('Checking...');

  useEffect(() => {
    fetch('/api/health')
      .then(res => res.json())
      .then(data => setBackendStatus(data.message))
      .catch(() => setBackendStatus('Backend connection failed'));
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return FEATURED_PRODUCTS;
    const query = searchQuery.toLowerCase();
    return FEATURED_PRODUCTS.filter(product => 
      product.name.toLowerCase().includes(query) ||
      product.category.toLowerCase().includes(query) ||
      product.keywords.some(k => k.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const handleBuyNow = (product: any) => {
    if (!address) {
      setIsAddressModalOpen(true);
      return;
    }

    const taxRate = 0.18; // 18% GST
    const deliveryCharge = 150;
    const tax = Math.round(product.numericPrice * taxRate);
    const total = product.numericPrice + tax + deliveryCharge;

    const details = [
      `Item: ${product.name}`,
      product.selectedColor ? `Color: ${product.selectedColor}` : null,
      product.selectedSize ? `Size: ${product.selectedSize}` : null,
      `Price: ₹${product.numericPrice.toLocaleString()}`,
      `Tax (18% GST): ₹${tax.toLocaleString()}`,
      `Delivery: ₹${deliveryCharge.toLocaleString()}`,
      `Total: ₹${total.toLocaleString()}`,
      `Address: ${address.fullName}, ${address.city}`
    ].filter(Boolean).join('\n');

    toast.success(`Order Placed Successfully!`, {
      description: details,
      duration: 6000,
    });
  };

  const handleAddToCart = (product: any) => {
    setCartItems(prev => {
      const existing = prev.find(item => 
        item.id === product.id && 
        item.selectedColor === product.selectedColor && 
        item.selectedSize === product.selectedSize
      );
      if (existing) {
        return prev.map(item => 
          (item.id === product.id && 
           item.selectedColor === product.selectedColor && 
           item.selectedSize === product.selectedSize) 
          ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    const description = [
      `${product.name} has been added to your shopping bag.`,
      product.selectedColor || product.selectedSize ? `(${[product.selectedColor, product.selectedSize].filter(Boolean).join(', ')})` : null
    ].filter(Boolean).join(' ');

    toast.success(`Added to cart!`, {
      description,
    });
  };

  const updateCartQuantity = (itemToUpdate: any, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (
        item.id === itemToUpdate.id && 
        item.selectedColor === itemToUpdate.selectedColor && 
        item.selectedSize === itemToUpdate.selectedSize
      ) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (itemToRemove: any) => {
    setCartItems(prev => prev.filter(item => 
      !(item.id === itemToRemove.id && 
        item.selectedColor === itemToRemove.selectedColor && 
        item.selectedSize === itemToRemove.selectedSize)
    ));
    toast.info('Item removed from cart');
  };

  const handleCheckout = () => {
    if (!address) {
      setIsAddressModalOpen(true);
      return;
    }
    
    toast.success('Order Placed Successfully!', {
      description: `Your order will be delivered to ${address.fullName} at ${address.city}.`,
    });
    setIsCartOpen(false);
    setCartItems([]);
  };
  
  const handleShare = async (product: any) => {
    const shareData = {
      title: `Foot Rush - ${product.name}`,
      text: `Check out these ${product.name} at Foot Rush! Only ${product.price}.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        toast.success('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFDE7] font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Header 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenSearch={() => setIsSearchOpen(true)}
      />
      
      <main>
        <Hero />

        {/* About Section */}
        <section id="about" className="py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
              <div className="lg:w-1/2 relative">
                <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img 
                    src="https://images.unsplash.com/photo-1449247709967-d4461a6a6103?auto=format&fit=crop&w=800&q=80" 
                    alt="Foot Rush Workshop" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-emerald-50 rounded-full -z-10 blur-2xl opacity-60" />
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-emerald-100/50 rounded-full -z-10 blur-3xl opacity-40" />
              </div>

              <div className="lg:w-1/2 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold tracking-wide uppercase">
                  <Sparkles className="w-4 h-4" />
                  Our Story
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Elevating Every Step with <span className="text-emerald-600">Passion & Precision</span>
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Founded in 2020, Foot Rush began with a simple mission: to provide shoe enthusiasts with a one-stop destination for premium footwear and professional-grade restoration services. 
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-4">
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center shadow-lg">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900">Quality First</h4>
                    <p className="text-sm text-gray-500">We source only the finest materials and employ expert artisans for every restoration.</p>
                  </div>
                  <div className="space-y-3">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900">Pan-India Presence</h4>
                    <p className="text-sm text-gray-500">With 15+ service centers across India, we're always close to your favorite pairs.</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 flex items-center gap-6">
                  <div>
                    <p className="text-3xl font-bold text-gray-900">100k+</p>
                    <p className="text-sm text-gray-500">Happy Customers</p>
                  </div>
                  <div className="w-px h-12 bg-gray-200" />
                  <div>
                    <p className="text-3xl font-bold text-gray-900">4.9/5</p>
                    <p className="text-sm text-gray-500">Average Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-[#FFF9C4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-gray-900">Shop by Category</h2>
                <p className="text-gray-500">Find the perfect pair or the right care</p>
              </div>
              <button className="text-emerald-600 font-bold flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {['Sneakers', 'Boots', 'Athletic', 'Shoe Care', 'Formal', 'Accessories'].map((cat, i) => (
                <motion.div
                  key={cat}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-center cursor-pointer group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-colors">
                    <span className="text-2xl group-hover:scale-110 transition-transform">
                      {['👟', '🥾', '🏃', '🧼', '👞', '🧦'][i]}
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">{cat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Section */}
        <section id="shop" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
              <div className="space-y-2">
                <h2 className="text-4xl font-bold text-gray-900">Featured Products & Services</h2>
                <p className="text-gray-500 max-w-xl">
                  Discover our curated selection of premium footwear and professional restoration services.
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-96 group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400 group-focus-within:text-emerald-600 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Search products or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-12 pr-12 py-4 bg-white border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <AnimatePresence mode="popLayout">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                      className="group bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:shadow-xl transition-all"
                    >
                      <div className="relative h-56 overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleShare(product);
                            }}
                            className="p-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-600 hover:text-emerald-600 shadow-sm transition-all"
                            title="Share product"
                          >
                            <Share2 className="w-4 h-4" />
                          </button>
                          <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-emerald-600 flex items-center gap-1 shadow-sm">
                            <Star className="w-3 h-3 fill-emerald-600" />
                            {product.rating}
                            <span className="text-[10px] text-gray-400 font-medium ml-0.5">({product.reviews?.length || 0})</span>
                          </div>
                          {product.discountPercentage && (
                            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm">
                              {product.discountPercentage}% OFF
                            </div>
                          )}
                        </div>
                        <div className="absolute bottom-4 left-4 bg-gray-900/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">
                          {product.category}
                        </div>
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-gray-900 text-lg leading-tight">{product.name}</h3>
                          <div className="text-right">
                            <div className="text-emerald-600 font-bold">{product.price}</div>
                            {product.originalPrice && (
                              <div className="text-xs text-gray-400 line-through">{product.originalPrice}</div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {product.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <ShieldCheck className="w-4 h-4" />
                            Guaranteed
                          </div>
                        </div>
                        <div className="flex flex-col gap-3">
                          <div className="flex gap-3">
                            <button 
                              onClick={() => setSelectedProduct(product)}
                              className="flex-1 py-3 bg-gray-50 hover:bg-gray-100 text-gray-900 font-bold rounded-xl transition-all"
                            >
                              Details
                            </button>
                            <button 
                              onClick={() => handleBuyNow(product)}
                              className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                              Buy Now
                            </button>
                          </div>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="w-full py-3 border border-emerald-600 text-emerald-600 hover:bg-emerald-50 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 space-y-4"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">No results found</h3>
                <p className="text-gray-500">We couldn't find anything matching "{searchQuery}"</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-emerald-600 font-bold hover:underline"
                >
                  Clear search
                </button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-20 bg-emerald-600 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                  Professional Shoe Care for Every Step
                </h2>
                <p className="text-emerald-50 text-lg leading-relaxed">
                  Don't let dirt dull your style. Our expert restoration team uses premium techniques to bring your favorite pairs back to life.
                </p>
                <div className="space-y-6">
                  {[
                    { title: 'Deep Cleaning', desc: 'Removal of stubborn stains and dirt from all materials.' },
                    { title: 'Color Restoration', desc: 'Revive faded colors and fix scuffs with precision.' },
                    { title: 'Protection Shield', desc: 'Advanced water and stain repellent application.' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xl">{item.title}</h4>
                        <p className="text-emerald-100">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <div className="aspect-square rounded-[3rem] overflow-hidden rotate-3 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&w=800&q=80"
                    alt="Shoe Cleaning Process"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-3xl shadow-xl text-gray-900 hidden md:block">
                  <p className="text-4xl font-bold text-emerald-600 mb-1">50k+</p>
                  <p className="font-bold">Pairs Restored</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <BrandReferral />

        {/* Newsletter Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-900 rounded-[3rem] p-8 md:p-16 text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent)]" />
              <h2 className="text-3xl md:text-4xl font-bold text-white relative z-10">
                Join the <span className="text-emerald-600">Foot Rush</span> Community
              </h2>
              <p className="text-gray-400 max-w-md mx-auto relative z-10">
                Get exclusive drops, care tips, and 15% off your first restoration service.
              </p>
              <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white focus:outline-none focus:border-emerald-600 transition-colors"
                />
                <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all">
                  Join Now
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer status={backendStatus} />
      
      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onBuyNow={handleBuyNow}
        onAddToCart={handleAddToCart}
      />
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
        address={address}
        onEditAddress={() => setIsAddressModalOpen(true)}
      />
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setIsAddressModalOpen(false)}
        onSave={setAddress}
        initialAddress={address}
      />
      <SearchOverlay 
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={FEATURED_PRODUCTS}
        onSelectProduct={setSelectedProduct}
      />
      <Toaster position="top-center" richColors />
    </div>
  );
}

