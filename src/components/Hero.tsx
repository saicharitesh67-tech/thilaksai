import { ArrowRight, Play, Star, Clock, ShieldCheck, Footprints } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50 -z-10" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              Premium Shoe Care & Footwear
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1]">
              Step Into Perfection. <span className="text-emerald-600">Rush</span> Your Style.
            </h1>
            
            <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
              From professional cleaning to the latest drops. We provide the ultimate care for your feet and your favorite pairs.
            </p>

            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 group">
                Shop Now
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-2xl border border-gray-200 transition-all flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                </div>
                Our Services
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-100">
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-emerald-600">
                  <Star className="w-4 h-4 fill-emerald-600" />
                  <span className="font-bold text-gray-900">4.9</span>
                </div>
                <p className="text-xs text-gray-500">Service Rating</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-emerald-600">
                  <Clock className="w-4 h-4" />
                  <span className="font-bold text-gray-900">24h</span>
                </div>
                <p className="text-xs text-gray-500">Express Care</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-1 text-emerald-600">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="font-bold text-gray-900">100%</span>
                </div>
                <p className="text-xs text-gray-500">Authentic</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-emerald-200/50">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80"
                alt="Premium Sneakers"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            
            {/* Floating Cards */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-50"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <Footprints className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Deep Clean</p>
                <p className="text-sm font-bold text-gray-900">Restoration</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-6 -left-6 z-20 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-gray-50"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Certified</p>
                <p className="text-sm font-bold text-gray-900">Authentic</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
