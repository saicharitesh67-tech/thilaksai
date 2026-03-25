import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import { motion } from 'motion/react';
import { Camera, Upload, Send, Gift, Sparkles, X, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function BrandReferral() {
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [isReferralModalOpen, setIsReferralModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitRequest = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Request Submitted!", {
      description: "We'll look for this brand and get back to you soon.",
    });
    setIsRequestModalOpen(false);
    setSelectedImage(null);
  };

  const handleSubmitReferral = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Referral Claimed!", {
      description: "Your reward will be credited after verification.",
    });
    setIsReferralModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <section id="referral" className="py-24 bg-[#FFF9C4]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Brand Request Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-emerald-100/20 border border-emerald-50 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Camera className="w-24 h-24 text-emerald-600" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <Sparkles className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Can't find your brand?</h3>
                <p className="text-gray-500 mt-2">Upload a photo of the shoe you're looking for, and our experts will source it for you.</p>
              </div>
              <button
                onClick={() => setIsRequestModalOpen(true)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all flex items-center gap-2"
              >
                <Upload className="w-5 h-5" />
                Upload Photo
              </button>
            </div>
          </motion.div>

          {/* Referral Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="bg-emerald-900 p-8 rounded-[2.5rem] shadow-xl shadow-emerald-900/20 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
              <Gift className="w-24 h-24 text-white" />
            </div>
            
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-emerald-800 rounded-2xl flex items-center justify-center text-emerald-400">
                <Gift className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Refer & Earn Rewards</h3>
                <p className="text-emerald-100/70 mt-2">Share Foot Rush with friends. Upload a screenshot of your referral to claim exclusive discounts.</p>
              </div>
              <button
                onClick={() => setIsReferralModalOpen(true)}
                className="px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-900 font-bold rounded-xl transition-all flex items-center gap-2"
              >
                <Send className="w-5 h-5" />
                Claim Reward
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Brand Request Modal */}
      {isRequestModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsRequestModalOpen(false)} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] p-8 shadow-2xl"
          >
            <button onClick={() => setIsRequestModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Request a Brand</h2>
            <p className="text-gray-500 mb-6 text-sm">Our team will identify the shoe and notify you once it's available.</p>
            
            <form onSubmit={handleSubmitRequest} className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden relative"
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Camera className="w-10 h-10 text-gray-300 mb-2" />
                    <p className="text-sm font-medium text-gray-400">Click to upload photo</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Brand Name (If known)</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="e.g. Balenciaga, Yeezy..."
                />
              </div>

              <button
                type="submit"
                disabled={!selectedImage}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20"
              >
                Submit Request
              </button>
            </form>
          </motion.div>
        </div>
      )}

      {/* Referral Modal */}
      {isReferralModalOpen && (
        <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setIsReferralModalOpen(false)} />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md bg-white rounded-[2rem] p-8 shadow-2xl"
          >
            <button onClick={() => setIsReferralModalOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Claim Referral Reward</h2>
            <p className="text-gray-500 mb-6 text-sm">Upload a screenshot of your referral share or code to get your reward.</p>
            
            <form onSubmit={handleSubmitReferral} className="space-y-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="aspect-video bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors overflow-hidden relative"
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <>
                    <Upload className="w-10 h-10 text-gray-300 mb-2" />
                    <p className="text-sm font-medium text-gray-400">Upload screenshot</p>
                  </>
                )}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleImageUpload} 
                  className="hidden" 
                  accept="image/*"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Referral Code</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 transition-all"
                  placeholder="e.g. RUSH500"
                />
              </div>

              <button
                type="submit"
                disabled={!selectedImage}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-200 text-white font-bold rounded-xl transition-all shadow-lg shadow-emerald-600/20"
              >
                Claim Reward
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
}
