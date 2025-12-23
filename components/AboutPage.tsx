import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';
import { Shield, Target, Globe, Users, Briefcase, Award, Zap, ChevronRight, ArrowRight, Download, ArrowUpRight, Plus } from 'lucide-react';
import Partners from './Partners';

interface AboutPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact') => void;
}

const ProductImages = [
  "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80&w=1200",
  "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200"
];

const ImpactCounter = ({ value, suffix = "", isFloat = false }: { value: number; suffix?: string, isFloat?: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const springValue = useSpring(0, { stiffness: 40, damping: 20 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) springValue.set(value);
  }, [isInView, springValue, value]);

  useEffect(() => {
    return springValue.on("change", (latest) => setDisplayValue(latest));
  }, [springValue]);

  return (
    <span ref={ref} className="tabular-nums">
      {isFloat ? displayValue.toFixed(1) : Math.floor(displayValue)}
      {suffix}
    </span>
  );
};

const ImpactCard: React.FC<{
  value: number;
  suffix: string;
  isFloat?: boolean;
  label: string;
  bgImage: string;
  delay: number;
  isDefaultHovered?: boolean;
}> = ({ value, suffix, isFloat, label, bgImage, delay, isDefaultHovered = false }) => {
  return (
    <motion.div
      initial="initial"
      whileHover="hover"
      viewport={{ once: true }}
      className="relative h-[320px] rounded-[1rem] overflow-hidden border border-slate-100 group transition-all duration-700 bg-white cursor-pointer"
    >
      {/* Background Image & Overlay Logic */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img
          src={bgImage}
          alt="Impact background"
          variants={{
            initial: { opacity: isDefaultHovered ? 1 : 0, scale: isDefaultHovered ? 1 : 1.1 },
            hover: { opacity: isDefaultHovered ? 0 : 1, scale: isDefaultHovered ? 1.1 : 1 }
          }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="w-full h-full object-cover"
        />
        <motion.div 
          variants={{
            initial: { opacity: isDefaultHovered ? 1 : 0 },
            hover: { opacity: isDefaultHovered ? 0 : 1 }
          }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[#051F19]/80 backdrop-blur-[2px]" 
        />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
        <motion.div 
          variants={{
            initial: { color: isDefaultHovered ? "#FFFFFF" : "#0f172a" },
            hover: { color: isDefaultHovered ? "#0f172a" : "#FFFFFF" }
          }}
          className="text-4xl md:text-5xl font-black mb-8 tracking-tighter"
        >
          <ImpactCounter value={value} suffix={suffix} isFloat={isFloat} />
        </motion.div>
        
        <motion.p 
          variants={{
            initial: { color: isDefaultHovered ? "rgba(255,255,255,0.8)" : "#64748b" },
            hover: { color: isDefaultHovered ? "#64748b" : "rgba(255,255,255,0.8)" }
          }}
          className="font-medium leading-relaxed"
        >
          {label}
        </motion.p>
      </div>
    </motion.div>
  );
};

const ImpactSection: React.FC = () => {
  const stats = [
    {
      value: 40,
      suffix: "%",
      label: "Reduction in last-mile delivery energy costs for our logistics partners in the first year.",
      bgImage: "https://images.unsplash.com/photo-1548335122-f548ca1288f6?auto=format&fit=crop&q=80&w=800"
    },
    {
      value: 1.2,
      suffix: "M",
      isFloat: true,
      label: "Total clean kilometers logged across the SwapStation network as of Q4 2023.",
      bgImage: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?auto=format&fit=crop&q=80&w=800",
      isDefaultHovered: true
    },
    {
      value: 100,
      suffix: "%",
      label: "Availability of renewable power at our primary solar-integrated logistics hubs.",
      bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800"
    },
    {
      value: 250,
      suffix: "+",
      label: "Active hubs deployed across Sub-Saharan Africa, supporting over 5,000 riders daily.",
      bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-slate-50/80 border-y border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-20">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 block">
              Our impact
            </span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-black text-slate-900 tracking-tighter leading-[1] mb-12"
            >
              Elevate your <span className="text-gradient">fleet performance</span> with clean energy solutions.
            </motion.h2>
          </div>

          {/* Animated Circular Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="hidden lg:block pb-4"
          >
            <div className="w-32 h-32 rounded-full border border-slate-200 flex items-center justify-center relative">
               <div className="absolute inset-0 border-t border-emerald-500 rounded-full animate-spin-slow" />
               <ArrowUpRight className="w-8 h-8 text-emerald-600" />
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <ImpactCard
              key={i}
              value={stat.value}
              suffix={stat.suffix}
              isFloat={stat.isFloat}
              label={stat.label}
              bgImage={stat.bgImage}
              delay={i * 0.1}
              isDefaultHovered={stat.isDefaultHovered}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TeamCard: React.FC<{ name: string; role: string; image: string; delay: number }> = ({ name, role, image, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group"
  >
    <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-white/5 border border-white/5">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
      />
    </div>
    <h4 className="text-lg font-bold text-white tracking-tight leading-tight mb-1">{name}</h4>
    <p className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{role}</p>
  </motion.div>
);

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % ProductImages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const team = [
    { 
      name: "Obiora Okoye", 
      role: "Managing Partner", 
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      name: "Okwu Njoku", 
      role: "Director", 
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      name: "Jojololami Ngene", 
      role: "Technical Analyst", 
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" 
    },
    { 
      name: "Oluwatobi Sholanke", 
      role: "Financial Analyst", 
      image: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?q=80&w=800&auto=format&fit=crop" 
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative min-h-[55vh] flex items-center justify-center pt-32 overflow-hidden bg-[#020617]">
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
              className="text-emerald-400 hover:text-white transition-colors font-black uppercase tracking-[0.5em] text-[10px]"
            >
              HOME
            </button>
            <span className="text-slate-600 font-black tracking-widest text-[10px]">—</span>
            <span className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px]">
              ABOUT
            </span>
          </motion.nav>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-12"
          >
            Enabling the transition <br /> to <span className="text-gradient">electric mobility.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed"
          >
            Swap Station Mobility (SSM) Limited is piloting the operational backbone for Sub-Saharan Africa's logistics EV platform.
          </motion.p>
        </div>
      </section>

      {/* Story Section (Who We Are) */}
      <section className="py-32 px-6 md:px-12 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-start">
          
          {/* Left Side Content */}
          <div className="flex flex-col h-full">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 block">
              Who We Are
            </span>
            
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter leading-[1] mb-12">
              Technology-enabled, <span className="text-gradient">Vision-driven.</span>
            </h2>
            
            <div className="space-y-6 mb-12">
              <p className="text-slate-600 text-base font-semibold leading-relaxed">
                SwapStation Mobility Limited was set up to accelerate the adoption of e-mobility in both urban and rural markets, to improve livelihoods and the environment by providing renewable powered battery swapping facility to electric vehicles in Africa.
              </p>
              <p className="text-slate-500 text-base font-medium leading-relaxed">
                Blackaion Capital and FundCo Capital Managers are co-sponsoring Swapstation Mobility Limited—an electric vehicle and battery charging infrastructure company that enables access to low-cost, clean mobility alternatives to the internal combustion engine (ICE), initially targeting the logistics and last-mile delivery sector.
              </p>
            </div>
            
            <button className="flex items-center gap-4 text-slate-900 font-black text-sm uppercase tracking-widest hover:gap-6 transition-all group mb-20">
              Download our Brochure 
              <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </div>
            </button>
            
            <div className="mt-auto border-t border-slate-100 pt-12">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-8 block">
                Founders
              </span>
              <div className="flex items-center gap-12 grayscale opacity-60">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-600 rounded-lg" />
                  <span className="font-black text-slate-900 text-xs tracking-tight">Blackaion Capital</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-950 rounded-lg" />
                  <span className="font-black text-slate-900 text-xs tracking-tight">FundCo Managers</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Image & Overlay Stat */}
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl relative bg-slate-900">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImg}
                  src={ProductImages[currentImg]}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Stat Card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="absolute bottom-[-40px] left-[-40px] md:bottom-12 md:left-[-60px] max-w-[340px] bg-[#051F19] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white/5"
            >
              <div className="text-white text-4xl md:text-5xl font-black tracking-tighter mb-6">
                Over US$10 <br /> billion
              </div>
              <div className="w-full h-[1px] bg-white/10 mb-8" />
              <p className="text-emerald-100/60 text-xs font-medium leading-relaxed">
                in completed financing across Africa in energy and infrastructure projects by Blackaion Principals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <ImpactSection />

      {/* Team Section (Dark Mode) */}
      <section className="py-32 px-6 md:px-12 bg-[#020617] border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-20">
            <div className="max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 mb-8 block">
                Our team
              </span>
              <h2 className="text-4xl font-black text-white tracking-tight leading-[1] mb-12">
                Our vision is to solve <span className="text-gradient">transport and mobility</span> challenges across Africa.
              </h2>
              
              <div className="space-y-6 mb-10">
                <p className="text-slate-400 font-medium leading-relaxed text-base">
                  SwapStation Mobility was founded by managing partners with over 38 years in sustainable energy, clean energy finance, project development, infrastructure development and project finance.
                </p>
              </div>

              <button className="px-8 py-3 rounded-xl border border-white/10 text-white font-black text-xs uppercase tracking-widest hover:bg-white/5 transition-all">
                Read more
              </button>
            </div>
            
            {/* Animated Circular Arrow Side Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="hidden lg:block pb-4"
            >
              <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative">
                 <div className="absolute inset-0 border-t border-emerald-500 rounded-full animate-spin-slow" />
                 <ArrowUpRight className="w-8 h-8 text-emerald-500" />
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
            {team.map((member, i) => (
              <TeamCard 
                key={i} 
                name={member.name} 
                role={member.role} 
                image={member.image} 
                delay={i * 0.1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <Partners />

      {/* Final CTA Section (Synced with Services Page) */}
      <section className="py-32 px-6 bg-[#051F19]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-2 rounded-full text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase mb-12">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Strategic Alignment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-10 leading-tight">
            Ready to integrate with <br /> Africa's energy backbone?
          </h2>
          <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black text-base transition-all flex items-center gap-4 mx-auto group shadow-2xl shadow-emerald-600/20">
            Contact for Strategic Info
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;