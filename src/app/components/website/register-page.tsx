import { useState } from "react";
import { useTranslation } from "../translation-context";
import { Eye, EyeOff, Check, ArrowRight, Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { registerRestaurant } from "../../../lib/auth-service";

interface RegisterPageProps {
  onNavigate: (page: string) => void;
  onRegisterSuccess: () => void;
}

const plans = [
  { key: "basic", name: "Basic", nameKm: "មូលដ្ឋាន", price: 9, features: ["5 staff", "POS + Menu", "Basic reports"], featuresKm: ["បុគ្គលិក ៥", "POS + ម៉ឺន", "របាយការណ៍មូលដ្ឋាន"] },
  { key: "pro", name: "Pro", nameKm: "វិជ្ជាជីវៈ", price: 19, popular: true, features: ["Unlimited staff", "All features", "Advanced reports"], featuresKm: ["បុគ្គលិកគ្មានកំណត់", "មុខងារទាំងអស់", "របាយការណ៍កម្រិតខ្ពស់"] },
  { key: "enterprise", name: "Enterprise", nameKm: "សហគ្រាស", price: 39, features: ["Everything in Pro", "Custom roles", "Priority support"], featuresKm: ["គ្រប់យ៉ាងក្នុង Pro", "តួនាទីផ្ទាល់ខ្លួន", "ជំនួយអាទិភាព"] },
];

export function RegisterPage({ onNavigate, onRegisterSuccess }: RegisterPageProps) {
  const { lang } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    restaurantName: "",
    ownerName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);

  const cls = "w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:border-[#22C55E] transition-colors";

  const handleSubmit = async () => {
    if (!form.restaurantName || !form.ownerName || !form.phone || !form.email || !form.password) {
      toast.error(l("Please fill in all fields", "សូមបំពេញគ្រប់ចន្លោះ"));
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error(l("Passwords don't match", "ពាក្យសម្ងាត់មិនត្រូវគ្នា"));
      return;
    }
    if (form.password.length < 6) {
      toast.error(l("Password must be at least 6 characters", "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ ៦ តួអក្សរ"));
      return;
    }
    if (!agreed) {
      toast.error(l("Please agree to the terms", "សូមយល់ព្រមលើលក្ខខណ្ឌ"));
      return;
    }

    setLoading(true);
    try {
      const result = await registerRestaurant({
        email: form.email,
        password: form.password,
        restaurantName: form.restaurantName,
        ownerName: form.ownerName,
        phone: form.phone,
        plan: selectedPlan as "basic" | "pro" | "enterprise",
      });

      if (!result.success) {
        toast.error(result.error ?? l("Registration failed", "ការចុះឈ្មោះបរាជ័យ"));
        return;
      }

      localStorage.setItem("battoclub_user", JSON.stringify({
        restaurantName: form.restaurantName,
        ownerName: form.ownerName,
        phone: form.phone,
        email: form.email,
        plan: selectedPlan,
        registeredAt: new Date().toISOString(),
        trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      }));

      toast.success(l("Welcome to Batto Club! Your 14-day trial starts now.", "សូមស្វាគមន៍មកកាន់ Batto Club! ការសាកល្បង ១៤ ថ្ងៃរបស់អ្នកចាប់ផ្តើមឥឡូវ។"), { duration: 3000 });
      onRegisterSuccess();
    } catch {
      toast.error(l("Something went wrong. Please try again.", "មានបញ្ហាកើតឡើង។ សូមព្យាយាមម្តងទៀត។"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/images/logo.png" alt="Batto Club" className="h-12 w-12 rounded-xl object-cover" />
          </div>
          <h1 className="text-gray-900 dark:text-white mb-2" style={{ fontSize: "28px", fontWeight: 800 }}>{l("Create Your Account", "បង្កើតគណនីរបស់អ្នក")}</h1>
          <p className="text-gray-500" style={{ fontSize: "14px" }}>{l("14-day free trial • No credit card required", "១៤ ថ្ងៃសាកល្បងឥតគិតថ្លៃ • មិនត្រូវការកាតឥណទាន")}</p>
        </div>

        {/* Steps indicator */}
        <div className="flex items-center justify-center gap-3 mb-8">
          {[1, 2].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= s ? "bg-[#22C55E] text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`} style={{ fontSize: "13px", fontWeight: 700 }}>
                {step > s ? <Check size={16} /> : s}
              </div>
              <span className={`hidden sm:block ${step >= s ? "text-gray-900 dark:text-white" : "text-gray-400"}`} style={{ fontSize: "12px", fontWeight: 500 }}>
                {s === 1 ? l("Choose Plan", "ជ្រើសរើសគម្រោង") : l("Your Info", "ព័ត៌មានរបស់អ្នក")}
              </span>
              {s < 2 && <div className="w-12 h-px bg-gray-200 dark:bg-gray-700 mx-2" />}
            </div>
          ))}
        </div>

        {step === 1 ? (
          /* Plan selection */
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {plans.map((plan) => (
                <button
                  key={plan.key}
                  onClick={() => setSelectedPlan(plan.key)}
                  className={`text-left rounded-2xl border p-5 transition-all relative ${
                    selectedPlan === plan.key
                      ? "border-[#22C55E] bg-[#22C55E]/5 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {(plan as { popular?: boolean }).popular && (
                    <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#22C55E] text-white rounded-full" style={{ fontSize: "10px", fontWeight: 600 }}>{l("Popular", "ពេញនិយម")}</span>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-gray-900 dark:text-white" style={{ fontSize: "16px", fontWeight: 700 }}>{lang === "km" ? plan.nameKm : plan.name}</p>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedPlan === plan.key ? "border-[#22C55E] bg-[#22C55E]" : "border-gray-300 dark:border-gray-600"}`}>
                      {selectedPlan === plan.key && <Check size={12} className="text-white" />}
                    </div>
                  </div>
                  <p className="mb-3"><span className="text-gray-900 dark:text-white" style={{ fontSize: "28px", fontWeight: 800 }}>${plan.price}</span><span className="text-gray-400" style={{ fontSize: "12px" }}>/{l("mo", "ខែ")}</span></p>
                  <ul className="space-y-1.5">
                    {(lang === "km" ? plan.featuresKm : plan.features).map((f, j) => (
                      <li key={j} className="flex items-center gap-1.5 text-gray-500" style={{ fontSize: "12px" }}><Check size={12} className="text-[#22C55E]" /> {f}</li>
                    ))}
                  </ul>
                </button>
              ))}
            </div>
            <button onClick={() => setStep(2)} className="w-full py-3.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 dark:shadow-green-900 flex items-center justify-center gap-2" style={{ fontSize: "15px", fontWeight: 700 }}>
              {l("Continue", "បន្ត")} <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Registration form */
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8">
            <div className="space-y-4">
              <div>
                <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Restaurant Name", "ឈ្មោះភោជនីយដ្ឋាន")} *</label>
                <input type="text" value={form.restaurantName} onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder={l("e.g. Cafe Mekong", "ឧ. ហាងកាហ្វេ មេគង្គ")} />
              </div>
              <div>
                <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Owner Name", "ឈ្មោះម្ចាស់")} *</label>
                <input type="text" value={form.ownerName} onChange={(e) => setForm({ ...form, ownerName: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder={l("Your full name", "ឈ្មោះពេញរបស់អ្នក")} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Phone Number", "លេខទូរសព្ទ")} *</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder="012 xxx xxx" />
                </div>
                <div>
                  <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Email", "អ៊ីមែល")} *</label>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder="you@example.com" />
                </div>
              </div>
              <div className="relative">
                <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Password", "ពាក្យសម្ងាត់")} *</label>
                <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder="••••••••" />
                <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-gray-400">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
              <div>
                <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Confirm Password", "បញ្ជាក់ពាក្យសម្ងាត់")} *</label>
                <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder="••••••••" />
              </div>

              <label className="flex items-start gap-2.5 cursor-pointer pt-2">
                <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 rounded accent-[#22C55E] mt-0.5" />
                <span className="text-gray-500" style={{ fontSize: "12px", lineHeight: 1.5 }}>{l("I agree to the Terms of Service and Privacy Policy. I understand this starts a 14-day free trial.", "ខ្ញុំយល់ព្រមលើលក្ខខណ្ឌសេវាកម្ម និង គោលការណ៍ភាពឯកជន។ ខ្ញុំយល់ថានេះចាប់ផ្តើមការសាកល្បង ១៤ ថ្ងៃ។")}</span>
              </label>

              <div className="flex items-center gap-2 bg-[#22C55E]/5 rounded-xl p-3 mt-2">
                <Shield size={16} className="text-[#22C55E] shrink-0" />
                <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: "12px" }}>{l("14-day free trial. No payment needed to start.", "១៤ ថ្ងៃសាកល្បងឥតគិតថ្លៃ។ មិនចាំបាច់បង់ប្រាក់ដើម្បីចាប់ផ្តើម។")}</p>
              </div>

              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(1)} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl" style={{ fontSize: "14px", fontWeight: 600 }}>{l("Back", "ថយក្រោយ")}</button>
                <button onClick={handleSubmit} disabled={loading} className="flex-1 py-3 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 dark:shadow-green-900 disabled:opacity-50 flex items-center justify-center gap-2" style={{ fontSize: "15px", fontWeight: 700 }}>
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {loading ? l("Creating...", "កំពុងបង្កើត...") : l("Create Account & Start Trial", "បង្កើតគណនី និង ចាប់ផ្តើមសាកល្បង")}
                </button>
              </div>
            </div>

            <p className="text-center text-gray-400 mt-6" style={{ fontSize: "13px" }}>
              {l("Already have an account?", "មានគណនីរួចហើយ?")} <button onClick={() => onNavigate("login")} className="text-[#22C55E] hover:underline" style={{ fontWeight: 600 }}>{l("Login", "ចូល")}</button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
