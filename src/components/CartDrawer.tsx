import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, MapPin, Edit2 } from 'lucide-react';

interface Address {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'home' | 'work';
}

interface CartItem {
  id: number;
  name: string;
  price: string;
  numericPrice: number;
  originalPrice?: string;
  discountPercentage?: number;
  image: string;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (item: CartItem, delta: number) => void;
  onRemove: (item: CartItem) => void;
  onCheckout: () => void;
  address: Address | null;
  onEditAddress: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
  address,
  onEditAddress,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.numericPrice * item.quantity, 0);
  const tax = Math.round(subtotal * 0.18);
  const delivery = items.length > 0 ? 150 : 0;
  const total = subtotal + tax + delivery;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#FFFDE7] shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Your Cart</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <ShoppingBag className="w-10 h-10 text-gray-300" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-gray-900">Your cart is empty</h3>
                    <p className="text-gray-500 text-sm">Looks like you haven't added anything yet.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-emerald-600 font-bold hover:underline"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 leading-tight">{item.name}</h4>
                        <button
                          onClick={() => onRemove(item)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-emerald-600 font-bold">₹{item.numericPrice.toLocaleString()}</p>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">{item.originalPrice}</span>
                        )}
                      </div>
                      
                      {(item.selectedColor || item.selectedSize) && (
                        <div className="flex gap-2">
                          {item.selectedColor && (
                            <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded-full text-gray-700">
                              Color: {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="text-[10px] font-bold bg-emerald-50 px-2 py-0.5 rounded-full text-emerald-700">
                              Size: {item.selectedSize}
                            </span>
                          )}
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => onUpdateQuantity(item, -1)}
                            className="p-1 hover:bg-gray-50 text-gray-500 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-sm font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item, 1)}
                            className="p-1 hover:bg-gray-50 text-gray-500 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Summary */}
            {items.length > 0 && (
              <div className="p-6 bg-gray-50 border-t border-gray-100 space-y-4">
                {/* Address Section */}
                <div className="bg-white p-4 rounded-2xl border border-gray-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      <span className="text-sm">Delivery Address</span>
                    </div>
                    <button 
                      onClick={onEditAddress}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <Edit2 className="w-3 h-3" />
                      {address ? 'Change' : 'Add Address'}
                    </button>
                  </div>
                  
                  {address ? (
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-900">{address.fullName} • {address.phone}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {address.street}, {address.city}, {address.state} - {address.zipCode}
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 italic">Please add a delivery address to proceed</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Tax (18% GST)</span>
                    <span>₹{tax.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Delivery</span>
                    <span>₹{delivery.toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="text-xl font-bold text-emerald-600">₹{total.toLocaleString()}</span>
                  </div>
                </div>
                
                <button
                  onClick={onCheckout}
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 group"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
