import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Logo variant="light" className="scale-110 origin-left" />
            <p className="text-sm leading-relaxed">
              Premium shoe care and exclusive footwear destination. We keep your steps fresh and your style ahead.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-gray-800 hover:bg-emerald-600 hover:text-white rounded-full transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-emerald-600 hover:text-white rounded-full transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-emerald-600 hover:text-white rounded-full transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-gray-800 hover:bg-emerald-600 hover:text-white rounded-full transition-all">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Home</a></li>
              <li><a href="#about" className="hover:text-emerald-600 transition-colors">About Us</a></li>
              <li><a href="#shop" className="hover:text-emerald-600 transition-colors">Shop All</a></li>
              <li><a href="#services" className="hover:text-emerald-600 transition-colors">Shoe Care Services</a></li>
              <li><a href="#referral" className="hover:text-emerald-600 transition-colors">Brand Request</a></li>
              <li><a href="#referral" className="hover:text-emerald-600 transition-colors">Referral Program</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Store Locator</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-bold mb-6">Support</h3>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Authenticity Guarantee</a></li>
              <li><a href="#" className="hover:text-emerald-600 transition-colors">Contact Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>456 Sneaker Way, Footwear District, FD 12345</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>+1 (555) 987-6543</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>support@footrush.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} Foot Rush Shoecare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
