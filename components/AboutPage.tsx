import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useSpring } from 'framer-motion';
import { Shield, Target, Globe, Users, Briefcase, Award, Zap, ChevronRight, ArrowRight, Download, ArrowUpRight, Plus } from 'lucide-react';
import Partners from './Partners';
import PageHeader from './PageHeader';

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
  isText?: boolean;
  textValue?: string;
}> = ({ value, suffix, isFloat, label, bgImage, delay, isDefaultHovered = false, isText = false, textValue }) => {
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
          className="text-2xl md:text-3xl font-black mb-8 tracking-tighter leading-tight"
        >
          {isText ? (
            <span>{textValue}</span>
          ) : (
            <ImpactCounter value={value} suffix={suffix} isFloat={isFloat} />
          )}
        </motion.div>
        
        <motion.p 
          variants={{
            initial: { color: isDefaultHovered ? "rgba(255,255,255,0.8)" : "#64748b" },
            hover: { color: isDefaultHovered ? "#64748b" : "rgba(255,255,255,0.8)" }
          }}
          className="font-medium leading-relaxed text-sm"
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
      label: "Reduction in last-mile energy costs for logistics partners during pilot operations.",
      bgImage: "https://images.unsplash.com/photo-1548335122-f548ca1288f6?auto=format&fit=crop&q=80&w=800"
    },
    {
      value: 1.2,
      suffix: "M km",
      isFloat: true,
      label: "Clean kilometres logged across the SwapStation network to date.",
      bgImage: "https://images.unsplash.com/photo-1611241893603-3c359704e0ee?auto=format&fit=crop&q=80&w=800",
      isDefaultHovered: true
    },
    {
      value: 0,
      suffix: "",
      label: "Primary logistics hubs designed with solar-hybrid integration.",
      bgImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
      isText: true,
      textValue: "Renewable-powered hubs"
    },
    {
      value: 250,
      suffix: "+",
      label: "Active and planned swap hubs supporting thousands of riders daily.",
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
              isText={stat.isText}
              textValue={stat.textValue}
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
      role: "Co-Founder", 
      image: "/obiora.jpg" 
    },
    { 
      name: "Abiodun Oni", 
      role: "Co-Founder", 
      image: "/abiodun.png" 
    },
    { 
      name: "Okwu Njoku", 
      role: "Director, Non-Executive", 
      image: "/okwu.jpg" 
    },
    { 
      name: "Oluwatobi Sholanke", 
      role: "Financial Analyst", 
      image: "/ahmed.png" 
    }
  ];

  return (
    <div className="bg-white">
      <PageHeader
        breadcrumbs={[
          { label: "HOME", page: "home", onClick: () => onNavigate('home') },
          { label: "ABOUT" }
        ]}
        heading={
          <>
            Enabling the transition <br /> to <span className="text-gradient">electric mobility.</span>
          </>
        }
        description="SwapStation Mobility is building the operational backbone for electric logistics across Sub-Saharan Africa."
      />

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
                SwapStation Mobility was founded to accelerate the adoption of electric mobility across Africa's commercial logistics sector. We design, deploy, and operate renewable-powered battery swapping infrastructure that enables electric vehicles to operate reliably in both urban and peri-urban markets—reducing operating costs, improving fleet uptime, and lowering emissions.
              </p>
              <p className="text-slate-500 text-base font-medium leading-relaxed">
                SwapStation Mobility is backed by experienced infrastructure investors and operators, including Blackaion Capital and FundCo Capital Managers, who provide strategic, technical, and financial support as the platform scales.
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
                Our vision is to solve <span className="text-gradient">transport and mobility</span> challenges through scalable, commercially viable infrastructure.
              </h2>
              
              <div className="space-y-6 mb-10">
                <p className="text-slate-400 font-medium leading-relaxed text-base">
                  SwapStation Mobility was founded by operators and investors with over 38 years of combined experience across energy, clean infrastructure finance, project development, and large-scale asset deployment in Africa.
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
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-2 rounded-full text-emerald-50 text-[10px] font-black tracking-[0.4em] uppercase mb-12">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Strategic Alignment</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-10 leading-tight">
            Ready to integrate with <br /> Africa's energy backbone?
          </h2>
          <button className="bg-white hover:bg-emerald-50 text-emerald-900 px-12 py-5 rounded-2xl font-black text-md transition-all flex items-center gap-4 mx-auto group shadow-2xl shadow-emerald-900/20">
            Contact for Strategic Partnerships
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;