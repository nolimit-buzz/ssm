import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Sun, Zap, Globe, ArrowUpRight } from 'lucide-react';

const WhatBuilding: React.FC = () => {
  const pillars = [
    {
      icon: Battery,
      title: "Fleet Infrastructure",
      desc: "High-performance swap stations, maximum uptime, and smart grid integration.",
      tag: "Infrastructure"
    },
    {
      icon: Sun,
      title: "Solar + IoT Layer",
      desc: "Resilient power sourcing coupled with real-time telemetry and tracking.",
      tag: "Technology"
    },
    {
      icon: Zap,
      title: "Vehicle Access",
      desc: "Precision EVs, professional retrofits, and long-life battery ecosystems.",
      tag: "Mobility"
    },
    {
      icon: Globe,
      title: "Partnerships",
      desc: "Strategic alliances with aggregators, DFIs, and minigrid developers.",
      tag: "Ecosystem"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-32 bg-white px-6 md:px-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="max-w-3xl"
          >
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">What We’re Building</span>
            <h2 className="text-5xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-8">
              We’re Building the Energy Layer for Africa’s Electric Logistics.
            </h2>
            <p className="text-slate-500 text-xl font-medium leading-relaxed max-w-2xl">
              Swap Station Mobility is the clean-energy infrastructure backbone powering logistics ecosystems across Sub-Saharan Africa — from riders to stations to solar.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block pb-4"
          >
            <div className="w-32 h-32 rounded-full border border-slate-100 flex items-center justify-center relative">
               <div className="absolute inset-0 border-t border-emerald-500 rounded-full animate-spin-slow" />
               <ArrowUpRight className="w-8 h-8 text-emerald-600" />
            </div>
          </motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {pillars.map((pillar, i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group p-10 rounded-2xl bg-slate-50 border border-slate-100/80 transition-all duration-500 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] hover:border-emerald-500/30"
            >
              <div className="mb-10 flex justify-between items-start">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-emerald-600 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                  <pillar.icon className="w-8 h-8" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-emerald-500 transition-colors">
                  {pillar.tag}
                </span>
              </div>
              
              <h4 className="text-2xl font-black text-slate-950 mb-4 tracking-tight leading-none">
                {pillar.title}
              </h4>
              <p className="text-slate-500 font-medium text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                {pillar.desc}
              </p>
              
              <div className="mt-8 pt-8 border-t border-slate-200/50 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                 <button className="text-emerald-600 text-xs font-black uppercase tracking-widest flex items-center gap-2">
                   Learn More <ArrowUpRight className="w-4 h-4" />
                 </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Subtle Background Infusion */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full -translate-x-1/2" />
    </section>
  );
};

export default WhatBuilding;