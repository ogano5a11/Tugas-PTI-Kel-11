import { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { services } from '../data/services';
import { supabase } from '../lib/supabase';

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pageRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  
  const [isBooked, setIsBooked] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [errorMsg, setErrorMsg] = useState('');

  const isLoadingRef = useRef(false);

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
    // Animasi Masuk
    if (pageRef.current) gsap.fromTo(pageRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4 });
    if (leftRef.current) gsap.fromTo(leftRef.current, { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.6 });
    if (rightRef.current) gsap.fromTo(rightRef.current, { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6 });
  }, [id]);

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Layanan tidak ditemukan</p>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    isLoadingRef.current = true;
    setErrorMsg('');

    const timeout = setTimeout(() => {
        if (isLoadingRef.current) {
            console.warn("Booking timeout triggered");
            setLoading(false);
            isLoadingRef.current = false;
            setErrorMsg("Koneksi lambat. Pesanan mungkin gagal terkirim. Silakan cek koneksi internet Anda.");
        }
    }, 10000);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        clearTimeout(timeout);
        alert("Sesi habis. Silakan login kembali.");
        navigate('/login');
        return;
      }

      const totalPrice = Math.round(service.price * 1.1);

      console.log("Mengirim data pesanan...");

      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            user_id: user.id,
            service_name: service.name,
            customer_name: formData.name,
            customer_phone: formData.phone,
            booking_date: formData.date,
            booking_time: formData.time,
            address: formData.address,
            total_price: totalPrice,
            status: 'Pending'
          }
        ]);

      if (error) throw error;

      console.log("Pesanan sukses!");
      clearTimeout(timeout);
      setIsBooked(true);

    } catch (error: any) {
      clearTimeout(timeout);
      console.error("Booking Error:", error);
      
      let pesan = error.message;
      if (pesan.includes("row-level security")) pesan = "Gagal menyimpan: Izin ditolak database (Cek RLS Policy).";
      
      setErrorMsg("Gagal memesan: " + pesan);
    } finally {
      if (isLoadingRef.current) {
        setLoading(false);
        isLoadingRef.current = false;
      }
    }
  };

  if (isBooked) {
    const orderId = `#BRS-${Date.now().toString().slice(-6)}`;

    return (
      <div ref={pageRef} className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-green-600 p-8 text-center">
              <CheckCircle className="text-white w-20 h-20 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-2">Pesanan Berhasil!</h2>
              <p className="text-green-100">Mitra kami akan segera memproses permintaan Anda.</p>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Rincian Pesanan</h3>
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
                    <span>Waktu:</span>
                    <span className="font-semibold">{formData.date} - {formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total:</span>
                    <span className="font-semibold text-green-600">
                      Rp{Math.round(service!.price * 1.1).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>
                
                <a 
                  href="/contoh_PDF.pdf" 
                  download={`Kontrak_${orderId.replace('#', '')}.pdf`}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                >
                  Download Bukti Pesanan (PDF)
                </a>
              </div>

              <button
                onClick={() => navigate('/dashboard')} 
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Cek Status di Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN FORM ---
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

            {/* ERROR ALERT */}
            {errorMsg && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2 text-sm">
                    <AlertCircle size={18} />
                    {errorMsg}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tanggal</label>
                    <div className="relative">
                        <Calendar className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                        required
                        />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jam</label>
                    <div className="relative">
                        <Clock className="absolute left-3 top-3 text-gray-400" size={20} />
                        <input
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                        required
                        />
                    </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 text-gray-400" size={20} />
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {loading ? (
                    <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                    </>
                ) : 'Konfirmasi Pesanan'}
              </button>
            </form>
          </div>

          <div ref={rightRef} className="space-y-6">
            <div className="bg-white rounded-2xl p-8 shadow">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Ringkasan</h3>
              <div className="space-y-4 pb-6 border-b">
                <div className="bg-gray-50 rounded-lg p-4">
                  <img src={service.image} alt={service.name} className="w-full h-32 object-cover rounded" />
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Bayar</span>
                  <span className="text-green-600">Rp{Math.round(service.price * 1.1).toLocaleString('id-ID')}</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-4 text-center">
                Pembayaran dilakukan setelah layanan selesai.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}