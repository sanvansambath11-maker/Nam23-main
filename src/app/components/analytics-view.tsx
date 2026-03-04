import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";
import { TrendingUp, DollarSign, ShoppingBag, Users } from "lucide-react";

const dailyData = [
  { name: "Mon", revenue: 320, orders: 45 },
  { name: "Tue", revenue: 480, orders: 62 },
  { name: "Wed", revenue: 370, orders: 50 },
  { name: "Thu", revenue: 580, orders: 78 },
  { name: "Fri", revenue: 740, orders: 95 },
  { name: "Sat", revenue: 850, orders: 110 },
  { name: "Sun", revenue: 690, orders: 88 },
];

const categoryData = [
  { name: "Khmer", value: 40, color: "#22C55E" },
  { name: "Rice", value: 20, color: "#3B82F6" },
  { name: "Noodle", value: 15, color: "#F59E0B" },
  { name: "Drinks", value: 15, color: "#A855F7" },
  { name: "Other", value: 10, color: "#EF4444" },
];

export function AnalyticsView() {
  const { t, fontClass } = useTranslation();
  const { formatPrice } = useCurrency();
  const [period, setPeriod] = useState("weekly");

  const stats = [
    { key: "revenue", value: formatPrice(4030), change: "+12%", icon: <DollarSign size={20} />, color: "#22C55E" },
    { key: "orders", value: "528", change: "+8%", icon: <ShoppingBag size={20} />, color: "#3B82F6" },
    { key: "customers", value: "342", change: "+15%", icon: <Users size={20} />, color: "#A855F7" },
    { key: "avgOrder", value: formatPrice(7.63), change: "+3%", icon: <TrendingUp size={20} />, color: "#F59E0B" },
  ];

  return (
    <div className={`p-6 ${fontClass}`}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900 dark:text-white" style={{ fontSize: "20px", fontWeight: 700 }}>{t("salesAnalytics")}</h2>
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {["daily", "weekly"].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1.5 rounded-md transition-all ${
                period === p ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"
              }`}
              style={{ fontSize: "12px", fontWeight: 500 }}
            >
              {t(p)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.key} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-50 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                {stat.icon}
              </div>
              <span className="text-[#22C55E] px-2 py-0.5 bg-green-50 dark:bg-green-900/30 rounded-md" style={{ fontSize: "11px", fontWeight: 600 }}>{stat.change}</span>
            </div>
            <p className="text-gray-900 dark:text-white" style={{ fontSize: "20px", fontWeight: 700 }}>{stat.value}</p>
            <p className="text-gray-400" style={{ fontSize: "12px" }}>{t(stat.key)}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-50 dark:border-gray-700">
          <p className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>{t("revenue")} (USD)</p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(value: number) => [`$${value}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#22C55E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-50 dark:border-gray-700">
          <p className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>{t("categories")}</p>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                {categoryData.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1 mt-2">
            {categoryData.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                <span className="text-gray-600 dark:text-gray-400 flex-1" style={{ fontSize: "11px" }}>{c.name}</span>
                <span className="text-gray-800 dark:text-gray-200" style={{ fontSize: "11px", fontWeight: 600 }}>{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
