
import React from 'react';
import { ADMIN_NAVIGATION } from '../constants';
import { Zap, LogOut, Terminal, Bell, Globe } from 'lucide-react';
import { User } from '../types';
import UserAvatar from './UserAvatar';

interface AdminLayoutProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  user: User;
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ activeTab, setActiveTab, onLogout, user, children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-300 font-mono">
      <aside className="fixed left-0 top-0 h-full w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-30">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-900/50">
          <div className="bg-emerald-500 p-2 rounded-lg text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Zap size={20} fill="currentColor" />
          </div>
          <span className="text-sm font-black text-white tracking-widest hidden lg:block uppercase">Nexus Core</span>
        </div>

        <nav className="flex-1 px-3 mt-6 space-y-2">
          {ADMIN_NAVIGATION.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-3 rounded-lg transition-all duration-150 ${
                activeTab === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-slate-500 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {item.icon}
              <span className="font-bold text-xs uppercase tracking-tight hidden lg:block">{item.name}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800 space-y-4">
          <button 
            onClick={() => setActiveTab('dashboard')} 
            className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-2 text-xs font-bold text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
          >
            <Globe size={16} />
            <span className="hidden lg:block uppercase">Interface Client</span>
          </button>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center lg:justify-start gap-3 px-4 py-2 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span className="hidden lg:block uppercase">Déconnexion</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-20 lg:ml-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20 px-8 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-slate-800 rounded border border-slate-700">
              <Terminal size={14} className="text-emerald-500" />
              <span className="text-[10px] font-bold text-slate-400">STATUS: SYSTEM_OPTIMAL</span>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <Bell size={18} className="text-slate-400 cursor-pointer hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
              <div className="text-right">
                <p className="text-[10px] font-black text-white uppercase tracking-tighter">{user.name}</p>
                <p className="text-[9px] text-emerald-500 font-bold">Encrypted Session</p>
              </div>
              <UserAvatar name={user.name} src={user.avatar} size="sm" className="!rounded-md" />
            </div>
          </div>
        </header>

        <div className="p-8 flex-1">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
