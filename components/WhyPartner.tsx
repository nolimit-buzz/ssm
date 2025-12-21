import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, BarChart3, Globe } from 'lucide-react';

const WhyPartner: React.FC = () => {
  const reasons = [
    {
      icon: ShieldCheck,
      title: "Decarbonized Transport",
      desc: "Instant ESG impact through 100% clean mobility operations."
    },
    {
      icon: BarChart3,
      title: "Real-time Intelligence",
      desc: "Full data transparency + complete battery lifecycle tracking."
    },
    {
      icon: Globe,
      title: "Scalable Infrastructure",
      desc: "Trusted urban and rural deployment models for high-growth regions."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-emerald-600 relative overflow-hidden text-white">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none">
        <svg viewBox="0 0 400 400" className="h-full w-full" preserveAspectRatio="none">
          <path d="M400 0 L0 400 L400 400 Z" fill="white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-100 font-black uppercase tracking-[0.4em] text-xs mb-6 block">The Trust Factor</span>
            <h2 className="text-5xl font-black tracking-tighter leading-[1.1] mb-10">
              Why Fleet Operators, Financiers, and Regulators Trust Us.
            </h2>
            <p className="text-emerald-50 font-medium text-lg leading-relaxed max-w-xl">
              We're not just a platform — we're infrastructure. We enable the backbone of sustainable logistics through trusted delivery and energy financing relationships.
            </p>
          </motion.div>

          <div className="space-y-6">
            {reasons.map((r, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-8 p-10 rounded-2xl bg-white/10 border border-white/10 group hover:border-white transition-all duration-500"
              >
                <div className="shrink-0 w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                  <r.icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-2xl font-black mb-3 tracking-tight">{r.title}</h4>
                  <p className="text-emerald-50/70 font-medium text-sm leading-relaxed">{r.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyPartner;