import { UtensilsCrossed, Beef, CupSoda, Soup, Salad, Fish, Cookie, Flame } from "lucide-react";
import { useTranslation } from "./translation-context";

interface Category {
  key: string;
  icon: React.ReactNode;
  count: number;
}

const categories: Category[] = [
  { key: "allMenu", icon: <UtensilsCrossed size={18} />, count: 48 },
  { key: "khmer", icon: <Flame size={18} />, count: 14 },
  { key: "rice", icon: <Beef size={18} />, count: 10 },
  { key: "noodle", icon: <Soup size={18} />, count: 8 },
  { key: "drinks", icon: <CupSoda size={18} />, count: 6 },
  { key: "salad", icon: <Salad size={18} />, count: 5 },
  { key: "seafood", icon: <Fish size={18} />, count: 7 },
  { key: "dessert", icon: <Cookie size={18} />, count: 4 },
];

interface CategoriesProps {
  activeCategory: string;
  onCategoryChange: (key: string) => void;
}

export function Categories({ activeCategory, onCategoryChange }: CategoriesProps) {
  const { t, fontClass } = useTranslation();

  return (
    <div className={`mb-6 ${fontClass}`}>
      <h3 className="text-gray-900 dark:text-white mb-3" style={{ fontSize: "15px", fontWeight: 600 }}>{t("categories")}</h3>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => onCategoryChange(cat.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl shrink-0 transition-all border ${
              activeCategory === cat.key
                ? "bg-[#22C55E] text-white border-[#22C55E] shadow-lg shadow-green-200 dark:shadow-green-900"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-gray-100 dark:border-gray-700 hover:border-green-200 hover:shadow-sm"
            }`}
          >
            <span className={activeCategory === cat.key ? "text-white" : "text-gray-400"}>{cat.icon}</span>
            <span style={{ fontSize: "13px", fontWeight: 500 }}>{t(cat.key)}</span>
            <span
              className={`px-1.5 py-0.5 rounded-md ${
                activeCategory === cat.key ? "bg-white/20 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-400"
              }`}
              style={{ fontSize: "11px", fontWeight: 600 }}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
