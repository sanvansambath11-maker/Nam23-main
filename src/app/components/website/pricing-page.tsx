import { useState } from "react";
import { useTranslation } from "../translation-context";
import { Check, X, ChevronDown, ChevronUp } from "lucide-react";

interface PricingPageProps {
  onNavigate: (page: string) => void;
}

const plans = [
  {
    name: "Basic", nameKm: "មូលដ្ឋាន",
    monthlyPrice: 9, yearlyPrice: 89,
    descEn: "Perfect for small cafes and food stalls", descKm: "ល្អឥតខ្ចោះសម្រាប់ហាងកាហ្វេតូច និងហាងម្ហូប",
    features: [
      { en: "Up to 5 staff accounts", km: "គណនីបុគ្គលិករហូតដល់ ៥", included: true },
      { en: "POS ordering system", km: "ប្រព័ន្ធបញ្ជា POS", included: true },
      { en: "Menu management", km: "គ្រប់គ្រងម៉ឺន", included: true },
      { en: "Basic reports", km: "របាយការណ៍មូលដ្ឋាន", included: true },
      { en: "Receipt generation", km: "បង្កើតវិក័យប័ត្រ", included: true },
      { en: "Order history", km: "ប្រវត្តិបញ្ជា", included: true },
      { en: "Khmer + English", km: "ខ្មែរ + English", included: true },
      { en: "Advanced reports (PDF/CSV)", km: "របាយការណ៍កម្រិតខ្ពស់", included: false },
      { en: "Inventory management", km: "គ្រប់គ្រងស្តុក", included: false },
      { en: "Customer loyalty", km: "ភាពស្មោះត្រង់អតិថិជន", included: false },
      { en: "Promotions & coupons", km: "ប្រូម៉ូសិន និង គូប៉ុង", included: false },
      { en: "Custom roles", km: "តួនាទីផ្ទាល់ខ្លួន", included: false },
    ],
  },
  {
    name: "Pro", nameKm: "វិជ្ជាជីវៈ",
    monthlyPrice: 19, yearlyPrice: 189, popular: true,
    descEn: "For growing restaurants with full management needs", descKm: "សម្រាប់ភោជនីយដ្ឋានកំពុងរីកចម្រើនដែលត្រូវការគ្រប់គ្រងពេញលេញ",
    features: [
      { en: "Unlimited staff accounts", km: "គណនីបុគ្គលិកគ្មានកំណត់", included: true },
      { en: "POS ordering system", km: "ប្រព័ន្ធបញ្ជា POS", included: true },
      { en: "Menu management", km: "គ្រប់គ្រងម៉ឺន", included: true },
      { en: "Advanced reports (PDF/CSV)", km: "របាយការណ៍កម្រិតខ្ពស់ (PDF/CSV)", included: true },
      { en: "Inventory management", km: "គ្រប់គ្រងស្តុក", included: true },
      { en: "Customer loyalty & CRM", km: "ភាពស្មោះត្រង់ និង CRM", included: true },
      { en: "Promotions & coupons", km: "ប្រូម៉ូសិន និង គូប៉ុង", included: true },
      { en: "Staff shifts & attendance", km: "វេន និង វត្តមានបុគ្គលិក", included: true },
      { en: "Notification center", km: "មជ្ឈមណ្ឌលការជូនដំណឹង", included: true },
      { en: "Audit log", km: "កំណត់ហេតុសវនកម្ម", included: true },
      { en: "Data backup & export", km: "បម្រុងទុក និង ចេញទិន្នន័យ", included: true },
      { en: "Custom roles & permissions", km: "តួនាទី និង សិទ្ធិផ្ទាល់ខ្លួន", included: false },
    ],
  },
  {
    name: "Enterprise", nameKm: "សហគ្រាស",
    monthlyPrice: 39, yearlyPrice: 389,
    descEn: "For restaurant chains and hotel dining", descKm: "សម្រាប់បណ្តាញភោជនីយដ្ឋាន និង ភោជនីយដ្ឋានសណ្ឋាគារ",
    features: [
      { en: "Everything in Pro", km: "គ្រប់យ៉ាងក្នុង Pro", included: true },
      { en: "Custom roles & permissions", km: "តួនាទី និង សិទ្ធិផ្ទាល់ខ្លួន", included: true },
      { en: "API access", km: "ការចូល API", included: true },
      { en: "Priority support", km: "ជំនួយអាទិភាព", included: true },
      { en: "White-label branding", km: "ម៉ាកផ្ទាល់ខ្លួន", included: true },
      { en: "Multi-branch support", km: "គាំទ្រច្រើនសាខា", included: true },
      { en: "Telegram bot integration", km: "រួមបញ្ចូល Telegram bot", included: true },
      { en: "Dedicated onboarding", km: "ការណែនាំផ្ទាល់", included: true },
      { en: "Custom feature requests", km: "សំណើមុខងារផ្ទាល់ខ្លួន", included: true },
      { en: "SLA guarantee", km: "ការធានា SLA", included: true },
      { en: "", km: "", included: true },
      { en: "", km: "", included: true },
    ],
  },
];

