import { CheckCircle, Clock, Truck } from "lucide-react";
import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";
import { motion } from "motion/react";

interface HistoryOrder {
  id: string;
  table: string;
  customer: string;
  items: number;
  total: number;
  time: string;
  date: string;
  status: "completed" | "cancelled";
  platform?: "grab" | "foodpanda" | null;
}

const historyOrders: HistoryOrder[] = [
  { id: "#4820", table: "T5", customer: "Alex B.", items: 4, total: 18.50, time: "11:30", date: "03/03/2026", status: "completed" },
  { id: "#4819", table: "GR", customer: "Grab #2841", items: 2, total: 9.00, time: "11:15", date: "03/03/2026", status: "completed", platform: "grab" },
  { id: "#4818", table: "T8", customer: "James L.", items: 6, total: 25.00, time: "10:45", date: "03/03/2026", status: "completed" },
  { id: "#4817", table: "FP", customer: "FoodPanda #389", items: 1, total: 5.50, time: "10:30", date: "03/03/2026", status: "cancelled", platform: "foodpanda" },
  { id: "#4816", table: "T10", customer: "David K.", items: 5, total: 22.00, time: "10:00", date: "03/03/2026", status: "completed" },
  { id: "#4815", table: "T4", customer: "Emma W.", items: 3, total: 12.50, time: "09:45", date: "03/03/2026", status: "completed" },
  { id: "#4814", table: "T7", customer: "Noah P.", items: 2, total: 8.00, time: "09:30", date: "03/03/2026", status: "completed" },
  { id: "#4813", table: "T6", customer: "Olivia R.", items: 4, total: 19.00, time: "09:00", date: "03/03/2026", status: "completed" },
];

const platformColors: Record<string, string> = {
  grab: "#00B14F",
  foodpanda: "#D70F64",
};

export function HistoryView() {
  const { t, fontClass } = useTranslation();
  const { formatPrice, formatDual } = useCurrency();

  return (
    <div className={`p-6 ${fontClass}`}>
      <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontSize: "20px", fontWeight: 700 }}>{t("orderHistory")}</h2>

      <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-50 dark:border-gray-700 overflow-hidden">
        <div className="grid grid-cols-7 gap-4 px-4 py-3 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700">
          {["Order", t("date"), "Table", "Customer", t("items"), t("total"), "Status"].map((h) => (
            <span key={h} className="text-gray-400" style={{ fontSize: "11px", fontWeight: 600 }}>{h}</span>
          ))}
        </div>
        {historyOrders.map((order, i) => {
          const dual = formatDual(order.total);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-7 gap-4 px-4 py-3 border-b border-gray-50 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer items-center"
            >
              <span className="text-gray-800 dark:text-gray-200" style={{ fontSize: "13px", fontWeight: 600 }}>{order.id}</span>
              <div>
                <span className="text-gray-600 dark:text-gray-400 block" style={{ fontSize: "12px" }}>{order.date}</span>
                <span className="text-gray-400" style={{ fontSize: "10px" }}>{order.time}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-gray-600 dark:text-gray-400" style={{ fontSize: "13px" }}>{order.table}</span>
                {order.platform && (
                  <span className="text-white px-1 py-0.5 rounded" style={{ backgroundColor: platformColors[order.platform], fontSize: "8px", fontWeight: 700 }}>
                    {order.platform === "grab" ? "GR" : "FP"}
                  </span>
                )}
              </div>
              <span className="text-gray-700 dark:text-gray-300 truncate" style={{ fontSize: "13px", fontWeight: 500 }}>{order.customer}</span>
              <span className="text-gray-500" style={{ fontSize: "13px" }}>{order.items} {t("items")}</span>
              <div>
                <span className="text-gray-900 dark:text-white block" style={{ fontSize: "13px", fontWeight: 600 }}>{formatPrice(order.total)}</span>
                <span className="text-gray-400" style={{ fontSize: "9px" }}>{dual.khr}</span>
              </div>
              <div className="flex items-center gap-1">
                {order.status === "completed" ? (
                  <span className="flex items-center gap-1 text-[#22C55E]" style={{ fontSize: "12px", fontWeight: 500 }}>
                    <CheckCircle size={14} />
                    {t("completed")}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-red-400" style={{ fontSize: "12px", fontWeight: 500 }}>
                    <Clock size={14} />
                    {t("cancel")}
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
