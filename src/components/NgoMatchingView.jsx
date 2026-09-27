import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, Zap, Clock, ShieldCheck, CheckCircle2, QrCode, Phone, Truck, Heart, ArrowRight, RefreshCw, Copy, Check, Play } from 'lucide-react';
import { MOCK_NGOS } from '../data/mockData';
import RouteMap from './RouteMap';
import QrHandoffModal from './QrHandoffModal';

export default function NgoMatchingView({ item, onConfirmDispatch, onBackToDashboard }) {
  const [selectedNgo, setSelectedNgo] = useState(MOCK_NGOS[0]);
  
  // Pickup progress state transition: 'SEARCHING' | 'ACCEPTED' | 'CONFIRMED' | 'EN_ROUTE' | 'DELIVERED'
  const [pickupStatus, setPickupStatus] = useState('SEARCHING');
  const [claimTimer, setClaimTimer] = useState(594); // 9m 54s countdown
  const [showQrModal, setShowQrModal] = useState(false);

  // Claim timer countdown effect
  useEffect(() => {
    const interval = setInterval(() => {
      setClaimTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `0${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Step timeline handler for pickup progress
  const handleStartPickup = (ngo = selectedNgo) => {
    setSelectedNgo(ngo);
    setPickupStatus('ACCEPTED');
    
    // Simulate progressive status transitions
    setTimeout(() => {
      setPickupStatus('CONFIRMED');
    }, 1200);

    setTimeout(() => {
      setPickupStatus('EN_ROUTE');
      setShowQrModal(true);
    }, 2400);

    if (onConfirmDispatch) {
      onConfirmDispatch(item, ngo);
    }
  };

  const handoffData = {
    handoffId: item.qrCodeRef || 'AS-2026-00421',
    kitchen: item.kitchenName || 'AnnaSetu Demo Kitchen',
    ngo: selectedNgo.name,
    food: item.foodType || 'Vegetable Biryani',
    quantity: `${item.quantityKg || 38} kg (${item.estimatedPlates || 125} meals)`,
    timestamp: '27 Sep 2026 • 10:30 AM',
    status: pickupStatus === 'DELIVERED' ? 'DELIVERED' : 'PICKUP_CONFIRMED'
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-annagreen-400 uppercase tracking-wider">Step 4 of 6 · Edible Redistribution Path</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-0.5">Real-Time NGO Matching & Route Tracking</h1>
        </div>
        <button
          onClick={onBackToDashboard}
          className="px-4 py-2 min-h-[40px] rounded-xl bg-darkbg-800 hover:bg-darkbg-700 text-slate-300 border border-slate-700 text-xs font-semibold shrink-0"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Latency & Claim Window Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-4 rounded-2xl bg-darkbg-800/90 border border-annagreen-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-annagreen-600/20 border border-annagreen-500/30 flex items-center justify-center text-annagreen-400 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Match Engine Speed</p>
              <p className="text-lg font-extrabold text-white font-mono">187 ms Latency</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-annagreen-500/20 text-annagreen-300">Target &lt;200ms</span>
        </div>

        <div className="p-4 rounded-2xl bg-darkbg-800/90 border border-saffron-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-saffron-500/20 border border-saffron-500/30 flex items-center justify-center text-saffron-400 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">NGO Claim Window</p>
              <p className="text-lg font-extrabold text-saffron-400 font-mono">{formatTime(claimTimer)}</p>
            </div>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-saffron-500/20 text-saffron-300">Auto-Reroute</span>
        </div>

        <div className="p-4 rounded-2xl bg-darkbg-800/90 border border-blue-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-semibold">Surplus Batch</p>
              <p className="text-sm font-bold text-white truncate max-w-[130px]">{item.foodType}</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-slate-300">{item.quantityKg} kg</span>
        </div>
      </div>

      {/* Pickup Status Progressive Timeline */}
      <div className="p-4 sm:p-5 rounded-2xl bg-darkbg-800/90 border border-slate-700/80 space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Pickup Status Progress</span>
          <span className="text-xs font-mono font-bold text-annagreen-400">
            {pickupStatus === 'SEARCHING' && 'Status: Searching for nearby NGOs...'}
            {pickupStatus === 'ACCEPTED' && `Status: ${selectedNgo.name} accepted the pickup`}
            {pickupStatus === 'CONFIRMED' && 'Status: Pickup confirmed'}
            {pickupStatus === 'EN_ROUTE' && `Status: Driver/Volunteer en route (${selectedNgo.etaMins} min ETA)`}
            {pickupStatus === 'DELIVERED' && 'Status: Delivered to Shelter'}
          </span>
        </div>

        {/* Timeline step indicators */}
        <div className="grid grid-cols-3 gap-2 pt-1 text-center">
          <div className={`p-2 rounded-xl border text-xs font-bold transition-all ${
            pickupStatus !== 'SEARCHING' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300' : 'bg-darkbg-900 border-slate-700 text-slate-500'
          }`}>
            1. Accepted
          </div>
          <div className={`p-2 rounded-xl border text-xs font-bold transition-all ${
            pickupStatus === 'EN_ROUTE' || pickupStatus === 'DELIVERED' ? 'bg-saffron-500/20 border-saffron-500 text-saffron-300' : 'bg-darkbg-900 border-slate-700 text-slate-500'
          }`}>
            2. En Route
          </div>
          <div className={`p-2 rounded-xl border text-xs font-bold transition-all ${
            pickupStatus === 'DELIVERED' ? 'bg-blue-500/20 border-blue-500 text-blue-300' : 'bg-darkbg-900 border-slate-700 text-slate-500'
          }`}>
            3. Delivered
          </div>
        </div>
      </div>

      {/* Map & NGO List Split View (Stacked vertically on mobile, side-by-side on desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column on Desktop (Map) */}
        <div className="lg:col-span-7 space-y-4">
          <RouteMap
            kitchenCoords={{
              lat: 28.5355,
              lng: 77.2610,
              name: item.kitchenName || 'Taj Palace Hotel Kitchen'
            }}
            ngos={MOCK_NGOS}
            selectedNgo={selectedNgo}
            onSelectNgo={setSelectedNgo}
            pickupStatus={pickupStatus}
            distanceKm={selectedNgo.distanceKm}
            etaMins={selectedNgo.etaMins}
          />
        </div>

        {/* Right Column on Desktop (Ranked NGO Candidates) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white">Ranked Match Candidates</h3>
            <span className="text-[11px] text-slate-400">Select to View Route</span>
          </div>

          <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
            {MOCK_NGOS.map((ngo) => {
              const isSelected = selectedNgo.id === ngo.id;
              return (
                <div
                  key={ngo.id}
                  onClick={() => setSelectedNgo(ngo)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-3 ${
                    isSelected
                      ? 'bg-darkbg-800/95 border-annagreen-500 shadow-xl ring-1 ring-annagreen-400/40'
                      : 'bg-darkbg-800/50 border-slate-700/60 hover:bg-darkbg-800'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-white text-xs sm:text-sm">{ngo.name}</h4>
                      <p className="text-[11px] text-slate-400">{ngo.category} · {ngo.address}</p>
                    </div>
                    <span className="text-xs font-mono font-bold text-annagreen-400 shrink-0">
                      {ngo.distanceKm} km ({ngo.etaMins}m ETA)
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-300 pt-1 border-t border-slate-700/40">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5 text-slate-400" /> {ngo.vehicle}
                    </span>
                    <span className="font-semibold text-slate-200">
                      Cap: {ngo.mealCapacity} meals
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      {ngo.reliabilityScore}% Reliab.
                    </span>
                  </div>

                  {isSelected && (
                    <div className="pt-1 space-y-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartPickup(ngo);
                        }}
                        className="w-full py-3 rounded-xl bg-gradient-to-r from-annagreen-600 to-annagreen-500 hover:from-annagreen-500 hover:to-annagreen-400 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 min-h-[44px]"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        Start Pickup & Notify {ngo.name.split(' ')[0]}
                      </button>

                      {pickupStatus !== 'SEARCHING' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowQrModal(true);
                          }}
                          className="w-full py-2.5 rounded-xl bg-darkbg-700 hover:bg-darkbg-600 text-slate-200 border border-slate-600 font-semibold text-xs flex items-center justify-center gap-2 min-h-[40px]"
                        >
                          <QrCode className="w-4 h-4 text-annagreen-400" />
                          View Digital QR Handoff
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* QR Code Handoff Modal */}
      <QrHandoffModal
        isOpen={showQrModal}
        onClose={() => setShowQrModal(false)}
        handoffData={handoffData}
      />
    </div>
  );
}
