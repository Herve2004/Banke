
import React from 'react';
import { MOCK_TRANSACTIONS } from '../constants';
import { Search, Filter, Download } from 'lucide-react';

const TransactionHistory: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-slate-900"
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium">
            <Filter size={16} /> Filter
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors text-sm font-medium">
            <Download size={16} /> Export CSV
          </button>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Transaction ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Description</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-right">Amount</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-slate-400">#TXN-{tx.id.toUpperCase()}</td>
                <td className="px-6 py-4 text-sm text-slate-600">{tx.date}</td>
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-slate-800">{tx.recipientName}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">{tx.type}</div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{tx.category}</td>
                <td className={`px-6 py-4 text-right font-bold ${tx.type === 'DEPOSIT' ? 'text-green-600' : 'text-slate-900'}`}>
                  {tx.type === 'DEPOSIT' ? '+' : '-'}${tx.amount.toFixed(2)}
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {MOCK_TRANSACTIONS.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-slate-400">No transactions found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionHistory;
