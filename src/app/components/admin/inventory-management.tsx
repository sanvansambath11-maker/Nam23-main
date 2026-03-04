import { useState } from "react";
import { useTranslation } from "../translation-context";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  AlertTriangle,
  Package,
  TrendingDown,
  Check,
  X,
  Truck,
} from "lucide-react";
import { toast } from "sonner";

interface InventoryItem {
  id: number;
  name: string;
  nameKm: string;
  unit: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  costPerUnit: number;
  supplier: string;
  lastRestocked: string;
  category: string;
}

const initialInventory: InventoryItem[] = [
  { id: 1, name: "Beef", nameKm: "សាច់គោ", unit: "kg", currentStock: 15, minStock: 5, maxStock: 50, costPerUnit: 8.0, supplier: "Phnom Penh Meats", lastRestocked: "2026-03-01", category: "meat" },
  { id: 2, name: "Rice", nameKm: "អង្ករ", unit: "kg", currentStock: 80, minStock: 20, maxStock: 200, costPerUnit: 1.2, supplier: "Battambang Rice Co", lastRestocked: "2026-02-28", category: "grain" },
  { id: 3, name: "Fish (Freshwater)", nameKm: "ត្រីទឹកសាប", unit: "kg", currentStock: 8, minStock: 5, maxStock: 30, costPerUnit: 5.5, supplier: "Tonle Sap Fish", lastRestocked: "2026-03-02", category: "seafood" },
  { id: 4, name: "Coconut Milk", nameKm: "ទឹកដូង", unit: "liter", currentStock: 12, minStock: 5, maxStock: 40, costPerUnit: 2.0, supplier: "Local Market", lastRestocked: "2026-03-01", category: "liquid" },
  { id: 5, name: "Rice Noodles", nameKm: "គុយទាវ", unit: "kg", currentStock: 3, minStock: 5, maxStock: 25, costPerUnit: 1.8, supplier: "Noodle Factory PP", lastRestocked: "2026-02-25", category: "grain" },
  { id: 6, name: "Sugarcane", nameKm: "អំពើ", unit: "kg", currentStock: 25, minStock: 10, maxStock: 60, costPerUnit: 0.8, supplier: "Local Farm", lastRestocked: "2026-03-02", category: "produce" },
  { id: 7, name: "Pork", nameKm: "សាច់ជ្រូក", unit: "kg", currentStock: 2, minStock: 5, maxStock: 40, costPerUnit: 6.0, supplier: "Phnom Penh Meats", lastRestocked: "2026-02-27", category: "meat" },
  { id: 8, name: "Vegetables (Mixed)", nameKm: "បន្លែចម្រុះ", unit: "kg", currentStock: 18, minStock: 8, maxStock: 50, costPerUnit: 2.5, supplier: "Local Market", lastRestocked: "2026-03-03", category: "produce" },
  { id: 9, name: "Cooking Oil", nameKm: "ប្រេងឆា", unit: "liter", currentStock: 10, minStock: 5, maxStock: 30, costPerUnit: 3.0, supplier: "Import Wholesale", lastRestocked: "2026-02-28", category: "liquid" },
  { id: 10, name: "Orange Juice Concentrate", nameKm: "ទឹកក្រូចថ្លុង", unit: "liter", currentStock: 6, minStock: 3, maxStock: 20, costPerUnit: 4.0, supplier: "Beverage Supply KH", lastRestocked: "2026-03-01", category: "liquid" },
];

interface Supplier {
  id: number;
  name: string;
  phone: string;
  email: string;
  items: string;
}

const suppliers: Supplier[] = [
  { id: 1, name: "Phnom Penh Meats", phone: "012 555 111", email: "ppmeats@email.kh", items: "Beef, Pork" },
  { id: 2, name: "Battambang Rice Co", phone: "012 555 222", email: "bbrice@email.kh", items: "Rice" },
  { id: 3, name: "Tonle Sap Fish", phone: "012 555 333", email: "tsfish@email.kh", items: "Freshwater Fish" },
  { id: 4, name: "Local Market", phone: "012 555 444", email: "", items: "Vegetables, Coconut Milk" },
  { id: 5, name: "Noodle Factory PP", phone: "012 555 555", email: "noodle@email.kh", items: "Rice Noodles" },
];

let nextId = 20;

