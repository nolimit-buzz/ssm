import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ArrowUpRight } from 'lucide-react';

const Newsroom: React.FC = () => {
  const items = [
    {
      category: "Funding",
      title: "SwapStation closes Pre-Seed Funding Round: 2023",
      body: "Securing initial capital to pilot our Battery-as-a-Service commercial model across locations in Lagos, led by Blackaion and FundCo Capital Managers."
    },
    {
      category: "Scale",
      title: "Proven Scale: 2025",
      body: "10,000+ battery swaps completed and 150+ electric motorcycles already deployed."
    },
    {
      category: "Impact",
      title: "Environmental Impact: 2025",
      body: "300+ tonnes of CO2 avoided to date."
    },
    {
      category: "Infrastructure",
      title: "Infrastructure",
      body: "7 solar-powered swap stations currently operational across Lagos and Abuja. A major milestone in densifying the urban energy network for last-mile logistics."
    },
    {
      category: "Partnerships",
      title: "Major Partnerships",
      body: "Completed a successful 12-month B2B pilot with Glovo and signed agreements with Kwik, Uber, Moli Logistics and FoodCourt."
    },
    {
      category: "Partnerships",
      title: "Strategic Partnership with Glovo Announced",
      body: "Powering next-generation green delivery fleets with zero-downtime swaps and integrated telemetry."
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-10 mb-16">
          <div className="max-w-3xl">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-6 block">
              Latest Updates &amp; Market Intelligence
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter leading-[1.1] mb-4">
              Newsroom
            </h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Track SwapStation Mobility’s milestones across funding, deployment scale, environmental impact, and strategic partnerships.
            </p>
          </div>
          <div className="hidden lg:block pb-4">
            <div className="w-24 h-24 rounded-full border border-slate-200 flex items-center justify-center relative">
              <div className="absolute inset-0 border-t border-emerald-500 rounded-full animate-spin-slow" />
              <Newspaper className="w-7 h-7 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05, duration: 0.7 }}
              className="p-8 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-white hover:border-emerald-500/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-3">
                  {item.category}
                </div>
                <h3 className="text-xl font-black text-slate-950 tracking-tight leading-tight mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm font-medium leading-relaxed">
                  {item.body}
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between text-xs font-black text-slate-400 uppercase tracking-[0.2em]">
                <span>Read more soon</span>
                <ArrowUpRight className="w-4 h-4 text-emerald-500" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Newsroom;



