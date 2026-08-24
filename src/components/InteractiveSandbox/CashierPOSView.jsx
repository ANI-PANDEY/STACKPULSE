import React, { useState } from 'react';
import { 
  Barcode, 
  Plus, 
  Minus, 
  Trash2, 
  Receipt, 
  MessageSquare, 
  Search, 
  Printer, 
  Sparkles,
  ShoppingBag,
  CheckCircle2
} from 'lucide-react';

const MOCK_CATALOG = [
  { id: 'p1', name: 'Tata Tea Gold Premium 500g', code: '8901058852101', price: 340, gst: 18, category: 'FMCG', stock: 120, badgeColor: 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10' },
  { id: 'p2', name: 'Fortune Sunlite Oil 1 Litre', code: '8906007281012', price: 165, gst: 5, category: 'Groceries', stock: 85, badgeColor: 'border-amber-500/40 text-amber-500 bg-amber-500/10' },
  { id: 'p3', name: 'Amul Butter Pasteurized 500g', code: '8901262010052', price: 275, gst: 12, category: 'Dairy', stock: 42, badgeColor: 'border-cyan-500/40 text-cyan-500 bg-cyan-500/10' },
  { id: 'p4', name: 'Cadbury Silk Roasted Almond 143g', code: '8901233020084', price: 190, gst: 18, category: 'Confectionery', stock: 210, badgeColor: 'border-purple-500/40 text-purple-500 bg-purple-500/10' },
  { id: 'p5', name: 'Surf Excel Easy Wash 1kg', code: '8901030610022', price: 145, gst: 18, category: 'FMCG', stock: 64, badgeColor: 'border-emerald-500/40 text-emerald-500 bg-emerald-500/10' },
  { id: 'p6', name: 'Ashirvaad Whole Wheat Atta 5kg', code: '8901058861219', price: 260, gst: 5, category: 'Groceries', stock: 18, badgeColor: 'border-amber-500/40 text-amber-500 bg-amber-500/10' }
];

export default function CashierPOSView({ theme, onOpenWhatsAppModal }) {
  const [cart, setCart] = useState([
    { ...MOCK_CATALOG[0], quantity: 2 },
    { ...MOCK_CATALOG[1], quantity: 1 }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [scannedFeedback, setScannedFeedback] = useState(null);
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [customerPhone, setCustomerPhone] = useState('9876543210');
  const [customerName, setCustomerName] = useState('Sharma General Store');
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [lastInvoice, setLastInvoice] = useState(null);
  const [isScanning, setIsScanning] = useState(false);

  const isDark = theme === 'dark';

  // Barcode Scanner Simulator
  const handleSimulateBarcodeScan = () => {
    setIsScanning(true);
    
    setTimeout(() => {
      setIsScanning(false);
      const randomProduct = MOCK_CATALOG[Math.floor(Math.random() * MOCK_CATALOG.length)];
      
      setCart(prev => {
        const existing = prev.find(item => item.id === randomProduct.id);
        if (existing) {
          return prev.map(item => item.id === randomProduct.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
        return [...prev, { ...randomProduct, quantity: 1 }];
      });

      setScannedFeedback(`Scanned Barcode: ${randomProduct.name} (${randomProduct.code})`);
      setTimeout(() => setScannedFeedback(null), 3500);
    }, 400);
  };

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalGst = cart.reduce((acc, item) => acc + ((item.price * item.quantity * item.gst) / 100), 0);
  const grandTotal = Math.round(subtotal + totalGst);

  const filteredCatalog = MOCK_CATALOG.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.code.includes(searchTerm)
  );

  const handleGenerateInvoice = () => {
    if (cart.length === 0) return;
    const invNumber = 'INV-2026-' + Math.floor(1000 + Math.random() * 9000);
    const invoiceData = {
      invNumber,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      customerName,
      customerPhone,
      items: cart,
      subtotal,
      cgst: totalGst / 2,
      sgst: totalGst / 2,
      grandTotal,
      paymentMode
    };
    setLastInvoice(invoiceData);
    setInvoiceModalOpen(true);
  };

  return (
    <div className={`p-4 sm:p-6 rounded-2xl border relative overflow-hidden transition-colors ${
      isDark ? 'bg-[#0B0F17] border-slate-800 text-slate-200' : 'bg-slate-50 border-slate-200 text-slate-800'
    }`}>
      
      {/* Laser Scanning Animation Overlay */}
      {isScanning && (
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent z-40 animate-scan-laser shadow-lg shadow-rose-500/80" />
      )}

      {/* Header bar inside Cashier POS */}
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between pb-4 mb-6 border-b gap-4 ${
        isDark ? 'border-slate-800' : 'border-slate-200'
      }`}>
        <div>
          <div className="flex items-center gap-2">
            <h3 className={`text-xl font-black flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <Receipt className="w-5 h-5 text-emerald-500" />
              PulseBill POS Counter #1
            </h3>
            <span className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs px-3 py-0.5 rounded-full font-extrabold border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              FAST BILLING ACTIVE
            </span>
          </div>
          <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
            Plug & Play Barcode Gun Ready • Automatic CGST + SGST • WhatsApp Cloud Delivery
          </p>
        </div>

        {/* Barcode Scanner Simulator Action Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleSimulateBarcodeScan}
            disabled={isScanning}
            className="w-full md:w-auto px-5 py-3 rounded-xl font-extrabold text-xs bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 border border-indigo-400/30 active:scale-95 cursor-pointer"
          >
            <Barcode className="w-4 h-4 text-indigo-200 animate-pulse" />
            <span>{isScanning ? 'Scanning Barcode...' : '📷 Scan Barcode Gun Demo'}</span>
          </button>
        </div>
      </div>

      {/* Barcode feedback alert */}
      {scannedFeedback && (
        <div className="mb-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg">
          <Sparkles className="w-4 h-4 text-emerald-500" />
          <span>{scannedFeedback}</span>
        </div>
      )}

      {/* 2 Column Grid POS Layout: Left 7 Cols, Right 5 Cols */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Product Search & Quick Catalog Grid (7 Columns) */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Search bar */}
          <div className="relative">
            <Search className={`w-4 h-4 absolute left-3.5 top-3 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search by item name or barcode (e.g. 8901058852101)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full border focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs placeholder-slate-400 focus:outline-none transition-colors ${
                isDark ? 'bg-slate-900 border-slate-700 text-white' : 'bg-white border-slate-300 text-slate-900 shadow-sm'
              }`}
            />
          </div>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto pr-1">
            {filteredCatalog.map(product => (
              <div 
                key={product.id}
                onClick={() => handleAddToCart(product)}
                className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between group shadow-sm ${
                  isDark ? 'bg-slate-900/90 hover:bg-slate-800/90 border-slate-800 hover:border-emerald-500/50' : 'bg-white hover:bg-slate-100/90 border-slate-200 hover:border-emerald-500/50 shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] mb-1.5">
                    <span className={`px-2 py-0.5 rounded-md border text-[9px] font-bold ${product.badgeColor}`}>
                      {product.category}
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-mono font-bold">GST {product.gst}%</span>
                  </div>
                  <h4 className={`text-xs font-bold line-clamp-2 mb-2 transition-colors ${
                    isDark ? 'text-white group-hover:text-emerald-400' : 'text-slate-900 group-hover:text-emerald-600'
                  }`}>
                    {product.name}
                  </h4>
                </div>

                <div>
                  <div className={`text-[10px] font-mono mb-1.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    Code: {product.code}
                  </div>
                  <div className={`flex items-center justify-between pt-1 border-t ${isDark ? 'border-slate-800/60' : 'border-slate-200'}`}>
                    <span className={`text-sm font-black font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>₹{product.price}</span>
                    <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <Plus className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Live Cart & Bill Generator (5 Columns) */}
        <div className={`lg:col-span-5 p-4.5 rounded-2xl border flex flex-col justify-between shadow-xl ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          
          <div>
            <div className={`flex items-center justify-between pb-3 mb-3 border-b ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
              <span className={`text-xs font-extrabold flex items-center gap-1.5 ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                <ShoppingBag className="w-4 h-4 text-emerald-500" />
                Current Cart Items ({cart.length})
              </span>
              {cart.length > 0 && (
                <button 
                  onClick={() => setCart([])} 
                  className="text-[11px] text-rose-500 hover:underline font-semibold"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-2 max-h-[190px] overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className={`text-center py-8 text-xs ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
                  Cart is empty. Click any item or scan barcode demo above!
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className={`flex items-center justify-between p-2.5 rounded-xl border text-xs gap-2 ${
                    isDark ? 'bg-slate-950/70 border-slate-800/80' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex-1 min-w-0 pr-1">
                      <div className={`font-bold truncate ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>{item.name}</div>
                      <div className={`text-[10px] font-mono ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        ₹{item.price} × {item.quantity} | GST {item.gst}%
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 shrink-0">
                      <div className={`flex items-center border rounded-lg ${isDark ? 'border-slate-700 bg-slate-900' : 'border-slate-300 bg-white'}`}>
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-rose-500 cursor-pointer">
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className={`px-2 text-xs font-bold font-mono-nums ${isDark ? 'text-white' : 'text-slate-900'}`}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-emerald-500 cursor-pointer">
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button onClick={() => removeItem(item.id)} className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Customer info & Payment modes */}
          <div className={`mt-4 pt-4 border-t space-y-3 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Customer Name</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className={`w-full border rounded-lg px-2.5 py-1.5 text-xs ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
              <div>
                <label className={`text-[10px] font-bold ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>WhatsApp / Phone</label>
                <input 
                  type="text" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className={`w-full border rounded-lg px-2.5 py-1.5 text-xs font-mono ${
                    isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>
            </div>

            {/* Payment Mode Selector */}
            <div>
              <label className={`text-[10px] font-bold mb-1 block ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Payment Method</label>
              <div className="grid grid-cols-3 gap-2">
                {['UPI', 'Cash', 'Credit Khata'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setPaymentMode(mode)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      paymentMode === mode 
                        ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/50' 
                        : isDark 
                          ? 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white' 
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            {/* Summary Totals */}
            <div className={`p-3 rounded-xl border space-y-1.5 text-xs ${
              isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Subtotal:</span>
                <span className="font-mono-nums">₹{subtotal}</span>
              </div>
              <div className={`flex justify-between ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                <span>Tax Breakdown (CGST+SGST):</span>
                <span className="font-mono-nums text-emerald-600 dark:text-emerald-400 font-semibold">+₹{totalGst.toFixed(2)}</span>
              </div>
              <div className={`flex justify-between text-sm font-black pt-1.5 border-t ${
                isDark ? 'text-white border-slate-800' : 'text-slate-900 border-slate-200'
              }`}>
                <span>Grand Total:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-mono-nums text-base">₹{grandTotal}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <button
              disabled={cart.length === 0}
              onClick={handleGenerateInvoice}
              className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-xl ${
                cart.length > 0 
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 hover:from-emerald-300 hover:to-teal-300 text-slate-950 shadow-emerald-500/25 cursor-pointer active:scale-98' 
                  : 'bg-slate-300 dark:bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>Generate GST Invoice & Print</span>
            </button>

          </div>

        </div>

      </div>

      {/* Invoice Modal Preview */}
      {invoiceModalOpen && lastInvoice && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`border rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative ${
            isDark ? 'bg-[#0D131F] border-slate-700' : 'bg-white border-slate-200'
          }`}>
            
            <div className="text-center pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 border border-emerald-500/40">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className={`text-xl font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>GST Invoice Generated!</h3>
              <p className="text-xs text-slate-400 mt-1 font-mono">{lastInvoice.invNumber} • {lastInvoice.date}</p>
            </div>

            <div className={`my-4 p-4 rounded-2xl border space-y-2 text-xs ${
              isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex justify-between">
                <span className="text-slate-500">Billed To:</span>
                <span className="font-bold">{lastInvoice.customerName} ({lastInvoice.customerPhone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment Mode:</span>
                <span className="font-bold text-emerald-500">{lastInvoice.paymentMode}</span>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-1">
                {lastInvoice.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{item.name} × {item.quantity}</span>
                    <span className="font-mono-nums">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between font-bold">
                <span>Grand Total (Incl. GST):</span>
                <span className="text-emerald-500 font-mono-nums text-base">₹{lastInvoice.grandTotal}</span>
              </div>
            </div>

            {/* Modal CTAs */}
            <div className="space-y-3">
              <button
                onClick={() => {
                  setInvoiceModalOpen(false);
                  onOpenWhatsAppModal(lastInvoice);
                }}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-slate-950" />
                <span>📱 Auto-Send Invoice via WhatsApp Cloud API</span>
              </button>

              <button
                onClick={() => setInvoiceModalOpen(false)}
                className={`w-full py-2.5 font-semibold text-xs rounded-xl cursor-pointer ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                }`}
              >
                Close & Next Order
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
