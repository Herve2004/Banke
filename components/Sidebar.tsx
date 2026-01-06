
import React from 'react';
import { USER_NAVIGATION } from '../constants';
import { ShieldCheck, LogOut, Terminal } from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, user }) => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col z-30">
      <div className="p-6 flex items-center gap-2">
        <div className="bg-indigo-600 p-2 rounded-lg text-white">
          <ShieldCheck size={24} />
        </div>
        <span className="text-xl font-bold text-slate-900 tracking-tight">NexGen Bank</span>
      </div>

      <nav className="flex-1 px-4 mt-4 space-y-1">
        {USER_NAVIGATION.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === item.id 
                ? 'bg-indigo-50 text-indigo-700' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
              {item.icon}
            </span>
            <span className="font-medium">{item.name}</span>
          </button>
        ))}

        {user.role === 'ADMIN' && (
          <div className="pt-6 mt-6 border-t border-slate-100">
            <p className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Zone Réservée</p>
            <button
              onClick={() => setActiveTab('admin-dashboard')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-200"
            >
              <Terminal size={20} className="text-emerald-400" />
              <span className="font-bold text-sm">Administration</span>
            </button>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
        >
          <LogOut size={20} />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
