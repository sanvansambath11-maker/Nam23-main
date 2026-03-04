import { X, TrendingUp, DollarSign, ShoppingBag, Users, CreditCard, Banknote, QrCode, Star } from "lucide-react";
import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";
import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

interface DailySummaryModalProps {
  onClose: () => void;
}

const hourlyData = [
  { hour: "9am", orders: 5, revenue: 38 },
  { hour: "10am", orders: 12, revenue: 89 },
  { hour: "11am", orders: 22, revenue: 165 },
  { hour: "12pm", orders: 38, revenue: 285 },
  { hour: "1pm", orders: 35, revenue: 262 },
  { hour: "2pm", orders: 18, revenue: 135 },
  { hour: "3pm", orders: 10, revenue: 75 },
  { hour: "4pm", orders: 8, revenue: 60 },
  { hour: "5pm", orders: 15, revenue: 112 },
  { hour: "6pm", orders: 32, revenue: 240 },
  { hour: "7pm", orders: 40, revenue: 300 },
  { hour: "8pm", orders: 28, revenue: 210 },
  { hour: "9pm", orders: 15, revenue: 112 },
];

const topItems = [
  { name: "Lok Lak", nameKm: "\u179B\u17BB\u1780\u17A1\u17B6\u1780\u17CB", qty: 48, revenue: 264 },
  { name: "Fish Amok", nameKm: "\u17A2\u17B6\u1798\u17C9\u17BB\u1780\u178F\u17D2\u179A\u17B8", qty: 35, revenue: 210 },
  { name: "Kuy Teav", nameKm: "\u1782\u17BB\u1799\u1791\u17B6\u179C", qty: 32, revenue: 112 },
  { name: "Bai Sach Chrouk", nameKm: "\u1794\u17B6\u1799\u179F\u17B6\u1785\u17CB\u1787\u17D2\u179A\u17BC\u1780", qty: 28, revenue: 98 },
  { name: "Sugarcane Juice", nameKm: "\u1791\u17B9\u1780\u17A2\u17C6\u1796\u17BE", qty: 42, revenue: 63 },
];

const paymentBreakdown = [
  { method: "cash", label: "Cash", labelKm: "\u179F\u17B6\u1785\u17CB\u1794\u17D2\u179A\u17B6\u1780\u17CB", amount: 820, pct: 40, icon: <Banknote size={16} />, color: "#22C55E" },
  { method: "khqr", label: "KHQR", labelKm: "KHQR", amount: 615, pct: 30, icon: <QrCode size={16} />, color: "#3B82F6" },
  { method: "card", label: "Card", labelKm: "\u1780\u17B6\u178F", amount: 410, pct: 20, icon: <CreditCard size={16} />, color: "#A855F7" },
  { method: "mobile", label: "Mobile Banking", labelKm: "Mobile Banking", amount: 205, pct: 10, icon: <DollarSign size={16} />, color: "#F59E0B" },
];

