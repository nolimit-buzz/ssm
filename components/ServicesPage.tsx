import React from 'react';
import { motion } from 'framer-motion';
import PageHeader from './PageHeader';
import StrategicAlignmentCTA from './StrategicAlignmentCTA';
import { 
  Building2, 
  Zap, 
  Battery, 
  Settings, 
  LayoutDashboard, 
  PieChart, 
  ShieldCheck, 
  Activity, 
  ArrowUpRight
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact') => void;
}

const ServiceCard: React.FC<{ 
  title: string; 
  description: string; 
  icon: any; 
  delay: number;
}> = ({ title, description, icon: Icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.8 }}
    className="w-full p-10 bg-slate-50 border border-slate-100 rounded-[1rem] flex flex-col justify-between min-h-[300px] group hover:border-emerald-500/30 hover:bg-white hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500"
  >
    <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 group-hover:scale-110">
      <Icon className="w-7 h-7" />
    </div>
    <div className="mt-8">
      <div className="text-emerald-600 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Core Offering</div>
      <h3 className="text-xl font-black text-slate-950 tracking-tight leading-tight mb-6 group-hover:text-emerald-600 transition-colors">
        {title}
      </h3>
      <p className="text-slate-500 font-medium leading-relaxed text-sm">
        {description}
      </p>
    </div>
  </motion.div>
);

const SpecializationPill: React.FC<{ label: string; delay: number }> = ({ label, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="bg-white/10 border border-white/10 p-6 rounded-[1rem] flex items-center gap-4 group hover:bg-white/20 transition-all cursor-default"
  >
    <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white transition-all">
      <ShieldCheck className="w-5 h-5" />
    </div>
    <span className="text-sm font-bold text-white tracking-tight">{label}</span>
  </motion.div>
);

const ServicesPage: React.FC<ServicesPageProps> = ({ onNavigate }) => {
  const mainServices = [
    {
      title: "Integrated Infrastructure Solutions",
      description: "Modular swapping hubs designed with solar integration to ensure resilient power sourcing for last-mile logistics operations across Sub-Saharan Africa.",
      icon: Building2
    },
    {
      title: "Energy & Power Portfolio",
      description: "Comprehensive battery-as-a-service models coupled with 100% clean energy distribution, slashing operational overhead for commercial fleets.",
      icon: Zap
    },
    {
      title: "Smart Storage Systems",
      description: "Automotive-grade lithium battery packs featuring advanced IoT telemetry and 63-point BMS for maximum safety and cycle-life efficiency.",
      icon: Battery
    },
    {
      title: "Fleet Enablement",
      description: "Precision-engineered e-mobility solutions including flexible EV leasing, technical retrofits, and comprehensive fleet maintenance support.",
      icon: Settings
    },
    {
      title: "Network Intelligence",
      description: "Enterprise-level dashboards providing real-time telemetry for battery health, location tracking, and granular energy usage analytics.",
      icon: LayoutDashboard
    },
    {
      title: "Strategic Asset Mgmt",
      description: "Expert project development and capital structuring for large-scale energy infrastructure projects, ensuring long-term bankable returns.",
      icon: PieChart
    }
  ];

  const specializations = [
    "Technical Advisory",
    "Project Management",
    "Risk Assessment",
    "Capital Structuring",
    "Asset Lifecycle Mgmt",
    "ESG Impact Reporting"
  ];

  return (
    <div className="bg-[#020617]">
      <PageHeader
        breadcrumbs={[
          { label: "HOME", page: "home", onClick: () => onNavigate('home') },
          { label: "SERVICES" }
        ]}
        heading={
          <>
            Defining the Future <br /> of <span className="text-gradient">Africa's Mobility.</span>
          </>
        }
        description="SwapStation Mobility is the clean-energy infrastructure backbone powering logistics ecosystems through a vertically integrated service stack."
        backgroundColor="#020617"
        className="border-b border-white/5"
      />

      {/* Main Services Grid (Light Theme) */}
      <section className="py-32 px-6 md:px-12 relative bg-white overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-10 mb-24">
            <div className="max-w-3xl">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-600 mb-8 block">
                The Service Stack
              </span>
              <h2 className="text-4xl font-black text-slate-950 tracking-tighter leading-[1.1]">
                End-to-end infrastructure <br /> for <span className="text-gradient">clean energy mobility.</span>
              </h2>
            </div>
            <div className="hidden lg:block pb-4">
              <div className="w-24 h-24 rounded-full border border-slate-100 flex items-center justify-center relative">
                 <div className="absolute inset-0 border-t border-emerald-500 rounded-full animate-spin-slow" />
                 <Activity className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, i) => (
              <ServiceCard 
                key={i} 
                title={service.title} 
                description={service.description} 
                icon={service.icon} 
                delay={i * 0.1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Specializations Section (Site Green) */}
      <section className="py-32 px-6 md:px-12 bg-emerald-600 relative overflow-hidden border-y border-white/10">
        {/* Geometric Decor */}
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="none">
            <path d="M400 0 L0 400 L400 400 Z" fill="white" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <span className="text-white font-black uppercase tracking-[0.4em] text-[10px] mb-8 block opacity-80">
                Technical Mastery
              </span>
              <h2 className="text-4xl font-black text-white tracking-tighter leading-[1] mb-12">
                Specialized in <br /> <span>Complex Integration.</span>
              </h2>
              <p className="text-emerald-50 text-base font-medium leading-relaxed max-w-xl mb-12">
                Our team brings over 38 years of collective experience in sustainable energy, project finance, and infrastructure development to solve Sub-Saharan Africa's mobility challenges.
              </p>
              
              <button className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest hover:gap-6 transition-all group">
                Download Capabilities PDF
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-emerald-600 transition-all">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {specializations.map((spec, i) => (
                <SpecializationPill key={i} label={spec} delay={i * 0.1} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <StrategicAlignmentCTA
        heading={
          <>
            Ready to integrate with <br /> Africa's energy backbone?
          </>
        }
        buttonText="Contact for Strategic Partnerships"
        buttonOnClick={() => onNavigate('contact')}
      />
    </div>
  );
};

export default ServicesPage;