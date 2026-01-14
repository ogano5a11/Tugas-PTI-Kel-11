import { useState, useEffect, useRef } from 'react';
import { ChevronDown, MessageCircle, Phone, Mail } from 'lucide-react';
import gsap from 'gsap';

const faqs = [
  {
    question: 'Bagaimana cara mendaftar di Beres.in?',
    answer: 'Anda dapat mendaftar melalui halaman daftar dengan email atau nomor telepon. Verifikasi email/SMS kemudian buat profil Anda.',
  },
  {
    question: 'Apakah mitra di Beres.in terverifikasi?',
    answer: 'Ya, semua mitra kami telah melalui proses verifikasi ketat termasuk pengecekan identitas, riwayat kerja, dan rating pelanggan.',
  },
  {
    question: 'Berapa lama waktu proses booking?',
    answer: 'Setelah Anda mengkonfirmasi pesanan, mitra akan menghubungi Anda dalam 2-4 jam untuk membahas detail pekerjaan.',
  },
  {
    question: 'Bagaimana sistem pembayaran bekerja?',
    answer: 'Kami menggunakan sistem escrow yang aman. Dana Anda akan ditahan hingga pekerjaan selesai dan Anda puas dengan hasilnya.',
  },
  {
    question: 'Apa yang harus saya lakukan jika tidak puas?',
    answer: 'Hubungi tim customer support kami. Kami akan membantu menyelesaikan masalah atau melakukan pengembalian dana jika diperlukan.',
  },
  {
    question: 'Apakah ada garansi untuk layanan?',
    answer: 'Kami memiliki jaminan kepuasan pelanggan 100%. Setiap layanan memiliki garansi dari mitra sesuai kesepakatan awal.',
  },
];

export default function Bantuan() {
  const pageRef = useRef(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Pusat <span className="text-green-600">Bantuan</span>
          </h1>
          <p className="text-xl text-gray-600">
            Kami di sini untuk membantu Anda. Temukan jawaban atas pertanyaan umum.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: MessageCircle,
              title: 'Live Chat',
              description: 'Hubungi kami setiap saat',
              contact: 'Chat sekarang',
            },
            {
              icon: Phone,
              title: 'Telepon',
              description: '(021) 1234-5678',
              contact: 'Hubungi kami',
            },
            {
              icon: Mail,
              title: 'Email',
              description: 'support@beres.in',
              contact: 'Kirim email',
            },
          ].map((method, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <method.icon className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {method.title}
              </h3>
              <p className="text-gray-600 mb-4">{method.description}</p>
              <button className="text-green-600 hover:text-green-700 font-medium">
                {method.contact}
              </button>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() =>
                    setExpandedIndex(expandedIndex === index ? null : index)
                  }
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-bold text-gray-900">{faq.question}</span>
                  <ChevronDown
                    className={`text-green-600 transition-transform ${
                      expandedIndex === index ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>
                {expandedIndex === index && (
                  <div className="px-6 pb-6 border-t border-gray-200 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Tidak menemukan jawaban?
          </h3>
          <p className="text-gray-600 mb-6">
            Tim support kami siap membantu Anda 24/7
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold">
            Hubungi Support
          </button>
        </div>
      </div>
    </div>
  );
}
