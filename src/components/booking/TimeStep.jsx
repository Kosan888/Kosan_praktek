import React from 'react';
import { Clock, Info, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TimeStep = ({ data, onUpdate, onNext, onPrev }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
        <h3 className="text-sm font-black uppercase italic tracking-widest flex items-center gap-2 mb-6">
          <Clock size={18} /> Tentukan Jam Masuk
        </h3>
        
        <div className="relative">
            <Input 
            type="time" 
            className="h-20 rounded-[24px] border-gray-100 bg-gray-50 px-6 font-black italic text-2xl focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            value={data.startTime}
            onChange={(e) => onUpdate({ startTime: e.target.value })}
            />
             {/* Label floating kecil */}
             <span className="absolute top-2 left-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                Check-in Time (WIB)
            </span>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-[32px] border border-blue-100 flex gap-4 items-start">
          <div className="p-2 bg-blue-100 rounded-full text-blue-600 shrink-0">
            <Info size={16} />
          </div>
          <p className="text-[10px] font-bold text-blue-800 leading-relaxed uppercase italic tracking-wide">
            Waktu ini akan menjadi awal masa sewa Anda. Smart Lock akan aktif mulai jam ini.
          </p>
        </div>
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
          disabled={!data.startTime}
          className="flex-[2] bg-black text-white h-14 rounded-2xl font-black uppercase italic text-[10px] tracking-widest shadow-xl hover:bg-gray-800 disabled:opacity-50"
        >
          Lanjut ke Durasi <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default TimeStep;
