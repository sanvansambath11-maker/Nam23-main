import { useTranslation } from "../translation-context";
import {
  ChefHat, ShoppingBag, Users, BarChart3, Package, Heart,
  Tag, Clock, Bell, Shield, HardDrive, Lock, ArrowRight,
  Star, Check, Zap, Globe2, Smartphone,
} from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const featureHighlights = [
  { icon: <ShoppingBag size={22} />, en: "Smart POS", km: "POS ឆ្លាតវៃ", descEn: "Fast ordering, split bills, receipt printing", descKm: "បញ្ជាលឿន បែងចែកវិក័យប័ត្រ បោះពុម្ពវិក័យប័ត្រ" },
  { icon: <Users size={22} />, en: "Staff Management", km: "គ្រប់គ្រងបុគ្គលិក", descEn: "Roles, shifts, PIN login, attendance", descKm: "តួនាទី វេន ចូលដោយ PIN វត្តមាន" },
  { icon: <BarChart3 size={22} />, en: "Advanced Reports", km: "របាយការណ៍កម្រិតខ្ពស់", descEn: "Sales, performance, PDF & CSV export", descKm: "ការលក់ ការអនុវត្ត ចេញ PDF និង CSV" },
  { icon: <Package size={22} />, en: "Inventory", km: "ស្តុក", descEn: "Stock tracking, low-stock alerts, suppliers", descKm: "តាមដានស្តុក ការជូនដំណឹង អ្នកផ្គត់ផ្គង់" },
  { icon: <Heart size={22} />, en: "Customer Loyalty", km: "ភាពស្មោះត្រង់អតិថិជន", descEn: "Points, VIP tiers, customer database", descKm: "ពិន្ទុ កម្រិត VIP មូលដ្ឋានទិន្នន័យ" },
  { icon: <Tag size={22} />, en: "Promotions", km: "ប្រូម៉ូសិន", descEn: "Coupon codes, happy hour, BOGO deals", descKm: "កូដបញ្ចុះតម្លៃ ម៉ោងរីករាយ ការផ្សព្វផ្សាយ" },
];

const stats = [
  { value: "13+", en: "Admin Features", km: "មុខងារគ្រប់គ្រង" },
  { value: "2", en: "Languages", km: "ភាសា" },
  { value: "24/7", en: "Always On", km: "ដំណើរការ​ជានិច្ច" },
  { value: "$9", en: "Starting Price", km: "តម្លៃចាប់ផ្តើម" },
];

const testimonials = [
  { name: "Chanthy S.", role: "Cafe Owner, BKK1", roleKm: "ម្ចាស់ហាងកាហ្វេ BKK1", text: "Batto Club transformed how we manage orders. Our staff loves the Khmer interface!", textKm: "Batto Club បានផ្លាស់ប្តូរការគ្រប់គ្រងបញ្ជារបស់យើង។ បុគ្គលិកចូលចិត្តចំណុចប្រទាក់ភាសាខ្មែរ!", rating: 5 },
  { name: "Rith P.", role: "Restaurant Manager", roleKm: "អ្នកគ្រប់គ្រងភោជនីយដ្ឋាន", text: "The inventory alerts save us from running out of ingredients. Best POS for Cambodia.", textKm: "ការជូនដំណឹងស្តុកជួយយើងពីការអស់គ្រឿងផ្សំ។ POS ល្អបំផុតសម្រាប់កម្ពុជា។", rating: 5 },
  { name: "Maly O.", role: "Food Court Owner", roleKm: "ម្ចាស់ Food Court", text: "Managing 3 vendors used to be chaotic. Now everything is organized in one place.", textKm: "ការគ្រប់គ្រង ៣ ហាងធ្លាប់ជារឿងចម្រូតពេក។ ឥឡូវអ្វីៗទាំងអស់រៀបចំក្នុងកន្លែងតែមួយ។", rating: 5 },
];

