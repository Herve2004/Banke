
import React, { useState } from 'react';
import { Mail, Send, Users, Info, ShieldAlert, CheckCircle2, History, Trash2, Search, User as UserIcon } from 'lucide-react';
import { Notification } from '../types';

interface AdminMessagingProps {
  users: any[];
  onSendMessage: (type: Notification['type'], title: string, message: string) => void;
}

const AdminMessaging: React.FC<AdminMessagingProps> = ({ users, onSendMessage }) => {
  const [selectedRecipientId, setSelectedRecipientId] = useState<string>('all');
  const [msgType, setMsgType] = useState<Notification['type']>('INFO');
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentLog, setSentLog] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !message) return;

    setIsSending(true);
    setTimeout(() => {
      onSendMessage(msgType, title, message);
      
      const recipientName = selectedRecipientId === 'all' 
        ? 'Tous les utilisateurs' 
        : users.find(u => u.id === selectedRecipientId)?.name || 'Inconnu';

      setSentLog([{
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        recipient: recipientName,
        title: title,
        type: msgType
      }, ...sentLog]);

      setTitle('');
      setMessage('');
      setIsSending(false);
    }, 1000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in duration-500 font-mono">
      {/* Formulaire d'envoi */}
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-xl">
              <Mail size={24} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white uppercase tracking-widest">Broadcast Console</h2>
              <p className="text-[10px] text-slate-500 font-bold">SYSTÈME DE TRANSMISSION PRIORITAIRE</p>
            </div>
          </div>

          <form onSubmit={handleSend} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Cible du Cluster</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                  <select 
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-800 rounded-xl text-xs text-slate-900 font-bold focus:ring-1 focus:ring-emerald-500 outline-none"
                    value={selectedRecipientId}
                    onChange={(e) => setSelectedRecipientId(e.target.value)}
                  >
                    <option value="all">Tous les protocoles (Global)</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name} ({u.email})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Niveau d'urgence</label>
                <div className="flex gap-2">
                  {[
                    { id: 'INFO', icon: <Info size={14}/>, color: 'text-blue-500 bg-blue-500/10 border-blue-500/20' },
                    { id: 'SUCCESS', icon: <CheckCircle2 size={14}/>, color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
                    { id: 'SECURITY', icon: <ShieldAlert size={14}/>, color: 'text-rose-500 bg-rose-500/10 border-rose-500/20' }
                  ].map(type => (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setMsgType(type.id as Notification['type'])}
                      className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border transition-all text-[9px] font-black uppercase tracking-tighter ${
                        msgType === type.id ? type.color + ' ring-1 ring-white/10 shadow-lg' : 'bg-slate-800 border-slate-700 text-slate-500'
                      }`}
                    >
                      {type.icon} {type.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Objet du message</label>
              <input 
                required
                type="text" 
                placeholder="Ex: Mise à jour du protocole de sécurité..."
                className="w-full bg-white border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 font-bold focus:ring-1 focus:ring-emerald-500 outline-none"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Corps de transmission</label>
              <textarea 
                required
                rows={6}
                placeholder="Entrez le contenu du message ici..."
                className="w-full bg-white border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 font-bold focus:ring-1 focus:ring-emerald-500 outline-none resize-none"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              disabled={isSending}
              className="w-full py-4 bg-emerald-500 text-slate-950 rounded-xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-emerald-400 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2"
            >
              {isSending ? "Envoi en cours..." : "Lancer la Transmission"} <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* Colonne latérale: Historique & Recherche */}
      <div className="space-y-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[10px] font-black text-white uppercase tracking-widest flex items-center gap-2">
              <History size={14} className="text-blue-500" />
              Journal de Messagerie
            </h3>
            <button 
              onClick={() => setSentLog([])}
              className="p-1.5 hover:bg-rose-500/10 text-rose-500 rounded-lg transition-colors"
              title="Vider l'historique"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
            {sentLog.length === 0 ? (
              <div className="py-12 text-center">
                <p className="text-[10px] font-bold text-slate-600 uppercase">Aucune transmission archivée</p>
              </div>
            ) : (
              sentLog.map(log => (
                <div key={log.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 group">
                  <div className="flex justify-between items-start">
                    <span className="text-[9px] text-slate-600 font-mono">[{log.timestamp}]</span>
                    <span className={`text-[8px] font-black px-1.5 py-0.5 rounded uppercase ${
                      log.type === 'SECURITY' ? 'bg-rose-500/10 text-rose-500' :
                      log.type === 'SUCCESS' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                      {log.type}
                    </span>
                  </div>
                  <p className="text-[10px] text-white font-bold leading-tight">{log.title}</p>
                  <p className="text-[9px] text-slate-500 flex items-center gap-1 uppercase tracking-tighter">
                    <UserIcon size={10} /> {log.recipient}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Aide mémoire des types */}
        <div className="p-6 bg-slate-800/30 border border-slate-800 rounded-2xl">
          <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-4">Protocoles de Message</h4>
          <div className="space-y-3">
            <div className="flex gap-3">
              <div className="w-1 bg-blue-500 rounded-full"></div>
              <p className="text-[9px] text-slate-400 leading-relaxed"><span className="text-white font-bold">INFO:</span> Pour les communications standards et informations générales.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-emerald-500 rounded-full"></div>
              <p className="text-[9px] text-slate-400 leading-relaxed"><span className="text-white font-bold">SUCCESS:</span> Pour les confirmations de virements ou validations de comptes.</p>
            </div>
            <div className="flex gap-3">
              <div className="w-1 bg-rose-500 rounded-full"></div>
              <p className="text-[9px] text-slate-400 leading-relaxed"><span className="text-white font-bold">SECURITY:</span> Pour les alertes de fraude, les changements de clés ou les urgences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMessaging;
