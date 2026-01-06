
import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Zap, Globe, Lock, Key, RefreshCw, Cpu } from 'lucide-react';

const AdminSecurity: React.FC = () => {
  const [maintMode, setMaintMode] = useState(false);
  
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Security Health */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h4 className="text-xs font-black uppercase text-white flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-500" />
            Encryption Hub & API Health
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded">
                  <Cpu size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">Gemini AI Engine</p>
                  <p className="text-[9px] text-slate-500">Model: gemini-3-flash-preview</p>
                </div>
              </div>
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">HEALTHY</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 text-purple-400 rounded">
                  <Lock size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">SSL/TLS Stack</p>
                  <p className="text-[9px] text-slate-500">v1.3 AES-256-GCM</p>
                </div>
              </div>
              <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">ACTIVE</span>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between opacity-50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-rose-500/10 text-rose-400 rounded">
                  <ShieldAlert size={18} />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">Intrusion Detection</p>
                  <p className="text-[9px] text-slate-500">IPS Cluster 02 Offline</p>
                </div>
              </div>
              <span className="text-[9px] font-black text-rose-400 bg-rose-400/10 px-2 py-1 rounded">DISABLED</span>
            </div>
          </div>
        </div>

        {/* Global Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 space-y-6">
          <h4 className="text-xs font-black uppercase text-white flex items-center gap-2">
            <Zap size={16} className="text-amber-500" />
            Global Protocol Control
          </h4>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-lg">
              <div>
                <p className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">Maintenance Mode</p>
                <p className="text-[9px] text-slate-500">Lock all user sessions immediately</p>
              </div>
              <button 
                onClick={() => setMaintMode(!maintMode)}
                className={`w-12 h-6 rounded-full relative transition-colors ${maintMode ? 'bg-rose-600' : 'bg-slate-800'}`}
              >
                <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${maintMode ? 'right-1' : 'left-1'}`}></div>
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-950 border border-slate-800 rounded-lg">
              <div>
                <p className="text-[11px] font-bold text-slate-200 uppercase tracking-tight">Enforce 2FA</p>
                <p className="text-[9px] text-slate-500">Mandatory for all premium protocols</p>
              </div>
              <div className="w-12 h-6 rounded-full bg-emerald-600 relative">
                <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white"></div>
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                <Key size={14} /> Rotate Platform Keys
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-3 border border-rose-500/50 text-rose-500 hover:bg-rose-500/10 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">
                <ShieldAlert size={14} /> Immediate Emergency Shutdown
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSecurity;
