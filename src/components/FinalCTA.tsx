import { Link } from 'react-router-dom';

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
          Siap Mengubah{' '}
          <span className="text-green-600">Urusan Rumah yang Rumit</span>{' '}
          Menjadi Sederhana?
        </h2>
        <Link
          to="/kategori"
          className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg inline-flex items-center"
        >
          Cari Layanan Sekarang
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
