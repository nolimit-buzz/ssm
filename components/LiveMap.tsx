import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Info, RefreshCcw } from 'lucide-react';

const LiveMap: React.FC = () => {
  const stations = [
    { name: "Lagos Mainland Hub", status: "Active", uptime: "99.8%", batteries: 24 },
    { name: "Victoria Island Station", status: "Active", uptime: "99.9%", batteries: 18 },
    { name: "Lekki Phase 1 Depot", status: "Active", uptime: "99.9%", batteries: 32 },
  ];

  return (
    <section id="network" className="py-32 px-6 md:px-12 bg-[#F8F9FA] relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 text-emerald-600 font-black mb-8 uppercase tracking-[0.4em] text-xs">
              <RefreshCcw className="w-5 h-5 animate-spin-slow" />
              <span>Real-Time Intelligence</span>
            </div>
            <h2 className="text-4xl font-black mb-10 leading-[1.1] text-slate-950 tracking-tighter">
              Total Visibility Into Your Fleet’s Fuel.
            </h2>
            <p className="text-slate-500 text-md mb-12 leading-relaxed font-medium">
              Explore our growing network of live and planned swap hubs.
            </p>

            <div className="grid grid-cols-2 gap-8 mb-16">
              <div className="p-10 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="text-emerald-600 text-6xl font-black mb-2 tabular-nums leading-none tracking-tighter">158</div>
                <div className="text-slate-400 text-sm font-black uppercase tracking-widest">Active Batteries</div>
              </div>
              <div className="p-10 rounded-2xl bg-white border border-slate-100 shadow-sm">
                <div className="text-emerald-600 text-6xl font-black mb-2 tabular-nums leading-none tracking-tighter">94%</div>
                <div className="text-slate-400 text-sm font-black uppercase tracking-widest">Network Ready</div>
              </div>
            </div>

            <button className="bg-slate-950 text-white px-12 py-6 rounded-2xl font-black text-lg flex items-center gap-4 hover:bg-emerald-600 transition-all group shadow-2xl">
              Find a Swap Station
              <div className="w-12 h-1.5 bg-emerald-500 rounded-full" />
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Seamless background flow */}
            <div className="aspect-[4/5] md:aspect-square bg-white rounded-2xl p-10 md:p-12 relative overflow-hidden border border-slate-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.05)]">
              {/* Subtle Map Underlay */}
              <div className="absolute inset-0 opacity-[0.04] pointer-events-none p-10 grayscale">
                 <img 
                   src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=1920&auto=format&fit=crop" 
                   className="w-full h-full object-cover" 
                   alt="map pattern" 
                 />
              </div>

              {/* Station Hotspots */}
              <div className="space-y-6 relative z-10">
                <h4 className="text-slate-950 font-black mb-12 flex items-center gap-4 text-3xl tracking-tight">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center">
                    <MapPin className="w-7 h-7 text-emerald-600" />
                  </div>
                  Lagos Coverage Hub
                </h4>
                
                {stations.map((station, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between px-5 py-7 rounded-2xl bg-white border border-slate-50 transition-all cursor-default shadow-[0_8px_30px_rgb(0,0,0,0.04)] group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                      <div>
                        <div className="font-black text-slate-950 text-xl tracking-tight leading-none mb-3">{station.name}</div>
                        <div className="text-[11px] text-slate-400 font-black uppercase tracking-[0.2em]">{station.uptime} Uptime</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-black text-emerald-600 leading-none mb-2 tabular-nums">{station.batteries}</div>
                      <div className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">Available</div>
                    </div>
                  </motion.div>
                ))}

                {/* Faint scroll hint */}
                <div className="w-full h-24 bg-gradient-to-t from-white to-transparent absolute bottom-0 left-0 rounded-b-2xl" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LiveMap;