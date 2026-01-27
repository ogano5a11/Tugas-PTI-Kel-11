import { useEffect, useState, useContext, useRef } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Loader, XCircle, MessageSquare, Send } from 'lucide-react';

interface Booking {
  id: string;
  service_name: string;
  customer_name: string;
  status: string;
  booking_date: string;
  total_price: number;
}

interface Message {
  id: string;
  content: string;
  role: 'customer' | 'admin';
  created_at: string;
}

export default function Dashboard() {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [reply, setReply] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      alert("Halaman ini khusus Admin!");
      navigate('/');
      return;
    }

    fetchBookings();
    fetchMessages();
    const interval = setInterval(() => {
        fetchBookings();
        fetchMessages();
    }, 3000);

    return () => clearInterval(interval);
  }, [user]);

  // --- API CALLS KE PHP ---

  const fetchBookings = async () => {
    try {
      const res = await fetch('http://localhost/beres-api/get_bookings.php');
      const data = await res.json();
      if (data.success) {
          setBookings(data.data);
      }
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const fetchMessages = async () => {
    try {
        const res = await fetch('http://localhost/beres-api/get_messages.php');
        const data = await res.json();
        if (data.success) {
             setMessages((prev) => {
                 if (prev.length !== data.data.length) {
                     scrollToBottom();
                     return data.data;
                 }
                 return prev;
             });
        }
    } catch (e) { console.error(e); }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
        const res = await fetch('http://localhost/beres-api/update_booking.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status: newStatus })
        });
        const data = await res.json();
        if (data.success) {
            alert(`Status diubah: ${newStatus}`);
            fetchBookings();
        } else {
            alert("Gagal update status");
        }
    } catch (e) { alert("Error koneksi"); }
  };

  const sendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reply.trim() || !user) return;

    try {
        await fetch('http://localhost/beres-api/send_message.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                sender_id: user.id,
                content: reply,
                role: 'partner'
            })
        });
        setReply('');
        fetchMessages();
    } catch (e) { alert("Gagal kirim pesan"); }
  };

  const scrollToBottom = () => {
    setTimeout(() => { chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, 100);
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
        <div className="bg-green-50 px-4 py-2 rounded-lg text-green-700 font-medium">Halo, {user?.name}</div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* KOLOM KIRI: DAFTAR PESANAN */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow rounded-lg border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="font-bold text-gray-700">Daftar Pesanan Masuk</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Layanan</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{booking.service_name}</div>
                        <div className="text-sm text-gray-500">{booking.customer_name}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 text-xs leading-5 font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        {booking.status === 'Pending' && (
                          <button onClick={() => updateStatus(booking.id, 'Diproses')} className="text-blue-600 hover:text-blue-900 font-bold text-xs border border-blue-200 px-2 py-1 rounded">Proses</button>
                        )}
                        {booking.status === 'Diproses' && (
                          <button onClick={() => updateStatus(booking.id, 'Selesai')} className="text-green-600 hover:text-green-900 font-bold text-xs border border-green-200 px-2 py-1 rounded">Selesai</button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* KOLOM KANAN: LIVE CHAT */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg border border-gray-200 h-[600px] flex flex-col">
            <div className="px-6 py-4 border-b border-gray-200 bg-green-600 text-white flex items-center gap-2">
              <MessageSquare size={20} />
              <h2 className="font-bold">Live Chat Pelanggan</h2>
            </div>

            <div className="flex-1 p-4 overflow-y-auto bg-gray-50 space-y-4">
              {messages.length === 0 ? (
                <p className="text-center text-gray-400 text-sm">Belum ada pesan.</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-lg px-3 py-2 text-sm shadow-sm ${
                      msg.role === 'admin' 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'
                    }`}>
                      <p className="text-xs opacity-70 mb-1">{msg.role === 'admin' ? 'Anda' : 'Pelanggan'}</p>
                      {msg.content}
                    </div>
                  </div>
                ))
              )}
              <div ref={chatEndRef} />
            </div>

            <form onSubmit={sendReply} className="p-3 border-t bg-white">
              <div className="flex gap-2">
                <input type="text" value={reply} onChange={(e) => setReply(e.target.value)} placeholder="Balas pesan..." className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-green-500" />
                <button type="submit" disabled={!reply.trim()} className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}