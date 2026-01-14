
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

interface MetricsSectionProps {
  onNavigate?: (page: 'locator' | 'contact' | 'products' | 'services') => void;
}

const MetricsSection: React.FC<MetricsSectionProps> = ({ onNavigate }) => {
  // Using the high-fidelity fleet image asset consistent with the rest of the site's product renders
  const bikeImageUrl = "https://images.unsplash.com/photo-1558444479-c848261286a2?auto=format&fit=crop&q=80&w=1200";

  const stats = [
    { value: "One", label: "Unified Platform" },
    { value: "120k+", label: "Clean Kilometres" },
    { value: "300+", label: "Daily Swaps" }
  ];

  return (
    <section className="relative py-32 bg-white overflow-hidden flex flex-col items-center border-t border-slate-50">
      <div className="max-w-7xl mx-auto px-6 text-center w-full flex flex-col items-center">
        
        {/* Headline Tag */}
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block"
        >
          Propulsion & Tech Advantage
        </motion.span>

        {/* Main Headline */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8 max-w-4xl"
        >
          Your Fleet — Powered by <br /> Smart, Swappable Technology
        </motion.h2>

        {/* Description Text */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-slate-500 max-w-4xl mx-auto text-base font-medium leading-relaxed mb-20"
        >
          SwapStation Mobility integrates advanced 2W/3W electric vehicles, intelligent lithium battery systems, and IoT-enabled swap stations to deliver scalable logistics electrification — engineered for uptime, safety, and speed.
        </motion.p>

        {/* Optimized Stats Grid - Following the 4rem style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 mb-20 w-full max-w-5xl">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <div className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-2 leading-none">
                {stat.value}
              </div>
              <div className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Fleet Hero Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl h-[240px] md:h-[480px] flex items-center justify-center mb-16"
        >
          <img 
            src="/fleet.jpeg" 
            alt="TankVolt Electric Fleet" 
            className="w-full h-full object-contain mix-blend-multiply filter contrast-[1.08] brightness-[1.02]"
          />
          {/* Soft grounding shadow */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[85%] h-6 bg-black/5 blur-3xl rounded-full pointer-events-none" />
        </motion.div>

        {/* Optimized Call to Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <button 
            onClick={() => onNavigate && onNavigate('locator')}
            className="group flex items-center justify-center gap-8 bg-emerald-600 hover:bg-[#020617] text-white px-12 py-6 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] shadow-[0_20px_40px_rgba(16,185,129,0.25)] hover:shadow-[0_20px_40px_rgba(2,6,23,0.3)]"
          >
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-[9px] text-emerald-100 group-hover:text-slate-400 mb-1 transition-colors">Network Map</span>
              <span className="text-sm">Find a station</span>
            </div>
            <MapPin className="w-6 h-6 group-hover:scale-110 transition-transform text-white" />
          </button>
        </motion.div>

      </div>
    </section>
  );
};

export default MetricsSection;
