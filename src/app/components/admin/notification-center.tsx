import { useState } from "react";
import { useTranslation } from "../translation-context";
import { Bell, Check, CheckCheck, Trash2, ShoppingBag, AlertTriangle, User, UtensilsCrossed, Clock, Filter, X } from "lucide-react";

type NotifType = "order" | "stock" | "staff" | "system";

interface Notification {
  id: number;
  type: NotifType;
  title: string;
  titleKm: string;
  message: string;
  messageKm: string;
  timestamp: string;
  read: boolean;
  priority: "low" | "medium" | "high";
}

const typeConfig: Record<NotifType, { color: string; icon: React.ReactNode; label: string; labelKm: string }> = {
  order: { color: "#3B82F6", icon: <ShoppingBag size={16} />, label: "Order", labelKm: "បញ្ជា" },
  stock: { color: "#F59E0B", icon: <AlertTriangle size={16} />, label: "Stock", labelKm: "ស្តុក" },
  staff: { color: "#A855F7", icon: <User size={16} />, label: "Staff", labelKm: "បុគ្គលិក" },
  system: { color: "#22C55E", icon: <UtensilsCrossed size={16} />, label: "System", labelKm: "ប្រព័ន្ធ" },
};

const priorityColors: Record<string, string> = { low: "#9CA3AF", medium: "#F59E0B", high: "#EF4444" };

const initialNotifications: Notification[] = [
  { id: 1, type: "order", title: "New Order #1052", titleKm: "បញ្ជាថ្មី #1052", message: "Table 5 placed an order for $24.50", messageKm: "តុ ៥ បានបញ្ជា $24.50", timestamp: "2 min ago", read: false, priority: "medium" },
  { id: 2, type: "stock", title: "Low Stock: Pork", titleKm: "ស្តុកទាប: សាច់ជ្រូក", message: "Pork stock is at 2 kg (min: 5 kg). Reorder needed.", messageKm: "ស្តុកសាច់ជ្រូកនៅ 2 kg (អប្បបរមា: 5 kg)", timestamp: "5 min ago", read: false, priority: "high" },
  { id: 3, type: "stock", title: "Low Stock: Rice Noodles", titleKm: "ស្តុកទាប: គុយទាវ", message: "Rice noodles stock is at 3 kg (min: 5 kg)", messageKm: "ស្តុកគុយទាវនៅ 3 kg (អប្បបរមា: 5 kg)", timestamp: "8 min ago", read: false, priority: "high" },
  { id: 4, type: "staff", title: "Late Clock-in", titleKm: "ចូលម៉ោងយឺត", message: "Veasna Kem clocked in 15 minutes late", messageKm: "វាសនា កែម បានចូលម៉ោងយឺត ១៥ នាទី", timestamp: "15 min ago", read: false, priority: "medium" },
  { id: 5, type: "order", title: "Order #1049 Completed", titleKm: "បញ្ជា #1049 បានបញ্চ", message: "Payment received: Cash $18.00", messageKm: "បានទទួលការបង់ប្រាក់: សាច់ប្រាក់ $18.00", timestamp: "20 min ago", read: true, priority: "low" },
  { id: 6, type: "system", title: "Daily Summary Ready", titleKm: "សង្ខេបប្រចាំថ្ងៃ", message: "Yesterday's revenue: $790. Orders: 102.", messageKm: "ចំណូលម្សិលមិញ: $790។ បញ្ជា: 102។", timestamp: "1 hr ago", read: true, priority: "low" },
  { id: 7, type: "staff", title: "Staff Clock-in", titleKm: "បុគ្គលិកចូលម៉ោង", message: "Dara Pich clocked in at 08:02", messageKm: "ដារា ពិច បានចូលម៉ោង 08:02", timestamp: "1 hr ago", read: true, priority: "low" },
  { id: 8, type: "order", title: "Grab Order #G1205", titleKm: "បញ្ជា Grab #G1205", message: "New Grab delivery order: 2 items, $12.50", messageKm: "បញ្ជាដឹកជញ្ជូន Grab ថ្មី: 2 មុខ $12.50", timestamp: "2 hr ago", read: true, priority: "medium" },
  { id: 9, type: "system", title: "Backup Completed", titleKm: "បានបម្រុងទុកទិន្នន័យ", message: "Automatic backup completed successfully", messageKm: "ការបម្រុងទុកដោយស្វ័យប្រវត្តិបានបញ្ចប់", timestamp: "3 hr ago", read: true, priority: "low" },
  { id: 10, type: "stock", title: "Restock Reminder", titleKm: "ការរំលឹកបញ្ចូលស្តុក", message: "Weekly restock for vegetables is due tomorrow", messageKm: "ការបញ្ចូលស្តុកបន្លែប្រចាំសប្ដាហ៍គឺថ្ងៃស្អែក", timestamp: "5 hr ago", read: true, priority: "medium" },
];

