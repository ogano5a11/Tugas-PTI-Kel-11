import { Instagram, Twitter, Send } from 'lucide-react';
import { Link } from 'react-router-dom'; // Pastikan import ini ada

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* KOLOM 1: LOGO & SOSMED */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-4">Beres.in</h3>
            <p className="text-sm mb-4">Copyright © 2025 Beres.in.</p>
            <p className="text-sm mb-6">All rights reserved</p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/bahlillahadalia?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="https://x.com/HIDEO_KOJIMA_EN" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://www.tiktok.com/@pandawaragroup?is_from_webapp=1&sender_device=pc" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                </svg>
              </a>
            </div>
          </div>

          {/* KOLOM 2: COMPANY (Terms of service dipindah ke sini) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li>
                {/* About us -> Page About */}
                <Link to="/about" className="hover:text-white transition-colors">
                  About us
                </Link>
              </li>
              <li>
                {/* Contact us -> Page Bantuan */}
                <Link to="/bantuan" className="hover:text-white transition-colors">
                  Contact us
                </Link>
              </li>
              <li>
                {/* Pricing -> Page Kategori */}
                <Link to="/kategori" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            <li>
                {/* Gunakan a href agar browser melakukan scroll ke ID tersebut */}
                <a href="/#testimonials" className="hover:text-white transition-colors">
                  Testimonials
                </a>
              </li>
              {/* Terms of Service DIPINDAHKAN KE SINI & LINK KE PDF */}
              <li>
                <a 
                  href="/contoh_PDF.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  Terms of service
                </a>
              </li>
            </ul>
          </div>

{/* KOLOM 3: OFFICIAL PARTNERS (Dulu Support) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Official Partners</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.gojek.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Gojek Indonesia
                </a>
              </li>
              <li>
                <a 
                  href="https://www.grab.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Grab Indonesia
                </a>
              </li>
              <li>
                <a 
                  href="https://www.lalamove.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  Lalamove
                </a>
              </li>
            </ul>
          </div>

          {/* KOLOM 4: SUBSCRIBE */}
          <div>
            <h4 className="text-white font-semibold mb-4">Stay up to date</h4>
            <div className="relative">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 pr-12"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors">
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}