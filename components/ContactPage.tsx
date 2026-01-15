import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Plus,
  ShieldCheck,
  Building2,
  TrendingUp,
  Lock
} from 'lucide-react';
import PageHeader from './PageHeader';

interface ContactPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact') => void;
}

const SSM_STATS = [
  {
    value: "Over US$10 billion",
    description: "in completed financing across Africa in energy and infrastructure projects by Blackaion Principals."
  },
  {
    value: "40% Cost Reduction",
    description: "average energy cost savings for last-mile delivery partners within the first 12 months."
  },
  {
    value: "1.2 Million Clean KM",
    description: "logged across the SwapStation network as of Q4 2023, driving sustainable impact."
  },
  {
    value: "250+ Active Hubs",
    description: "deployed across Sub-Saharan Africa, supporting over 5,000 commercial riders daily."
  }
];

const StatsSlider: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SSM_STATS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[16/10] lg:aspect-square rounded-[1rem] overflow-hidden shadow-2xl border border-slate-100">
      {/* Static Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1200" 
          alt="SSM Infrastructure" 
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 via-transparent to-slate-900/20" />
      </div>

      {/* Floating Stat Card Slider */}
      <div className="absolute inset-0 p-8 md:p-12 flex items-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[320px] bg-[#051F19] p-8 md:p-10 shadow-[0_30px_60px_-12px_rgba(0,0,0,0.5)] border border-white/5 relative z-10 rounded-[1rem]"
          >
            <div className="text-emerald-400 mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <div className="text-white text-3xl md:text-4xl font-black tracking-tighter mb-6 leading-[1.1]">
              {SSM_STATS[index].value}
            </div>
            <div className="w-12 h-[1px] bg-emerald-500/50 mb-6" />
            <p className="text-emerald-100/60 text-xs md:text-sm font-medium leading-relaxed">
              {SSM_STATS[index].description}
            </p>
            
            {/* Progress indicators */}
            <div className="flex gap-2 mt-8">
              {SSM_STATS.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1 transition-all duration-500 rounded-full ${i === index ? 'w-8 bg-emerald-500' : 'w-2 bg-white/20'}`} 
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        breadcrumbs={[
          { label: "HOME", page: "home", onClick: () => onNavigate('home') },
          { label: "CONTACT" }
        ]}
        heading={
          <>
            Let's Drive <br /> Forward, <span className="text-gradient">Together.</span>
          </>
        }
        description="Partner with Africa's most resilient e-mobility network. Reach out for strategic deployment, investment inquiries, or pilot programs."
      />

      {/* Main Content Area - White Theme */}
      <section className="px-6 md:px-12 py-32 bg-white relative">
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none" 
             style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '60px 60px' }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            
            {/* Form Column */}
            <div className="flex flex-col gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 border border-slate-100 p-12 rounded-[1rem] shadow-sm flex-grow"
              >
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Let's Talk!</h3>
                <p className="text-slate-500 font-medium mb-12">Get in touch with us using the enquiry form or contact details below.</p>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">First Name</label>
                      <input type="text" placeholder="Obiora" className="w-full bg-white border border-slate-200 rounded-[1rem] px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Last Name</label>
                      <input type="text" placeholder="Okoye" className="w-full bg-white border border-slate-200 rounded-[1rem] px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Work Email</label>
                    <input type="email" placeholder="partner@swapstation.mobility" className="w-full bg-white border border-slate-200 rounded-[1rem] px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Message</label>
                    <textarea rows={4} placeholder="Tell us about your fleet or project..." className="w-full bg-white border border-slate-200 rounded-[1rem] px-5 py-4 text-slate-900 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all font-medium resize-none"></textarea>
                  </div>

                  <div className="space-y-4 pt-4">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="mt-1 accent-emerald-600" />
                      <span className="text-slate-500 text-xs font-medium leading-relaxed group-hover:text-slate-700 transition-colors">I agree to receive other communication messages from SwapStation Mobility.*</span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input type="checkbox" className="mt-1 accent-emerald-600" />
                      <span className="text-slate-500 text-xs font-medium leading-relaxed group-hover:text-slate-700 transition-colors">I give my consent to SwapStation to store my data.*</span>
                    </label>
                  </div>

                  <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-5 rounded-[1rem] font-black text-lg transition-all flex items-center justify-center gap-4 mt-10 group shadow-xl shadow-emerald-600/20 active:scale-[0.98] cursor-pointer">
                    Send Strategic Inquiry
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </button>

                  <div className="mt-8 pt-8 border-t border-slate-200 flex items-start gap-3 text-slate-400">
                    <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                    <p className="text-[11px] font-medium leading-relaxed">
                      Privacy is important to us. We process your data according to our Privacy Policy to handle your inquiry effectively. Your information is strictly for strategic alignment and is never sold to third parties.
                    </p>
                  </div>
                </form>
              </motion.div>

              {/* Socials moved to the bottom of the form column */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 border border-slate-100 p-8 rounded-[1rem] flex items-center justify-between"
              >
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Follow our mission</h4>
                <div className="flex gap-4">
                  {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                    <a key={i} href="#" className="w-12 h-12 rounded-[1rem] bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Info Column */}
            <div className="space-y-16 lg:pl-10 flex flex-col justify-between">
              
              {/* Global Contact Info */}
              <div className="space-y-10">
                 <div className="flex gap-6 group">
                   <div className="w-14 h-14 rounded-[1rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                     <Mail className="w-6 h-6" />
                   </div>
                   <div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Quick Contact</div>
                     <div className="text-2xl font-bold text-slate-900 tracking-tight">info@swapstation.mobility</div>
                   </div>
                 </div>

                 <div className="flex gap-6 group">
                   <div className="w-14 h-14 rounded-[1rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                     <Phone className="w-6 h-6" />
                   </div>
                   <div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Phone Number</div>
                     <div className="text-2xl font-bold text-slate-900 tracking-tight">Nigeria: +234 810 555 0123</div>
                     <div className="text-sm text-slate-500 font-medium">Lagos Office HQ</div>
                   </div>
                 </div>

                 <div className="flex gap-6 group">
                   <div className="w-14 h-14 rounded-[1rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                     <Building2 className="w-6 h-6" />
                   </div>
                   <div>
                     <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Headquarter</div>
                     <div className="text-2xl font-bold text-slate-900 tracking-tight">Lagos Mainland Hub</div>
                     <div className="text-sm text-slate-500 font-medium">Plot 42, Innovation Way, Lagos, Nigeria.</div>
                   </div>
                 </div>
              </div>

              {/* Fun Stats Slider */}
              <div className="space-y-8 mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Fun Stats & Impact</h4>
                </div>
                <StatsSlider />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;