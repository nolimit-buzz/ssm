
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Plus, ChevronRight, ChevronLeft, Filter, ChevronDown, Check, X } from 'lucide-react';
import PageHeader from './PageHeader';

interface NewsPageProps {
  onNavigate: (page: any) => void;
  onReadArticle: (article: any) => void;
  onNavigateToCategory?: (category: string) => void;
}

// API Response Types
interface ApiTerm {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
}

interface ApiNewsItem {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  terms: ApiTerm[];
  custom_fields: Record<string, string[]>;
}

interface ApiResponse {
  data: ApiNewsItem[];
  total_posts: number;
  total_pages: number;
  current_page: number;
}

// News Item Type (internal format)
interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  excerpt: string;
  image: string;
  color: string;
  bgColor: string;
  borderColor: string;
  slug?: string;
}

// Category color mapping
const getCategoryColors = (categoryName: string): { color: string; bgColor: string; borderColor: string } => {
  const categoryMap: Record<string, { color: string; bgColor: string; borderColor: string }> = {
    'Transactions': { color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
    'Milestones': { color: 'text-amber-600', bgColor: 'bg-amber-50', borderColor: 'border-amber-100' },
    'Press Release': { color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
    'Partnership': { color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
    'Sustainability': { color: 'text-teal-600', bgColor: 'bg-teal-50', borderColor: 'border-teal-100' },
    'Product': { color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-100' },
    'Expansion': { color: 'text-orange-600', bgColor: 'bg-orange-50', borderColor: 'border-orange-100' },
    'Technology': { color: 'text-cyan-600', bgColor: 'bg-cyan-50', borderColor: 'border-cyan-100' },
    'Community': { color: 'text-indigo-600', bgColor: 'bg-indigo-50', borderColor: 'border-indigo-100' },
    'Roadshow': { color: 'text-purple-600', bgColor: 'bg-purple-50', borderColor: 'border-purple-100' },
    'Executive motoring': { color: 'text-emerald-600', bgColor: 'bg-emerald-50', borderColor: 'border-emerald-100' },
    'Glovo': { color: 'text-blue-600', bgColor: 'bg-blue-50', borderColor: 'border-blue-100' },
  };
  
  return categoryMap[categoryName] || { color: 'text-slate-600', bgColor: 'bg-slate-50', borderColor: 'border-slate-100' };
};

// Transform API data to NewsItem format
const transformApiData = (apiItem: ApiNewsItem): NewsItem => {
  // Get the first category from terms (or use 'News' as default)
  const category = apiItem.terms && apiItem.terms.length > 0 
    ? apiItem.terms[0].name 
    : 'News';
  
  const colors = getCategoryColors(category);
  
  // Format date - since API doesn't provide date, we'll use a placeholder
  // You can modify this if the API starts providing dates
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Clean excerpt - remove HTML entities
  const cleanExcerpt = apiItem.excerpt
    .replace(/\[&hellip;\]/g, '...')
    .replace(/&[a-z]+;/gi, '')
    .trim();
  
  return {
    id: apiItem.id,
    category,
    date,
    title: apiItem.title,
    excerpt: cleanExcerpt,
    image: apiItem.featured_image || '',
    color: colors.color,
    bgColor: colors.bgColor,
    borderColor: colors.borderColor,
    slug: apiItem.slug,
  };
};

// Generate Mock Data (kept as fallback)
export const GENERATED_NEWS = [
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
  },
  {
    id: 4,
    category: "Sustainability",
    date: "July 22, 2024",
    title: "Carbon Offset Report: Q2 2024",
    excerpt: "Our network has now offset over 5,000 tons of CO2 compared to traditional ICE fleet operations.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=800",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-100"
  },
  {
    id: 5,
    category: "Product",
    date: "June 15, 2024",
    title: "Introducing the TANKVOLT T22-Pro",
    excerpt: "The next evolution in heavy-duty electric logistics bikes, capable of 150km range on a single swap.",
    image: "https://images.unsplash.com/photo-1558444479-c848261286a2?auto=format&fit=crop&q=80&w=800",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-100"
  },
  {
    id: 6,
    category: "Expansion",
    date: "May 30, 2024",
    title: "Kenya Expansion Plans Finalized",
    excerpt: "SwapStation is bringing its market-leading technology to Nairobi in Q1 2025.",
    image: "https://images.unsplash.com/photo-1489440543286-a69330151c0b?auto=format&fit=crop&q=80&w=800",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100"
  },
  {
    id: 7,
    category: "Technology",
    date: "May 12, 2024",
    title: "AI-Driven Battery Health Monitoring",
    excerpt: "New BMS firmware update allows predictive maintenance alerts for fleet managers.",
    image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?auto=format&fit=crop&q=80&w=800",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-100"
  },
  {
    id: 8,
    category: "Community",
    date: "April 20, 2024",
    title: "Rider Safety Initiative Launched",
    excerpt: "Training over 1,000 riders in defensive driving and electric vehicle handling safety.",
    image: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?auto=format&fit=crop&q=80&w=800",
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-100"
  },
  {
    id: 9,
    category: "Transactions",
    date: "March 15, 2024",
    title: "SwapStation Acquires Voltex Charging",
    excerpt: "Consolidating the market to provide a unified charging standard for the continent.",
    image: "https://images.unsplash.com/photo-1565514020176-db7020fb3377?auto=format&fit=crop&q=80&w=800",
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    borderColor: "border-emerald-100"
  },
  {
    id: 10,
    category: "Milestones",
    date: "February 28, 2024",
    title: "1 Million Swaps Completed",
    excerpt: "A historic day for SwapStation as we cross the 1 million swap threshold network-wide.",
    image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=800",
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-100"
  },
  {
    id: 11,
    category: "Press Release",
    date: "January 10, 2024",
    title: "2024 Roadmap Announcement",
    excerpt: "CEO Obiora Okoye outlines the strategic vision for the upcoming fiscal year.",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-100"
  },
  {
    id: 12,
    category: "Sustainability",
    date: "December 05, 2023",
    title: "Solar Integration Hits 90%",
    excerpt: "Nine out of ten hubs are now fully powered by off-grid solar solutions.",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800",
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-100"
  },
  {
    id: 13,
    category: "Expansion",
    date: "November 20, 2023",
    title: "North-Central Logistics Corridor Open",
    excerpt: "Connecting Abuja to Kaduna with a seamless corridor of swap stations.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-100"
  }
];

export const NewsCard: React.FC<{ item: NewsItem, index: number, onClick: () => void, onCategoryClick?: (category: string) => void }> = ({ item, index, onClick, onCategoryClick }) => (
  <motion.article
    layout
    onClick={onClick}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5, delay: index * 0.05 }}
    className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 flex flex-col h-full cursor-pointer relative"
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
            if (onCategoryClick) onCategoryClick(item.category);
          }}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${item.bgColor} ${item.color} border ${item.borderColor} hover:bg-white transition-colors hover:shadow-md`}
        >
          {item.category}
        </button>
      </div>
    </div>

    <div className="p-8 flex flex-col flex-grow">
      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4">
        <Calendar className="w-3.5 h-3.5" />
        {item.date}
      </div>
      
      <h3 className="text-xl font-black text-slate-900 leading-tight mb-4 group-hover:text-emerald-600 transition-colors">
        {item.title}
      </h3>
      
      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8 flex-grow line-clamp-3">
        {item.excerpt}
      </p>

      <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 group-hover:text-emerald-600 transition-colors mt-auto">
        Read Article <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </div>
  </motion.article>
);

const NewsPage: React.FC<NewsPageProps> = ({ onNavigate, onReadArticle, onNavigateToCategory }) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  
  // Replaced single category string with array of strings for multi-select
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // API data state
  const [newsData, setNewsData] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch news from API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          'https://nolimit.buzz/headless/swapstation/wp-json/headless/v1/db?datatype=post&taxonomy=category'
        );
        
        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`);
        }
        
        const apiData: ApiResponse = await response.json();
        
        // Transform API data to NewsItem format
        const transformedData = apiData.data.map(transformApiData);
        
        setNewsData(transformedData);
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
        // Fallback to mock data on error
        setNewsData(GENERATED_NEWS);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, []);

  // Use fetched news data or fallback to mock data
  const allNewsItems = newsData.length > 0 ? newsData : GENERATED_NEWS;
  
  // Define featured stories (Top 4)
  const featuredStories = allNewsItems.slice(0, 4);
  
  // The rest of the news for the grid (excluding first 4)
  const newsGridItems = allNewsItems.slice(4);

  const categories = useMemo(() => {
    return Array.from(new Set(newsGridItems.map(item => item.category))).sort();
  }, [newsGridItems]);

  const filteredItems = useMemo(() => {
    if (selectedCategories.length === 0) return newsGridItems;
    return newsGridItems.filter(item => selectedCategories.includes(item.category));
  }, [selectedCategories, newsGridItems]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
    setVisibleCount(9);
  };

  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 9, filteredItems.length));
  };

  const nextFeatured = () => {
    setFeaturedIndex((prev) => (prev + 1) % featuredStories.length);
  };

  const prevFeatured = () => {
    setFeaturedIndex((prev) => (prev === 0 ? featuredStories.length - 1 : prev - 1));
  };

  const featuredStory = featuredStories[featuredIndex];

  return (
    <div className="bg-white min-h-screen">
      {/* Inject Custom Scrollbar Style for Filter Dropdown */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px; /* Slimmer width */
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #10b981; /* Emerald-500 */
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #059669; /* Emerald-600 */
        }
      `}</style>

      <PageHeader
        breadcrumbs={[
          { label: "HOME", page: "home", onClick: () => onNavigate('home') },
          { label: "NEWS" }
        ]}
        heading={
          <>
            Latest <span className="text-gradient">News.</span>
          </>
        }
        description="Updates, insights, and announcements from the frontlines of Africa's energy transition."
      />

      {/* --- FEATURED ARTICLE SLIDER --- */}
      {isLoading ? (
        <section className="px-6 md:px-12 -mt-20 relative z-20 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row min-h-[500px] items-center justify-center">
              <div className="text-center">
                <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-slate-500 font-bold">Loading news...</p>
              </div>
            </div>
          </div>
        </section>
      ) : error && newsData.length === 0 ? (
        <section className="px-6 md:px-12 -mt-20 relative z-20 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-red-100 flex flex-col md:flex-row min-h-[500px] items-center justify-center">
              <div className="text-center p-8">
                <p className="text-red-600 font-bold mb-2">Error loading news</p>
                <p className="text-slate-500 text-sm">{error}</p>
                <p className="text-slate-400 text-xs mt-4">Using fallback data</p>
              </div>
            </div>
          </div>
        </section>
      ) : featuredStories.length > 0 ? (
        <section className="px-6 md:px-12 -mt-20 relative z-20 mb-20">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="bg-white rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100 flex flex-col md:flex-row min-h-[500px] group cursor-pointer"
              onClick={() => onReadArticle(featuredStory)}
            >
            {/* Image Side */}
            <div className="md:w-1/2 relative overflow-hidden bg-slate-900">
               <AnimatePresence mode="wait">
                 <motion.div
                   key={featuredStory.id}
                   initial={{ opacity: 0, scale: 1.1 }}
                   animate={{ opacity: 1, scale: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                   className="absolute inset-0 w-full h-full"
                 >
                    <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10" />
                    <img 
                      src={featuredStory.image} 
                      alt={featuredStory.title}
                      className="w-full h-full object-cover"
                    />
                 </motion.div>
               </AnimatePresence>
               <div className="absolute top-6 left-6 z-20">
                 <AnimatePresence mode="wait">
                    <motion.span 
                      key={featuredStory.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-600 text-white shadow-lg"
                    >
                        Featured Story
                    </motion.span>
                 </AnimatePresence>
               </div>
            </div>

            {/* Content Side */}
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-white relative">
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                  <ArrowRight className="w-64 h-64 text-emerald-600" />
               </div>
               
               <div className="relative z-10 flex flex-col h-full justify-center">
                 <AnimatePresence mode="wait">
                   <motion.div
                     key={featuredStory.id}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: -20 }}
                     transition={{ duration: 0.5, ease: "easeOut" }}
                   >
                     <div className="flex items-center gap-3 text-emerald-600 font-bold mb-6">
                        <Calendar className="w-4 h-4" />
                        <span className="uppercase tracking-widest text-xs">{featuredStory.date}</span>
                     </div>
                     <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter leading-[1.1] mb-8 group-hover:text-emerald-600 transition-colors">
                        {featuredStory.title}
                     </h2>
                     <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10 max-w-md">
                        {featuredStory.excerpt}
                     </p>
                     <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-all">
                        Read Full Story <ArrowRight className="w-4 h-4" />
                     </button>
                   </motion.div>
                 </AnimatePresence>

                 {/* Slider Controls */}
                 <div className="flex items-center gap-6 mt-12 pt-8 border-t border-slate-100" onClick={(e) => e.stopPropagation()}>
                    <div className="flex gap-2">
                       <button 
                         onClick={prevFeatured}
                         className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 transition-all active:scale-95"
                       >
                         <ChevronLeft className="w-5 h-5" />
                       </button>
                       <button 
                         onClick={nextFeatured}
                         className="w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-emerald-600 transition-all shadow-lg active:scale-95"
                       >
                         <ChevronRight className="w-5 h-5" />
                       </button>
                    </div>
                    <div className="flex gap-1.5">
                       {featuredStories.map((_, i) => (
                         <button
                           key={i}
                           onClick={() => setFeaturedIndex(i)}
                           className={`h-1 rounded-full transition-all duration-300 ${i === featuredIndex ? 'w-8 bg-emerald-600' : 'w-2 bg-slate-200 hover:bg-slate-300'}`}
                         />
                       ))}
                    </div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </section>
      ) : null}

      {/* --- NEWS GRID --- */}
      <section className="px-6 md:px-12 pb-32 bg-slate-50 border-t border-slate-200 pt-32">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Row with Title and Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 relative z-30">
            <h3 className="text-2xl font-black text-slate-900 tracking-tight whitespace-nowrap self-start md:self-auto">Recent Updates</h3>
            
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                {/* Filter Dropdown */}
                <div className="relative">
                    <button 
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest border transition-all ${
                            selectedCategories.length > 0 
                            ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-900/20' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-500 hover:text-emerald-600'
                        }`}
                    >
                        <Filter className="w-3.5 h-3.5" />
                        <span>Filter {selectedCategories.length > 0 && `(${selectedCategories.length})`}</span>
                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
                    </button>

                    <AnimatePresence>
                        {isFilterOpen && (
                            <>
                                {/* Backdrop to close on click outside */}
                                <div className="fixed inset-0 z-40" onClick={() => setIsFilterOpen(false)} />
                                
                                <motion.div
                                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 top-full mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 origin-top-right"
                                >
                                    <div className="p-3 border-b border-slate-50 mb-2 flex justify-between items-center">
                                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Categories</span>
                                        {selectedCategories.length > 0 && (
                                            <button 
                                                onClick={() => { setSelectedCategories([]); setVisibleCount(9); setIsFilterOpen(false); }} 
                                                className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1"
                                            >
                                                Clear <X className="w-3 h-3" />
                                            </button>
                                        )}
                                    </div>
                                    <div className="max-h-64 overflow-y-auto custom-scrollbar space-y-1">
                                        {categories.map(cat => (
                                            <button
                                                key={cat}
                                                onClick={() => toggleCategory(cat)}
                                                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${
                                                    selectedCategories.includes(cat)
                                                    ? 'bg-emerald-50 text-emerald-700'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                <span>{cat}</span>
                                                {selectedCategories.includes(cat) && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                                            </button>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Counter */}
                <div className="flex items-center gap-4">
                    <div className="hidden sm:block w-px h-8 bg-slate-200" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                        Showing {visibleItems.length} of {filteredItems.length}
                    </span>
                </div>
            </div>
          </div>

          <motion.div 
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode='popLayout'>
              {visibleItems.map((item, index) => (
                <NewsCard 
                  key={item.id} 
                  item={item} 
                  index={index} 
                  onClick={() => onReadArticle(item)}
                  onCategoryClick={(category) => {
                    // Clicking a category on a card isolates that category
                    setSelectedCategories([category]);
                    setVisibleCount(9);
                    window.scrollTo({ top: window.innerHeight * 0.7, behavior: 'smooth' });
                  }}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
             <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 border-dashed">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                   <Filter className="w-6 h-6" />
                </div>
                <p className="text-slate-500 font-bold">No updates found in these categories.</p>
                <button 
                   onClick={() => setSelectedCategories([])}
                   className="mt-4 text-emerald-600 text-xs font-black uppercase tracking-widest hover:underline"
                >
                   Clear Filter
                </button>
             </div>
          )}

          {hasMore && (
            <motion.div 
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-20 text-center"
            >
              <button 
                onClick={handleLoadMore}
                className="group bg-white border border-slate-200 hover:border-emerald-500 hover:bg-emerald-600 hover:text-white text-slate-900 px-12 py-5 rounded-full text-xs font-black uppercase tracking-[0.2em] transition-all shadow-lg hover:shadow-emerald-600/20 active:scale-95 flex items-center gap-3 mx-auto"
              >
                Load More News
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
