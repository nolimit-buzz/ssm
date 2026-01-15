import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ArrowUpRight } from 'lucide-react';
import PageHeader from './PageHeader';
import StrategicAlignmentCTA from './StrategicAlignmentCTA';

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
      role: "Co-Founder", 
      image: "/obiora.jpg" 
    },
    { 
      name: "Abiodun Oni", 
      role: "Co-Founder", 
      image: "/abiodun.png" 
    },
    { name: "Okwu Njoku", role: "Director, Non-Executive", image: "/okwu.jpg" }
   
    
  ];

  const board = [
    , ];

  const coreTeam = [
    { name: "Bolarinwa Motoni", role: "CTO", image: "/bola.jpeg" },
    { name: "Morountodun Obaigbo", role: "Director, infrastructure solution", image: "/tundun.jpeg" },
    { name: "Kevin Chukwuma Ebirim", role: "IOT Specialist", image: "/kevin.jpeg" },
    { name: "Idongesit Paulinus", role: "HR & Admin", image: "/idee.jpeg" },
    { name: "Adigun Olawale", role: "Operations Officer", image: "/adigun.jpeg" },
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        breadcrumbs={[
          { label: "HOME", page: "home", onClick: () => onNavigate('home') },
          { label: "THE TEAM" }
        ]}
        heading="Meet the Team"
        description="The visionaries and operators building Africa's electric mobility infrastructure."
      />

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
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-[10px] mb-4 block">FOUNDERS</span>
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

      <StrategicAlignmentCTA
        heading={
          <>
            Help us build the energy <br /> backbone for Africa.
          </>
        }
        buttonText="Careers at SwapStation"
        buttonOnClick={() => onNavigate('contact')}
        badgeText="Join Our Mission"
      />

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