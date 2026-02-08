import React from 'react';
import { MapPin, Calendar, Clock, Hourglass, Wallet, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast'; // Opsional: Untuk notifikasi

// Perhatikan props: "data" (bukan bookingData), "room", "property", "onPrev"
const SummaryStep = ({ data, room, property, onPrev }) => {
  const { toast } = useToast();

  // 1. Ambil harga langsung dari data yang sudah dipilih user (Sync dengan DurationStep)
  const totalPrice = data.totalPrice || 0;
  
  // Format mata uang IDR
  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(number);
  };

  // Format tanggal
  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('id-ID', options);
  };

  // Logic Bayar (Placeholder)
  const handlePayment = () => {
    // Di sini nanti tempat kode integrasi Midtrans / Xendit / Insert Database
    console.log("Mengirim data ke DB:", {
        ...data,
        total_price: totalPrice
    });

    toast({
        title: "Pesanan Dibuat!",
        description: "Mengarahkan ke pembayaran...",
    });
    
    // TODO: Tambahkan logic insert ke Supabase 'bookings' table di sini
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="mb-6">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter">Ringkasan</h3>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Cek kembali sebelum bayar</p>
      </div>

      <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm space-y-4">
        {/* Lokasi */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-black rounded-xl text-white">
            <MapPin size={18} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Properti</p>
            {/* Ambil nama property dari props 'property' agar lebih akurat */}
            <p className="font-bold text-gray-900 text-sm leading-tight">{property?.name || 'Nama Kosan'}</p>
            <p className="text-xs text-gray-500 mt-1">{property?.address || data.location}</p>
          </div>
        </div>

        <div className="h-px bg-gray-100 my-2"></div>

        {/* Waktu Check-in */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-xl text-black">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Tanggal</p>
              <p className="font-bold text-gray-900 text-xs">{formatDate(data.checkInDate)}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-50 rounded-xl text-black">
              <Clock size={18} />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Jam Masuk</p>
              <p className="font-bold text-gray-900 text-xs">{data.startTime} WIB</p>
            </div>
          </div>
        </div>

        <div className="h-px bg-gray-100 my-2"></div>

        {/* Durasi & Paket */}
        <div className="flex items-start gap-3">
          <div className="p-2 bg-gray-50 rounded-xl text-black">
            <Hourglass size={18} />
          </div>
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Paket Sewa</p>
            <div className="flex items-center gap-2">
                <p className="font-bold text-gray-900 text-sm">
                {data.duration?.label || `${data.duration} Jam`}
                </p>
                <span className="text-[9px] font-black bg-black text-white px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {data.duration?.type === 'hourly' ? 'Transit' : 'Bulanan'}
                </span>
            </div>
          </div>
        </div>
      </div>

      {/* Total Harga & Tombol */}
      <div className="mt-8">
        <div className="bg-gray-900 rounded-[32px] p-6 text-white shadow-xl">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2 text-gray-400">
                    <Wallet size={20} />
                    <span className="text-xs font-bold uppercase tracking-widest">Total Bayar</span>
                </div>
                <div className="text-2xl font-black italic tracking-tighter">
                    {formatRupiah(totalPrice)}
                </div>
            </div>

            <Button 
                onClick={handlePayment}
                className="w-full bg-white text-black h-14 rounded-2xl font-black uppercase italic text-xs tracking-widest hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
                Konfirmasi & Bayar <ArrowRight size={16} />
            </Button>
        </div>
        
        <Button 
            onClick={onPrev} 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-black"
        >
            Kembali, saya mau ubah
        </Button>
      </div>
    </div>
  );
};

export default SummaryStep;
