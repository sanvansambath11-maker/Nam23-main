import { X, Banknote, CreditCard, QrCode, CheckCircle, Smartphone, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "./translation-context";
import { useCurrency } from "./currency-context";
import { motion } from "motion/react";
import { toast } from "sonner";

interface PaymentModalProps {
  total: number;
  onClose: () => void;
  onSuccess: () => void;
}

type PayMethod = "cash" | "khqr" | "aba" | "acleda" | "wing" | "pipay" | "truemoney" | "bakong" | "card";

const bankingApps: { key: PayMethod; label: string; color: string; abbr: string }[] = [
  { key: "aba", label: "ABA Pay", color: "#003D6B", abbr: "ABA" },
  { key: "acleda", label: "ACLEDA", color: "#00529B", abbr: "AC" },
  { key: "wing", label: "Wing", color: "#F7941D", abbr: "W" },
  { key: "pipay", label: "Pi Pay", color: "#E31E25", abbr: "Pi" },
  { key: "truemoney", label: "True Money", color: "#FF6600", abbr: "TM" },
  { key: "bakong", label: "Bakong", color: "#0066B3", abbr: "BK" },
];

export function PaymentModal({ total, onClose, onSuccess }: PaymentModalProps) {
  const { t, fontClass } = useTranslation();
  const { formatPrice, formatDual, roundKHR, khrRate } = useCurrency();
  const [method, setMethod] = useState<PayMethod>("cash");
  const [paid, setPaid] = useState(false);
  const [cashReceived, setCashReceived] = useState("");

  const dual = formatDual(total);
  const totalKHR = roundKHR(total * khrRate);
  const cashNum = parseFloat(cashReceived) || 0;
  const changeUSD = cashNum - total;
  const changeKHR = roundKHR(changeUSD * khrRate);

  const handleConfirm = () => {
    setPaid(true);
    toast.success(t("sentToTelegram"), { duration: 2000, icon: "📱" });
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className={`bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto ${fontClass}`}
      >
        <div className="p-5 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <h2 className="text-gray-900 dark:text-white" style={{ fontSize: "18px", fontWeight: 700 }}>{t("payment")}</h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={18} className="text-gray-400" />
          </button>
        </div>

        <div className="p-5">
          {paid ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center py-8">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
                <CheckCircle size={40} className="text-[#22C55E]" />
              </div>
              <p className="text-gray-900 dark:text-white mb-2" style={{ fontSize: "18px", fontWeight: 700 }}>{t("paymentSuccess")}</p>
              <p className="text-[#22C55E]" style={{ fontSize: "28px", fontWeight: 700 }}>{dual.usd}</p>
              <p className="text-gray-400" style={{ fontSize: "14px" }}>{dual.khr}</p>
              {method === "cash" && changeUSD > 0 && (
                <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl px-4 py-3 text-center">
                  <p className="text-amber-600" style={{ fontSize: "12px", fontWeight: 500 }}>{t("change")}</p>
                  <p className="text-amber-700" style={{ fontSize: "20px", fontWeight: 700 }}>${changeUSD.toFixed(2)}</p>
                  <p className="text-amber-500" style={{ fontSize: "11px" }}>{t("changeKHR")}: {changeKHR.toLocaleString()}{"\u17DB"} ({t("rounded")})</p>
                </div>
              )}
            </motion.div>
          ) : (
            <>
              {/* Total display with dual currency */}
              <div className="text-center mb-5 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
                <p className="text-gray-400 mb-1" style={{ fontSize: "13px" }}>{t("total")}</p>
                <p className="text-gray-900 dark:text-white" style={{ fontSize: "32px", fontWeight: 700 }}>{dual.usd}</p>
                <p className="text-[#22C55E]" style={{ fontSize: "16px", fontWeight: 600 }}>{dual.khr}</p>
                <p className="text-gray-400 mt-1" style={{ fontSize: "10px" }}>$1 = 4,100{"\u17DB"}</p>
              </div>

              {/* Primary payment methods */}
              <p className="text-gray-600 dark:text-gray-300 mb-2" style={{ fontSize: "13px", fontWeight: 600 }}>{t("paymentMethod")}</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => setMethod("cash")}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                    method === "cash" ? "border-[#22C55E] bg-green-50 dark:bg-green-900/20 text-[#22C55E]" : "border-gray-100 dark:border-gray-700 text-gray-500"
                  }`}
                >
                  <Banknote size={20} />
                  <span style={{ fontSize: "11px", fontWeight: 600 }}>{t("cash")}</span>
                </button>
                <button
                  onClick={() => setMethod("khqr")}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                    method === "khqr" ? "border-[#22C55E] bg-green-50 dark:bg-green-900/20 text-[#22C55E]" : "border-gray-100 dark:border-gray-700 text-gray-500"
                  }`}
                >
                  <QrCode size={20} />
                  <span style={{ fontSize: "11px", fontWeight: 600 }}>KHQR</span>
                </button>
                <button
                  onClick={() => setMethod("card")}
                  className={`p-3 rounded-xl border-2 flex flex-col items-center gap-1.5 transition-all ${
                    method === "card" ? "border-[#22C55E] bg-green-50 dark:bg-green-900/20 text-[#22C55E]" : "border-gray-100 dark:border-gray-700 text-gray-500"
                  }`}
                >
                  <CreditCard size={20} />
                  <span style={{ fontSize: "11px", fontWeight: 600 }}>{t("card")}</span>
                </button>
              </div>

              {/* Cambodia Mobile Banking Apps */}
              <p className="text-gray-500 mb-2" style={{ fontSize: "11px", fontWeight: 600 }}>Mobile Banking</p>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {bankingApps.map((app) => (
                  <button
                    key={app.key}
                    onClick={() => setMethod(app.key)}
                    className={`p-2.5 rounded-xl border-2 flex items-center gap-2 transition-all ${
                      method === app.key ? "border-[#22C55E] bg-green-50 dark:bg-green-900/20" : "border-gray-100 dark:border-gray-700"
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white shrink-0"
                      style={{ backgroundColor: app.color, fontSize: "9px", fontWeight: 700 }}
                    >
                      {app.abbr}
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 truncate" style={{ fontSize: "11px", fontWeight: 500 }}>{app.label}</span>
                  </button>
                ))}
              </div>

              {/* Cash input for change calculation */}
              {method === "cash" && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4">
                  <p className="text-gray-500 mb-2" style={{ fontSize: "12px", fontWeight: 500 }}>{t("amountReceived")} (USD)</p>
                  <input
                    type="number"
                    value={cashReceived}
                    onChange={(e) => setCashReceived(e.target.value)}
                    placeholder="0.00"
                    className="w-full text-center bg-white dark:bg-gray-700 rounded-lg py-3 outline-none border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                    style={{ fontSize: "24px", fontWeight: 700 }}
                  />
                  {cashNum > total && (
                    <div className="mt-3 text-center">
                      <p className="text-gray-500" style={{ fontSize: "11px" }}>{t("change")}</p>
                      <p className="text-[#22C55E]" style={{ fontSize: "20px", fontWeight: 700 }}>${changeUSD.toFixed(2)}</p>
                      <p className="text-gray-400" style={{ fontSize: "11px" }}>
                        {t("changeKHR")}: {changeKHR.toLocaleString()}{"\u17DB"} ({t("rounded")})
                      </p>
                    </div>
                  )}
                  {/* Quick cash buttons */}
                  <div className="grid grid-cols-4 gap-2 mt-3">
                    {[5, 10, 20, 50].map((amt) => (
                      <button
                        key={amt}
                        onClick={() => setCashReceived(String(amt))}
                        className="py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:border-[#22C55E] transition-colors"
                        style={{ fontSize: "13px", fontWeight: 600 }}
                      >
                        ${amt}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* KHQR display */}
              {method === "khqr" && (
                <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-4 mb-4 text-center">
                  <div className="w-40 h-40 bg-white rounded-xl mx-auto mb-3 flex items-center justify-center border-2 border-blue-200">
                    <div className="text-center">
                      <QrCode size={80} className="text-gray-800 mx-auto mb-1" />
                      <p className="text-blue-600" style={{ fontSize: "10px", fontWeight: 700 }}>KHQR</p>
                    </div>
                  </div>
                  <p className="text-gray-500" style={{ fontSize: "11px" }}>Scan with any banking app</p>
                  <p className="text-gray-400" style={{ fontSize: "10px" }}>ABA | ACLEDA | Wing | Bakong | Pi Pay</p>
                </div>
              )}

              {/* Telegram notify option */}
              <div className="flex items-center gap-2 mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Send size={14} className="text-blue-500" />
                <span className="text-blue-600 dark:text-blue-400 flex-1" style={{ fontSize: "12px", fontWeight: 500 }}>{t("telegramNotify")}</span>
                <div className="w-8 h-5 bg-blue-500 rounded-full flex items-center justify-end px-0.5">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>

              <button
                onClick={handleConfirm}
                disabled={method === "cash" && cashNum < total}
                className="w-full py-3.5 bg-[#22C55E] text-white rounded-2xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 dark:shadow-green-900 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontSize: "15px", fontWeight: 700 }}
              >
                {t("confirmPayment")} {formatPrice(total)}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}