const faqs = [
  { q: "Is there a free trial?", qKm: "មានការសាកល្បងឥតគិតថ្លៃទេ?", a: "Yes! Every plan includes a 14-day free trial. No credit card required.", aKm: "បាទ/ចាស! គម្រោងទាំងអស់រួមបញ្ចូល ១៤ ថ្ងៃសាកល្បងឥតគិតថ្លៃ។ មិនត្រូវការកាតឥណទានទេ។" },
  { q: "How do I pay?", qKm: "ខ្ញុំបង់ប្រាក់យ៉ាងម៉េច?", a: "We accept ABA KHQR, Wing, bank transfer, and cash payment. We'll help you get set up.", aKm: "យើងទទួល ABA KHQR Wing ការផ្ទេរប្រាក់តាមធនាគារ និង សាច់ប្រាក់។" },
  { q: "Can I switch plans?", qKm: "ខ្ញុំអាចប្តូរគម្រោងបានទេ?", a: "Yes, you can upgrade or downgrade anytime. Changes take effect on your next billing cycle.", aKm: "បាទ/ចាស អ្នកអាចដំឡើង ឬបន្ថយពេលណាក៏បាន។" },
  { q: "Do I need internet to use it?", qKm: "ខ្ញុំត្រូវការអ៊ីនធឺណិតដើម្បីប្រើទេ?", a: "The POS works best with internet but core ordering works offline too. Data syncs when you reconnect.", aKm: "POS ដំណើរការល្អបំផុតជាមួយអ៊ីនធឺណិត ប៉ុន្តែការបញ្ជាចម្បងដំណើរការដោយគ្មានអ៊ីនធឺណិតដែរ។" },
  { q: "Is my data safe?", qKm: "ទិន្នន័យរបស់ខ្ញុំមានសុវត្ថិភាពទេ?", a: "Absolutely. We use encrypted connections and automatic daily backups. You can also export your data anytime.", aKm: "ពិតជាច្បាស់។ យើងប្រើការតភ្ជាប់ដែលបានអ៊ិនគ្រីប និង បម្រុងទុកប្រចាំថ្ងៃដោយស្វ័យប្រវត្តិ។" },
  { q: "Can I cancel anytime?", qKm: "ខ្ញុំអាចបោះបង់ពេលណាក៏បានទេ?", a: "Yes, no contracts or cancellation fees. Cancel anytime from your account settings.", aKm: "បាទ/ចាស គ្មានកិច្ចសន្យា ឬ ថ្លៃបោះបង់ទេ។ បោះបង់ពេលណាក៏បាន។" },
];

