
import React, { useState, useEffect } from 'react';
import { Heart, Send, CheckCircle2, User, AlertCircle } from 'lucide-react';
import { User as UserType } from '../types';

interface Props {
  user: UserType;
  initialRecipient?: string;
  onUpdateBalance: (amount: number) => void;
  onDonationSuccess: (amount: number, recipient: string) => void;
}

const DonationCenter: React.FC<Props> = ({ user, initialRecipient, onUpdateBalance, onDonationSuccess }) => {
  // Initialisation directe depuis la prop pour un affichage immédiat
  const [recipient, setRecipient] = useState(initialRecipient || '');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Mise à jour réactive si la prop change
  useEffect(() => {
    if (initialRecipient) {
      setRecipient(initialRecipient);
    }
  }, [initialRecipient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (!val || val <= 0 || val > user.balance) return;

    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      onUpdateBalance(user.balance - val);
      onDonationSuccess(val, recipient);
      setIsProcessing(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setRecipient('');
        setAmount('');
        setMessage('');
      }, 3000);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-white relative">
          <Heart className="absolute top-4 right-4 text-white/20" size={80} />
          <h2 className="text-2xl font-bold mb-2">Send a Gift</h2>
          <p className="text-indigo-100 opacity-90">Manage your donations to individuals or charities with zero fees.</p>
        </div>

        {showSuccess ? (
          <div className="p-12 text-center space-y-4">
            <div className="flex justify-center">
              <CheckCircle2 size={64} className="text-green-500 animate-bounce" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900">Transfer Successful!</h3>
            <p className="text-slate-500">Your gift of ${parseFloat(amount).toLocaleString()} has been sent to {recipient}.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Recipient Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    required
                    value={recipient}
                    onChange={e => setRecipient(e.target.value)}
                    placeholder="e.g. Marie Curie"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-900 font-bold"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Amount ($)</label>
                <input 
                  type="number" 
                  required
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-slate-900 font-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Personal Message (Optional)</label>
              <textarea 
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Write a warm note..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none resize-none text-slate-900"
              />
            </div>

            <div className="bg-slate-50 p-4 rounded-xl flex gap-3 border border-slate-100">
              <AlertCircle className="text-indigo-600 shrink-0" size={20} />
              <p className="text-xs text-slate-600 leading-relaxed">
                You are sending a direct gift. Funds will be instantly available to the recipient. 
                Please ensure the recipient details are correct.
              </p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-200 ${
                isProcessing ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98]'
              }`}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Confirm Gift & Send
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <div className="mt-8 bg-indigo-50 border border-indigo-100 p-6 rounded-2xl flex items-center justify-between">
        <div>
          <h4 className="font-bold text-indigo-900">Your Current Impact</h4>
          <p className="text-sm text-indigo-700">You've helped 12 people this year.</p>
        </div>
        <div className="flex -space-x-2">
          {[1, 2, 3, 4].map(i => (
            <img 
              key={i} 
              src={`https://picsum.photos/seed/${i}/40/40`} 
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              alt="impact"
            />
          ))}
          <div className="w-8 h-8 rounded-full bg-indigo-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-indigo-700">
            +8
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationCenter;
