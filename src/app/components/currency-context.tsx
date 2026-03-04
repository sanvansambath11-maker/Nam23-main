import { createContext, useContext, useState, type ReactNode } from "react";

export type Currency = "USD" | "KHR";

const KHR_RATE = 4100;

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (usdAmount: number) => string;
  formatDual: (usdAmount: number) => { usd: string; khr: string };
  roundKHR: (khrAmount: number) => number;
  khrRate: number;
}

const CurrencyContext = createContext<CurrencyContextType>({
  currency: "USD",
  setCurrency: () => {},
  formatPrice: (a) => `$${a.toFixed(2)}`,
  formatDual: (a) => ({ usd: `$${a.toFixed(2)}`, khr: `${(a * KHR_RATE).toLocaleString()} R` }),
  roundKHR: (a) => Math.round(a / 100) * 100,
  khrRate: KHR_RATE,
});

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>("USD");

  const roundKHR = (khrAmount: number) => Math.round(khrAmount / 100) * 100;

  const formatPrice = (usdAmount: number): string => {
    if (currency === "KHR") {
      const khr = roundKHR(usdAmount * KHR_RATE);
      return `${khr.toLocaleString()}\u17DB`;
    }
    return `$${usdAmount.toFixed(2)}`;
  };

  const formatDual = (usdAmount: number) => ({
    usd: `$${usdAmount.toFixed(2)}`,
    khr: `${roundKHR(usdAmount * KHR_RATE).toLocaleString()}\u17DB`,
  });

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatPrice, formatDual, roundKHR, khrRate: KHR_RATE }}>
      {children}
    </CurrencyContext.Provider>
  );
}
