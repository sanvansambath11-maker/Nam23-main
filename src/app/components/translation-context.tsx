import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "km";

const en: Record<string, string> = {
  search: "Search menu, orders...",
  reservation: "Reservation",
  menu: "Menu",
  delivery: "Delivery",
  accounting: "Accounting",
  kitchen: "Kitchen",
  tables: "Tables",
  analytics: "Analytics",
  history: "History",
  cashier: "Cashier",
  orderList: "Order List",
  viewAll: "View All",
  items: "items",
  ready: "Ready",
  inProgress: "In Progress",
  inKitchen: "In the Kitchen",
  categories: "Categories",
  allMenu: "All Menu",
  burger: "Burger",
  juice: "Juice",
  bento: "Bento",
  salad: "Salad",
  tacos: "Tacos",
  sushi: "Sushi",
  oden: "Oden",
  specialMenu: "Special menu for you",
  recommended: "Recommended",
  addNote: "Add note...",
  customize: "Customize",
  addToOrder: "Add to Order",
  noResults: "No items found",
  orderDetails: "Order Details",
  dineIn: "Dine In",
  noItems: "No items yet",
  addFromMenu: "Add items from the menu",
  subtotal: "Subtotal",
  tax: "Tax",
  discount: "Discount",
  total: "Total",
  pay: "Pay",
  splitBill: "Split Bill",
  receipt: "Receipt",
  payment: "Payment",
  paymentMethod: "Payment Method",
  cash: "Cash",
  card: "Card",
  qrCode: "QR Code",
  confirmPayment: "Confirm Payment",
  paymentSuccess: "Payment Successful!",
  amountReceived: "Amount Received",
  change: "Change",
  darkMode: "Dark Mode",
  language: "Language",
  close: "Close",
  cancel: "Cancel",
  notifications: "Notifications",
  kitchenDisplay: "Kitchen Display",
  newOrder: "New",
  cooking: "Cooking",
  done: "Done",
  tableMap: "Table Map",
  available: "Available",
  occupied: "Occupied",
  reserved: "Reserved",
  salesAnalytics: "Sales Analytics",
  revenue: "Revenue",
  orders: "Orders",
  daily: "Daily",
  weekly: "Weekly",
  orderHistory: "Order History",
  completed: "Completed",
  printReceipt: "Print Receipt",
  thankYou: "Thank you for dining with us!",
  numPeople: "Number of People",
  perPerson: "Per Person",
  off: "OFF",
  extraPickles: "Extra pickles",
  noOnions: "No onions",
  lessSugar: "Less sugar",
  removeLettuce: "Remove lettuce",
  // Cambodia specific
  vat: "VAT",
  khqr: "KHQR",
  abaPay: "ABA Pay",
  acleda: "ACLEDA",
  wing: "Wing",
  piPay: "Pi Pay",
  trueMoney: "True Money",
  bakong: "Bakong",
  currencyLabel: "Currency",
  exchangeRate: "Exchange Rate",
  tin: "TIN",
  telegramNotify: "Telegram Notify",
  grab: "Grab",
  foodPanda: "FoodPanda",
  platform: "Platform",
  phone: "Phone",
  address: "Address",
  rice: "Rice",
  noodle: "Noodle",
  drinks: "Drinks",
  dessert: "Dessert",
  khmer: "Khmer",
  seafood: "Seafood",
  soup: "Soup",
  date: "Date",
  time: "Time",
  sentToKitchen: "Sent to kitchen",
  sentToTelegram: "Sent to Telegram",
  changeKHR: "Change (KHR)",
  rounded: "Rounded",
  customers: "Customers",
  avgOrder: "Avg Order",
  // New features
  staffLogin: "Staff Login",
  enterPin: "Enter your PIN",
  incorrectPin: "Incorrect PIN",
  selectProfile: "Select your profile",
  manager: "Manager",
  waiter: "Waiter",
  chef: "Chef",
  logout: "Logout",
  orderType: "Order Type",
  takeaway: "Takeaway",
  portionSize: "Portion Size",
  spiceLevel: "Spice Level",
  addOns: "Add-ons",
  specialNotes: "Special Notes",
  todayRevenue: "Today's Revenue",
  dailySummary: "Daily Summary",
  peakHours: "Peak Hours",
  topSelling: "Top Selling Items",
  endOfDay: "End of Day Report",
  sold: "sold",
  small: "Small",
  medium: "Medium",
  large: "Large",
};

