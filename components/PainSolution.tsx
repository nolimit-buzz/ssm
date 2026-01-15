import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, TrendingDown, Clock, ShieldCheck, DollarSign, ArrowRight } from 'lucide-react';

const PainSolution: React.FC = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-50 via-white to-white px-6 md:px-12 relative overflow-hidden">
      {/* Structural Background - Solid and clean to prevent 'overlay' feeling */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      {/* Subtle bottom-aligned glow that doesn't interfere with text */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-gradient-to-t from-emerald-50/50 to-transparent opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block"
          >
            Efficiency Redefined
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mb-6 text-slate-950 tracking-tighter leading-[1.1]"
          >
            Reimagining <br className="md:hidden" /> Fleet Logistics.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-slate-500 max-w-5xl mx-auto text-lg font-medium leading-relaxed"
          >
            Traditional combustion fleets hold businesses back with volatile fuel costs, high maintenance, and operational downtime. SwapStation Mobility is the modern electric alternative.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Pain Points - High Contrast White Card */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-white border border-slate-200 flex flex-col shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 p-6 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
               <AlertTriangle className="w-40 h-40 text-slate-900" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-red-600 mb-10 font-black uppercase tracking-widest text-[10px]">
                <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                The Status Quo
              </div>
              <ul className="space-y-8">
                {[
                  { icon: DollarSign, title: "Unpredictable Fuel Costs", desc: "Rising fuel prices continue to erode logistics margins." },
                  { icon: Clock, title: "Static Charging Stops", desc: "Conventional EV charging grounds fleets for hours." },
                  { icon: AlertTriangle, title: "High Maintenance", desc: "Internal combustion engines require frequent, costly repairs." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100/50">
                      <item.icon className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-base tracking-tight mb-1">{item.title}</h4>
                      <p className="text-slate-500 font-medium text-xs leading-relaxed max-w-[280px]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Solution - High Impact Emerald Card */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl bg-emerald-600 flex flex-col justify-between shadow-[0_30px_60px_-15px_rgba(5,150,105,0.4)] relative overflow-hidden"
          >
            {/* Subtle light pulse background */}
            <div className="absolute top-[-20%] right-[-20%] w-64 h-64 bg-white/10 blur-3xl rounded-full pointer-events-none" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-emerald-100 mb-10 font-black uppercase tracking-widest text-[10px]">
                <CheckCircle2 className="w-4 h-4" />
                The SwapStation Model
              </div>
              <ul className="space-y-8 text-white">
                {[
                  { icon: TrendingDown, title: "Up to 40% Operational Savings", desc: "Lower energy costs and improved per-mile economics." },
                  { icon: Clock, title: "Swap in Under 90 Seconds", desc: "Back on the road in the time it takes to refuel a bike." },
                  { icon: ShieldCheck, title: "Zero Fleet Downtime", desc: "A network designed for continuous availability." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-500 border border-white/10 flex items-center justify-center shadow-lg">
                      <item.icon className="w-6 h-6 text-emerald-50" />
                    </div>
                    <div>
                      <h4 className="font-black text-white text-base tracking-tight mb-1">{item.title}</h4>
                      <p className="text-emerald-100/80 font-medium text-xs leading-relaxed max-w-[280px]">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
              <button className="w-full bg-white text-emerald-700 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl hover:bg-emerald-50 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group cursor-pointer">
                Calculate Your ROI
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PainSolution;