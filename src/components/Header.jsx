import React, { useState } from 'react';
import { ShieldCheck, UtensilsCrossed, HeartHandshake, BarChart3, RotateCcw, Sparkles, HelpCircle, Menu, X, Home } from 'lucide-react';

export default function Header({ currentRole, setCurrentRole, onResetDemo, onOpenGuide }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectRole = (role) => {
    setCurrentRole(role);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-darkbg-900/95 backdrop-blur-md border-b border-annagreen-500/20 px-3 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Brand Lockup */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleSelectRole('landing')}>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-annagreen-600 to-annagreen-800 flex items-center justify-center shadow-lg shadow-annagreen-900/40 ring-1 ring-annagreen-400/30 shrink-0">
            <UtensilsCrossed className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white bg-gradient-to-r from-white via-slate-100 to-annagreen-300 bg-clip-text">
                AnnaSetu
              </span>
              <span className="px-1.5 py-0.5 text-[9px] sm:text-[10px] font-semibold tracking-wide uppercase rounded-full bg-saffron-500/20 text-saffron-300 border border-saffron-500/30 flex items-center gap-1 shrink-0">
                <Sparkles className="w-2.5 h-2.5" /> SIH 2026
              </span>
            </div>
            <p className="hidden xs:block text-[10px] sm:text-[11px] text-slate-400 font-medium truncate max-w-[180px] sm:max-w-none">
              Plate-to-Purpose AI Bridge
            </p>
          </div>
        </div>

        {/* Desktop Role Navigation Switcher */}
        <div className="hidden md:flex items-center bg-darkbg-800/80 p-1 rounded-xl border border-slate-700/60 shadow-inner">
          <button
            onClick={() => handleSelectRole('kitchen')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 min-h-[36px] ${
              currentRole === 'kitchen'
                ? 'bg-annagreen-600 text-white shadow-md shadow-annagreen-900/50 ring-1 ring-annagreen-400/40'
                : 'text-slate-300 hover:text-white hover:bg-darkbg-700'
            }`}
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            Kitchen (Donor)
          </button>

          <button
            onClick={() => handleSelectRole('ngo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 min-h-[36px] ${
              currentRole === 'ngo'
                ? 'bg-annagreen-600 text-white shadow-md shadow-annagreen-900/50 ring-1 ring-annagreen-400/40'
                : 'text-slate-300 hover:text-white hover:bg-darkbg-700'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            NGO (Recipient)
          </button>

          <button
            onClick={() => handleSelectRole('admin')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 min-h-[36px] ${
              currentRole === 'admin'
                ? 'bg-annagreen-600 text-white shadow-md shadow-annagreen-900/50 ring-1 ring-annagreen-400/40'
                : 'text-slate-300 hover:text-white hover:bg-darkbg-700'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            Admin / Impact
          </button>
        </div>

        {/* Header Actions & Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-darkbg-800 border border-slate-700/50 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-annagreen-500 animate-pulse"></span>
            <span className="font-mono text-[11px] text-annagreen-400">AI Engine: Online</span>
          </div>

          <button
            onClick={onOpenGuide}
            className="p-2 min-h-[40px] rounded-lg bg-darkbg-800 hover:bg-darkbg-700 text-slate-300 hover:text-saffron-400 border border-slate-700/50 transition-colors flex items-center gap-1.5 text-xs font-medium"
            title="Video Script & Demo Tour"
          >
            <HelpCircle className="w-4 h-4 text-saffron-400" />
            <span className="hidden sm:inline">Script</span>
          </button>

          <button
            onClick={onResetDemo}
            className="p-2 min-h-[40px] rounded-lg bg-darkbg-800 hover:bg-darkbg-700 text-slate-400 hover:text-white border border-slate-700/50 transition-colors"
            title="Reset Simulation Data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 min-h-[40px] rounded-lg bg-darkbg-800 hover:bg-darkbg-700 text-slate-300 border border-slate-700/50 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 pb-2 border-t border-slate-800 mt-2 space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1.5">
            <button
              onClick={() => handleSelectRole('landing')}
              className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 min-h-[44px] ${
                currentRole === 'landing' ? 'bg-annagreen-600 text-white' : 'text-slate-300 bg-darkbg-800/60'
              }`}
            >
              <Home className="w-4 h-4" /> Home / Role Selection
            </button>

            <button
              onClick={() => handleSelectRole('kitchen')}
              className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 min-h-[44px] ${
                currentRole === 'kitchen' ? 'bg-annagreen-600 text-white' : 'text-slate-300 bg-darkbg-800/60'
              }`}
            >
              <UtensilsCrossed className="w-4 h-4" /> Kitchen (Donor Persona)
            </button>

            <button
              onClick={() => handleSelectRole('ngo')}
              className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 min-h-[44px] ${
                currentRole === 'ngo' ? 'bg-annagreen-600 text-white' : 'text-slate-300 bg-darkbg-800/60'
              }`}
            >
              <HeartHandshake className="w-4 h-4" /> NGO (Recipient Persona)
            </button>

            <button
              onClick={() => handleSelectRole('admin')}
              className={`w-full px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 min-h-[44px] ${
                currentRole === 'admin' ? 'bg-annagreen-600 text-white' : 'text-slate-300 bg-darkbg-800/60'
              }`}
            >
              <BarChart3 className="w-4 h-4" /> Admin / Platform Impact
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
