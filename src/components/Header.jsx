import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient'; 
import AuthModal from './AuthModal';

const Header = ({ onLoginClick, onSignupClick }) => {
  const navigate = useNavigate();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [modalView, setModalView] = useState('login');
  const [user, setUser] = useState(null);

  // Realtime Auth Listener
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile');
    } else {
      // Buka modal login internal jika props tidak tersedia
      if (onLoginClick) {
        onLoginClick();
      } else {
        setModalView('login');
        setIsAuthModalOpen(true);
      }
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-40 border-b border-gray-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <div 
            className="cursor-pointer flex items-center gap-2 group" 
            onClick={() => navigate('/')}
          >
             {/* Ganti src dengan logo kamu yang valid */}
            <img 
              src="https://horizons-cdn.hostinger.com/fe0ceffa-a268-4ed7-9517-b00266208690/82f0ec3177ec7c28e1cd03e5f4aac30f.jpg" 
              alt="Kosan Logo" 
              className="h-10 w-auto object-contain group-hover:scale-105 transition-transform" 
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex gap-6 text-sm font-bold text-gray-500 uppercase tracking-wide">
                <button onClick={() => navigate('/')} className="hover:text-black transition-colors">Beranda</button>
                <button onClick={() => navigate('/#featured-section')} className="hover:text-black transition-colors">Cari Kos</button>
            </nav>

            <div className="w-px h-6 bg-gray-200"></div>

            <button 
              onClick={handleProfileClick}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                user 
                  ? "bg-black text-white hover:bg-gray-800 shadow-lg" 
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              <span className="text-xs font-black uppercase tracking-widest">
                {user ? "Akun Saya" : "Masuk / Daftar"}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Internal Auth Modal (Fallback jika props tidak dikirim) */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
        initialView={modalView}
      />
    </>
  );
};

export default Header;
