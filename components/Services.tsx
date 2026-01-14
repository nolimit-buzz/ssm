import React from 'react';
import { motion } from 'framer-motion';
import { 
  Settings, 
  MapPin, 
  Activity, 
  Bike, 
  Zap, 
  Wrench, 
  Users, 
  LayoutDashboard, 
  Link as LinkIcon,
  ChevronRight
} from 'lucide-react';

const ServiceGroup: React.FC<{ 
  title: string; 
  icon: any; 
  items: { icon: any; label: string; sub: string }[];
  delay: number;
  bgImage: string;
  isReversed?: boolean;
}> = ({ 
  title, 
  icon: Icon, 
  items, 
  delay,
  bgImage,
  isReversed = false
}) => {
  const bgVariants = {
    hidden: { opacity: 0, scale: 1.1, filter: 'blur(8px)' },
    visible: { opacity: 1, scale: 1, filter: 'blur(0px)' }
  };

  return (
    <motion.div
      initial="initial"
      whileHover="interaction"
      viewport={{ once: true }}
      className="relative p-8 md:p-10 rounded-3xl bg-emerald-900/50 backdrop-blur-3xl border border-white/20 hover:border-white/60 transition-all duration-500 overflow-hidden flex flex-col h-full group shadow-[0_40px_100px_-20px_rgba(2,44,34,0.7)] ring-1 ring-white/10"
    >
      {/* Dynamic Background Image Layer */}
      <motion.div 
        variants={{
          initial: isReversed ? bgVariants.visible : bgVariants.hidden,
          interaction: isReversed ? bgVariants.hidden : bgVariants.visible
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={bgImage} 
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#064e3b]/90 backdrop-blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#064e3b] via-[#064e3b]/60 to-transparent" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-6 mb-12">
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-white flex items-center justify-center text-emerald-600 shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-hover:scale-110 transition-transform duration-500 ring-4 ring-white/10">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-white tracking-widest uppercase drop-shadow-md">{title}</h3>
        </div>

        <div className="space-y-8 flex-grow">
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-6 group/item">
              <div className="shrink-0 w-12 h-12 rounded-2xl bg-white/20 border border-white/10 flex items-center justify-center text-white group-hover/item:bg-white group-hover/item:text-emerald-600 transition-all duration-300 shadow-lg">
                <item.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-black text-base tracking-tight mb-1">{item.label}</div>
                <div className="text-emerald-50 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-10 border-t border-white/10 group-hover:border-white/30 transition-colors">
          <button className="flex items-center gap-3 text-white text-xs font-black uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
            Explore Stack <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const serviceData = [
    {
      title: "Infrastructure",
      icon: Settings,
      bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2070&auto=format&fit=crop",
      isReversed: true,
      items: [
        { icon: Zap, label: "Swap Stations", sub: "Modular, solar- and grid-integrated swap units." },
        { icon: MapPin, label: "Location Optimization", sub: "Data-driven hub placement and network planning." },
        { icon: Activity, label: "Uptime APIs", sub: "Enterprise-grade monitoring with high-availability network performance." }
      ]
    },
    {
      title: "Vehicles",
      icon: Bike,
      bgImage: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?q=80&w=2000&auto=format&fit=crop",
      items: [
        { icon: LinkIcon, label: "EV Lease-to-Own", sub: "Flexible ownership pathways for commercial riders." },
        { icon: Activity, label: "Battery-as-a-Service", sub: "Unlimited range through physical energy exchange." },
        { icon: Wrench, label: "Maintenance & Retrofits", sub: "Full-lifecycle technical fleet support." }
      ]
    },
    {
      title: "Enablement",
      icon: LayoutDashboard,
      bgImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop",
      items: [
        { icon: Users, label: "Rider Onboarding", sub: "Recruitment, safety training, and operational readiness." },
        { icon: LayoutDashboard, label: "IoT Dashboards", sub: "Real-time telemetry and fleet performance insights." },
        { icon: LinkIcon, label: "Fleet Integration", sub: "Native API connectivity for logistics and delivery platforms." }
      ]
    }
  ];

  return (
    <section id="solutions" className="py-32 px-6 md:px-12 bg-emerald-600 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-emerald-100 font-black uppercase tracking-[0.5em] text-xs mb-6 block"
          >
            What We Offer – Service Stack
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-8"
          >
            Built for Fleet Scale — <br className="hidden md:block" /> Designed for Operational Simplicity.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {serviceData.map((group, i) => (
            <ServiceGroup 
              key={i} 
              title={group.title} 
              icon={group.icon} 
              items={group.items} 
              delay={i * 0.1}
              bgImage={group.bgImage}
              isReversed={group.isReversed}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;