import { useState } from "react";
import { useTranslation } from "../translation-context";
import { Shield, Plus, Edit2, Trash2, Check, X, Lock, Unlock, Eye } from "lucide-react";
import { toast } from "sonner";

interface Permission {
  key: string;
  label: string;
  labelKm: string;
  category: string;
}

const allPermissions: Permission[] = [
  { key: "pos.access", label: "POS Access", labelKm: "ចូល POS", category: "POS" },
  { key: "pos.discount", label: "Apply Discounts", labelKm: "បញ្ចុះតម្លៃ", category: "POS" },
  { key: "pos.void", label: "Void Orders", labelKm: "បោះបង់បញ្ជា", category: "POS" },
  { key: "kitchen.access", label: "Kitchen Display", labelKm: "ផ្ទាំងផ្ទះបាយ", category: "Kitchen" },
  { key: "tables.access", label: "Table Management", labelKm: "គ្រប់គ្រងតុ", category: "Tables" },
  { key: "analytics.access", label: "View Analytics", labelKm: "មើលវិភាគ", category: "Analytics" },
  { key: "history.access", label: "Order History", labelKm: "ប្រវត្តិបញ្ជា", category: "History" },
  { key: "admin.access", label: "Admin Panel", labelKm: "ផ្ទាំងគ្រប់គ្រង", category: "Admin" },
  { key: "admin.staff", label: "Staff Management", labelKm: "គ្រប់គ្រងបុគ្គលិក", category: "Admin" },
  { key: "admin.menu", label: "Menu Management", labelKm: "គ្រប់គ្រងម៉ឺន", category: "Admin" },
  { key: "admin.settings", label: "Settings", labelKm: "កំណត់", category: "Admin" },
  { key: "admin.reports", label: "View Reports", labelKm: "មើលរបាយការណ៍", category: "Admin" },
  { key: "admin.inventory", label: "Inventory", labelKm: "ស្តុក", category: "Admin" },
  { key: "admin.promotions", label: "Promotions", labelKm: "ប្រូម៉ូសិន", category: "Admin" },
  { key: "admin.customers", label: "Customers", labelKm: "អតិថិជន", category: "Admin" },
  { key: "admin.audit", label: "Audit Log", labelKm: "កំណត់ហេតុ", category: "Admin" },
  { key: "admin.backup", label: "Data Backup", labelKm: "បម្រុងទុក", category: "Admin" },
  { key: "admin.roles", label: "Roles & Permissions", labelKm: "តួនាទី", category: "Admin" },
];

interface CustomRole {
  id: number;
  name: string;
  nameKm: string;
  description: string;
  color: string;
  isSystem: boolean;
  permissions: string[];
}

const initialRoles: CustomRole[] = [
  { id: 1, name: "Manager", nameKm: "អ្នកគ្រប់គ្រង", description: "Full access to all features", color: "#A855F7", isSystem: true, permissions: allPermissions.map((p) => p.key) },
  { id: 2, name: "Cashier", nameKm: "អ្នកគិតប្រាក់", description: "POS, tables, and order history", color: "#3B82F6", isSystem: true, permissions: ["pos.access", "pos.discount", "tables.access", "history.access"] },
  { id: 3, name: "Chef", nameKm: "ចុងភៅ", description: "Kitchen display and POS view", color: "#F59E0B", isSystem: true, permissions: ["pos.access", "kitchen.access"] },
  { id: 4, name: "Waiter", nameKm: "អ្នកបម្រើ", description: "POS and table management", color: "#22C55E", isSystem: true, permissions: ["pos.access", "tables.access"] },
  { id: 5, name: "Supervisor", nameKm: "អ្នកត្រួតពិនិត្យ", description: "Extended access with some admin", color: "#EC4899", isSystem: false, permissions: ["pos.access", "pos.discount", "pos.void", "kitchen.access", "tables.access", "analytics.access", "history.access", "admin.access", "admin.reports"] },
];

let nextRoleId = 20;

