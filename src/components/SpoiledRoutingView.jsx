import React, { useState } from 'react';
import { AlertTriangle, Flame, Leaf, ShieldCheck, ArrowRight, CheckCircle2, Factory, Zap, FileText } from 'lucide-react';
import { MOCK_BIO_PROCESSORS } from '../data/mockData';

export default function SpoiledRoutingView({ item, onConfirmRouting, onBackToDashboard }) {
  const [selectedFacility, setSelectedFacility] = useState(MOCK_BIO_PROCESSORS[0]);
  const [isRouted, setIsRouted] = useState(false);

  const quantityKg = item.quantityKg || 28;
  const co2OffsetKg = (quantityKg * selectedFacility.co2ePerKg).toFixed(1);
  const payoutRs = (quantityKg * selectedFacility.biomassPayoutRate).toFixed(1);

  const handleRouteFacility = () => {
    setIsRouted(true);
    if (onConfirmRouting) {
      onConfirmRouting(item, selectedFacility);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Step 4 (Alt) · Bio-Waste Processing Path</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-0.5">Automated Bio-Waste Diversion</h1>
        </div>
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 rounded-xl bg-darkbg-800 hover:bg-darkbg-700 text-slate-300 border border-slate-700 text-xs font-semibold"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Warning Banner */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-amber-300">Food Safety Violation Prevented (SWM Rules 2016 Compliant)</h3>
          <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
            Item <strong className="font-mono text-white">{item.id}</strong> failed human consumption thresholds ({item.freshnessScore || 38}/100 score). AnnaSetu has automatically locked this batch from NGO matching and routed it to green biomass processing to prevent municipal landfill dumping.
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="p-6 md:p-8 rounded-3xl glass-card border border-amber-500/30 shadow-2xl space-y-8">
        
        {/* Item Summary Bar */}
        <div className="p-4 rounded-2xl bg-darkbg-800/90 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={item.photoUrl}
              alt={item.foodType}
              className="w-16 h-16 rounded-xl object-cover ring-1 ring-amber-500"
            />
            <div>
              <span className="font-mono text-xs text-amber-400 font-bold">{item.id}</span>
              <h3 className="text-base font-bold text-white">{item.foodType}</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Diverted Quantity: <strong className="text-white">{quantityKg} kg</strong> · Category: {item.category}
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase">
              Zero Landfill Policy
            </span>
          </div>
        </div>

        {/* Facility Selector */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Factory className="w-4 h-4 text-amber-400" /> Select Certified Bio-Processing Partner
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {MOCK_BIO_PROCESSORS.map((facility) => {
              const isSelected = selectedFacility.id === facility.id;
              return (
                <div
                  key={facility.id}
                  onClick={() => setSelectedFacility(facility)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-darkbg-800/95 border-amber-500 shadow-xl ring-1 ring-amber-400/40'
                      : 'bg-darkbg-800/50 border-slate-700/60 hover:bg-darkbg-800'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-bold text-white text-xs md:text-sm">{facility.name}</h4>
                    <span className="text-[10px] font-mono font-bold text-amber-400">{facility.distanceKm} km</span>
                  </div>
                  <p className="text-[11px] text-slate-400">{facility.type}</p>

                  <div className="pt-2 border-t border-slate-700/50 text-[11px] text-slate-300 flex items-center justify-between">
                    <span>CO₂e Avoided: <strong className="text-emerald-400">+{facility.co2ePerKg} kg/kg</strong></span>
                    <span>Payout: <strong className="text-saffron-300">₹{facility.biomassPayoutRate}/kg</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Calculations Box */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-darkbg-800/90 border border-emerald-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Methane CO₂e Offset</p>
              <p className="text-2xl font-extrabold text-white font-mono">{co2OffsetKg} kg CO₂e</p>
              <p className="text-[11px] text-slate-400">Landfill methane emission prevented</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-darkbg-800/90 border border-saffron-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-center justify-center text-saffron-400 shrink-0">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 font-semibold uppercase">Biomass Payout Credit</p>
              <p className="text-2xl font-extrabold text-saffron-400 font-mono">₹{payoutRs}</p>
              <p className="text-[11px] text-slate-400">Credited to kitchen monthly account</p>
            </div>
          </div>
        </div>

        {/* Confirmation CTA */}
        {!isRouted ? (
          <button
            onClick={handleRouteFacility}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-sm shadow-xl flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-5 h-5" />
            Confirm Route & Issue SWM-2016 Diversion Certificate
          </button>
        ) : (
          <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/40 text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4" /> Diversion Confirmed & Logged
            </div>
            <h3 className="text-lg font-bold text-white">SWM-2016 Green Certificate Issued</h3>
            <p className="text-xs font-mono text-annagreen-300">
              Cert Ref: SWM-2026-BIO-89400 · Processor: {selectedFacility.name}
            </p>
            <button
              onClick={onBackToDashboard}
              className="px-6 py-2.5 rounded-xl bg-annagreen-600 hover:bg-annagreen-500 text-white font-bold text-xs"
            >
              Return to Kitchen Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
