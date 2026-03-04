import { useTranslation } from "../translation-context";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function WebFooter({ onNavigate }: FooterProps) {
  const { lang, fontClass } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);

  return (
    <footer className={`bg-gray-900 dark:bg-gray-950 text-gray-400 ${fontClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src="/images/logo.png" alt="Batto Club" className="h-10 w-10 rounded-xl object-cover" />
              <div>
                <span className="text-white" style={{ fontSize: "16px", fontWeight: 800 }}>Batto</span>
                <span className="text-[#22C55E] ml-0.5" style={{ fontSize: "16px", fontWeight: 800 }}>Club</span>
              </div>
            </div>
            <p style={{ fontSize: "13px", lineHeight: 1.7 }}>{l("Smart POS system built for Cambodian restaurants. Manage orders, staff, inventory, and more.", "ប្រព័ន្ធ POS ឆ្លាតវៃសម្រាប់ភោជនីយដ្ឋានកម្ពុជា។")}</p>
          </div>

          {/* Product */}
          <div>
            <p className="text-white mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>{l("Product", "ផលិតផល")}</p>
            <div className="space-y-2.5">
              {[
                { key: "features", en: "Features", km: "មុខងារ" },
                { key: "pricing", en: "Pricing", km: "តម្លៃ" },
                { key: "register", en: "Free Trial", km: "សាកល្បងឥតគិតថ្លៃ" },
              ].map((item) => (
                <button key={item.key} onClick={() => onNavigate(item.key)} className="block hover:text-[#22C55E] transition-colors" style={{ fontSize: "13px" }}>
                  {lang === "km" ? item.km : item.en}
                </button>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-white mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>{l("Company", "ក្រុមហ៊ុន")}</p>
            <div className="space-y-2.5">
              {[
                { key: "about", en: "About Us", km: "អំពីយើង" },
                { key: "contact", en: "Contact", km: "ទំនាក់ទំនង" },
              ].map((item) => (
                <button key={item.key} onClick={() => onNavigate(item.key)} className="block hover:text-[#22C55E] transition-colors" style={{ fontSize: "13px" }}>
                  {lang === "km" ? item.km : item.en}
                </button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-white mb-4" style={{ fontSize: "14px", fontWeight: 600 }}>{l("Contact Us", "ទំនាក់ទំនងយើង")}</p>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <Phone size={14} className="text-[#22C55E] shrink-0" />
                <span style={{ fontSize: "13px" }}>+855 12 345 678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <MessageCircle size={14} className="text-[#22C55E] shrink-0" />
                <span style={{ fontSize: "13px" }}>Telegram: @BattoClub</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={14} className="text-[#22C55E] shrink-0" />
                <span style={{ fontSize: "13px" }}>hello@battoclub.app</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={14} className="text-[#22C55E] shrink-0 mt-0.5" />
                <span style={{ fontSize: "13px" }}>{l("Phnom Penh, Cambodia", "ភ្នំពេញ កម្ពុជា")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: "12px" }}>&copy; {new Date().getFullYear()} Batto Club. {l("All rights reserved.", "រក្សាសិទ្ធិគ្រប់យ៉ាង។")}</p>
          <p style={{ fontSize: "12px" }}>{l("Made with", "ផលិតដោយ")} 💚 {l("in Cambodia", "នៅកម្ពុជា")}</p>
        </div>
      </div>
    </footer>
  );
}
