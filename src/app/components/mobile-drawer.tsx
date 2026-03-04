import { X, ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  itemCount: number;
  onToggle: () => void;
}

export function MobileDrawer({ isOpen, onClose, children, itemCount, onToggle }: MobileDrawerProps) {
  return (
    <>
      {/* Floating cart button for mobile */}
      <button
        onClick={onToggle}
        className="lg:hidden fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#22C55E] rounded-full flex items-center justify-center shadow-xl shadow-green-300 active:scale-95 transition-transform"
      >
        <ShoppingCart size={22} className="text-white" />
        {itemCount > 0 && (
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white" style={{ fontSize: "11px", fontWeight: 700 }}>{itemCount}</span>
          </div>
        )}
      </button>

      {/* Drawer overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={onClose}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-[85%] max-w-[380px] z-50 bg-white dark:bg-gray-900 shadow-2xl"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 z-10"
              >
                <X size={18} className="text-gray-400" />
              </button>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
