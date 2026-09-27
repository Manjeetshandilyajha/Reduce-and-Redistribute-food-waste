import React, { useState, useEffect } from 'react';
import { Utensils, PlusCircle, TrendingUp, ShieldCheck, Clock, ArrowUpRight, AlertTriangle, Sparkles, CheckCircle, ChevronRight, Zap, RefreshCw, BarChart2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { MOCK_KITCHENS, FORECAST_CHART_DATA } from '../data/mockData';

export default function KitchenDashboard({
  surplusItems,
  onOpenLogModal,
  onStartVerification,
  onViewDetails,
  selectedKitchenId,
  setSelectedKitchenId
}) {
  const currentKitchen = MOCK_KITCHENS.find(k => k.id === selectedKitchenId) || MOCK_KITCHENS[0];

  // Ticking ₹ Saved Counter Simulation
  const [tickingSavings, setTickingSavings] = useState(currentKitchen.monthlySavingsRs);

  useEffect(() => {
    setTickingSavings(currentKitchen.monthlySavingsRs);
    const interval = setInterval(() => {
      setTickingSavings(prev => prev + Math.floor(Math.random() * 5) + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [selectedKitchenId, currentKitchen]);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Venue Header Bar */}
      <div className="p-4 sm:p-6 rounded-2xl glass-card border border-annagreen-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-annagreen-600/20 border border-annagreen-500/30 flex items-center justify-center text-annagreen-400 font-bold text-lg sm:text-xl shrink-0">
            <Utensils className="w-6 h-6 sm:w-7 sm:h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-white">{currentKitchen.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-darkbg-700 text-annagreen-300 border border-slate-700">
                {currentKitchen.type}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2 sm:gap-3 flex-wrap">
              <span>📍 {currentKitchen.location}</span>
              <span className="hidden sm:inline">•</span>
              <span>FSSAI Lic: <strong className="font-mono text-slate-200">{currentKitchen.fssaiLicense}</strong></span>
              <span className="hidden sm:inline">•</span>
              <span>Lead: <strong className="text-slate-200">{currentKitchen.chefInCharge}</strong></span>
            </p>
          </div>
        </div>

        {/* Switch Venue & Primary CTA */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <div className="text-left sm:text-right">
            <p className="text-[10px] text-slate-400 font-semibold uppercase">Switch Venue</p>
            <select
              value={selectedKitchenId}
              onChange={(e) => setSelectedKitchenId(e.target.value)}
              className="w-full sm:w-auto bg-darkbg-800 text-white text-xs rounded-xl px-3 py-2 border border-slate-700 focus:outline-none focus:border-annagreen-500 font-semibold"
            >
              {MOCK_KITCHENS.map(k => (
                <option key={k.id} value={k.id}>{k.name}</option>
              ))}
            </select>
          </div>

          <button
            onClick={onOpenLogModal}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-annagreen-600 to-annagreen-500 hover:from-annagreen-500 hover:to-annagreen-400 text-white font-bold text-xs sm:text-sm shadow-lg shadow-annagreen-900/40 ring-1 ring-annagreen-300/30 transition-all flex items-center justify-center gap-2 min-h-[44px]"
          >
            <PlusCircle className="w-4 h-4" />
            Log Surplus Batch
          </button>
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* KPI 1 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/60 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Today's Predicted Surplus</span>
            <Sparkles className="w-4 h-4 text-saffron-400 shrink-0" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">42.5 kg</span>
            <span className="text-xs text-annagreen-400 font-medium">~140 plates</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">-12.8%</span> vs unoptimized average
          </p>
        </div>

        {/* KPI 2: Ticking Counter */}
        <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-annagreen-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>This Month ₹ Saved</span>
            <TrendingUp className="w-4 h-4 text-annagreen-400 shrink-0" />
          </div>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-extrabold text-annagreen-400 font-mono">
              ₹{tickingSavings.toLocaleString('en-IN')}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-annagreen-400 animate-ping inline-block"></span>
            Live ROI Accumulation (~8x sub cost)
          </p>
        </div>

        {/* KPI 3 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/60 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>AI Forecast Accuracy</span>
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-white">{currentKitchen.forecastAccuracy}%</span>
            <span className="text-xs px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold">Target &gt;92%</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Trained on 90-day booking & weather data
          </p>
        </div>

        {/* KPI 4 */}
        <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/60 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Active Pickups</span>
            <Clock className="w-4 h-4 text-saffron-400 shrink-0" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-saffron-400">{currentKitchen.activePickups}</span>
            <span className="text-xs text-slate-300 font-medium">Batches En Route</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-2">
            Avg match latency: <strong className="text-annagreen-400">187 ms</strong>
          </p>
        </div>
      </div>

      {/* AI Surplus Forecast Chart & Insights Panel */}
      <div className="p-4 sm:p-6 rounded-2xl glass-card border border-annagreen-500/20 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-saffron-400 shrink-0" />
              <h2 className="text-base sm:text-lg font-extrabold text-white">AI Demand & Surplus Forecast Model</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Predictive prep optimization vs actual plates over 7 days
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded bg-annagreen-500 inline-block"></span> AI Predicted
            </span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <span className="w-3 h-3 rounded bg-blue-500 inline-block"></span> Actual Cooked
            </span>
          </div>
        </div>

        {/* Recharts Area Chart Container with min-w-0 to prevent overflow */}
        <div className="w-full min-w-0 h-60 sm:h-72 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={FORECAST_CHART_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
              <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} />
              <YAxis stroke="#94a3b8" fontSize={11} />
              <Tooltip
                contentStyle={{ backgroundColor: '#111e19', borderColor: '#22c55e', borderRadius: '12px', fontSize: '12px' }}
                itemStyle={{ color: '#f1f5f9' }}
              />
              <Area type="monotone" dataKey="predictedPlates" stroke="#22c55e" strokeWidth={2.5} fillOpacity={1} fill="url(#predictedGrad)" name="AI Forecast (Plates)" />
              <Area type="monotone" dataKey="actualPlates" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#actualGrad)" name="Actual Cooked (Plates)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Actionable Alert Strip */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-saffron-500/10 border border-saffron-500/30 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-saffron-400 shrink-0 mt-0.5" />
          <div className="text-xs">
            <span className="font-bold text-saffron-300 uppercase tracking-wide">Today's AI Optimization Recommendation:</span>
            <p className="text-slate-200 mt-0.5">
              Monsoon showers predicted for South Delhi (72% humidity). AI advises reducing Steamed Basmati Rice batch preparation by <strong className="text-saffron-300">12% (~18 kg)</strong> for dinner service to avoid over-production. Estimated ₹2,400 raw ingredient savings.
            </p>
          </div>
        </div>
      </div>

      {/* Recent Surplus Batch Entries */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-extrabold text-white">Recent Surplus Batches</h3>
            <p className="text-xs text-slate-400">Manage logged items, run AI freshness scans, or view dispatch receipts</p>
          </div>
          <button
            onClick={onOpenLogModal}
            className="text-xs text-annagreen-400 font-semibold hover:underline flex items-center gap-1"
          >
            + Add Batch
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          {surplusItems.map((item) => {
            const isEdible = item.verdict === 'EDIBLE';
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/60 hover:border-annagreen-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-md"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-start gap-3.5">
                  <img
                    src={item.photoUrl}
                    alt={item.foodType}
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover ring-1 ring-slate-700 shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-annagreen-400">{item.id}</span>
                      <h4 className="font-bold text-white text-xs sm:text-sm md:text-base">{item.foodType}</h4>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                        item.status === 'Edible-Matched'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : item.status === 'Spoiled-Routed'
                          ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                          : item.status === 'Picked Up'
                          ? 'bg-blue-500/20 text-blue-300 border-blue-500/40'
                          : 'bg-slate-700/40 text-slate-300 border-slate-600'
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 flex items-center gap-2 sm:gap-3 flex-wrap">
                      <span>Quantity: <strong className="text-white">{item.quantityKg} kg ({item.estimatedPlates} plates)</strong></span>
                      <span className="hidden sm:inline">•</span>
                      <span>Prep: <strong className="text-slate-300">{item.prepTime}</strong></span>
                      <span className="hidden sm:inline">•</span>
                      <span>Temp: <strong className="text-slate-300 font-mono">{item.hotHoldTemp}</strong></span>
                    </p>

                    <div className="flex items-center gap-3 text-[11px] text-slate-400 flex-wrap pt-0.5">
                      {item.freshnessScore && (
                        <span>
                          Freshness Score: <strong className={isEdible ? 'text-emerald-400' : 'text-amber-400'}>{item.freshnessScore}/100 ({item.verdict})</strong>
                        </span>
                      )}
                      {item.assignedNgo && <span>Recipient: <strong className="text-emerald-300">{item.assignedNgo}</strong></span>}
                      {item.assignedProcessor && <span>Processor: <strong className="text-amber-300">{item.assignedProcessor}</strong></span>}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2 self-stretch sm:self-end md:self-center shrink-0 w-full sm:w-auto">
                  <button
                    onClick={() => onStartVerification(item)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-annagreen-600/30 hover:bg-annagreen-600 text-annagreen-300 hover:text-white border border-annagreen-500/40 text-xs font-semibold transition-all flex items-center justify-center gap-1.5 min-h-[42px]"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    {item.freshnessScore ? 'Re-Verify Freshness' : 'Verify & Dispatch'}
                  </button>

                  <button
                    onClick={() => onViewDetails(item)}
                    className="p-2.5 rounded-xl bg-darkbg-700 hover:bg-darkbg-600 text-slate-300 border border-slate-600 text-xs font-medium min-h-[42px]"
                    title="View Details"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
