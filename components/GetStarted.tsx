
import React from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import { Network, Zap, ArrowRight, CheckCircle2, ChevronDown, Battery } from 'lucide-react';

interface GetStartedProps {
  onNavigate: (page: any) => void;
}

const CheckItem = ({ text, colorClass }: { text: string, colorClass: string }) => (
  <div className="flex items-center gap-4">
    <div className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-white/5 border border-white/10`}>
      <CheckCircle2 className={`w-4 h-4 ${colorClass}`} />
    </div>
    <span className="text-slate-300 font-bold text-base tracking-tight">{text}</span>
  </div>
);

const FleetFeature = ({ onNavigate }: { onNavigate: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="sticky top-0 z-0 w-full min-h-[85vh] py-12 flex items-center bg-[#020617] overflow-hidden"
    >
       <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Text Left */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-6">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
               <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-500">For Fleet Managers</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6">
               Reimagining <br /> Fleet Logistics.
            </h2>
            <p className="text-slate-400 text-base font-medium leading-relaxed mb-8 max-w-sm">
               Traditional combustion fleets are holding your business back with volatile costs and high maintenance. Swap Station is the modern alternative.
            </p>
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
               <CheckItem text="40% Operational Savings" colorClass="text-emerald-500" />
               <CheckItem text="Swap in < 90 Seconds" colorClass="text-emerald-500" />
               <CheckItem text="Zero Fleet Downtime" colorClass="text-emerald-500" />
               <CheckItem text="Always Ready Network" colorClass="text-emerald-500" />
            </div>
            <button 
               onClick={() => onNavigate('contact')}
               className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-900/20 transition-all"
            >
               Request Fleet Demo <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Visual Right (Parallax) */}
          <div className="order-1 md:order-2 h-[400px] md:h-[640px] w-full relative group">
             <motion.div 
               style={{ x, y }}
               className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#020617]"
             >
                <img 
                   src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200"
                   alt="Logistics Hub"
                   className="w-full h-full object-cover opacity-60 grayscale-[0.2]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
                
                {/* HUD Overlay */}
                <div className="absolute top-6 right-6 bg-black/40 backdrop-blur-md border border-white/10 p-3 rounded-xl">
                   <div className="flex items-center gap-2 mb-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-black text-slate-300 uppercase tracking-widest">Hub Status</span>
                   </div>
                   <div className="text-lg font-black text-white tracking-tight">Active</div>
                </div>
             </motion.div>
             {/* Back Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-emerald-500/10 blur-[80px] rounded-full -z-10 pointer-events-none" />
          </div>

       </div>
    </div>
  );
};

const RiderFeature = ({ onNavigate }: { onNavigate: any }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const x = useSpring(useTransform(mouseX, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const y = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), { stiffness: 150, damping: 20 });
  const uiX = useSpring(useTransform(mouseX, [-0.5, 0.5], [30, -30]), { stiffness: 100, damping: 20 });
  const uiY = useSpring(useTransform(mouseY, [-0.5, 0.5], [30, -30]), { stiffness: 100, damping: 20 });

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative z-10 w-full min-h-[85vh] py-12 flex items-center bg-[#0f172a] overflow-hidden shadow-[0_-50px_80px_rgba(0,0,0,0.5)] border-t border-white/5"
    >
       <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
          
          {/* Visual Left (Parallax + Floating UI) */}
          <div className="order-1 md:order-1 h-[400px] md:h-[640px] w-full relative group">
             <motion.div 
               style={{ x, y }}
               className="relative w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-[#020617]"
             >
                <img 
                   src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=1200"
                   alt="Rider Tech"
                   className="w-full h-full object-cover opacity-70 contrast-[1.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/40 via-transparent to-transparent mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
             </motion.div>

             {/* Floating 3D UI */}
             <motion.div 
                style={{ x: uiX, y: uiY }}
                className="absolute bottom-6 right-[-10px] md:right-[-20px] bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] z-20 w-[180px]"
             >
                <div className="flex items-center justify-between mb-3">
                   <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Battery</span>
                   <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <div className="flex items-end gap-2 mb-3">
                  <span className="text-3xl font-black text-white tracking-tighter">84%</span>
                  <span className="text-xs font-bold text-emerald-400 mb-1">+120KM</span>
                </div>
                <div className="flex items-end gap-1 h-6">
                  {[40, 60, 45, 70, 50, 80, 60, 84].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className={`flex-1 rounded-sm ${i === 7 ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                  ))}
                </div>
             </motion.div>
             {/* Back Glow */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-blue-600/10 blur-[80px] rounded-full -z-10 pointer-events-none" />
          </div>

          {/* Text Right */}
          <div className="order-2 md:order-2">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1 rounded-full mb-6">
               <Zap className="w-3 h-3 text-blue-400" />
               <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-400">For Riders</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-6">
               Own Your Energy <br /> Future.
            </h2>
            <p className="text-slate-400 text-base font-medium leading-relaxed mb-8 max-w-sm">
               Move from expensive fuel to clean energy with zero upfront stress. Our Lease-to-Own plans give you back independence.
            </p>
            <div className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
               <CheckItem text="No Waiting for Charge" colorClass="text-blue-500" />
               <CheckItem text="Predictable Daily Costs" colorClass="text-blue-500" />
               <CheckItem text="Complete Support Network" colorClass="text-blue-500" />
               <CheckItem text="Lease-to-Own Models" colorClass="text-blue-500" />
            </div>
            <button 
               onClick={() => onNavigate('products')}
               className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-900/20 transition-all"
            >
               Explore Lease Plans <ArrowRight className="w-4 h-4" />
            </button>
          </div>

       </div>
    </div>
  );
};

const GetStartedSection: React.FC<GetStartedProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#020617] relative">
      {/* --- INTRO SECTION --- */}
      <div className="relative z-10 pt-32 pb-24 px-6 md:px-12 bg-[#020617] text-center">
        
        {/* 1. Gaussian Blur Gradient (Transition to Intro) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="text-emerald-500 font-black uppercase tracking-[0.6em] text-xs mb-8 block">
              To Get Started
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-none mb-10">
              Simplify your logistics with <br /> <span className="text-gradient">Swap Station Mobility.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-lg font-medium max-w-2xl mx-auto leading-relaxed mb-12">
              From fleet optimization to individual lease-to-own, Swap Station Mobility makes electric mobility simple, transparent, and stress-free. We handle the complexity so you can focus on what matters most.
            </p>
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-emerald-500/50"
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* --- FEATURE SECTIONS --- */}
      <div className="relative">
        <FleetFeature onNavigate={onNavigate} />
        <RiderFeature onNavigate={onNavigate} />
      </div>

    </div>
  );
};

export default GetStartedSection;
