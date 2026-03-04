import { useState } from "react";
import { useTranslation } from "../translation-context";
import { Clock, LogIn, LogOut, Calendar, Timer, AlertTriangle, User, ChefHat, Shield } from "lucide-react";
import { toast } from "sonner";

interface ShiftEntry {
  id: number;
  staffName: string;
  staffNameKm: string;
  role: string;
  date: string;
  clockIn: string;
  clockOut: string | null;
  scheduledStart: string;
  scheduledEnd: string;
  breakMinutes: number;
  status: "active" | "completed" | "late" | "absent";
}

const initialShifts: ShiftEntry[] = [
  { id: 1, staffName: "Sokha Chan", staffNameKm: "សុខា ចាន", role: "manager", date: "2026-03-03", clockIn: "07:55", clockOut: null, scheduledStart: "08:00", scheduledEnd: "17:00", breakMinutes: 60, status: "active" },
  { id: 2, staffName: "Dara Pich", staffNameKm: "ដារា ពិច", role: "cashier", date: "2026-03-03", clockIn: "08:02", clockOut: null, scheduledStart: "08:00", scheduledEnd: "16:00", breakMinutes: 45, status: "active" },
  { id: 3, staffName: "Veasna Kem", staffNameKm: "វាសនា កែម", role: "chef", date: "2026-03-03", clockIn: "09:15", clockOut: null, scheduledStart: "09:00", scheduledEnd: "18:00", breakMinutes: 60, status: "late" },
  { id: 4, staffName: "Bopha Meas", staffNameKm: "បុផ្ផា មាស", role: "waiter", date: "2026-03-03", clockIn: "", clockOut: null, scheduledStart: "11:00", scheduledEnd: "20:00", breakMinutes: 45, status: "absent" },
  { id: 5, staffName: "Sokha Chan", staffNameKm: "សុខា ចាន", role: "manager", date: "2026-03-02", clockIn: "07:58", clockOut: "17:05", scheduledStart: "08:00", scheduledEnd: "17:00", breakMinutes: 60, status: "completed" },
  { id: 6, staffName: "Dara Pich", staffNameKm: "ដារា ពិច", role: "cashier", date: "2026-03-02", clockIn: "08:00", clockOut: "16:02", scheduledStart: "08:00", scheduledEnd: "16:00", breakMinutes: 45, status: "completed" },
  { id: 7, staffName: "Veasna Kem", staffNameKm: "វាសនា កែម", role: "chef", date: "2026-03-02", clockIn: "09:00", clockOut: "18:10", scheduledStart: "09:00", scheduledEnd: "18:00", breakMinutes: 60, status: "completed" },
  { id: 8, staffName: "Bopha Meas", staffNameKm: "បុផ្ផា មាស", role: "waiter", date: "2026-03-02", clockIn: "10:55", clockOut: "20:00", scheduledStart: "11:00", scheduledEnd: "20:00", breakMinutes: 45, status: "completed" },
  { id: 9, staffName: "Sokha Chan", staffNameKm: "សុខា ចាន", role: "manager", date: "2026-03-01", clockIn: "08:00", clockOut: "17:30", scheduledStart: "08:00", scheduledEnd: "17:00", breakMinutes: 60, status: "completed" },
  { id: 10, staffName: "Dara Pich", staffNameKm: "ដារា ពិច", role: "cashier", date: "2026-03-01", clockIn: "08:10", clockOut: "16:00", scheduledStart: "08:00", scheduledEnd: "16:00", breakMinutes: 45, status: "completed" },
];

const roleIcons: Record<string, React.ReactNode> = { manager: <Shield size={12} />, cashier: <User size={12} />, chef: <ChefHat size={12} />, waiter: <User size={12} /> };
const statusColors: Record<string, string> = { active: "#22C55E", completed: "#3B82F6", late: "#F59E0B", absent: "#EF4444" };

function calcHours(clockIn: string, clockOut: string | null, breakMin: number): string {
  if (!clockIn || !clockOut) return "—";
  const [h1, m1] = clockIn.split(":").map(Number);
  const [h2, m2] = clockOut.split(":").map(Number);
  const totalMin = (h2 * 60 + m2) - (h1 * 60 + m1) - breakMin;
  const hrs = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  return `${hrs}h ${mins}m`;
}

