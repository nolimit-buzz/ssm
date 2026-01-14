
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

interface NewsSectionProps {
  onNavigate?: (page: any) => void;
  onReadArticle?: (article: any) => void;
  onNavigateToCategory?: (category: string) => void;
}

const newsData = [
  {
    id: 1,
    category: "Transactions",
    date: "October 24, 2024",
    title: "Swap Station Closes $10M Series A Funding Round",
    excerpt: "Securing capital to expand our infrastructure footprint across 5 new states in Nigeria, led by Blackaion Capital.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100"
  },
  {
    id: 2,
    category: "Milestones",
    date: "September 12, 2024",
    title: "250th Swap Hub Deployed in Lagos Mainland",
    excerpt: "Marking a significant milestone in our mission to densify the urban energy network for last-mile logistics.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100"
  },
  {
    id: 3,
    category: "Press Release",
    date: "August 05, 2024",
    title: "Strategic Partnership with Glovo Announced",
    excerpt: "Powering the next generation of green delivery fleets with zero-downtime swaps and integrated telemetry.",
    image: "https://images.unsplash.com/photo-1758519289022-5f9dea0d8cdc?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100"
  }
];

const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate, onReadArticle, onNavigateToCategory }) => {
  return (
    <section id="news" className="py-32 px-6 md:px-12 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">
              Newsroom
            </span>
            <h2 className="text-4xl md:text-4xl font-black text-slate-900 tracking-tighter leading-tight">
              Latest Updates & <br /> <span className="text-gradient">Market Intelligence.</span>
            </h2>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onClick={() => onNavigate && onNavigate('news')}
            className="hidden md:flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors group"
          >
            View All News <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {newsData.map((item, index) => (
            <motion.article
              key={item.id}
              onClick={() => onReadArticle && onReadArticle(item)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col h-full cursor-pointer"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onNavigateToCategory) onNavigateToCategory(item.category);
                    }}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${item.bgColor} ${item.color} border ${item.borderColor} hover:bg-white hover:shadow-md transition-all`}
                  >
                    {item.category}
                  </button>
                </div>
              </div>

              <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.date}
                </div>
                
                <h3 className="text-lg font-black text-slate-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow">
                  {item.excerpt}
                </p>

                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors">
                  Read Article <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-12 md:hidden text-center">
           <button 
             onClick={() => onNavigate && onNavigate('news')}
             className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-emerald-600 transition-colors"
           >
            View All News <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
