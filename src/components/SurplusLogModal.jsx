import React, { useState } from 'react';
import { X, Utensils, Camera, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

const PRESET_SAMPLES = [
  {
    title: 'Taj Hotel Lunch Surplus (Fresh Paneer & Rice)',
    foodType: 'Paneer Butter Masala & Steamed Basmati Rice',
    category: 'Cooked Gravy & Staples',
    quantityKg: 38,
    estimatedPlates: 125,
    prepTime: 'Today, 11:30 AM',
    ambientTemp: '24°C',
    hotHoldTemp: '68°C',
    photoUrl: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=600&q=80',
    simulatedVerdict: 'EDIBLE'
  },
  {
    title: 'Banquet Hall Evening Leftovers (Dal Makhani & Roti)',
    foodType: 'Dal Makhani & Tandoori Roti Batch',
    category: 'Lentils & Breads',
    quantityKg: 22,
    estimatedPlates: 75,
    prepTime: 'Today, 12:00 PM',
    ambientTemp: '26°C',
    hotHoldTemp: '65°C',
    photoUrl: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=600&q=80',
    simulatedVerdict: 'EDIBLE'
  },
  {
    title: 'Cut Melon & Dairy Dessert (High-Risk Cold Chain Failure)',
    foodType: 'Cut Melon & Dairy Dessert (High Risk Temp Excursion)',
    category: 'Perishable Dairy & Fruits',
    quantityKg: 28,
    estimatedPlates: 90,
    prepTime: 'Today, 07:30 AM',
    ambientTemp: '33°C',
    hotHoldTemp: '18°C (Cold chain broken)',
    photoUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    simulatedVerdict: 'SPOILED'
  }
];

export default function SurplusLogModal({ isOpen, onClose, onSubmitBatch }) {
  if (!isOpen) return null;

  const [selectedPreset, setSelectedPreset] = useState(PRESET_SAMPLES[0]);
  const [foodType, setFoodType] = useState(PRESET_SAMPLES[0].foodType);
  const [category, setCategory] = useState(PRESET_SAMPLES[0].category);
  const [quantityKg, setQuantityKg] = useState(PRESET_SAMPLES[0].quantityKg);
  const [estimatedPlates, setEstimatedPlates] = useState(PRESET_SAMPLES[0].estimatedPlates);
  const [prepTime, setPrepTime] = useState(PRESET_SAMPLES[0].prepTime);
  const [hotHoldTemp, setHotHoldTemp] = useState(PRESET_SAMPLES[0].hotHoldTemp);
  const [photoUrl, setPhotoUrl] = useState(PRESET_SAMPLES[0].photoUrl);

  const handleApplyPreset = (preset) => {
    setSelectedPreset(preset);
    setFoodType(preset.foodType);
    setCategory(preset.category);
    setQuantityKg(preset.quantityKg);
    setEstimatedPlates(preset.estimatedPlates);
    setPrepTime(preset.prepTime);
    setHotHoldTemp(preset.hotHoldTemp);
    setPhotoUrl(preset.photoUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBatch = {
      id: `SUR-${Math.floor(8000 + Math.random() * 1900)}`,
      timestamp: 'Just now',
      kitchenId: 'k1',
      kitchenName: 'Taj Palace Hotel & Convention',
      foodType,
      category,
      quantityKg: Number(quantityKg),
      estimatedPlates: Number(estimatedPlates),
      prepTime,
      ambientTemp: '25°C',
      hotHoldTemp,
      photoUrl,
      verdict: selectedPreset.simulatedVerdict,
      freshnessScore: selectedPreset.simulatedVerdict === 'EDIBLE' ? 94 : 38,
      status: 'Verifying',
      fssaiDecayMinutesRemaining: selectedPreset.simulatedVerdict === 'EDIBLE' ? 165 : 0,
      auditHash: `0x${Math.random().toString(16).substring(2, 14)}...${Math.random().toString(16).substring(2, 6)}`,
      qrCodeRef: `AS-2026-FSSAI-${Math.floor(80000 + Math.random() * 10000)}`,
      co2OffsetKg: (Number(quantityKg) * 2.5).toFixed(1)
    };
    onSubmitBatch(newBatch);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-darkbg-800 border border-annagreen-500/30 rounded-3xl max-w-2xl w-full p-6 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-annagreen-600/20 border border-annagreen-500/30 flex items-center justify-center text-annagreen-400">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">Log Food Surplus Batch</h2>
              <p className="text-xs text-slate-300">Step 1 of 6: Log meal details for AI Freshness Verification</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-darkbg-700 hover:bg-darkbg-600 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Preset Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-saffron-300 uppercase tracking-wide flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Quick Demo Presets (Select to auto-fill)
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {PRESET_SAMPLES.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`p-3 rounded-xl border text-left transition-all text-xs font-semibold ${
                  selectedPreset.title === preset.title
                    ? 'bg-annagreen-600/20 border-annagreen-500 text-white ring-1 ring-annagreen-400/30'
                    : 'bg-darkbg-700/50 border-slate-700 text-slate-300 hover:bg-darkbg-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate text-slate-200">{preset.title.split('(')[0]}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase ${
                    preset.simulatedVerdict === 'EDIBLE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                  }`}>
                    {preset.simulatedVerdict}
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">{preset.quantityKg} kg · {preset.estimatedPlates} plates</p>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-300">Food Item & Prep Description</label>
              <input
                type="text"
                value={foodType}
                onChange={(e) => setFoodType(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-darkbg-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-annagreen-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-darkbg-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-annagreen-500"
              >
                <option value="Cooked Gravy & Staples">Cooked Gravy & Staples</option>
                <option value="Lentils & Breads">Lentils & Breads</option>
                <option value="Perishable Dairy & Fruits">Perishable Dairy & Fruits</option>
                <option value="Cooked Non-Veg Staples">Cooked Non-Veg Staples</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Quantity (kg)</label>
              <input
                type="number"
                value={quantityKg}
                onChange={(e) => {
                  setQuantityKg(e.target.value);
                  setEstimatedPlates(Math.round(e.target.value * 3.3));
                }}
                className="w-full mt-1 px-3 py-2 bg-darkbg-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-annagreen-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Estimated Meal Servings (Plates)</label>
              <input
                type="number"
                value={estimatedPlates}
                onChange={(e) => setEstimatedPlates(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-darkbg-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-annagreen-500"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Preparation Timestamp</label>
              <input
                type="text"
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-darkbg-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-annagreen-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300">Hot Hold / Storage Sensor Temp</label>
              <input
                type="text"
                value={hotHoldTemp}
                onChange={(e) => setHotHoldTemp(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-darkbg-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-annagreen-500 font-mono"
              />
            </div>
          </div>

          {/* Photo Preview Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-annagreen-400" /> Food Visual Scan Photo
            </label>
            <div className="mt-2 flex items-center gap-4">
              <img
                src={photoUrl}
                alt="Selected preview"
                className="w-20 h-20 rounded-xl object-cover ring-1 ring-annagreen-500"
              />
              <div className="text-xs text-slate-400 space-y-1">
                <p className="text-white font-semibold">Simulated Vision Input Camera #2</p>
                <p>AI will analyze surface texture, oil separation & color index.</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-slate-700/60 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-darkbg-700 hover:bg-darkbg-600 text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-annagreen-600 to-annagreen-500 hover:from-annagreen-500 hover:to-annagreen-400 text-white font-bold text-xs shadow-lg shadow-annagreen-900/40 ring-1 ring-annagreen-300/30 flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Proceed to AI Freshness Scan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
