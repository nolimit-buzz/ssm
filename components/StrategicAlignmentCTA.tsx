import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus } from 'lucide-react';

interface StrategicAlignmentCTAProps {
  heading: React.ReactNode;
  buttonText?: string;
  buttonOnClick?: () => void;
  badgeText?: string;
  badgeIcon?: React.ReactNode;
}

const StrategicAlignmentCTA: React.FC<StrategicAlignmentCTAProps> = ({
  heading,
  buttonText = "Contact for Strategic Partnerships",
  buttonOnClick,
  badgeText = "Strategic Alignment",
  badgeIcon = <Briefcase className="w-3.5 h-3.5" />
}) => {
  return (
    <section className="py-32 px-6 md:px-12 bg-emerald-600 relative overflow-hidden">
      {/* 1. Deep Layer: Large Infrastructure Underlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-luminosity z-0">
        <img 
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop" 
          alt="" 
          className="w-full h-full object-cover grayscale brightness-50 object-bottom"
        />
        {/* Soft overlay to blend infrastructure image into top background */}
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-600 via-emerald-600/20 to-transparent" />
      </div>

      {/* 2. Middle Layer: Technical Grid with Soft Top Fade */}
      <div 
        className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none z-0" 
        style={{ 
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.4) 1px, transparent 1px)
          `, 
          backgroundSize: '60px 60px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, black 80%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.1) 20%, black 80%)'
        }} 
      />
      
      {/* 3. Surface Layer: Micro-Grain Texture with Global Visibility */}
      <div 
        className="absolute inset-0 opacity-[0.04] mix-blend-multiply pointer-events-none z-0"
        style={{ 
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', 
          backgroundSize: '4px 4px'
        }}
      />

      {/* 4. Ambient Energy Glows - Global Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          animate={{
            opacity: [0.05, 0.1, 0.05],
            scale: [1, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-emerald-400 blur-[200px] rounded-full" 
        />
        <motion.div 
          animate={{
            opacity: [0.03, 0.08, 0.03],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-15%] left-[-5%] w-[800px] h-[800px] bg-teal-300 blur-[180px] rounded-full" 
        />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-2 rounded-full text-emerald-50 text-[10px] font-black tracking-[0.4em] uppercase mb-12">
          {badgeIcon}
          <span>{badgeText}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-10 leading-tight">
          {heading}
        </h2>
        <button 
          onClick={buttonOnClick}
          className="bg-white hover:bg-emerald-50 text-emerald-900 px-12 py-5 rounded-2xl font-black text-sm transition-all flex items-center gap-4 mx-auto group shadow-2xl shadow-emerald-900/20 cursor-pointer"
        >
          {buttonText}
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
        </button>
      </div>
    </section>
  );
};

export default StrategicAlignmentCTA;
