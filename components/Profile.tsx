
import React, { useState } from 'react';
import { User as UserType } from '../types';
import { Shield, Bell, CreditCard, Lock, Eye, EyeOff, Edit2, Check, X, LogOut, User, Mail, Camera, Trash2 } from 'lucide-react';
import UserAvatar from './UserAvatar';

interface ProfileProps {
  user: UserType;
  onUpdateUser: (data: Partial<UserType>) => void;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    avatar: user.avatar
  });
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success'>('idle');

  const handleSave = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      onUpdateUser(formData);
      setSaveStatus('success');
      setTimeout(() => {
        setIsEditing(false);
        setSaveStatus('idle');
      }, 1500);
    }, 800);
  };

  const removePhoto = () => {
    setFormData({ ...formData, avatar: '' });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header Profil avec Edition */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
          {!isEditing ? (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm hover:bg-indigo-100 transition-colors"
            >
              <Edit2 size={16} /> Modifier les infos
            </button>
          ) : (
            <div className="flex gap-2">
              <button 
                onClick={() => setIsEditing(false)}
                className="p-2 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
              <button 
                onClick={handleSave}
                disabled={saveStatus === 'saving'}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {saveStatus === 'saving' ? '...' : saveStatus === 'success' ? <Check size={18} /> : 'Enregistrer'}
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <UserAvatar 
              name={formData.name} 
              src={formData.avatar} 
              size="xl" 
              className="transition-all duration-300" 
            />
            
            {isEditing && (
              <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  onClick={() => {/* Simulation upload */}}
                  className="p-2 bg-white text-indigo-600 rounded-full hover:scale-110 transition-transform"
                  title="Changer la photo"
                >
                  <Camera size={20} />
                </button>
                {formData.avatar && (
                  <button 
                    onClick={removePhoto}
                    className="p-2 bg-rose-500 text-white rounded-full hover:scale-110 transition-transform"
                    title="Utiliser l'initiale"
                  >
                    <Trash2 size={20} />
                  </button>
                )}
              </div>
            )}
            
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 border-4 border-white rounded-full shadow-sm"></div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            {isEditing ? (
              <div className="space-y-3 max-w-sm mx-auto md:mx-0">
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 font-bold"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input 
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-slate-900 text-sm"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>
            ) : (
              <>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">{user.name}</h2>
                <p className="text-slate-500 font-medium">{user.email}</p>
              </>
            )}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 pt-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-indigo-100">Premium Member</span>
              <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest rounded-full border border-slate-100">Level 4 Contributor</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Settings */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-3">
                <Shield className="text-slate-400" size={20} />
                <span className="text-sm font-medium text-slate-700">Two-Factor Auth</span>
              </div>
              <div className="w-10 h-5 bg-indigo-600 rounded-full relative cursor-pointer">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              onClick={onLogout}
              className="w-full flex items-center justify-center gap-3 py-4 bg-rose-50 text-rose-600 rounded-2xl font-bold hover:bg-rose-100 transition-all active:scale-[0.98]"
            >
              <LogOut size={20} />
              Déconnexion du compte
            </button>
          </div>
        </div>

        {/* Bank Info */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900">Bank Information</h3>
          <div className="p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white space-y-6 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16 group-hover:scale-110 transition-transform"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center border border-white/10">
                <CreditCard size={24} />
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">NexGen Titanium</p>
                <p className="text-xs font-bold text-indigo-400">Debit Card</p>
              </div>
            </div>

            <div className="relative z-10">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1 text-white/50">Account Number</p>
              <div className="flex items-center gap-3">
                <p className="font-mono text-xl tracking-wider">{user.accountNumber.replace(/(.{4})/g, '$1 ')}</p>
                <button className="p-1 hover:bg-white/10 rounded">
                  <Eye size={16} className="text-white/30" />
                </button>
              </div>
            </div>

            <div className="flex justify-between items-end relative z-10">
              <div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1 text-white/50">Card Holder</p>
                <p className="text-sm font-bold uppercase tracking-tight">{user.name}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1 text-white/50">Validity</p>
                <p className="text-sm font-bold">12 / 28</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
