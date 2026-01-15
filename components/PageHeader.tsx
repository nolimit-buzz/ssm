import React from 'react';
import { motion } from 'framer-motion';

interface BreadcrumbItem {
  label: string;
  page?: string;
  onClick?: () => void;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  heading: string | React.ReactNode;
  description?: string | React.ReactNode;
  backgroundColor?: string;
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ 
  breadcrumbs, 
  heading, 
  description, 
  backgroundColor = "#020617",
  className = ""
}) => {
  return (
    <section 
      className={`relative min-h-[55vh] flex items-center justify-center pt-32 overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      {/* Background Atmosphere */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        {/* Breadcrumb Navigation */}
        <motion.nav 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center gap-4 mb-8 flex-wrap"
        >
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="text-slate-600 font-black tracking-widest text-[10px]">—</span>
              )}
              {crumb.onClick ? (
                <button 
                  onClick={crumb.onClick}
                  className="text-emerald-400 hover:text-white transition-colors font-black uppercase tracking-[0.5em] text-[10px] cursor-pointer"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px]">
                  {crumb.label}
                </span>
              )}
            </React.Fragment>
          ))}
        </motion.nav>

        {/* Heading */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.1] mb-12"
        >
          {heading}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 max-w-2xl mx-auto text-lg font-medium leading-relaxed"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;