export function HomePage({ onNavigate }: HomePageProps) {
  const { lang } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/hero-bg.png" alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/50" />
        </div>

        <div className="max-w-5xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#22C55E]/20 text-[#22C55E] rounded-full mb-6 backdrop-blur-sm" style={{ fontSize: "12px", fontWeight: 600 }}>
            <Zap size={14} /> {l("Built for Cambodian Restaurants", "បង្កើតសម្រាប់ភោជនីយដ្ឋានកម្ពុជា")}
          </div>

          <h1 className="text-white mb-6" style={{ fontSize: "clamp(22px, 3.5vw, 36px)", fontWeight: 800, lineHeight: 1.6 }}>
            {l("Smart POS for", "POS ឆ្លាតវៃសម្រាប់")}
            <br />
            <span className="text-[#22C55E]">{l("Modern Restaurants", "ភោជនីយដ្ឋានទំនើប")}</span>
          </h1>

          <p className="text-gray-300 max-w-2xl mx-auto mb-10" style={{ fontSize: "17px", lineHeight: 1.7 }}>
            {l(
              "Manage orders, staff, inventory, customers, and reports — all in one beautiful app. Khmer & English. USD & KHR.",
              "គ្រប់គ្រងបញ្ជា បុគ្គលិក ស្តុក អតិថិជន និងរបាយការណ៍ — ក្នុងកម្មវិធីស្អាតមួយ។ ខ្មែរ និង English។ USD និង KHR។"
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => onNavigate("register")} className="px-8 py-3.5 bg-[#22C55E] text-white rounded-2xl hover:bg-green-600 transition-all shadow-lg shadow-green-200 dark:shadow-green-900 flex items-center gap-2" style={{ fontSize: "15px", fontWeight: 700 }}>
              {l("Start Free Trial", "ចាប់ផ្តើមឥតគិតថ្លៃ")} <ArrowRight size={18} />
            </button>
            <button onClick={() => onNavigate("features")} className="px-8 py-3.5 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all border border-white/20 backdrop-blur-sm" style={{ fontSize: "15px", fontWeight: 600 }}>
              {l("View Features", "មើលមុខងារ")}
            </button>
          </div>

          {/* Key highlights */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            {[
              { icon: <Globe2 size={14} />, text: l("Khmer + English", "ខ្មែរ + English") },
              { icon: <Smartphone size={14} />, text: l("Mobile Friendly", "សម្រាប់ទូរសព្ទ") },
              { icon: <Shield size={14} />, text: l("Role-Based Access", "ការចូលតាមតួនាទី") },
            ].map((h, i) => (
              <div key={i} className="flex items-center gap-1.5 text-gray-400" style={{ fontSize: "13px" }}>{h.icon} {h.text}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-[#22C55E]" style={{ fontSize: "36px", fontWeight: 800 }}>{s.value}</p>
              <p className="text-gray-500" style={{ fontSize: "13px", fontWeight: 500 }}>{lang === "km" ? s.km : s.en}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#22C55E] mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>{l("FEATURES", "មុខងារ")}</p>
            <h2 className="text-gray-900 dark:text-white" style={{ fontSize: "32px", fontWeight: 800 }}>{l("Everything You Need", "អ្វីគ្រប់យ៉ាងដែលអ្នកត្រូវការ")}</h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto" style={{ fontSize: "15px" }}>{l("From taking orders to managing your whole restaurant — Batto Club has it all.", "ពីការទទួលបញ្ជាដល់ការគ្រប់គ្រងភោជនីយដ្ឋានទាំងមូល — Batto Club មានទាំងអស់។")}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featureHighlights.map((f, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-xl hover:border-[#22C55E]/20 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center mb-4 group-hover:bg-[#22C55E] group-hover:text-white transition-colors">{f.icon}</div>
                <h3 className="text-gray-900 dark:text-white mb-1.5" style={{ fontSize: "16px", fontWeight: 700 }}>{lang === "km" ? f.km : f.en}</h3>
                <p className="text-gray-500" style={{ fontSize: "13px", lineHeight: 1.6 }}>{lang === "km" ? f.descKm : f.descEn}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <button onClick={() => onNavigate("features")} className="px-6 py-2.5 text-[#22C55E] border border-[#22C55E]/30 rounded-xl hover:bg-[#22C55E]/5 transition-colors" style={{ fontSize: "14px", fontWeight: 600 }}>
              {l("See All 13+ Features", "មើលមុខងារ 13+ ទាំងអស់")} →
            </button>
          </div>
        </div>
      </section>

      {/* Pricing preview */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#22C55E] mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>{l("PRICING", "តម្លៃ")}</p>
          <h2 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "32px", fontWeight: 800 }}>{l("Simple, Affordable Plans", "គម្រោងតម្លៃសមរម្យ")}</h2>
          <p className="text-gray-500 mb-12" style={{ fontSize: "15px" }}>{l("Start free, upgrade when you grow", "ចាប់ផ្តើមឥតគិតថ្លៃ ដំឡើងពេលអ្នកលូតលាស់")}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "Basic", nameKm: "មូលដ្ឋាន", price: 9, features: ["5 Staff", "POS + Menu", "Basic Reports"], featuresKm: ["បុគ្គលិក ៥", "POS + ម៉ឺន", "របាយការណ៍មូលដ្ឋាន"] },
              { name: "Pro", nameKm: "វិជ្ជាជីវៈ", price: 19, features: ["Unlimited Staff", "All Features", "Advanced Reports", "Inventory & CRM"], featuresKm: ["បុគ្គលិកគ្មានកំណត់", "មុខងារទាំងអស់", "របាយការណ៍កម្រិតខ្ពស់", "ស្តុក និង CRM"], popular: true },
              { name: "Enterprise", nameKm: "សហគ្រាស", price: 39, features: ["Everything in Pro", "Custom Roles", "API Access", "Priority Support"], featuresKm: ["គ្រប់យ៉ាងក្នុង Pro", "តួនាទីផ្ទាល់ខ្លួន", "API Access", "ជំនួយអាទិភាព"] },
            ].map((plan, i) => (
              <div key={i} className={`bg-white dark:bg-gray-900 rounded-2xl border p-7 text-left relative ${(plan as { popular?: boolean }).popular ? "border-[#22C55E] shadow-xl shadow-green-100 dark:shadow-green-900/20" : "border-gray-100 dark:border-gray-800"}`}>
                {(plan as { popular?: boolean }).popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#22C55E] text-white rounded-full" style={{ fontSize: "11px", fontWeight: 600 }}>{l("Most Popular", "ពេញនិយមបំផុត")}</span>
                )}
                <p className="text-gray-900 dark:text-white" style={{ fontSize: "18px", fontWeight: 700 }}>{lang === "km" ? plan.nameKm : plan.name}</p>
                <p className="mt-2"><span className="text-gray-900 dark:text-white" style={{ fontSize: "36px", fontWeight: 800 }}>${plan.price}</span><span className="text-gray-400" style={{ fontSize: "14px" }}>/{l("month", "ខែ")}</span></p>
                <ul className="mt-5 space-y-2.5">
                  {(lang === "km" ? plan.featuresKm : plan.features).map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-600 dark:text-gray-400" style={{ fontSize: "13px" }}><Check size={14} className="text-[#22C55E] shrink-0" /> {f}</li>
                  ))}
                </ul>
                <button onClick={() => onNavigate("register")} className={`w-full mt-6 py-2.5 rounded-xl transition-colors ${(plan as { popular?: boolean }).popular ? "bg-[#22C55E] text-white hover:bg-green-600 shadow-md" : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"}`} style={{ fontSize: "13px", fontWeight: 600 }}>
                  {l("Get Started", "ចាប់ផ្តើម")}
                </button>
              </div>
            ))}
          </div>
          <button onClick={() => onNavigate("pricing")} className="mt-8 text-[#22C55E] hover:underline" style={{ fontSize: "14px", fontWeight: 600 }}>{l("Compare all plans", "ប្រៀបធៀបគម្រោងទាំងអស់")} →</button>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-[#22C55E] mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>{l("TESTIMONIALS", "ការលើកសរសើរ")}</p>
            <h2 className="text-gray-900 dark:text-white" style={{ fontSize: "32px", fontWeight: 800 }}>{l("Loved by Restaurants", "ដែលភោជនីយដ្ឋានចូលចិត្ត")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <div className="flex gap-0.5 mb-3">{Array.from({ length: t.rating }).map((_, j) => <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-gray-600 dark:text-gray-400 mb-4" style={{ fontSize: "14px", lineHeight: 1.7, fontStyle: "italic" }}>"{lang === "km" ? t.textKm : t.text}"</p>
                <div>
                  <p className="text-gray-900 dark:text-white" style={{ fontSize: "14px", fontWeight: 600 }}>{t.name}</p>
                  <p className="text-gray-400" style={{ fontSize: "12px" }}>{lang === "km" ? t.roleKm : t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-[#22C55E]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-white mb-4" style={{ fontSize: "32px", fontWeight: 800 }}>{l("Ready to Transform Your Restaurant?", "ត្រៀមខ្លួនផ្លាស់ប្តូរភោជនីយដ្ឋានរបស់អ្នក?")}</h2>
          <p className="text-green-100 mb-8" style={{ fontSize: "16px" }}>{l("Start your 14-day free trial. No credit card required.", "ចាប់ផ្តើមការសាកល្បង ១៤ ថ្ងៃឥតគិតថ្លៃ។ មិនត្រូវការកាតឥណទានទេ។")}</p>
          <button onClick={() => onNavigate("register")} className="px-10 py-4 bg-white text-[#22C55E] rounded-2xl hover:bg-green-50 transition-colors shadow-xl" style={{ fontSize: "16px", fontWeight: 700 }}>
            {l("Start Free Trial", "ចាប់ផ្តើមឥតគិតថ្លៃ")} <ArrowRight size={18} className="inline ml-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
