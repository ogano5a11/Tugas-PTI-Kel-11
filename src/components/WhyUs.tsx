import { Users, Shield, Award } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Mitra Terverifikasi',
    description:
      'Semua mitra kami lolos seleksi ketat, mencakup verifikasi identitas (KTP), SKCK, dan uji kompetensi keahlian.',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Shield,
    title: 'Pembayaran Aman',
    description:
      'Dana Anda kami tahan di sistem escrow dan baru dicairkan ke mitra setelah pekerjaan dikonfirmasi selesai sesuai kontrak.',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
  {
    icon: Award,
    title: 'Garansi & Asuransi',
    description:
      'Nikmati perlindungan garansi resmi dan kemitraan asuransi untuk melindungi Anda dari risiko kerusakan atau hasil kerja yang tidak sesuai',
    bgColor: 'bg-green-50',
    iconColor: 'text-green-600',
  },
];

export default function WhyUs() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Kenapa Beres.in
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div
                className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}
              >
                <feature.icon className={`${feature.iconColor} w-8 h-8`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
