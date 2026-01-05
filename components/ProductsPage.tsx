
import React from 'react';
import { motion } from 'framer-motion';
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
  ArrowRight,
  Package,
  Users,
  Headset,
  CheckCircle2,
  Briefcase,
  Plus,
  Weight,
  Thermometer,
  Lock,
  Server
} from 'lucide-react';

interface ProductsPageProps {
  onNavigate: (page: any) => void;
}

const ProductCard: React.FC<{ 
  image: string; 
  title: string; 
  bgColor: string;
  accentColor: string;
  specs: { icon: any; label: string; value: string }[];
  delay: number;
  onClick: () => void;
}> = ({ 
  image, 
  title, 
  bgColor,
  accentColor,
  specs, 
  delay,
  onClick
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    onClick={onClick}
    className={`group ${bgColor} rounded-[1rem] overflow-hidden border border-white/5 hover:border-emerald-500/20 transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] flex flex-col h-full cursor-pointer hover:-translate-y-2`}
  >
    <div className="relative aspect-[4/3] flex items-center justify-center p-8 overflow-hidden bg-slate-900/50">
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full ${accentColor} blur-[80px] opacity-20 group-hover:scale-150 transition-transform duration-1000`} />
      <motion.img 
        src={image} 
        alt={title} 
        className="w-full h-full object-contain relative z-10 transition-transform duration-700 filter drop-shadow-2xl group-hover:scale-110"
      />
      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase text-white tracking-widest">
        View Details
      </div>
    </div>
    <div className="p-10 bg-white backdrop-blur-sm border-t border-slate-100 flex-grow">
      <h3 className="text-2xl font-black text-slate-950 mb-8 tracking-tight uppercase group-hover:text-emerald-700 transition-colors">
        {title}
      </h3>
      <div className="space-y-4">
        {specs.map((spec, i) => (
          <div key={i} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
            <div className="flex items-center gap-3">
              <div className="text-slate-400">
                <spec.icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{spec.label}</span>
            </div>
            <span className="text-sm font-black text-slate-900">{spec.value}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ProductsPage: React.FC<ProductsPageProps> = ({ onNavigate }) => {
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const ecosystem = [
    {
      title: "TANKVOLT T22",
      image: "/e-okada.jpeg",
      bgColor: "bg-emerald-50",
      accentColor: "bg-emerald-400",
      targetId: "tankvolt",
      specs: [
        { icon: Gauge, label: "Top Speed", value: "85 km/h" },
        { icon: Navigation, label: "Range", value: "150 km" },
        { icon: Zap, label: "Motor", value: "3000W" },
        { icon: Battery, label: "Battery", value: "Dual Pack" }
      ]
    },
    {
      title: "SMART BATTERIES",
      image: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-blue-50",
      accentColor: "bg-blue-400",
      targetId: "batteries",
      specs: [
        { icon: Battery, label: "Lithium Pack", value: "4.3kWh" },
        { icon: ShieldCheck, label: "Safety", value: "63-pt BMS" },
        { icon: Wifi, label: "IoT System", value: "Built-in 4G" },
        { icon: Activity, label: "Grade", value: "Automotive" }
      ]
    },
    {
      title: "SWAPSTATION BOOTH",
      image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
      bgColor: "bg-slate-100",
      accentColor: "bg-emerald-300",
      targetId: "booth",
      specs: [
        { icon: Cpu, label: "Control", value: "IoT-connected" },
        { icon: LayoutGrid, label: "Capacity", value: "12 Slots" },
        { icon: Zap, label: "Charging", value: "Simultaneous" },
        { icon: Activity, label: "Protocol", value: "Smart Sync" }
      ]
    }
  ];

  return (
    <div className="bg-[#020617] min-h-screen">
      {/* Header Section */}
      <section className="relative min-h-[55vh] flex items-center justify-center pt-32 overflow-hidden bg-[#020617]">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <button 
              onClick={() => onNavigate('home')}
              className="text-emerald-400 hover:text-white transition-colors font-black uppercase tracking-[0.5em] text-xs"
            >
              HOME
            </button>
            <span className="text-slate-600 font-black tracking-widest text-xs">—</span>
            <span className="text-slate-400 font-black uppercase tracking-[0.5em] text-xs">
              PRODUCTS
            </span>
          </motion.nav>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-12"
          >
            The Future of <br /> <span className="text-gradient">Urban Mobility.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            Integrated hardware and software solutions powering the clean energy transition for commercial logistics.
          </motion.p>
        </div>
      </section>

      {/* Section 1: Core Ecosystem Grid */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Updated Header to match ServicesPage styling */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24">
            <div className="max-w-3xl">
              <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs mb-8 block">
                Propulsion & Tech Advantage
              </span>
              <h2 className="text-5xl font-black text-slate-950 tracking-tighter leading-[1.1]">
                Your Fleet — Powered by <br /> <span className="text-gradient">Smart, Swappable Tech.</span>
              </h2>
            </div>
            <div className="hidden lg:block pb-4">
              <div className="w-24 h-24 rounded-full border border-slate-100 flex items-center justify-center relative">
                  <div className="absolute inset-0 border-t border-emerald-500 rounded-full animate-spin-slow" />
                  <Activity className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {ecosystem.map((item, i) => (
              <ProductCard 
                key={i} 
                {...item} 
                delay={i * 0.1} 
                onClick={() => scrollToSection(item.targetId)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Section 2: TankVolt T22-Pro Deep Dive */}
      <section id="tankvolt" className="py-32 px-6 md:px-12 bg-[#0B0E14] overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          {/* Updated TankVolt Header for consistency (Left aligned) */}
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-20">
             <div className="max-w-3xl">
               <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-6">
                   <Zap className="w-3 h-3 text-emerald-400" />
                   <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">The Flagship</span>
                </div>
                {/* UPDATED TITLE STYLING TO 3REM */}
                <h2 className="text-5xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                   TankVolt <span className="text-emerald-500">T22-Pro</span>
                </h2>
                <p className="text-slate-500 max-w-2xl font-medium text-lg">
                   Engineered specifically for African logistics. Rugged suspension, high payload capacity, and zero emissions.
                </p>
             </div>
          </div>

          <div className="relative flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
            {/* Left Column Stats */}
            <div className="w-full md:w-1/4 space-y-12 order-2 md:order-1">
              <div className="text-center md:text-right">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Electric Motor</div>
                <div className="text-2xl font-black text-white uppercase tracking-tight">3000W</div>
                <div className="text-xs font-bold text-emerald-500 mt-1">High Torque</div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Top Speed</div>
                <div className="text-2xl font-black text-white uppercase tracking-tight">85 km/h</div>
                <div className="text-xs font-bold text-emerald-500 mt-1">Highway Ready</div>
              </div>
              <div className="text-center md:text-right">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Dual Battery</div>
                <div className="text-2xl font-black text-white uppercase tracking-tight">150 km</div>
                <div className="text-xs font-bold text-emerald-500 mt-1">Total Range</div>
              </div>
            </div>

            {/* Center Bike Render */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-full md:w-2/4 relative order-1 md:order-2"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />
              <img 
                src="/e-okada-transparent.png" 
                alt="TankVolt Main" 
                className="w-full h-auto relative z-10 filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform -scale-x-100"
              />
            </motion.div>

            {/* Right Column Specs */}
            <div className="w-full md:w-1/4 space-y-12 order-3">
              <div className="text-center md:text-left">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Payload</div>
                <div className="text-2xl font-black text-white uppercase tracking-tight">200 kg</div>
                <div className="text-xs font-bold text-emerald-500 mt-1">Heavy Duty</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Gradeability</div>
                <div className="text-2xl font-black text-white uppercase tracking-tight">15 Degrees</div>
                <div className="text-xs font-bold text-emerald-500 mt-1">All Terrain</div>
              </div>
              <div className="text-center md:text-left">
                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Warranty</div>
                <div className="text-2xl font-black text-white uppercase tracking-tight">2 Years</div>
                <div className="text-xs font-bold text-emerald-500 mt-1">or 40,000 km</div>
              </div>
            </div>
          </div>

          <div className="mt-20 flex justify-center">
             <button 
               onClick={() => onNavigate('lease-to-own')}
               className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-[1rem] font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-900/20 active:scale-95 flex items-center gap-3"
             >
                Request Fleet Pilot <ArrowRight className="w-5 h-5" />
             </button>
          </div>
        </div>
      </section>

      {/* Section 3A: Smart Batteries */}
      <section id="batteries" className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto space-y-40">
          
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-blue-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Intelligent Energy</span>
              {/* UPDATED TITLE STYLING TO 3REM */}
              <h2 className="text-5xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-8">
                Smart Batteries. <br /> <span className="text-gradient">Maximum Safety.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-12">
                Our automotive-grade Li-ion packs are designed for the high-intensity cycles of commercial logistics. Featuring a 63-point BMS, they constantly monitor health, temperature, and location.
              </p>
              
              <div className="space-y-10">
                {[
                  { icon: ShieldCheck, title: "63-Point BMS", desc: "Real-time monitoring of voltage, current, and temperature cells." },
                  { icon: Activity, title: "Automotive Grade", desc: "NMC chemistry designed for 2000+ cycles at 80% capacity." },
                  { icon: Lock, title: "Anti-Theft IoT", desc: "Remote disabling and GPS tracking embedded in every pack." }
                ].map((feature, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="shrink-0 w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                      <feature.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-xl tracking-tight mb-2">{feature.title}</h4>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                 <button className="text-blue-600 font-black uppercase tracking-widest text-xs border-b-2 border-blue-600 pb-1 hover:text-blue-800 transition-colors">
                    Download Technical Datasheet
                 </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-blue-950 relative">
                <img 
                  src="https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=1200" 
                  alt="Smart Battery" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
              </div>
              {/* Floating Stat Card */}
              <div className="absolute bottom-10 right-[-20px] md:right-[-40px] bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 max-w-[300px]">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Energy Density</div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-black text-slate-950">180</span>
                  <span className="text-xs font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-full">Wh/kg</span>
                </div>
                <div className="text-xs font-medium text-slate-500">High efficiency output for extended range operations.</div>
              </div>
            </motion.div>
          </div>

          {/* Section 3B: SwapStation Booth (Reversed) */}
          <div id="booth" className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1 relative"
            >
              <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl bg-emerald-950 relative">
                <img 
                  src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200" 
                  alt="SwapStation Booth" 
                  className="w-full h-full object-cover"
                />
                 <div className="absolute inset-0 bg-emerald-900/10 mix-blend-multiply" />
              </div>

              {/* NEW FLOATING CARD FOR SWAPSTATION */}
              <div className="absolute bottom-10 right-[-20px] md:right-[-40px] bg-white p-8 rounded-2xl shadow-2xl border border-slate-100 max-w-[300px] z-20">
                <div className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Grid Reliability</div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl font-black text-slate-950">99.9</span>
                  <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">% Uptime</span>
                </div>
                <div className="text-xs font-medium text-slate-500">Solar-hybrid redundancy ensures continuous operation.</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Infrastructure</span>
              {/* UPDATED TITLE STYLING TO 3REM */}
              <h2 className="text-5xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-8">
                The SwapStation <br /> <span className="text-gradient">Smart Hub.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                A modular, automated energy vending machine. Fully integrated with solar inputs and grid backups to ensure 99.9% network uptime for your fleet.
              </p>
              
              <ul className="space-y-6">
                {[
                  { icon: LayoutGrid, text: "12-Slot Simultaneous Charging" },
                  { icon: Thermometer, text: "Active Thermal Management" },
                  { icon: Server, text: "4G/5G Network Redundancy" },
                  { icon: CheckCircle2, text: "Swap in < 60 Seconds" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                       <item.icon className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-slate-950 tracking-tight">{item.text}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => onNavigate('contact')}
                className="mt-12 bg-slate-950 text-white px-10 py-5 rounded-[1rem] font-black uppercase tracking-widest transition-all hover:bg-emerald-600 active:scale-95 flex items-center gap-4"
              >
                Partner on Infrastructure <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Final CTA Section */}
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
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-2 rounded-full text-emerald-50 text-xs font-black tracking-[0.4em] uppercase mb-12">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Strategic Alignment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-10 leading-tight">
            Ready to integrate with <br /> Africa's energy backbone?
          </h2>
          <button className="bg-white hover:bg-emerald-50 text-emerald-900 px-12 py-5 rounded-[1rem] font-black text-md transition-all flex items-center gap-4 mx-auto group shadow-2xl shadow-emerald-900/20">
            Contact for Strategic Info
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;
