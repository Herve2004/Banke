
import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Landmark, Send, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { User } from '../types';

interface TransferFundsProps {
  user: User;
  initialData?: { name: string; account?: string } | null;
  onUpdateBalance: (newBalance: number) => void;
  onTransferSuccess: (amount: number, recipient: string) => void;
}

const TransferFunds: React.FC<TransferFundsProps> = ({ user, initialData, onUpdateBalance, onTransferSuccess }) => {
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    accountNumber: initialData?.account || '',
    recipientName: initialData?.name || '',
    amount: '',
    reference: '',
    isInstant: false
  });
  
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        recipientName: initialData.name,
        accountNumber: initialData.account || ''
      }));
    }
  }, [initialData]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) setStep(2);
  };

  const handleConfirm = () => {
    const amountNum = parseFloat(formData.amount);
    if (amountNum > user.balance) return;

    setIsProcessing(true);
    setTimeout(() => {
      onUpdateBalance(user.balance - amountNum);
      onTransferSuccess(amountNum, formData.recipientName);
      setIsProcessing(false);
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-slate-900 p-8 text-white relative">
          <ArrowRightLeft className="absolute top-4 right-4 text-white/10" size={80} />
          <h2 className="text-2xl font-bold mb-2">Virement Bancaire</h2>
          <p className="text-slate-400 text-sm">Transférez des fonds en toute sécurité vers n'importe quel compte.</p>
          
          <div className="flex gap-2 mt-6">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all ${step >= i ? 'bg-indigo-500' : 'bg-slate-700'}`}></div>
            ))}
          </div>
        </div>

        <div className="p-8">
          {step === 1 && (
            <form onSubmit={handleNext} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Compte de destination (IBAN / RIB)</label>
                <div className="relative">
                  <Landmark className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="FR76 3000..."
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-mono text-sm uppercase text-slate-900 font-bold"
                    value={formData.accountNumber}
                    onChange={e => setFormData({...formData, accountNumber: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Nom du bénéficiaire</label>
                <input 
                  required
                  type="text" 
                  placeholder="Ex: Jean Martin"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-900"
                  value={formData.recipientName}
                  onChange={e => setFormData({...formData, recipientName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Montant ($)</label>
                  <input 
                    required
                    type="number" 
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-lg font-black text-slate-900"
                    value={formData.amount}
                    onChange={e => setFormData({...formData, amount: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Options</label>
                  <button 
                    type="button"
                    onClick={() => setFormData({...formData, isInstant: !formData.isInstant})}
                    className={`w-full h-[52px] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                      formData.isInstant ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-500 border-slate-200'
                    }`}
                  >
                    Virement Instantané
                  </button>
                </div>
              </div>

              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                Continuer <Send size={18} />
              </button>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-4">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-slate-500">Bénéficiaire</span>
                  <span className="text-sm font-black text-slate-900">{formData.recipientName}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-slate-500">IBAN</span>
                  <span className="text-xs font-mono text-slate-700">{formData.accountNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500">Montant total</span>
                  <span className="text-xl font-black text-indigo-600">${parseFloat(formData.amount).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <AlertCircle className="text-amber-600 shrink-0" size={18} />
                <p className="text-[10px] text-amber-700 font-medium leading-relaxed">
                  En confirmant, vous autorisez NexGen Bank à débiter votre compte immédiatement. 
                  Les virements vers des banques tierces peuvent prendre jusqu'à 24h.
                </p>
              </div>

              <div className="flex gap-4">
                <button 
                  onClick={() => setStep(1)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-all"
                >
                  Modifier
                </button>
                <button 
                  onClick={handleConfirm}
                  disabled={isProcessing}
                  className="flex-[2] py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
                >
                  {isProcessing ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : "Confirmer le virement"}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="py-12 text-center space-y-6">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={48} className="text-green-500 animate-in zoom-in duration-500" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">Virement Envoyé !</h3>
                <p className="text-slate-500 text-sm mt-2">L'argent est en route vers {formData.recipientName}.</p>
              </div>
              <button 
                onClick={() => setStep(1)}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all"
              >
                Faire un autre virement
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Info size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">Limites</p>
            <p className="text-xs font-bold text-slate-700">$5,000 / jour</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <CheckCircle2 size={16} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">Frais</p>
            <p className="text-xs font-bold text-slate-700">Gratuit</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferFunds;
