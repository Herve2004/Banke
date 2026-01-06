
import React, { useState, useEffect } from 'react';
import { Terminal, Trash2, Download, Search, Filter } from 'lucide-react';

interface LogEntry {
  id: string;
  timestamp: string;
  source: string;
  event: string;
  level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'CRIT';
  details: string;
}

const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState<LogEntry[]>([
    { id: '1', timestamp: '2023-11-23 14:02:11', source: 'AUTH_NODE', event: 'LOGIN_SUCCESS', level: 'INFO', details: 'User admin@nexgen.com authenticated via SSL' },
    { id: '2', timestamp: '2023-11-23 14:05:45', source: 'DB_SYNC', event: 'REPLICA_STALE', level: 'WARN', details: 'Secondary database node reporting 12ms latency' },
    { id: '3', timestamp: '2023-11-23 14:10:02', source: 'TX_PROCESSOR', event: 'BLOCK_FINALIZED', level: 'INFO', details: 'Donation cluster #XJ92 finalized on main chain' },
    { id: '4', timestamp: '2023-11-23 14:12:30', source: 'SECURITY_CORE', event: 'GEO_REJECT', level: 'ERROR', details: 'Access denied from unauthorized region: [REDACTED]' },
  ]);

  const getLevelColor = (level: LogEntry['level']) => {
    switch (level) {
      case 'CRIT': return 'text-rose-500 bg-rose-500/10';
      case 'ERROR': return 'text-orange-500 bg-orange-500/10';
      case 'WARN': return 'text-amber-500 bg-amber-500/10';
      case 'DEBUG': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-emerald-500 bg-emerald-500/10';
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg flex flex-col h-[700px] overflow-hidden animate-in fade-in duration-500">
      <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-emerald-500" />
          <h3 className="text-xs font-black uppercase tracking-widest text-white">System Kernel Logs</h3>
        </div>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-slate-800 text-slate-500 transition-colors" title="Export Logs">
            <Download size={16} />
          </button>
          <button className="p-2 hover:bg-rose-500/20 text-rose-500 transition-colors" title="Clear Console">
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      <div className="p-4 bg-slate-950 border-b border-slate-800 grid grid-cols-4 gap-4">
        <div className="col-span-2 relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" />
          <input 
            type="text" 
            placeholder="Search kernel events..." 
            className="w-full bg-slate-900 border border-slate-800 rounded pl-9 pr-4 py-1.5 text-[10px] text-slate-400 outline-none focus:border-emerald-500/50"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-slate-600" />
          <select className="bg-slate-900 border border-slate-800 rounded px-2 py-1.5 text-[10px] text-slate-400 outline-none w-full">
            <option>All Levels</option>
            <option>Critical Only</option>
            <option>Errors Only</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto font-mono p-4 space-y-1.5 scrollbar-thin scrollbar-thumb-slate-800">
        {logs.map((log) => (
          <div key={log.id} className="group hover:bg-slate-800/50 rounded px-2 py-1 flex items-start gap-4 transition-colors">
            <span className="text-[10px] text-slate-600 shrink-0">[{log.timestamp}]</span>
            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded shrink-0 w-12 text-center ${getLevelColor(log.level)}`}>
              {log.level}
            </span>
            <span className="text-[10px] text-emerald-500/70 shrink-0 font-bold uppercase">{log.source}</span>
            <span className="text-[10px] text-slate-300">
              <span className="font-bold text-white mr-2">{log.event}:</span>
              {log.details}
            </span>
          </div>
        ))}
        <div className="pt-4 flex items-center gap-2 text-[10px] text-slate-600 animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Awaiting kernel push...
        </div>
      </div>

      <div className="p-2 bg-slate-950 border-t border-slate-800 flex justify-between text-[9px] font-bold text-slate-600">
        <span>MEM_USAGE: 42.1%</span>
        <span>UPTIME: 342:12:05</span>
        <span>CLIENT_ID: NEX_PROT_4.2</span>
      </div>
    </div>
  );
};

export default AdminLogs;
