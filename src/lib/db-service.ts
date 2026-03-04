import { supabase, isSupabaseConfigured } from "./supabase";
import type { Tables, InsertTables, UpdateTables } from "./database.types";

type MenuItem = Tables<"menu_items">;
type Order = Tables<"orders">;
type Staff = Tables<"staff">;
type InventoryItem = Tables<"inventory">;
type Customer = Tables<"customers">;
type Promotion = Tables<"promotions">;
type AuditEntry = Tables<"audit_log">;

// ─── Menu Items ───

export async function getMenuItems(): Promise<MenuItem[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("menu_items")
    .select("*")
    .eq("active", true)
    .order("sort_order");
  return data ?? [];
}

export async function createMenuItem(item: InsertTables<"menu_items">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("menu_items")
    .insert(item)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateMenuItem(id: number, updates: UpdateTables<"menu_items">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("menu_items")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMenuItem(id: number) {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase
    .from("menu_items")
    .update({ active: false })
    .eq("id", id);
  if (error) throw error;
}

// ─── Orders ───

export async function getOrders(limit = 50): Promise<Order[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getOrdersByDateRange(from: string, to: string): Promise<Order[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("orders")
    .select("*")
    .gte("created_at", from)
    .lte("created_at", to)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function createOrder(order: InsertTables<"orders">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("orders")
    .insert(order)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateOrderStatus(id: number, status: string) {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase
    .from("orders")
    .update({ status })
    .eq("id", id);
  if (error) throw error;
}

// ─── Staff ───

export async function getStaff(): Promise<Staff[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("staff")
    .select("*")
    .order("created_at");
  return data ?? [];
}

export async function createStaffMember(staff: InsertTables<"staff">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("staff")
    .insert(staff)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateStaffMember(id: string, updates: UpdateTables<"staff">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("staff")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteStaffMember(id: string) {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase.from("staff").delete().eq("id", id);
  if (error) throw error;
}

// ─── Inventory ───

export async function getInventory(): Promise<InventoryItem[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("inventory")
    .select("*")
    .order("name");
  return data ?? [];
}

export async function createInventoryItem(item: InsertTables<"inventory">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("inventory")
    .insert(item)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateInventoryItem(id: number, updates: UpdateTables<"inventory">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("inventory")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteInventoryItem(id: number) {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase.from("inventory").delete().eq("id", id);
  if (error) throw error;
}

// ─── Customers ───

export async function getCustomers(): Promise<Customer[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("customers")
    .select("*")
    .order("name");
  return data ?? [];
}

export async function createCustomer(customer: InsertTables<"customers">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("customers")
    .insert(customer)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateCustomer(id: number, updates: UpdateTables<"customers">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("customers")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ─── Promotions ───

export async function getPromotions(): Promise<Promotion[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("promotions")
    .select("*")
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function createPromotion(promo: InsertTables<"promotions">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("promotions")
    .insert(promo)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updatePromotion(id: number, updates: UpdateTables<"promotions">) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from("promotions")
    .update(updates)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deletePromotion(id: number) {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase.from("promotions").delete().eq("id", id);
  if (error) throw error;
}

// ─── Audit Log ───

export async function getAuditLog(limit = 100): Promise<AuditEntry[]> {
  if (!isSupabaseConfigured()) return [];
  const { data } = await supabase
    .from("audit_log")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function addAuditEntry(entry: InsertTables<"audit_log">) {
  if (!isSupabaseConfigured()) return;
  await supabase.from("audit_log").insert(entry);
}

// ─── Restaurant Settings ───

export async function getRestaurantSettings() {
  if (!isSupabaseConfigured()) return null;
  const { data } = await supabase
    .from("restaurants")
    .select("id, name, settings, plan, trial_ends")
    .single();
  return data;
}

export async function updateRestaurantSettings(id: string, settings: Record<string, unknown>) {
  if (!isSupabaseConfigured()) return;
  const { error } = await supabase
    .from("restaurants")
    .update({ settings })
    .eq("id", id);
  if (error) throw error;
}

// ─── Dashboard Stats ───

export async function getDashboardStats() {
  if (!isSupabaseConfigured()) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString();

  const [ordersRes, menuRes, staffRes, customersRes] = await Promise.all([
    supabase.from("orders").select("total, status, created_at").gte("created_at", todayStr),
    supabase.from("menu_items").select("id", { count: "exact" }).eq("active", true),
    supabase.from("staff").select("id", { count: "exact" }).eq("status", "active"),
    supabase.from("customers").select("id", { count: "exact" }),
  ]);

  const todayOrders = ordersRes.data ?? [];
  const todayRevenue = todayOrders.reduce((s, o) => s + Number(o.total), 0);

  return {
    todayOrders: todayOrders.length,
    todayRevenue,
    totalMenuItems: menuRes.count ?? 0,
    activeStaff: staffRes.count ?? 0,
    totalCustomers: customersRes.count ?? 0,
  };
}
