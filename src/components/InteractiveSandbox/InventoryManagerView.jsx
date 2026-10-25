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
      isDark ? 'bg-[#07070D] border-white/10 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      
      {/* Header Bar */}
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b gap-4 ${
        isDark ? 'border-white/10' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Boxes className="w-5 h-5 text-[#FFE600]" />
              PulseStock Multi-Warehouse Hub
            </h3>
            <span className="bg-[#FFE600]/10 text-[#FFE600] text-xs px-2.5 py-0.5 rounded-full font-black border border-[#FFE600]/30 shadow-[0_0_8px_rgba(255,230,0,0.2)]">
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
            className={`border text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none focus:border-[#FF007F] ${
              isDark ? 'bg-[#0B0B14] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
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
        <div className="bg-[#FF007F]/15 border border-[#FF007F]/40 text-[#FF007F] text-xs font-bold px-4 py-3 rounded-xl flex items-center gap-2 shadow-lg shadow-[#FF007F]/20">
          <Sparkles className="w-4 h-4 text-[#FFE600]" />
          <span>{reconcileMessage}</span>
        </div>
      )}

      {/* PO Reconciliation Card Banner */}
      <div className={`p-4 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
        isDark ? 'bg-[#0B0B14] border-white/10 hover:border-[#FF007F]/30 transition-all' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF007F]/15 text-[#FF007F] flex items-center justify-center border border-[#FF007F]/30">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <div className={`text-xs font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span>Pending Purchase Order: #PO-8821 (Vendor: ITC Limited)</span>
              <span className="text-[10px] bg-[#FFE600]/15 text-[#FFE600] px-2 py-0.5 rounded font-black border border-[#FFE600]/30">
                ⚡ 100 Units Atta Arrived
              </span>
            </div>
            <p className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Click reconcile to verify invoice quantity against physical stock arrival.</p>
          </div>
        </div>

        <button
          onClick={handleReconcilePO}
          disabled={poReconciled}
          className={`px-4 py-2.5 rounded-xl font-black text-xs transition-all flex items-center gap-2 shadow-lg cursor-pointer active:scale-95 ${
            poReconciled
              ? 'bg-[#121220] text-slate-500 border border-white/5 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#FFE600] via-[#FCEE0A] to-[#FFB703] hover:from-[#FFF01F] hover:to-[#FFE600] text-slate-950 shadow-[#FFE600]/30'
          }`}
        >
          <Check className="w-4 h-4 text-slate-950" />
          <span>{poReconciled ? 'PO Reconciled & Stock Updated' : '📦 Reconcile PO #PO-8821 to Stock'}</span>
        </button>
      </div>

      {/* Stock Items Table */}
      <div className={`overflow-x-auto rounded-xl border ${isDark ? 'border-white/10 bg-[#080812]' : 'border-slate-200 bg-white'}`}>
        <table className="min-w-[700px] sm:min-w-full w-full text-left text-xs">
          <thead className={`uppercase text-[10px] ${isDark ? 'bg-[#040408] text-slate-400' : 'bg-slate-200 text-slate-600'}`}>
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
          <tbody className={`divide-y ${isDark ? 'divide-white/5 text-slate-300' : 'divide-slate-200 text-slate-700'}`}>
            {filteredItems.map(item => (
              <tr key={item.id} className={isDark ? 'hover:bg-[#0D0D1A]' : 'hover:bg-slate-50'}>
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
                    <span className="inline-flex items-center gap-1 bg-[#FF007F]/20 text-[#FF007F] px-2.5 py-1 rounded-full text-[10px] font-black border border-[#FF007F]/40 shadow-[0_0_8px_rgba(255,0,127,0.3)]">
                      <AlertTriangle className="w-3 h-3" /> LOW STOCK ALERT
                    </span>
                  )}
                  {item.status === 'EXPIRING_SOON' && (
                    <span className="inline-flex items-center gap-1 bg-[#FFE600]/15 text-[#FFE600] px-2.5 py-1 rounded-full text-[10px] font-black border border-[#FFE600]/40 shadow-[0_0_8px_rgba(255,230,0,0.2)]">
                      <Clock className="w-3 h-3" /> EXPIRING SOON
                    </span>
                  )}
                  {item.status === 'NORMAL' && (
                    <span className="inline-flex items-center gap-1 bg-white/5 text-slate-200 px-2.5 py-1 rounded-full text-[10px] font-bold border border-white/10">
                      <CheckCircle2 className="w-3 h-3 text-[#FFE600]" /> IN STOCK
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
