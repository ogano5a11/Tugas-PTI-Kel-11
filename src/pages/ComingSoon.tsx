import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ComingSoon() {
  const navigate = useNavigate();
  // State untuk melacak apakah mouse ada di DALAM area kartu
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex flex-col items-center justify-center px-4 relative overflow-hidden">
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors z-20"
      >
        <ArrowLeft size={20} />
        Kembali
      </button>

      {/* Background Blobs (Hiasan) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-8 left-10 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 max-w-4xl w-full">
        {/* INI KARTU UTAMANYA 
            Pemicu mouse diletakkan di sini.
        */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          // Logika Class: Jika di-hover pakai gradien, jika tidak pakai putih. Tambah transition biar halus.
          className={`rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 cursor-default ${
            isHovered
              ? 'bg-gradient-to-r from-green-600 to-blue-600 transform scale-[1.02]' // Efek saat Hover
              : 'bg-white' // Efek Normal
          }`}
        >
          <div className="relative p-20 md:p-32 text-center">
            {/* Judul Utama */}
            <h1
              // Logika Warna Teks: Jika di-hover jadi putih, jika tidak jadi hitam
              className={`text-6xl md:text-7xl font-bold mb-6 transition-colors duration-300 ${
                isHovered ? 'text-white' : 'text-gray-900'
              }`}
            >
              Coming Soon
            </h1>

            {/* Subtitle 1 */}
            <p
              className={`text-xl md:text-2xl mb-8 transition-colors duration-300 ${
                isHovered ? 'text-green-50' : 'text-gray-600'
              }`}
            >
              Platform Mitra Beres.in sedang dalam pengembangan
            </p>

            {/* Subtitle 2 */}
            <p
              className={`text-lg transition-colors duration-300 ${
                isHovered ? 'text-green-100/90' : 'text-gray-500'
              }`}
            >
              Kami dengan senang hati mengumumkan bahwa fitur untuk mitra bisnis akan diluncurkan segera. Dapatkan akses eksklusif dan prioritas khusus!
            </p>
          </div>
        </div>

        {/* Kotak Form Notifikasi di bawahnya (Tidak ikut berubah) */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center relative z-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Daftar untuk Notifikasi
          </h2>
          <p className="text-gray-600 mb-6">
            Jadilah yang pertama tahu saat kami meluncurkan fitur mitra
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert('Terima kasih! Kami akan segera menghubungi Anda.');
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              placeholder="Email Anda"
              required
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium whitespace-nowrap"
            >
              Notifikasi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}