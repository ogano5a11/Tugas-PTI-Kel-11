import { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Calendar, Clock, MapPin, Package, ArrowLeft, Loader } from 'lucide-react';

interface Booking {
  id: string;
  service_name: string;
  status: string;
  booking_date: string;
  booking_time: string;
  total_price: number;
  address: string;
}

export default function MyOrders() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();

  const [orders, setOrders] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;
    
    try {
      const res = await fetch(`http://localhost/beres-api/get_customer_bookings.php?user_id=${user.id}`);
      const data = await res.json();
      
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Gagal mengambil data pesanan:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-800 border-green-200';
      case 'Diproses': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Dibatalkan': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-50">
        <div className="flex flex-col items-center gap-2">
            <Loader className="animate-spin text-green-600" size={32} />
            <p className="text-gray-500">Memuat pesanan Anda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Pesanan Saya</h1>
                <p className="text-gray-600 mt-1">Riwayat dan status layanan yang Anda pesan</p>
            </div>
            <Link to="/" className="text-green-600 hover:text-green-700 flex items-center gap-2 font-medium">
                <ArrowLeft size={20} /> Kembali
            </Link>
        </div>

        {/* List Pesanan */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center border border-gray-200">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum Ada Pesanan</h3>
            <p className="text-gray-500 mb-6">Anda belum memesan layanan apapun saat ini.</p>
            <Link to="/kategori" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Pesan Layanan Sekarang
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-green-100 p-3 rounded-full text-green-600">
                            <Package size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{order.service_name}</h3>
                            <span className="text-xs text-gray-500">ID Pesanan: #{order.id}</span>
                        </div>
                    </div>
                    
                    {/* Status Badge */}
                    <div className={`px-4 py-1.5 rounded-full text-sm font-bold border ${getStatusColor(order.status)} text-center`}>
                        {order.status}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <Calendar size={18} className="text-gray-400" />
                        <span>{order.booking_date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Clock size={18} className="text-gray-400" />
                        <span>{order.booking_time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <MapPin size={18} className="text-gray-400" />
                        <span className="truncate">{order.address}</span>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-500">Total Harga</span>
                    <span className="text-xl font-bold text-green-600">
                        Rp{Number(order.total_price).toLocaleString('id-ID')}
                    </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}