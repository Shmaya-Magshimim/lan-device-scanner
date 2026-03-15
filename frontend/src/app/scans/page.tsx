"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Wifi, Calendar, ArrowLeft } from 'lucide-react';

export default function ScansListPage() {
    const [scans, setScans] = useState([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/scans/`)
            .then(res => res.json())
            .then(data => setScans(data))
            .catch(err => console.error("History fetch error:", err));
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <div className="max-w-4xl mx-auto">
                <Link href="/" className="flex items-center text-blue-600 hover:underline mb-8 font-medium">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </Link>
                <h1 className="text-3xl font-black text-slate-900 mb-8">Network Snapshots</h1>

                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
                    {scans.length === 0 ? (
                        <div className="p-20 text-center text-slate-400">
                            <Wifi className="w-12 h-12 mx-auto mb-4 opacity-20" />
                            <p>No historical data found.</p>
                        </div>
                    ) : (
                        scans.map((scan: any, index: number) => (
                            <Link
                                key={scan.id || `scan-${index}`}
                                href={`/scans/${scan.id}`}
                                className="flex items-center justify-between p-6 border-b last:border-0 hover:bg-blue-50/50 transition-colors group"
                            >
                                <div className="flex items-center gap-5">
                                    <div className="bg-blue-50 p-4 rounded-2xl group-hover:bg-blue-600 transition-colors">
                                        <Wifi className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-xl">{scan.ssid || "Scanning..."}</h3>
                                        <div className="flex items-center gap-4 text-slate-500 text-sm mt-1">
                                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-slate-400" /> {new Date(scan.timestamp).toLocaleDateString()}</span>
                                            <span className="font-mono text-xs bg-slate-100 px-2 py-0.5 rounded text-slate-500">#{scan.id}</span>
                                        </div>
                                    </div>
                                </div>
                                <ChevronRight className="text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                            </Link>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}