import React from 'react';
import { Menu, User, ChevronRight, MapPin } from 'lucide-react';
import logoLight from '../public/logo-light.png';
import logoDark from '../public/logo.png'
interface HeaderProps {
  scrolled: boolean;
  currentPage: 'home' | 'about' | 'services' | 'contact' | 'locator' | 'team';
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact' | 'locator' | 'team') => void;
}

const Logo: React.FC<{ scrolled: boolean; onNavigate: (page: 'home' | 'about' | 'services' | 'contact' | 'locator' | 'team') => void }> = ({ scrolled, onNavigate }) => {
  const color = scrolled ? "#10b981" : "#ffffff";
  const textColor = scrolled ? "text-slate-900" : "text-white";
  const image = scrolled? logoDark:logoLight
  return (
    <button 
      onClick={() => onNavigate('home')}
      className={`flex items-center transition-all duration-700 ease-[0.16, 1, 0.3, 1] ${scrolled ? 'gap-2' : 'gap-4'}`}
    >
     <img src={image} alt="Logo" className="w-auto h-8" />
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ scrolled, currentPage, onNavigate }) => {
  const links = [
    { name: "ABOUT", page: "about" },
    { name: "SERVICES", page: "services" },
    { name: "TEAM", page: "team" },
    // { name: "INFRASTRUCTURE", page: "home", anchor: "solutions" },
    { name: "CONTACT", page: "contact" }
  ];

  const handleLinkClick = (link: typeof links[0]) => {
    if (link.page === 'about' || link.page === 'services' || link.page === 'contact' || link.page === 'team') {
      onNavigate(link.page as any);
    } else {
      onNavigate('home');
      if (link.anchor) {
        setTimeout(() => {
          document.getElementById(link.anchor!)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[1001] transition-all duration-700 ease-[0.16, 1, 0.3, 1] px-6 md:px-12 backdrop-blur-md ${
        scrolled 
          ? 'bg-white/85 border-b border-slate-200/60 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]' 
          : 'bg-transparent border-b border-white/10 py-7'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo scrolled={scrolled} onNavigate={onNavigate} />

        <nav className={`hidden lg:flex items-center gap-10 text-xs font-black uppercase tracking-[0.2em] transition-all duration-700 ${
          scrolled ? 'text-slate-900' : 'text-slate-300'
        }`}>
          {links.map((link) => (
            <button 
              key={link.name}
              onClick={() => handleLinkClick(link)} 
              className={`hover:text-emerald-500 transition-colors relative group uppercase ${
                (currentPage === link.page && !link.anchor) ? 'text-emerald-500' : ''
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-300 group-hover:w-full ${
                scrolled ? 'bg-emerald-500' : 'bg-emerald-500'
              }`}></span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <button 
            onClick={() => onNavigate('locator')}
            className={`hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-[15rem] text-xs font-black transition-all uppercase tracking-widest duration-700 ${
            scrolled 
              ? 'border-emerald-600/20 text-emerald-600 hover:bg-emerald-600 hover:text-white' 
              : 'border-white/10 text-white hover:border-emerald-500 hover:bg-emerald-500/10'
          } group`}>
            {/* <MapPin className="w-4 h-4 transition-transform group-hover:scale-110" /> */}
            <span>Portal</span>
          </button>
          
          <button className={`rounded-[15rem] text-xs font-black transition-all shadow-xl active:scale-95 uppercase tracking-[0.15em] flex items-center gap-2 group ${
            scrolled 
              ? 'bg-[#020617] hover:bg-slate-800 text-white shadow-slate-950/20 px-7 py-3' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 px-8 py-3.5'
          }`}>
            Get Started
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button className={`lg:hidden transition-colors duration-700 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;