import { useState, useEffect, useCallback } from "react";
import { isSupabaseConfigured } from "./supabase";
import * as db from "./db-service";
import * as storage from "./storage-service";
import * as realtime from "./realtime-service";
import type { Tables, InsertTables, UpdateTables } from "./database.types";

type MenuItem = Tables<"menu_items">;
type Order = Tables<"orders">;

export function useSupabaseMenu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();

  const fetchItems = useCallback(async () => {
    if (!configured) return;
    setLoading(true);
    try {
      const data = await db.getMenuItems();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [configured]);

  useEffect(() => {
    fetchItems();
    const channel = realtime.subscribeToMenuItems(() => fetchItems());
    return () => { realtime.unsubscribe(channel); };
  }, [fetchItems]);

  const addItem = async (item: InsertTables<"menu_items">) => {
    const created = await db.createMenuItem(item);
    if (created) setItems((prev) => [...prev, created]);
    return created;
  };

  const editItem = async (id: number, updates: UpdateTables<"menu_items">) => {
    const updated = await db.updateMenuItem(id, updates);
    if (updated) setItems((prev) => prev.map((i) => (i.id === id ? updated : i)));
    return updated;
  };

  const removeItem = async (id: number) => {
    await db.deleteMenuItem(id);
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const uploadImage = async (file: File) => {
    return storage.uploadMenuImage(file);
  };

  return { items, loading, configured, fetchItems, addItem, editItem, removeItem, uploadImage };
}

export function useSupabaseOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();

  const fetchOrders = useCallback(async (limit = 50) => {
    if (!configured) return;
    setLoading(true);
    try {
      const data = await db.getOrders(limit);
      setOrders(data);
    } finally {
      setLoading(false);
    }
  }, [configured]);

  useEffect(() => {
    fetchOrders();
    const channel = realtime.subscribeToOrders(() => fetchOrders());
    return () => { realtime.unsubscribe(channel); };
  }, [fetchOrders]);

  const addOrder = async (order: InsertTables<"orders">) => {
    const created = await db.createOrder(order);
    if (created) setOrders((prev) => [created, ...prev]);
    return created;
  };

  const changeStatus = async (id: number, status: string) => {
    await db.updateOrderStatus(id, status);
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: status as Order["status"] } : o)));
  };

  return { orders, loading, configured, fetchOrders, addOrder, changeStatus };
}

export function useSupabaseTable<T extends keyof TableConfig>(table: T) {
  type Row = TableConfig[T]["row"];
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();

  const fetchFn = tableGetters[table];

  const fetchData = useCallback(async () => {
    if (!configured || !fetchFn) return;
    setLoading(true);
    try {
      const result = await (fetchFn as () => Promise<Row[]>)();
      setData(result);
    } finally {
      setLoading(false);
    }
  }, [configured, fetchFn]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, configured, refetch: fetchData, setData };
}

interface TableConfig {
  staff: { row: Tables<"staff"> };
  inventory: { row: Tables<"inventory"> };
  customers: { row: Tables<"customers"> };
  promotions: { row: Tables<"promotions"> };
  audit_log: { row: Tables<"audit_log"> };
}

const tableGetters: Record<string, () => Promise<unknown[]>> = {
  staff: db.getStaff,
  inventory: db.getInventory,
  customers: db.getCustomers,
  promotions: db.getPromotions,
  audit_log: db.getAuditLog,
};

export function useSupabaseDashboard() {
  const [stats, setStats] = useState<Awaited<ReturnType<typeof db.getDashboardStats>>>(null);
  const [loading, setLoading] = useState(false);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (!configured) return;
    setLoading(true);
    db.getDashboardStats().then((s) => {
      setStats(s);
      setLoading(false);
    });
  }, [configured]);

  return { stats, loading, configured };
}
