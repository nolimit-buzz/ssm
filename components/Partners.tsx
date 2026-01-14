import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const Partners: React.FC = () => {
  // Reduced to 10 clients to fit exactly 2 rows on the 5-column desktop grid
  const clients = [
    { name: "Glovo", type: "Logistics" },
    { name: "Kwik", type: "Delivery" },
    { name: "Jumia", type: "E-commerce" },
    { name: "Uber Eats", type: "Food" },
    { name: "GIG Logistics", type: "Courier" },
    { name: "Chowdeck", type: "Delivery" },
    { name: "Sendbox", type: "Shipping" },
    { name: "Konga Food", type: "Food" },
    { name: "FedEx", type: "Courier" },
    { name: "DHL Africa", type: "Logistics" }
  ];

  return (
    <section className="bg-white overflow-hidden">
      {/* Premium Header Banner */}
      <div className="bg-emerald-600 relative py-20 px-6 md:px-12 overflow-hidden">
        {/* Geometric Background Element */}
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-20 pointer-events-none">
          <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="none">
            <path d="M400 0 L0 400 L400 400 Z" fill="white" />
            <path d="M400 0 L100 0 L400 300 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-[2px] h-4 bg-white" />
            <span className="text-white font-black uppercase tracking-[0.4em] text-[10px]">Partners <Plus className="inline w-3 h-3 mb-1" /></span>
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-8 max-w-2xl"
          >
            Trusted by Leading Logistics Operators
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-emerald-50/80 max-w-2xl text-lg font-medium leading-relaxed"
          >
            We support Africa's leading logistics and delivery platforms with reliable, high-uptime electric mobility infrastructure.
          </motion.p>
        </div>
      </div>

      {/* Structured Logo Grid */}
      <div className="max-w-7xl mx-auto border-x border-slate-100">
        <div className="grid grid-cols-2 md:grid-cols-5 border-b border-slate-100">
          {clients.map((client, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className={`
                aspect-square flex flex-col items-center justify-center p-8 
                border-r border-t border-slate-100 group cursor-default
                ${(i + 1) % 5 === 0 ? 'md:border-r-0' : ''}
                ${(i + 1) % 2 === 0 ? 'border-r-0 md:border-r' : ''}
                hover:bg-slate-50 transition-colors duration-500
              `}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="text-center"
              >
                <div className="text-2xl font-black text-slate-300 group-hover:text-emerald-600 transition-colors tracking-tighter mb-1 uppercase">
                  {client.name}
                </div>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  {client.type}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="py-12 text-center">
        <p className="text-slate-400 font-bold text-sm tracking-tight">
          Join 50+ logistics companies driving the future of Africa.
        </p>
      </div>
    </section>
  );
};

export default Partners;