
import React from 'react';
import { X, Bell, CheckCircle2, AlertTriangle, ShieldCheck, Info, Trash2, Zap, Shield } from 'lucide-react';
import { Notification } from '../types';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkAsRead, 
  onClearAll 
}) => {
  if (!isOpen) return null;

  const getIcon = (notif: Notification) => {
    if (notif.isSystem) return <Zap size={18} className="text-amber-500 fill-amber-500/20" />;
    
    switch (notif.type) {
      case 'SUCCESS': return <CheckCircle2 size={18} className="text-emerald-500" />;
      case 'WARNING': return <AlertTriangle size={18} className="text-amber-500" />;
      case 'SECURITY': return <ShieldCheck size={18} className="text-indigo-500" />;
      default: return <Info size={18} className="text-blue-500" />;
    }
  };

  const getBorderColor = (notif: Notification) => {
    if (!notif.isSystem) return 'border-slate-100';
    switch (notif.type) {
      case 'SECURITY': return 'border-l-rose-500 bg-rose-50/30';
      case 'SUCCESS': return 'border-l-emerald-500 bg-emerald-50/30';
      case 'INFO': return 'border-l-blue-500 bg-blue-50/30';
      default: return 'border-l-amber-500 bg-amber-50/30';
    }
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Bell size={20} />
            </div>
            <h3 className="font-black text-slate-900 uppercase tracking-tight text-sm">Centre de Messages</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-400">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {notifications.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center border-2 border-dashed border-slate-200">
                <Bell size={32} className="text-slate-200" />
              </div>
              <div>
                <p className="font-bold text-slate-900">Aucun signal</p>
                <p className="text-xs text-slate-400 font-medium">Votre terminal est à jour. Aucune action requise.</p>
              </div>
            </div>
          ) : (
            notifications.sort((a, b) => (a.isRead ? 1 : -1)).map((notif) => (
              <div 
                key={notif.id}
                onClick={() => onMarkAsRead(notif.id)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer group relative overflow-hidden ${
                  notif.isRead 
                    ? 'bg-white border-slate-100 opacity-60' 
                    : `shadow-md border-l-4 ${getBorderColor(notif)}`
                } ${notif.type === 'SECURITY' && !notif.isRead ? 'animate-pulse-subtle' : ''}`}
              >
                {/* Badge Système */}
                {notif.isSystem && (
                  <div className="absolute top-0 right-0 px-3 py-1 bg-slate-900 text-white text-[8px] font-black uppercase tracking-widest rounded-bl-xl flex items-center gap-1">
                    <Shield size={8} className="text-amber-400" /> Officiel Admin
                  </div>
                )}

                <div className="flex gap-4">
                  <div className={`mt-0.5 shrink-0 ${notif.isSystem ? 'animate-bounce-slow' : ''}`}>
                    {getIcon(notif)}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <p className={`text-sm font-black tracking-tight ${notif.isSystem ? 'text-slate-900' : 'text-slate-800'}`}>
                      {notif.title}
                    </p>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between pt-2">
                      <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest italic">{notif.timestamp}</p>
                      {!notif.isRead && <span className="text-[8px] font-black text-indigo-600 uppercase tracking-tighter">Nouveau message</span>}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {notifications.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50">
            <button 
              onClick={onClearAll}
              className="w-full flex items-center justify-center gap-2 py-4 bg-white border border-slate-200 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 hover:text-rose-600 transition-all shadow-sm"
            >
              <Trash2 size={14} /> Purger l'historique
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
          50% { transform: scale(1.01); box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1); }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s infinite ease-in-out;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default NotificationPanel;
