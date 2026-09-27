import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertTriangle, Clock, RefreshCw, Zap, ArrowRight, CheckCircle2, ChevronRight, Eye, Thermometer } from 'lucide-react';

export default function AiQualityScanView({ item, onProceedToMatching, onProceedToSpoiledRouting, onBackToDashboard }) {
  const [isScanning, setIsScanning] = useState(true);
  const [scanProgress, setScanProgress] = useState(0);

  const isEdible = item.verdict === 'EDIBLE';
  const score = item.freshnessScore || (isEdible ? 94 : 38);

  // Scanning animation simulation
  useEffect(() => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          return 100;
        }
        return prev + 25;
      });
    }, 350);
    return () => clearInterval(interval);
  }, [item]);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-annagreen-400 uppercase tracking-wider">Step 3 of 6 · Automated Quality Gate</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white mt-0.5">AI Food Quality Verification</h1>
        </div>
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 rounded-xl bg-darkbg-800 hover:bg-darkbg-700 text-slate-300 border border-slate-700 text-xs font-semibold"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Main Scan Card */}
      <div className="p-6 md:p-8 rounded-3xl glass-card border border-annagreen-500/30 shadow-2xl relative overflow-hidden space-y-8">
        
        {/* Scanning State */}
        {isScanning ? (
          <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
            
            {/* Visual Scan Container with Laser Scan Line */}
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-2 border-annagreen-500/50 shadow-2xl">
              <img
                src={item.photoUrl}
                alt={item.foodType}
                className="w-full h-full object-cover filter contrast-125"
              />
              {/* Laser scanning bar */}
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-annagreen-400 to-transparent shadow-[0_0_15px_#22c55e] animate-scan"></div>
              
              {/* Overlay scanning HUD grid */}
              <div className="absolute inset-0 bg-annagreen-950/20 backdrop-blur-[1px] flex flex-col justify-between p-3 text-[10px] font-mono text-annagreen-300">
                <div className="flex justify-between">
                  <span>AI_CAM_01</span>
                  <span>FSSAI_DECAY_MODEL_v4</span>
                </div>
                <div className="text-center font-bold animate-pulse text-xs bg-darkbg-900/80 py-1 rounded border border-annagreen-500/40">
                  SCANNING TELEMETRY... {scanProgress}%
                </div>
                <div className="flex justify-between">
                  <span>TEMP: {item.hotHoldTemp}</span>
                  <span>PREP: {item.prepTime}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white flex items-center justify-center gap-2">
                <RefreshCw className="w-5 h-5 text-annagreen-400 animate-spin" />
                Analyzing Visual Texture & Thermal Excursion...
              </h3>
              <p className="text-xs text-slate-400">
                Cross-referencing FSSAI 2-4 hour decay parameters & ambient temperature metrics.
              </p>
            </div>
          </div>
        ) : (
          /* Result View */
          <div className="space-y-8">
            
            {/* Food item header banner */}
            <div className="p-4 rounded-2xl bg-darkbg-800/90 border border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.photoUrl}
                  alt={item.foodType}
                  className="w-16 h-16 rounded-xl object-cover ring-1 ring-slate-700"
                />
                <div>
                  <span className="font-mono text-xs text-annagreen-400 font-bold">{item.id}</span>
                  <h3 className="text-lg font-bold text-white">{item.foodType}</h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Quantity: <strong className="text-white">{item.quantityKg} kg ({item.estimatedPlates} plates)</strong> · Prep: {item.prepTime}
                  </p>
                </div>
              </div>

              <div className="text-right self-end sm:self-auto">
                <span className="text-[11px] text-slate-400 uppercase font-semibold">Sensor Temp</span>
                <p className="text-sm font-mono font-bold text-slate-200 flex items-center gap-1">
                  <Thermometer className="w-4 h-4 text-saffron-400" /> {item.hotHoldTemp}
                </p>
              </div>
            </div>

            {/* Score & Verdict Gauge Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Radial Gauge & Freshness Rating */}
              <div className="p-6 rounded-2xl bg-darkbg-800/80 border border-slate-700/80 flex flex-col items-center justify-center text-center space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Freshness Index Score</span>
                
                {/* Score Dial */}
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      className="text-darkbg-900"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className={isEdible ? 'text-annagreen-500' : 'text-red-500'}
                      strokeDasharray={`${score}, 100`}
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-extrabold text-white font-mono">{score}</span>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">Out of 100</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border inline-flex items-center gap-1.5 ${
                    isEdible
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                      : 'bg-red-500/20 text-red-400 border-red-500/40'
                  }`}>
                    {isEdible ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                    {isEdible ? 'EDIBLE – Safe for Redistribution' : 'SPOILED – FSSAI Excursion'}
                  </span>
                  <p className="text-xs text-slate-400 pt-1">
                    {isEdible
                      ? 'All microbial & temperature parameters compliant under FSSAI-2019.'
                      : 'Cold chain / ambient hold threshold exceeded. Unsafe for human consumption.'}
                  </p>
                </div>
              </div>

              {/* FSSAI Decay Countdown & Decision Engine Branching */}
              <div className="p-6 rounded-2xl bg-darkbg-800/80 border border-slate-700/80 flex flex-col justify-between space-y-6">
                
                {/* Countdown Timer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-saffron-400" /> FSSAI Safety Window Remaining
                    </span>
                    <span className="text-slate-500">2-4 Hr Limit</span>
                  </div>

                  <div className="p-4 rounded-xl bg-darkbg-900 border border-slate-700 flex items-center justify-between font-mono text-2xl font-bold">
                    <span className={isEdible ? 'text-annagreen-400' : 'text-slate-500'}>
                      {isEdible ? '02h 45m 12s' : '00h 00m 00s (EXPIRED)'}
                    </span>
                    <span className="text-xs font-sans font-normal text-slate-400">Time to consume</span>
                  </div>
                </div>

                {/* Decision Branch Box */}
                {isEdible ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                      <Zap className="w-4 h-4" /> Recommended Edible Branch Action
                    </div>
                    <p className="text-xs text-slate-200">
                      Match item with top-ranked nearby verified NGO shelters within 5km radius.
                    </p>
                    <button
                      onClick={() => onProceedToMatching(item)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-annagreen-600 to-annagreen-500 hover:from-annagreen-500 hover:to-annagreen-400 text-white font-bold text-xs shadow-lg shadow-annagreen-900/40 flex items-center justify-center gap-2"
                    >
                      Dispatch & Match with NGOs (&lt;200ms Latency)
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-3">
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase">
                      <AlertTriangle className="w-4 h-4" /> Recommended Spoiled Branch Action
                    </div>
                    <p className="text-xs text-slate-200">
                      Food is unsafe for human consumption. Route immediately to local Bio-CNG / Composting units under SWM 2016 rules.
                    </p>
                    <button
                      onClick={() => onProceedToSpoiledRouting(item)}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-saffron-600 hover:from-amber-500 hover:to-saffron-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
                    >
                      Divert to Bio-CNG / BSFL Processing Unit
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