export function InventoryManagement() {
  const { lang, fontClass } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [items, setItems] = useState<InventoryItem[]>(initialInventory);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<InventoryItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<"stock" | "suppliers">("stock");

  const lowStockItems = items.filter((i) => i.currentStock <= i.minStock);
  const totalValue = items.reduce((s, i) => s + i.currentStock * i.costPerUnit, 0);

  const categories = ["all", ...new Set(items.map((i) => i.category))];
  const filtered = items.filter((i) => {
    const matchSearch = !search || i.name.toLowerCase().includes(search.toLowerCase()) || i.nameKm.includes(search);
    const matchCat = filterCat === "all" || i.category === filterCat;
    return matchSearch && matchCat;
  });

  const handleSave = (data: InventoryItem) => {
    if (editItem) {
      setItems((p) => p.map((i) => (i.id === data.id ? data : i)));
      toast.success(l("Item updated", "បានកែប្រែ"));
    } else {
      setItems((p) => [...p, { ...data, id: nextId++ }]);
      toast.success(l("Item added", "បានបន្ថែម"));
    }
    setShowModal(false);
    setEditItem(null);
  };

  const handleRestock = (id: number) => {
    setItems((p) => p.map((i) => (i.id === id ? { ...i, currentStock: i.maxStock, lastRestocked: new Date().toISOString().split("T")[0] } : i)));
    toast.success(l("Restocked to max", "បានបញ្ចូលស្តុក"));
  };

  return (
    <div className={`p-6 ${fontClass}`}>
      {/* View toggle */}
      <div className="flex gap-2 mb-5">
        {(["stock", "suppliers"] as const).map((v) => (
          <button
            key={v}
            onClick={() => setActiveView(v)}
            className={`px-4 py-2 rounded-xl transition-all ${activeView === v ? "bg-[#22C55E] text-white shadow-md" : "bg-white dark:bg-gray-900 text-gray-500 border border-gray-200 dark:border-gray-700"}`}
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            {v === "stock" ? (
              <><Package size={14} className="inline mr-1.5" />{l("Stock", "ស្តុក")}</>
            ) : (
              <><Truck size={14} className="inline mr-1.5" />{l("Suppliers", "អ្នកផ្គត់ផ្គង់")}</>
            )}
          </button>
        ))}
      </div>

      {activeView === "stock" ? (
        <>
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
              <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Total Items", "សរុប")}</p>
              <p className="text-gray-900 dark:text-white" style={{ fontSize: "22px", fontWeight: 700 }}>{items.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
              <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Stock Value", "តម្លៃស្តុក")}</p>
              <p className="text-[#22C55E]" style={{ fontSize: "22px", fontWeight: 700 }}>${totalValue.toFixed(0)}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1"><AlertTriangle size={13} className="text-red-500" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Low Stock", "ស្តុកទាប")}</p></div>
              <p className="text-red-500" style={{ fontSize: "22px", fontWeight: 700 }}>{lowStockItems.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
              <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Suppliers", "អ្នកផ្គត់ផ្គង់")}</p>
              <p className="text-gray-900 dark:text-white" style={{ fontSize: "22px", fontWeight: 700 }}>{suppliers.length}</p>
            </div>
          </div>

          {/* Low stock alert */}
          {lowStockItems.length > 0 && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-4 mb-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle size={16} className="text-red-500" />
                <p className="text-red-700 dark:text-red-400" style={{ fontSize: "13px", fontWeight: 600 }}>{l("Low Stock Alert", "ការជូនដំណឹងស្តុកទាប")}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {lowStockItems.map((i) => (
                  <span key={i.id} className="px-2.5 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 rounded-lg" style={{ fontSize: "12px", fontWeight: 500 }}>
                    {lang === "km" ? i.nameKm : i.name}: {i.currentStock} {i.unit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={l("Search inventory...", "ស្វែងរកស្តុក...")} className="w-full max-w-sm pl-9 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "13px" }} />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                {categories.map((c) => (
                  <button key={c} onClick={() => setFilterCat(c)} className={`px-2.5 py-1.5 rounded-md transition-all capitalize ${filterCat === c ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
                    {c === "all" ? l("All", "ទាំងអស់") : c}
                  </button>
                ))}
              </div>
              <button onClick={() => { setEditItem(null); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-md shadow-green-200 dark:shadow-green-900" style={{ fontSize: "13px", fontWeight: 600 }}>
                <Plus size={16} />{l("Add Item", "បន្ថែម")}
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    {[l("Item", "មុខទំនិញ"), l("Stock", "ស្តុក"), l("Min", "អប្បបរមា"), l("Cost/Unit", "តម្លៃ"), l("Supplier", "អ្នកផ្គត់ផ្គង់"), l("Last Restock", "បញ្ចូលចុងក្រោយ"), l("Actions", "សកម្មភាព")].map((h) => (
                      <th key={h} className="text-left px-4 py-3 text-gray-400" style={{ fontSize: "11px", fontWeight: 600 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => {
                    const isLow = item.currentStock <= item.minStock;
                    const pct = Math.min((item.currentStock / item.maxStock) * 100, 100);
                    return (
                      <tr key={item.id} className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30">
                        <td className="px-4 py-3">
                          <p className="text-gray-900 dark:text-white" style={{ fontSize: "13px", fontWeight: 600 }}>{lang === "km" ? item.nameKm : item.name}</p>
                          <p className="text-gray-400" style={{ fontSize: "10px" }}>{lang === "km" ? item.name : item.nameKm}</p>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`${isLow ? "text-red-500" : "text-gray-700 dark:text-gray-300"}`} style={{ fontSize: "14px", fontWeight: 700 }}>{item.currentStock}</span>
                            <span className="text-gray-400" style={{ fontSize: "11px" }}>{item.unit}</span>
                            {isLow && <AlertTriangle size={12} className="text-red-500" />}
                          </div>
                          <div className="w-20 h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
                            <div className={`h-full rounded-full ${isLow ? "bg-red-500" : pct < 50 ? "bg-yellow-400" : "bg-green-500"}`} style={{ width: `${pct}%` }} />
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-500" style={{ fontSize: "12px" }}>{item.minStock} {item.unit}</td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300" style={{ fontSize: "13px" }}>${item.costPerUnit.toFixed(2)}</td>
                        <td className="px-4 py-3 text-gray-500" style={{ fontSize: "12px" }}>{item.supplier}</td>
                        <td className="px-4 py-3 text-gray-400" style={{ fontSize: "12px" }}>{item.lastRestocked}</td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-1">
                            <button onClick={() => handleRestock(item.id)} className="px-2 py-1 rounded-lg text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100 transition-colors" style={{ fontSize: "11px", fontWeight: 500 }}>{l("Restock", "បញ្ចូល")}</button>
                            <button onClick={() => { setEditItem(item); setShowModal(true); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/20"><Edit2 size={13} /></button>
                            {deleteConfirm === item.id ? (
                              <><button onClick={() => { setItems((p) => p.filter((i) => i.id !== item.id)); setDeleteConfirm(null); toast.success(l("Deleted", "បានលុប")); }} className="p-1.5 bg-red-500 text-white rounded-lg"><Check size={12} /></button><button onClick={() => setDeleteConfirm(null)} className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg"><X size={12} /></button></>
                            ) : (
                              <button onClick={() => setDeleteConfirm(item.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"><Trash2 size={13} /></button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        /* Suppliers view */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {suppliers.map((s) => (
            <div key={s.id} className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-500"><Truck size={18} /></div>
                <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>{s.name}</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-gray-500" style={{ fontSize: "12px" }}>📱 {s.phone}</p>
                {s.email && <p className="text-gray-500" style={{ fontSize: "12px" }}>✉️ {s.email}</p>}
                <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Supplies", "ផ្គត់ផ្គង់")}: {s.items}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => { setShowModal(false); setEditItem(null); }}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "16px", fontWeight: 600 }}>{editItem ? l("Edit Item", "កែប្រែ") : l("Add Inventory Item", "បន្ថែម")}</h3>
              <button onClick={() => { setShowModal(false); setEditItem(null); }} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"><X size={18} /></button>
            </div>
            <InventoryForm item={editItem} onSave={handleSave} lang={lang} />
          </div>
        </div>
      )}
    </div>
  );
}

function InventoryForm({ item, onSave, lang }: { item: InventoryItem | null; onSave: (d: InventoryItem) => void; lang: string }) {
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [form, setForm] = useState<InventoryItem>(item ?? { id: 0, name: "", nameKm: "", unit: "kg", currentStock: 0, minStock: 5, maxStock: 50, costPerUnit: 0, supplier: "", lastRestocked: new Date().toISOString().split("T")[0], category: "produce" });
  const cls = "w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300";

  return (
    <div className="p-6 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Name (EN)", "ឈ្មោះ (EN)")}</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Name (KM)", "ឈ្មោះ (ខ្មែរ)")}</label><input type="text" value={form.nameKm} onChange={(e) => setForm({ ...form, nameKm: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      </div>
      <div className="grid grid-cols-3 gap-3">
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Unit", "ឯកតា")}</label><input type="text" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Min Stock", "អប្បបរមា")}</label><input type="number" value={form.minStock} onChange={(e) => setForm({ ...form, minStock: +e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Max Stock", "អតិបរមា")}</label><input type="number" value={form.maxStock} onChange={(e) => setForm({ ...form, maxStock: +e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Current Stock", "ស្តុកបច្ចុប្បន្ន")}</label><input type="number" value={form.currentStock} onChange={(e) => setForm({ ...form, currentStock: +e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Cost/Unit ($)", "តម្លៃ/ឯកតា")}</label><input type="number" step="0.1" value={form.costPerUnit} onChange={(e) => setForm({ ...form, costPerUnit: +e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      </div>
      <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Supplier", "អ្នកផ្គត់ផ្គង់")}</label><input type="text" value={form.supplier} onChange={(e) => setForm({ ...form, supplier: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
        <button onClick={() => { if (!form.name.trim()) { toast.error("Name required"); return; } onSave(form); }} className="px-5 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 shadow-md" style={{ fontSize: "13px", fontWeight: 600 }}>{item ? l("Save", "រក្សាទុក") : l("Add", "បន្ថែម")}</button>
      </div>
    </div>
  );
}
