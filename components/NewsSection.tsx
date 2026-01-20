
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { GENERATED_NEWS, NewsItem, transformApiData, truncateExcerpt } from './NewsPage';

interface NewsSectionProps {
  onNavigate?: (page: any) => void;
  onReadArticle?: (article: any) => void;
  onNavigateToCategory?: (category: string) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ onNavigate, onReadArticle, onNavigateToCategory }) => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(GENERATED_NEWS.slice(0, 3));

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          'https://nolimit.buzz/headless/swapstation/wp-json/headless/v1/db?datatype=post&taxonomy=category'
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }

        const apiData = await response.json();

        if (apiData && Array.isArray(apiData.data)) {
          const transformed = apiData.data.map(transformApiData) as NewsItem[];
          setNewsItems(transformed.slice(0, 3));
        }
      } catch (err) {
        // On error, keep the default generated news
        console.error('Error fetching news for landing section:', err);
      }
    };

    fetchNews();
  }, []);

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
          {newsItems.map((item, index) => (
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
                  {truncateExcerpt(item.excerpt)}
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
