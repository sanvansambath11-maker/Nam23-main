import { Clock, ChefHat, CheckCircle } from "lucide-react";
import { useTranslation } from "./translation-context";
import { motion } from "motion/react";

interface KitchenOrder {
  id: string;
  table: string;
  items: string[];
  status: "new" | "cooking" | "done";
  time: string;
}

const kitchenOrders: KitchenOrder[] = [
  { id: "K001", table: "T6", items: ["Lok Lak x2", "Sugarcane Juice"], status: "cooking", time: "5 min" },
  { id: "K002", table: "T7", items: ["Fish Amok", "Garden Fresh Salad"], status: "new", time: "2 min" },
  { id: "K003", table: "GR", items: ["Bai Sach Chrouk x3", "Nom Banh Chok"], status: "cooking", time: "8 min" },
  { id: "K004", table: "T9", items: ["Samlor Korko"], status: "done", time: "12 min" },
  { id: "K005", table: "T3", items: ["Kuy Teav x2"], status: "new", time: "1 min" },
  { id: "K006", table: "FP", items: ["Lok Lak", "Fresh Orange Juice x2"], status: "done", time: "15 min" },
];

const statusConfig = {
  new: { color: "#3B82F6", bg: "bg-blue-50 dark:bg-blue-900/20", icon: <Clock size={16} /> },
  cooking: { color: "#F59E0B", bg: "bg-amber-50 dark:bg-amber-900/20", icon: <ChefHat size={16} /> },
  done: { color: "#22C55E", bg: "bg-green-50 dark:bg-green-900/20", icon: <CheckCircle size={16} /> },
};

export function KitchenView() {
  const { t, fontClass } = useTranslation();
  const statusKeys = { new: "newOrder", cooking: "cooking", done: "done" } as const;

  return (
    <div className={`p-6 ${fontClass}`}>
      <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontSize: "20px", fontWeight: 700 }}>{t("kitchenDisplay")}</h2>

      <div className="flex gap-4 mb-6">
        {(["new", "cooking", "done"] as const).map((s) => (
          <div key={s} className="flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ backgroundColor: `${statusConfig[s].color}15`, color: statusConfig[s].color, fontSize: "12px", fontWeight: 600 }}>
            {statusConfig[s].icon}
            {t(statusKeys[s])} ({kitchenOrders.filter((o) => o.status === s).length})
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {kitchenOrders.map((order, i) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`${statusConfig[order.status].bg} rounded-2xl p-4 border-2`}
            style={{ borderColor: `${statusConfig[order.status].color}30` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg" style={{ fontSize: "12px", fontWeight: 700 }}>{order.table}</span>
                <span className="text-gray-500" style={{ fontSize: "11px" }}>{order.id}</span>
              </div>
              <div className="flex items-center gap-1" style={{ color: statusConfig[order.status].color, fontSize: "11px", fontWeight: 500 }}>
                <Clock size={12} />
                {order.time}
              </div>
            </div>
            <div className="space-y-1.5">
              {order.items.map((item, idx) => (
                <p key={idx} className="text-gray-700 dark:text-gray-300" style={{ fontSize: "13px", fontWeight: 500 }}>{item}</p>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="flex items-center gap-1" style={{ color: statusConfig[order.status].color, fontSize: "12px", fontWeight: 600 }}>
                {statusConfig[order.status].icon}
                {t(statusKeys[order.status])}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}