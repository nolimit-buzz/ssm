
import React, { useState } from 'react';
import { Menu, User, ChevronRight, MapPin, ChevronDown, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  scrolled: boolean;
  currentPage: 'home' | 'about' | 'services' | 'contact' | 'locator' | 'team' | 'products' | 'news' | 'single-news' | 'lease-to-own';
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact' | 'locator' | 'team' | 'products' | 'news' | 'single-news' | 'lease-to-own') => void;
  showThemeToggle?: boolean;
  isDarkMode?: boolean;
  onToggleTheme?: () => void;
}

const Logo: React.FC<{ scrolled: boolean; onNavigate: (page: any) => void; isDarkMode?: boolean }> = ({ scrolled, onNavigate, isDarkMode }) => {
  // If scrolled, color depends on theme. If not scrolled, usually white (transparent header on hero)
  const color = scrolled ? (isDarkMode ? "#10b981" : "#10b981") : "#ffffff";
  const textColor = scrolled ? (isDarkMode ? "text-white" : "text-slate-900") : "text-white";
  const logo = scrolled ? "/logo.png" : "/logo-light.png";
  return (
    <button 
      onClick={() => onNavigate('home')}
      className={`flex items-center transition-all duration-700 ease-[0.16, 1, 0.3, 1] ${scrolled ? 'gap-2' : 'gap-4'}`}
    >
     <img src={logo} alt="Logo" className="w-auto h-8" />
    </button>
  );
};

const Header: React.FC<HeaderProps> = ({ scrolled, currentPage, onNavigate, showThemeToggle, isDarkMode, onToggleTheme }) => {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);

  const navItems = [
    { 
      name: "ABOUT", 
      page: "about",
      children: [{ name: "TEAM", page: "team" }]
    },
    { 
      name: "SERVICES", 
      page: "services",
      children: [
        { name: "PRODUCTS", page: "products" },
        { name: "ASSET FINANCING", page: "lease-to-own" }
      ]
    },
    { name: "NEWS", page: "news" },
    { name: "CONTACT", page: "contact" }
  ];

  const handleLinkClick = (page: string) => {
    onNavigate(page as any);
  };

  const isActive = (item: typeof navItems[0]) => {
    if (currentPage === item.page) return true;
    if (item.children) {
      return item.children.some(child => child.page === currentPage);
    }
    return false;
  };

  // Determine header background classes
  let headerClasses = 'bg-transparent border-b border-white/10 py-7'; // Default transparent
  
  if (scrolled) {
    if (isDarkMode) {
      // Scrolled but Dark Mode (e.g. Locator Dark)
      headerClasses = 'bg-[#020617]/90 border-b border-white/5 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.2)]';
    } else {
      // Scrolled Light Mode (e.g. Locator Light or Home Scrolled)
      headerClasses = 'bg-white/95 border-b border-slate-200/60 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)]';
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[1001] transition-all duration-700 ease-[0.16, 1, 0.3, 1] px-6 md:px-12 backdrop-blur-md ${headerClasses}`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Logo scrolled={scrolled} onNavigate={onNavigate} isDarkMode={isDarkMode} />

        <nav className={`hidden lg:flex items-center gap-10 text-xs font-black uppercase tracking-[0.2em] transition-all duration-700 ${
          scrolled ? (isDarkMode ? 'text-slate-300' : 'text-slate-900') : 'text-slate-300'
        }`}>
          {navItems.map((item) => (
            <div 
              key={item.name}
              className="relative group h-full"
              onMouseEnter={() => setHoveredNav(item.name)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <button 
                onClick={() => handleLinkClick(item.page)}
                className={`hover:text-emerald-500 transition-colors flex items-center gap-1 py-4 text-xs ${
                  isActive(item) ? 'text-emerald-500' : ''
                }`}
              >
                {item.name}
                {item.children && (
                  <ChevronDown className="w-3 h-3 opacity-50 group-hover:rotate-180 transition-transform duration-300" />
                )}
              </button>

              {/* Dropdown Menu */}
              {item.children && (
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-48 transition-all duration-300 ${
                    hoveredNav === item.name ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'
                  }`}
                >
                  <div className={`rounded-xl border shadow-xl overflow-hidden p-2 flex flex-col gap-1 ${
                    scrolled && !isDarkMode
                      ? 'bg-white border-slate-100' 
                      : 'bg-slate-900/95 border-white/10 backdrop-blur-xl'
                  }`}>
                    {item.children.map((child) => (
                      <button
                        key={child.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLinkClick(child.page);
                          setHoveredNav(null);
                        }}
                        className={`text-left px-4 py-3 rounded-lg text-xs font-black uppercase tracking-widest transition-colors ${
                          scrolled && !isDarkMode
                            ? 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600' 
                            : 'text-slate-400 hover:bg-white/5 hover:text-white'
                        } ${currentPage === child.page ? 'text-emerald-500' : ''}`}
                      >
                        {child.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          {showThemeToggle && (
            <button
              onClick={onToggleTheme}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                scrolled && !isDarkMode
                  ? 'bg-slate-100 text-slate-900 hover:bg-slate-200' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          )}

          <button 
            onClick={() => onNavigate('locator')}
            className={`hidden sm:flex items-center gap-2 border-2 px-6 py-2.5 rounded-[15rem] text-xs font-black transition-all uppercase tracking-widest duration-700 ${
            scrolled && !isDarkMode
              ? 'border-emerald-600/20 text-emerald-600 hover:bg-emerald-600 hover:text-white' 
              : 'border-white/10 text-white hover:border-emerald-500 hover:bg-emerald-500/10'
          } group`}>
            <MapPin className="w-4 h-4 transition-transform group-hover:scale-110" />
            <span>Find a Station</span>
          </button>
          
          <button className={`rounded-[15rem] text-xs font-black transition-all shadow-xl active:scale-95 uppercase tracking-[0.15em] flex items-center gap-2 group ${
            scrolled && !isDarkMode
              ? 'bg-[#020617] hover:bg-slate-800 text-white shadow-slate-950/20 px-7 py-3' 
              : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 px-8 py-3.5'
          }`}>
            Get Started
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button className={`lg:hidden transition-colors duration-700 ${scrolled && !isDarkMode ? 'text-slate-900' : 'text-white'}`}>
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
