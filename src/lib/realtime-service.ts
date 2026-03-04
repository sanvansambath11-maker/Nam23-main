import { supabase, isSupabaseConfigured } from "./supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

type ChangeCallback<T> = (payload: {
  eventType: "INSERT" | "UPDATE" | "DELETE";
  new: T;
  old: T;
}) => void;

export function subscribeToTable<T>(
  table: string,
  callback: ChangeCallback<T>
): RealtimeChannel | null {
  if (!isSupabaseConfigured()) return null;

  const channel = supabase
    .channel(`${table}-changes`)
    .on(
      "postgres_changes" as never,
      { event: "*", schema: "public", table },
      (payload: { eventType: "INSERT" | "UPDATE" | "DELETE"; new: T; old: T }) => {
        callback(payload);
      }
    )
    .subscribe();

  return channel;
}

export function unsubscribe(channel: RealtimeChannel | null) {
  if (channel) {
    supabase.removeChannel(channel);
  }
}

export function subscribeToOrders(callback: ChangeCallback<unknown>) {
  return subscribeToTable("orders", callback);
}

export function subscribeToMenuItems(callback: ChangeCallback<unknown>) {
  return subscribeToTable("menu_items", callback);
}

export function subscribeToInventory(callback: ChangeCallback<unknown>) {
  return subscribeToTable("inventory", callback);
}
