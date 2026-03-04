import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { StaffRole } from "./staff-login";

export interface AuthUser {
  id: number;
  name: string;
  nameKm: string;
  role: StaffRole;
  pin: string;
  avatar: string;
  initials: string;
  color: string;
  isActive: boolean;
}

interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: AuthUser) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

export type Permission =
  | "pos.access"
  | "kitchen.access"
  | "tables.access"
  | "analytics.access"
  | "history.access"
  | "admin.access"
  | "admin.staff"
  | "admin.menu"
  | "admin.settings";

const rolePermissions: Record<StaffRole, Permission[]> = {
  manager: [
    "pos.access",
    "kitchen.access",
    "tables.access",
    "analytics.access",
    "history.access",
    "admin.access",
    "admin.staff",
    "admin.menu",
    "admin.settings",
  ],
  cashier: [
    "pos.access",
    "tables.access",
    "history.access",
  ],
  chef: [
    "kitchen.access",
    "pos.access",
  ],
  waiter: [
    "pos.access",
    "tables.access",
  ],
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  hasPermission: () => false,
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((u: AuthUser) => {
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (!user) return false;
      return rolePermissions[user.role]?.includes(permission) ?? false;
    },
    [user]
  );

  const isAdmin = user?.role === "manager";

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isAdmin, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}
