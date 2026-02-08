import React from 'react';
import { MapPin, ArrowRight, ShieldCheck, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LocationStep = ({ property, onNext }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <Map size={120} />
        </div>

        <div className="relative z-10">
            <div className="w-16 h-16 bg-black rounded-[24px] flex items-center justify-center text-white mb-6 shadow-xl">
            <MapPin size={32} />
            </div>
            
            <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none mb-2">
                Lokasi Unit
            </h3>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic mb-6">
                Pastikan alamat sudah sesuai
            </p>
            
            <div className="p-6 bg-gray-50 rounded-[32px] border border-gray-100 mb-6 group hover:border-black transition-colors">
            <p className="text-xs font-black uppercase italic text-black leading-relaxed">
                {property?.address || "Memuat alamat properti..."}
            </p>
            <p className="text-[10px] text-gray-400 mt-2 font-bold uppercase tracking-widest">
                {property?.city || "Kota"}, {property?.province || "Provinsi"}
            </p>
            </div>

            <div className="flex items-center gap-3 text-green-700 bg-green-50 p-4 rounded-2xl border border-green-100">
            <ShieldCheck size={20} />
            <p className="text-[9px] font-black uppercase italic tracking-wide">
                Lokasi Terverifikasi & Aman
            </p>
            </div>
        </div>
      </div>

      <Button 
        onClick={onNext} 
        className="w-full bg-black text-white h-16 rounded-[24px] font-black uppercase italic text-xs tracking-widest shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-2 hover:bg-gray-800"
      >
        Lanjut ke Tanggal <ArrowRight size={18} />
      </Button>
    </div>
  );
};

export default LocationStep;
