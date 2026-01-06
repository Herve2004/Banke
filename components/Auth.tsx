
import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, ArrowRight, PlayCircle, Loader2, AlertCircle } from 'lucide-react';

interface AuthProps {
  onLogin: (email: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulation d'une latence réseau
    setTimeout(() => {
      if (email === 'admin@nexgen.com' && password !== 'admin123') {
        setError('Mot de passe administrateur incorrect.');
        setIsLoading(false);
      } else {
        onLogin(email);
      }
    }, 1200);
  };

  const handleQuickAccess = (type: 'admin' | 'user') => {
    setIsLoading(true);
    setTimeout(() => {
      onLogin(type === 'admin' ? 'admin@nexgen.com' : 'client@nexgen.com');
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-inter">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl text-white mb-4 shadow-xl shadow-indigo-100 animate-bounce-slow">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">NexGen Core</h1>
          <p className="text-slate-500 mt-2 font-medium">Accès sécurisé au système financier</p>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-2xl relative overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
              <Loader2 size={40} className="text-indigo-600 animate-spin mb-4" />
              <p className="text-xs font-black text-slate-900 uppercase tracking-widest">Initialisation de la session...</p>
            </div>
          )}

          <div className="flex bg-slate-100 p-1 rounded-2xl mb-8">
            <button 
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              Connexion
            </button>
            <button 
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${!isLogin ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              Inscription
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleAuth}>
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-2 text-rose-600 text-xs font-bold animate-shake">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Nom complet</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    required
                    type="text" 
                    placeholder="Jean Dupont"
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-bold"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Identifiant Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@nexgen.com"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-bold"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Clé d'accès</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-bold"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 flex items-center justify-center gap-2 group"
            >
              {isLogin ? 'Débloquer Session' : 'Initialiser Compte'}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="pt-4 flex flex-col gap-3">
              <p className="text-center text-[9px] font-black text-slate-400 uppercase tracking-[0.2em]">Accès Rapides Démonstration</p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickAccess('admin')}
                  className="py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase hover:bg-slate-50 transition-all"
                >
                  Mode Admin
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickAccess('user')}
                  className="py-2.5 bg-white border border-slate-200 text-slate-900 rounded-xl text-[10px] font-black uppercase hover:bg-slate-50 transition-all"
                >
                  Mode Client
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <p className="text-center text-slate-400 text-[9px] mt-8 uppercase tracking-[0.3em] font-black">
          NexGen Unified Security Infrastructure v4.2
        </p>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-4px); }
          75% { transform: translateX(4px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
        .animate-bounce-slow { animation: bounce 3s infinite; }
      `}</style>
    </div>
  );
};

export default Auth;
