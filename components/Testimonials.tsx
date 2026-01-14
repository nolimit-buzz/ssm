import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const reviews = [
    {
      quote: "SwapStation Mobility transformed our unit economics. We've seen a 38% reduction in total energy costs across our entire dispatch fleet.",
      author: "Tunde Alabi",
      role: "Operations Director, SwiftLogistics",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
      quote: "The speed of the swap is what matters. Our riders stay on the move, with near-continuous uptime and zero charging anxiety.",
      author: "Sarah Johnson",
      role: "Fleet Manager, UrbanExpress",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&h=100&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-emerald-50/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-emerald-700 font-black uppercase tracking-[0.4em] text-xs mb-6 block">Proof of Concept</span>
          <h2 className="text-6xl md:text-8xl font-black mb-8 text-slate-950 tracking-tighter leading-none">
            Driving <br className="md:hidden" /> Change Together.
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-2xl font-medium leading-relaxed">
            Hear from the logistics leaders who have already made the switch to the SwapStation Mobility network.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="p-16 rounded-2xl bg-white border border-slate-100 relative group hover:shadow-2xl transition-all duration-700"
            >
              <Quote className="absolute top-12 right-12 w-20 h-20 text-emerald-600/5 group-hover:text-emerald-600/10 transition-colors" />
              <div className="flex gap-1 mb-10">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-emerald-500 text-emerald-500" />)}
              </div>
              <p className="text-3xl text-slate-800 mb-12 leading-tight font-black tracking-tight italic">"{rev.quote}"</p>
              <div className="flex items-center gap-6">
                <img src={rev.image} alt={rev.author} className="w-20 h-20 rounded-2xl object-cover shadow-xl grayscale hover:grayscale-0 transition-all duration-500" />
                <div>
                  <div className="font-black text-slate-950 text-2xl tracking-tight">{rev.author}</div>
                  <div className="text-sm text-emerald-600 font-black uppercase tracking-[0.2em]">{rev.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;