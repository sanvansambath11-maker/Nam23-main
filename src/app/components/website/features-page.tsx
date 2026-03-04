import { useTranslation } from "../translation-context";
import {
  ShoppingBag, Users, UtensilsCrossed, BarChart3, Package, Heart,
  Tag, Clock, Bell, Shield, HardDrive, Lock, FileBarChart, Settings,
  Smartphone, Moon, Globe2, CreditCard, Receipt, ChefHat,
} from "lucide-react";

interface FeaturesPageProps {
  onNavigate: (page: string) => void;
}

const features = [
  { icon: <ShoppingBag size={22} />, en: "Smart POS", km: "POS ឆ្លាតវៃ", descEn: "Fast menu grid, one-tap ordering, order modifications, and real-time totals with VAT calculation.", descKm: "បញ្ជីម៉ឺនលឿន ការបញ្ជាតាមប៉ះម្តង ការកែប្រែបញ្ជា និងសរុបក្នុងពេលជាក់ស្តែងជាមួយការគណនា VAT។", cat: "core" },
  { icon: <ChefHat size={22} />, en: "Kitchen Display", km: "ផ្ទាំងផ្ទះបាយ", descEn: "Real-time order display for kitchen staff with preparation status tracking and order priority.", descKm: "ផ្ទាំងបញ្ជាក្នុងពេលជាក់ស្តែងសម្រាប់បុគ្គលិកផ្ទះបាយជាមួយការតាមដានស្ថានភាពត្រៀម។", cat: "core" },
  { icon: <CreditCard size={22} />, en: "Payment & Split Bills", km: "ការបង់ប្រាក់ និង បែងចែកវិក័យប័ត្រ", descEn: "Cash, card, and QR payments. Split bills equally or by items between multiple customers.", descKm: "សាច់ប្រាក់ កាត និង QR។ បែងចែកវិក័យប័ត្រស្មើគ្នា ឬតាមមុខទំនិញ។", cat: "core" },
  { icon: <Receipt size={22} />, en: "Digital Receipts", km: "វិក័យប័ត្រឌីជីថល", descEn: "Beautiful receipt generation with restaurant branding, QR codes, and print support.", descKm: "វិក័យប័ត្រស្អាតជាមួយម៉ាកភោជនីយដ្ឋាន កូដ QR និងការគាំទ្របោះពុម្ព។", cat: "core" },
  { icon: <Users size={22} />, en: "Staff Management", km: "គ្រប់គ្រងបុគ្គលិក", descEn: "Add, edit, and manage staff with role assignments, PIN login, and active/inactive toggling.", descKm: "បន្ថែម កែប្រែ និងគ្រប់គ្រងបុគ្គលិកជាមួយការកំណត់តួនាទី ចូលដោយ PIN។", cat: "admin" },
  { icon: <UtensilsCrossed size={22} />, en: "Menu Management", km: "គ្រប់គ្រងម៉ឺន", descEn: "Full CRUD for menu items with categories, images, pricing, discounts, and availability.", descKm: "គ្រប់គ្រងមុខម៉ឺនពេញលេញជាមួយប្រភេទ រូបភាព តម្លៃ បញ្ចុះតម្លៃ និងភាពមាន។", cat: "admin" },
  { icon: <Package size={22} />, en: "Inventory & Stock", km: "ស្តុក និង គ្រឿងផ្សំ", descEn: "Track ingredients with min/max stock levels, low-stock alerts, cost tracking, and supplier directory.", descKm: "តាមដានគ្រឿងផ្សំជាមួយកម្រិតស្តុកអប្បបរមា/អតិបរមា ការជូនដំណឹង និងថ្លៃដើម។", cat: "admin" },
  { icon: <Heart size={22} />, en: "Customer & Loyalty", km: "អតិថិជន និង ភាពស្មោះត្រង់", descEn: "Customer database with loyalty points, automatic tier upgrades (Bronze to Platinum), visit tracking.", descKm: "មូលដ្ឋានទិន្នន័យអតិថិជនជាមួយពិន្ទុស្មោះត្រង់ ការដំឡើងកម្រិតស្វ័យប្រវត្តិ។", cat: "admin" },
  { icon: <Tag size={22} />, en: "Promotions & Coupons", km: "ប្រូម៉ូសិន និង គូប៉ុង", descEn: "Create percentage, fixed, or BOGO promotions with coupon codes, happy hours, and usage limits.", descKm: "បង្កើតប្រូម៉ូសិនភាគរយ ថេរ ឬ ទិញ១ថែម១ ជាមួយកូដ ម៉ោងរីករាយ និងដែនកំណត់។", cat: "admin" },
  { icon: <FileBarChart size={22} />, en: "Advanced Reports", km: "របាយការណ៍កម្រិតខ្ពស់", descEn: "Sales, item performance, staff performance, category breakdown — with PDF and CSV export.", descKm: "ការលក់ ការអនុវត្តមុខទំនិញ បុគ្គលិក ប្រភេទ — ជាមួយការចេញ PDF និង CSV។", cat: "admin" },
  { icon: <Clock size={22} />, en: "Staff Shifts & Attendance", km: "វេន និង វត្តមានបុគ្គលិក", descEn: "Clock in/out, scheduled vs actual time, late/absent tracking, weekly hours with overtime alerts.", descKm: "ចូល/ចេញម៉ោង កាលវិភាគ ទល់នឹង ពេលជាក់ស្តែង ការតាមដានយឺត/អវត្តមាន។", cat: "admin" },
  { icon: <Bell size={22} />, en: "Notification Center", km: "មជ្ឈមណ្ឌលការជូនដំណឹង", descEn: "Real-time alerts for orders, stock levels, staff events, and system messages with priority levels.", descKm: "ការជូនដំណឹងក្នុងពេលជាក់ស្តែងសម្រាប់បញ្ជា ស្តុក បុគ្គលិក និងប្រព័ន្ធ។", cat: "admin" },
  { icon: <Shield size={22} />, en: "Audit Log", km: "កំណត់ហេតុសវនកម្ម", descEn: "Complete activity trail — who changed what, when, and from where. Filter by user, category, or action.", descKm: "ប្រវត្តិសកម្មភាពពេញលេញ — អ្នកណាបានផ្លាស់ប្តូរអ្វី ពេលណា និងពីកន្លែងណា។", cat: "admin" },
  { icon: <HardDrive size={22} />, en: "Data Backup & Export", km: "បម្រុងទុក និង ចេញទិន្នន័យ", descEn: "Export full data as JSON or CSV. Import from backup. Reset to defaults with safety confirmation.", descKm: "ចេញទិន្នន័យជា JSON ឬ CSV។ នាំចូលពីបម្រុងទុក។ កំណត់ឡើងវិញជាមួយការបញ្ជាក់សុវត្ថិភាព។", cat: "admin" },
  { icon: <Lock size={22} />, en: "Roles & Permissions", km: "តួនាទី និង សិទ្ធិ", descEn: "Create custom roles with granular permission toggles. System roles protected, custom roles fully editable.", descKm: "បង្កើតតួនាទីផ្ទាល់ខ្លួនជាមួយការបិទ/បើកសិទ្ធិលម្អិត។", cat: "admin" },
  { icon: <Settings size={22} />, en: "Restaurant Settings", km: "ការកំណត់ភោជនីយដ្ឋាន", descEn: "Configure restaurant info, business hours, tax rates, currency exchange, and integrations.", descKm: "កំណត់ព័ត៌មានភោជនីយដ្ឋាន ម៉ោងអាជីវកម្ម អត្រាពន្ធ អត្រាប្តូរប្រាក់ និងការរួមបញ្ចូល។", cat: "admin" },
];

