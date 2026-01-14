
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GENERATED_NEWS, NewsCard } from './NewsPage';
import PageHeader from './PageHeader';

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
      <PageHeader
        breadcrumbs={[
          { label: "HOME", page: "home", onClick: () => onNavigate('home') },
          { label: "NEWS", page: "news", onClick: () => onNavigate('news') },
          { label: category.toUpperCase() }
        ]}
        heading={
          <>
            Latest in <span className="text-gradient">{category}.</span>
          </>
        }
        description={`Curated updates and insights focused on ${category.toLowerCase()} within the e-mobility ecosystem.`}
      />

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
