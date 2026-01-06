
import React from 'react';
import { Users, Landmark, Activity, AlertTriangle, ShieldCheck, Ban, Cpu, Globe, Server } from 'lucide-react';
import { MOCK_USERS_LIST } from '../constants';

// Added interface for component props to resolve TypeScript assignment errors
interface AdminDashboardProps {
  usersCount?: number;
}

// Updated component to accept usersCount prop
const AdminDashboard: React.FC<AdminDashboardProps> = ({ usersCount }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Platform Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/5 -rotate-45 translate-x-8 -translate-y-8"></div>
          <div className="flex items-center justify-between mb-4">
            <Cpu size={20} className="text-emerald-500" />
            <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">LIVE</span>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Assets Management</p>
          <h3 className="text-3xl font-black text-white mt-1">$4,250,900.00</h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <Server size={20} className="text-blue-500" />
            <span className="text-[10px] text-blue-500 font-bold bg-blue-500/10 px-2 py-0.5 rounded">STABLE</span>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Node Traffic</p>
          <h3 className="text-3xl font-black text-white mt-1">1,248 TPS</h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <Globe size={20} className="text-purple-500" />
            <span className="text-[10px] text-purple-500 font-bold bg-purple-500/10 px-2 py-0.5 rounded">GLOBAL</span>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Connected Peers</p>
          {/* Display usersCount from props if provided, otherwise fallback to mock value */}
          <h3 className="text-3xl font-black text-white mt-1">{usersCount !== undefined ? usersCount.toLocaleString() : '8,402'}</h3>
        </div>

        <div className="bg-slate-900 p-6 rounded-lg border border-amber-500/30 shadow-2xl">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle size={20} className="text-amber-500" />
            <span className="text-[10px] text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded">PENDING</span>
          </div>
          <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Flagged Security</p>
          <h3 className="text-3xl font-black text-white mt-1">03</h3>
        </div>
      </div>

      {/* Audit & Management Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-800/30 flex justify-between items-center">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white">Registry: User Database</h3>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
              <div className="w-2 h-2 rounded-full bg-slate-700"></div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead>
                <tr className="bg-slate-950/50">
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest">ID / Identity</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-center">Protocol</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest">Balance</th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-widest text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {MOCK_USERS_LIST.map((user) => (
                  <tr key={user.id} className="hover:bg-emerald-500/5 transition-colors cursor-crosshair">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-[10px] font-black text-emerald-500">
                          {user.name[0]}
                        </div>
                        <div>
                          <div className="font-bold text-slate-200">{user.name}</div>
                          <div className="text-slate-600 text-[9px]">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                        user.status === 'Actif' ? 'text-emerald-400 border border-emerald-400/20' : 
                        'text-rose-400 border border-rose-400/20'
                      }`}>
                        {user.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 font-mono">
                      ${user.balance.toLocaleString()}.00
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-500 hover:text-white transition-colors">
                        [EDIT_ACL]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Real-time System Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-lg flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-slate-800/30">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Feed: Audit Logs
            </h3>
          </div>
          <div className="p-4 flex-1 space-y-4 overflow-y-auto max-h-[400px]">
            {[
              { time: '14:22:10', op: 'USR_VAL', msg: 'Sarah Wilson verification success', status: 'OK' },
              { time: '13:05:45', op: 'WARN', msg: 'Inbound $50k from FR...9012', status: 'NOTICE' },
              { time: '10:15:30', op: 'DB_SYNC', msg: 'Core database cluster backup', status: 'OK' },
              { time: '09:44:02', op: 'SEC_FAIL', msg: 'Failed login attempt: root_02', status: 'ALERT' },
              { time: '08:12:15', op: 'SYS_INIT', msg: 'Nexus Core version 4.2.0 deployed', status: 'OK' },
            ].map((log, i) => (
              <div key={i} className="text-[10px] border-l border-slate-800 pl-3 py-1">
                <div className="flex justify-between mb-1">
                  <span className="text-slate-600">[{log.time}]</span>
                  <span className={`${
                    log.status === 'ALERT' ? 'text-rose-500' : 
                    log.status === 'NOTICE' ? 'text-amber-500' : 'text-emerald-500'
                  } font-black`}>{log.status}</span>
                </div>
                <div className="text-slate-400 italic">
                  <span className="text-slate-200 not-italic font-bold">[{log.op}]</span> {log.msg}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