// Khmer translations
const km: Record<string, string> = {};
km.search = "\u179F\u17D2\u179C\u17C2\u1784\u179A\u1780...";
km.reservation = "\u1780\u1780\u17CB\u1791\u17BB\u1780";
km.menu = "\u1798\u17C9\u17BA\u1793\u17BB\u1799";
km.delivery = "\u178A\u17B9\u1780\u1787\u1789\u17D2\u1787\u17BC\u1793";
km.accounting = "\u1782\u178E\u1793\u17C1\u1799\u17D2\u1799";
km.kitchen = "\u1795\u17D2\u1791\u17C7\u1794\u17B6\u1799";
km.tables = "\u178F\u17BB";
km.analytics = "\u179C\u17B7\u1797\u17B6\u1782";
km.history = "\u1794\u17D2\u179A\u179C\u178F\u17D2\u178F\u17B7";
km.cashier = "\u17A2\u17D2\u1793\u1780\u1782\u17B7\u178F\u179B\u17BB\u1799";
km.orderList = "\u1794\u1789\u17D2\u1787\u17B8\u1794\u1789\u17D2\u1787\u17B6";
km.viewAll = "\u1798\u17BE\u179B\u1791\u17B6\u17C6\u1784\u17A2\u179F\u17CB";
km.items = "\u1798\u17BB\u1781";
km.ready = "\u179A\u17BD\u1785\u179A\u17B6\u179B\u17CB";
km.inProgress = "\u1780\u17C6\u1796\u17BB\u1784\u178B\u17D2\u179C\u17BE";
km.inKitchen = "\u1780\u17D2\u1793\u17BB\u1784\u1795\u17D2\u1791\u17C7\u1794\u17B6\u1799";
km.categories = "\u1794\u17D2\u179A\u1797\u17C1\u1791";
km.allMenu = "\u1798\u17C9\u17BA\u1793\u17BB\u1799\u1791\u17B6\u17C6\u1784\u17A2\u179F\u17CB";
km.burger = "\u1794\u17BA\u17A0\u17D2\u1782\u17BE";
km.juice = "\u1791\u17B9\u1780\u1795\u17D2\u179B\u17C2\u1786\u17BE";
km.bento = "\u1794\u17B7\u1793\u178F\u17BC";
km.salad = "\u179F\u17B6\u17A1\u17B6\u178F";
km.tacos = "\u178F\u17B6\u1780\u17BC\u179F";
km.sushi = "\u179F\u17CA\u17BC\u179F\u17CA\u17B8";
km.oden = "\u17A2\u17BC\u178A\u17C1\u1793";
km.specialMenu = "\u1798\u17C9\u17BA\u1793\u17BB\u1799\u1796\u17B7\u179F\u17C1\u179F";
km.recommended = "\u178E\u17C2\u1793\u17B6\u17C6";
km.addNote = "\u1794\u1793\u17D2\u1790\u17C2\u1798\u1780\u17C6\u178E\u178F\u17CB...";
km.customize = "\u1780\u17C2\u179F\u1798\u17D2\u179A\u17BD\u179B";
km.addToOrder = "\u1794\u1793\u17D2\u1790\u17C2\u1798";
km.noResults = "\u179A\u1780\u1798\u17B7\u1793\u1783\u17BE\u1789";
km.orderDetails = "\u1796\u178F\u17CC\u1798\u17B6\u1793\u1794\u1789\u17D2\u1787\u17B6";
km.dineIn = "\u1789\u17C9\u17B6\u17C6\u1780\u17D2\u1793\u17BB\u1784\u17A0\u17B6\u1784";
km.noItems = "\u1798\u17B7\u1793\u1798\u17B6\u1793\u1798\u17BB\u1781";
km.addFromMenu = "\u1794\u1793\u17D2\u1790\u17C2\u1798\u1796\u17B8\u1798\u17C9\u17BA\u1793\u17BB\u1799";
km.subtotal = "\u179F\u179A\u17BB\u1794\u179A\u1784";
km.tax = "\u1796\u1793\u17D2\u1792";
km.discount = "\u1794\u1789\u17D2\u1785\u17BB\u17C7\u178F\u1798\u17D2\u179B\u17C3";
km.total = "\u179F\u179A\u17BB\u1794";
km.pay = "\u1794\u1784\u17CB";
km.splitBill = "\u1794\u17C2\u1784\u1785\u17C2\u1780\u179C\u17B7\u1780\u17D2\u1780\u1799\u1794\u178F\u17D2\u179A";
km.receipt = "\u179C\u17B7\u1780\u17D2\u1780\u1799\u1794\u178F\u17D2\u179A";
km.payment = "\u1794\u1784\u17CB\u1794\u17D2\u179A\u17B6\u1780\u17CB";
km.paymentMethod = "\u179C\u17B7\u1792\u17B8\u1794\u1784\u17CB";
km.cash = "\u179F\u17B6\u1785\u17CB\u1794\u17D2\u179A\u17B6\u1780\u17CB";
km.card = "\u1780\u17B6\u178F";
km.qrCode = "\u1780\u17BC\u178A QR";
km.confirmPayment = "\u1794\u1789\u17D2\u1787\u17B6\u1780\u17CB";
km.paymentSuccess = "\u1794\u1784\u17CB\u1787\u17C4\u1782\u1787\u17D0\u1799!";
km.amountReceived = "\u1785\u17C6\u1793\u17BD\u1793\u1791\u1791\u17BD\u179B";
km.change = "\u1794\u17D2\u179A\u17B6\u1780\u17CB\u17A2\u17B6\u1794\u17CB";
km.darkMode = "\u1798\u17C9\u17BC\u178A\u1784\u1784\u17B9\u178F";
km.language = "\u1797\u17B6\u179F\u17B6";
km.close = "\u1794\u17B7\u1791";
km.cancel = "\u1794\u17C4\u17C7\u1794\u1784\u17CB";
km.notifications = "\u1780\u17B6\u179A\u1787\u17BC\u1793\u178A\u17C6\u178E\u17B9\u1784";
km.kitchenDisplay = "\u1794\u1784\u17D2\u17A0\u17B6\u1789\u1795\u17D2\u1791\u17C7\u1794\u17B6\u1799";
km.newOrder = "\u1790\u17D2\u1798\u17B8";
km.cooking = "\u1780\u17C6\u1796\u17BB\u1784\u1785\u1798\u17D2\u17A2\u17B7\u1793";
km.done = "\u179A\u17BD\u1785";
km.tableMap = "\u1795\u17C2\u1793\u1791\u17B8\u178F\u17BB";
km.available = "\u1791\u17C6\u1793\u17C1\u179A";
km.occupied = "\u179A\u179C\u179B\u17CB";
km.reserved = "\u1780\u1780\u17CB\u1791\u17BB\u1780";
km.salesAnalytics = "\u179C\u17B7\u1797\u17B6\u1782\u179B\u1780\u17CB";
km.revenue = "\u1785\u17C6\u178E\u17BC\u179B";
km.orders = "\u1794\u1789\u17D2\u1787\u17B6";
km.daily = "\u1794\u17D2\u179A\u1785\u17B6\u17C6\u1790\u17D2\u1784\u17C3";
km.weekly = "\u179F\u1794\u17D2\u178F\u17B6\u17A0\u17CD";
km.orderHistory = "\u1794\u17D2\u179A\u179C\u178F\u17D2\u178F\u17B7\u1794\u1789\u17D2\u1787\u17B6";
km.completed = "\u1794\u17B6\u1793\u1794\u1789\u17D2\u1785\u1794\u17CB";
km.printReceipt = "\u1794\u17C4\u17C7\u179C\u17B7\u1780\u17D2\u1780\u1799\u1794\u178F\u17D2\u179A";
km.thankYou = "\u17A2\u179A\u1782\u17BB\u178E\u179F\u1798\u17D2\u179A\u17B6\u1794\u17CB\u1780\u17B6\u179A\u1789\u17C9\u17B6\u17C6!";
km.numPeople = "\u1785\u17C6\u1793\u17BD\u1793\u1798\u1793\u17BB\u179F\u17D2\u179F";
km.perPerson = "\u1780\u17D2\u1793\u17BB\u1784\u1798\u17BD\u1799\u1793\u17B6\u1780\u17CB";
km.off = "\u1794\u1789\u17D2\u1785\u17BB\u17C7";
km.extraPickles = "\u1794\u1793\u17D2\u1790\u17C2\u1798";
km.noOnions = "\u1782\u17D2\u1798\u17B6\u1793\u1781\u17D2\u1791\u17B9\u17C6";
km.lessSugar = "\u179F\u17D2\u1780\u179A\u178F\u17B7\u1785";
km.removeLettuce = "\u178A\u1780\u179F\u17B6\u17A1\u17B6\u178F";
// Cambodia specific
km.vat = "\u1796\u1793\u17D2\u1792 VAT";
km.khqr = "KHQR";
km.abaPay = "ABA Pay";
km.acleda = "ACLEDA";
km.wing = "Wing";
km.piPay = "Pi Pay";
km.trueMoney = "True Money";
km.bakong = "Bakong";
km.currencyLabel = "\u179A\u17BC\u1794\u17B7\u1799\u1794\u17D0\u178E\u17D2\u178E";
km.exchangeRate = "\u17A2\u178F\u17D2\u179A\u17B6\u1794\u17D2\u178A\u17BC\u179A";
km.tin = "\u179B\u17C1\u1781\u17A2\u178F\u17D2\u178F\u179F\u1789\u17D2\u1789\u17B6\u178E\u1796\u1793\u17D2\u1792";
km.telegramNotify = "\u1787\u17BC\u1793\u178A\u17C6\u178E\u17B9\u1784 Telegram";
km.grab = "Grab";
km.foodPanda = "FoodPanda";
km.platform = "\u179C\u17C1\u1791\u17B7\u1780\u17B6";
km.phone = "\u1791\u17BC\u179A\u179F\u17D0\u1796\u17D2\u1791";
km.address = "\u17A2\u17B6\u179F\u1799\u178A\u17D2\u178B\u17B6\u1793";
km.rice = "\u1794\u17B6\u1799";
km.noodle = "\u1798\u17B8";
km.drinks = "\u1797\u17C1\u179F\u1787\u17D2\u1787\u17C8";
km.dessert = "\u1794\u1784\u17D2\u17A2\u17C2\u1798";
km.khmer = "\u1781\u17D2\u1798\u17C2\u179A";
km.seafood = "\u1798\u17D2\u17A0\u17BC\u1794\u179F\u1798\u17BB\u1791\u17D2\u179A";
km.soup = "\u179F\u1798\u17D2\u179B";
km.date = "\u1780\u17B6\u179B\u1794\u179A\u17B7\u1785\u17D2\u1786\u17C1\u1791";
km.time = "\u1798\u17C9\u17C4\u1784";
km.sentToKitchen = "\u1794\u17B6\u1793\u1795\u17D2\u1789\u17BE\u1791\u17C5\u1795\u17D2\u1791\u17C7\u1794\u17B6\u1799";
km.sentToTelegram = "\u1794\u17B6\u1793\u1795\u17D2\u1789\u17BE\u1791\u17C5 Telegram";
km.changeKHR = "\u1794\u17D2\u179A\u17B6\u1780\u17CB\u17A2\u17B6\u1794\u17CB (\u17DB)";
km.rounded = "\u1794\u17B6\u1793\u1798\u17BC\u179B";
km.customers = "\u17A2\u178F\u17B7\u1790\u17B7\u1787\u1793";
km.avgOrder = "\u1798\u1792\u17D2\u1799\u1798\u1794\u1789\u17D2\u1787\u17B6";
// New features
km.staffLogin = "\u1785\u17BC\u179B\u1794\u17D2\u179A\u17BE\u1794\u17D2\u179A\u17B6\u179F\u17CB";
km.enterPin = "\u1794\u1789\u17D2\u1785\u17BC\u179B\u179B\u17C1\u1781\u1780\u17BC\u178A PIN";
km.incorrectPin = "PIN \u1798\u17B7\u1793\u178F\u17D2\u179A\u17BC\u179C";
km.selectProfile = "\u1787\u17D2\u179A\u17BE\u179F\u179A\u17BE\u179F\u1794\u17BB\u1782\u17D2\u1782\u179B\u17B7\u1780";
km.manager = "\u1782\u17D2\u179A\u17B6\u17CB\u1782\u17D2\u179A\u1784";
km.waiter = "\u17A2\u17D2\u1793\u1780\u179F\u17CA\u17BA\u179C\u17B8\u179F";
km.chef = "\u1785\u17C1\u179A\u1795\u17D2\u1791\u17C7\u1794\u17B6\u1799";
km.logout = "\u1785\u17B6\u1780\u1785\u17C1\u1789";
km.orderType = "\u1794\u17D2\u179A\u1797\u17C1\u1791\u1794\u1789\u17D2\u1787\u17B6";
km.takeaway = "\u1799\u1780\u1791\u17C5";
km.portionSize = "\u1791\u17C6\u17A0\u17C6\u1781\u17BC\u1785";
km.spiceLevel = "\u1780\u1798\u17D2\u179A\u17B7\u178F\u17A0\u17B7\u179A";
km.addOns = "\u1794\u1793\u17D2\u1790\u17C2\u1798";
km.specialNotes = "\u1780\u17C6\u178E\u178F\u17CB\u1785\u17C6\u178E\u17B6\u17C6";
km.todayRevenue = "\u1785\u17C6\u178E\u17BC\u179B\u1790\u17D2\u1784\u17C3\u1793\u17C1\u17C7";
km.dailySummary = "\u179F\u1793\u17D2\u179A\u17BB\u1794\u1794\u17D2\u179A\u1785\u17B6\u17C6\u1790\u17D2\u1784\u17C3";
km.peakHours = "\u1798\u17C9\u17C4\u1784\u1780\u17C6\u1796\u17BC\u179B";
km.topSelling = "\u1798\u17C9\u17BA\u1793\u17BB\u1799\u179B\u1780\u17CB\u1785\u17D2\u179A\u17BE\u1793\u1794\u17C6\u1795\u17BB\u178F";
km.endOfDay = "\u179A\u1794\u17B6\u1799\u1780\u17B6\u179A\u178E\u17CD\u1785\u17BB\u1784\u1790\u17D2\u1784\u17C3";
km.sold = "\u1781\u17D2\u1793\u17B6\u178F";
km.small = "\u178F\u17BC\u1785";
km.medium = "\u1798\u1792\u17D2\u1799\u1798";
km.large = "\u1792\u17C6";

interface TranslationContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
  fontClass: string;
}

const TranslationContext = createContext<TranslationContextType>({
  lang: "en",
  setLang: () => {},
  t: (key) => key,
  fontClass: "font-['Inter']",
});

export function useTranslation() {
  return useContext(TranslationContext);
}

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("km");

  const t = (key: string): string => {
    const d = lang === "km" ? km : en;
    return d[key] || en[key] || key;
  };

  const fontClass = lang === "km" ? "font-['Khmer',sans-serif]" : "font-['Inter',sans-serif]";

  return (
    <TranslationContext.Provider value={{ lang, setLang, t, fontClass }}>
      {children}
    </TranslationContext.Provider>
  );
}