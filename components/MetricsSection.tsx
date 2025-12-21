import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, useSpring } from 'framer-motion';
import { 
  Zap, 
  Gauge, 
  Navigation, 
  Battery, 
  ShieldCheck, 
  Cpu, 
  Wifi, 
  LayoutGrid, 
  Activity,
  ArrowRight
} from 'lucide-react';

const AnimatedSmallStat = ({ value, label, prefix = "", suffix = "" }: { value: number; label: string; prefix?: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, { stiffness: 50, damping: 25 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, springValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => setDisplayValue(Math.floor(latest)));
  }, [springValue]);

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start px-8 border-r border-slate-200 last:border-0">
      <div className="text-2xl font-black text-slate-950 tabular-nums">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
      <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1 whitespace-nowrap">
        {label}
      </div>
    </div>
  );
};

const AssetCard: React.FC<{ 
  image: string; 
  title: string; 
  bgColor: string;
  accentColor: string;
  specs: { icon: any; label: string; value: string }[];
  delay: number;
}> = ({ 
  image, 
  title, 
  bgColor,
  accentColor,
  specs, 
  delay 
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    className={`group ${bgColor} rounded-2xl overflow-hidden border border-transparent hover:border-emerald-500/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] flex flex-col h-full`}
  >
    <div className="relative aspect-[4/3] flex items-center justify-center p-8 overflow-hidden">
      {/* Background Decorative Element */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full ${accentColor} blur-3xl opacity-30 group-hover:scale-150 transition-transform duration-1000`} />
      
      <motion.img 
        src={image} 
        alt={title} 
        whileHover={{ scale: 1.05, rotate: -2 }}
        className="w-full h-full object-cover rounded-2xl rounded-b-none relative z-10 transition-transform duration-700 filter drop-shadow-2xl"
      />
    </div>
    <div className="p-10 bg-white/40 backdrop-blur-sm border-t border-white/20 flex-grow">
      <h3 className="text-2xl font-black text-slate-950 mb-8 tracking-tight uppercase group-hover:text-emerald-700 transition-colors">
        {title}
      </h3>
      <div className="space-y-5">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-slate-950/5 last:border-0 group/line">
            <div className="flex items-center gap-3">
              <div className="text-slate-400 group-hover/line:text-emerald-600 transition-colors">
                <spec.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{spec.label}</span>
            </div>
            <span className="text-sm font-black text-slate-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const MetricsSection: React.FC = () => {
  const assets = [
    {
      title: "E-Okada Bikes",
      // Professional isolated EV Bike render style
      image: "/e-okada.jpeg",
      bgColor: "bg-emerald-50",
      accentColor: "bg-emerald-400",
      specs: [
        { icon: Gauge, label: "Top Speed", value: "80 km/h" },
        { icon: Navigation, label: "Range", value: "120 km" },
        { icon: Zap, label: "Motor", value: "3kW" },
        { icon: Battery, label: "Battery", value: "4.3 kWh" }
      ]
    },
    {
      title: "Smart Batteries",
      // Professional isolated Battery Pack render style
      image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-blue-50",
      accentColor: "bg-blue-400",
      specs: [
        { icon: Battery, label: "Lithium Pack", value: "4.3kWh" },
        { icon: ShieldCheck, label: "Safety", value: "63-pt BMS" },
        { icon: Wifi, label: "IoT System", value: "Built-in 4G" },
        { icon: Activity, label: "Grade", value: "Automotive" }
      ]
    },
    {
      title: "SwapStation Booth",
      // Professional isolated Swap Hub render style
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-slate-100",
      accentColor: "bg-emerald-300",
      specs: [
        { icon: Cpu, label: "Control", value: "IoT-connected" },
        { icon: LayoutGrid, label: "Capacity", value: "12 Slots" },
        { icon: Zap, label: "Charging", value: "Simultaneous" },
        { icon: Activity, label: "Protocol", value: "Smart Sync" }
      ]
    }
  ];

  return (
    <section id="metrics" className="py-32 px-6 md:px-12 bg-white relative overflow-hidden">
      {/* Structural Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none" 
           style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '60px 60px' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-600 font-black uppercase tracking-[0.5em] text-[10px] mb-6 block"
          >
            Propulsion & Tech Advantage
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-8"
          >
            Your Fleet — Powered by <br className="hidden md:block" /> Smart, Swappable Tech.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-slate-500 max-w-3xl mx-auto text-lg font-medium leading-relaxed"
          >
            SwapStation Mobility combines advanced 2W/3W EVs, intelligent lithium battery packs, and IoT-enabled SwapStations to deliver scalable logistics electrification—built for uptime, safety, and speed.
          </motion.p>
        </div>

        {/* 3-Column Asset Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {assets.map((asset, i) => (
            <AssetCard key={i} {...asset} delay={i * 0.1} />
          ))}
        </div>

        {/* Mini Stats Bar - Positioned Beneath the Assets */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto bg-slate-50 rounded-2xl py-10 px-6 border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0"
        >
          <AnimatedSmallStat value={85000} label="Saved / 100 Swaps" prefix="₦" suffix="+" />
          <AnimatedSmallStat value={120000} label="Clean KM Logged" suffix="+" />
          <AnimatedSmallStat value={200} label="Daily Swaps / Station" suffix="+" />
          <AnimatedSmallStat value={75} label="Station Uptime" suffix="%+" />
          
          <div className="md:px-10">
            <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 hover:gap-4 transition-all">
              Full ROI Audit <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MetricsSection;