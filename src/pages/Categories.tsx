import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, Star, MapPin, Filter, X } from 'lucide-react';
import gsap from 'gsap';
import ChatWidget from '../components/ChatWidget';
import { services, categories } from '../data/services';
import { Service } from '../types';

const locations = ['Jakarta', 'Bandung', 'Purwokerto', 'Bogor', 'Tangerang', 'Depok'];
const priceRanges = [
  { label: 'Di bawah 100rb', min: 0, max: 100000 },
  { label: '100rb - 250rb', min: 100000, max: 250000 },
  { label: '250rb - 500rb', min: 250000, max: 500000 },
  { label: 'Di atas 500rb', min: 500000, max: 999999999 },
];
const ratingFilters = [
  { label: '5 Bintang', value: 5 },
  { label: '4 Bintang ke atas', value: 4 },
  { label: '3 Bintang ke atas', value: 3 },
];

export default function Categories() {
  const pageRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'semua');
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showFilterMobile, setShowFilterMobile] = useState(false);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);

  useEffect(() => {
    if (pageRef.current) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    const filtered = services.filter((service) => {
      const matchCategory =
        selectedCategory === 'semua' || service.category === selectedCategory;
      const matchSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLocation =
        selectedLocations.length === 0 ||
        selectedLocations.some((loc) => service.partner.address.includes(loc));
      const matchPrice =
        !selectedPriceRange ||
        (service.price >= selectedPriceRange.min &&
          service.price <= selectedPriceRange.max);
      const matchRating =
        !selectedRating || service.rating >= selectedRating;
      return (
        matchCategory &&
        matchSearch &&
        matchLocation &&
        matchPrice &&
        matchRating
      );
    });
    setFilteredServices(filtered);

    setTimeout(() => {
      if (servicesRef.current) {
        const children = servicesRef.current.querySelectorAll('[data-animate]');
        gsap.fromTo(
          children,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
        );
      }
    }, 0);
  }, [selectedCategory, searchQuery, selectedLocations, selectedPriceRange, selectedRating]);

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50">
      <div className="flex">
        <aside
          className={`${
            showFilterMobile ? 'block' : 'hidden'
          } md:block w-full md:w-64 bg-white md:min-h-screen p-4 md:p-6 border-r border-gray-200 md:overflow-y-auto`}
        >
          <div className="flex justify-between items-center md:hidden mb-4">
            <h2 className="font-bold text-gray-900">Filter</h2>
            <button
              onClick={() => setShowFilterMobile(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <Filter size={18} />
                Semua Kategori
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory('semua')}
                  className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedCategory === 'semua'
                      ? 'bg-green-100 text-green-600 font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Semua Kategori
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-green-100 text-green-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Lokasi</h3>
              <div className="space-y-2">
                {locations.map((location) => (
                  <label key={location} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(location)}
                      onChange={() => toggleLocation(location)}
                      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-600"
                    />
                    <span className="text-gray-700">{location}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Harga</h3>
              <div className="space-y-2">
                {priceRanges.map((range, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedPriceRange(
                        selectedPriceRange?.min === range.min ? null : range
                      )
                    }
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedPriceRange?.min === range.min
                        ? 'bg-green-100 text-green-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {range.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-bold text-gray-900 mb-3">Rating</h3>
              <div className="space-y-2">
                {ratingFilters.map((rating, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      setSelectedRating(
                        selectedRating === rating.value ? null : rating.value
                      )
                    }
                    className={`block w-full text-left px-3 py-2 rounded-lg transition-colors ${
                      selectedRating === rating.value
                        ? 'bg-green-100 text-green-600 font-semibold'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {rating.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900" data-animate>
                Semua Kategori
              </h1>
              <button
                onClick={() => setShowFilterMobile(!showFilterMobile)}
                className="md:hidden bg-white p-2 rounded-lg border border-gray-300"
              >
                <Filter size={24} />
              </button>
            </div>

            <div className="mb-8">
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Cari layanan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                />
              </div>

              {selectedLocations.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedLocations.map((location) => (
                    <span
                      key={location}
                      className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                    >
                      {location}
                      <button
                        onClick={() => toggleLocation(location)}
                        className="hover:text-green-900"
                      >
                        <X size={16} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div
              ref={servicesRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredServices.map((service) => (
                <Link
                  key={service.id}
                  to={`/layanan/${service.id}`}
                  data-animate
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-200">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="text-yellow-400 fill-yellow-400" size={16} />
                      <span className="font-semibold text-gray-900">
                        {service.rating}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">
                      {service.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {service.description}
                    </p>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <MapPin size={16} />
                      <span className="text-sm">{service.partner.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">
                        Rp{service.price.toLocaleString('id-ID')}
                      </span>
                      <span className="text-gray-600 text-sm">
                        {service.reviews} review
                      </span>
                    </div>
                  </div>
                </Link>
              ))}

              {filteredServices.length === 0 && (
                <div className="text-center py-12 col-span-full">
                  <p className="text-gray-600 text-lg">
                    Tidak ada layanan yang sesuai dengan pencarian Anda
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ChatWidget />
    </div>
  );
}
