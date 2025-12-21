import React from 'react';
import { motion } from 'framer-motion';

const Funders: React.FC = () => {
  const founders = [
    { name: "Blackaion Capital", role: "Founding Investor" },
    { name: "FundCo Capital Managers", role: "Capital Infrastructure Partner" }
  ];

  const partners = [
    "InfraCredit", "Siemens", "Sterling", "Chapel Hill Denham"
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-white relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-32">
          <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Our Foundation</span>
          <h2 className="text-4xl md:text-[4rem] font-black text-slate-950 tracking-tighter leading-[1.1] mb-12">
            Brought to Life by Visionary <br className="hidden lg:block" /> Infrastructure Partners.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-12">
            <h4 className="text-2xl font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-4">Founders</h4>
            <div className="grid sm:grid-cols-2 gap-12">
              {founders.map((f, i) => (
                <div key={i}>
                  <div className="text-4xl font-black text-slate-950 mb-2 tracking-tighter">{f.name}</div>
                  <div className="text-emerald-600 font-black uppercase tracking-widest text-xs">{f.role}</div>
                </div>
              ))}
            </div>
            <div className="bg-slate-50 p-10 rounded-2xl border border-slate-100">
              <ul className="space-y-6">
                {[
                  "38+ Years of Infra & Energy Experience",
                  "100% Nigerian-led Joint Venture",
                  "Diversified model: AssetCo + PowerCo",
                  "Registered with SEC & CAC"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-slate-700 font-bold">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
             <h4 className="text-2xl font-black uppercase tracking-widest text-slate-400 border-b border-slate-100 pb-4 mb-12">Strategic Partners</h4>
             <div className="grid grid-cols-2 gap-8">
               {partners.map((p, i) => (
                 <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center text-center font-black text-slate-950 text-xl tracking-tight">
                   {p}
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Funders;