export function RolesPermissions() {
  const { lang, fontClass } = useTranslation();
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [roles, setRoles] = useState<CustomRole[]>(initialRoles);
  const [selectedRole, setSelectedRole] = useState<CustomRole | null>(roles[0]);
  const [showModal, setShowModal] = useState(false);
  const [editRole, setEditRole] = useState<CustomRole | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const permCategories = [...new Set(allPermissions.map((p) => p.category))];

  const handleSave = (data: CustomRole) => {
    if (editRole) {
      setRoles((p) => p.map((r) => (r.id === data.id ? data : r)));
      if (selectedRole?.id === data.id) setSelectedRole(data);
      toast.success(l("Role updated", "បានកែប្រែតួនាទី"));
    } else {
      const newRole = { ...data, id: nextRoleId++ };
      setRoles((p) => [...p, newRole]);
      setSelectedRole(newRole);
      toast.success(l("Role created", "បានបង្កើតតួនាទី"));
    }
    setShowModal(false);
    setEditRole(null);
  };

  const togglePermission = (roleId: number, permKey: string) => {
    setRoles((p) => p.map((r) => {
      if (r.id !== roleId || r.isSystem) return r;
      const has = r.permissions.includes(permKey);
      const newPerms = has ? r.permissions.filter((p) => p !== permKey) : [...r.permissions, permKey];
      const updated = { ...r, permissions: newPerms };
      if (selectedRole?.id === roleId) setSelectedRole(updated);
      return updated;
    }));
  };

  return (
    <div className={`p-6 ${fontClass}`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles list */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "15px", fontWeight: 600 }}>{l("Roles", "តួនាទី")}</h3>
            <button onClick={() => { setEditRole(null); setShowModal(true); }} className="flex items-center gap-1 px-3 py-1.5 bg-[#22C55E] text-white rounded-lg hover:bg-green-600 transition-colors" style={{ fontSize: "12px", fontWeight: 600 }}>
              <Plus size={14} />{l("New", "ថ្មី")}
            </button>
          </div>
          <div className="space-y-2">
            {roles.map((role) => (
              <div key={role.id} className={`bg-white dark:bg-gray-900 rounded-xl border p-3.5 cursor-pointer transition-all ${selectedRole?.id === role.id ? "border-[#22C55E] shadow-md" : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"}`} onClick={() => setSelectedRole(role)}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${role.color}15`, color: role.color }}><Shield size={15} /></div>
                    <div>
                      <p className="text-gray-900 dark:text-white" style={{ fontSize: "13px", fontWeight: 600 }}>{lang === "km" ? role.nameKm : role.name}</p>
                      <p className="text-gray-400" style={{ fontSize: "10px" }}>{role.permissions.length} {l("permissions", "សិទ្ធិ")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {role.isSystem && <Lock size={11} className="text-gray-400" />}
                    {!role.isSystem && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); setEditRole(role); setShowModal(true); }} className="p-1 rounded text-gray-400 hover:text-blue-500"><Edit2 size={12} /></button>
                        {deleteConfirm === role.id ? (
                          <><button onClick={(e) => { e.stopPropagation(); setRoles((p) => p.filter((r) => r.id !== role.id)); if (selectedRole?.id === role.id) setSelectedRole(roles[0]); setDeleteConfirm(null); toast.success(l("Deleted", "បានលុប")); }} className="p-1 bg-red-500 text-white rounded"><Check size={10} /></button><button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(null); }} className="p-1 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded"><X size={10} /></button></>
                        ) : (
                          <button onClick={(e) => { e.stopPropagation(); setDeleteConfirm(role.id); }} className="p-1 rounded text-gray-400 hover:text-red-500"><Trash2 size={12} /></button>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Permissions grid */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${selectedRole.color}15`, color: selectedRole.color }}><Shield size={20} /></div>
                  <div>
                    <p className="text-gray-900 dark:text-white" style={{ fontSize: "16px", fontWeight: 600 }}>{lang === "km" ? selectedRole.nameKm : selectedRole.name}</p>
                    <p className="text-gray-400" style={{ fontSize: "11px" }}>{selectedRole.description}</p>
                  </div>
                </div>
                {selectedRole.isSystem && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-400 rounded-lg" style={{ fontSize: "11px" }}><Lock size={11} />{l("System Role", "តួនាទីប្រព័ន្ធ")}</span>
                )}
              </div>

              <div className="p-5 space-y-5">
                {permCategories.map((cat) => {
                  const catPerms = allPermissions.filter((p) => p.category === cat);
                  return (
                    <div key={cat}>
                      <p className="text-gray-500 mb-2" style={{ fontSize: "12px", fontWeight: 600 }}>{cat}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {catPerms.map((perm) => {
                          const has = selectedRole.permissions.includes(perm.key);
                          return (
                            <button key={perm.key} onClick={() => togglePermission(selectedRole.id, perm.key)} disabled={selectedRole.isSystem} className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl border transition-all ${has ? "border-[#22C55E]/30 bg-[#22C55E]/5" : "border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700"} ${selectedRole.isSystem ? "cursor-default" : "cursor-pointer"}`}>
                              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${has ? "bg-[#22C55E] text-white" : "bg-gray-100 dark:bg-gray-800"}`}>
                                {has ? <Check size={12} /> : null}
                              </div>
                              <div className="text-left flex-1">
                                <p className={`${has ? "text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "12px", fontWeight: has ? 600 : 400 }}>{lang === "km" ? perm.labelKm : perm.label}</p>
                              </div>
                              {has ? <Unlock size={11} className="text-green-500" /> : <Lock size={11} className="text-gray-300 dark:text-gray-700" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Role preview */}
              <div className="px-5 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30">
                <p className="text-gray-400 flex items-center gap-1 mb-2" style={{ fontSize: "11px" }}><Eye size={11} />{l("Access Preview", "មើលជាមុន")}</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedRole.permissions.map((p) => {
                    const perm = allPermissions.find((x) => x.key === p);
                    return (
                      <span key={p} className="px-2 py-0.5 bg-[#22C55E]/10 text-[#22C55E] rounded-md" style={{ fontSize: "10px", fontWeight: 500 }}>{lang === "km" ? perm?.labelKm : perm?.label}</span>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 text-gray-400">
              <div className="text-center"><Shield size={40} className="mx-auto mb-2 opacity-30" /><p style={{ fontSize: "14px" }}>{l("Select a role", "ជ្រើសរើសតួនាទី")}</p></div>
            </div>
          )}
        </div>
      </div>

      {/* Create/Edit modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={() => { setShowModal(false); setEditRole(null); }}>
          <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
              <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "16px", fontWeight: 600 }}>{editRole ? l("Edit Role", "កែប្រែ") : l("Create Role", "បង្កើតតួនាទី")}</h3>
              <button onClick={() => { setShowModal(false); setEditRole(null); }} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg"><X size={18} /></button>
            </div>
            <RoleForm role={editRole} onSave={handleSave} lang={lang} />
          </div>
        </div>
      )}
    </div>
  );
}

const roleColors = ["#A855F7", "#3B82F6", "#F59E0B", "#22C55E", "#EC4899", "#EF4444", "#14B8A6", "#6366F1"];

function RoleForm({ role, onSave, lang }: { role: CustomRole | null; onSave: (d: CustomRole) => void; lang: string }) {
  const l = (en: string, km: string) => (lang === "km" ? km : en);
  const [form, setForm] = useState<CustomRole>(role ?? { id: 0, name: "", nameKm: "", description: "", color: "#3B82F6", isSystem: false, permissions: ["pos.access"] });
  const cls = "w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300";

  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Name (EN)", "ឈ្មោះ (EN)")}</label><input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
        <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Name (KM)", "ឈ្មោះ (ខ្មែរ)")}</label><input type="text" value={form.nameKm} onChange={(e) => setForm({ ...form, nameKm: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      </div>
      <div><label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Description", "ការពិពណ៌នា")}</label><input type="text" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={cls} style={{ fontSize: "13px" }} /></div>
      <div>
        <label className="block text-gray-500 mb-1" style={{ fontSize: "12px" }}>{l("Color", "ពណ៌")}</label>
        <div className="flex gap-2">
          {roleColors.map((c) => (
            <button key={c} onClick={() => setForm({ ...form, color: c })} className={`w-8 h-8 rounded-lg transition-all ${form.color === c ? "ring-2 ring-offset-2 ring-gray-400 scale-110" : "hover:scale-105"}`} style={{ backgroundColor: c }} />
          ))}
        </div>
      </div>
      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex justify-end">
        <button onClick={() => { if (!form.name.trim()) { toast.error("Name required"); return; } onSave(form); }} className="px-5 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 shadow-md" style={{ fontSize: "13px", fontWeight: 600 }}>{role ? l("Save", "រក្សាទុក") : l("Create", "បង្កើត")}</button>
      </div>
    </div>
  );
}
