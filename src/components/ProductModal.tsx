import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Clock, ShieldCheck, ShoppingCart, Info, Check } from 'lucide-react';
import { useState, useEffect, FormEvent } from 'react';
import { toast } from 'sonner';

interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  numericPrice: number;
  discountPercentage?: number;
  rating: number;
  time: string;
  image: string;
  category: string;
  description?: string;
  features?: string[];
  colors?: string[];
  sizes?: string[];
  selectedColor?: string;
  selectedSize?: string;
  reviews?: Review[];
}

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onBuyNow: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export default function ProductModal({ product, onClose, onBuyNow, onAddToCart }: ProductModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || '');
      setSelectedSize(product.sizes?.[0] || '');
      setActiveTab('details');
    }
  }, [product]);

  if (!product) return null;

  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim()) return;
    
    // In a real app, this would be a database call
    toast.success("Review Submitted!", {
      description: "Thank you for sharing your experience.",
    });
    setNewReview({ rating: 5, comment: '' });
  };

  const sizeGuideData = [
    { ind: '6', cm: '24.5', uk: '6', us: '7' },
    { ind: '7', cm: '25.4', uk: '7', us: '8' },
    { ind: '8', cm: '26.2', uk: '8', us: '9' },
    { ind: '9', cm: '27.1', uk: '9', us: '10' },
    { ind: '10', cm: '27.9', uk: '10', us: '11' },
    { ind: '11', cm: '28.8', uk: '11', us: '12' },
  ];

  const defaultDescription = "Experience premium quality and expert craftsmanship with Foot Rush. This selection represents our commitment to excellence in footwear and shoe care.";
  const defaultFeatures = [
    "Premium materials and construction",
    "Expertly curated for style and comfort",
    "Professional grade quality",
    "Foot Rush satisfaction guarantee"
  ];

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md hover:bg-white rounded-full text-gray-900 shadow-lg transition-all"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Image Section */}
            <div className="md:w-1/2 h-64 md:h-auto relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-6 left-6 flex flex-col gap-2 items-start">
                <div className="bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  {product.category}
                </div>
                {product.discountPercentage && (
                  <div className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider">
                    {product.discountPercentage}% OFF
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 p-8 md:p-12 space-y-8 overflow-y-auto max-h-[70vh] md:max-h-none">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-bold text-gray-900 leading-tight">{product.name}</h2>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-emerald-600">{product.price}</div>
                    {product.originalPrice && (
                      <div className="text-sm text-gray-400 line-through">{product.originalPrice}</div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-bold">
                    <Star className="w-4 h-4 fill-emerald-700" />
                    {product.rating}
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Clock className="w-4 h-4" />
                    {product.time}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-100">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`px-6 py-3 text-sm font-bold transition-all relative ${
                    activeTab === 'details' ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Details
                  {activeTab === 'details' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 text-sm font-bold transition-all relative ${
                    activeTab === 'reviews' ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Reviews ({product.reviews?.length || 0})
                  {activeTab === 'reviews' && (
                    <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-600" />
                  )}
                </button>
              </div>

              {activeTab === 'details' ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <Info className="w-5 h-5 text-emerald-600" />
                      Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {product.description || defaultDescription}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-emerald-600" />
                      Key Features
                    </h3>
                    <ul className="grid grid-cols-1 gap-3">
                      {(product.features || defaultFeatures).map((feature, i) => (
                        <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {product.colors && product.colors.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="font-bold text-gray-900">Select Color</h3>
                      <div className="flex flex-wrap gap-3">
                        {product.colors.map((color) => (
                          <button
                            key={color}
                            onClick={() => setSelectedColor(color)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                              selectedColor === color
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-600'
                            }`}
                          >
                            {color}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {product.sizes && product.sizes.length > 0 && (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="font-bold text-gray-900">Select Size (IND)</h3>
                        <button 
                          onClick={() => setShowSizeGuide(true)}
                          className="text-xs text-emerald-600 font-bold hover:underline"
                        >
                          Size Guide
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`w-14 h-14 rounded-xl text-sm font-bold transition-all border flex items-center justify-center ${
                              selectedSize === size
                                ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-600/20'
                                : 'bg-white border-gray-200 text-gray-600 hover:border-emerald-600'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  {/* Review Form */}
                  <div className="bg-gray-50 p-6 rounded-2xl space-y-4">
                    <h4 className="font-bold text-gray-900">Write a Review</h4>
                    <form onSubmit={handleAddReview} className="space-y-4">
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({ ...newReview, rating: star })}
                            className={`p-1 transition-colors ${
                              star <= newReview.rating ? 'text-emerald-600' : 'text-gray-300'
                            }`}
                          >
                            <Star className={`w-6 h-6 ${star <= newReview.rating ? 'fill-emerald-600' : ''}`} />
                          </button>
                        ))}
                      </div>
                      <textarea
                        value={newReview.comment}
                        onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                        placeholder="Share your experience with this product..."
                        className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all min-h-[100px] text-sm"
                      />
                      <button
                        type="submit"
                        className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                      >
                        Post Review
                      </button>
                    </form>
                  </div>

                  {/* Reviews List */}
                  <div className="space-y-6">
                    {product.reviews && product.reviews.length > 0 ? (
                      product.reviews.map((review) => (
                        <div key={review.id} className="space-y-2 pb-6 border-b border-gray-100 last:border-0">
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <p className="font-bold text-gray-900">{review.user}</p>
                              <div className="flex gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < review.rating ? 'text-emerald-600 fill-emerald-600' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-xs text-gray-400">{review.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 leading-relaxed">{review.comment}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Price Breakdown */}
              <div className="bg-gray-50 p-6 rounded-2xl space-y-3">
                {product.originalPrice && (
                  <div className="flex justify-between text-sm text-gray-500 line-through">
                    <span>Original Price</span>
                    <span>{product.originalPrice}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{product.originalPrice ? 'Discounted Price' : 'Base Price'}</span>
                  <span>₹{product.numericPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Tax (18% GST)</span>
                  <span>₹{Math.round(product.numericPrice * 0.18).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Delivery Charges</span>
                  <span>₹150</span>
                </div>
                <div className="pt-3 border-t border-gray-200 flex justify-between font-bold text-gray-900">
                  <span>Total Amount</span>
                  <span className="text-emerald-600">₹{(product.numericPrice + Math.round(product.numericPrice * 0.18) + 150).toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => onAddToCart({ ...product, selectedColor, selectedSize })}
                  className="flex-1 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button 
                  onClick={() => {
                    onBuyNow({ ...product, selectedColor, selectedSize });
                    onClose();
                  }}
                  className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>

          {/* Size Guide Overlay */}
          <AnimatePresence>
            {showSizeGuide && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowSizeGuide(false)}
                  className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 space-y-6"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold text-gray-900">Size Guide (IND)</h3>
                    <button 
                      onClick={() => setShowSizeGuide(false)}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>

                  <div className="overflow-hidden rounded-2xl border border-gray-100">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-50 text-gray-500 font-bold uppercase text-[10px] tracking-wider">
                        <tr>
                          <th className="px-4 py-3">IND</th>
                          <th className="px-4 py-3">CM</th>
                          <th className="px-4 py-3">UK</th>
                          <th className="px-4 py-3">US</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {sizeGuideData.map((row) => (
                          <tr key={row.ind} className="hover:bg-emerald-50/30 transition-colors">
                            <td className="px-4 py-3 font-bold text-gray-900">{row.ind}</td>
                            <td className="px-4 py-3 text-gray-600">{row.cm}</td>
                            <td className="px-4 py-3 text-gray-600">{row.uk}</td>
                            <td className="px-4 py-3 text-gray-600">{row.us}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-gray-500 italic">
                    * Measurements are approximate. For the best fit, we recommend measuring your foot from heel to toe.
                  </p>

                  <button
                    onClick={() => setShowSizeGuide(false)}
                    className="w-full py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20"
                  >
                    Got it
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}
