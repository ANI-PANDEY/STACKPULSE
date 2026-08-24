import React, { useState } from 'react';
import { 
  Boxes, 
  AlertTriangle, 
  Building2, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Check, 
  Sparkles
} from 'lucide-react';

const INITIAL_INVENTORY = [
  { id: 'i1', name: 'Tata Tea Gold Premium 500g', sku: 'SKU-TEA-500', batch: 'BT-2026-901', expiry: 'Nov 2027', warehouse: 'Mumbai Main Hub', stock: 120, minStock: 25, status: 'NORMAL' },
  { id: 'i2', name: 'Ashirvaad Whole Wheat Atta 5kg', sku: 'SKU-ATT-5KG', batch: 'BT-2026-441', expiry: 'Oct 2026', warehouse: 'Mumbai Main Hub', stock: 12, minStock: 30, status: 'LOW_STOCK' },
  { id: 'i3', name: 'Fortune Sunlite Oil 1 Litre', sku: 'SKU-OIL-1L', batch: 'BT-2026-102', expiry: 'Jan 2027', warehouse: 'Delhi North Depot', stock: 85, minStock: 20, status: 'NORMAL' },
  { id: 'i4', name: 'Amul Butter Pasteurized 500g', sku: 'SKU-BUT-500', batch: 'BT-2026-880', expiry: 'Sep 2026', warehouse: 'Mumbai Main Hub', stock: 8, minStock: 15, status: 'EXPIRING_SOON' },
  { id: 'i5', name: 'Cadbury Silk Roasted Almond 143g', sku: 'SKU-CAD-143', batch: 'BT-2026-309', expiry: 'Dec 2027', warehouse: 'Bangalore Depot', stock: 210, minStock: 40, status: 'NORMAL' }
];

export default function InventoryManagerView({ theme }) {
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [selectedWarehouse, setSelectedWarehouse] = useState('ALL');
  const [poReconciled, setPoReconciled] = useState(false);
  const [reconcileMessage, setReconcileMessage] = useState('');
  const isDark = theme === 'dark';

  const handleReconcilePO = () => {
    setInventory(prev => prev.map(item => {
      if (item.id === 'i2') {
        return { ...item, stock: item.stock + 100, status: 'NORMAL' };
      }
      return item;
    }));
    setPoReconciled(true);
    setReconcileMessage('Purchase Order #PO-8821 (100 units Atta 5kg) reconciled & added to Mumbai Hub stock!');
    setTimeout(() => setReconcileMessage(''), 5000);
  };

  const filteredItems = inventory.filter(item => 
    selectedWarehouse === 'ALL' || item.warehouse === selectedWarehouse
  );

  return (
    <div className={`p-4 sm:p-6 rounded-2xl border space-y-6 transition-colors ${
      isDark ? 'bg-[#0B0F17] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      
      {/* Header Bar */}
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b gap-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Boxes className="w-5 h-5 text-cyan-500" />
              PulseStock Multi-Warehouse Hub
            </h3>
            <span className="bg-cyan-500/20 text-cyan-500 text-xs px-2.5 py-0.5 rounded-full font-bold border border-cyan-500/30">
              BATCH & EXPIRY TRACKED
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Real-time Stock Decrement • Low Stock Alerts • Purchase Order Reconciliation
          </p>
        </div>

        {/* Warehouse Selector */}
        <div className="flex items-center gap-2">
          <Building2 className={`w-4 h-4 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
          <select
            value={selectedWarehouse}
            onChange={(e) => setSelectedWarehouse(e.target.value)}
            className={`border text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-cyan-500 ${
              isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            <option value="ALL">All Warehouses (3 Hubs)</option>
            <option value="Mumbai Main Hub">Mumbai Main Hub</option>
            <option value="Delhi North Depot">Delhi North Depot</option>
            <option value="Bangalore Depot">Bangalore Depot</option>
          </select>
        </div>
      </div>

      {reconcileMessage && (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 text-xs font-semibold px-4 py-3 rounded-xl flex items-center gap-2 animate-pulse">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>{reconcileMessage}</span>
        </div>
      )}

      {/* PO Reconciliation Card Banner */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-500 flex items-center justify-center border border-cyan-500/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-xs font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span>Pending Purchase Order: #PO-8821 (Vendor: ITC Limited)</span>
              <span className="text-[10px] bg-amber-500/20 text-amber-600 dark:text-amber-300 px-2 py-0.5 rounded font-bold">100 Units Atta Arrived</span>
            </div>
            <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Click reconcile to verify invoice quantity against physical stock arrival.</p>
          </div>
        </div>

        <button
          onClick={handleReconcilePO}
          disabled={poReconciled}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-lg ${
            poReconciled
              ? 'bg-slate-200 dark:bg-slate-800 text-slate-500 border border-slate-300 dark:border-slate-700 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 shadow-cyan-500/20'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>{poReconciled ? 'PO Reconciled & Stock Updated' : '📦 Reconcile PO #PO-8821 to Stock'}</span>
        </button>
      </div>

      {/* Stock Items Table */}
      <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200 bg-white'}`}>
        <table className="w-full text-left text-xs">
          <thead className={`uppercase text-[10px] ${isDark ? 'bg-slate-950 text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
            <tr>
              <th className="p-3">Product Name & SKU</th>
              <th className="p-3">Warehouse Location</th>
              <th className="p-3">Batch Number</th>
              <th className="p-3">Expiry Date</th>
              <th className="p-3">Available Stock</th>
              <th className="p-3">Min. Stock Alert Limit</th>
              <th className="p-3">Stock Status</th>
            </tr>
          </thead>
          <tbody className={`divide-y ${isDark ? 'divide-slate-800 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
            {filteredItems.map(item => (
              <tr key={item.id} className={isDark ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}>
                <td className="p-3">
                  <div className={`font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.name}</div>
                  <div className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{item.sku}</div>
                </td>
                <td className="p-3 font-medium">{item.warehouse}</td>
                <td className="p-3 font-mono">{item.batch}</td>
                <td className="p-3 font-mono">{item.expiry}</td>
                <td className={`p-3 font-black font-mono-nums text-sm ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  {item.stock} <span className="text-[10px] font-normal text-slate-400">units</span>
                </td>
                <td className="p-3 font-mono text-slate-400">{item.minStock} units</td>
                <td className="p-3">
                  {item.status === 'LOW_STOCK' && (
                    <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-500 px-2.5 py-1 rounded-full text-[10px] font-bold border border-rose-500/30">
                      <AlertTriangle className="w-3 h-3" /> LOW STOCK ALERT
                    </span>
                  )}
                  {item.status === 'EXPIRING_SOON' && (
                    <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-500 px-2.5 py-1 rounded-full text-[10px] font-bold border border-amber-500/30">
                      <Clock className="w-3 h-3" /> EXPIRING SOON
                    </span>
                  )}
                  {item.status === 'NORMAL' && (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-500 px-2.5 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30">
                      <CheckCircle2 className="w-3 h-3" /> IN STOCK
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
