import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { pageTransition } from '../utils/animations';
import ChatWidget from '../components/ChatWidget';
import Hero from '../components/Hero';
import Services from '../components/Services';
import WhyUs from '../components/WhyUs';
import Statistics from '../components/Statistics';
import PartnerCTA from '../components/PartnerCTA';
import FinalCTA from '../components/FinalCTA';

export default function Home() {
  const pageRef = useRef(null);
  
  const { hash } = useLocation();

  useEffect(() => {
    pageTransition(pageRef.current);
  }, []);

  // 3. TAMBAHKAN EFFECT KHUSUS UNTUK SCROLLING
  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      
      return () => clearTimeout(timer); // Bersihkan timer jika user pindah cepat
    } else {
      // Jika TIDAK ada pagar (buka home biasa), paksa mulai dari paling atas
      window.scrollTo(0, 0);
    }
  }, [hash]); // Jalankan ulang setiap kali hash berubah

  return (
    <div ref={pageRef} className="w-full">
      <Hero />
      <Services />
      <WhyUs />
      {/* Di dalam Statistics inilah ID="testimonials" berada */}
      <Statistics /> 
      <PartnerCTA />
      <FinalCTA />
      <ChatWidget />
    </div>
  );
}