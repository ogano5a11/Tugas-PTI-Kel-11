import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Hero() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/kategori?search=${searchQuery}`);
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Semua Kebutuhan Rumah,{' '}
              <span className="text-green-600">Pasti Beres</span>
            </h1>
            <p className="text-lg text-gray-600">
              Temukan mitra terverifikasi untuk perbaikan, kebersihan, hingga
              renovasi. Aman, transparan, dan bergaransi.
            </p>
            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Service AC"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <button
                type="submit"
                className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
              >
                Cari
              </button>
            </form>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <img 
              src="/home_image.png" 
              alt="Ilustrasi layanan rumah dan kebersihan" 
              className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
