
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Shield, FileText, Lock, ChevronRight } from 'lucide-react';

type LegalType = 'privacy' | 'terms';

interface LegalPageProps {
  type: LegalType;
  onNavigate: (page: any) => void;
}

const PrivacyContent = [
  {
    id: "intro",
    title: "1. Introduction & NDPA Compliance",
    content: (
      <>
        <p>Swap Station Mobility Limited ("SSM", "we", "us") is committed to protecting the privacy of our fleet partners, riders, and investors. This Privacy Policy outlines how we collect, use, and safeguard your data in accordance with the <strong>Nigeria Data Protection Act (NDPA) 2023</strong> and global best practices for IoT-enabled logistics.</p>
        <p className="mt-4">By utilizing our Swap Hubs, Rider App, or Fleet Dashboard, you consent to the data practices described in this policy. We act as a Data Controller for rider information and a Data Processor for fleet telemetry.</p>
      </>
    )
  },
  {
    id: "collection",
    title: "2. Data We Collect (IoT & Telemetry)",
    content: (
      <>
        <p>To ensure the safety and efficiency of the Swap Station network, we collect high-frequency telemetry data including but not limited to:</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
          <li><strong>Geo-Spatial Data:</strong> Real-time GPS location of TankVolt assets (Chassis & Batteries) to prevent theft and optimize route swapping.</li>
          <li><strong>Battery Health (BMS):</strong> Voltage, temperature, and discharge cycles recorded every 30 seconds via our 4G-enabled BMS.</li>
          <li><strong>Biometrics:</strong> Facial verification used during rider onboarding for KYR (Know Your Rider) compliance, stored securely using SHA-256 encryption.</li>
        </ul>
      </>
    )
  },
  {
    id: "usage",
    title: "3. How We Use Your Data",
    content: (
      <>
        <p>Your data powers the "Zero-Downtime" promise of our network. Specifically, we use it to:</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
          <li>Predict battery demand at specific Hub locations using AI modeling.</li>
          <li>Automate Lease-to-Own payment deductions based on mileage and swap frequency.</li>
          <li>Generate ESG Impact Reports (CO2 savings) for our investors and partners.</li>
        </ul>
      </>
    )
  },
  {
    id: "sharing",
    title: "4. Third-Party Data Sharing",
    content: (
      <>
        <p>We do not sell your personal data. However, operational data is shared with strategic infrastructure partners to facilitate financing and asset management:</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
          <li><strong>Credit Partners:</strong> InfraCredit, Sterling Bank, and FundCo Capital Managers for credit scoring and asset financing.</li>
          <li><strong>Regulatory Bodies:</strong> Anonymized aggregated data may be shared with the Lagos State Ministry of Energy for urban planning.</li>
        </ul>
      </>
    )
  },
  {
    id: "rights",
    title: "5. Your Rights",
    content: (
      <p>Under the NDPA 2023, you have the right to request access to your data, correction of inaccuracies, or erasure of personal information (subject to active lease agreements). Contact our Data Protection Officer at <span className="text-emerald-600 font-bold">dpo@swapstation.mobility</span>.</p>
    )
  }
];