export function PricingPage({ onNavigate }: PricingPageProps) {
  const { lang } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [yearly, setYearly] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <p className="text-[#22C55E] mb-3" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>{l("PRICING", "តម្លៃ")}</p>
        <h1 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "40px", fontWeight: 800 }}>{l("Plans for Every Restaurant", "គម្រោងសម្រាប់ភោជនីយដ្ឋានគ្រប់ទំហំ")}</h1>
        <p className="text-gray-500 mb-8" style={{ fontSize: "16px" }}>{l("Start free for 14 days. No credit card needed.", "ចាប់ផ្តើមឥតគិតថ្លៃ ១៤ ថ្ងៃ។ មិនត្រូវការកាតឥណទាន។")}</p>

        {/* Billing toggle */}
        <div className="inline-flex items-center gap-3 bg-gray-100 dark:bg-gray-800 rounded-full p-1">
          <button onClick={() => setYearly(false)} className={`px-5 py-2 rounded-full transition-all ${!yearly ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "13px", fontWeight: 600 }}>{l("Monthly", "ប្រចាំខែ")}</button>
          <button onClick={() => setYearly(true)} className={`px-5 py-2 rounded-full transition-all ${yearly ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "13px", fontWeight: 600 }}>{l("Yearly", "ប្រចាំឆ្នាំ")} <span className="text-[#22C55E] ml-1" style={{ fontSize: "11px" }}>{l("Save 17%", "សន្សំ 17%")}</span></button>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <div key={i} className={`bg-white dark:bg-gray-900 rounded-2xl border p-8 relative ${(plan as { popular?: boolean }).popular ? "border-[#22C55E] shadow-2xl shadow-green-100 dark:shadow-green-900/20 scale-[1.02]" : "border-gray-100 dark:border-gray-800"}`}>
              {(plan as { popular?: boolean }).popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#22C55E] text-white rounded-full" style={{ fontSize: "11px", fontWeight: 700 }}>{l("Most Popular", "ពេញនិយមបំផុត")}</span>
              )}
              <p className="text-gray-900 dark:text-white" style={{ fontSize: "20px", fontWeight: 700 }}>{lang === "km" ? plan.nameKm : plan.name}</p>
              <p className="text-gray-400 mt-1" style={{ fontSize: "13px" }}>{lang === "km" ? plan.descKm : plan.descEn}</p>
              <div className="mt-5 mb-6">
                <span className="text-gray-900 dark:text-white" style={{ fontSize: "44px", fontWeight: 800 }}>${yearly ? plan.yearlyPrice : plan.monthlyPrice}</span>
                <span className="text-gray-400" style={{ fontSize: "14px" }}>/{yearly ? l("year", "ឆ្នាំ") : l("month", "ខែ")}</span>
              </div>
              <button onClick={() => onNavigate("register")} className={`w-full py-3 rounded-xl transition-colors mb-6 ${(plan as { popular?: boolean }).popular ? "bg-[#22C55E] text-white hover:bg-green-600 shadow-lg shadow-green-200 dark:shadow-green-900" : "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"}`} style={{ fontSize: "14px", fontWeight: 600 }}>
                {l("Start Free Trial", "ចាប់ផ្តើមឥតគិតថ្លៃ")}
              </button>
              <ul className="space-y-3">
                {plan.features.filter(f => f.en).map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5" style={{ fontSize: "13px" }}>
                    {f.included ? <Check size={15} className="text-[#22C55E] shrink-0" /> : <X size={15} className="text-gray-300 dark:text-gray-700 shrink-0" />}
                    <span className={f.included ? "text-gray-600 dark:text-gray-400" : "text-gray-300 dark:text-gray-700"}>{lang === "km" ? f.km : f.en}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-gray-900 dark:text-white text-center mb-10" style={{ fontSize: "28px", fontWeight: 800 }}>{l("Frequently Asked Questions", "សំណួរដែលគេសួរច្រើន")}</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-5 py-4 text-left">
                  <span className="text-gray-900 dark:text-white" style={{ fontSize: "14px", fontWeight: 600 }}>{lang === "km" ? faq.qKm : faq.q}</span>
                  {openFaq === i ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-4"><p className="text-gray-500" style={{ fontSize: "13px", lineHeight: 1.7 }}>{lang === "km" ? faq.aKm : faq.a}</p></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
