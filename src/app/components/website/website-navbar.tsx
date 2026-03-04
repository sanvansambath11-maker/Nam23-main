import { useState } from "react";
import { useTranslation } from "../translation-context";
import { useTheme } from "../theme-context";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";

interface WebNavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function WebNavbar({ currentPage, onNavigate }: WebNavbarProps) {
  const { lang, setLang, fontClass } = useTranslation();
  const { isDark, toggleDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const l = (en: string, km: string) => (lang === "km" ? km : en);

  const links = [
    { key: "home", en: "Home", km: "ទំព័រដើម" },
    { key: "features", en: "Features", km: "មុខងារ" },
    { key: "pricing", en: "Pricing", km: "តម្លៃ" },
    { key: "about", en: "About", km: "អំពី" },
    { key: "contact", en: "Contact", km: "ទំនាក់ទំនង" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => onNavigate("home")} className="flex items-center gap-2">
            <img src="/images/logo.png" alt="Batto Club" className="h-10 w-10 rounded-xl object-cover" />
            <div>
              <span className="text-gray-900 dark:text-white" style={{ fontSize: "16px", fontWeight: 800 }}>Batto</span>
              <span className="text-[#22C55E] ml-0.5" style={{ fontSize: "16px", fontWeight: 800 }}>Club</span>
              <p className="text-gray-400 -mt-1" style={{ fontSize: "9px", fontWeight: 500 }}>Restaurant POS</p>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className={`px-3.5 py-2 rounded-lg transition-all ${
                  currentPage === link.key
                    ? "text-[#22C55E] bg-[#22C55E]/5 font-semibold"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
                style={{ fontSize: "13px", fontWeight: currentPage === link.key ? 600 : 500 }}
              >
                {lang === "km" ? link.km : link.en}
              </button>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button onClick={toggleDark} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={() => setLang(lang === "en" ? "km" : "en")} className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <Globe size={16} />
            </button>

            <button onClick={() => onNavigate("login")} className="hidden md:block px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-[#22C55E] transition-colors" style={{ fontSize: "13px", fontWeight: 600 }}>
              {l("Login", "ចូល")}
            </button>
            <button onClick={() => onNavigate("register")} className="hidden md:block px-5 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-md shadow-green-200 dark:shadow-green-900" style={{ fontSize: "13px", fontWeight: 600 }}>
              {l("Start Free Trial", "ចាប់ផ្តើមឥតគិតថ្លៃ")}
            </button>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 px-4 py-3 space-y-1">
          {links.map((link) => (
            <button
              key={link.key}
              onClick={() => { onNavigate(link.key); setMobileOpen(false); }}
              className={`w-full text-left px-3 py-2.5 rounded-lg ${currentPage === link.key ? "text-[#22C55E] bg-[#22C55E]/5" : "text-gray-600 dark:text-gray-400"}`}
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              {lang === "km" ? link.km : link.en}
            </button>
          ))}
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
            <button onClick={() => { onNavigate("login"); setMobileOpen(false); }} className="w-full py-2.5 text-gray-700 dark:text-gray-300 rounded-lg border border-gray-200 dark:border-gray-700" style={{ fontSize: "13px", fontWeight: 600 }}>{l("Login", "ចូល")}</button>
            <button onClick={() => { onNavigate("register"); setMobileOpen(false); }} className="w-full py-2.5 bg-[#22C55E] text-white rounded-xl" style={{ fontSize: "13px", fontWeight: 600 }}>{l("Start Free Trial", "ចាប់ផ្តើមឥតគិតថ្លៃ")}</button>
          </div>
        </div>
      )}
    </nav>
  );
}
