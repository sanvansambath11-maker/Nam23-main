export interface Database {
  public: {
    Tables: {
      restaurants: {
        Row: {
          id: string;
          name: string;
          owner_name: string;
          phone: string;
          email: string | null;
          plan: "basic" | "pro" | "enterprise";
          trial_ends: string | null;
          created_at: string;
          settings: RestaurantSettings | null;
        };
        Insert: Omit<Database["public"]["Tables"]["restaurants"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["restaurants"]["Insert"]>;
      };
      menu_items: {
        Row: {
          id: number;
          restaurant_id: string;
          name: string;
          name_km: string;
          price: number;
          old_price: number | null;
          image_url: string;
          discount: number | null;
          recommended: boolean;
          rating: number;
          category: string;
          sizes: MenuItemSize[] | null;
          add_ons: MenuItemAddOn[] | null;
          has_spice: boolean;
          customization_enabled: boolean;
          sort_order: number;
          active: boolean;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["menu_items"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["menu_items"]["Insert"]>;
      };
      orders: {
        Row: {
          id: number;
          restaurant_id: string;
          order_number: string;
          items: OrderItemData[];
          subtotal: number;
          vat: number;
          discount: number;
          total: number;
          payment_method: string | null;
          status: "pending" | "preparing" | "ready" | "served" | "cancelled";
          table_number: number | null;
          customer_name: string | null;
          staff_id: string | null;
          notes: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["orders"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
      };
      staff: {
        Row: {
          id: string;
          restaurant_id: string;
          user_id: string | null;
          name: string;
          role: "manager" | "cashier" | "chef" | "waiter";
          email: string | null;
          phone: string | null;
          avatar: string | null;
          status: "active" | "inactive";
          pin: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["staff"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["staff"]["Insert"]>;
      };
      inventory: {
        Row: {
          id: number;
          restaurant_id: string;
          name: string;
          category: string;
          quantity: number;
          unit: string;
          min_stock: number;
          max_stock: number;
          cost_per_unit: number;
          supplier: string | null;
          last_restocked: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["inventory"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["inventory"]["Insert"]>;
      };
      customers: {
        Row: {
          id: number;
          restaurant_id: string;
          name: string;
          phone: string | null;
          email: string | null;
          points: number;
          tier: "bronze" | "silver" | "gold" | "platinum";
          visits: number;
          total_spent: number;
          last_visit: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["customers"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["customers"]["Insert"]>;
      };
      promotions: {
        Row: {
          id: number;
          restaurant_id: string;
          name: string;
          code: string;
          type: "percentage" | "fixed" | "bogo";
          value: number;
          min_order: number;
          max_uses: number;
          used_count: number;
          start_date: string;
          end_date: string;
          status: "active" | "inactive" | "expired";
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["promotions"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["promotions"]["Insert"]>;
      };
      audit_log: {
        Row: {
          id: number;
          restaurant_id: string;
          user_name: string;
          action: string;
          category: string;
          detail: string;
          ip_address: string | null;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["audit_log"]["Row"], "id" | "created_at">;
        Update: Partial<Database["public"]["Tables"]["audit_log"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export interface MenuItemSize {
  key: string;
  en: string;
  km: string;
  priceMod: number;
}

export interface MenuItemAddOn {
  key: string;
  en: string;
  km: string;
  price: number;
}

export interface OrderItemData {
  name: string;
  price: number;
  quantity: number;
  modifications?: string[];
}

export interface RestaurantSettings {
  taxRate: number;
  currency: string;
  language: string;
  telegramBotToken?: string;
  telegramChatId?: string;
  telegramNotify?: boolean;
  telegramAlerts?: Record<string, boolean>;
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