const extras = [
  { icon: <Moon size={14} />, text: { en: "Dark / Light Mode", km: "ម៉ូដងងឹត / ភ្លឺ" } },
  { icon: <Globe2 size={14} />, text: { en: "Khmer + English", km: "ខ្មែរ + English" } },
  { icon: <Smartphone size={14} />, text: { en: "Mobile Responsive", km: "សម្រាប់ទូរសព្ទ" } },
  { icon: <CreditCard size={14} />, text: { en: "USD + KHR Currency", km: "រូបិយប័ណ្ណ USD + KHR" } },
];

export function FeaturesPage({ onNavigate }: FeaturesPageProps) {
  const { lang } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);

  const coreFeatures = features.filter((f) => f.cat === "core");
  const adminFeatures = features.filter((f) => f.cat === "admin");

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#22C55E] mb-3" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>{l("FEATURES", "មុខងារ")}</p>
          <h1 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "40px", fontWeight: 800 }}>{l("Powerful Features for Every Restaurant", "មុខងារដ៏មានឥទ្ធិពលសម្រាប់ភោជនីយដ្ឋានគ្រប់កន្លែង")}</h1>
          <p className="text-gray-500" style={{ fontSize: "16px" }}>{l("16 features across POS and Admin — built to handle everything from ordering to business intelligence.", "មុខងារ ១៦ នៅទូទាំង POS និង Admin — បង្កើតដើម្បីដោះស្រាយអ្វីគ្រប់យ៉ាង។")}</p>
        </div>
      </section>

      {/* Built-in extras */}
      <section className="pb-12 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
          {extras.map((e, i) => (
            <div key={i} className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 rounded-full border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400" style={{ fontSize: "13px" }}>
              {e.icon} {lang === "km" ? e.text.km : e.text.en}
            </div>
          ))}
        </div>
      </section>

      {/* Core POS */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gray-900 dark:text-white mb-2" style={{ fontSize: "24px", fontWeight: 700 }}>{l("Core POS Features", "មុខងារ POS សំខាន់")}</h2>
          <p className="text-gray-500 mb-8" style={{ fontSize: "14px" }}>{l("The foundation — fast, reliable ordering and payment.", "គ្រឹះ — ការបញ្ជា និង ការបង់ប្រាក់ ដែលលឿន និងអាចទុកចិត្តបាន។")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {coreFeatures.map((f, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-lg hover:border-[#22C55E]/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center shrink-0">{f.icon}</div>
                  <div>
                    <h3 className="text-gray-900 dark:text-white mb-1" style={{ fontSize: "16px", fontWeight: 700 }}>{lang === "km" ? f.km : f.en}</h3>
                    <p className="text-gray-500" style={{ fontSize: "13px", lineHeight: 1.6 }}>{lang === "km" ? f.descKm : f.descEn}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Features */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-gray-900 dark:text-white mb-2" style={{ fontSize: "24px", fontWeight: 700 }}>{l("Admin Panel Features", "មុខងារផ្ទាំងគ្រប់គ្រង")}</h2>
          <p className="text-gray-500 mb-8" style={{ fontSize: "14px" }}>{l("13 powerful modules to manage every aspect of your restaurant.", "មូឌុល ១៣ ដ៏មានឥទ្ធិពលដើម្បីគ្រប់គ្រងភោជនីយដ្ឋានរបស់អ្នក។")}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {adminFeatures.map((f, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6 hover:shadow-lg hover:border-[#22C55E]/20 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center mb-3">{f.icon}</div>
                <h3 className="text-gray-900 dark:text-white mb-1" style={{ fontSize: "15px", fontWeight: 700 }}>{lang === "km" ? f.km : f.en}</h3>
                <p className="text-gray-500" style={{ fontSize: "12px", lineHeight: 1.6 }}>{lang === "km" ? f.descKm : f.descEn}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "28px", fontWeight: 800 }}>{l("Ready to Try?", "ត្រៀមសាកល្បង?")}</h2>
        <button onClick={() => onNavigate("register")} className="px-8 py-3 bg-[#22C55E] text-white rounded-2xl hover:bg-green-600 shadow-lg shadow-green-200 dark:shadow-green-900" style={{ fontSize: "15px", fontWeight: 700 }}>
          {l("Start Free Trial", "ចាប់ផ្តើមឥតគិតថ្លៃ")}
        </button>
      </section>
    </div>
  );
}
