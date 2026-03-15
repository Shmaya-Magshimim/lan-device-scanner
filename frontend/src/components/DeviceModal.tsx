"use client";
import { X, Network, Cpu, Fingerprint, Activity, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeviceModal({ device, scanId, onClose }: any) {
  const router = useRouter();
  if (!device) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-[2.5rem] w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-white/20">

        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-slate-100 bg-slate-50">
          <h2 className="font-black text-sm uppercase tracking-widest text-slate-500">Node Overview</h2>
          <button onClick={onClose} className="p-2 bg-white rounded-full text-slate-400 hover:text-slate-900 hover:shadow-sm transition-all"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Cpu className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2">{device.device_guess || "Unknown Device"}</h3>
            <p className="text-blue-600 font-mono font-bold bg-blue-50 inline-block px-4 py-1 rounded-full text-sm">{device.ip4}</p>
          </div>

          {device._loading ? (
            <div className="flex flex-col items-center justify-center py-6 text-slate-400 font-mono text-xs">
              <Loader2 className="w-6 h-6 animate-spin mb-3 text-blue-500" /> Extracting Telemetry...
            </div>
          ) : (
            <div className="space-y-2 mb-8">
              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-400"><Fingerprint className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">Vendor</span></div>
                <span className="font-bold text-sm text-slate-800 text-right max-w-[140px] truncate">{device.vendor || "N/A"}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-400"><Cpu className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">OS Match</span></div>
                <span className="font-bold text-sm text-slate-800 text-right max-w-[140px] truncate">{device.os_name || "N/A"}</span>
              </div>

              <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl">
                <div className="flex items-center gap-2 text-slate-400"><Activity className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">Confidence</span></div>
                <span className="font-black text-sm text-blue-600">{device.device_guess_accuracy || "0"}%</span>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            disabled={!device.id || device._loading}
            onClick={() => router.push(`/scans/${scanId}/${device.id}`)}
            className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <Network className="w-5 h-5 group-hover:animate-pulse" />
            Scan Open Ports
          </button>
        </div>
      </div>
    </div>
  );
}