const TermsContent = [
  {
    id: "definitions",
    title: "1. Definitions & Scope",
    content: (
      <p>These Terms & Conditions govern the use of Swap Station Mobility's assets, including the TankVolt Electric Motorcycles ("Vehicle"), Smart Batteries ("Energy Modules"), and Swapping Hubs ("Infrastructure"). By accessing our network, you agree to these binding terms.</p>
    )
  },
  {
    id: "lease",
    title: "2. Lease-to-Own Agreement",
    content: (
      <>
        <p>Riders opting for the Lease-to-Own model are subject to the specific duration selected (12, 24, or 36 months).</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
          <li><strong>Ownership Transfer:</strong> Title of the Vehicle remains with AssetCo until the final payment is cleared.</li>
          <li><strong>Default:</strong> Failure to remit payments for 7 consecutive days will trigger the remote IoT immobilization protocol.</li>
          <li><strong>Maintenance:</strong> Routine maintenance is covered by SSM; however, damage due to negligence is the rider's liability.</li>
        </ul>
      </>
    )
  },
  {
    id: "baas",
    title: "3. Battery-as-a-Service (BaaS) Rules",
    content: (
      <>
        <p>The battery remains the perpetual property of Swap Station PowerCo. Riders pay only for energy access.</p>
        <ul className="list-disc pl-5 mt-4 space-y-2 text-slate-600">
          <li><strong>Swap SLA:</strong> We guarantee a swap time of under 180 seconds at active hubs.</li>
          <li><strong>Tampering:</strong> Any attempt to open, modify, or bypass the BMS of a Smart Battery will result in immediate contract termination and legal prosecution.</li>
          <li><strong>Return Condition:</strong> Depleted batteries must be returned to a hub with the casing intact.</li>
        </ul>
      </>
    )
  },
  {
    id: "liability",
    title: "4. Liability & Indemnity",
    content: (
      <p>Swap Station Mobility provides the Vehicle "as is" for logistics use. We are not liable for goods damaged during transit or third-party accidents, except where caused by a proven malfunction of our equipment.</p>
    )
  },
  {
    id: "termination",
    title: "5. Termination",
    content: (
      <p>We reserve the right to suspend access to the Swap Network for violation of safety protocols, aggressive behavior towards Hub staff, or attempted theft of assets.</p>
    )
  }
];

const LegalPage: React.FC<LegalPageProps> = ({ type, onNavigate }) => {
  const isPrivacy = type === 'privacy';
  const content = isPrivacy ? PrivacyContent : TermsContent;
  const title = isPrivacy ? "Privacy Policy" : "Terms & Conditions";
  const updated = "October 24, 2024";
  
  const [activeSection, setActiveSection] = useState(content[0].id);

  // Simple Scroll Spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200; // Offset
      
      for (const section of content) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [content]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 120, // Header offset
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section (Matches About Page) */}
      <section className="relative min-h-[50vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-[#020617]">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full" />
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
            <span className="text-slate-400 font-black uppercase tracking-[0.5em] text-xs">
              LEGAL
            </span>
          </motion.nav>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-8"
          >
            {title}
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2"
          >
            <span className="text-slate-400 text-xs uppercase tracking-widest font-bold">Last Updated:</span>
            <span className="text-white text-xs uppercase tracking-widest font-bold">{updated}</span>
          </motion.div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-32 space-y-1">
              <div className="mb-6 px-4">
                <span className="text-xs font-black uppercase tracking-[0.4em] text-emerald-600 block mb-2">
                  Contents
                </span>
              </div>
              {content.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`w-full text-left px-4 py-3 text-sm font-bold transition-all border-l-2 ${
                    activeSection === section.id
                      ? 'border-emerald-500 text-slate-900 bg-emerald-50/50'
                      : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'
                  }`}
                >
                  {section.title}
                </button>
              ))}
              
              <div className="mt-12 pt-8 border-t border-slate-100 px-4">
                <p className="text-xs text-slate-400 font-medium mb-4">Need further clarification?</p>
                <button 
                    onClick={() => onNavigate('contact')}
                    className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-900 hover:text-emerald-600 transition-colors"
                >
                    Contact Legal <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Prose Content */}
          <div className="lg:w-3/4">
             <div className="prose prose-lg max-w-none">
                {content.map((section, idx) => (
                  <motion.div 
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="mb-16 scroll-mt-32 border-b border-slate-100 pb-16 last:border-0"
                  >
                     <div className="flex items-center gap-3 mb-6">
                        {isPrivacy ? <Shield className="w-6 h-6 text-emerald-600" /> : <FileText className="w-6 h-6 text-emerald-600" />}
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight m-0">
                           {section.title}
                        </h2>
                     </div>
                     <div className="text-slate-500 leading-loose font-medium text-lg">
                        {section.content}
                     </div>
                  </motion.div>
                ))}
             </div>

             {/* Footer Note */}
             <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 mt-8 flex items-start gap-4">
                <Lock className="w-5 h-5 text-slate-400 mt-1 shrink-0" />
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-2">Legal Disclaimer</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    This document constitutes a binding agreement between you and Swap Station Mobility Limited (RC 123456). 
                    If you do not agree to these terms, you must immediately discontinue use of all Swap Station services and assets. 
                    These terms are governed by the laws of the Federal Republic of Nigeria.
                  </p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
