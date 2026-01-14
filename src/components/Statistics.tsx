import { useState, useEffect } from 'react';
import { Users, Star, CheckCircle, Home, ChevronDown, ChevronUp } from 'lucide-react';

const stats = [
  { icon: Users, value: '1.500+', label: 'Mitra Terverifikasi', color: 'text-green-600' },
  { icon: Star, value: '4.8/5', label: 'Rating Layanan', color: 'text-green-600' },
  { icon: CheckCircle, value: '25.000+', label: 'Pekerjaan Selesai', color: 'text-green-600' },
  { icon: Home, value: '10.000+', label: 'Pemilik Rumah Terbantu', color: 'text-green-600' },
];

const reviews = [
  {
    name: 'Rini Wulandari',
    location: 'Jakarta Selatan',
    text: 'Dulu pusing sekali cari tukang renovasi yang jujur. Lewat Beres.in, saya dapat mitra yang terverifikasi.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80',
    rating: 5,
  },
  {
    name: 'Budi Santoso',
    location: 'Jakarta Timur',
    text: 'Pelayanan sangat memuaskan, proses pembayaran aman dan terpercaya. Rekomendasi banget!',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
    rating: 5,
  },
  {
    name: 'Siti Aminah',
    location: 'Bandung',
    text: 'Sangat terbantu untuk bersihin rumah pasca renovasi. Tukangnya sopan dan kerjanya cepat.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&q=80',
    rating: 5,
  },
  {
    name: 'Ahmad Rizki',
    location: 'Surabaya',
    text: 'Platform terbaik untuk cari jasa service AC. Teknisi datang tepat waktu dan transparan soal harga.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
    rating: 4,
  },
  {
    name: 'Dewi Sartika',
    location: 'Tangerang',
    text: 'Fitur garansinya bikin tenang. Kalau ada kerjaan kurang rapi, bisa langsung klaim perbaikan.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80',
    rating: 5,
  },
  {
    name: 'Fajar Nugraha',
    location: 'Bekasi',
    text: 'Aplikasi mudah digunakan, UI-nya simpel tapi fiturnya lengkap. Sukses terus Beres.in!',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
    rating: 5,
  },
  {
    name: 'Jessica Tan',
    location: 'Jakarta Barat',
    text: 'Cleaning service langganan saya di sini. Selalu bersih dan detail ngerjainnya.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80',
    rating: 5,
  },
  {
    name: 'Kevin Wijaya',
    location: 'Medan',
    text: 'Solusi tepat buat anak kosan kayak saya yang gak sempet nyuci baju atau bersihin kamar.',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80',
    rating: 4,
  },
  {
    name: 'Maya Putri',
    location: 'Yogyakarta',
    text: 'Harganya bersaing banget dibanding kompetitor sebelah. Kualitas mitranya juga oke punya.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&q=80',
    rating: 5,
  },
];

export default function Statistics() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // LOGIKA AUTO SLIDE SETIAP 5 DETIK
  useEffect(() => {
    // Jika sedang mode "Lihat Semua" atau mouse sedang "Hover", hentikan timer
    if (isExpanded || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // Jika sudah di akhir data, kembali ke awal (Looping)
        // Di Desktop kita kurangi 3 agar tidak ada ruang kosong berlebih di akhir
        const maxIndex = window.innerWidth >= 768 ? reviews.length - 3 : reviews.length - 1;
        return prevIndex >= maxIndex ? 0 : prevIndex + 1;
      });
    }, 5000); // 5000ms = 5 detik

    return () => clearInterval(timer);
  }, [isExpanded, isPaused]);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BAGIAN ATAS: STATISTICS */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Angka di Balik <br />
              <span className="text-green-600">Ketenangan Anda</span>
            </h2>
            <p className="text-gray-600 text-lg">
              Kami serius dalam memverifikasi mitra dan menjaga kualitas layanan demi kepuasan Anda.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div>
                   <stat.icon className={`${stat.color} w-12 h-12`} />
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BAGIAN BAWAH: TESTIMONI */}
        {/* BAGIAN BAWAH: TESTIMONI */}
        <div 
          id="testimonials" 
          className="space-y-6 border-t border-gray-100 pt-16 scroll-mt-24">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900">
              Kata Mereka <span className='text-green-600'>Tentang Kami</span>
            </h3>
            <p className="text-gray-500 mt-2">Cerita asli dari pelanggan yang puas</p>
          </div>

          {/* CONTAINER TESTIMONI */}
          <div 
            // Event Pause saat Hover
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="relative overflow-hidden"
          >
            <div 
              className={`
                transition-transform duration-700 ease-in-out
                ${isExpanded ? 'grid md:grid-cols-3 gap-6 transform-none' : 'flex'}
              `}
              style={{
                // Logika Geser: 
                // Jika Expand mati -> Geser berdasarkan currentIndex
                // Di HP geser 100%, di Desktop geser 33.33% (karena muat 3 kartu)
                transform: !isExpanded 
                  ? `translateX(-${currentIndex * (window.innerWidth >= 768 ? 33.33 : 100)}%)` 
                  : 'none'
              }}
            >
              {reviews.map((review, index) => (
                <div 
                  key={index} 
                  className={`
                    flex-shrink-0 px-3 transition-all duration-500
                    ${isExpanded ? 'w-full' : 'w-full md:w-1/3'}
                  `}
                >
                  <div className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow h-full">
                    <div className="flex items-center gap-4 mb-4">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-14 h-14 rounded-full object-cover border-2 border-green-600"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <p className="text-sm text-gray-500">{review.location}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-yellow-400 fill-yellow-400"
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 text-sm leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* INDIKATOR TITIK (DOTS) - Hanya muncul saat mode slide */}
          {!isExpanded && (
            <div className="flex justify-center gap-2 mt-6">
              {reviews.slice(0, window.innerWidth >= 768 ? reviews.length - 2 : reviews.length).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === index ? 'w-8 bg-green-600' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* TOMBOL LIHAT SEMUA / TUTUP */}
        <div className="text-center mt-10">
          <button
            onClick={() => {
              setIsExpanded(!isExpanded);
              setCurrentIndex(0); // Reset ke awal saat ganti mode
            }}
            className="inline-flex items-center text-green-600 hover:text-green-700 font-medium px-6 py-2 rounded-full hover:bg-green-50 transition-colors"
          >
            {isExpanded ? (
                <>
                  Tutup sebagian
                  <ChevronUp className="w-5 h-5 ml-2" />
                </>
            ) : (
                <>
                  Lihat semua testimoni ({reviews.length})
                  <ChevronDown className="w-5 h-5 ml-2" />
                </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}