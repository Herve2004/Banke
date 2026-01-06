
import React, { useState } from 'react';
import { Shield, ShieldOff, Eye, EyeOff, Lock, Zap } from 'lucide-react';

interface VirtualCardProps {
  userName: string;
  accountNumber: string;
}

const VirtualCard: React.FC<VirtualCardProps> = ({ userName, accountNumber }) => {
  const [isFrozen, setIsFrozen] = useState(false);
  const [showNumbers, setShowNumbers] = useState(false);

  return (
    <div className="relative group perspective-1000">
      <div className={`relative w-full h-52 rounded-[2rem] p-8 transition-all duration-700 transform-style-3d ${
        isFrozen ? 'grayscale opacity-60' : ''
      } bg-gradient-to-br from-indigo-600 via-purple-600 to-rose-500 shadow-2xl overflow-hidden`}>
        {/* Abstract design elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/20 rounded-full translate-y-24 -translate-x-24 blur-2xl"></div>
        
        <div className="relative z-10 h-full flex flex-col justify-between text-white">
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">NexGen Virtual</span>
              <span className="text-xl font-bold flex items-center gap-2 italic">
                Titanium <Zap size={16} fill="currentColor" />
              </span>
            </div>
            <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl">
              <Shield size={20} />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-4">
              <p className="text-xl font-mono tracking-[0.3em]">
                {showNumbers ? accountNumber.replace(/(.{4})/g, '$1 ') : '•••• •••• •••• ' + accountNumber.slice(-4)}
              </p>
              <button onClick={() => setShowNumbers(!showNumbers)} className="opacity-60 hover:opacity-100">
                {showNumbers ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[9px] uppercase font-bold opacity-50">Card Holder</p>
                <p className="text-sm font-bold uppercase tracking-tight">{userName}</p>
              </div>
              <div className="text-right">
                <p className="text-[9px] uppercase font-bold opacity-50">Expiry</p>
                <p className="text-sm font-bold">12/28</p>
              </div>
            </div>
          </div>
        </div>

        {isFrozen && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-[2px] z-20">
            <Lock className="text-white mb-2" size={32} />
            <span className="text-white font-black text-xs uppercase tracking-widest">Card Frozen</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button 
          onClick={() => setIsFrozen(!isFrozen)}
          className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
            isFrozen ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600'
          }`}
        >
          {isFrozen ? <ShieldOff size={14} /> : <Shield size={14} />}
          {isFrozen ? 'Débloquer la carte' : 'Geler la carte'}
        </button>
      </div>
    </div>
  );
};

export default VirtualCard;
