import React from 'react';
import { ArrowRight, ShieldCheck, Zap, TrendingUp, Users, Leaf, CheckCircle2, ChevronRight, Award, Utensils, Heart, RefreshCw } from 'lucide-react';

export default function LandingView({ onSelectRole, onStartQuickDemo }) {
  const steps = [
    { num: '01', title: 'Data Logging', desc: 'Kitchen staff inputs meal prep time, weight & photo', icon: Utensils, color: 'text-emerald-400' },
    { num: '02', title: 'AI Prediction', desc: 'Forecasts surplus before cooking using calendar/weather', icon: Zap, color: 'text-amber-400' },
    { num: '03', title: 'FSSAI Quality Scan', desc: 'Grades edibility & 2-4hr decay window in seconds', icon: ShieldCheck, color: 'text-emerald-400' },
    { num: '04', title: 'Smart Dispatch', desc: '<200ms match to nearby NGOs; bio-route for spoiled', icon: RefreshCw, color: 'text-saffron-400' },
    { num: '05', title: 'Live Tracking', desc: 'Real-time ETA, route optimization & claim window timer', icon: Users, color: 'text-emerald-400' },
    { num: '06', title: 'Digital Audit Trail', desc: '100% compliant QR handoff records for FSSAI/SWM', icon: Award, color: 'text-emerald-300' },
  ];

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 px-4 lg:px-8 overflow-hidden rounded-3xl bg-gradient-to-b from-darkbg-800 via-darkbg-900 to-darkbg-900 border border-annagreen-500/20 shadow-2xl">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-annagreen-500/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-72 h-72 bg-saffron-500/10 blur-[100px] rounded-full pointer-events-none"></div>

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-annagreen-500/15 border border-annagreen-500/30 text-annagreen-300 text-xs font-semibold tracking-wide">
            <Leaf className="w-3.5 h-3.5 text-annagreen-400" /> SIH 2026 Innovation Brief · Food Loss & Waste Reduction
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight">
            Bridging Food Surplus from <br />
            <span className="bg-gradient-to-r from-annagreen-400 via-emerald-300 to-saffron-400 bg-clip-text text-transparent">
              Plate to Purpose
            </span> Before It Spoils
          </h1>

          <p className="max-w-3xl mx-auto text-slate-300 text-base md:text-lg leading-relaxed">
            AnnaSetu is an AI-powered platform for institutional kitchens that predicts food surplus before it’s cooked, verifies freshness in real time, matches edible meals to nearby verified NGOs in <span className="text-emerald-400 font-semibold">&lt;200ms</span>, and routes spoiled waste to Bio-CNG — creating a 100% digital FSSAI audit trail.
          </p>

          {/* Headline Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto pt-2">
            <div className="p-4 rounded-2xl bg-darkbg-800/80 border border-red-500/20 text-left flex items-start gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-red-400">78M</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">India’s Food Waste Crisis</p>
                <p className="text-sm font-bold text-white mt-0.5">78 Million Tonnes Wasted Annually</p>
                <p className="text-xs text-slate-400">Institutional kitchens lose 10-15% of food budget</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-darkbg-800/80 border border-saffron-500/20 text-left flex items-start gap-4 shadow-lg">
              <div className="w-12 h-12 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center shrink-0">
                <span className="text-2xl font-bold text-saffron-400">₹1.55L</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Annual Financial Loss</p>
                <p className="text-sm font-bold text-white mt-0.5">₹1.55 Lakh Crore Value Dumped</p>
                <p className="text-xs text-slate-400">Fines up to ₹25,000/day under SWM Rules 2016</p>
              </div>
            </div>
          </div>

          {/* Quick Demo CTA */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onStartQuickDemo}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-annagreen-600 to-annagreen-500 hover:from-annagreen-500 hover:to-annagreen-400 text-white font-bold text-sm shadow-xl shadow-annagreen-900/40 ring-1 ring-annagreen-300/40 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              Launch Interactive Live Demo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Role Picker Section */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Select a Stakeholder View</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Experience AnnaSetu from the perspective of all three participants in the food recovery ecosystem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Kitchen */}
          <div
            onClick={() => onSelectRole('kitchen')}
            className="group cursor-pointer p-6 rounded-2xl glass-card glass-card-hover border border-annagreen-500/20 hover:border-annagreen-500/60 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-annagreen-600/20 border border-annagreen-500/30 flex items-center justify-center text-annagreen-400 mb-4 group-hover:scale-110 transition-transform">
              <Utensils className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-annagreen-400 uppercase tracking-wider">Donor Persona</span>
            <h3 className="text-xl font-bold text-white mt-1">Kitchen / Commercial Donor</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Hotels, Messes & Canteens. Log surplus, preview AI demand forecasts, run FSSAI quality verification, and dispatch meals.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-annagreen-300 font-semibold">
              <span>Saves ₹15k–30k/mo (~8x ROI)</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: NGO */}
          <div
            onClick={() => onSelectRole('ngo')}
            className="group cursor-pointer p-6 rounded-2xl glass-card glass-card-hover border border-annagreen-500/20 hover:border-annagreen-500/60 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-saffron-500/20 border border-saffron-500/30 flex items-center justify-center text-saffron-400 mb-4 group-hover:scale-110 transition-transform">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-saffron-400 uppercase tracking-wider">Recipient Persona</span>
            <h3 className="text-xl font-bold text-white mt-1">NGO & Relief Partner</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Verified shelters & food banks. Receive &lt;200ms dispatch alerts, claim meals within 10 minutes, and track pickup ETAs.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-saffron-300 font-semibold">
              <span>100+ Meals/day Rescued</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Admin */}
          <div
            onClick={() => onSelectRole('admin')}
            className="group cursor-pointer p-6 rounded-2xl glass-card glass-card-hover border border-annagreen-500/20 hover:border-annagreen-500/60 relative overflow-hidden"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Platform & Regulator</span>
            <h3 className="text-xl font-bold text-white mt-1">Admin & Compliance Audit</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              FSSAI & SWM 2016 oversight. Search real-time QR audit logs, track carbon offset metrics, and review business ROI models.
            </p>
            <div className="mt-6 pt-4 border-t border-slate-700/50 flex items-center justify-between text-xs text-blue-300 font-semibold">
              <span>100% Cryptographic Trail</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* 6-Step Workflow Strip */}
      <section className="space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-annagreen-400 uppercase tracking-wider">Automated Lifecycle</span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">The 6-Step AnnaSetu Workflow</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div key={idx} className="p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/60 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-darkbg-700 border border-slate-600/50 flex items-center justify-center shrink-0">
                  <IconComponent className={`w-5 h-5 ${step.color}`} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">{step.num}</span>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
