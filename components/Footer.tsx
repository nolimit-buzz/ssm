import React from 'react';
import { Twitter, Linkedin, Github, ArrowUpRight } from 'lucide-react';
interface FooterProps {
  onNavigate?: (page: any) => void;
}
const FooterLogo: React.FC = () => {
  return (
   <img src="/logo-light.png" alt="Logo" className="w-auto h-8" />
  );
};

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#020617] border-t border-white/5 px-6 md:px-12 py-24 overflow-hidden relative">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-12 gap-y-16">
          <div className="col-span-2">
            <div className="mb-8">
              <FooterLogo />
            </div>
            <p className="text-slate-500 max-w-sm mb-10 text-md font-medium leading-relaxed">
              Empowering the clean energy transition for commercial logistics through smart battery swapping infrastructure.
            </p>
            <div className="flex items-center gap-4">
              {[Twitter, Linkedin, Github].map((Icon, i) => (
                <a 
                  key={i}
                  href="#" 
                  className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-white uppercase tracking-[0.3em] text-[10px] mb-8 opacity-40">Ecosystem</h4>
            <div className="space-y-5">
              {["Process", "Hub Locations", "Fleet Portal", "Driver App"].map((link) => (
                <a key={link} href="#" className="block text-slate-400 hover:text-emerald-400 font-medium transition-colors text-base">{link}</a>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-white uppercase tracking-[0.3em] text-[10px] mb-8 opacity-40">Company</h4>
            <div className="space-y-5">
              {["Our Mission", "Investors", "Impact 2024", "Careers"].map((link) => (
                <a key={link} href="#" className="block text-slate-400 hover:text-emerald-400 font-medium transition-colors text-base">{link}</a>
              ))}
            </div>
          </div>

          <div className="col-span-2">
            <div className="relative group p-8 rounded-2xl border border-white/10 overflow-hidden shadow-2xl transition-all hover:border-emerald-500/50">
              {/* Background Image Layer - Adjusted for better visibility */}
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://images.unsplash.com/photo-1521618755572-156ae0cdd74d?q=80&w=2000&auto=format&fit=crop" 
                  alt="Insight Background" 
                  className="w-full h-full object-cover opacity-70 group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-[#020617]/50 backdrop-blur-[1px]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.4em]">Industry Insight</span>
                  <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </div>
                <h5 className="font-black text-white text-2xl mb-4 tracking-tight leading-tight">2024 Energy Mobility Report</h5>
                <p className="text-white mb-10 font-bold text-sm leading-relaxed drop-shadow-md">Explore how swapping is beating static charging in Lagos logistics.</p>
                <a href="#" className="inline-block font-black text-white text-sm hover:text-emerald-400 transition-colors border-b-2 border-emerald-500 pb-1">Download PDF</a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-black text-slate-600 uppercase tracking-widest">
          <div>© 2024 SwapStation Mobility. Nigeria.</div>
          <div className="flex gap-10">
            <button onClick={() => onNavigate && onNavigate('privacy')} className="hover:text-white transition-colors">Privacy</button>
            <button onClick={() => onNavigate && onNavigate('terms')} className="hover:text-white transition-colors">Legal</button>
            <button onClick={() => onNavigate && onNavigate('contact')} className="hover:text-white transition-colors">Contact</button>
          </div>
        </div>
      </div>
      
      {/* Absolute Solid Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-600/20" />
    </footer>
  );
};

export default Footer;