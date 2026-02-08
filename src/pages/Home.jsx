import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import PopularCities from '@/components/PopularCities';
import FeaturedProperties from '@/components/FeaturedProperties';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import BottomNav from '@/components/BottomNav';
import AuthModal from '@/components/AuthModal';

const Home = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  
  // State untuk menangkap kata kunci dari Hero
  const [searchQuery, setSearchQuery] = useState('');

  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authInitialView, setAuthInitialView] = useState('login');

  // PERBAIKAN: Fungsi ini sekarang mengarahkan user ke halaman Detail
  const handleStartBooking = (data) => {
    // Jika komponen FeaturedProperties mengirimkan ID properti
    if (data && (typeof data === 'string' || typeof data === 'number')) {
        navigate(`/property/${data}`);
    } 
    // Jika mengirim object properti lengkap
    else if (data?.id) {
        navigate(`/property/${data.id}`);
    } 
    // Fallback: Jika tombol diklik tanpa ID khusus, scroll ke list properti
    else {
        const element = document.getElementById('featured-properties');
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openAuthModal = (view = 'login') => {
    setAuthInitialView(view);
    setAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Header onLoginClick={() => openAuthModal('login')} onSignupClick={() => openAuthModal('signup')} />
      
      {/* Hero mengirimkan query ke state searchQuery */}
      <Hero onSearch={(query) => setSearchQuery(query)} />
      
      <PopularCities />
      
      {/* Tambahkan id="featured-properties" agar bisa di-scroll */}
      <div id="featured-properties">
        <FeaturedProperties 
            searchQuery={searchQuery} 
            onBookNow={handleStartBooking} 
        />
      </div>
      
      <Testimonials />
      <Footer />
      <BottomNav onAccountClick={() => openAuthModal('login')} />
      
      {/* Auth Modal tetap ada untuk login/register */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} initialView={authInitialView} />
    </div>
  );
};

export default Home;
