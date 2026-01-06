
import React, { useState } from 'react';
import { 
  Users, Search, UserPlus, MessageSquare, Phone, 
  Mail, ShieldAlert, Send, Heart, ArrowRightLeft, 
  Info, CheckCircle2, MoreVertical, X, Landmark, Tag, Loader2
} from 'lucide-react';
import { MOCK_BENEFICIARIES } from '../constants';
import UserAvatar from './UserAvatar';

interface ContactPageProps {
  onNavigateToTransfer: (recipient: string, accountNumber: string) => void;
  onNavigateToDonation: (recipient: string) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ onNavigateToTransfer, onNavigateToDonation }) => {
  const [activeSubTab, setActiveSubTab] = useState<'list' | 'support'>('list');
  const [searchTerm, setSearchTerm] = useState('');
  const [isMessageSent, setIsMessageSent] = useState(false);
  
  const [beneficiaries, setBeneficiaries] = useState(MOCK_BENEFICIARIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [newContact, setNewContact] = useState({
    name: '',
    email: '',
    accountNumber: '',
    category: 'Amis'
  });

  const filteredBeneficiaries = beneficiaries.filter(b => 
    b.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsMessageSent(true);
    setTimeout(() => setIsMessageSent(false), 4000);
  };

  const handleAddBeneficiary = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setTimeout(() => {
      const id = `b${Date.now()}`;
      setBeneficiaries([{ id, ...newContact }, ...beneficiaries]);
      setIsAdding(false);
      setIsAddModalOpen(false);
      setNewContact({ name: '', email: '', accountNumber: '', category: 'Amis' });
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex bg-white p-1 rounded-2xl border border-slate-200 w-full max-w-md mx-auto shadow-sm">
        <button 
          onClick={() => setActiveSubTab('list')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
            activeSubTab === 'list' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <Users size={16} /> Mes Bénéficiaires
        </button>
        <button 
          onClick={() => setActiveSubTab('support')}
          className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${
            activeSubTab === 'support' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          <MessageSquare size={16} /> Support Client
        </button>
      </div>

      {activeSubTab === 'list' ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Rechercher un contact..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm text-slate-900 font-semibold"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
            >
              <UserPlus size={18} /> Nouveau Bénéficiaire
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBeneficiaries.map((contact) => (
              <div key={contact.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-md transition-all group relative overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="absolute top-4 right-4 text-slate-300 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-slate-600 transition-all">
                  <MoreVertical size={20} />
                </div>
                
                <div className="flex items-center gap-4 mb-6">
                  <UserAvatar name={contact.name} size="lg" />
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg leading-tight">{contact.name}</h4>
                    <span className="text-[10px] font-black uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">{contact.category}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-mono">
                    <CheckCircle2 size={14} className="shrink-0 text-emerald-500" />
                    <span>{contact.accountNumber.slice(0, 15)}...</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-50">
                  <button 
                    onClick={() => onNavigateToTransfer(contact.name, contact.accountNumber)}
                    className="flex items-center justify-center gap-2 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors"
                  >
                    <ArrowRightLeft size={14} /> Virement
                  </button>
                  <button 
                    onClick={() => onNavigateToDonation(contact.name)}
                    className="flex items-center justify-center gap-2 py-2 bg-rose-50 text-rose-700 rounded-xl text-xs font-bold hover:bg-rose-100 transition-colors"
                  >
                    <Heart size={14} /> Don
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm relative overflow-hidden">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Votre conseiller dédié</h4>
              <div className="flex items-center gap-4 mb-8">
                <UserAvatar name="Thomas Lefebvre" size="xl" className="!w-20 !h-20" />
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Thomas Lefebvre</h3>
                  <p className="text-sm text-slate-500">Expert Philanthropie</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Envoyer un message au support</h3>
            <form onSubmit={handleSupportSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Sujet de la demande</label>
                <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-900">
                  <option>Question sur mon compte</option>
                  <option>Problème technique (App/Web)</option>
                  <option>Dons et fiscalité</option>
                  <option>Autre demande</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest">Votre message</label>
                <textarea 
                  required
                  rows={5}
                  placeholder="Décrivez votre demande..."
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm resize-none text-slate-900 font-medium"
                ></textarea>
              </div>
              <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2">
                Envoyer <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      )}

      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => !isAdding && setIsAddModalOpen(false)} />
          <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-900 uppercase">Nouveau Bénéficiaire</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X size={24} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleAddBeneficiary} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase">Nom complet</label>
                <input 
                  required
                  type="text"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-900"
                  value={newContact.name}
                  onChange={e => setNewContact({...newContact, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase">Email (Optionnel)</label>
                <input 
                  type="email"
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-semibold text-slate-900"
                  value={newContact.email}
                  onChange={e => setNewContact({...newContact, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase">IBAN</label>
                <input 
                  required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-mono uppercase text-slate-900 font-bold"
                  value={newContact.accountNumber}
                  onChange={e => setNewContact({...newContact, accountNumber: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase">Catégorie</label>
                <select 
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-bold text-slate-900"
                  value={newContact.category}
                  onChange={e => setNewContact({...newContact, category: e.target.value})}
                >
                  <option>Amis</option>
                  <option>Famille</option>
                  <option>Donations</option>
                </select>
              </div>
              <button type="submit" disabled={isAdding} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">
                {isAdding ? <Loader2 size={18} className="animate-spin mx-auto" /> : "Enregistrer"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactPage;
