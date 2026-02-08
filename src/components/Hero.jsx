import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react'; 
import { motion } from 'framer-motion';

const Hero = ({ onSearch }) => { 
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (onSearch) onSearch(query);
    
    // Scroll ke section properti
    const element = document.getElementById('featured-properties');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleKeyPress = (e) => {
      if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="relative bg-black text-white py-24 md:py-32 overflow-hidden">
      {/* Background Image/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black to-black opacity-90 z-10"></div>
      <div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556020685-ae41abfc9365?q=80&w=2574&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale"
      ></div>
      
      <div className="relative z-20 max-w-7xl mx-auto px-4 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
            Hunian Impian <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-500">Tanpa Ribet.</span>
          </h1>
          <p className="text-gray-400 text-sm md:text-lg font-bold uppercase tracking-[0.2em] mb-10 max-w-2xl mx-auto leading-relaxed">
            Platform sewa kos & apartemen dengan teknologi Smart Lock. Akses mudah, aman, dan transparan.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-2 rounded-[24px] max-w-2xl mx-auto shadow-2xl flex flex-col md:flex-row items-center gap-2"
        >
          <div className="flex-1 flex items-center px-4 h-14 w-full">
            <MapPin className="text-black mr-3" size={20} />
            <input 
                type="text" 
                placeholder="Cari lokasi (misal: Bandung)..." 
                className="w-full h-full bg-transparent border-none text-black font-bold placeholder:text-gray-400 focus:ring-0 outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyPress}
            />
          </div>
          
          <button 
            onClick={handleSearch}
            className="w-full md:w-auto bg-black text-white h-14 px-8 rounded-[20px] font-black uppercase italic tracking-widest flex items-center justify-center gap-2 hover:bg-gray-800 transition-all active:scale-95"
          >
            <Search size={18} /> Cari
          </button>
        </motion.div>
      </div>
    </section>
  );
};
export default Hero;
