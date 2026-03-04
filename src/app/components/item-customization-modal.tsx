import { useState } from "react";
import { X, Flame, Plus, Minus } from "lucide-react";
import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";
import { motion } from "motion/react";
import type { MenuItem, MenuItemSize, MenuItemAddOn } from "./menu-grid";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface ItemCustomizationModalProps {
  item: MenuItem;
  onClose: () => void;
  onAdd: (item: MenuItem, quantity: number, modifications: string[], notes: string) => void;
}

const defaultAddOns: MenuItemAddOn[] = [
  { key: "extraEgg", en: "Extra Egg", km: "\u1794\u1793\u17D2\u1790\u17C2\u1798\u1796\u1784\u1798\u17B6\u1793\u17CB", price: 0.50 },
  { key: "extraRice", en: "Extra Rice", km: "\u1794\u1793\u17D2\u1790\u17C2\u1798\u1794\u17B6\u1799", price: 0.50 },
  { key: "extraVeg", en: "Extra Vegetables", km: "\u1794\u1793\u17D2\u1790\u17C2\u1798\u1794\u1793\u17D2\u179B\u17C2", price: 0.75 },
  { key: "extraMeat", en: "Extra Meat", km: "\u1794\u1793\u17D2\u1790\u17C2\u1798\u179F\u17B6\u1785\u17CB", price: 1.50 },
  { key: "extraSauce", en: "Extra Sauce", km: "\u1794\u1793\u17D2\u1790\u17C2\u1798\u1791\u17B9\u1780\u1787\u17D2\u179A\u17B6\u1794\u17CB", price: 0.25 },
];

const spiceLevels = [
  { level: 0, en: "No Spice", km: "\u1798\u17B7\u1793\u17A0\u17B7\u179A", emoji: "" },
  { level: 1, en: "Mild", km: "\u17A0\u17B7\u179A\u178F\u17B7\u1785", emoji: "\u{1F336}" },
  { level: 2, en: "Medium", km: "\u17A0\u17B7\u179A\u1798\u1792\u17D2\u1799\u1798", emoji: "\u{1F336}\u{1F336}" },
  { level: 3, en: "Hot", km: "\u17A0\u17B7\u179A\u1785\u17D2\u179A\u17BE\u1793", emoji: "\u{1F336}\u{1F336}\u{1F336}" },
  { level: 4, en: "Extra Hot", km: "\u17A0\u17B7\u179A\u1781\u17D2\u179B\u17B6\u17C6\u1784", emoji: "\u{1F525}\u{1F525}" },
];

const defaultPortionSizes: MenuItemSize[] = [
  { key: "S", en: "Small", km: "\u178F\u17BC\u1785", priceMod: -1.00 },
  { key: "M", en: "Medium", km: "\u1798\u1792\u17D2\u1799\u1798", priceMod: 0 },
  { key: "L", en: "Large", km: "\u1792\u17C6", priceMod: 2.00 },
];