export function StaffShifts() {
  const { lang, fontClass } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [shifts, setShifts] = useState<ShiftEntry[]>(initialShifts);
  const [filterDate, setFilterDate] = useState("2026-03-03");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const todayShifts = shifts.filter((s) => s.date === filterDate);
  const filtered = filterStatus === "all" ? todayShifts : todayShifts.filter((s) => s.status === filterStatus);
  const activeNow = todayShifts.filter((s) => s.status === "active" || s.status === "late").length;
  const lateCount = todayShifts.filter((s) => s.status === "late").length;
  const absentCount = todayShifts.filter((s) => s.status === "absent").length;

  const weeklyHours: Record<string, number> = {};
  shifts.filter((s) => s.status === "completed").forEach((s) => {
    if (!s.clockIn || !s.clockOut) return;
    const [h1, m1] = s.clockIn.split(":").map(Number);
    const [h2, m2] = s.clockOut.split(":").map(Number);
    const totalMin = (h2 * 60 + m2) - (h1 * 60 + m1) - s.breakMinutes;
    weeklyHours[s.staffName] = (weeklyHours[s.staffName] || 0) + totalMin / 60;
  });

  const handleClockOut = (id: number) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setShifts((p) => p.map((s) => s.id === id ? { ...s, clockOut: time, status: "completed" } : s));
    toast.success(l("Clocked out", "បានចេញម៉ោង"));
  };

  const handleClockIn = (id: number) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setShifts((p) => p.map((s) => s.id === id ? { ...s, clockIn: time, status: "active" } : s));
    toast.success(l("Clocked in", "បានចូលម៉ោង"));
  };

  return (
    <div className={`p-6 ${fontClass}`}>
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5"><Clock size={14} className="text-green-500" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("On Shift Now", "កំពុងធ្វើការ")}</p></div>
          <p className="text-[#22C55E]" style={{ fontSize: "22px", fontWeight: 700 }}>{activeNow}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5"><Calendar size={14} className="text-blue-500" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Total Shifts", "វេនសរុប")}</p></div>
          <p className="text-gray-900 dark:text-white" style={{ fontSize: "22px", fontWeight: 700 }}>{todayShifts.length}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5"><AlertTriangle size={14} className="text-yellow-500" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Late", "យឺត")}</p></div>
          <p className="text-yellow-500" style={{ fontSize: "22px", fontWeight: 700 }}>{lateCount}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-1.5"><User size={14} className="text-red-500" /><p className="text-gray-400" style={{ fontSize: "11px" }}>{l("Absent", "អវត្តមាន")}</p></div>
          <p className="text-red-500" style={{ fontSize: "22px", fontWeight: 700 }}>{absentCount}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} className="px-3 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "13px" }} />
        <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
          {["all", "active", "completed", "late", "absent"].map((s) => (
            <button key={s} onClick={() => setFilterStatus(s)} className={`px-2.5 py-1.5 rounded-md transition-all capitalize ${filterStatus === s ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
              {s === "all" ? l("All", "ទាំងអស់") : s}
            </button>
          ))}
        </div>
      </div>

      {/* Shift cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {filtered.map((s) => (
          <div key={s.id} className={`bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 ${s.status === "absent" ? "opacity-60" : ""}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500">{roleIcons[s.role]}</div>
                <div>
                  <p className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>{lang === "km" ? s.staffNameKm : s.staffName}</p>
                  <p className="text-gray-400 capitalize" style={{ fontSize: "11px" }}>{s.role}</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-lg capitalize" style={{ fontSize: "11px", fontWeight: 600, backgroundColor: `${statusColors[s.status]}15`, color: statusColors[s.status] }}>
                {s.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 flex items-center gap-1" style={{ fontSize: "10px" }}><Calendar size={10} />{l("Scheduled", "កាលវិភាគ")}</p>
                <p className="text-gray-700 dark:text-gray-300" style={{ fontSize: "14px", fontWeight: 600 }}>{s.scheduledStart} - {s.scheduledEnd}</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3">
                <p className="text-gray-400 flex items-center gap-1" style={{ fontSize: "10px" }}><Clock size={10} />{l("Actual", "ពិតប្រាកដ")}</p>
                <p className="text-gray-700 dark:text-gray-300" style={{ fontSize: "14px", fontWeight: 600 }}>{s.clockIn || "—"} - {s.clockOut || "..."}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 flex items-center gap-1" style={{ fontSize: "11px" }}><Timer size={11} />{l("Hours", "ម៉ោង")}: {calcHours(s.clockIn, s.clockOut, s.breakMinutes)}</span>
                <span className="text-gray-400" style={{ fontSize: "11px" }}>{l("Break", "សម្រាក")}: {s.breakMinutes}m</span>
              </div>
              {s.status === "active" || s.status === "late" ? (
                <button onClick={() => handleClockOut(s.id)} className="flex items-center gap-1 px-3 py-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 rounded-lg hover:bg-red-100 transition-colors" style={{ fontSize: "11px", fontWeight: 600 }}>
                  <LogOut size={13} />{l("Clock Out", "ចេញម៉ោង")}
                </button>
              ) : s.status === "absent" ? (
                <button onClick={() => handleClockIn(s.id)} className="flex items-center gap-1 px-3 py-1.5 bg-green-50 dark:bg-green-900/20 text-green-600 rounded-lg hover:bg-green-100 transition-colors" style={{ fontSize: "11px", fontWeight: 600 }}>
                  <LogIn size={13} />{l("Clock In", "ចូលម៉ោង")}
                </button>
              ) : null}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly hours summary */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5">
        <p className="text-gray-900 dark:text-white mb-4" style={{ fontSize: "15px", fontWeight: 600 }}>{l("Weekly Hours Summary", "សង្ខេបម៉ោងសប្ដាហ៍")}</p>
        <div className="space-y-3">
          {Object.entries(weeklyHours).map(([name, hrs]) => {
            const overtime = hrs > 40;
            return (
              <div key={name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-gray-700 dark:text-gray-300" style={{ fontSize: "13px", fontWeight: 500 }}>{name}</span>
                  <div className="flex items-center gap-2">
                    <span className={overtime ? "text-red-500" : "text-gray-600 dark:text-gray-400"} style={{ fontSize: "13px", fontWeight: 600 }}>{hrs.toFixed(1)}h</span>
                    {overtime && <span className="px-1.5 py-0.5 bg-red-50 dark:bg-red-900/20 text-red-500 rounded" style={{ fontSize: "10px", fontWeight: 600 }}>{l("OT", "បន្ថែម")}</span>}
                  </div>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${overtime ? "bg-red-500" : "bg-[#22C55E]"}`} style={{ width: `${Math.min((hrs / 48) * 100, 100)}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
