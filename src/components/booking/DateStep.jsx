import React from 'react';
import { Calendar as CalendarIcon, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const DateStep = ({ data, onUpdate, onNext, onPrev }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-black uppercase italic tracking-widest flex items-center gap-2 mb-6">
          <CalendarIcon size={18} /> Pilih Tanggal Masuk
        </h3>
        
        <div className="relative">
            <Input 
            type="date" 
            min={new Date().toISOString().split('T')[0]}
            className="h-20 rounded-[24px] border-gray-100 bg-gray-50 px-6 font-black italic text-lg focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            value={data.checkInDate}
            onChange={(e) => onUpdate({ checkInDate: e.target.value })}
            />
            {/* Label floating kecil */}
            <span className="absolute top-2 left-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                Check-in Date
            </span>
        </div>

        <p className="text-[9px] font-bold text-gray-300 uppercase tracking-widest mt-4 ml-2 italic leading-relaxed">
          * Kode akses pintu akan dikirimkan pada tanggal ini.
        </p>
      </div>

      <div className="flex gap-3">
        <Button 
            onClick={onPrev} 
            variant="outline" 
            className="flex-1 h-14 rounded-2xl font-black uppercase italic text-[10px] tracking-widest border-2 hover:bg-gray-50"
        >
            <ArrowLeft size={16} className="mr-2" /> Kembali
        </Button>
        <Button 
          onClick={onNext} 
          disabled={!data.checkInDate}
          className="flex-[2] bg-black text-white h-14 rounded-2xl font-black uppercase italic text-[10px] tracking-widest shadow-xl hover:bg-gray-800 disabled:opacity-50"
        >
          Lanjut ke Jam <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default DateStep;
