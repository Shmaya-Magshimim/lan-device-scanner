"use client";
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Lock, Zap, Server, AlertCircle } from 'lucide-react';

export default function DevicePortsPage() {
  const { deviceId } = useParams();
  const router = useRouter();
  const [ports, setPorts] = useState([]);
  const [device, setDevice] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPortData = async () => {
      try {
        const [resDev, resPorts] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices/${deviceId}`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices/${deviceId}/ports`)
        ]);
        setDevice(await resDev.json());
        setPorts(await resPorts.json());
      } catch (err) {
        console.error("Failed to load ports", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPortData();
  }, [deviceId]);

  if (loading) return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-blue-500 font-mono tracking-widest text-sm">
      <div className="w-12 h-12 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin mb-6 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
      PROBING TARGET...
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 p-6 md:p-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-4xl mx-auto">
        
        <button onClick={() => router.back()} className="flex items-center text-slate-400 hover:text-white mb-10 transition-colors font-bold tracking-widest text-xs uppercase group bg-slate-800/50 px-4 py-2 rounded-full w-fit">
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> Return
        </button>

        <div className="bg-slate-900 border border-slate-800 p-8 md:p-10 rounded-[2.5rem] mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl shadow-black/50 relative overflow-hidden">
          {/* Decorative background glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="bg-slate-800 p-5 rounded-3xl border border-slate-700 shadow-inner">
              <Server className="text-blue-400 w-10 h-10" />
            </div>
            <div>
              <p className="text-blue-400 font-mono font-bold text-sm mb-1 tracking-wider">{device?.ip4}</p>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">{device?.device_guess || "Unknown Device"}</h1>
            </div>
          </div>
          <div className="text-left md:text-right font-mono text-xs text-slate-500 relative z-10 bg-slate-950/50 p-4 rounded-2xl border border-slate-800/50">
            <p>MAC: <span className="text-slate-300">{device?.mac}</span></p>
            <p className="mt-2 text-[10px]">NODE ID: {deviceId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 mb-6 px-4">
           <Zap className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
           <h2 className="text-sm font-black text-slate-300 uppercase tracking-[0.2em]">Exposed Services ({ports.length})</h2>
        </div>

        {ports.length === 0 ? (
          <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-20 text-center relative overflow-hidden">
            <Lock className="w-16 h-16 text-slate-700 mx-auto mb-6 relative z-10" />
            <p className="text-2xl font-black text-white relative z-10">Target is Secure</p>
            <p className="text-slate-400 mt-2 relative z-10 max-w-sm mx-auto">No open ports or listening services were detected during the scan.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {ports.map((p: any) => (
              <div key={p.id} className="bg-slate-900 border border-slate-800 p-6 md:p-8 rounded-3xl flex flex-col sm:flex-row sm:items-center justify-between hover:border-blue-500/50 hover:bg-slate-800/80 transition-all duration-300 group shadow-lg">
                <div className="flex items-center gap-6 mb-4 sm:mb-0">
                  <div className="text-4xl font-black text-white w-28 tracking-tighter drop-shadow-sm">
                    {p.number}<span className="text-blue-500 text-sm ml-1 uppercase font-bold tracking-widest">{p.protocol}</span>
                  </div>
                  <div className="border-l-2 border-slate-800 pl-6 py-1">
                    <p className="text-white font-black text-xl uppercase tracking-widest mb-1">{p.service_name}</p>
                    <p className="text-slate-400 text-xs font-mono">{p.service_product || "Service fingerprint unavailable"}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {[21, 23, 445, 3389].includes(p.number) && (
                    <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-black uppercase tracking-widest">
                      <AlertCircle className="w-4 h-4" /> High Risk
                    </div>
                  )}
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-[0_0_5px_rgba(16,185,129,0.8)]" /> {p.state}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}