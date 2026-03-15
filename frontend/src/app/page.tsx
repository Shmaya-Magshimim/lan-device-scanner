"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, History, Loader2 } from 'lucide-react';

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const startNewScan = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/scans/`, { method: 'POST' });
      const data = await res.json();
      router.push(`/scans/${data.id}`); // Go to the detail page immediately
    } catch (error) {
      alert("Failed to reach backend. Is FastAPI running?");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">NetWatcher</h1>
        <p className="text-slate-500 text-lg">Professional Network Discovery & Security Audit</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* SCAN BUTTON */}
        <button
          onClick={startNewScan}
          disabled={loading}
          className="group relative flex flex-col items-center p-10 bg-white border-2 border-transparent hover:border-blue-500 rounded-3xl shadow-xl transition-all hover:-translate-y-2"
        >
          <div className="bg-blue-100 p-6 rounded-2xl mb-6 group-hover:bg-blue-600 transition-colors">
            {loading ? <Loader2 className="w-12 h-12 text-blue-600 group-hover:text-white animate-spin" /> : <Search className="w-12 h-12 text-blue-600 group-hover:text-white" />}
          </div>
          <span className="text-2xl font-bold text-slate-800">Scan Network</span>
          <span className="text-slate-400 mt-2 text-center">Map all devices on your current SSID</span>
        </button>

        {/* HISTORY BUTTON */}
        <button
          onClick={() => router.push('/scans')}
          className="group flex flex-col items-center p-10 bg-white border-2 border-transparent hover:border-slate-400 rounded-3xl shadow-xl transition-all hover:-translate-y-2"
        >
          <div className="bg-slate-100 p-6 rounded-2xl mb-6 group-hover:bg-slate-800 transition-colors">
            <History className="w-12 h-12 text-slate-600 group-hover:text-white" />
          </div>
          <span className="text-2xl font-bold text-slate-800">Past Scans</span>
          <span className="text-slate-400 mt-2 text-center">Review historical network snapshots</span>
        </button>
      </div>
    </main>
  );
}