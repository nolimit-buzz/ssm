
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { 
  ArrowRight, 
  Calendar, 
  ChevronLeft, 
  Linkedin, 
  Twitter, 
  Copy, 
  Zap, 
  Battery, 
  Gauge, 
  Clock,
  Sun,
  Moon,
  MessageCircle,
  Check
} from 'lucide-react';
import { GENERATED_NEWS, NewsItem, transformApiData } from './NewsPage';

interface SingleNewsPageProps {
  article: any;
  onNavigate: (page: any) => void;
  onReadArticle: (article: any) => void;
  onNavigateToCategory: (category: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

const SingleNewsPage: React.FC<SingleNewsPageProps> = ({ article, onNavigate, onReadArticle, onNavigateToCategory, isDarkMode, onToggleTheme }) => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [copied, setCopied] = useState(false);
  const [postContentHtml, setPostContentHtml] = useState<string | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);
  const [contentError, setContentError] = useState<string | null>(null);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);

  const bgClass = isDarkMode ? "bg-[#0B0E14]" : "bg-white";
  const textPrimary = isDarkMode ? "text-slate-100" : "text-slate-900";
  const textSecondary = isDarkMode ? "text-slate-400" : "text-slate-500";
  const cardBg = isDarkMode ? "bg-slate-900/50 border-white/5" : "bg-slate-50 border-slate-200";
  
  // Boilerplate section styling
  const boilerplateBg = isDarkMode ? "bg-white/5 border-white/5" : "bg-slate-50 border-slate-100";
  const boilerplateText = isDarkMode ? "text-slate-300" : "text-slate-600";

  // Fetch full content for this post using its slug
  useEffect(() => {
    const slug = article?.slug;
    if (!slug) {
      setPostContentHtml(null);
      setContentError(null);
      return;
    }

    let isCancelled = false;

    const fetchPostContent = async () => {
      try {
        setIsLoadingContent(true);
        setContentError(null);

        const response = await fetch(
          `https://nolimit.buzz/headless/swapstation/wp-json/headless/v1/post/${slug}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch article: ${response.statusText}`);
        }

        const data: any = await response.json();
        const postData = data?.data ?? data;

        const content: string =
          postData?.content ||
          postData?.post_content ||
          postData?.full_content ||
          '';

        if (!isCancelled) {
          if (content) {
            setPostContentHtml(content);
          } else {
            setPostContentHtml(null);
          }
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Error fetching single post content:', err);
          setContentError(err instanceof Error ? err.message : 'Failed to load article content');
          setPostContentHtml(null);
        }
      } finally {
        if (!isCancelled) {
          setIsLoadingContent(false);
        }
      }
    };

    fetchPostContent();

    return () => {
      isCancelled = true;
    };
  }, [article]);

  const handleShare = (platform: 'linkedin' | 'twitter' | 'whatsapp') => {
    const url = window.location.href;
    const text = `Check out this article from Swap Station: ${article.title}`;
    
    let shareUrl = '';
    
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        break;
    }
    
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Load related news items (excluding the currently opened one, but optionally appending it last)
  useEffect(() => {
    let isCancelled = false;

    const loadRelatedNews = async () => {
      try {
        const response = await fetch(
          'https://nolimit.buzz/headless/swapstation/wp-json/headless/v1/db?datatype=post&taxonomy=category'
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch related news: ${response.statusText}`);
        }

        const apiData: any = await response.json();
        const allItems: NewsItem[] = Array.isArray(apiData?.data)
          ? apiData.data.map(transformApiData)
          : GENERATED_NEWS;

        // Exclude the currently opened article by id or slug
        const filtered = allItems.filter((item) => {
          const sameId = article?.id && item.id === article.id;
          const sameSlug =
            article?.slug && item.slug && item.slug === article.slug;
          return !sameId && !sameSlug;
        });

        if (!isCancelled) {
          let finalItems = filtered.slice(0, 3);

          // If we have less than 3 related items, append the current article as the last card
          if (finalItems.length < 3 && article) {
            const currentAsNewsItem: NewsItem = {
              id: article.id ?? -1,
              category: article.category ?? 'News',
              date: article.date ?? '',
              title: article.title ?? '',
              excerpt: article.excerpt ?? '',
              image: article.image ?? '',
              color: article.color ?? 'text-slate-600',
              bgColor: article.bgColor ?? 'bg-slate-50',
              borderColor: article.borderColor ?? 'border-slate-100',
              slug: article.slug as string | undefined,
            };

            // Avoid duplicates just in case
            const exists = finalItems.some((item) => item.id === currentAsNewsItem.id);

            if (!exists) {
              finalItems = [...finalItems, currentAsNewsItem].slice(0, 3);
            }
          }

          setRelatedNews(finalItems);
        }
      } catch (err) {
        console.error('Error loading related news:', err);
        if (!isCancelled) {
          // Fallback: use generated news, still excluding current article
          let fallback = GENERATED_NEWS.filter((item) => item.id !== article?.id);

          if (fallback.length < 3 && article) {
            const currentAsNewsItem: NewsItem = {
              id: article.id ?? -1,
              category: article.category ?? 'News',
              date: article.date ?? '',
              title: article.title ?? '',
              excerpt: article.excerpt ?? '',
              image: article.image ?? '',
              color: article.color ?? 'text-slate-600',
              bgColor: article.bgColor ?? 'bg-slate-50',
              borderColor: article.borderColor ?? 'border-slate-100',
              slug: article.slug as string | undefined,
            };

            const exists = fallback.some((item) => item.id === currentAsNewsItem.id);

            if (!exists) {
              fallback = [...fallback, currentAsNewsItem];
            }
          }

          setRelatedNews(fallback.slice(0, 3));
        }
      }
    };

    loadRelatedNews();

    return () => {
      isCancelled = true;
    };
  }, [article?.id, article?.slug]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bgClass}`}>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-emerald-500 origin-left z-[2000]"
        style={{ scaleX }}
      />

      {/* Floating Share Sidebar (Desktop) */}
      <div className="hidden lg:flex fixed left-12 top-1/2 -translate-y-1/2 flex-col gap-4 z-40">
        <button 
          onClick={() => handleShare('linkedin')}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isDarkMode ? 'border-white/10 text-white hover:bg-[#0077b5] hover:border-[#0077b5]' : 'border-slate-200 text-slate-400 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5]'}`}
          title="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleShare('twitter')}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isDarkMode ? 'border-white/10 text-white hover:bg-black hover:border-black' : 'border-slate-200 text-slate-400 hover:bg-black hover:text-white hover:border-black'}`}
          title="Share on X"
        >
          <Twitter className="w-4 h-4" />
        </button>
        <button 
          onClick={() => handleShare('whatsapp')}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isDarkMode ? 'border-white/10 text-white hover:bg-[#25D366] hover:border-[#25D366]' : 'border-slate-200 text-slate-400 hover:bg-[#25D366] hover:text-white hover:border-[#25D366]'}`}
          title="Share on WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
        <button 
          onClick={handleCopy}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${isDarkMode ? 'border-white/10 text-white hover:bg-emerald-600 hover:border-emerald-600' : 'border-slate-200 text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600'}`}
          title="Copy Link"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Article Header */}
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-8 flex-wrap"
          >
            <button 
              onClick={() => onNavigate('news')}
              className="text-emerald-500 font-black uppercase tracking-[0.2em] text-xs flex items-center gap-2 hover:underline"
            >
              <ChevronLeft className="w-3 h-3" /> Back to News
            </button>
            <span className={textSecondary}>|</span>
            <button 
              onClick={() => onNavigateToCategory(article.category)}
              className={`text-xs font-black uppercase tracking-[0.2em] ${textSecondary} hover:text-emerald-500 transition-colors`}
            >
              {article.category}
            </button>
            <span className={textSecondary}>|</span>
            <span className={`text-xs font-black uppercase tracking-[0.2em] ${textSecondary}`}>
              {article.date}
            </span>
            
            {/* Theme Toggle */}
            <div className={`hidden sm:block w-[1px] h-4 ${isDarkMode ? 'bg-white/10' : 'bg-slate-200'} mx-2`} />
            <button
              onClick={onToggleTheme}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${
                isDarkMode 
                  ? 'bg-white/10 text-white hover:bg-white/20' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-3 h-3 text-amber-400" /> Light Mode
                </>
              ) : (
                <>
                  <Moon className="w-3 h-3 text-indigo-500" /> Dark Mode
                </>
              )}
            </button>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`text-4xl md:text-6xl font-black ${textPrimary} tracking-tighter leading-[1.1] mb-12`}
          >
            {article.title}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-[21/9] shadow-2xl relative"
          >
             <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </header>

      {/* Article Body */}
      <article className="px-6">
        <div className={`single-news-body max-w-3xl mx-auto ${textSecondary} text-base md:text-lg leading-relaxed space-y-8 font-medium`}>
          {isLoadingContent && (
            <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">
              Loading article...
            </p>
          )}

          {!isLoadingContent && contentError && !postContentHtml && (
            <p className="text-sm font-bold text-red-500">
              {contentError}
            </p>
          )}

          {!isLoadingContent && postContentHtml ? (
            <div
              className={`prose prose-lg max-w-none ${
                isDarkMode ? 'prose-invert prose-slate' : 'prose-slate'
              }`}
              dangerouslySetInnerHTML={{ __html: postContentHtml }}
            />
          ) : !isLoadingContent && !postContentHtml && !contentError ? (
            <>
              <p>
                 Logistics in Sub-Saharan Africa is undergoing a seismic shift. As fuel prices continue to fluctuate and urbanization accelerates, the demand for reliable, cost-effective last-mile delivery solutions has never been higher. 
                 <span className={`font-bold ${textPrimary}`}> Swap Station Mobility</span> is proud to announce the closing of our Series A funding round, a pivotal moment in our mission to electrify the continent's commercial fleet.
              </p>

              <p>
                The round was led by <strong>Blackaion Capital</strong>, with participation from strategic infrastructure partners. This capital injection will directly fund the deployment of 500 new Swap Hubs across five key states in Nigeria, creating a contiguous energy corridor from Lagos to Abuja.
              </p>

              <blockquote className={`border-l-4 border-emerald-500 pl-8 py-4 my-12 ${isDarkMode ? 'bg-white/5' : 'bg-emerald-50/50'} rounded-r-xl italic`}>
                 <p className={`text-2xl font-black ${textPrimary} mb-4`}>
                   "We are not just building charging points; we are building the internet of energy for logistics. Speed, reliability, and data are our currency."
                 </p>
                 <footer className="text-sm font-bold uppercase tracking-widest text-emerald-600">— Obiora Okoye, CEO</footer>
              </blockquote>

              <h3 className={`text-3xl font-black ${textPrimary} mt-12 mb-6`}>Powering the TankVolt Ecosystem</h3>
              
              <p>
                Central to this expansion is the rollout of our next-generation battery technology, optimized for the rigorous demands of commercial riders. The new capital allows us to scale production of the TankVolt T22-Pro, a purpose-built electric motorcycle designed for African roads.
              </p>

              {/* Product Highlight Card */}
              <div className={`my-12 p-8 rounded-3xl border ${cardBg} flex flex-col md:flex-row gap-8 items-center`}>
                <div className="w-full md:w-1/2">
                   <img 
                     src="https://images.unsplash.com/photo-1558444479-c848261286a2?auto=format&fit=crop&q=80&w=800" 
                     alt="TankVolt Bike" 
                     className="w-full rounded-2xl shadow-lg mix-blend-multiply filter contrast-125 bg-white p-4"
                   />
                </div>
                <div className="w-full md:w-1/2 space-y-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-emerald-500 text-white text-xs font-black uppercase px-2 py-1 rounded">Product Highlight</span>
                  </div>
                  <h4 className={`text-2xl font-black ${textPrimary}`}>TankVolt T22-Pro</h4>
                  <ul className="space-y-4">
                     {[
                       { icon: Gauge, label: "Top Speed", val: "85 km/h" },
                       { icon: Zap, label: "Range / Swap", val: "150 km" },
                       { icon: Battery, label: "Dual Battery", val: "2.1 kWh x 2" },
                       { icon: Clock, label: "Swap Time", val: "< 60 Sec" }
                     ].map((spec, i) => (
                       <li key={i} className="flex items-center justify-between border-b border-dashed border-emerald-500/30 pb-2">
                          <div className="flex items-center gap-3">
                             <spec.icon className="w-4 h-4 text-emerald-500" />
                             <span className="text-xs font-bold uppercase tracking-widest">{spec.label}</span>
                          </div>
                          <span className={`font-bold ${textPrimary}`}>{spec.val}</span>
                       </li>
                     ))}
                  </ul>
                </div>
              </div>

              <h3 className={`text-3xl font-black ${textPrimary} mt-12 mb-6`}>Looking Ahead</h3>
              <p>
                With this funding, we are also launching our <strong>Rider Welfare Initiative</strong>, providing comprehensive health insurance and safety training for every rider on our platform. The future of mobility isn't just about technology; it's about the people who move our cities.
              </p>
            </>
          ) : null}
        </div>
      </article>

      {/* ABOUT SWAP STATION MOBILITY BOILERPLATE */}
      <section className={`py-16 px-6 mt-20 ${boilerplateBg} border-y transition-colors duration-500`}>
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
            <h4 className={`text-sm font-black uppercase tracking-[0.2em] ${textPrimary}`}>About Swap Station Mobility</h4>
          </div>
          <p className={`${boilerplateText} text-sm md:text-base leading-relaxed font-medium`}>
            Founded to accelerate Africa’s transition to sustainable logistics, <strong>Swap Station Mobility</strong> is building the continent’s most resilient clean-energy infrastructure. By combining solar-integrated swapping hubs, automotive-grade battery technology, and real-time IoT telemetry, we provide a zero-downtime energy layer for commercial fleets. Committed to reducing carbon emissions and lowering operational costs, Swap Station empowers logistics operators to scale efficiently in high-growth urban markets. Recognized for our vertically integrated "Power-as-a-Service" model, we are redefining how African cities move. For more information, visit <span className="text-emerald-500 underline cursor-pointer">www.swapstation.mobility</span>.
          </p>
        </div>
      </section>

      {/* Related News (Previously Footer) */}
      <section className={`py-24 px-6 ${isDarkMode ? 'bg-[#0B0E14]' : 'bg-white'}`}>
         <div className="max-w-7xl mx-auto">
            <h3 className={`text-2xl font-black ${textPrimary} mb-12 text-center md:text-left`}>Continue Reading</h3>
            <div className="grid md:grid-cols-3 gap-8">
               {relatedNews.map((item, i) => (
                 <div 
                   key={i} 
                   onClick={() => onReadArticle(item)}
                   className="group cursor-pointer"
                 >
                    <div className="aspect-[16/10] rounded-2xl overflow-hidden mb-6 relative">
                       <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                       <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-xs font-black uppercase px-3 py-1 rounded-full">
                          {item.category}
                       </div>
                    </div>
                    <div className={`text-xs font-bold ${textSecondary} mb-2 flex items-center gap-2`}>
                       <Calendar className="w-3 h-3" /> {item.date}
                    </div>
                    <h4 className={`text-lg font-black ${textPrimary} leading-tight group-hover:text-emerald-500 transition-colors`}>
                       {item.title}
                    </h4>
                 </div>
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default SingleNewsPage;
