import React, { useState, useEffect } from 'react';
import { Search, ClipboardList, User, Home } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient'; 

const BottomNav = ({ onAccountClick }) => { 
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('beranda');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Sync User Status
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user));
    
    // Sync Active Tab
    if (location.pathname === '/') setActiveTab('beranda');
    else if (location.pathname === '/profile') setActiveTab('akun');
    else if (location.pathname.startsWith('/booking')) setActiveTab('pesanan');
  }, [location]);

  const handleNavigation = (tab) => {
    setActiveTab(tab);

    if (tab === 'beranda') {
       navigate('/');
       window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'akun') {
      if (user) {
        navigate('/profile');
      } else {
        // Trigger Modal Login dari Parent (Home.jsx)
        if (onAccountClick) onAccountClick(); 
        else navigate('/login'); 
      }
    } else if (tab === 'pesanan') {
       if(!user) {
         if (onAccountClick) onAccountClick();
       } else {
         // Nanti arahkan ke halaman history pesanan
         toast({ title: "Segera Hadir", description: "Riwayat pesanan sedang dikembangkan." });
       }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 px-6 py-4 md:hidden z-50 flex justify-between items-center shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] pb-8">
      <NavButton 
        isActive={activeTab === 'beranda'} 
        onClick={() => handleNavigation('beranda')} 
        icon={Home} 
        label="Beranda" 
      />
      
      <NavButton 
        isActive={activeTab === 'pesanan'} 
        onClick={() => handleNavigation('pesanan')} 
        icon={ClipboardList} 
        label="Pesanan" 
      />
      
      <NavButton 
        isActive={activeTab === 'akun'} 
        onClick={() => handleNavigation('akun')} 
        icon={User} 
        label={user ? 'Profil' : 'Akun'} 
      />
    </div>
  );
};

const NavButton = ({ isActive, onClick, icon: Icon, label }) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive ? 'text-black scale-110' : 'text-gray-400 hover:text-gray-600'}`}
    >
        <div className={`p-1.5 rounded-xl ${isActive ? 'bg-black text-white' : 'bg-transparent'}`}>
            <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
        </div>
        <span className={`text-[9px] font-bold uppercase tracking-wider ${isActive ? 'opacity-100' : 'opacity-0'} transition-opacity absolute -bottom-4 w-full text-center`}>
            {label}
        </span>
    </button>
);

export default BottomNav;
