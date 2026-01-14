import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import { Target, Heart, Shield, Zap } from 'lucide-react';
import gsap from 'gsap';

export default function About() {
  const pageRef = useRef(null);
  const navigate = useNavigate(); // 2. Inisialisasi hook navigasi

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Tentang <span className="text-green-600">Beres.in</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform digital terpercaya yang menghubungkan pemilik rumah dengan
            para profesional jasa terbaik di Indonesia
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Misi Kami
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Kami percaya bahwa setiap orang berhak mendapatkan layanan berkualitas
              tinggi dengan harga yang terjangkau. Beres.in hadir untuk menyederhanakan
              proses pencarian dan penyelesaian pekerjaan rumah, dari perbaikan kecil
              hingga renovasi besar.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Dengan sistem verifikasi yang ketat dan platform pembayaran yang aman,
              kami memastikan setiap transaksi memberikan kepuasan maksimal bagi kedua
              belah pihak.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { icon: Target, label: 'Fokus', value: '100%' },
              { icon: Heart, label: 'Kepuasan', value: '25K+' },
              { icon: Shield, label: 'Aman', value: 'Escrow' },
              { icon: Zap, label: 'Cepat', value: '2 Jam' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-green-600" size={24} />
                </div>
                <p className="text-gray-600 text-sm mb-2">{item.label}</p>
                <p className="text-2xl font-bold text-gray-900">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-200 rounded-3xl p-12 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Nilai-Nilai Kami
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Transparansi',
                description:
                  'Semua harga, biaya, dan terms jelas sejak awal tanpa biaya tersembunyi.',
              },
              {
                title: 'Kualitas',
                description:
                  'Kami hanya bekerja dengan mitra yang telah lulus verifikasi ketat dan berpengalaman.',
              },
              {
                title: 'Kepercayaan',
                description:
                  'Sistem pembayaran escrow kami melindungi dana Anda hingga pekerjaan selesai memuaskan.',
              },
              {
                title: 'Inovasi',
                description:
                  'Kami terus mengembangkan fitur baru untuk membuat pengalaman lebih mudah dan cepat.',
              },
              {
                title: 'Dukungan',
                description:
                  'Tim customer support kami siap membantu 24/7 untuk memastikan kepuasan Anda.',
              },
              {
                title: 'Keadilan',
                description:
                  'Kami percaya pada keseimbangan win-win antara pelanggan dan mitra profesional.',
              },
            ].map((value, i) => (
              <div key={i} className="bg-white rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
        <img 
            src="/Business vision.png" 
            alt="Ilustrasi layanan rumah dan kebersihan" 
            className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"/>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">
              Visi untuk Indonesia
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Kami bermimpi menjadi platform nomor satu di Indonesia yang menghubungkan
              jutaan pemilik rumah dengan ribuan profesional jasa terbaik. Dengan teknologi
              dan inovasi, kami ingin membuat Indonesia lebih rapi, lebih nyaman, dan lebih
              berkualitas.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Beres.in adalah lebih dari sekadar platform—kami adalah mitra terpercaya
              dalam mewujudkan rumah impian Anda.
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Bergabunglah dengan Ribuan Pelanggan Puas
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Percayakan kebutuhan rumah Anda kepada kami. Kami siap memberikan solusi terbaik.
          </p>
          
          {/* 3. Tambahkan onClick untuk navigasi ke Coming Soon */}
          <button 
            onClick={() => navigate('/coming-soon')}
            className="bg-white text-green-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-bold text-lg"
          >
            Mulai Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}