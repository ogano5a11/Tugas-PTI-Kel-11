import { useEffect, useState, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, XCircle, Loader } from 'lucide-react';

interface Booking {
  id: string;
  service_name: string;
  customer_name: string;
  status: string;
  booking_date: string;
  total_price: number;
}

export default function Dashboard() {
  const { user } = useContext(AuthContext) || {};
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'partner') {
      alert("Halaman ini khusus Mitra!");
      navigate('/');
    }

    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBookings(data || []);
    } catch (error) {
      console.error("Error fetch bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
      fetchBookings(); 
      alert(`Status berhasil diubah menjadi ${newStatus}`);
    } catch (error: any) {
      alert("Gagal update status: " + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Selesai': return 'bg-green-100 text-green-800';
      case 'Diproses': return 'bg-blue-100 text-blue-800';
      case 'Dibatalkan': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  if (loading) return <div className="p-8 text-center">Loading Dashboard...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Mitra</h1>
        <div className="bg-green-50 px-4 py-2 rounded-lg text-green-700 font-medium">
          Halo, {user?.name}
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layanan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Pelanggan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">Belum ada pesanan masuk.</td>
              </tr>
            ) : (
              bookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{booking.service_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.customer_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.booking_date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {booking.status === 'Pending' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'Diproses')}
                        className="text-blue-600 hover:text-blue-900 flex items-center gap-1"
                      >
                        <Loader size={16} /> Proses
                      </button>
                    )}
                    {booking.status === 'Diproses' && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'Selesai')}
                        className="text-green-600 hover:text-green-900 flex items-center gap-1"
                      >
                        <CheckCircle size={16} /> Selesai
                      </button>
                    )}
                     {(booking.status !== 'Selesai' && booking.status !== 'Dibatalkan') && (
                      <button 
                        onClick={() => updateStatus(booking.id, 'Dibatalkan')}
                        className="text-red-600 hover:text-red-900 flex items-center gap-1 ml-2"
                      >
                        <XCircle size={16} /> Batal
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}