import { motion, AnimatePresence } from 'motion/react';
import { Search, X, ArrowRight, Camera, Upload } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { toast } from 'sonner';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  products: any[];
  onSelectProduct: (product: any) => void;
}

export default function SearchOverlay({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const filtered = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase()) ||
        p.keywords.some((k: string) => k.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/80 backdrop-blur-md"
          />
          
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="relative max-w-2xl mx-auto mt-20 px-4"
          >
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-6 border-b border-gray-100 relative">
                <Search className="absolute left-10 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald-600" />
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for shoes, care services..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-14 pr-24 py-4 text-xl bg-transparent text-gray-900 placeholder-gray-400 focus:outline-none"
                />
                <div className="absolute right-8 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <button
                    onClick={() => {
                      toast.info("Photo Search", {
                        description: "This feature is coming soon! Use the 'Brand Request' section below for now.",
                      });
                    }}
                    className="p-2 hover:bg-emerald-50 rounded-full text-emerald-600 transition-colors"
                    title="Search by photo"
                  >
                    <Camera className="w-6 h-6" />
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {query.trim() === '' ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                      <Search className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-gray-900 font-bold">What are you looking for?</p>
                      <p className="text-gray-500 text-sm">Search by name, category, or brand</p>
                    </div>
                  </div>
                ) : filtered.length > 0 ? (
                  <div className="space-y-2">
                    <p className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Search Results</p>
                    {filtered.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="w-full flex items-center gap-4 p-4 hover:bg-emerald-50 rounded-2xl transition-all group text-left"
                      >
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">{product.name}</h4>
                          <p className="text-sm text-gray-500">
                            {product.category} • {product.price}
                            {product.discountPercentage && (
                              <span className="ml-2 text-red-600 font-bold">-{product.discountPercentage}%</span>
                            )}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto text-gray-300">
                      <X className="w-8 h-8" />
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-gray-900 font-bold">No results found</p>
                        <p className="text-gray-500 text-sm">Try searching for something else</p>
                      </div>
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Or try another way</p>
                        <button 
                          onClick={() => {
                            onClose();
                            window.scrollTo({ top: document.body.scrollHeight / 2, behavior: 'smooth' });
                            toast.info("Scroll down to 'Brand Request' to upload a photo!");
                          }}
                          className="w-full py-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                        >
                          <Upload className="w-5 h-5" />
                          Request Brand with Photo
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {query.trim() !== '' && filtered.length > 0 && (
                <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                  <button 
                    onClick={onClose}
                    className="text-sm font-bold text-emerald-600 hover:underline"
                  >
                    View all results in shop
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
