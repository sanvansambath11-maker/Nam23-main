import { Clock, ChefHat, CheckCircle, Truck } from "lucide-react";
import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";

interface Order {
  table: string;
  color: string;
  customer: string;
  statusKey: string;
  statusColor: string;
  items: number;
  platform?: "grab" | "foodpanda" | null;
  phone?: string;
}

const orders: Order[] = [
  { table: "T6", color: "#EF4444", customer: "Sarah M.", statusKey: "ready", statusColor: "#22C55E", items: 3 },
  { table: "T7", color: "#3B82F6", customer: "Mike R.", statusKey: "inProgress", statusColor: "#F59E0B", items: 2 },
  { table: "GR", color: "#00B14F", customer: "Grab #2847", statusKey: "inKitchen", statusColor: "#EF4444", items: 4, platform: "grab", phone: "+855 12 345 678" },
  { table: "FP", color: "#D70F64", customer: "FoodPanda #391", statusKey: "inProgress", statusColor: "#F59E0B", items: 1, platform: "foodpanda", phone: "+855 96 789 012" },
  { table: "T9", color: "#EAB308", customer: "Tom W.", statusKey: "inProgress", statusColor: "#F59E0B", items: 1 },
];

const statusIcons: Record<string, React.ReactNode> = {
  ready: <CheckCircle size={12} />,
  inProgress: <Clock size={12} />,
  inKitchen: <ChefHat size={12} />,
};

const platformBadges: Record<string, { bg: string; text: string; label: string }> = {
  grab: { bg: "bg-[#00B14F]", text: "text-white", label: "Grab" },
  foodpanda: { bg: "bg-[#D70F64]", text: "text-white", label: "FoodPanda" },
};

export function OrderList() {
  const { t, fontClass } = useTranslation();

  return (
    <div className={`mb-6 ${fontClass}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>{t("orderList")}</h3>
        <button className="text-[#22C55E]" style={{ fontSize: "12px", fontWeight: 500 }}>{t("viewAll")}</button>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {orders.map((order, idx) => (
          <div
            key={`${order.table}-${idx}`}
            className="bg-white dark:bg-gray-800 rounded-xl p-3 min-w-[170px] shadow-sm border border-gray-50 dark:border-gray-700 hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: order.color, fontSize: "11px", fontWeight: 700 }}
              >
                {order.platform ? <Truck size={14} /> : order.table}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-gray-800 dark:text-gray-200 truncate" style={{ fontSize: "13px", fontWeight: 600, lineHeight: "1.2" }}>{order.customer}</p>
                <p className="text-gray-400" style={{ fontSize: "11px", lineHeight: "1.2" }}>{order.items} {t("items")}</p>
              </div>
            </div>
            {order.platform && (
              <div className="flex items-center gap-1.5 mb-2">
                <span className={`${platformBadges[order.platform].bg} ${platformBadges[order.platform].text} px-1.5 py-0.5 rounded-md`} style={{ fontSize: "9px", fontWeight: 700 }}>
                  {platformBadges[order.platform].label}
                </span>
                {order.phone && (
                  <span className="text-gray-400 truncate" style={{ fontSize: "9px" }}>{order.phone}</span>
                )}
              </div>
            )}
            <div
              className="flex items-center gap-1 px-2 py-1 rounded-full w-fit"
              style={{
                backgroundColor: `${order.statusColor}15`,
                color: order.statusColor,
                fontSize: "11px",
                fontWeight: 500,
              }}
            >
              {statusIcons[order.statusKey]}
              {t(order.statusKey)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
