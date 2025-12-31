
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GENERATED_NEWS, NewsCard } from './NewsPage';

interface NewsCategoryPageProps {
  category: string;
  onNavigate: (page: any) => void;
  onReadArticle: (article: any) => void;
}

const NewsCategoryPage: React.FC<NewsCategoryPageProps> = ({ category, onNavigate, onReadArticle }) => {
  
  const filteredNews = useMemo(() => {
    if (!category) return [];
    return GENERATED_NEWS.filter(
      item => item.category.toLowerCase() === category.toLowerCase()
    );
  }, [category]);

  return (
    <div className="bg-white min-h-screen">
      {/* --- HERO SECTION (Standardized) --- */}
      <section className="relative min-h-[55vh] flex items-center justify-center pt-32 overflow-hidden bg-[#020617]">
        {/* Atmosphere */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <motion.nav 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <button 
              onClick={() => onNavigate('home')}
              className="text-emerald-400 hover:text-white transition-colors font-black uppercase tracking-[0.5em] text-xs"
            >
              HOME
            </button>
            <span className="text-slate-600 font-black tracking-widest text-xs">—</span>
            <button 
              onClick={() => onNavigate('news')}
              className="text-emerald-400 hover:text-white transition-colors font-black uppercase tracking-[0.5em] text-xs"
            >
              NEWS
            </button>
            <span className="text-slate-600 font-black tracking-widest text-xs">—</span>
            <span className="text-slate-400 font-black uppercase tracking-[0.5em] text-[10px]">
              {category.toUpperCase()}
            </span>
          </motion.nav>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-12"
          >
            Latest in <span className="text-gradient">{category}.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed"
          >
            Curated updates and insights focused on {category.toLowerCase()} within the e-mobility ecosystem.
          </motion.p>
        </div>
      </section>

      {/* --- GRID SECTION --- */}
      <section className="px-6 md:px-12 py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex items-center justify-between mb-16">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight">Articles in {category}</h3>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {filteredNews.length} Result{filteredNews.length !== 1 && 's'}
            </span>
          </div>

          {filteredNews.length > 0 ? (
            <motion.div 
              layout
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence>
                {filteredNews.map((item, index) => (
                  <NewsCard 
                    key={item.id} 
                    item={item} 
                    index={index} 
                    onClick={() => onReadArticle(item)}
                    // Passing null for category click here since we are already on the category page
                    onCategoryClick={() => {}} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 font-medium text-lg">No articles found in this category.</p>
              <button 
                onClick={() => onNavigate('news')}
                className="mt-6 text-emerald-600 font-black uppercase tracking-widest text-xs hover:text-emerald-700"
              >
                View all news
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsCategoryPage;