export function DailySummaryModal({ onClose }: DailySummaryModalProps) {
  const { t, lang, fontClass } = useTranslation();
  const { formatPrice } = useCurrency();

  const now = new Date();
  const dateStr = `${String(now.getDate()).padStart(2, "0")}/${String(now.getMonth() + 1).padStart(2, "0")}/${now.getFullYear()}`;

  const totalRevenue = 2050;
  const totalOrders = 278;
  const totalCustomers = 195;
  const avgOrder = totalRevenue / totalOrders;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-gray-900 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${fontClass}`}
      >
        {/* Header */}
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <h2 className="text-gray-900 dark:text-white" style={{ fontSize: "18px", fontWeight: 700 }}>
              {lang === "km" ? "\u179F\u1793\u17D2\u179A\u17BB\u1794\u179B\u1780\u17CB\u1794\u17D2\u179A\u1785\u17B6\u17C6\u1790\u17D2\u1784\u17C3" : "Daily Sales Summary"}
            </h2>
            <p className="text-gray-400" style={{ fontSize: "12px" }}>{dateStr}</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: lang === "km" ? "\u1785\u17C6\u178E\u17BC\u179B\u179F\u179A\u17BB\u1794" : "Total Revenue", value: formatPrice(totalRevenue), change: "+12%", icon: <DollarSign size={18} />, color: "#22C55E" },
              { label: t("orders"), value: String(totalOrders), change: "+8%", icon: <ShoppingBag size={18} />, color: "#3B82F6" },
              { label: t("customers"), value: String(totalCustomers), change: "+15%", icon: <Users size={18} />, color: "#A855F7" },
              { label: t("avgOrder"), value: formatPrice(avgOrder), change: "+3%", icon: <TrendingUp size={18} />, color: "#F59E0B" },
            ].map((stat) => (
              <div key={stat.label} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                    {stat.icon}
                  </div>
                  <span className="text-[#22C55E] px-1.5 py-0.5 bg-green-50 dark:bg-green-900/30 rounded-md" style={{ fontSize: "10px", fontWeight: 600 }}>{stat.change}</span>
                </div>
                <p className="text-gray-900 dark:text-white" style={{ fontSize: "18px", fontWeight: 700 }}>{stat.value}</p>
                <p className="text-gray-400" style={{ fontSize: "11px" }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Peak Hours Chart */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
            <p className="text-gray-700 dark:text-gray-200 mb-3" style={{ fontSize: "13px", fontWeight: 600 }}>
              {lang === "km" ? "\u1798\u17C9\u17C4\u1784\u1780\u17C6\u1796\u17BC\u179B" : "Peak Hours"}
            </p>
            <ResponsiveContainer width="100%" height={160}>
              <BarChart data={hourlyData}>
                <XAxis dataKey="hour" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip formatter={(value: number) => [`${value}`, "Orders"]} />
                <Bar dataKey="orders" fill="#22C55E" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Payment Breakdown */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-200 mb-3" style={{ fontSize: "13px", fontWeight: 600 }}>
                {t("paymentMethod")}
              </p>
              <div className="space-y-3">
                {paymentBreakdown.map((pm) => (
                  <div key={pm.method}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${pm.color}15`, color: pm.color }}>
                          {pm.icon}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300" style={{ fontSize: "12px", fontWeight: 500 }}>
                          {lang === "km" ? pm.labelKm : pm.label}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-gray-800 dark:text-gray-200" style={{ fontSize: "13px", fontWeight: 600 }}>{formatPrice(pm.amount)}</span>
                        <span className="text-gray-400 ml-1" style={{ fontSize: "10px" }}>({pm.pct}%)</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pm.pct}%` }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: pm.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Selling Items */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
              <p className="text-gray-700 dark:text-gray-200 mb-3" style={{ fontSize: "13px", fontWeight: 600 }}>
                {lang === "km" ? "\u1798\u17C9\u17BA\u1793\u17BB\u1799\u179B\u1780\u17CB\u1785\u17D2\u179A\u17BE\u1793\u1794\u17C6\u1795\u17BB\u178F" : "Top Selling Items"}
              </p>
              <div className="space-y-2.5">
                {topItems.map((item, i) => (
                  <div key={item.name} className="flex items-center gap-2.5">
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-white shrink-0 ${
                      i === 0 ? "bg-yellow-400" : i === 1 ? "bg-gray-400" : i === 2 ? "bg-amber-600" : "bg-gray-300"
                    }`} style={{ fontSize: "10px", fontWeight: 700 }}>
                      {i < 3 ? <Star size={12} className="fill-current" /> : i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 dark:text-gray-300 truncate" style={{ fontSize: "12px", fontWeight: 600 }}>
                        {lang === "km" ? item.nameKm : item.name}
                      </p>
                      <p className="text-gray-400" style={{ fontSize: "10px" }}>{item.qty} {lang === "km" ? "\u1781\u17D2\u1793\u17B6\u178F" : "sold"}</p>
                    </div>
                    <span className="text-[#22C55E] shrink-0" style={{ fontSize: "12px", fontWeight: 600 }}>
                      {formatPrice(item.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-gray-400">
              <p style={{ fontSize: "10px" }}>Kafe Sans &bull; {dateStr} &bull; TIN: K001-2024-00458</p>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors"
              style={{ fontSize: "13px", fontWeight: 600 }}
            >
              {t("close")}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
