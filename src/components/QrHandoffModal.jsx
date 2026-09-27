import React, { useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { QrCode, Download, CheckCircle2, Copy, Check, X, ShieldCheck, Clock, ArrowRight } from 'lucide-react';

export default function QrHandoffModal({
  isOpen = true,
  onClose,
  handoffData = {
    handoffId: 'AS-2026-00421',
    kitchen: 'AnnaSetu Demo Kitchen',
    ngo: 'Sunrise Foundation',
    food: 'Paneer Butter Masala & Rice',
    quantity: '38 kg (125 meals)',
    timestamp: '27 Sep 2026 • 10:30 AM',
    status: 'PICKUP_CONFIRMED'
  }
}) {
  if (!isOpen) return null;

  const qrCanvasRef = useRef(null);
  const [copiedHash, setCopiedHash] = useState(false);

  // Payload JSON stringified for QR scanner
  const qrPayloadString = JSON.stringify(handoffData, null, 2);

  // Download QR Code as PNG
  const handleDownloadQr = () => {
    if (!qrCanvasRef.current) return;
    const canvas = qrCanvasRef.current.querySelector('canvas');
    if (canvas) {
      const imageUri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = imageUri;
      link.download = `AnnaSetu_QR_${handoffData.handoffId || 'Handoff'}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-darkbg-800 border border-annagreen-500/40 rounded-3xl w-[calc(100%-1.5rem)] max-w-2xl max-h-[92vh] overflow-y-auto p-5 sm:p-7 space-y-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-700/60 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-annagreen-600/20 border border-annagreen-500/30 flex items-center justify-center text-annagreen-400">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-extrabold text-white">ANNASETU</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  FSSAI 2019
                </span>
              </div>
              <p className="text-xs text-slate-300">Digital Handoff Verification & Audit Receipt</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-darkbg-700 hover:bg-darkbg-600 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Content Grid: Responsive single-column on mobile, two-column on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left / Top Column: Real Client-Side QR Code */}
          <div className="md:col-span-5 flex flex-col items-center justify-center text-center space-y-3 p-5 rounded-2xl bg-white text-darkbg-900 shadow-xl">
            <div ref={qrCanvasRef} className="p-3 bg-white rounded-xl shadow-inner border border-slate-200 flex items-center justify-center max-w-[240px] sm:max-w-[260px] w-full">
              <QRCodeCanvas
                value={qrPayloadString}
                size={220}
                level="H"
                includeMargin={true}
                bgColor="#FFFFFF"
                fgColor="#0B1310"
              />
            </div>
            <p className="text-xs font-bold text-darkbg-900 tracking-wide">
              Scan to verify handoff
            </p>
            
            {/* Download QR Button */}
            <button
              onClick={handleDownloadQr}
              className="w-full py-2.5 px-4 rounded-xl bg-annagreen-700 hover:bg-annagreen-800 text-white font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download QR Code (PNG)
            </button>
          </div>

          {/* Right / Bottom Column: Detailed Handoff Metadata Cards */}
          <div className="md:col-span-7 space-y-4">
            
            <div className="p-4 rounded-2xl bg-darkbg-900 border border-slate-700/80 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-semibold">Handoff ID:</span>
                <span className="font-mono font-extrabold text-annagreen-400">{handoffData.handoffId}</span>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-semibold">Kitchen:</span>
                <span className="text-white font-bold text-right">{handoffData.kitchen}</span>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-semibold">NGO:</span>
                <span className="text-saffron-300 font-bold text-right">{handoffData.ngo}</span>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-semibold">Food Batch:</span>
                <span className="text-slate-200 font-medium text-right">{handoffData.food}</span>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-semibold">Quantity:</span>
                <span className="text-white font-bold">{handoffData.quantity}</span>
              </div>

              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-400 font-semibold">Timestamp:</span>
                <span className="text-slate-300 font-mono">{handoffData.timestamp}</span>
              </div>

              <div className="flex justify-between items-center pt-0.5">
                <span className="text-slate-400 font-semibold">Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-extrabold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {handoffData.status}
                </span>
              </div>
            </div>

            {/* Cryptography Hash info */}
            <div className="p-3 rounded-xl bg-darkbg-900/60 border border-slate-700/50 flex items-center justify-between gap-2">
              <div className="truncate">
                <p className="text-[10px] text-slate-400 uppercase font-semibold">FSSAI Cryptographic Audit Hash</p>
                <p className="text-[11px] font-mono text-annagreen-400 font-bold truncate">
                  0x8f9a2b1c4e5d6a7b8c9d0e1f2a3b4c5d6e7f8a9b
                </p>
              </div>
              <button
                onClick={() => {
                  setCopiedHash(true);
                  setTimeout(() => setCopiedHash(false), 2000);
                }}
                className="p-1.5 rounded-lg bg-darkbg-700 hover:bg-darkbg-600 text-slate-300 shrink-0"
              >
                {copiedHash ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {onClose && (
              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-annagreen-600 to-annagreen-500 hover:from-annagreen-500 hover:to-annagreen-400 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2"
              >
                Done & Return to Dashboard
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
