import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';

// Modular Content Configuration
const HERO_CONTENT = {
  headline: "The Future of Fleet Energy.",
  subheadline: "Swap Station is building the infrastructure for Africa's transition to electric mobility. Instant swaps, zero downtime, 100% clean energy.",
  badge: "The Sovereign Mobility Network",
  ctaPrimary: "Request a Demo",
  ctaSecondary: "Explore Stations",
  // High-impact infrastructure image
  backgroundImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop" 
};

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-slate-950">
      {/* Cinematic Background Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img 
            src={HERO_CONTENT.backgroundImage}
            alt="Energy Infrastructure" 
            className="w-full h-full object-cover grayscale-[0.1]"
          />
        </motion.div>
        
        {/* Institutional Overlays: Lightened for better visibility */}
        <div className="absolute inset-0 bg-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/40 to-transparent opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950" />
        
        {/* Subtle Animated Vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.6)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-2 rounded-full text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase"
        >
          <Zap className="w-3.5 h-3.5 fill-emerald-500" />
          <span>{HERO_CONTENT.badge}</span>
        </motion.div>

        {/* Premium Headline with specific 120px desktop size */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-[120px] font-black mb-10 tracking-tighter leading-[1.02] text-white max-w-6xl mx-auto"
        >
          {HERO_CONTENT.headline.split(' ').map((word, i) => (
            <span key={i} className={word === 'Energy.' || word === 'Fleet' ? 'text-gradient' : ''}>
              {word}{' '}
            </span>
          ))}
        </motion.h1>

        {/* Refined Subheadline with font-weight: 400 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="text-lg md:text-2xl text-slate-300 max-w-4xl mx-auto mb-16 leading-relaxed font-normal"
        >
          {HERO_CONTENT.subheadline}
        </motion.p>

        {/* Modular CTAs - Updated to be smaller with 15rem radius */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <button className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-[15rem] font-black text-[0.875rem] transition-all transform hover:-translate-y-1 hover:shadow-[0_20px_40px_-12px_rgba(16,185,129,0.4)] active:scale-95 shadow-xl uppercase tracking-widest">
            {HERO_CONTENT.ctaPrimary}
          </button>
          <button className="w-full sm:w-auto glass hover:bg-white/10 text-white px-10 py-5 rounded-[15rem] font-black text-[0.875rem] flex items-center justify-center gap-4 transition-all transform hover:-translate-y-1 active:scale-95 group uppercase tracking-widest">
            {HERO_CONTENT.ctaSecondary}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform opacity-60" />
          </button>
        </motion.div>
      </div>

      {/* Institutional Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-5"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.6em] text-white/40">scroll</span>
        <div className="w-[1px] h-20 bg-gradient-to-b from-emerald-500/80 via-emerald-500/20 to-transparent relative">
          <motion.div 
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-emerald-400 rounded-full shadow-[0_0_20px_#10b981]"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;