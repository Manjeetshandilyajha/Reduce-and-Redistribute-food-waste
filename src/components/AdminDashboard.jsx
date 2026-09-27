import React, { useState } from 'react';
import { ShieldCheck, TrendingUp, Leaf, Heart, Award, Search, Filter, QrCode, CheckCircle2, AlertTriangle, ExternalLink, ArrowRight } from 'lucide-react';
import { MASTER_AUDIT_TRAIL, BEFORE_AFTER_COMPARISON } from '../data/mockData';

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filteredLogs = MASTER_AUDIT_TRAIL.filter((log) => {
    const matchesSearch = log.kitchenName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.qrRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.foodType.toLowerCase().includes(searchQuery.toLowerCase());

    if (filterCategory === 'EDIBLE') return matchesSearch && log.verdict.includes('EDIBLE');
    if (filterCategory === 'SPOILED') return matchesSearch && log.verdict.includes('SPOILED');
    return matchesSearch;
  });

  return (
    <div className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-annagreen-400 uppercase tracking-wider">Platform Administration & Governance</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Admin Compliance & Impact Control</h1>
      </div>

      {/* 4 Category Impact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Economic */}
        <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-annagreen-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Economic Impact</span>
            <TrendingUp className="w-4 h-4 text-annagreen-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-mono">₹18.4 Lakhs</p>
          <p className="text-xs text-annagreen-400 mt-1 font-semibold">Over 24 partner kitchens</p>
          <p className="text-[11px] text-slate-400 mt-2">Avg ₹22,000/mo saved per venue</p>
        </div>

        {/* Environmental */}
        <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-emerald-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Environmental Impact</span>
            <Leaf className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400 mt-2 font-mono">48.2 Tonnes</p>
          <p className="text-xs text-slate-200 mt-1 font-semibold">CO₂e Methane Offset</p>
          <p className="text-[11px] text-slate-400 mt-2">38.5 Tonnes diverted from landfill</p>
        </div>

        {/* Social */}
        <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-saffron-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Social Impact</span>
            <Heart className="w-4 h-4 text-saffron-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-saffron-400 mt-2 font-mono">142,500+</p>
          <p className="text-xs text-slate-200 mt-1 font-semibold">Hot Meals Rescued</p>
          <p className="text-[11px] text-slate-400 mt-2">Served to 85 verified NGO shelters</p>
        </div>

        {/* Compliance */}
        <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-blue-500/30 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Compliance Rate</span>
            <ShieldCheck className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-400 mt-2 font-mono">100%</p>
          <p className="text-xs text-slate-200 mt-1 font-semibold">Cryptographic Trail</p>
          <p className="text-[11px] text-slate-400 mt-2">Zero un-audited handoffs logged</p>
        </div>
      </div>

      {/* Master Digital Audit Trail Table */}
      <div className="p-4 sm:p-6 rounded-3xl glass-card border border-annagreen-500/30 space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <QrCode className="w-5 h-5 text-annagreen-400 shrink-0" />
              <h2 className="text-base sm:text-lg font-extrabold text-white">Digital FSSAI & SWM Audit Handoff Trail</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Immutable, timestamped ledger of every surplus handoff across all venues
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search QR Ref or Venue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-3 py-2 bg-darkbg-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-annagreen-500 w-full sm:w-52"
              />
            </div>

            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-darkbg-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white font-semibold focus:outline-none"
            >
              <option value="ALL">All Entries</option>
              <option value="EDIBLE">Edible FSSAI Handoffs</option>
              <option value="SPOILED">Spoiled SWM Diversions</option>
            </select>
          </div>
        </div>

        {/* Audit Table with Horizontal Scroll Wrap */}
        <div className="w-full overflow-x-auto rounded-2xl border border-slate-700/80">
          <table className="w-full text-left border-collapse text-xs min-w-[650px]">
            <thead>
              <tr className="bg-darkbg-900/90 border-b border-slate-700 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-4">Audit Ref & Time</th>
                <th className="py-3 px-4">Kitchen Venue</th>
                <th className="py-3 px-4">Recipient / Bio-Processor</th>
                <th className="py-3 px-4">Item & Quantity</th>
                <th className="py-3 px-4">Verdict & Temp Log</th>
                <th className="py-3 px-4">Compliance Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-darkbg-800/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-annagreen-400 block">{log.qrRef}</span>
                    <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-white">
                    {log.kitchenName}
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">
                    {log.recipient}
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-200">
                    {log.foodType}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`text-[11px] font-bold block ${
                      log.verdict.includes('EDIBLE') ? 'text-emerald-400' : 'text-amber-400'
                    }`}>
                      {log.verdict}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.tempLog}</span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold ${
                      log.fssaiStatus.includes('COMPLIANT')
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    }`}>
                      <CheckCircle2 className="w-3 h-3" />
                      {log.fssaiStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Traditional vs. AnnaSetu Pitch Deck Comparison Table */}
      <div className="p-4 sm:p-6 rounded-3xl glass-card border border-annagreen-500/30 space-y-5">
        <div>
          <span className="text-xs font-bold text-saffron-400 uppercase tracking-wider">Investor & Pitch Deck Perspective</span>
          <h2 className="text-lg sm:text-xl font-extrabold text-white mt-0.5">Traditional Ad-Hoc Process vs. AnnaSetu Platform</h2>
        </div>

        <div className="w-full overflow-x-auto rounded-2xl border border-slate-700/80">
          <table className="w-full text-left border-collapse text-xs min-w-[650px]">
            <thead>
              <tr className="bg-darkbg-900/90 border-b border-slate-700 text-slate-400 uppercase font-mono text-[10px]">
                <th className="py-3 px-4 w-1/4">Operational Metric</th>
                <th className="py-3 px-4 w-3/8 text-red-300">Traditional Ad-Hoc Process</th>
                <th className="py-3 px-4 w-3/8 text-emerald-300">AnnaSetu AI Platform</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {BEFORE_AFTER_COMPARISON.map((row, idx) => (
                <tr key={idx} className="hover:bg-darkbg-800/60 transition-colors">
                  <td className="py-4 px-4 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-saffron-400 shrink-0"></span>
                    {row.metric}
                  </td>
                  <td className="py-4 px-4 text-slate-300 bg-red-950/10">
                    {row.traditional}
                  </td>
                  <td className="py-4 px-4 text-emerald-200 font-medium bg-emerald-950/10">
                    {row.annasetu}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