export function NotificationCenter() {
  const { lang, fontClass } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [filterType, setFilterType] = useState<NotifType | "all">("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const highPriorityCount = notifications.filter((n) => n.priority === "high" && !n.read).length;

  const filtered = notifications.filter((n) => {
    if (showUnreadOnly && n.read) return false;
    if (filterType !== "all" && n.type !== filterType) return false;
    return true;
  });

  const markRead = (id: number) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const deleteNotif = (id: number) => setNotifications((p) => p.filter((n) => n.id !== id));
  const clearAll = () => setNotifications([]);

  return (
    <div className={`p-6 ${fontClass}`}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5"><Bell size={14} className="text-blue-500" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Total", "សរុប")}</p></div>
          <p className="text-gray-900 dark:text-white" style={{ fontSize: "22px", fontWeight: 700 }}>{notifications.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5"><Bell size={14} className="text-[#22C55E]" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Unread", "មិនទាន់អាន")}</p></div>
          <p className="text-[#22C55E]" style={{ fontSize: "22px", fontWeight: 700 }}>{unreadCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5"><AlertTriangle size={14} className="text-red-500" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("High Priority", "អាទិភាពខ្ពស់")}</p></div>
          <p className="text-red-500" style={{ fontSize: "22px", fontWeight: 700 }}>{highPriorityCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5"><ShoppingBag size={14} className="text-blue-500" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Orders", "បញ្ជា")}</p></div>
          <p className="text-blue-500" style={{ fontSize: "22px", fontWeight: 700 }}>{notifications.filter((n) => n.type === "order").length}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5 flex-1">
          {(["all", "order", "stock", "staff", "system"] as const).map((t) => (
            <button key={t} onClick={() => setFilterType(t)} className={`px-3 py-1.5 rounded-md transition-all ${filterType === t ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
              {t === "all" ? l("All", "ទាំងអស់") : lang === "km" ? typeConfig[t].labelKm : typeConfig[t].label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowUnreadOnly(!showUnreadOnly)} className={`flex items-center gap-1 px-3 py-1.5 rounded-lg border transition-all ${showUnreadOnly ? "border-[#22C55E] bg-[#22C55E]/5 text-[#22C55E]" : "border-gray-200 dark:border-gray-700 text-gray-500"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
            <Filter size={12} />{l("Unread Only", "មិនទាន់អាន")}
          </button>
          <button onClick={markAllRead} className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 hover:bg-blue-100 transition-colors" style={{ fontSize: "11px", fontWeight: 500 }}>
            <CheckCheck size={12} className="inline mr-1" />{l("Read All", "អានទាំងអស់")}
          </button>
          <button onClick={clearAll} className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-500 hover:bg-red-100 transition-colors" style={{ fontSize: "11px", fontWeight: 500 }}>
            <Trash2 size={12} className="inline mr-1" />{l("Clear", "សម្អាត")}
          </button>
        </div>
      </div>

      {/* Notifications list */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {filtered.map((n) => {
            const tc = typeConfig[n.type];
            return (
              <div key={n.id} className={`px-5 py-4 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors flex items-start gap-4 ${!n.read ? "bg-blue-50/30 dark:bg-blue-900/5" : ""}`}>
                {/* Unread dot */}
                <div className="relative mt-1">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${tc.color}12`, color: tc.color }}>
                    {tc.icon}
                  </div>
                  {!n.read && <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#22C55E] rounded-full border-2 border-white dark:border-gray-900" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`${!n.read ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`} style={{ fontSize: "13px", fontWeight: !n.read ? 600 : 500 }}>
                      {lang === "km" ? n.titleKm : n.title}
                    </p>
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: priorityColors[n.priority] }} />
                  </div>
                  <p className="text-gray-400 mt-0.5" style={{ fontSize: "12px" }}>
                    {lang === "km" ? n.messageKm : n.message}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-gray-400">
                    <Clock size={10} />
                    <span style={{ fontSize: "10px" }}>{n.timestamp}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {!n.read && (
                    <button onClick={() => markRead(n.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-green-50 hover:text-green-500 dark:hover:bg-green-900/20 transition-colors" title={l("Mark read", "សម្គាល់ថាអាន")}>
                      <Check size={14} />
                    </button>
                  )}
                  <button onClick={() => deleteNotif(n.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors">
                    <X size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400"><Bell size={40} className="mx-auto mb-2 opacity-30" /><p style={{ fontSize: "14px" }}>{l("No notifications", "គ្មានការជូនដំណឹង")}</p></div>
        )}
      </div>
    </div>
  );
}
