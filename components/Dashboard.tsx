
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Wallet, Heart, ArrowUpRight, Sparkles, Eye, EyeOff, Award, TrendingUp } from 'lucide-react';
import { getFinancialInsights } from '../services/geminiService';
import { MOCK_TRANSACTIONS } from '../constants';
import { AIInsight, User } from '../types';
import VirtualCard from './VirtualCard';

const data = [
  { name: 'Jun', balance: 8500 },
  { name: 'Jul', balance: 9200 },
  { name: 'Aug', balance: 11000 },
  { name: 'Sep', balance: 10500 },
  { name: 'Oct', balance: 12450 },
  { name: 'Nov', balance: 12450 },
];

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(true);
  const [isPrivacyMode, setIsPrivacyMode] = useState(false);

  useEffect(() => {
    const fetchInsights = async () => {
      const res = await getFinancialInsights(user.balance, MOCK_TRANSACTIONS);
      setInsights(res);
      setLoadingInsights(false);
    };
    fetchInsights();
  }, [user.balance]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Stat & Privacy Toggle */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Financial Overview</h2>
        <button 
          onClick={() => setIsPrivacyMode(!isPrivacyMode)}
          className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          {isPrivacyMode ? <EyeOff size={14} /> : <Eye size={14} />}
          {isPrivacyMode ? 'Désactiver Mode Privé' : 'Activer Mode Privé'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Main Stats & Chart */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                <Wallet size={80} />
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">Total Balance</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {isPrivacyMode ? '•••••••' : `$${user.balance.toLocaleString()}`}
              </h3>
              <div className="mt-4 flex items-center gap-2 text-green-600 text-xs font-bold">
                <div className="bg-green-100 p-1 rounded-full"><TrendingUp size={12} /></div>
                +12.5% vs last month
              </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform text-rose-600">
                <Heart size={80} />
              </div>
              <p className="text-slate-500 text-sm font-medium mb-1">Impact Social</p>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">$2,450.00</h3>
              <div className="mt-4 flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-slate-200"></div>)}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">12 Vies impactées</span>
              </div>
            </div>
          </div>

          {/* Chart Section */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">Wealth Progression</h3>
              <div className="flex gap-2">
                {['1M', '6M', '1Y'].map(t => (
                  <button key={t} className={`px-3 py-1 rounded-lg text-[10px] font-black ${t === '6M' ? 'bg-indigo-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.15}/>
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} dy={10} />
                  <YAxis hide={isPrivacyMode} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                  />
                  <Area type="monotone" dataKey="balance" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Right Col: Virtual Card & Insights */}
        <div className="space-y-8">
          <VirtualCard userName={user.name} accountNumber={user.accountNumber} />

          <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-indigo-600" size={20} />
              <h3 className="text-lg font-bold text-slate-900">Smart Insights</h3>
            </div>
            
            <div className="space-y-4">
              {loadingInsights ? (
                <div className="space-y-4">
                  {[1, 2].map(i => <div key={i} className="animate-pulse bg-slate-100 h-24 rounded-2xl"></div>)}
                </div>
              ) : (
                insights.map((insight, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 group cursor-default hover:bg-white hover:shadow-md transition-all">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-slate-800 text-xs">{insight.title}</h4>
                      <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">AI Analysis</span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">{insight.description}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Gamification Badges */}
          <div className="bg-indigo-900 p-6 rounded-[2rem] text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Achievements</h3>
              <Award className="text-amber-400" size={20} />
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20" title="First Donation">
                <Heart size={20} className="text-rose-400" />
              </div>
              <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20" title="Philanthropist">
                <Sparkles size={20} className="text-indigo-300" />
              </div>
              <div className="shrink-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 border-dashed opacity-40">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
