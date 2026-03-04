import { useState } from "react";
import { useTranslation } from "../translation-context";
import { useCurrency } from "../currency-context";
import { Plus, Edit2, Trash2, Tag, Clock, Percent, Gift, Check, X, Copy, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

type PromoType = "percentage" | "fixed" | "bogo";
type PromoStatus = "active" | "scheduled" | "expired" | "disabled";

interface Promotion {
  id: number;
  name: string;
  nameKm: string;
  code: string;
  type: PromoType;
  value: number;
  minOrder: number;
  maxUses: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: PromoStatus;
  happyHour: boolean;
  happyHourStart?: string;
  happyHourEnd?: string;
  applicableItems: string;
}

const initialPromos: Promotion[] = [
  { id: 1, name: "New Year 2026", nameKm: "ឆ្នាំថ្មី ២០២៦", code: "NY2026", type: "percentage", value: 20, minOrder: 10, maxUses: 200, usedCount: 145, startDate: "2026-01-01", endDate: "2026-01-31", status: "expired", happyHour: false, applicableItems: "All items" },
  { id: 2, name: "Lunch Special", nameKm: "ពិសេសអាហារថ្ងៃត្រង់", code: "LUNCH15", type: "percentage", value: 15, minOrder: 5, maxUses: 0, usedCount: 328, startDate: "2026-01-01", endDate: "2026-12-31", status: "active", happyHour: true, happyHourStart: "11:00", happyHourEnd: "14:00", applicableItems: "All items" },
  { id: 3, name: "Free Drink Friday", nameKm: "ភេសជ្ជៈឥតគិតថ្លៃថ្ងៃសុក្រ", code: "FRIDAYDRINK", type: "bogo", value: 0, minOrder: 8, maxUses: 50, usedCount: 12, startDate: "2026-03-01", endDate: "2026-03-31", status: "active", happyHour: false, applicableItems: "Drinks only" },
  { id: 4, name: "Welcome Discount", nameKm: "បញ្ចុះតម្លៃស្វាគមន៍", code: "WELCOME5", type: "fixed", value: 2, minOrder: 10, maxUses: 100, usedCount: 67, startDate: "2026-01-01", endDate: "2026-06-30", status: "active", happyHour: false, applicableItems: "All items" },
  { id: 5, name: "Khmer New Year", nameKm: "ចូលឆ្នាំខ្មែរ", code: "KNY2026", type: "percentage", value: 25, minOrder: 15, maxUses: 500, usedCount: 0, startDate: "2026-04-13", endDate: "2026-04-16", status: "scheduled", happyHour: false, applicableItems: "All items" },
];

const typeLabels: Record<PromoType, { en: string; km: string; color: string }> = {
  percentage: { en: "% Off", km: "% បញ្ចុះ", color: "#22C55E" },
  fixed: { en: "$ Off", km: "$ បញ្ចុះ", color: "#3B82F6" },
  bogo: { en: "Buy 1 Get 1", km: "ទិញ ១ ថែម ១", color: "#A855F7" },
};

const statusColors: Record<PromoStatus, string> = { active: "#22C55E", scheduled: "#3B82F6", expired: "#9CA3AF", disabled: "#EF4444" };

let nextPromoId = 20;

export function PromotionsCoupons() {
  const { lang, fontClass } = useTranslation();
  const { formatPrice } = useCurrency();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [promos, setPromos] = useState<Promotion[]>(initialPromos);
  const [showModal, setShowModal] = useState(false);
  const [editPromo, setEditPromo] = useState<Promotion | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [filterStatus, setFilterStatus] = useState<PromoStatus | "all">("all");

  const filtered = filterStatus === "all" ? promos : promos.filter((p) => p.status === filterStatus);
  const activeCount = promos.filter((p) => p.status === "active").length;
  const totalUsed = promos.reduce((s, p) => s + p.usedCount, 0);

  const handleSave = (data: Promotion) => {
    if (editPromo) {
      setPromos((p) => p.map((pr) => (pr.id === data.id ? data : pr)));
      toast.success(l("Promotion updated", "បានកែប្រែ"));
    } else {
      setPromos((p) => [...p, { ...data, id: nextPromoId++ }]);
      toast.success(l("Promotion created", "បានបង្កើត"));
    }
    setShowModal(false);
    setEditPromo(null);
  };

  const toggleStatus = (id: number) => {
    setPromos((p) => p.map((pr) => pr.id === id ? { ...pr, status: pr.status === "active" ? "disabled" : "active" } : pr));
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`${l("Copied", "បានចម្លង")}: ${code}`);
  };

  return (
    <div className={`p-6 ${fontClass}`}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Total Promotions", "ប្រូម៉ូសិនសរុប")}</p>
          <p className="text-gray-900 dark:text-white" style={{ fontSize: "22px", fontWeight: 700 }}>{promos.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Active", "សកម្ម")}</p>
          <p className="text-[#22C55E]" style={{ fontSize: "22px", fontWeight: 700 }}>{activeCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Total Uses", "ប្រើប្រាស់សរុប")}</p>
          <p className="text-blue-500" style={{ fontSize: "22px", fontWeight: 700 }}>{totalUsed}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("BOGO Active", "ទិញ១ថែម១")}</p>
          <p className="text-purple-500" style={{ fontSize: "22px", fontWeight: 700 }}>{promos.filter((p) => p.type === "bogo" && p.status === "active").length}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 flex-1">
          {(["all", "active", "scheduled", "expired", "disabled"] as const).map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-3 py-1.5 rounded-md transition-all capitalize ${filterStatus === s ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
              {s === "all" ? l("All", "ទាំងអស់") : s}
            </button>
          ))}
        </div>
        <button onClick={() => { setEditPromo(null); setShowModal(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 shadow-md shadow-green-200 dark:shadow-green-900" style={{ fontSize: "13px", fontWeight: 600 }}>
          <Plus size={16} />{l("Create Promo", "បង្កើតប្រូម៉ូសិន")}
        </button>
      </div>

      {/* Promo cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((p) => {
          const tl = typeLabels[p.type];
          return (
            <div key={p.id} className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-lg transition-shadow ${p.status === "disabled" || p.status === "expired" ? "opacity-60" : ""}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>{lang === "km" ? p.nameKm : p.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-md" style={{ fontSize: "10px", fontWeight: 600, backgroundColor: `${statusColors[p.status]}15`, color: statusColors[p.status] }}>{p.status.toUpperCase()}</span>
                    <span className="px-2 py-0.5 rounded-md" style={{ fontSize: "10px", fontWeight: 600, backgroundColor: `${tl.color}15`, color: tl.color }}>{lang === "km" ? tl.km : tl.en}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[#22C55E]" style={{ fontSize: "24px", fontWeight: 800 }}>
                    {p.type === "percentage" ? `${p.value}%` : p.type === "fixed" ? formatPrice(p.value) : "B1G1"}
                  </p>
                </div>
              </div>

              {/* Code */}
              <div className="flex items-center gap-2 mb-3 bg-gray-50 dark:bg-gray-800 rounded-xl px-3 py-2">
                <Tag size={13} className="text-gray-400" />
                <span className="font-mono text-gray-700 dark:text-gray-300 flex-1" style={{ fontSize: "14px", fontWeight: 700 }}>{p.code}</span>
                <button onClick={() => copyCode(p.code)} className="text-gray-400 hover:text-blue-500"><Copy size={14} /></button>
              </div>

              {/* Details */}
              <div className="space-y-1 mb-3">
                <p className="text-gray-400" style={{ fontSize: "11px" }}>📅 {p.startDate} → {p.endDate}</p>
                {p.minOrder > 0 && <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Min order", "បញ្ជាអប្បបរមា")}: {formatPrice(p.minOrder)}</p>}
                {p.maxUses > 0 && <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Uses", "ប្រើ")}: {p.usedCount}/{p.maxUses}</p>}
                {p.happyHour && <p className="text-amber-500" style={{ fontSize: "11px" }}><Clock size={10} className="inline mr-1" />{l("Happy Hour", "ម៉ោងរីករាយ")}: {p.happyHourStart} - {p.happyHourEnd}</p>}
                <p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Applies to", "អនុវត្តលើ")}: {p.applicableItems}</p>
              </div>

              {/* Progress bar for usage */}
              {p.maxUses > 0 && (
                <div className="mb-3">
                  <div className="h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-[#22C55E] rounded-full" style={{ width: `${Math.min((p.usedCount / p.maxUses) * 100, 100)}%` }} />
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-2 pt-3 border-t border-gray-50 dark:border-gray-800">
                <button onClick={() => toggleStatus(p.id)} className={`flex items-center gap-1 flex-1 py-1.5 justify-center rounded-lg transition-colors ${p.status === "active" ? "bg-red-50 dark:bg-red-900/20 text-red-500" : "bg-green-50 dark:bg-green-900/20 text-green-600"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
                  {p.status === "active" ? <><ToggleRight size={14} />{l("Disable", "បិទ")}</> : <><ToggleLeft size={14} />{l("Enable", "បើក")}</>}
                </button>
                <button onClick={() => { setEditPromo(p); setShowModal(true); }} className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/20"><Edit2 size={14} /></button>
                {deleteConfirm === p.id ? (
                  <><button onClick={() => { setPromos((pr) => pr.filter((x) => x.id !== p.id)); setDeleteConfirm(null); toast.success(l("Deleted", "បានលុប")); }} className="p-1.5 bg-red-500 text-white rounded-lg"><Check size={12} /></button><button onClick={() => setDeleteConfirm(null)} className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg"><X size={12} /></button></>
                ) : (
                  <button onClick={() => setDeleteConfirm(p.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"><Trash2 size={14} /></button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create/Edit modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => { setShowModal(false); setEditPromo(null); }}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
              <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "16px", fontWeight: 600 }}>{editPromo ? l("Edit Promotion", "កែប្រែ") : l("Create Promotion", "បង្កើតប្រូម៉ូសិន")}</h3>
              <button onClick={() => { setShowModal(false); setEditPromo(null); }} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"><X size={18} /></button>
            </div>
            <PromoForm promo={editPromo} onSave={handleSave} lang={lang} formatPrice={formatPrice} />
          </div>
        </div>
      )}
    </div>
  );
}

function PromoForm({ promo, onSave, lang, formatPrice: _fp }: { promo: Promotion | null; onSave: (d: Promotion) => void; lang: string; formatPrice: (n: number) => string }) {
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [form, setForm] = useState<Promotion>(promo ?? { id: 0, name: "", nameKm: "", code: "", type: "percentage", value: 10, minOrder: 0, maxUses: 100, usedCount: 0, startDate: new Date().toISOString().split("T")[0], endDate: "", status: "active", happyHour: false, applicableItems: "All items" });
  const cls = "w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300";

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Name (EN)", "ឈ្មោះ (EN)")}</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Name (KM)", "ឈ្មោះ (ខ្មែរ)")}</label><input type="text" value={form.nameKm} onChange={(e) => setForm({ ...form, nameKm: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      </div>
      <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Promo Code", "លេខកូដ")}</label><input type="text" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} className={`${cls} font-mono tracking-wider`} style={{ fontSize: "14px" }} placeholder="e.g. SUMMER25" /></div>
      <div>
        <label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Type", "ប្រភេទ")}</label>
        <div className="grid grid-cols-3 gap-2">
          {(["percentage", "fixed", "bogo"] as PromoType[]).map((t) => (
            <button key={t} onClick={() => setForm({ ...form, type: t })} className={`flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl border transition-all ${form.type === t ? "border-[#22C55E] bg-[#22C55E]/5 text-[#22C55E]" : "border-gray-200 dark:border-gray-700 text-gray-500"}`} style={{ fontSize: "12px", fontWeight: 500 }}>
              {t === "percentage" ? <Percent size={14} /> : t === "fixed" ? <Tag size={14} /> : <Gift size={14} />}
              {lang === "km" ? typeLabels[t].km : typeLabels[t].en}
            </button>
          ))}
        </div>
      </div>
      {form.type !== "bogo" && (
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Discount Value", "តម្លៃបញ្ចុះ")} {form.type === "percentage" ? "(%)" : "($)"}</label><input type="number" value={form.value} onChange={(e) => setForm({ ...form, value: +e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      )}
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Start Date", "ថ្ងៃចាប់ផ្តើម")}</label><input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("End Date", "ថ្ងៃបញ្ចប់")}</label><input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Min Order ($)", "បញ្ជាអប្បបរមា")}</label><input type="number" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: +e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Max Uses", "ប្រើអតិបរមា")} (0=∞)</label><input type="number" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: +e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={form.happyHour} onChange={(e) => setForm({ ...form, happyHour: e.target.checked })} className="w-4 h-4 rounded accent-[#22C55E]" /><span className="text-gray-600 dark:text-gray-400" style={{ fontSize: "12px" }}>{l("Happy Hour (time-limited)", "ម៉ោងរីករាយ")}</span></label>
      {form.happyHour && (
        <div className="grid grid-cols-2 gap-3">
          <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Start Time", "ម៉ោងចាប់ផ្តើម")}</label><input type="time" value={form.happyHourStart || ""} onChange={(e) => setForm({ ...form, happyHourStart: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
          <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("End Time", "ម៉ោងបញ្ចប់")}</label><input type="time" value={form.happyHourEnd || ""} onChange={(e) => setForm({ ...form, happyHourEnd: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        </div>
      )}
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end gap-3">
        <button onClick={() => { if (!form.name.trim() || !form.code.trim()) { toast.error("Name and code required"); return; } onSave(form); }} className="px-5 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 shadow-md" style={{ fontSize: "13px", fontWeight: 600 }}>{promo ? l("Save", "រក្សាទុក") : l("Create", "បង្កើត")}</button>
      </div>
    </div>
  );
}
