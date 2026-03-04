import { useTranslation } from "../translation-context";
import { useCurrency } from "../currency-context";
import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  UtensilsCrossed,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

const weeklyRevenue = [
  { day: "Mon", revenue: 320, orders: 45 },
  { day: "Tue", revenue: 480, orders: 62 },
  { day: "Wed", revenue: 370, orders: 50 },
  { day: "Thu", revenue: 580, orders: 78 },
  { day: "Fri", revenue: 740, orders: 95 },
  { day: "Sat", revenue: 850, orders: 110 },
  { day: "Sun", revenue: 690, orders: 88 },
];

const hourlyOrders = [
  { hour: "8AM", orders: 5 },
  { hour: "9AM", orders: 12 },
  { hour: "10AM", orders: 8 },
  { hour: "11AM", orders: 25 },
  { hour: "12PM", orders: 42 },
  { hour: "1PM", orders: 38 },
  { hour: "2PM", orders: 18 },
  { hour: "3PM", orders: 10 },
  { hour: "4PM", orders: 8 },
  { hour: "5PM", orders: 15 },
  { hour: "6PM", orders: 35 },
  { hour: "7PM", orders: 45 },
  { hour: "8PM", orders: 30 },
  { hour: "9PM", orders: 12 },
];

const recentActivity = [
  { action: "New order #1052", detail: "Table 5 - $24.50", time: "2 min ago", type: "order" },
  { action: "Payment received", detail: "Order #1049 - Cash $18.00", time: "8 min ago", type: "payment" },
  { action: "Staff clock-in", detail: "Dara Pich - Cashier", time: "15 min ago", type: "staff" },
  { action: "Menu item updated", detail: "Lok Lak - Price changed", time: "1 hr ago", type: "menu" },
  { action: "New order #1051", detail: "Grab - $12.50", time: "1 hr ago", type: "order" },
  { action: "Table reserved", detail: "Table 8 - 7:00 PM", time: "2 hr ago", type: "reservation" },
];

export function AdminDashboard() {
  const { lang, fontClass } = useTranslation();
  const { formatPrice } = useCurrency();

  const stats = [
    {
      label: lang === "km" ? "ចំណូលថ្ងៃនេះ" : "Today's Revenue",
      value: formatPrice(2050),
      change: "+12.5%",
      up: true,
      icon: <DollarSign size={20} />,
      color: "#22C55E",
    },
    {
      label: lang === "km" ? "ការបញ្ជា" : "Orders Today",
      value: "84",
      change: "+8.3%",
      up: true,
      icon: <ShoppingBag size={20} />,
      color: "#3B82F6",
    },
    {
      label: lang === "km" ? "អតិថិជន" : "Customers",
      value: "56",
      change: "-2.1%",
      up: false,
      icon: <Users size={20} />,
      color: "#A855F7",
    },
    {
      label: lang === "km" ? "មធ្យមបញ្ជា" : "Avg Order",
      value: formatPrice(24.4),
      change: "+5.7%",
      up: true,
      icon: <TrendingUp size={20} />,
      color: "#F59E0B",
    },
  ];

  const topItems = [
    { name: "Lok Lak", sold: 28, revenue: 154 },
    { name: "Fish Amok", sold: 22, revenue: 132 },
    { name: "Kuy Teav", sold: 19, revenue: 66.5 },
    { name: "Bai Sach Chrouk", sold: 17, revenue: 59.5 },
    { name: "Sugarcane Juice", sold: 35, revenue: 52.5 },
  ];

  return (
    <div className={`p-6 space-y-6 ${fontClass}`}>
      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}12`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <div
                className={`flex items-center gap-0.5 px-2 py-1 rounded-lg ${
                  stat.up
                    ? "bg-green-50 dark:bg-green-900/20 text-green-600"
                    : "bg-red-50 dark:bg-red-900/20 text-red-500"
                }`}
                style={{ fontSize: "11px", fontWeight: 600 }}
              >
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.change}
              </div>
            </div>
            <p className="text-gray-900 dark:text-white" style={{ fontSize: "24px", fontWeight: 700 }}>
              {stat.value}
            </p>
            <p className="text-gray-400 mt-0.5" style={{ fontSize: "12px" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Weekly revenue */}
        <div className="lg:col-span-3 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>
              {lang === "km" ? "ចំណូលប្រចាំសប្ដាហ៍" : "Weekly Revenue"}
            </p>
            <span className="text-gray-400" style={{ fontSize: "12px" }}>
              {lang === "km" ? "៧ថ្ងៃចុងក្រោយ" : "Last 7 days"}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={weeklyRevenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v}`} />
              <Tooltip formatter={(value: number) => [`$${value}`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#22C55E" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly orders */}
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>
              <Clock size={14} className="inline mr-1.5 text-[#22C55E]" />
              {lang === "km" ? "ម៉ោងកំពូល" : "Peak Hours"}
            </p>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={hourlyOrders}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis dataKey="hour" tick={{ fontSize: 10 }} interval={1} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="orders" stroke="#3B82F6" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Top selling items */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2 mb-4">
            <UtensilsCrossed size={16} className="text-[#22C55E]" />
            <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>
              {lang === "km" ? "មុខទំនិញលក់ដាច់បំផុត" : "Top Selling Items"}
            </p>
          </div>
          <div className="space-y-3">
            {topItems.map((item, i) => (
              <div key={item.name} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 ${
                    i === 0
                      ? "bg-yellow-400"
                      : i === 1
                        ? "bg-gray-400"
                        : i === 2
                          ? "bg-amber-600"
                          : "bg-gray-200 dark:bg-gray-700 !text-gray-500"
                  }`}
                  style={{ fontSize: "11px", fontWeight: 700 }}
                >
                  {i + 1}
                </span>
                <span className="text-gray-700 dark:text-gray-300 flex-1" style={{ fontSize: "13px", fontWeight: 500 }}>
                  {item.name}
                </span>
                <span className="text-gray-400" style={{ fontSize: "12px" }}>
                  {item.sold} {lang === "km" ? "ខ្នាត" : "sold"}
                </span>
                <span className="text-[#22C55E]" style={{ fontSize: "13px", fontWeight: 600 }}>
                  {formatPrice(item.revenue)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "15px", fontWeight: 600 }}>
            {lang === "km" ? "សកម្មភាពថ្មីៗ" : "Recent Activity"}
          </p>
          <div className="space-y-3">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                    a.type === "order"
                      ? "bg-blue-400"
                      : a.type === "payment"
                        ? "bg-green-400"
                        : a.type === "staff"
                          ? "bg-purple-400"
                          : a.type === "menu"
                            ? "bg-yellow-400"
                            : "bg-gray-400"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-700 dark:text-gray-300" style={{ fontSize: "13px", fontWeight: 500 }}>
                    {a.action}
                  </p>
                  <p className="text-gray-400 truncate" style={{ fontSize: "12px" }}>
                    {a.detail}
                  </p>
                </div>
                <span className="text-gray-400 shrink-0" style={{ fontSize: "11px" }}>
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
