import { useNavigate } from 'react-router-dom';

export default function PartnerCTA() {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <div className="relative w-full max-w-sm">
                  <img 
                  src="/Frame 35.png" 
                  alt="Ilustrasi layanan rumah dan kebersihan" 
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-300"/>
            </div>
          </div>

          <div className="space-y-6 order-1 md:order-2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Kembangkan Bisnis Jasa Anda. Gabung Jadi Mitra{' '}
              <span className="text-green-600">Beres.in</span>!
            </h2>
            <p className="text-lg text-gray-600">
              Dapatkan jaminan orderan dari ribuan pemilik rumah di Jabodetabek.
              Kami menyediakan platform yang adil, transparan, dan jaminan
              pembayaran yang aman untuk keahlian Anda.
            </p>
            <button
              onClick={() => navigate('/coming-soon')}
              className="px-8 py-3 border-2 border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
            >
              Coming Soon!
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
