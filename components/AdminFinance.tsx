
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';
import { Landmark, TrendingUp, TrendingDown, DollarSign, ArrowRightLeft, PlusCircle, CheckCircle2, Loader2 } from 'lucide-react';

const financeData = [
  { name: 'Lun', donations: 4500, deposits: 12000 },
  { name: 'Mar', donations: 5200, deposits: 11000 },
  { name: 'Mer', donations: 3800, deposits: 15000 },
  { name: 'Jeu', donations: 8900, deposits: 9000 },
  { name: 'Ven', donations: 6100, deposits: 18000 },
  { name: 'Sam', donations: 2400, deposits: 5000 },
  { name: 'Dim', donations: 1200, deposits: 3000 },
];

const categoryData = [
  { name: 'Santé', value: 400 },
  { name: 'Éducation', value: 300 },
  { name: 'Pauvreté', value: 300 },
  { name: 'Urgence', value: 200 },
];

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

const AdminFinance: React.FC = () => {
  const [globalLiquidity, setGlobalLiquidity] = useState(2450900);
  const [injectionAmount, setInjectionAmount] = useState('');
  const [isInjecting, setIsInjecting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInjectFunds = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(injectionAmount);
    if (!amount || amount <= 0) return;

    setIsInjecting(true);
    setTimeout(() => {
      setGlobalLiquidity(prev => prev + amount);
      setIsInjecting(false);
      setShowSuccess(true);
      setInjectionAmount('');
      setTimeout(() => setShowSuccess(false), 3000);
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 border-l-4 border-l-emerald-500">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Liquidité Globale</p>
          <h3 className="text-3xl font-black text-white">${globalLiquidity.toLocaleString()}.00</h3>
          <div className="flex items-center gap-1 text-emerald-400 text-[10px] mt-2 font-bold">
            <TrendingUp size={12} /> +2.4% vs 24h
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 border-l-4 border-l-indigo-500">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Flux de Dons Total</p>
          <h3 className="text-3xl font-black text-white">$842,000</h3>
          <div className="flex items-center gap-1 text-emerald-400 text-[10px] mt-2 font-bold">
            <TrendingUp size={12} /> +12.8% cette semaine
          </div>
        </div>
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 border-l-4 border-l-rose-500">
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Commission Banque (0%)</p>
          <h3 className="text-3xl font-black text-white">$0.00</h3>
          <div className="flex items-center gap-1 text-slate-500 text-[10px] mt-2 font-bold italic">
            Protocole Bancaire Sans But Lucratif
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Treasury Injection Form */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 relative overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs font-black uppercase text-white flex items-center gap-2">
                <PlusCircle size={14} className="text-emerald-500" />
                Injection de Trésorerie
              </h4>
              {showSuccess && (
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black animate-in slide-in-from-right">
                  <CheckCircle2 size={14} /> LIQUIDITÉ MISE À JOUR
                </div>
              )}
            </div>
            <form onSubmit={handleInjectFunds} className="flex gap-4">
              <div className="flex-1">
                <input 
                  type="number" 
                  placeholder="Montant à injecter ($)..."
                  className="w-full bg-white border border-slate-700 rounded-lg px-4 py-3 text-sm text-slate-900 font-black focus:border-emerald-500 outline-none transition-all"
                  value={injectionAmount}
                  onChange={e => setInjectionAmount(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                disabled={isInjecting}
                className="px-8 bg-emerald-500 text-slate-950 rounded-lg font-black text-[11px] uppercase tracking-widest hover:bg-emerald-400 transition-all flex items-center gap-2"
              >
                {isInjecting ? <Loader2 size={16} className="animate-spin" /> : "Recharger la Banque"}
              </button>
            </form>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
            <h4 className="text-xs font-black uppercase text-white mb-8 flex items-center gap-2">
              <Landmark size={14} className="text-emerald-500" />
              Volume Transactionnel (7j)
            </h4>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financeData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 10}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px' }}
                    itemStyle={{ fontSize: '10px', fontWeight: 'bold' }}
                  />
                  <Bar dataKey="deposits" fill="#10b981" radius={[4, 4, 0, 0]} name="Dépôts" />
                  <Bar dataKey="donations" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Dons" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col">
          <h4 className="text-xs font-black uppercase text-white mb-8">Allocation par Secteur</h4>
          <div className="flex-1">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3 mt-6">
            {categoryData.map((cat, i) => (
              <div key={i} className="flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                  <span className="text-slate-400 font-bold uppercase">{cat.name}</span>
                </div>
                <span className="text-white font-mono">{cat.value} TXs</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminFinance;
