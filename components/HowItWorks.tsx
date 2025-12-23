import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { Smartphone, MapPin, RefreshCw, Zap, Clock } from 'lucide-react';

const StatCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, { stiffness: 60, damping: 30 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      springValue.set(value);
    }
  }, [isInView, springValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return () => unsubscribe();
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue}{suffix}
    </span>
  );
};

const HowItWorks: React.FC = () => {
  const steps = [
    {
      icon: Smartphone,
      title: "Check Status",
      desc: "Rider monitors battery levels via our real-time IoT platform."
    },
    {
      icon: MapPin,
      title: "Navigate",
      desc: "Automated routing to the nearest optimized swap station."
    },
    {
      icon: RefreshCw,
      title: "Rapid Swap",
      desc: "Instant physical exchange of depleted units for fully charged power."
    },
    {
      icon: Zap,
      title: "Continue",
      desc: "Immediate resumption of delivery journey with zero downtime."
    }
  ];

  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden px-6 md:px-12 bg-white">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl opacity-[0.03] pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-900" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-12 mb-24">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-emerald-600 font-black uppercase tracking-[0.5em] text-xs mb-6 block">Battery Swap Workflow</span>
            <h2 className="text-4xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-6">
              Swap. Ride. Repeat. <br /> All Under 3 Minutes.
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-950 text-white p-8 rounded-2xl flex items-center gap-6 shadow-2xl shadow-slate-950/20"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-1">Avg. Swap Time</div>
              <div className="text-4xl font-black tabular-nums">
                <StatCounter value={180} suffix="s" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Horizontal Process Flow */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-0">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[10%] right-[10%] h-[1px] bg-slate-100 z-0" />

          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.8 }}
              className="relative z-10 px-4 group"
            >
              <div className="flex flex-col items-center md:items-start text-center md:text-left">
                {/* Step Icon & Number */}
                <div className="relative mb-8">
                  <div className="w-28 h-28 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600 group-hover:border-emerald-500/30 transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:scale-110">
                    <step.icon className="w-10 h-10 transition-transform duration-500 group-hover:rotate-[360deg]" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center text-sm font-black shadow-lg">
                    0{idx + 1}
                  </div>
                </div>

                <h3 className="text-xl font-black mb-4 text-slate-950 tracking-tight group-hover:text-emerald-600 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed max-w-[240px]">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;