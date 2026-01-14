import { Link } from 'react-router-dom';
import { Wrench, Sparkles, Lamp, Home, TrendingUp, ChevronRight } from 'lucide-react';

const services = [
  // Tambahkan 'id' yang sesuai dengan ID kategori di data/services.ts Anda
  { id: 'perbaikan', icon: Wrench, name: 'Perbaikan', color: 'text-green-600' },
  { id: 'kebersihan', icon: Sparkles, name: 'Kebersihan', color: 'text-green-600' },
  { id: 'interior', icon: Lamp, name: 'Interior', color: 'text-green-600' }, // Pastikan ID ini ada di data kategori
  { id: 'renovasi', icon: Home, name: 'Renovasi', color: 'text-green-600' },
  { id: 'arsitektur', icon: TrendingUp, name: 'Arsitektur', color: 'text-green-600' },
];

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Layanan Populer Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Temukan mitra terverifikasi untuk setiap kebutuhan rumah Anda
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {services.map((service, index) => (
            <Link
              key={index}
              // UBAH DI SINI: Kirim parameter category lewat URL
              to={`/kategori?category=${service.id}`}
              className="flex flex-col items-center gap-3 group cursor-pointer"
            >
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
                <service.icon className={`${service.color} w-8 h-8`} />
              </div>
              <span className="text-gray-700 font-medium">{service.name}</span>
            </Link>
          ))}
          
          {/* Tombol Lainnya tetap ke 'Semua' */}
          <Link
            to="/kategori?category=semua"
            className="flex flex-col items-center gap-3 group cursor-pointer"
          >
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center group-hover:bg-green-100 transition-colors">
              <ChevronRight className="text-green-600 w-8 h-8" />
            </div>
            <span className="text-green-600 font-medium">Lainnya</span>
          </Link>
        </div>
      </div>
    </section>
  );
}