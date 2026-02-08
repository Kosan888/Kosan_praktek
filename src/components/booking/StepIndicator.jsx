import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock, Hourglass, CreditCard } from 'lucide-react';

const steps = [
  { number: 1, title: 'Lokasi', icon: MapPin },
  { number: 2, title: 'Tanggal', icon: Calendar },
  { number: 3, title: 'Waktu', icon: Clock },
  { number: 4, title: 'Durasi', icon: Hourglass }, // Icon disesuaikan dengan Hourglass agar cocok
  { number: 5, title: 'Bayar', icon: CreditCard }
];

const StepIndicator = ({ currentStep, totalSteps }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative z-10">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = currentStep === step.number;
          const isCompleted = currentStep > step.number;

          return (
            <React.Fragment key={step.number}>
              {/* Step Circle */}
              <div className="flex flex-col items-center gap-3 relative">
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    backgroundColor: isCompleted || isActive ? '#000000' : '#F3F4F6',
                    borderColor: isActive ? '#000000' : 'transparent'
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center border-2 ${
                    isCompleted || isActive ? 'text-white shadow-lg' : 'text-gray-400'
                  }`}
                >
                  <Icon size={18} strokeWidth={isActive ? 3 : 2} />
                </motion.div>
                
                {/* Label Step (Hidden on Mobile for cleaner look) */}
                <span className={`text-[9px] font-black uppercase tracking-widest hidden md:block ${
                  isActive ? 'text-black' : 'text-gray-300'
                }`}>
                  {step.title}
                </span>
                
                {/* Active Indicator Dot */}
                {isActive && (
                    <motion.div 
                        layoutId="active-step-dot"
                        className="absolute -bottom-4 w-1 h-1 bg-black rounded-full md:hidden"
                    />
                )}
              </div>
              
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 h-[2px] mx-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: isCompleted ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="h-full bg-black"
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StepIndicator;