export function ItemCustomizationModal({ item, onClose, onAdd }: ItemCustomizationModalProps) {
  const { t, lang, fontClass } = useTranslation();
  const { formatPrice } = useCurrency();

  const portionSizes = item.sizes ?? defaultPortionSizes;
  const addOns = item.addOns ?? defaultAddOns;
  const showSpice = item.hasSpice !== false;

  const defaultPortion = portionSizes.find((p) => p.priceMod === 0)?.key ?? portionSizes[0]?.key ?? "";

  const [quantity, setQuantity] = useState(1);
  const [spice, setSpice] = useState(1);
  const [portion, setPortion] = useState(defaultPortion);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [notes, setNotes] = useState("");

  const portionMod = portionSizes.find((p) => p.key === portion)?.priceMod ?? 0;
  const addOnTotal = addOns.filter((a) => selectedAddOns.includes(a.key)).reduce((s, a) => s + a.price, 0);
  const unitPrice = item.price + portionMod + addOnTotal;
  const totalPrice = unitPrice * quantity;

  const toggleAddOn = (key: string) => {
    setSelectedAddOns((prev) => prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]);
  };

  const handleAdd = () => {
    const mods: string[] = [];
    if (showSpice) {
      const spiceLabel = spiceLevels[spice];
      if (spice > 0) mods.push(lang === "km" ? spiceLabel.km : spiceLabel.en);
    }
    if (portionSizes.length > 0) {
      const portionLabel = portionSizes.find((p) => p.key === portion);
      if (portion !== defaultPortion && portionLabel) mods.push(lang === "km" ? portionLabel.km : portionLabel.en);
    }
    selectedAddOns.forEach((key) => {
      const addon = addOns.find((a) => a.key === key);
      if (addon) mods.push(lang === "km" ? addon.km : addon.en);
    });
    onAdd({ ...item, price: unitPrice }, quantity, mods, notes);
    onClose();
  };

  const displayName = lang === "km" ? item.nameKm : item.name;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] overflow-y-auto ${fontClass}`}
      >
        {/* Item image header */}
        <div className="relative h-40 overflow-hidden rounded-t-2xl">
          <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 bg-black/40 backdrop-blur rounded-full flex items-center justify-center hover:bg-black/60"
          >
            <X size={16} className="text-white" />
          </button>
          <div className="absolute bottom-3 left-4">
            <p className="text-white" style={{ fontSize: "18px", fontWeight: 700 }}>{displayName}</p>
            {lang === "km" && <p className="text-white/70" style={{ fontSize: "12px" }}>{item.name}</p>}
          </div>
        </div>

        <div className="p-4 space-y-5">
          {/* Portion Size */}
          {portionSizes.length > 0 && (
            <div>
              <p className="text-gray-700 dark:text-gray-200 mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>
                {lang === "km" ? "\u1791\u17C6\u17A0\u17C6\u1781\u17BC\u1785" : "Portion Size"}
              </p>
              <div className={`grid gap-2`} style={{ gridTemplateColumns: `repeat(${Math.min(portionSizes.length, 4)}, 1fr)` }}>
                {portionSizes.map((p) => (
                  <button
                    key={p.key}
                    onClick={() => setPortion(p.key)}
                    className={`py-2.5 rounded-xl border-2 transition-all ${
                      portion === p.key
                        ? "border-[#22C55E] bg-green-50 dark:bg-green-900/20"
                        : "border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    <p className={`${portion === p.key ? "text-[#22C55E]" : "text-gray-700 dark:text-gray-300"}`} style={{ fontSize: "14px", fontWeight: 600 }}>
                      {p.key}
                    </p>
                    <p className="text-gray-400" style={{ fontSize: "10px" }}>
                      {lang === "km" ? p.km : p.en}
                    </p>
                    <p className={`${portion === p.key ? "text-[#22C55E]" : "text-gray-400"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
                      {p.priceMod === 0 ? "" : p.priceMod > 0 ? `+${formatPrice(p.priceMod)}` : `-${formatPrice(Math.abs(p.priceMod))}`}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Spice Level */}
          {showSpice && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Flame size={14} className="text-red-500" />
                <p className="text-gray-700 dark:text-gray-200" style={{ fontSize: "13px", fontWeight: 600 }}>
                  {lang === "km" ? "\u1780\u1798\u17D2\u179A\u17B7\u178F\u17A0\u17B7\u179A" : "Spice Level"}
                </p>
              </div>
              <div className="flex gap-1.5">
                {spiceLevels.map((s) => (
                  <button
                    key={s.level}
                    onClick={() => setSpice(s.level)}
                    className={`flex-1 py-2 rounded-xl border-2 transition-all text-center ${
                      spice === s.level
                        ? "border-red-400 bg-red-50 dark:bg-red-900/20"
                        : "border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    <p style={{ fontSize: "14px" }}>{s.emoji || "\u26AA"}</p>
                    <p className="text-gray-500" style={{ fontSize: "9px", fontWeight: 500 }}>
                      {lang === "km" ? s.km : s.en}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons */}
          {addOns.length > 0 && (
            <div>
              <p className="text-gray-700 dark:text-gray-200 mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>
                {lang === "km" ? "\u1794\u1793\u17D2\u1790\u17C2\u1798" : "Add-ons"}
              </p>
              <div className="space-y-2">
                {addOns.map((addon) => {
                  const selected = selectedAddOns.includes(addon.key);
                  return (
                    <button
                      key={addon.key}
                      onClick={() => toggleAddOn(addon.key)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl border-2 transition-all ${
                        selected
                          ? "border-[#22C55E] bg-green-50 dark:bg-green-900/20"
                          : "border-gray-100 dark:border-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                          selected ? "bg-[#22C55E] border-[#22C55E]" : "border-gray-300 dark:border-gray-600"
                        }`}>
                          {selected && <span className="text-white" style={{ fontSize: "12px" }}>&#10003;</span>}
                        </div>
                        <span className="text-gray-700 dark:text-gray-300" style={{ fontSize: "13px", fontWeight: 500 }}>
                          {lang === "km" ? addon.km : addon.en}
                        </span>
                      </div>
                      <span className="text-[#22C55E]" style={{ fontSize: "12px", fontWeight: 600 }}>
                        +{formatPrice(addon.price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <p className="text-gray-700 dark:text-gray-200 mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>
              {lang === "km" ? "\u1780\u17C6\u178E\u178F\u17CB\u1785\u17C6\u178E\u17B6\u17C6" : "Special Notes"}
            </p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={lang === "km" ? "\u1794\u1793\u17D2\u1790\u17C2\u1798\u1780\u17C6\u178E\u178F\u17CB..." : "Add special instructions..."}
              className="w-full p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border-none outline-none text-gray-700 dark:text-gray-300 resize-none"
              style={{ fontSize: "13px" }}
              rows={2}
            />
          </div>

          {/* Quantity + Add button */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-xl">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-l-xl transition-colors"
              >
                <Minus size={16} className="text-gray-500" />
              </button>
              <span className="w-10 text-center text-gray-900 dark:text-white" style={{ fontSize: "16px", fontWeight: 700 }}>{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 rounded-r-xl transition-colors"
              >
                <Plus size={16} className="text-gray-500" />
              </button>
            </div>
            <button
              onClick={handleAdd}
              className="flex-1 py-3 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 dark:shadow-green-900 active:scale-[0.98]"
              style={{ fontSize: "14px", fontWeight: 700 }}
            >
              {t("addToOrder")} &bull; {formatPrice(totalPrice)}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
