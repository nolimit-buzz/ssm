
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from './PageHeader';
import StrategicAlignmentCTA from './StrategicAlignmentCTA';
import { 
  CheckCircle2, 
  FileCheck, 
  Bike, 
  ChevronDown, 
  ChevronUp, 
  Gauge, 
  Navigation, 
  Zap, 
  Battery, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';

interface LeaseToOwnPageProps {
  onNavigate: (page: any) => void;
}

// --- Pricing Data Configuration ---
const PRICING_PLANS = [
  {
    duration: "12 Months",
    monthly: "₦207,800",
    total_cost: "High flexibility",
    color: "emerald"
  },
  {
    duration: "24 Months",
    monthly: "₦120,171",
    total_cost: "Balanced value",
    color: "blue"
  },
  {
    duration: "36 Months",
    monthly: "₦91,909",
    total_cost: "Lowest monthly op-ex",
    color: "amber"
  }
];

const DOWN_PAYMENT = "₦372,391"; // 15%

// --- FAQ Data ---
const FAQS = [
  {
    question: "What is Battery-as-a-Service (BaaS)?",
    answer: "BaaS means you don't buy the battery; you only pay for the energy you use. Instead of waiting hours to charge, you swap a depleted battery for a fully charged one in under 3 minutes at any of our hubs. The swap fee is ₦3,500."
  },
  {
    question: "What happens if I miss a payment?",
    answer: "We offer a 3-day grace period. However, since the Tank Volt is IoT-enabled, failure to remit payments after the grace period will result in remote immobilization of the asset until payment is cleared."
  },
  {
    question: "Is insurance included?",
    answer: "Yes, all Lease-to-Own plans include comprehensive insurance coverage for theft and accidents, as well as routine maintenance at our service centers."
  },
  {
    question: "Can I pay off the lease early?",
    answer: "Absolutely. You can pay off the remaining balance of the asset value at any time without penalty, instantly transferring full ownership to you."
  },
  {
    question: "Do I own the battery after completing the Lease-to-Own term?",
    answer: "The vehicle becomes yours at the end of the Lease-to-Own term. Batteries are provided by SwapStation under our Battery-as-a-Service (BaaS) model and typically remain SwapStation property, except in specific cases where battery ownership is offered separately."
  }
];

const StepCard: React.FC<{ number: string; title: string; desc: string; icon: any; delay: number }> = ({ number, title, desc, icon: Icon, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6 }}
    className="relative p-8 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/50 group hover:-translate-y-2 hover:border-emerald-500/30 transition-all duration-500"
  >
    <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-black text-lg shadow-lg group-hover:bg-emerald-600 transition-colors duration-500">
      {number}
    </div>
    <div className="mt-6">
      <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-6 transition-all duration-500 group-hover:scale-110 group-hover:bg-white group-hover:text-emerald-600 group-hover:border-emerald-500/30 group-hover:shadow-lg">
        <Icon className="w-8 h-8 transition-transform duration-500 group-hover:rotate-[360deg]" />
      </div>
      <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors duration-300">{title}</h3>
      <p className="text-slate-500 font-medium text-sm leading-relaxed">{desc}</p>
    </div>
  </motion.div>
);

const AccordionItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
      >
        <span className={`font-bold text-base transition-colors ${isOpen ? 'text-emerald-600' : 'text-slate-900 group-hover:text-emerald-600'}`}>
          {question}
        </span>
        {isOpen ? <ChevronUp className="w-5 h-5 text-emerald-600" /> : <ChevronDown className="w-5 h-5 text-slate-400 group-hover:text-emerald-600" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-500 leading-relaxed font-medium">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const LeaseToOwnPage: React.FC<LeaseToOwnPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#0B0E14] min-h-screen">
      
      <PageHeader
        breadcrumbs={[
          { label: "HOME", page: "home", onClick: () => onNavigate('home') },
          { label: "PRODUCTS", page: "products", onClick: () => onNavigate('products') },
          { label: "ASSET FINANCING" }
        ]}
        heading={
          <>
            Own your journey.
            <br />
            <span className="text-emerald-400 text-2xl md:text-3xl font-black tracking-tight">
              SwapStation Lease-to-Own, powered by the TankVolt T22.
            </span>
          </>
        }
        description="SwapStation finances and manages the asset, while you earn and repay over time—leading to full ownership."
      />

      {/* --- THE SIMPLE PATH (White) --- */}
      <section className="py-32 px-6 md:px-12 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-emerald-600 font-black uppercase tracking-[0.4em] text-xs mb-4 block">The Process</span>
            <h2 className="text-4xl md:text-4xl font-black text-slate-900 tracking-tighter">Your Path to Ownership</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
            <StepCard 
              number="01"
              title="Choose Your Plan"
              desc="Select a timeline that fits your cash flow: 12, 24, or 36 months. All plans lead to 100% ownership."
              icon={CheckCircle2}
              delay={0.1}
            />
            <StepCard 
              number="02"
              title="Verified Approval"
              desc="Submit your driver's license and guarantor details. Once approved, pay a one-time 15% down payment to SwapStation to activate your lease."
              icon={FileCheck}
              delay={0.2}
            />
            <StepCard 
              number="03"
              title="Ride & Own"
              desc="Pick up your Tank Volt. Pay daily or weekly from your earnings. Complete the term, and the bike is yours. Batteries are provided by SwapStation under our Battery-as-a-Service (BaaS) model."
              icon={Bike}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* --- FINANCIAL TRANSPARENCY (Dark) --- */}
      <section className="py-32 px-6 md:px-12 bg-[#0B0E14] relative border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-emerald-500 font-black uppercase tracking-[0.4em] text-xs mb-4 block">Financial Clarity</span>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter">Transparent Pricing. No Hidden Fees.</h2>
          </div>

          {/* Pricing Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Highlighted Down Payment Info */}
            <div className="col-span-1 lg:col-span-3 bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-center md:text-left">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-black text-lg">Required Down Payment (15%)</h4>
                  <p className="text-emerald-400 text-sm">One-time payment to secure your asset.</p>
                </div>
              </div>
              <div className="text-4xl font-black text-white tracking-tight">{DOWN_PAYMENT}</div>
            </div>

            {PRICING_PLANS.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-2xl border ${i === 1 ? 'bg-white/5 border-emerald-500/50 relative' : 'bg-[#111620] border-white/5'} flex flex-col`}
              >
                {i === 1 && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-500 text-white text-xs font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Duration</div>
                  <div className="text-3xl font-black text-white">{plan.duration}</div>
                </div>
                
                <div className="mb-8 pb-8 border-b border-white/10">
                  <div className="text-slate-400 font-bold uppercase tracking-widest text-xs mb-2">Monthly Payment</div>
                  <div className={`text-4xl font-black ${i === 1 ? 'text-emerald-400' : 'text-white'}`}>{plan.monthly}</div>
                  <div className="text-slate-500 text-xs mt-2 font-medium">{plan.total_cost}</div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Weekly Est.</span>
                    <span className="text-white font-bold">₦{(parseInt(plan.monthly.replace(/[^0-9]/g, '')) / 4).toLocaleString()}</span>
                  </div>
                  <button 
                    onClick={() => onNavigate('contact')}
                    className={`w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs transition-all ${
                    i === 1 
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
                      : 'bg-white/10 hover:bg-white/20 text-white'
                  }`}>
                    Apply for {plan.duration}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

           <div className="mt-8 text-center">
              <p className="text-slate-500 text-xs font-medium max-w-2xl mx-auto">
                * Prices subject to credit approval. Battery-as-a-Service (BaaS) swapping fees are separate at ₦3,500 per swap. 
                Down payment is calculated on the asset base price.
              </p>
           </div>
        </div>
      </section>

      {/* --- PRODUCT SHOWCASE (Product + Specs) --- */}
      <section className="py-32 px-6 md:px-12 bg-[#080a0f] overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full" />
            <img 
              src="/e-okada-transparent.png" 
              alt="Tank Volt T22" 
              className="relative z-10 w-full transform " // Flip image to face right content
            />
            {/* Spec Callouts Overlay */}
            <div className="absolute top-10 left-10 bg-black/60 backdrop-blur border border-white/10 p-4 rounded-xl z-20">
              <div className="text-emerald-500 font-black text-xl">120 KM</div>
              <div className="text-xs text-white uppercase tracking-widest">Max Range</div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-6">
               <Zap className="w-3 h-3 text-emerald-400" />
               <span className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Tank Volt T22</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-8 leading-tight">
              Engineered for <br /> African Logistics.
            </h2>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
              The Tank Volt T22 isn't just a bike; it's a revenue-generating asset. Rugged suspension, dual-battery capacity, and smart tracking ensure you stay on the road earning money.
            </p>
            <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            The TankVolt T22 is supplied through our OEM partners and financed exclusively through SwapStation’s asset-backed lease program.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Gauge, label: "Top Speed", val: "80 km/h" },
                { icon: Navigation, label: "Range", val: "120 km" },
                { icon: Battery, label: "Battery", val: "4.3 kWh Li-ion" },
                { icon: ShieldCheck, label: "Security", val: "GPS + IoT" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <item.icon className="w-5 h-5 text-emerald-500 mt-1" />
                  <div>
                    <div className="text-white font-bold text-lg">{item.val}</div>
                    <div className="text-slate-500 text-xs uppercase tracking-widest font-black">{item.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- ELIGIBILITY & FAQ (White) --- */}
      <section className="py-32 px-6 md:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          
          <div className="mb-20">
            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight">Eligibility Requirements</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                 "Valid Rider's Card / Driver's License",
                 "Proof of Address (Utility Bill)",
                 "Registered on a Delivery Platform (e.g. Glovo, Kwik)",
                 "One Guarantor with Valid ID",
                 "Clean Traffic Record",
                 "Bank Account for Deductions"
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-3">
                   <div className="w-2 h-2 rounded-full bg-emerald-500" />
                   <span className="text-slate-700 font-medium text-[14px]">{req}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-slate-100 pt-20">
            <h3 className="text-2xl font-black text-slate-900 mb-10 tracking-tight text-center">Frequently Asked Questions</h3>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
               {FAQS.map((faq, i) => (
                 <AccordionItem key={i} question={faq.question} answer={faq.answer} />
               ))}
            </div>
          </div>
        </div>
      </section>

      <StrategicAlignmentCTA
        heading={
          <>
            Ready to own <br /> your future?
          </>
        }
        buttonText="Start Application"
        buttonOnClick={() => onNavigate('contact')}
        badgeText="Ownership Path"
        badgeIcon={<Bike className="w-3.5 h-3.5" />}
      />

    </div>
  );
};

export default LeaseToOwnPage;
