import { useState } from "react";
import { useTranslation } from "../translation-context";
import { Search, Filter, Clock, User, UtensilsCrossed, Settings, DollarSign, Shield, LogIn, LogOut } from "lucide-react";

type AuditAction = "login" | "logout" | "staff_edit" | "menu_edit" | "menu_add" | "menu_delete" | "price_change" | "settings_change" | "promo_create" | "role_change" | "stock_restock" | "order_void";

interface AuditEntry {
  id: number;
  timestamp: string;
  user: string;
  action: AuditAction;
  category: "auth" | "staff" | "menu" | "settings" | "promo" | "inventory" | "order";
  detail: string;
  ipAddress: string;
}

const actionLabels: Record<AuditAction, { en: string; km: string; color: string; icon: React.ReactNode }> = {
  login: { en: "Login", km: "ចូល", color: "#22C55E", icon: <LogIn size={13} /> },
  logout: { en: "Logout", km: "ចេញ", color: "#9CA3AF", icon: <LogOut size={13} /> },
  staff_edit: { en: "Staff Edit", km: "កែបុគ្គលិក", color: "#3B82F6", icon: <User size={13} /> },
  menu_edit: { en: "Menu Edit", km: "កែម៉ឺន", color: "#F59E0B", icon: <UtensilsCrossed size={13} /> },
  menu_add: { en: "Menu Add", km: "បន្ថែមម៉ឺន", color: "#22C55E", icon: <UtensilsCrossed size={13} /> },
  menu_delete: { en: "Menu Delete", km: "លុបម៉ឺន", color: "#EF4444", icon: <UtensilsCrossed size={13} /> },
  price_change: { en: "Price Change", km: "ប្តូរតម្លៃ", color: "#F59E0B", icon: <DollarSign size={13} /> },
  settings_change: { en: "Settings", km: "កំណត់", color: "#A855F7", icon: <Settings size={13} /> },
  promo_create: { en: "Promo Created", km: "បង្កើតប្រូម៉ូ", color: "#EC4899", icon: <DollarSign size={13} /> },
  role_change: { en: "Role Change", km: "ប្តូរតួនាទី", color: "#EF4444", icon: <Shield size={13} /> },
  stock_restock: { en: "Stock Restock", km: "បញ្ចូលស្តុក", color: "#14B8A6", icon: <Settings size={13} /> },
  order_void: { en: "Order Void", km: "បោះបង់បញ្ជា", color: "#EF4444", icon: <DollarSign size={13} /> },
};

const mockAuditLog: AuditEntry[] = [
  { id: 1, timestamp: "2026-03-03 09:14:22", user: "Sokha Chan", action: "login", category: "auth", detail: "Manager logged in", ipAddress: "192.168.1.10" },
  { id: 2, timestamp: "2026-03-03 09:18:05", user: "Sokha Chan", action: "price_change", category: "menu", detail: "Lok Lak price changed: $5.00 → $5.50", ipAddress: "192.168.1.10" },
  { id: 3, timestamp: "2026-03-03 09:22:30", user: "Sokha Chan", action: "staff_edit", category: "staff", detail: "Updated Dara Pich phone number", ipAddress: "192.168.1.10" },
  { id: 4, timestamp: "2026-03-03 09:30:00", user: "Sokha Chan", action: "menu_add", category: "menu", detail: "Added new item: Spring Rolls ($3.50)", ipAddress: "192.168.1.10" },
  { id: 5, timestamp: "2026-03-03 09:45:12", user: "Sokha Chan", action: "promo_create", category: "promo", detail: "Created promo: LUNCH15 (15% off)", ipAddress: "192.168.1.10" },
  { id: 6, timestamp: "2026-03-03 10:00:00", user: "Dara Pich", action: "login", category: "auth", detail: "Cashier logged in", ipAddress: "192.168.1.11" },
  { id: 7, timestamp: "2026-03-03 10:15:00", user: "Sokha Chan", action: "stock_restock", category: "inventory", detail: "Restocked Beef: 5kg → 50kg", ipAddress: "192.168.1.10" },
  { id: 8, timestamp: "2026-03-03 10:30:44", user: "Sokha Chan", action: "settings_change", category: "settings", detail: "Updated VAT rate: 10% → 10%", ipAddress: "192.168.1.10" },
  { id: 9, timestamp: "2026-03-03 11:00:00", user: "Dara Pich", action: "order_void", category: "order", detail: "Voided order #1048 ($12.50)", ipAddress: "192.168.1.11" },
  { id: 10, timestamp: "2026-03-03 11:15:00", user: "Sokha Chan", action: "role_change", category: "staff", detail: "Changed Bopha Meas role: waiter → cashier", ipAddress: "192.168.1.10" },
  { id: 11, timestamp: "2026-03-03 12:00:00", user: "Sokha Chan", action: "menu_delete", category: "menu", detail: "Deleted item: Old Soup", ipAddress: "192.168.1.10" },
  { id: 12, timestamp: "2026-03-03 12:30:00", user: "Veasna Kem", action: "login", category: "auth", detail: "Chef logged in", ipAddress: "192.168.1.12" },
  { id: 13, timestamp: "2026-03-02 08:00:00", user: "Sokha Chan", action: "login", category: "auth", detail: "Manager logged in", ipAddress: "192.168.1.10" },
  { id: 14, timestamp: "2026-03-02 17:00:00", user: "Sokha Chan", action: "logout", category: "auth", detail: "Manager logged out", ipAddress: "192.168.1.10" },
  { id: 15, timestamp: "2026-03-02 10:00:00", user: "Sokha Chan", action: "menu_edit", category: "menu", detail: "Updated Fish Amok image and description", ipAddress: "192.168.1.10" },
];

