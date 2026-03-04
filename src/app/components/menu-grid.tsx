import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Plus, Star } from "lucide-react";
import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";

export interface MenuItemSize {
  key: string;
  en: string;
  km: string;
  priceMod: number;
}

export interface MenuItemAddOn {
  key: string;
  en: string;
  km: string;
  price: number;
}

export interface MenuItem {
  id: number;
  name: string;
  nameKm: string;
  price: number;
  oldPrice?: number;
  image: string;
  discount?: number;
  recommended?: boolean;
  rating: number;
  category: string;
  sizes?: MenuItemSize[];
  addOns?: MenuItemAddOn[];
  hasSpice?: boolean;
  customizationEnabled?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    id: 1, name: "Lok Lak", nameKm: "\u179B\u17BB\u1780\u17A1\u17B6\u1780\u17CB",
    price: 5.50, oldPrice: 7.00,
    image: "https://images.unsplash.com/photo-1760504526069-ff0f8bf6e4ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWVmJTIwc3RpciUyMGZyeSUyMGFzaWFuJTIwcGVwcGVyfGVufDF8fHx8MTc3MjUwMzEwOXww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 20, recommended: true, rating: 4.9, category: "khmer",
  },
  {
    id: 2, name: "Fish Amok", nameKm: "\u17A2\u17B6\u1798\u17C9\u17BB\u1780\u178F\u17D2\u179A\u17B8",
    price: 6.00,
    image: "https://images.unsplash.com/photo-1767436093457-84ea9122eb4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoJTIwYW1vayUyMGNhbWJvZGlhbiUyMGN1cnJ5fGVufDF8fHx8MTc3MjUwMzEwNHww&ixlib=rb-4.1.0&q=80&w=1080",
    recommended: true, rating: 4.8, category: "khmer",
  },
  {
    id: 3, name: "Nom Banh Chok", nameKm: "\u1793\u17C6\u1794\u1789\u17D2\u1785\u17BB\u1780",
    price: 3.00,
    image: "https://images.unsplash.com/photo-1648003497161-d8317d2b7163?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1ib2RpYW4lMjByaWNlJTIwbm9vZGxlJTIwc291cHxlbnwxfHx8fDE3NzI1MDMxMDR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.7, category: "noodle",
  },
  {
    id: 4, name: "Bai Sach Chrouk", nameKm: "\u1794\u17B6\u1799\u179F\u17B6\u1785\u17CB\u1787\u17D2\u179A\u17BC\u1780",
    price: 3.50, oldPrice: 4.50,
    image: "https://images.unsplash.com/photo-1654333433211-608057c71603?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmlsbGVkJTIwcG9yayUyMHJpY2UlMjBjYW1ib2RpYXxlbnwxfHx8fDE3NzI1MDMxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 22, rating: 4.8, category: "rice",
  },
  {
    id: 5, name: "Samlor Korko", nameKm: "\u179F\u1798\u17D2\u179B\u1780\u1780\u17BC",
    price: 4.50,
    image: "https://images.unsplash.com/photo-1707270686208-5d1fc168dd7b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW1ib2RpYW4lMjB2ZWdldGFibGUlMjBzdGV3JTIwc291cHxlbnwxfHx8fDE3NzI1MDMxMDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    recommended: true, rating: 4.6, category: "khmer",
  },
  {
    id: 6, name: "Sugarcane Juice", nameKm: "\u1791\u17B9\u1780\u17A2\u17C6\u1796\u17BE",
    price: 1.50,
    image: "https://images.unsplash.com/photo-1708195992982-68e5420e089e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdWdhcmNhbmUlMjBqdWljZSUyMHRyb3BpY2FsJTIwZHJpbmt8ZW58MXx8fHwxNzcyNTAzMTA2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5, category: "drinks",
  },
  {
    id: 7, name: "Bai Cha", nameKm: "\u1794\u17B6\u1799\u1786\u17B6",
    price: 4.00, oldPrice: 5.00,
    image: "https://images.unsplash.com/photo-1648421714382-70d47442b354?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllZCUyMHJpY2UlMjBhc2lhbiUyMHBsYXRlfGVufDF8fHx8MTc3MjUwMzEwNnww&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 20, rating: 4.7, category: "rice",
  },
  {
    id: 8, name: "Num Ansom", nameKm: "\u1793\u17C6\u17A2\u1793\u17D2\u179F\u17C6",
    price: 2.50,
    image: "https://images.unsplash.com/photo-1582801205465-c0d029e85a1c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW5nbyUyMHN0aWNreSUyMHJpY2UlMjBkZXNzZXJ0fGVufDF8fHx8MTc3MjQ1NTI1N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.4, category: "dessert",
  },
  {
    id: 9, name: "Kuy Teav", nameKm: "\u1782\u17BB\u1799\u1791\u17B6\u179C",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1632898657999-ae6920976661?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb3VybWV0JTIwYnVyZ2VyJTIwcmVzdGF1cmFudHxlbnwxfHx8fDE3NzIzODk2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    recommended: true, rating: 4.9, category: "noodle",
  },
  {
    id: 10, name: "Fresh Orange Juice", nameKm: "\u1791\u17B9\u1780\u1780\u17D2\u179A\u17BC\u1785\u1790\u17D2\u179B\u17BB\u1784",
    price: 2.00,
    image: "https://images.unsplash.com/photo-1707569517904-92b134ff5f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG9yYW5nZSUyMGp1aWNlJTIwZHJpbmt8ZW58MXx8fHwxNzcyNDMwNTYwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.5, category: "drinks",
  },
  {
    id: 11, name: "Garden Fresh Salad", nameKm: "\u179F\u17B6\u17A1\u17B6\u178F\u179F\u17D2\u179A\u179F\u17CB",
    price: 3.50,
    image: "https://images.unsplash.com/photo-1644504439611-ddc302de87ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMGdyZWVuJTIwc2FsYWQlMjBib3dsfGVufDF8fHx8MTc3MjQ1OTQ4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    rating: 4.3, category: "salad",
  },
  {
    id: 12, name: "Grilled Fish", nameKm: "\u178F\u17D2\u179A\u17B8\u17A2\u17B6\u17C6\u1784",
    price: 8.00, oldPrice: 10.00,
    image: "https://images.unsplash.com/photo-1764183122524-974ccfb709fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHBsYXR0ZXIlMjBqYXBhbmVzZXxlbnwxfHx8fDE3NzI0MTIwNjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    discount: 20, rating: 4.6, category: "seafood",
  },
];

