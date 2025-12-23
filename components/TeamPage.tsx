import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Plus, Linkedin, ArrowUpRight } from 'lucide-react';

interface TeamPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact' | 'team') => void;
}

const TeamCard: React.FC<{ name: string; role: string; image: string; delay: number; isLarge?: boolean }> = ({ name, role, image, delay, isLarge = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    className="group"
  >
    <div className="aspect-[3/4] overflow-hidden rounded-2xl mb-6 bg-slate-100 border border-slate-200 relative">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-40 transition-opacity" />
      
      {/* Social Overlay on Hover */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-emerald-600 transition-all">
          <Linkedin className="w-4 h-4" />
        </button>
      </div>
    </div>
    
    <div className="px-1">
      <h3 className={`${isLarge ? 'text-xl' : 'text-lg'} font-black text-slate-900 tracking-tight leading-tight mb-1 group-hover:text-emerald-600 transition-colors`}>
        {name}
      </h3>
      <p className="text-xs font-black text-emerald-600 uppercase tracking-[0.2em]">
        {role}
      </p>
    </div>
  </motion.div>
);

const TeamPage: React.FC<TeamPageProps> = ({ onNavigate }) => {
  const management = [
    { 
      name: "Obiora Okoye", 
      role: "Managing Partner", 
      image: "/obiora.jpg" 
    },
    { 
      name: "Okwu Njoku", 
      role: "Director", 
      image: "/okwu.jpg" 
    }
  ];

  const coreTeam = [
    // { name: "Jojololami Ngene", role: "Technical Analyst", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
    { name: "Oluwatobi Sholanke", role: "Financial Analyst", image: "/solanke.png" },
    { name: "Ahmed Musa", role: "Head of Operations", image: "/ahmed.png" },
    // { name: "Chioma Uzor", role: "Senior Hardware Engineer", image: "https://images.unsplash.com/photo-1589156229687-496a31ad1d1f?q=80&w=800&auto=format&fit=crop" },
    // { name: "David Kone", role: "Grid Integration", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop" },
    // { name: "Sarah Bello", role: "IoT Systems Lead", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop" },
    // { name: "Ibrahim K.", role: "Fleet Deployment", image: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?q=80&w=800&auto=format&fit=crop" },
    // { name: "Nneka Obi", role: "Impact Lead", image: "https://images.unsplash.com/photo-1567532939604-b6c5b0ad2e01?q=80&w=800&auto=format&fit=crop" },
    // { name: "Tunde Alabi", role: "Network Architect", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop" },
    // { name: "Grace Edem", role: "Compliance Lead", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop" },
    // { name: "Femi Ade", role: "BMS Engineering", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop" },
    // { name: "Amara Okeke", role: "Supply Chain", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop" }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section (Dark Theme - Standardized) */}
      <section className="relative min-h-[55vh] flex items-center justify-center pt-32 overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
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
              THE TEAM
            </span>
          </motion.nav>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-6xl font-black text-white tracking-tighter leading-[1.1] mb-12"
          >
            Driven by <span className="text-gradient">Integrity</span> <br /> & Global Expertise.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed"
          >
            A collective of specialists with over 38 years of experience in clean energy finance, infrastructure development, and automotive engineering.
          </motion.p>
        </div>
      </section>

      {/* Management Section (Light Theme) */}
      <section className="max-w-7xl mx-auto py-24 bg-white relative">
        <div className="inset-0 opacity-[0.02] pointer-events-none select-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '60px 60px' }} />

        <div className="mx-auto flex flex-col md:flex-row gap-16 lg:gap-24 relative z-10">
          {/* Side Title */}
          
          
          <div className="hidden md:w-[120px] shrink-0 pt-4">
             {/* <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 0.05, x: 0 }}
              viewport={{ once: true }}
              className="absolute top-0 left-0 text-[3rem] lg:text-[4.7rem] font-thin text-slate-900 tracking-[0.2em] uppercase leading-none vertical-text-desktop pointer-events-none select-none"
             >
               MANAGEMENT
             </motion.h2> */}
             
             {/* <div className="mt-4 md:hidden">
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px]">LEADERSHIP</span>
             </div> */}
          </div>
          <div className="mb-20 text-center lg:text-left">
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">LEADERSHIP</span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-950 tracking-tighter leading-tight">
              Executive Leadership Team.
            </h2>
          </div>

          {/* Management Grid */}
          <div className="flex-grow grid sm:grid-cols-2 gap-10 lg:gap-16">
            {management.map((m, i) => (
              <div key={i} className="max-w-md mx-auto w-full">
                <TeamCard {...m} delay={i * 0.1} isLarge={true} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Core Team Section (Light Theme) */}
      <section className="py-32 px-6 md:px-12 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center lg:text-left">
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">THE TEAM</span>
            <h2 className="text-2xl md:text-4xl font-black text-slate-950 tracking-tighter leading-tight">
              Operational & Technical Excellence.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {coreTeam.map((member, i) => (
              <TeamCard key={i} {...member} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section (Dark Theme) */}
      <section className="py-32 px-6 bg-[#051F19]">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-2 rounded-full text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase mb-12">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join Our Mission</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-10 leading-tight">
            Help us build the energy <br /> backbone for Africa.
          </h2>
          <button 
            onClick={() => onNavigate('contact')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-[1rem] font-black text-base transition-all flex items-center gap-4 mx-auto group shadow-2xl shadow-emerald-600/20"
          >
            Careers at SwapStation
            <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </section>

      <style>{`
        @media (min-width: 768px) {
          .vertical-text-desktop {
            writing-mode: vertical-rl;
            transform: rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default TeamPage;