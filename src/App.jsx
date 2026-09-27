import React, { useState } from 'react';
import Header from './components/Header';
import LandingView from './components/LandingView';
import KitchenDashboard from './components/KitchenDashboard';
import SurplusLogModal from './components/SurplusLogModal';
import AiQualityScanView from './components/AiQualityScanView';
import NgoMatchingView from './components/NgoMatchingView';
import SpoiledRoutingView from './components/SpoiledRoutingView';
import NgoRoleView from './components/NgoRoleView';
import AdminDashboard from './components/AdminDashboard';
import MonetizationSection from './components/MonetizationSection';
import DemoGuideModal from './components/DemoGuideModal';
import { INITIAL_SURPLUS_ITEMS } from './data/mockData';
import { CheckCircle2, AlertTriangle, Bell, Sparkles } from 'lucide-react';

// Helper to parse path into state
const getStateFromPath = (pathname) => {
  const path = (pathname || window.location.pathname).toLowerCase();
  if (path.startsWith('/ngo')) return { role: 'ngo', subView: 'dashboard' };
  if (path.startsWith('/admin')) return { role: 'admin', subView: 'dashboard' };
  if (path.startsWith('/kitchen')) {
    if (path.includes('/surplus') || path.includes('/scan')) return { role: 'kitchen', subView: 'ai_scan' };
    if (path.includes('/matching') || path.includes('/handoff') || path.includes('/tracking')) return { role: 'kitchen', subView: 'ngo_matching' };
    if (path.includes('/spoiled')) return { role: 'kitchen', subView: 'spoiled_routing' };
    return { role: 'kitchen', subView: 'dashboard' };
  }
  return { role: 'landing', subView: 'dashboard' };
};

const getPathFromState = (role, subView) => {
  if (role === 'ngo') return '/ngo';
  if (role === 'admin') return '/admin';
  if (role === 'kitchen') {
    if (subView === 'ai_scan') return '/kitchen/surplus';
    if (subView === 'ngo_matching') return '/kitchen/matching';
    if (subView === 'spoiled_routing') return '/kitchen/spoiled';
    return '/kitchen';
  }
  return '/';
};

