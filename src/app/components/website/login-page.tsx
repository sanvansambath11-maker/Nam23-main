import { useState } from "react";
import { useTranslation } from "../translation-context";
import { Eye, EyeOff, LogIn, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { loginUser } from "../../../lib/auth-service";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
}

export function LoginPage({ onNavigate, onLoginSuccess }: LoginPageProps) {
  const { lang } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const cls = "w-full px-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300 focus:border-[#22C55E] transition-colors";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error(l("Please enter email and password", "សូមបញ្ចូលអ៊ីមែល និង ពាក្យសម្ងាត់"));
      return;
    }

    setLoading(true);
    try {
      const result = await loginUser({ email: form.email, password: form.password });

      if (!result.success) {
        toast.error(result.error ?? l("Invalid email or password", "អ៊ីមែល ឬ ពាក្យសម្ងាត់មិនត្រឹមត្រូវ"));
        return;
      }

      if (result.restaurant) {
        localStorage.setItem("battoclub_user", JSON.stringify({
          restaurantName: result.restaurant.name,
          ownerName: result.restaurant.owner_name,
          phone: result.restaurant.phone,
          email: result.restaurant.email ?? form.email,
          plan: result.restaurant.plan,
          registeredAt: result.restaurant.created_at,
          trialEnds: result.restaurant.trial_ends ?? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        }));
      }

      const userName = result.restaurant?.owner_name ?? "";
      toast.success(`${l("Welcome back", "សូមស្វាគមន៍មកវិញ")}${userName ? `, ${userName}` : ""}!`, { duration: 2000 });
      onLoginSuccess();
    } catch {
      toast.error(l("Something went wrong", "មានបញ្ហាកើតឡើង"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img src="/images/logo.png" alt="Batto Club" className="h-14 w-14 rounded-2xl object-cover" />
          </div>
          <h1 className="text-gray-900 dark:text-white mb-2" style={{ fontSize: "28px", fontWeight: 800 }}>{l("Welcome Back", "សូមស្វាគមន៍មកវិញ")}</h1>
          <p className="text-gray-500" style={{ fontSize: "14px" }}>{l("Log in to your Batto Club dashboard", "ចូលទៅផ្ទាំងគ្រប់គ្រង Batto Club របស់អ្នក")}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-8 space-y-4">
          <div>
            <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Email", "អ៊ីមែល")}</label>
            <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder="you@example.com" autoFocus />
          </div>

          <div className="relative">
            <label className="block text-gray-500 mb-1.5" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Password", "ពាក្យសម្ងាត់")}</label>
            <input type={showPass ? "text" : "password"} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={cls} style={{ fontSize: "14px" }} placeholder="••••••••" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-gray-400">{showPass ? <EyeOff size={16} /> : <Eye size={16} />}</button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded accent-[#22C55E]" />
              <span className="text-gray-500" style={{ fontSize: "12px" }}>{l("Remember me", "ចងចាំខ្ញុំ")}</span>
            </label>
            <button type="button" className="text-[#22C55E] hover:underline" style={{ fontSize: "12px", fontWeight: 500 }}>{l("Forgot password?", "ភ្លេចពាក្យសម្ងាត់?")}</button>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 dark:shadow-green-900 flex items-center justify-center gap-2 disabled:opacity-50" style={{ fontSize: "15px", fontWeight: 700 }}>
            {loading ? <Loader2 size={18} className="animate-spin" /> : <LogIn size={18} />}
            {loading ? l("Logging in...", "កំពុងចូល...") : l("Login", "ចូល")}
          </button>

          {/* Demo credentials */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-3 mt-2">
            <p className="text-blue-600 dark:text-blue-400 mb-1" style={{ fontSize: "11px", fontWeight: 600 }}>{l("Demo Account", "គណនីបង្ហាញ")}:</p>
            <p className="text-blue-500 dark:text-blue-400 font-mono" style={{ fontSize: "12px" }}>demo@battoclub.com &nbsp; 🔑 demo123</p>
          </div>
        </form>

        <p className="text-center text-gray-400 mt-6" style={{ fontSize: "13px" }}>
          {l("Don't have an account?", "មិនមានគណនី?")} <button onClick={() => onNavigate("register")} className="text-[#22C55E] hover:underline" style={{ fontWeight: 600 }}>{l("Register Free", "ចុះឈ្មោះឥតគិតថ្លៃ")}</button>
        </p>
      </div>
    </div>
  );
}
