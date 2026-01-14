import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { services } from '../data/services';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const [isBooked, setIsBooked] = useState(false);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    notes: '',
    name: '',
    phone: '',
  });

  const service = services.find((s) => s.id === id);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }

    if (leftRef.current) {
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      );
    }

    if (rightRef.current) {
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 50 },
        { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Layanan tidak ditemukan</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    // setTimeout DIHAPUS agar halaman tidak tertutup otomatis
  };

  // TAMPILAN JIKA SUDAH BOOKING (SUKSES)
  if (isBooked) {
    // Kita buat ID Pesanan unik berdasarkan waktu sekarang
    const orderId = `#BRS-${Date.now().toString().slice(-6)}`;

    return (
      <div ref={pageRef} className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-green-600 p-8 text-center">
              <CheckCircle className="text-white w-20 h-20 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">
                Pesanan Berhasil Dikonfirmasi!
              </h2>
              <p className="text-green-100">
                Kontrak digital Anda telah disimpan
              </p>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Kontrak Digital</h3>
                <div className="space-y-3 text-sm text-gray-700 mb-4">
                  <div className="flex justify-between">
                    <span>Nomor Pesanan:</span>
                    <span className="font-semibold">{orderId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Layanan:</span>
                    <span className="font-semibold">{service?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tanggal Booking:</span>
                    <span className="font-semibold">{formData.date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Waktu:</span>
                    <span className="font-semibold">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Harga:</span>
                    <span className="font-semibold text-green-600">
                      Rp{Math.round(service!.price * 1.1).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                
                {/* --- TOMBOL DOWNLOAD PDF (YANG SUDAH DIPERBAIKI) --- */}
                {/* Pastikan file 'kontrak.pdf' ada di folder public */}
                <a 
                  href="/contoh_PDF.pdf" 
                  download={`Kontrak_Pesanan_${orderId.replace('#', '')}.pdf`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm"
                >
                  Download Kontrak PDF
                </a>
                {/* --------------------------------------------------- */}

              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Informasi Penting:</strong> Mitra akan menghubungi Anda dalam 2 jam untuk konfirmasi final. Pastikan nomor telepon Anda aktif.
                </p>
              </div>

              <button
                onClick={() => navigate('/kategori')}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Kembali ke Kategori
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // TAMPILAN FORM BOOKING (BELUM SUBMIT)
  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(`/layanan/${id}`)}
          className="flex items-center gap-2 text-green-600 hover:text-green-700 mb-8"
        >
          <ArrowLeft size={20} />
          Kembali ke Detail
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          <div ref={leftRef} className="bg-white rounded-2xl p-8 shadow">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Pesan Layanan</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nama Anda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+62 812-3456-7890"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tanggal Layanan
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jam Layanan
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alamat Layanan
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Masukkan alamat lengkap"
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Catatan Tambahan (Opsional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Tambahkan informasi penting lainnya..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg"
              >
                Konfirmasi Pesanan
              </button>
            </form>
          </div>

          <div ref={rightRef} className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Ringkasan Pesanan
              </h3>

              <div className="space-y-4 pb-6 border-b">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{service.name}</p>
                    <p className="text-sm text-gray-600">{service.partner.name}</p>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-32 object-cover rounded"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-gray-600">
                    <span>Harga Dasar</span>
                    <span>Rp{service.price.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Biaya Platform</span>
                    <span>Rp{Math.round(service.price * 0.1).toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total</span>
                  <span className="text-2xl font-bold text-green-600">
                    Rp{Math.round(service.price * 1.1).toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  Pembayaran akan diproses melalui sistem escrow yang aman. Dana akan ditahan hingga layanan selesai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}