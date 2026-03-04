import { useState } from "react";
import { useTranslation } from "../translation-context";
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from "lucide-react";
import { toast } from "sonner";

export function ContactPage() {
  const { lang } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) {
      toast.error(l("Please fill in all required fields", "សូមបំពេញគ្រប់ចន្លោះដែលត្រូវការ"));
      return;
    }
    setSent(true);
    toast.success(l("Message sent! We'll reply via Telegram.", "បានផ្ញើ! យើងនឹងឆ្លើយតាម Telegram។"));
  };

  const cls = "w-full px-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:border-[#22C55E] transition-colors";

  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <p className="text-[#22C55E] mb-3" style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.05em" }}>{l("CONTACT", "ទំនាក់ទំនង")}</p>
        <h1 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "40px", fontWeight: 800 }}>{l("Get in Touch", "ទាក់ទង​មក​ពួក​យើង")}</h1>
        <p className="text-gray-500" style={{ fontSize: "16px" }}>{l("Have questions? We'd love to hear from you.", "មានសំណួរ? យើងចង់ស្តាប់ពីអ្នក។")}</p>
      </section>

      <section className="pb-20 px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
              <h3 className="text-gray-900 dark:text-white mb-5" style={{ fontSize: "18px", fontWeight: 700 }}>{l("Contact Info", "ព័ត៌មានទំនាក់ទំនង")}</h3>
              <div className="space-y-4">
                {[
                  { icon: <Phone size={18} />, label: l("Phone", "ទូរសព្ទ"), value: "+855 12 345 678" },
                  { icon: <MessageCircle size={18} />, label: "Telegram", value: "@BattoClub" },
                  { icon: <Mail size={18} />, label: l("Email", "អ៊ីមែល"), value: "hello@battoclub.com" },
                  { icon: <MapPin size={18} />, label: l("Location", "ទីតាំង"), value: l("Phnom Penh, Cambodia", "ភ្នំពេញ កម្ពុជា") },
                  { icon: <Clock size={18} />, label: l("Hours", "ម៉ោង"), value: l("Mon - Sat, 8am - 6pm", "ច័ន្ទ - សៅរ៍ ៨ព្រឹក - ៦ល្ងាច") },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center shrink-0">{item.icon}</div>
                    <div>
                      <p className="text-gray-400" style={{ fontSize: "11px" }}>{item.label}</p>
                      <p className="text-gray-900 dark:text-white" style={{ fontSize: "14px", fontWeight: 500 }}>{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#22C55E]/5 rounded-2xl border border-[#22C55E]/20 p-6">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle size={18} className="text-[#22C55E]" />
                <p className="text-[#22C55E]" style={{ fontSize: "15px", fontWeight: 700 }}>{l("Fastest on Telegram", "លឿនបំផុតតាម Telegram")}</p>
              </div>
              <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: "13px", lineHeight: 1.6 }}>{l("We usually reply within 30 minutes on Telegram during business hours.", "យើងឆ្លើយក្នុងរយៈពេល ៣០ នាទីតាម Telegram ក្នុងម៉ោងធ្វើការ។")}</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-10 text-center">
                <div className="w-16 h-16 rounded-full bg-[#22C55E]/10 text-[#22C55E] flex items-center justify-center mx-auto mb-5"><Send size={28} /></div>
                <h3 className="text-gray-900 dark:text-white mb-2" style={{ fontSize: "22px", fontWeight: 700 }}>{l("Message Sent!", "បានផ្ញើសារ!")}</h3>
                <p className="text-gray-500 mb-6" style={{ fontSize: "14px" }}>{l("We'll get back to you within 24 hours. For faster response, message us on Telegram @BattoClub", "យើងនឹងឆ្លើយតបក្នុងរយៈពេល ២៤ ម៉ោង។ សម្រាប់ការឆ្លើយតបលឿនជាង សូមផ្ញើសារមកយើងតាម Telegram @BattoClub")}</p>
                <button onClick={() => { setSent(false); setForm({ name: "", phone: "", email: "", message: "" }); }} className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl" style={{ fontSize: "13px", fontWeight: 600 }}>{l("Send Another", "ផ្ញើម្តងទៀត")}</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 space-y-4">
                <h3 className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "18px", fontWeight: 700 }}>{l("Send us a message", "ផ្ញើសារមកយើង")}</h3>
                <div>
                  <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Name", "ឈ្មោះ")} *</label>
                  <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder={l("Your name", "ឈ្មោះរបស់អ្នក")} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Phone", "ទូរសព្ទ")} *</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder="012 xxx xxx" />
                  </div>
                  <div>
                    <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Email", "អ៊ីមែល")} ({l("optional", "ស្រេចចិត្ត")})</label>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder="you@email.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Message", "សារ")} *</label>
                  <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${cls} resize-none`} rows={5} style={{ fontSize: "14px" }} placeholder={l("Tell us about your restaurant and what you need...", "ប្រាប់យើងអំពីភោជនីយដ្ឋានរបស់អ្នក និង អ្វីដែលអ្នកត្រូវការ...")} />
                </div>
                <button type="submit" className="w-full py-3 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 dark:shadow-green-900 flex items-center justify-center gap-2" style={{ fontSize: "15px", fontWeight: 700 }}>
                  <Send size={16} /> {l("Send Message", "ផ្ញើសារ")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
