import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";
import { motion } from "motion/react";

interface TableInfo {
  id: string;
  seats: number;
  status: "available" | "occupied" | "reserved";
  customer?: string;
  orderUSD?: number;
}

const tables: TableInfo[] = [
  { id: "T1", seats: 2, status: "available" },
  { id: "T2", seats: 4, status: "occupied", customer: "John D.", orderUSD: 12.50 },
  { id: "T3", seats: 2, status: "reserved", customer: "Anna L." },
  { id: "T4", seats: 6, status: "available" },
  { id: "T5", seats: 4, status: "occupied", customer: "Mike R.", orderUSD: 8.00 },
  { id: "T6", seats: 4, status: "occupied", customer: "Sarah M.", orderUSD: 13.00 },
  { id: "T7", seats: 2, status: "occupied", customer: "Lisa K.", orderUSD: 7.50 },
  { id: "T8", seats: 6, status: "reserved", customer: "Group Event" },
  { id: "T9", seats: 4, status: "available" },
  { id: "T10", seats: 8, status: "occupied", customer: "Tom W.", orderUSD: 25.00 },
  { id: "T11", seats: 2, status: "available" },
  { id: "T12", seats: 4, status: "reserved", customer: "VIP Guest" },
];

const statusColors = {
  available: { bg: "bg-green-50 dark:bg-green-900/20", border: "border-[#22C55E]", dot: "bg-[#22C55E]" },
  occupied: { bg: "bg-red-50 dark:bg-red-900/20", border: "border-red-400", dot: "bg-red-400" },
  reserved: { bg: "bg-amber-50 dark:bg-amber-900/20", border: "border-amber-400", dot: "bg-amber-400" },
};

export function TableMapView() {
  const { t, fontClass } = useTranslation();
  const { formatPrice } = useCurrency();

  return (
    <div className={`p-6 ${fontClass}`}>
      <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontSize: "20px", fontWeight: 700 }}>{t("tableMap")}</h2>

      <div className="flex gap-4 mb-6">
        {(["available", "occupied", "reserved"] as const).map((s) => (
          <div key={s} className="flex items-center gap-2" style={{ fontSize: "12px", fontWeight: 500 }}>
            <div className={`w-3 h-3 rounded-full ${statusColors[s].dot}`} />
            <span className="text-gray-600 dark:text-gray-300">
              {t(s)} ({tables.filter((tb) => tb.status === s).length})
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tables.map((table, i) => (
          <motion.div
            key={table.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`${statusColors[table.status].bg} ${statusColors[table.status].border} border-2 rounded-2xl p-4 cursor-pointer hover:shadow-lg transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-900 dark:text-white" style={{ fontSize: "18px", fontWeight: 700 }}>{table.id}</span>
              <div className={`w-2.5 h-2.5 rounded-full ${statusColors[table.status].dot}`} />
            </div>
            <p className="text-gray-400 mb-1" style={{ fontSize: "11px" }}>{table.seats} seats</p>
            {table.customer && (
              <p className="text-gray-700 dark:text-gray-300" style={{ fontSize: "12px", fontWeight: 500 }}>{table.customer}</p>
            )}
            {table.orderUSD != null && (
              <p className="text-[#22C55E] mt-1" style={{ fontSize: "14px", fontWeight: 700 }}>{formatPrice(table.orderUSD)}</p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}