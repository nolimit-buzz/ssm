import React from 'react';

const FinalCTA: React.FC = () => {
  return (
    <section className="py-32 px-6 bg-[#051F19]">
      <div className="max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-2xl border border-white/10 px-6 py-2 rounded-full text-emerald-400 text-[10px] font-black tracking-[0.4em] uppercase mb-10">
          <span>Fleet Electrification</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
          Simplify Your Logistics with SwapStation Mobility
        </h2>
        <p className="text-slate-300 max-w-3xl mx-auto text-lg font-medium leading-relaxed mb-10">
          From fleet optimization to individual lease-to-own programs, we make electric mobility simple, transparent, and scalable — so you can focus on what matters most.
        </p>
        <button className="bg-emerald-600 hover:bg-emerald-500 text-white px-12 py-5 rounded-2xl font-black text-lg transition-all flex items-center gap-4 mx-auto shadow-2xl shadow-emerald-600/20 cursor-pointer">
          Request a Fleet Demo
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;



