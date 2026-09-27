import React, { useState } from 'react';
import { Heart, Clock, Truck, CheckCircle2, ShieldCheck, MapPin, QrCode, ArrowRight, UserCheck, Utensils } from 'lucide-react';
import { MOCK_NGOS } from '../data/mockData';

export default function NgoRoleView({ surplusItems, onScanQrCode }) {
  const [selectedNgoId, setSelectedNgoId] = useState(MOCK_NGOS[0].id);
  const currentNgo = MOCK_NGOS.find(n => n.id === selectedNgoId) || MOCK_NGOS[0];

  const [activeRequests, setActiveRequests] = useState([
    {
      id: 'REQ-9401',
      kitchenName: 'Taj Palace Hotel & Convention',
      foodType: 'Paneer Butter Masala & Steamed Basmati Rice',
      quantityKg: 38,
      estimatedPlates: 125,
      distanceKm: 1.2,
      etaMins: 8,
      freshnessScore: 94,
      expiresSeconds: 480, // 8 mins remaining to claim
      status: 'PENDING_CLAIM'
    },
    {
      id: 'REQ-9402',
      kitchenName: 'IIT Delhi Main Hostel Mess',
      foodType: 'Rajma Chawal & Mix Veg Batch',
      quantityKg: 50,
      estimatedPlates: 160,
      distanceKm: 2.1,
      etaMins: 12,
      freshnessScore: 92,
      expiresSeconds: 320,
      status: 'PENDING_CLAIM'
    }
  ]);

  const handleAcceptRequest = (reqId) => {
    setActiveRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'ACCEPTED_EN_ROUTE' } : r));
  };

  return (
    <div className="space-y-8">
      {/* Top Header Bar */}
      <div className="p-6 rounded-2xl glass-card border border-annagreen-500/20 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-saffron-500/20 border border-saffron-500/30 flex items-center justify-center text-saffron-400 font-bold text-xl">
            <Heart className="w-7 h-7 fill-current" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-2xl font-extrabold text-white">{currentNgo.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-saffron-500/20 text-saffron-300 border border-saffron-500/30">
                Verified Recipient Partner
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              📍 {currentNgo.address} · Contact: <strong>{currentNgo.contactPerson} ({currentNgo.phone})</strong>
            </p>
          </div>
        </div>

        {/* Switch NGO Dropdown */}
        <div className="text-right">
          <p className="text-[11px] text-slate-400 font-semibold uppercase">Switch NGO Profile</p>
          <select
            value={selectedNgoId}
            onChange={(e) => setSelectedNgoId(e.target.value)}
            className="bg-darkbg-800 text-white text-xs rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none focus:border-annagreen-500 font-semibold"
          >
            {MOCK_NGOS.map(n => (
              <option key={n.id} value={n.id}>{n.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/60 shadow-lg">
          <p className="text-xs text-slate-400 font-semibold uppercase">Meals Rescued This Month</p>
          <p className="text-3xl font-extrabold text-annagreen-400 mt-1 font-mono">4,280 Plates</p>
          <p className="text-[11px] text-slate-400 mt-1">Over 34 donor kitchens</p>
        </div>

        <div className="p-5 rounded-2xl bg-darkbg-800/90 border border-saffron-500/30 shadow-lg">
          <p className="text-xs text-slate-400 font-semibold uppercase">Active Match Claims</p>
          <p className="text-3xl font-extrabold text-saffron-400 mt-1 font-mono">
            {activeRequests.filter(r => r.status === 'ACCEPTED_EN_ROUTE').length + 1}
          </p>
          <p className="text-[11px] text-slate-400 mt-1">Pickups currently en route</p>
        </div>

        <div className="p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/60 shadow-lg">
          <p className="text-xs text-slate-400 font-semibold uppercase">Avg Response Latency</p>
          <p className="text-3xl font-extrabold text-white mt-1 font-mono">1.2 Mins</p>
          <p className="text-[11px] text-slate-400 mt-1">Claimed within 10-minute window</p>
        </div>
      </div>

      {/* Incoming Match Requests Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-saffron-400" /> Incoming AI Surplus Match Requests
          </h2>
          <span className="text-xs font-mono text-annagreen-400">Live Geo-Dispatch Feed</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {activeRequests.map((req) => {
            const isAccepted = req.status === 'ACCEPTED_EN_ROUTE';
            return (
              <div
                key={req.id}
                className="p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/60 hover:border-annagreen-500/40 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-saffron-400">{req.id}</span>
                    <h3 className="font-bold text-white text-base">{req.foodType}</h3>
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      Score: {req.freshnessScore}/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Donor: <strong className="text-white">{req.kitchenName}</strong> · Quantity: <strong className="text-white">{req.quantityKg} kg ({req.estimatedPlates} plates)</strong>
                  </p>
                  <p className="text-[11px] text-slate-400 flex items-center gap-3">
                    <span>📍 Distance: <strong>{req.distanceKm} km ({req.etaMins} mins ETA)</strong></span>
                    <span>•</span>
                    <span>Fleet: <strong>{currentNgo.vehicle}</strong></span>
                  </p>
                </div>

                <div className="self-end md:self-center shrink-0 flex items-center gap-2">
                  {!isAccepted ? (
                    <button
                      onClick={() => handleAcceptRequest(req.id)}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-annagreen-600 to-annagreen-500 hover:from-annagreen-500 hover:to-annagreen-400 text-white font-bold text-xs shadow-lg flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Accept Surplus & Dispatch Vehicle
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1">
                        <Truck className="w-4 h-4 animate-bounce" /> Driver En Route
                      </span>
                      <button
                        onClick={onScanQrCode}
                        className="px-4 py-2 rounded-xl bg-darkbg-700 hover:bg-darkbg-600 text-slate-200 border border-slate-600 text-xs font-semibold flex items-center gap-1"
                      >
                        <QrCode className="w-4 h-4 text-annagreen-400" />
                        Scan QR Code
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
