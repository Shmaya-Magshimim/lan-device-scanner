"use client";
import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Loader2, Monitor, Smartphone, RefreshCw, ArrowLeft, Laptop, Server, HelpCircle, Router as RouterIcon, ShieldCheck } from 'lucide-react';
import DeviceModal from '@/components/DeviceModal';

// UI Engine: Assigns colors and icons based on what the scanner finds
const getDeviceUI = (guess: string) => {
  const text = guess?.toLowerCase() || "";
  if (text.includes('phone') || text.includes('android') || text.includes('ios')) {
    return { icon: <Smartphone className="w-8 h-8" />, color: 'text-emerald-600', bg: 'bg-emerald-100', border: 'hover:border-emerald-400', ring: 'ring-emerald-100' };
  }
  if (text.includes('mac') || text.includes('laptop')) {
    return { icon: <Laptop className="w-8 h-8" />, color: 'text-indigo-600', bg: 'bg-indigo-100', border: 'hover:border-indigo-400', ring: 'ring-indigo-100' };
  }
  if (text.includes('server') || text.includes('linux')) {
    return { icon: <Server className="w-8 h-8" />, color: 'text-purple-600', bg: 'bg-purple-100', border: 'hover:border-purple-400', ring: 'ring-purple-100' };
  }
  if (text.includes('router') || text.includes('gateway')) {
    return { icon: <RouterIcon className="w-8 h-8" />, color: 'text-orange-600', bg: 'bg-orange-100', border: 'hover:border-orange-400', ring: 'ring-orange-100' };
  }
  if (text.includes('windows') || text.includes('pc')) {
    return { icon: <Monitor className="w-8 h-8" />, color: 'text-blue-600', bg: 'bg-blue-100', border: 'hover:border-blue-400', ring: 'ring-blue-100' };
  }
  return { icon: <HelpCircle className="w-8 h-8" />, color: 'text-slate-500', bg: 'bg-slate-100', border: 'hover:border-slate-400', ring: 'ring-slate-100' };
};

export default function ScanDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  // State definitions (This fixes your ReferenceError)
  const [scan, setScan] = useState<any>(null);
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    if (!id) return;
    setIsRefreshing(true);
    try {
      const resScan = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scans/${id}`);
      setScan(await resScan.json());

      const resDevs = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices/?scan_id=${id}`);
      setDevices(await resDevs.json());
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
    const timer = setInterval(fetchData, 8000);
    return () => clearInterval(timer);
  }, [fetchData]);

  // Handle clicking a device card
  const handleDeviceClick = async (deviceSummary: any) => {
    if (!deviceSummary.id) {
      alert("Backend Error: Device is missing an ID. Check schemas.py!");
      return;
    }

    setSelectedDevice({ ...deviceSummary, _loading: true });

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/devices/${deviceSummary.id}`);
      if (res.ok) {
        const fullDevice = await res.json();
        setSelectedDevice(fullDevice);
      }
    } catch (err) {
      console.error("Detail fetch failed", err);
    }
  };

  if (!scan) return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <Loader2 className="animate-spin text-blue-600 w-12 h-12" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 md:p-12 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 bg-white p-8 rounded-[2rem] shadow-sm border border-slate-200/60">
          <div>
            <button onClick={() => router.push('/scans')} className="flex items-center text-slate-400 hover:text-blue-600 font-bold mb-4 transition-colors text-sm">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Dashboard
            </button>
            <h1 className="text-4xl font-black tracking-tight">{scan.ssid}</h1>
            <div className="flex items-center gap-3 mt-3">
              <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-widest">Scan #{id}</span>
              <span className="text-slate-400 font-mono text-xs">{new Date(scan.timestamp).toLocaleString()}</span>
            </div>
          </div>

          <button onClick={fetchData} className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl shadow-lg hover:bg-blue-600 hover:shadow-blue-200 transition-all active:scale-95 font-bold group">
            <RefreshCw className={`w-5 h-5 group-hover:rotate-180 transition-transform duration-700 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Network
          </button>
        </header>

        {/* Device Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {devices.map((dev: any) => {
            const ui = getDeviceUI(dev.device_guess);
            return (
              <div
                key={dev.id}
                onClick={() => handleDeviceClick(dev)}
                className={`bg-white p-6 rounded-[2rem] shadow-sm border-2 border-transparent ${ui.border} transition-all duration-300 cursor-pointer group hover:shadow-xl hover:-translate-y-1 relative`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-4 rounded-2xl transition-colors ${ui.bg} ${ui.color} ring-4 ring-transparent group-hover:${ui.ring}`}>
                    {ui.icon}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-[10px] font-black text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg font-mono">
                      {dev.ip4}
                    </span>
                    <span className="flex items-center gap-1.5 text-[9px] font-black uppercase text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> {dev.state || 'up'}
                    </span>
                  </div>
                </div>

                <h3 className="font-black text-xl mb-1 truncate text-slate-800">
                  {dev.device_guess || "Unknown Node"}
                </h3>
                <p className="text-slate-400 font-mono text-[10px] uppercase tracking-wider">MAC: {dev.mac}</p>

                <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-blue-600 transition-colors">
                  <span>Inspect Profile</span>
                  <ShieldCheck className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* The Modal */}
      {selectedDevice && (
        <DeviceModal
          device={selectedDevice}
          scanId={id}
          onClose={() => setSelectedDevice(null)}
        />
      )}
    </div>
  );
}