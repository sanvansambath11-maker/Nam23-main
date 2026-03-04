import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";
import { motion } from "motion/react";

interface SplitBillModalProps {
  total: number;
  onClose: () => void;
}

export function SplitBillModal({ total, onClose }: SplitBillModalProps) {
  const { t, fontClass } = useTranslation();
  const { formatPrice, formatDual } = useCurrency();
  const [people, setPeople] = useState(2);
  const perPerson = total / people;
  const dualTotal = formatDual(total);
  const dualPer = formatDual(perPerson);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-gray-900 rounded-2xl w-full max-w-sm shadow-2xl p-5 ${fontClass}`}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-gray-900 dark:text-white" style={{ fontSize: "18px", fontWeight: 700 }}>{t("splitBill")}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="text-center mb-6">
          <p className="text-gray-400 mb-1" style={{ fontSize: "13px" }}>{t("total")}</p>
          <p className="text-gray-900 dark:text-white" style={{ fontSize: "28px", fontWeight: 700 }}>{dualTotal.usd}</p>
          <p className="text-[#22C55E]" style={{ fontSize: "14px", fontWeight: 600 }}>{dualTotal.khr}</p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
          <p className="text-gray-500 text-center mb-3" style={{ fontSize: "13px", fontWeight: 500 }}>{t("numPeople")}</p>
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={() => setPeople(Math.max(2, people - 1))}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow flex items-center justify-center hover:bg-gray-50"
            >
              <Minus size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-gray-900 dark:text-white" style={{ fontSize: "32px", fontWeight: 700 }}>{people}</span>
            <button
              onClick={() => setPeople(people + 1)}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-700 shadow flex items-center justify-center hover:bg-gray-50"
            >
              <Plus size={16} className="text-gray-600 dark:text-gray-300" />
            </button>
          </div>
        </div>

        <div className="bg-[#22C55E]/10 rounded-xl p-4 text-center">
          <p className="text-[#22C55E] mb-1" style={{ fontSize: "12px", fontWeight: 500 }}>{t("perPerson")}</p>
          <p className="text-[#22C55E]" style={{ fontSize: "28px", fontWeight: 700 }}>{dualPer.usd}</p>
          <p className="text-green-600" style={{ fontSize: "13px", fontWeight: 500 }}>{dualPer.khr}</p>
        </div>
      </motion.div>
    </div>
  );
}