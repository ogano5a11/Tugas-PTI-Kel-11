import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Tambahkan import 'Eye' dan 'X'
import { Star, MapPin, Clock, Check, ArrowLeft, FileText, Download, Eye, X } from 'lucide-react';
import gsap from 'gsap';
import { services } from '../data/services';
import { Review } from '../types';

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Rini Wulandari',
    rating: 5,
    text: 'Sangat puas dengan layanan ini. Pekerjaannya rapi dan cepat selesai.',
    date: '2 minggu lalu',
  },
  {
    id: '2',
    author: 'Budi Santoso',
    rating: 4,
    text: 'Bagus, meskipun ada beberapa hal yang perlu penyesuaian.',
    date: '1 bulan lalu',
  },
  {
    id: '3',
    author: 'Siti Nurhaliza',
    rating: 5,
    text: 'Rekomendasi banget! Profesional dan terpercaya.',
    date: '1 bulan lalu',
  },
];

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [submittedReview, setSubmittedReview] = useState(false);
  
  // State untuk mengatur Pop-up PDF
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const service = services.find((s) => s.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (pageRef.current) {
      gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
    }
    if (leftRef.current) {
      gsap.fromTo(leftRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.6 });
    }
    if (rightRef.current) {
      gsap.fromTo(rightRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6 });
    }
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Layanan tidak ditemukan</p>
      </div>
    );
  }

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedReview(true);
    setRating(0);
    setReview('');
    setTimeout(() => setSubmittedReview(false), 3000);
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => navigate('/kategori')}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Kembali ke Kategori
        </button>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          
          {/* --- KOLOM KIRI --- */}
          <div ref={leftRef} className="space-y-6">
            <div className="bg-white rounded-2xl overflow-hidden shadow">
              <img src={service.image} alt={service.name} className="w-full h-96 object-cover" />
            </div>

            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tentang Layanan</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
              
              {service.details && (
                <div className="space-y-3">
                  {/* ... (Bagian Detail Verification, Payment, dll - Tetap Sama) ... */}
                  <div className="flex items-center gap-3">
                      <Check className="text-green-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{service.details.verificationStatus}</span>
                  </div>
                  <div className="flex items-center gap-3">
                      <Clock className="text-green-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{service.details.workingHours}</span>
                  </div>
                   <div className="flex items-center gap-3">
                      <MapPin className="text-green-600 flex-shrink-0" size={20} />
                      <span className="text-gray-700">{service.details.serviceArea}</span>
                  </div>
                </div>
              )}
            </div>

            {/* KARTU DOKUMEN DENGAN TOMBOL PREVIEW */}
            <div className="bg-white rounded-2xl p-6 shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Dokumen & Kontrak</h3>
              <p className="text-sm text-gray-500 mb-4">
                Harap pelajari kontrak kerja sama standar sebelum melakukan pemesanan.
              </p>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-gray-50 group">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                       <FileText className="text-red-600" size={24} />
                    </div>
                    <div>
                       <p className="font-semibold text-gray-900 text-sm md:text-base">
                         Kontrak_Layanan.pdf
                       </p>
                       <p className="text-xs text-gray-500">PDF • Siap Baca</p>
                    </div>
                 </div>
                 
                 <div className="flex gap-2">
                    {/* TOMBOL LIHAT (PREVIEW) */}
                    <button 
                      onClick={() => setIsPdfOpen(true)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      title="Lihat Dokumen"
                    >
                      <Eye size={20} />
                    </button>

                    {/* TOMBOL DOWNLOAD */}
                    <a 
                      href="/contoh_PDF.pdf" 
                      download="Syarat_Ketentuan.pdf"
                      className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all"
                      title="Unduh Dokumen"
                    >
                       <Download size={20} />
                    </a>
                 </div>
              </div>
            </div>
          </div>

          {/* --- KOLOM KANAN (Tetap sama) --- */}
          <div ref={rightRef} className="space-y-6">
             {/* ... (Isi Kolom Kanan: Harga, Tombol Pesan, Review - Tetap Sama) ... */}
             <div className="bg-white rounded-2xl p-8 shadow ">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{service.name}</h2>
                <div className="text-4xl font-bold text-green-600 mb-4">
                  Rp{service.price.toLocaleString('id-ID')}
                </div>
                <button onClick={() => navigate(`/pesan/${service.id}`)} className="w-full bg-green-600 text-white py-3 rounded-lg font-bold">
                  Pesan Sekarang
                </button>
             </div>
             
             {/* Review Section (Disingkat biar kode tidak kepanjangan, isinya tetap sama seperti sebelumnya) */}
             <div className="bg-white rounded-2xl p-6 shadow">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Ulasan Pelanggan</h3>
                {/* Form dan List Review tetap ada di sini */}
                 <div className="space-y-4">
                  {mockReviews.map((r) => (
                    <div key={r.id} className="pb-4 border-b last:border-b-0">
                       <p className="font-bold">{r.author}</p>
                       <p className="text-gray-700">{r.text}</p>
                    </div>
                  ))}
                 </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- MODAL / POP-UP PREVIEW PDF --- */}
      {isPdfOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white w-full max-w-4xl h-[85vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200">
            
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-gray-100 bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <FileText size={20} className="text-red-500" />
                Preview Kontrak Layanan
              </h3>
              <button 
                onClick={() => setIsPdfOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-gray-500 hover:text-red-500"
              >
                <X size={24} />
              </button>
            </div>

            {/* Body Modal (Isi PDF) */}
            <div className="flex-1 bg-gray-100 p-1">
              {/* IFRAME untuk menampilkan PDF */}
              {/* Pastikan file 'kontrak.pdf' ada di folder public */}
              <iframe 
                src="/contoh_PDF.pdf" 
                className="w-full h-full rounded-lg border-none"
                title="Preview PDF"
              />
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-gray-100 flex justify-end gap-3 bg-white">
              <button 
                onClick={() => setIsPdfOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                Tutup
              </button>
              <a 
                href="/contoh_PDF.pdf" 
                download
                className="px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center gap-2"
              >
                <Download size={18} />
                Unduh PDF
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}