import { useTranslation } from "../translation-context";
import { Heart, Target, Eye, Users, Globe2, Zap } from "lucide-react";

export function AboutPage() {
  const { lang } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <p className="text-[#22C55E] mb-3" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>{l("ABOUT US", "អំពីយើង")}</p>
          <h1 className="text-gray-900 dark:text-white mb-6" style={{ fontSize: "40px", fontWeight: 800, lineHeight: 1.1 }}>
            {l("Building the Future of", "បង្កើតអនាគតរបស់")} <span className="text-[#22C55E]">{l("Cambodian F&B", "ឧស្សាហកម្មម្ហូបអាហារកម្ពុជា")}</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400" style={{ fontSize: "17px", lineHeight: 1.8 }}>
            {l(
              "Batto Club was born from a simple observation: Cambodian restaurants deserve world-class technology that speaks their language and understands their needs.",
              "Batto Club កើតចេញពីការសង្កេតសាមញ្ញមួយ៖ ភោជនីយដ្ឋានកម្ពុជាសមនឹងទទួលបានបច្ចេកវិទ្យាថ្នាក់ពិភពលោកដែលនិយាយភាសារបស់ពួកគេ។"
            )}
          </p>
        </div>
      </section>

      {/* Mission / Vision */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Target size={24} />, title: l("Our Mission", "បេសកកម្ម"), desc: l("Empower every restaurant in Cambodia with affordable, easy-to-use technology that grows with their business.", "ផ្តល់សិទ្ធិអំណាចដល់ភោជនីយដ្ឋានគ្រប់ទីកន្លែងក្នុងកម្ពុជាជាមួយបច្ចេកវិទ្យាដែលមានតម្លៃសមរម្យ។") },
            { icon: <Eye size={24} />, title: l("Our Vision", "ចក្ខុវិស័យ"), desc: l("A Cambodia where every food business — from street vendors to fine dining — runs efficiently with smart technology.", "កម្ពុជាដែលអាជីវកម្មម្ហូបអាហារគ្រប់កន្លែង ដំណើរការប្រកបដោយប្រសិទ្ធភាពជាមួយបច្ចេកវិទ្យាឆ្លាតវៃ។") },
            { icon: <Heart size={24} />, title: l("Our Values", "គុណតម្លៃ"), desc: l("Built in Cambodia, for Cambodia. We prioritize simplicity, affordability, and local language support above everything.", "បង្កើតនៅកម្ពុជា សម្រាប់កម្ពុជា។ យើងផ្តល់អាទិភាពដល់ភាពសាមញ្ញ តម្លៃសមរម្យ និងការគាំទ្រភាសាខ្មែរ។") },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center mx-auto mb-5">{item.icon}</div>
              <h3 className="text-gray-900 dark:text-white mb-3" style={{ fontSize: "18px", fontWeight: 700 }}>{item.title}</h3>
              <p className="text-gray-500" style={{ fontSize: "14px", lineHeight: 1.7 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Cambodia */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-gray-900 dark:text-white text-center mb-12" style={{ fontSize: "28px", fontWeight: 800 }}>{l("Why We Built This for Cambodia", "ហេតុអ្វីយើងបង្កើតសម្រាប់កម្ពុជា")}</h2>
          <div className="space-y-6">
            {[
              { icon: <Globe2 size={20} />, title: l("Language First", "ភាសាជាអាទិភាព"), desc: l("Most POS systems only support English. Batto Club speaks Khmer natively — menus, receipts, reports, everything.", "ប្រព័ន្ធ POS ភាគច្រើនគាំទ្រតែភាសាអង់គ្លេស។ Batto Club និយាយភាសាខ្មែរ — ម៉ឺន វិក័យប័ត្រ របាយការណ៍ អ្វីៗទាំងអស់។") },
              { icon: <Zap size={20} />, title: l("Built for Local Payments", "បង្កើតសម្រាប់ការបង់ប្រាក់ក្នុងស្រុក"), desc: l("USD + KHR dual currency, KHQR ready, ABA & Wing integration — because that's how Cambodia pays.", "រូបិយប័ណ្ណ USD + KHR ទ្វេ ត្រៀម KHQR រួមបញ្ចូល ABA និង Wing — ព្រោះនេះជារបៀបដែលកម្ពុជាបង់ប្រាក់។") },
              { icon: <Users size={20} />, title: l("Simple for Everyone", "សាមញ្ញសម្រាប់អ្នកទាំងអស់គ្នា"), desc: l("PIN login, visual menus, one-tap ordering — designed for staff who may not be tech-savvy.", "ចូលដោយ PIN ម៉ឺនរូបភាព បញ្ជាតាមប៉ះម្តង — រចនាសម្រាប់បុគ្គលិកដែលប្រហែលជាមិនចេះបច្ចេកវិទ្យា។") },
            ].map((item, i) => (
              <div key={i} className="flex gap-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
                <div className="w-11 h-11 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center shrink-0">{item.icon}</div>
                <div>
                  <h3 className="text-gray-900 dark:text-white mb-1" style={{ fontSize: "16px", fontWeight: 700 }}>{item.title}</h3>
                  <p className="text-gray-500" style={{ fontSize: "14px", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-[#22C55E] mb-2" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>{l("THE TEAM", "ក្រុម")}</p>
          <h2 className="text-gray-900 dark:text-white mb-6" style={{ fontSize: "28px", fontWeight: 800 }}>{l("Built by Cambodians", "បង្កើតដោយជនជាតិកម្ពុជា")}</h2>
          <p className="text-gray-500 mb-10" style={{ fontSize: "15px", lineHeight: 1.7 }}>
            {l(
              "We're a small, passionate team based in Phnom Penh. We eat at the same restaurants we build for, and we understand the challenges of running a food business in Cambodia.",
              "យើងជាក្រុមតូចមួយដែលមានចំណង់ចំណូលចិត្ត មានមូលដ្ឋាននៅភ្នំពេញ។ យើងញ៉ាំនៅភោជនីយដ្ឋានដូចគ្នាដែលយើងបង្កើតសម្រាប់។"
            )}
          </p>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#22C55E] to-emerald-600 flex items-center justify-center text-white" style={{ fontSize: "16px", fontWeight: 700 }}>S</div>
            <div className="text-left">
              <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>Sambath</p>
              <p className="text-gray-400" style={{ fontSize: "12px" }}>{l("Founder & Developer", "ស្ថាបនិក និង អ្នកអភិវឌ្ឍន៍")}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