export default function App() {
  const initialState = getStateFromPath();
  const [currentRole, setCurrentRole] = useState(initialState.role); // 'landing' | 'kitchen' | 'ngo' | 'admin'
  const [selectedKitchenId, setSelectedKitchenId] = useState('k1');
  const [surplusItems, setSurplusItems] = useState(INITIAL_SURPLUS_ITEMS);
  const [activeItem, setActiveItem] = useState(INITIAL_SURPLUS_ITEMS[0]);
  const [kitchenSubView, setKitchenSubView] = useState(initialState.subView); // 'dashboard' | 'ai_scan' | 'ngo_matching' | 'spoiled_routing'
  
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  
  // Toast state
  const [toastMessage, setToastMessage] = useState(null);

  // Sync URL history state
  React.useEffect(() => {
    const targetPath = getPathFromState(currentRole, kitchenSubView);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ role: currentRole, subView: kitchenSubView }, '', targetPath);
    }
  }, [currentRole, kitchenSubView]);

  // Handle browser back/forward buttons
  React.useEffect(() => {
    const handlePopState = () => {
      const newState = getStateFromPath();
      setCurrentRole(newState.role);
      setKitchenSubView(newState.subView);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage({ text: msg, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Reset simulation handler
  const handleResetDemo = () => {
    setSurplusItems(INITIAL_SURPLUS_ITEMS);
    setActiveItem(INITIAL_SURPLUS_ITEMS[0]);
    setKitchenSubView('dashboard');
    showToast('Simulation state reset to default mock dataset.', 'info');
  };

  // Log Batch Handler
  const handleSubmitBatch = (newBatch) => {
    setSurplusItems(prev => [newBatch, ...prev]);
    setActiveItem(newBatch);
    setIsLogModalOpen(false);
    setCurrentRole('kitchen');
    setKitchenSubView('ai_scan');
    showToast(`Batch ${newBatch.id} logged! Running AI Quality Verification...`);
  };

  // Start Verification Handler
  const handleStartVerification = (item) => {
    setActiveItem(item);
    setCurrentRole('kitchen');
    setKitchenSubView('ai_scan');
  };

  // Proceed to NGO Geo-Matching (Edible Branch)
  const handleProceedToMatching = (item) => {
    setActiveItem(item);
    setKitchenSubView('ngo_matching');
  };

  // Proceed to Bio-CNG Processing (Spoiled Branch)
  const handleProceedToSpoiledRouting = (item) => {
    setActiveItem(item);
    setKitchenSubView('spoiled_routing');
  };

  // Confirm NGO Dispatch
  const handleConfirmNgoDispatch = (item, ngo) => {
    setSurplusItems(prev => prev.map(i => i.id === item.id ? {
      ...i,
      status: 'Edible-Matched',
      assignedNgo: ngo.name,
      matchedEta: `${ngo.etaMins} mins`
    } : i));
    showToast(`${ngo.name} accepted the pickup! QR Code Handoff generated.`, 'success');
  };

  // Confirm Bio-CNG Routing
  const handleConfirmSpoiledRouting = (item, processor) => {
    setSurplusItems(prev => prev.map(i => i.id === item.id ? {
      ...i,
      status: 'Spoiled-Routed',
      assignedProcessor: processor.name,
      matchedEta: 'Collected for Bio-CNG'
    } : i));
    showToast(`Batch diverted to ${processor.name}. SWM Certificate generated!`, 'amber');
  };

  // Jump from Demo Script to specific role
  const handleNavigateToBeat = (role) => {
    setCurrentRole(role);
    if (role === 'kitchen') {
      setKitchenSubView('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-darkbg-900 text-slate-100 flex flex-col font-sans">
      
      {/* Header */}
      <Header
        currentRole={currentRole}
        setCurrentRole={(role) => {
          setCurrentRole(role);
          if (role === 'kitchen') setKitchenSubView('dashboard');
        }}
        onResetDemo={handleResetDemo}
        onOpenGuide={() => setIsGuideModalOpen(true)}
      />

      {/* Main Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-2xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 backdrop-blur-md ${
            toastMessage.type === 'amber'
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-1 ring-amber-400/30'
              : toastMessage.type === 'info'
              ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 ring-1 ring-blue-400/30'
              : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 ring-1 ring-emerald-400/30'
          }`}>
            <Bell className="w-4 h-4 animate-pulse" />
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-8">
        
        {/* Landing View */}
        {currentRole === 'landing' && (
          <LandingView
            onSelectRole={(role) => {
              setCurrentRole(role);
              if (role === 'kitchen') setKitchenSubView('dashboard');
            }}
            onStartQuickDemo={() => {
              setCurrentRole('kitchen');
              setKitchenSubView('dashboard');
            }}
          />
        )}

        {/* Kitchen Persona View */}
        {currentRole === 'kitchen' && (
          <>
            {kitchenSubView === 'dashboard' && (
              <KitchenDashboard
                surplusItems={surplusItems}
                onOpenLogModal={() => setIsLogModalOpen(true)}
                onStartVerification={handleStartVerification}
                onViewDetails={(item) => {
                  setActiveItem(item);
                  if (item.verdict === 'SPOILED') {
                    setKitchenSubView('spoiled_routing');
                  } else {
                    setKitchenSubView('ngo_matching');
                  }
                }}
                selectedKitchenId={selectedKitchenId}
                setSelectedKitchenId={setSelectedKitchenId}
              />
            )}

            {kitchenSubView === 'ai_scan' && (
              <AiQualityScanView
                item={activeItem}
                onProceedToMatching={handleProceedToMatching}
                onProceedToSpoiledRouting={handleProceedToSpoiledRouting}
                onBackToDashboard={() => setKitchenSubView('dashboard')}
              />
            )}

            {kitchenSubView === 'ngo_matching' && (
              <NgoMatchingView
                item={activeItem}
                onConfirmDispatch={handleConfirmNgoDispatch}
                onBackToDashboard={() => setKitchenSubView('dashboard')}
              />
            )}

            {kitchenSubView === 'spoiled_routing' && (
              <SpoiledRoutingView
                item={activeItem}
                onConfirmRouting={handleConfirmSpoiledRouting}
                onBackToDashboard={() => setKitchenSubView('dashboard')}
              />
            )}
          </>
        )}

        {/* NGO Persona View */}
        {currentRole === 'ngo' && (
          <NgoRoleView
            surplusItems={surplusItems}
            onScanQrCode={() => {
              showToast('QR Scan Verified! Hand-off completed with Taj Palace Hotel.', 'success');
            }}
          />
        )}

        {/* Admin Persona & Impact View */}
        {currentRole === 'admin' && (
          <div className="space-y-16">
            <AdminDashboard />
            <MonetizationSection />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-darkbg-950 py-6 px-4 lg:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">AnnaSetu</span>
            <span>· FSSAI-2019 & SWM-2016 Compliant Food Surplus Recovery Platform</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Smart India Hackathon (SIH 2026) Interactive Demo Prototype
          </p>
        </div>
      </footer>

      {/* Modals */}
      <SurplusLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSubmitBatch={handleSubmitBatch}
      />

      <DemoGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onNavigateToBeat={handleNavigateToBeat}
      />

    </div>
  );
}
