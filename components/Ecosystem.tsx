import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Briefcase, CheckCircle2, Plus } from 'lucide-react';

const strategicPartners = [
  "InfraCredit", 
  "Siemens", 
  "Sterling", 
  "Chapel Hill Denham", 
  "Stanbic IBTC", 
  "TotalEnergies",
  "Glovo",
  "Kwik",
  "Jumia Logistics",
  "GIG Logistics",
  "Sendbox",
  "Konga Food"
];

const PartnerCard: React.FC<{ name: string }> = ({ name }) => (
  <div className="w-full p-8 bg-white/5 border border-white/5 rounded-2xl flex flex-col justify-between min-h-[180px] group hover:border-emerald-500/30 transition-all duration-300">
    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-slate-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
      <Building2 className="w-5 h-5" />
    </div>
    <div>
      <div className="text-slate-500 font-black uppercase tracking-widest text-[8px] mb-2">Strategic Partner</div>
      <div className="text-xl font-black text-white tracking-tight leading-tight">
        {name}
      </div>
    </div>
  </div>
);

const ScrollingColumn: React.FC<{ items: string[], direction: 'up' | 'down' }> = ({ items, direction }) => {
  const tripledItems = [...items, ...items, ...items];
  
  return (
    <div className="flex-1 h-full overflow-hidden relative">
      <motion.div
        animate={{
          y: direction === 'up' ? ["0%", "-33.333%"] : ["-33.333%", "0%"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex flex-col gap-4"
      >
        {tripledItems.map((item, i) => (
          <PartnerCard key={`${item}-${i}`} name={item} />
        ))}
      </motion.div>
    </div>
  );
};

const Ecosystem: React.FC = () => {
  const mid = Math.ceil(strategicPartners.length / 2);
  const col1 = strategicPartners.slice(0, mid);
  const col2 = strategicPartners.slice(mid);

  const features = [
    "100% Nigerian-led JV",
    "AssetCo + PowerCo model",
    "SEC & CAC Registered"
  ];

  return (
    <section id="network" className="py-24 px-6 md:px-12 bg-[#060b1d] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-900/10 via-[#060b1d] to-[#060b1d] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">Our Ecosystem</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter leading-tight mb-8">
              Seamlessly Integrated <br /> with Africa’s Giants.
            </h2>
            <p className="text-slate-400 text-base font-medium leading-relaxed max-w-xl mb-12">
              From last-mile delivery experts to multinational logistics aggregators, we provide the energy layer that allows fleet operators to focus on their core business.
            </p>
            
            <div className="space-y-4">
              <span className="text-emerald-500 font-black uppercase tracking-[0.6em] text-[9px] block">Founders</span>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {/* Blackaion Card */}
                <div className="bg-[#0f172a]/40 border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-emerald-500 font-black uppercase tracking-widest text-[9px] mb-0.5">Founding Investor</div>
                    <div className="text-lg font-bold text-white tracking-tight">Blackaion Capital</div>
                  </div>
                </div>

                {/* FundCo Card */}
                <div className="bg-[#0f172a]/40 border border-white/5 p-6 rounded-2xl flex flex-col gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                    <Briefcase className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <div className="text-emerald-500 font-black uppercase tracking-widest text-[9px] mb-0.5">Infrastructure Partner</div>
                    <div className="text-lg font-bold text-white tracking-tight leading-tight">FundCo Capital Managers</div>
                  </div>
                </div>
              </div>

              {/* Bottom Feature Bar */}
              <div className="w-full bg-[#020617]/50 border border-emerald-500/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-3 w-full md:w-auto">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-slate-200 font-medium tracking-tight text-[14px]">{feature}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 transition-colors p-4 md:p-5 rounded-2xl flex items-center justify-between md:gap-8 shadow-lg group">
                  <div className="text-left">
                    <div className="text-[9px] font-black uppercase tracking-widest text-emerald-200 opacity-80 mb-0.5">Join Network</div>
                    <div className="text-white font-bold text-base">Strategic Alignment</div>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5 text-white" />
                  </div>
                </button>
              </div>
            </div>
          </motion.div>

          <div className="relative h-[600px] flex gap-4 overflow-hidden mask-fade-vertical">
            <ScrollingColumn items={col1} direction="up" />
            <ScrollingColumn items={col2} direction="down" />
            
            <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#060b1d] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#060b1d] to-transparent z-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ecosystem;