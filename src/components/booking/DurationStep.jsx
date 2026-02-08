import React from 'react';
import { Button } from '@/components/ui/button'; // Import Button UI kamu

const DurationStep = ({ pricingPlan, onSelect, selectedDuration, onPrev }) => {
  // FITUR: Auto-Parsing jika data datang dalam bentuk string
  let pricingData = pricingPlan;
  
  if (typeof pricingData === 'string') {
    try {
      pricingData = JSON.parse(pricingData);
    } catch (e) {
      pricingData = { hourly: {}, monthly: {} };
    }
  }

  const parsedPlan = pricingData || { hourly: {}, monthly: {} };

  // Helper untuk mendapatkan list paket
  const getplans = () => {
    // Gabungkan hourly dan monthly jika ada, atau sesuaikan logic ini
    // Saat ini kita ambil semua yang aktif
    const hourly = parsedPlan.hourly || {};
    const monthly = parsedPlan.monthly || {};

    const hourlyOptions = Object.entries(hourly).map(([key, val]) => ({
        id: key, ...val, type: 'hourly', label: `${key} Jam`
    }));

    const monthlyOptions = Object.entries(monthly).map(([key, val]) => ({
        id: key, ...val, type: 'monthly', label: `${key} Bulan`
    }));

    // Gabung dan Filter
    return [...hourlyOptions, ...monthlyOptions]
      .filter(opt => opt.active === true && Number(opt.price) > 0)
      .sort((a, b) => Number(a.price) - Number(b.price)); // Sort berdasarkan harga termurah
  };

  const plans = getplans();

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm">
        <h3 className="text-lg font-black uppercase italic tracking-widest mb-6">Pilih Durasi Sewa</h3>
        
        <div className="grid grid-cols-1 gap-3">
          {plans.length > 0 ? (
            plans.map((plan) => (
              <button
                key={`${plan.type}-${plan.id}`}
                onClick={() => onSelect(plan)}
                className={`p-5 border-2 rounded-3xl flex justify-between items-center transition-all ${
                  selectedDuration?.id === plan.id && selectedDuration?.type === plan.type
                    ? 'border-black bg-black text-white shadow-xl transform scale-[1.02]'
                    : 'border-gray-50 bg-gray-50 hover:border-gray-200'
                }`}
              >
                <div className="flex flex-col items-start text-left">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${selectedDuration?.id === plan.id ? 'text-gray-400' : 'text-gray-400'}`}>
                    {plan.type === 'hourly' ? 'Transit' : 'Bulanan'}
                  </span>
                  <span className="text-lg font-bold">{plan.label}</span>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black">Rp {Number(plan.price).toLocaleString('id-ID')}</span>
                </div>
              </button>
            ))
          ) : (
            <div className="p-12 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/50">
              <p className="text-gray-400 text-sm font-bold uppercase tracking-widest leading-relaxed">
                Mitra belum mengaktifkan <br/> tarif untuk kamar ini.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tambahkan Tombol Kembali di sini agar user tidak terjebak */}
      <div className="flex gap-3">
        <Button onClick={onPrev} variant="outline" className="w-full h-14 rounded-2xl font-black uppercase italic text-[10px] tracking-widest">
            Kembali
        </Button>
      </div>
    </div>
  );
};

export default DurationStep;
