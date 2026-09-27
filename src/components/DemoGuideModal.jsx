import React from 'react';
import { X, Video, Play, CheckCircle2, Sparkles, ArrowRight, Utensils, ShieldCheck, Heart, BarChart3 } from 'lucide-react';

export default function DemoGuideModal({ isOpen, onClose, onNavigateToBeat }) {
  if (!isOpen) return null;

  const demoBeats = [
    {
      beat: 'Beat 1',
      title: 'Problem & Hero Hook (0:00 - 0:25)',
      role: 'landing',
      desc: 'Show Landing page hero. Highlight 78M Tonnes waste stat and ₹1.55L Crore financial loss in India. Click "Continue as Kitchen".',
      action: 'Go to Landing'
    },
    {
      beat: 'Beat 2',
      title: 'Kitchen Dashboard & AI Forecast (0:25 - 0:50)',
      role: 'kitchen',
      desc: 'Show live ticking ₹ Saved counter (₹28,400+), Recharts 7-day AI Demand Forecast graph, and monsoon recipe adjustment tip.',
      action: 'Go to Kitchen View'
    },
    {
      beat: 'Beat 3',
      title: 'Core AI Quality Verification Scan (0:50 - 1:20)',
      role: 'kitchen',
      desc: 'Click "Log Surplus Batch" -> Select "Taj Hotel Lunch" preset -> Watch 1.5s laser scanning animation -> Show 94/100 Freshness Score & FSSAI timer.',
      action: 'Trigger AI Scan'
    },
    {
      beat: 'Beat 4',
      title: 'Edible Path: NGO Radar & QR Handoff (1:20 - 1:50)',
      role: 'kitchen',
      desc: 'Click "Dispatch & Match NGOs" -> Show pulsing radar map with <200ms latency badge -> Click "Notify Sunrise Foundation" -> Generate QR Audit Code.',
      action: 'Go to Geo-Match'
    },
    {
      beat: 'Beat 5',
      title: 'Spoiled Path: Bio-CNG Waste Diversion (1:50 - 2:15)',
      role: 'kitchen',
      desc: 'Select spoiled batch preset (38/100 score) -> Show SWM 2016 excursion alert -> Route to GreenEnergy Bio-CNG -> Show 70 kg CO₂e methane offset.',
      action: 'Trigger Spoiled Path'
    },
    {
      beat: 'Beat 6',
      title: 'Admin Audit Ledger & Business Model (2:15 - 2:45)',
      role: 'admin',
      desc: 'Switch to Admin View -> Show 100% cryptographic FSSAI audit table, before/after pitch matrix, and ₹3k-₹5k SaaS pricing tiers.',
      action: 'Go to Admin View'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-darkbg-800 border border-annagreen-500/30 rounded-3xl max-w-3xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-saffron-500/20 border border-saffron-500/30 flex items-center justify-center text-saffron-400">
              <Video className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white">SIH 2026 Demo Video Script Guide</h2>
              <p className="text-xs text-slate-300">2 to 3-minute screen recording walkthrough beats for pitch video</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-darkbg-700 hover:bg-darkbg-600 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Beats List */}
        <div className="space-y-3">
          {demoBeats.map((b, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-darkbg-900/90 border border-slate-700/80 hover:border-annagreen-500/40 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-saffron-500/20 text-saffron-300 font-mono text-[10px] font-extrabold">
                    {b.beat}
                  </span>
                  <h4 className="font-bold text-white text-xs sm:text-sm">{b.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{b.desc}</p>
              </div>

              <button
                onClick={() => {
                  onNavigateToBeat(b.role);
                  onClose();
                }}
                className="px-4 py-2 rounded-xl bg-annagreen-600/20 hover:bg-annagreen-600 text-annagreen-300 hover:text-white border border-annagreen-500/40 text-xs font-semibold shrink-0 flex items-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                {b.action}
              </button>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="pt-4 border-t border-slate-700/60 flex items-center justify-between text-xs text-slate-400">
          <span>Target Video Duration: 2 mins 30 secs</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-darkbg-700 hover:bg-darkbg-600 text-white font-semibold"
          >
            Close Script
          </button>
        </div>

      </div>
    </div>
  );
}
