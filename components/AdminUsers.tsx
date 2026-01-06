
import React, { useState } from 'react';
import { 
  Search, ShieldCheck, ShieldAlert, UserPlus, 
  MoreVertical, Ban, CheckCircle, X, 
  Fingerprint, Loader2, Trash2, AlertCircle 
} from 'lucide-react';

interface AdminUsersProps {
  users: any[];
  onSetUsers: (users: any[]) => void;
  onNotify: (msg: string) => void;
}

const AdminUsers: React.FC<AdminUsersProps> = ({ users, onSetUsers, onNotify }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  
  const [newProtocol, setNewProtocol] = useState({
    name: '',
    email: '',
    balance: '',
    type: 'Standard'
  });

  const handleCreateProtocol = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInitializing(true);

    setTimeout(() => {
      const newUser = {
        id: `u${Date.now()}`,
        name: newProtocol.name,
        email: newProtocol.email,
        balance: parseFloat(newProtocol.balance) || 0,
        status: 'Actif',
        joins: new Date().toISOString().split('T')[0]
      };

      onSetUsers([newUser, ...users]);
      setIsInitializing(false);
      setIsModalOpen(false);
      onNotify(`Nouveau compte créé : ${newProtocol.name}`);
      setNewProtocol({ name: '', email: '', balance: '', type: 'Standard' });
    }, 2000);
  };

  const handleDeleteUser = (id: string) => {
    onSetUsers(users.filter(u => u.id !== id));
    setDeleteConfirm(null);
    onNotify('Compte utilisateur supprimé avec succès.');
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 font-mono">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input 
            type="text"
            placeholder="Interroger Identity Database..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-[10px] text-slate-200 font-bold focus:border-emerald-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-6 py-2.5 bg-emerald-500 text-slate-950 rounded-lg font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <UserPlus size={14} /> Initialiser Nouveau Compte
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800">
                <th className="px-6 py-4 font-black text-slate-500 uppercase tracking-widest">Sujet / Email</th>
                <th className="px-6 py-4 font-black text-slate-500 uppercase tracking-widest">Status Protocole</th>
                <th className="px-6 py-4 font-black text-slate-500 uppercase tracking-widest">Vérification</th>
                <th className="px-6 py-4 font-black text-slate-500 uppercase tracking-widest">Liquidité</th>
                <th className="px-6 py-4 font-black text-slate-500 uppercase tracking-widest text-right">Actions Kernel</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-emerald-500/5 group transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center font-black text-emerald-500 border border-slate-700">
                        {user.name[0]}
                      </div>
                      <div>
                        <div className="font-black text-slate-100 uppercase tracking-tighter">{user.name}</div>
                        <div className="text-slate-500 text-[9px] font-mono">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                      user.status === 'Actif' ? 'text-emerald-400 border-emerald-400/20 bg-emerald-400/5' : 'text-rose-400 border-rose-400/20 bg-rose-400/5'
                    }`}>
                      {user.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {user.status === 'Actif' ? <ShieldCheck size={16} className="text-emerald-500" /> : <ShieldAlert size={16} className="text-rose-500" />}
                  </td>
                  <td className="px-6 py-4 text-slate-300 font-mono font-bold">
                    ${user.balance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-emerald-500/20 text-emerald-500 rounded-lg" title="Valider">
                        <CheckCircle size={14} />
                      </button>
                      <button 
                        onClick={() => setDeleteConfirm(user.id)}
                        className="p-2 hover:bg-rose-500/20 text-rose-500 rounded-lg" 
                        title="Révoquer"
                      >
                        <Trash2 size={14} />
                      </button>
                      <button className="p-2 hover:bg-slate-800 text-slate-500 rounded-lg">
                        <MoreVertical size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {deleteConfirm && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)} />
          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-4 shadow-2xl animate-in zoom-in-95">
            <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-widest">Révocation Critique</h3>
            <p className="text-[10px] text-slate-400 leading-relaxed uppercase">Attention: Cette opération purgera définitivement l'identité du cluster central. Cette action est irréversible.</p>
            <div className="flex gap-3 pt-6">
              <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 bg-slate-800 text-slate-300 rounded-xl text-[10px] font-black uppercase tracking-widest">Annuler</button>
              <button onClick={() => handleDeleteUser(deleteConfirm)} className="flex-1 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-900/40">Exécuter</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" onClick={() => !isInitializing && setIsModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                  <Fingerprint size={20} />
                </div>
                <h3 className="text-xs font-black text-white uppercase tracking-[0.2em]">Initialisation Protocole Identity</h3>
              </div>
              {!isInitializing && <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-500"><X size={20} /></button>}
            </div>

            <div className="p-8">
              {isInitializing ? (
                <div className="py-12 flex flex-col items-center justify-center space-y-6">
                  <Loader2 size={48} className="text-emerald-500 animate-spin" />
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] animate-pulse">Syncing Kernel Clusters...</p>
                </div>
              ) : (
                <form onSubmit={handleCreateProtocol} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Alias Identité</label>
                      <input required type="text" className="w-full bg-white border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 font-bold outline-none focus:border-emerald-500" value={newProtocol.name} onChange={e => setNewProtocol({...newProtocol, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Canal Email</label>
                      <input required type="email" className="w-full bg-white border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 font-bold outline-none focus:border-emerald-500" value={newProtocol.email} onChange={e => setNewProtocol({...newProtocol, email: e.target.value})} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Injection Initiale ($)</label>
                      <input required type="number" className="w-full bg-white border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 font-black outline-none focus:border-emerald-500" value={newProtocol.balance} onChange={e => setNewProtocol({...newProtocol, balance: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Secteur Compte</label>
                      <select className="w-full bg-white border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-900 font-bold outline-none focus:border-emerald-500" value={newProtocol.type} onChange={e => setNewProtocol({...newProtocol, type: e.target.value})}>
                        <option>Standard</option>
                        <option>Premium</option>
                        <option>Institution</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="w-full py-4 bg-emerald-500 text-slate-950 rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-emerald-400 transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)]">Ouvrir Accès Protocole</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
