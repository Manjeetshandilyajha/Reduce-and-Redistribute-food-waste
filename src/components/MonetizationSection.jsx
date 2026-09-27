import React from 'react';
import { Check, Zap, Sparkles, TrendingUp, DollarSign, ShieldCheck } from 'lucide-react';

export default function MonetizationSection() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-saffron-400 uppercase tracking-wider">Business Model & ROI</span>
        <h2 className="text-2xl md:text-3xl font-extrabold text-white">SaaS Pricing & Biomass Monetization</h2>
        <p className="text-slate-400 text-xs max-w-xl mx-auto">
          High-margin B2B SaaS model backed by automated biomass brokerage revenue. Payback period achieved within 30 days.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tier 1: Starter */}
        <div className="p-6 rounded-3xl bg-darkbg-800/90 border border-slate-700/60 hover:border-annagreen-500/40 transition-all space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase">Single Venue</span>
              <h3 className="text-xl font-bold text-white mt-0.5">Starter Kitchen</h3>
              <p className="text-xs text-slate-400 mt-1">For standalone canteens & small banquet halls</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-white font-mono">₹3,000</span>
              <span className="text-xs text-slate-400 font-medium">/ month</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-annagreen-400" /> AI Surplus Demand Forecasting</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-annagreen-400" /> FSSAI Quality Verification Engine</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-annagreen-400" /> Auto Geo-Dispatch to NGOs</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-annagreen-400" /> Standard QR Audit Handoffs</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-700/50 text-[11px] text-annagreen-400 font-semibold">
            Avg Monthly Food Savings: ₹15,000 (5x ROI)
          </div>
        </div>

        {/* Tier 2: Pro (Highlighted) */}
        <div className="p-6 rounded-3xl bg-darkbg-800/95 border-2 border-annagreen-500 shadow-2xl relative overflow-hidden space-y-6 flex flex-col justify-between ring-1 ring-annagreen-400/40">
          <div className="absolute top-0 right-0 px-3 py-1 bg-gradient-to-l from-annagreen-500 to-annagreen-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-bl-xl">
            Most Popular
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-saffron-300 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> High Volume Institutional
              </span>
              <h3 className="text-xl font-bold text-white mt-0.5">Commercial Pro</h3>
              <p className="text-xs text-slate-400 mt-1">For 5-star hotels, university messes & large venues</p>
            </div>

            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-annagreen-400 font-mono">₹5,000</span>
              <span className="text-xs text-slate-400 font-medium">/ month</span>
            </div>

            <ul className="space-y-2 text-xs text-slate-200">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-annagreen-400" /> Everything in Starter</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-annagreen-400" /> Priority &lt;200ms Dispatch Latency</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-annagreen-400" /> Bio-CNG Biomass Payout Integration</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-annagreen-400" /> Executive Compliance Reporting</li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-700/50 text-[11px] text-saffron-300 font-bold">
            Avg Monthly Food Savings: ₹32,000 (6.4x ROI)
          </div>
        </div>

        {/* Tier 3: Biomass Brokerage Card */}
        <div className="p-6 rounded-3xl bg-darkbg-800/90 border border-saffron-500/30 hover:border-saffron-500/60 transition-all space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div>
              <span className="text-xs font-semibold text-saffron-400 uppercase">Secondary Revenue Stream</span>
              <h3 className="text-xl font-bold text-white mt-0.5">Biomass Brokerage</h3>
              <p className="text-xs text-slate-400 mt-1">Monetizing spoiled food waste diverted to Bio-CNG & BSFL</p>
            </div>

            <div className="p-4 rounded-xl bg-darkbg-900 border border-saffron-500/20 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Bio-CNG Rate:</span>
                <span className="text-saffron-300 font-bold">₹2.20 / kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">BSFL Insect Feed:</span>
                <span className="text-saffron-300 font-bold">₹3.00 / kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Platform Take-rate:</span>
                <span className="text-annagreen-400 font-bold">15% Brokerage Fee</span>
              </div>
            </div>

            <p className="text-xs text-slate-300">
              Converts penalty-inducing SWM wet waste into a net-positive revenue channel for both platform and kitchen.
            </p>
          </div>

          <div className="pt-4 border-t border-slate-700/50 text-[11px] text-saffron-300 font-semibold">
            Adds ₹1.2L - ₹2.5L / year in brokerage fee income per cluster
          </div>
        </div>

      </div>
    </div>
  );
}
