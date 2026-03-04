import { supabase, isSupabaseConfigured } from "./supabase";

export interface RegisterData {
  email: string;
  password: string;
  restaurantName: string;
  ownerName: string;
  phone: string;
  plan: "basic" | "pro" | "enterprise";
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  error?: string;
  restaurantId?: string;
  restaurant?: { id: string; name: string; owner_name: string; phone: string; email: string | null; plan: string; trial_ends: string | null; created_at: string };
}

export async function registerRestaurant(data: RegisterData): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return fallbackRegister(data);
  }

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: { owner_name: data.ownerName, phone: data.phone },
    },
  });

  if (authError) return { success: false, error: authError.message };
  if (!authData.user) return { success: false, error: "Registration failed" };

  const { data: restaurant, error: restError } = await supabase
    .from("restaurants")
    .insert({
      name: data.restaurantName,
      owner_name: data.ownerName,
      phone: data.phone,
      email: data.email,
      plan: data.plan,
      user_id: authData.user.id,
      trial_ends: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    })
    .select("id")
    .single();

  if (restError) return { success: false, error: restError.message };

  return { success: true, restaurantId: restaurant.id };
}

export async function loginUser(data: LoginData): Promise<AuthResult> {
  if (!isSupabaseConfigured()) {
    return fallbackLogin(data);
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) return { success: false, error: error.message };

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: true };

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("id, name, owner_name, phone, email, plan, trial_ends, created_at")
    .eq("user_id", user.id)
    .maybeSingle();

  return { success: true, restaurantId: restaurant?.id, restaurant };
}

export async function logoutUser() {
  if (isSupabaseConfigured()) {
    await supabase.auth.signOut();
  }
  localStorage.removeItem("battoclub_user");
}

export async function getCurrentUser() {
  if (!isSupabaseConfigured()) {
    const saved = localStorage.getItem("battoclub_user");
    return saved ? JSON.parse(saved) : null;
  }

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: restaurant } = await supabase
    .from("restaurants")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!restaurant) return null;
  return { ...restaurant, userId: user.id, email: user.email };
}

export function onAuthStateChange(callback: (user: unknown) => void) {
  if (!isSupabaseConfigured()) return { unsubscribe: () => {} };

  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (_event, session) => {
      if (session?.user) {
        const user = await getCurrentUser();
        callback(user);
      } else {
        callback(null);
      }
    }
  );

  return { unsubscribe: () => subscription.unsubscribe() };
}

function fallbackRegister(data: RegisterData): AuthResult {
  const user = {
    restaurantName: data.restaurantName,
    ownerName: data.ownerName,
    phone: data.phone,
    email: data.email,
    plan: data.plan,
    registeredAt: new Date().toISOString(),
    trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
  };
  localStorage.setItem("battoclub_user", JSON.stringify(user));
  return { success: true };
}

function fallbackLogin(data: LoginData): AuthResult {
  if (data.email === "demo@battoclub.com" && data.password === "demo123") {
    const user = {
      restaurantName: "Demo Restaurant",
      ownerName: "Demo User",
      phone: "012345678",
      email: "demo@battoclub.com",
      plan: "pro",
      registeredAt: new Date().toISOString(),
      trialEnds: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    };
    localStorage.setItem("battoclub_user", JSON.stringify(user));
    return { success: true };
  }

  const saved = localStorage.getItem("battoclub_user");
  if (saved) {
    const user = JSON.parse(saved);
    if (user.email === data.email) return { success: true };
  }

  return { success: false, error: "Invalid email or password" };
}