const categoryOptions = ["all", "auth", "staff", "menu", "settings", "promo", "inventory", "order"] as const;

export function AuditLog() {
  const { lang, fontClass } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState<string>("all");
  const [filterUser, setFilterUser] = useState("all");

  const users = ["all", ...new Set(mockAuditLog.map((e) => e.user))];

  const filtered = mockAuditLog.filter((e) => {
    const matchSearch = !search || e.detail.toLowerCase().includes(search.toLowerCase()) || e.user.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === "all" || e.category === filterCat;
    const matchUser = filterUser === "all" || e.user === filterUser;
    return matchSearch && matchCat && matchUser;
  });

  return (
    <div className={`p-6 ${fontClass}`}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Total Events", "សរុបព្រឹត្តិការណ៍")}</p>
          <p className="text-gray-900 dark:text-white" style={{ fontSize: "22px", fontWeight: 700 }}>{mockAuditLog.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Today", "ថ្ងៃនេះ")}</p>
          <p className="text-blue-500" style={{ fontSize: "22px", fontWeight: 700 }}>{mockAuditLog.filter((e) => e.timestamp.startsWith("2026-03-03")).length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Users Active", "អ្នកប្រើសកម្ម")}</p>
          <p className="text-[#22C55E]" style={{ fontSize: "22px", fontWeight: 700 }}>{users.length - 1}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Critical Actions", "សកម្មភាពសំខាន់")}</p>
          <p className="text-red-500" style={{ fontSize: "22px", fontWeight: 700 }}>{mockAuditLog.filter((e) => ["menu_delete", "role_change", "order_void"].includes(e.action)).length}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={l("Search logs...", "ស្វែងរក...")} className="w-full max-w-sm pl-9 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "13px" }} />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <Filter size={13} className="text-gray-400" />
            <select value={filterCat} onChange={(e) => setFilterCat(e.target.value)} className="px-2.5 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 outline-none" style={{ fontSize: "12px" }}>
              {categoryOptions.map((c) => <option key={c} value={c}>{c === "all" ? l("All Categories", "ទាំងអស់") : c}</option>)}
            </select>
          </div>
          <select value={filterUser} onChange={(e) => setFilterUser(e.target.value)} className="px-2.5 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 outline-none" style={{ fontSize: "12px" }}>
            {users.map((u) => <option key={u} value={u}>{u === "all" ? l("All Users", "ទាំងអស់") : u}</option>)}
          </select>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {filtered.map((entry) => {
            const al = actionLabels[entry.action];
            return (
              <div key={entry.id} className="px-5 py-3.5 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: `${al.color}12`, color: al.color }}>
                  {al.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-gray-900 dark:text-white" style={{ fontSize: "13px", fontWeight: 600 }}>{entry.user}</span>
                    <span className="px-1.5 py-0.5 rounded" style={{ fontSize: "10px", fontWeight: 600, backgroundColor: `${al.color}12`, color: al.color }}>
                      {lang === "km" ? al.km : al.en}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-400 capitalize" style={{ fontSize: "10px" }}>{entry.category}</span>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mt-0.5" style={{ fontSize: "12px" }}>{entry.detail}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Clock size={11} />
                    <span style={{ fontSize: "11px" }}>{entry.timestamp.split(" ")[1]}</span>
                  </div>
                  <p className="text-gray-300 dark:text-gray-600 mt-0.5" style={{ fontSize: "10px" }}>{entry.timestamp.split(" ")[0]}</p>
                  <p className="text-gray-300 dark:text-gray-700" style={{ fontSize: "9px" }}>{entry.ipAddress}</p>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400"><Clock size={40} className="mx-auto mb-2 opacity-30" /><p style={{ fontSize: "14px" }}>{l("No log entries found", "រកមិនឃើញ")}</p></div>
        )}
      </div>
    </div>
  );
}
