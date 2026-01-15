import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Search, Filter, ChevronDown, Mail, MapPin, Briefcase } from 'lucide-react';
import PageHeader from './PageHeader';
import StrategicAlignmentCTA from './StrategicAlignmentCTA';

interface CareersPageProps {
  onNavigate: (page: 'home' | 'about' | 'services' | 'contact' | 'careers') => void;
}

const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('All Teams');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [selectedFlexibility, setSelectedFlexibility] = useState('All Types');

  // Gallery images - using travel/energy/mobility themed images
  const galleryImages = [
    "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800&auto=format&fit=crop"
  ];

  return (
    <div className="bg-white min-h-screen">
      <PageHeader
        breadcrumbs={[
          { label: "HOME", page: "home", onClick: () => onNavigate('home') },
          { label: "CAREERS" }
        ]}
        heading={
          <>
            Join Our Journey and Help Us <br /> Build the Future of <span className="text-gradient">Electric Mobility.</span>
          </>
        }
        description="Are you passionate about clean energy and eager to shape the future of transportation in Africa? At SwapStation Mobility, we're building the infrastructure backbone for electric logistics across Sub-Saharan Africa. Join our dynamic team and embark on a rewarding career that drives sustainable impact."
      />

      {/* Hero CTA Section */}
      <section className="py-20 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <button 
              onClick={() => {
                const element = document.getElementById('explore-positions');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 mx-auto group shadow-xl shadow-emerald-600/20 cursor-pointer"
            >
              Explore Open Positions
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-16 px-6 md:px-12 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="aspect-square rounded-2xl overflow-hidden group cursor-pointer"
              >
                <img 
                  src={image} 
                  alt={`SwapStation team ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Search Section */}
      <section id="explore-positions" className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-black text-slate-950 tracking-tighter mb-4">
              Explore Open Positions
            </h2>
            <p className="text-slate-500 text-lg font-medium">
              We're growing fast and always looking for talented individuals to join our mission.
            </p>
          </motion.div>

          {/* Search Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 md:p-8 mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search job"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium"
                />
              </div>
              
              <div className="relative">
                <select
                  value={selectedTeam}
                  onChange={(e) => setSelectedTeam(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium appearance-none cursor-pointer"
                >
                  <option>All Teams</option>
                  <option>Engineering</option>
                  <option>Operations</option>
                  <option>Business Development</option>
                  <option>Marketing</option>
                  <option>Finance</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium appearance-none cursor-pointer"
                >
                  <option>All Locations</option>
                  <option>Lagos, Nigeria</option>
                  <option>Abuja, Nigeria</option>
                  <option>Remote</option>
                  <option>Hybrid</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={selectedFlexibility}
                  onChange={(e) => setSelectedFlexibility(e.target.value)}
                  className="w-full pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent font-medium appearance-none cursor-pointer"
                >
                  <option>All Types</option>
                  <option>Full-time</option>
                  <option>Part-time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </motion.div>

          {/* No Openings Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center py-20"
          >
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-8">
                <Briefcase className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-black text-slate-950 tracking-tight mb-4">
                No Open Positions at the Moment
              </h3>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                We're not actively hiring right now, but we're always interested in connecting with exceptional talent. 
                Check back soon or reach out to us directly to learn about future opportunities.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  onClick={() => onNavigate('contact')}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 group shadow-xl shadow-emerald-600/20 cursor-pointer"
                >
                  Get in Touch
                  <Mail className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    const element = document.getElementById('explore-positions');
                    element?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-white border-2 border-slate-200 hover:border-emerald-500 text-slate-900 hover:text-emerald-600 px-8 py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center gap-3 cursor-pointer"
                >
                  Set Job Alert
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <StrategicAlignmentCTA
        heading={
          <>
            Ready to build the energy <br /> backbone for Africa?
          </>
        }
        buttonText="Contact Our Team"
        buttonOnClick={() => onNavigate('contact')}
        badgeText="Join Our Mission"
      />
    </div>
  );
};

export default CareersPage;
