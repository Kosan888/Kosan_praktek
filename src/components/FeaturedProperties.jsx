import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, Loader2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/customSupabaseClient'; 
import { useNavigate } from 'react-router-dom';

const FeaturedProperties = ({ searchQuery, onBookNow }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        let query = supabase.from('properties').select('*').eq('is_active', true).order('created_at', { ascending: false });
        
        if (searchQuery && searchQuery.trim() !== '') {
          // Pencarian case-insensitive pada nama atau alamat
          query = query.or(`name.ilike.%${searchQuery}%,address.ilike.%${searchQuery}%`);
        }

        const { data, error } = await query;
        if (error) throw error;
        setProperties(data || []);
      } catch (error) {
        console.error("Gagal mengambil data properti:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [searchQuery]);

  // Helper: Ambil harga terendah dari JSON pricing_plan
  const getMinPrice = (pricing) => {
    if (!pricing) return 0;
    const activePrices = [];
    ['hourly', 'monthly'].forEach(category => {
      if (pricing[category]) {
        Object.values(pricing[category]).forEach(option => {
          if (option.active && Number(option.price) > 0) activePrices.push(Number(option.price));
        });
      }
    });
    return activePrices.length > 0 ? Math.min(...activePrices) : 0;
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0
    }).format(number || 0);
  };

  // Handler Navigasi yang Aman
  const handleNavigate = (id) => {
    if (onBookNow) {
        onBookNow(id); // Panggil fungsi dari Home.jsx
    } else {
        navigate(`/property/${id}`); // Fallback navigasi langsung
    }
  };

  return (
    <section className="py-16 bg-white" id="featured-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none mb-4">
            {searchQuery ? `Hasil: "${searchQuery}"` : "Properti Pilihan"}
          </h2>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] italic">
            Hunian Modern dengan Akses IoT Smart Lock
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <Loader2 className="animate-spin text-black w-10 h-10" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {properties.map((property, index) => {
              const lowestPrice = getMinPrice(property.pricing_plan);
              
              return (
                <motion.div
                  key={property.id}
                  onClick={() => handleNavigate(property.id)}
                  className="bg-white rounded-[40px] overflow-hidden shadow-sm hover:shadow-2xl transition-all cursor-pointer border border-gray-100 flex flex-col h-full group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={property.photo_url || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" 
                      alt={property.name} 
                    />
                    <div className="absolute top-5 right-5 bg-black text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase italic tracking-widest flex items-center gap-1 shadow-lg">
                      <Zap size={10} fill="white" /> Smart Lock
                    </div>
                    {property.rating && (
                        <div className="absolute bottom-5 left-5 bg-white/90 backdrop-blur px-3 py-1 rounded-lg flex items-center gap-1 shadow-sm">
                            <Star size={12} className="fill-yellow-400 text-yellow-400"/>
                            <span className="text-[10px] font-bold">{property.rating}</span>
                        </div>
                    )}
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <h3 className="font-black italic text-xl text-gray-900 mb-2 uppercase tracking-tight leading-none line-clamp-1">
                      {property.name}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-gray-400 mb-6">
                      <MapPin size={14} className="text-black shrink-0" />
                      <span className="text-[10px] font-bold uppercase italic tracking-wider line-clamp-1">
                        {property.address}
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                      <div>
                        <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Mulai dari</p>
                        <p className="text-2xl font-black italic text-black leading-none">
                          {formatRupiah(lowestPrice)}
                        </p>
                      </div>
                      <Button 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            handleNavigate(property.id);
                        }}
                        className="bg-black hover:bg-gray-800 text-white rounded-2xl h-11 px-6 text-[10px] font-black uppercase italic tracking-widest shadow-lg active:scale-95 transition-all"
                      >
                        Lihat Unit
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
            <div className="col-span-full text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
                <p className="text-gray-400 font-bold uppercase tracking-widest">Tidak ada properti ditemukan.</p>
                <Button onClick={() => window.location.reload()} variant="link" className="text-black mt-2">Muat Ulang</Button>
            </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;