interface MenuGridProps {
  onAddItem: (item: MenuItem) => void;
  searchQuery: string;
  activeCategory: string;
  onCustomize?: (item: MenuItem) => void;
}

export function MenuGrid({ onAddItem, searchQuery, activeCategory, onCustomize }: MenuGridProps) {
  const { t, lang, fontClass } = useTranslation();
  const { formatPrice, formatDual } = useCurrency();

  const filtered = menuItems.filter((item) => {
    const searchName = lang === "km" ? item.nameKm : item.name;
    const matchesSearch = !searchQuery || item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.nameKm.includes(searchQuery);
    const matchesCat = activeCategory === "allMenu" || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className={fontClass}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>{t("specialMenu")}</h3>
        <button className="text-[#22C55E]" style={{ fontSize: "12px", fontWeight: 500 }}>{t("viewAll")}</button>
      </div>
      {filtered.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p style={{ fontSize: "14px" }}>{t("noResults")}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((item) => {
            const dual = formatDual(item.price);
            const displayName = lang === "km" ? item.nameKm : item.name;
            return (
              <div
                key={item.id}
                onClick={() => item.customizationEnabled === false ? onAddItem(item) : onCustomize?.(item)}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm border border-gray-50 dark:border-gray-700 hover:shadow-lg transition-all group cursor-pointer"
              >
                <div className="relative h-32 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.discount && (
                    <div
                      className="absolute top-2 left-2 bg-[#22C55E] text-white px-2 py-0.5 rounded-lg"
                      style={{ fontSize: "10px", fontWeight: 700 }}
                    >
                      {item.discount}% {t("off")}
                    </div>
                  )}
                  {item.recommended && (
                    <div
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-0.5 rounded-lg"
                      style={{ fontSize: "10px", fontWeight: 600 }}
                    >
                      {t("recommended")}
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <div className="flex items-center gap-1 mb-1">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-500" style={{ fontSize: "11px", fontWeight: 500 }}>{item.rating}</span>
                  </div>
                  <p className="text-gray-800 dark:text-gray-200 mb-0.5" style={{ fontSize: "13px", fontWeight: 600, lineHeight: "1.3" }}>{displayName}</p>
                  {lang === "km" && (
                    <p className="text-gray-400 mb-1" style={{ fontSize: "10px", lineHeight: "1.2" }}>{item.name}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[#22C55E]" style={{ fontSize: "15px", fontWeight: 700 }}>{formatPrice(item.price)}</span>
                        {item.oldPrice && (
                          <span className="text-gray-400 line-through" style={{ fontSize: "11px" }}>{formatPrice(item.oldPrice)}</span>
                        )}
                      </div>
                      <p className="text-gray-400" style={{ fontSize: "9px" }}>
                        {dual.usd} / {dual.khr}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); onAddItem(item); }}
                      className="w-7 h-7 bg-[#22C55E] rounded-lg flex items-center justify-center hover:bg-green-600 transition-colors shadow-md shadow-green-200 dark:shadow-green-900"
                    >
                      <Plus size={14} className="text-white" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}