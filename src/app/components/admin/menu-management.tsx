import { useState } from "react";
import { useTranslation } from "../translation-context";
import { useCurrency } from "../currency-context";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  Check,
  Star,
  ImageIcon,
  Tag,
  Upload,
  Link,
  Flame,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { menuItems as defaultMenuItems, type MenuItem, type MenuItemSize, type MenuItemAddOn } from "../menu-grid";
import { toast } from "sonner";

const categoryList = [
  { key: "allMenu", en: "All", km: "ទាំងអស់" },
  { key: "khmer", en: "Khmer", km: "ខ្មែរ" },
  { key: "rice", en: "Rice", km: "បាយ" },
  { key: "noodle", en: "Noodle", km: "មី" },
  { key: "drinks", en: "Drinks", km: "ភេសជ្ជៈ" },
  { key: "seafood", en: "Seafood", km: "មហូបសមុទ្រ" },
  { key: "salad", en: "Salad", km: "សាឡាត" },
  { key: "dessert", en: "Dessert", km: "បង្អែម" },
  { key: "soup", en: "Soup", km: "សម្ល" },
];

let nextMenuId = 100;

export function MenuManagement() {
  const { lang, fontClass } = useTranslation();
  const { formatPrice } = useCurrency();
  const [items, setItems] = useState<MenuItem[]>(defaultMenuItems);
  const [search, setSearch] = useState("");
  const [filterCat, setFilterCat] = useState("allMenu");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  const filtered = items.filter((item) => {
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.nameKm.includes(search);
    const matchesCat = filterCat === "allMenu" || item.category === filterCat;
    return matchesSearch && matchesCat;
  });

  const handleSave = (data: MenuItem) => {
    if (editingItem) {
      setItems((prev) => prev.map((i) => (i.id === data.id ? data : i)));
      toast.success(lang === "km" ? "បានកែប្រែមុខទំនិញ" : "Item updated");
    } else {
      setItems((prev) => [...prev, { ...data, id: nextMenuId++ }]);
      toast.success(lang === "km" ? "បានបន្ថែមមុខទំនិញ" : "Item added");
    }
    setShowModal(false);
    setEditingItem(null);
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
    setDeleteConfirm(null);
    toast.success(lang === "km" ? "បានលុបមុខទំនិញ" : "Item removed");
  };

  return (
    <div className={`p-6 ${fontClass}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lang === "km" ? "ស្វែងរកមុខទំនិញ..." : "Search menu items..."}
            className="w-full max-w-sm pl-9 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300"
            style={{ fontSize: "13px" }}
          />
        </div>

        <button
          onClick={() => {
            setEditingItem(null);
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-md shadow-green-200 dark:shadow-green-900"
          style={{ fontSize: "13px", fontWeight: 600 }}
        >
          <Plus size={16} />
          {lang === "km" ? "បន្ថែមមុខទំនិញ" : "Add Item"}
        </button>
      </div>

      {/* Category filter */}
      <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
        {categoryList.map((c) => (
          <button
            key={c.key}
            onClick={() => setFilterCat(c.key)}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              filterCat === c.key
                ? "bg-[#22C55E] text-white"
                : "bg-white dark:bg-gray-900 text-gray-500 border border-gray-200 dark:border-gray-700 hover:border-[#22C55E] hover:text-[#22C55E]"
            }`}
            style={{ fontSize: "12px", fontWeight: 500 }}
          >
            {lang === "km" ? c.km : c.en}
          </button>
        ))}
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>
            {lang === "km" ? "សរុបមុខទំនិញ" : "Total Items"}
          </p>
          <p className="text-gray-900 dark:text-white" style={{ fontSize: "20px", fontWeight: 700 }}>
            {items.length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>
            {lang === "km" ? "ប្រភេទ" : "Categories"}
          </p>
          <p className="text-gray-900 dark:text-white" style={{ fontSize: "20px", fontWeight: 700 }}>
            {new Set(items.map((i) => i.category)).size}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>
            {lang === "km" ? "មានបញ្ចុះតម្លៃ" : "On Discount"}
          </p>
          <p className="text-[#22C55E]" style={{ fontSize: "20px", fontWeight: 700 }}>
            {items.filter((i) => i.discount).length}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-3 border border-gray-100 dark:border-gray-800">
          <p className="text-gray-400" style={{ fontSize: "11px" }}>
            {lang === "km" ? "មធ្យមតម្លៃ" : "Avg Price"}
          </p>
          <p className="text-gray-900 dark:text-white" style={{ fontSize: "20px", fontWeight: 700 }}>
            {formatPrice(items.reduce((s, i) => s + i.price, 0) / items.length)}
          </p>
        </div>
      </div>

      {/* Items table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {[
                  lang === "km" ? "មុខទំនិញ" : "Item",
                  lang === "km" ? "ប្រភេទ" : "Category",
                  lang === "km" ? "តម្លៃ" : "Price",
                  lang === "km" ? "បញ្ចុះតម្លៃ" : "Discount",
                  lang === "km" ? "វាយតម្លៃ" : "Rating",
                  lang === "km" ? "សកម្មភាព" : "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="text-left px-4 py-3 text-gray-400"
                    style={{ fontSize: "11px", fontWeight: 600 }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0">
                        <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-gray-900 dark:text-white" style={{ fontSize: "13px", fontWeight: 600 }}>
                          {lang === "km" ? item.nameKm : item.name}
                        </p>
                        <p className="text-gray-400" style={{ fontSize: "11px" }}>
                          {lang === "km" ? item.name : item.nameKm}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className="px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                      style={{ fontSize: "11px", fontWeight: 500 }}
                    >
                      {categoryList.find((c) => c.key === item.category)?.[lang === "km" ? "km" : "en"] || item.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-[#22C55E]" style={{ fontSize: "14px", fontWeight: 700 }}>
                      {formatPrice(item.price)}
                    </span>
                    {item.oldPrice && (
                      <span className="text-gray-400 line-through ml-1.5" style={{ fontSize: "11px" }}>
                        {formatPrice(item.oldPrice)}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {item.discount ? (
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-green-50 dark:bg-green-900/20 text-green-600"
                        style={{ fontSize: "12px", fontWeight: 600 }}
                      >
                        <Tag size={10} />
                        {item.discount}%
                      </span>
                    ) : (
                      <span className="text-gray-300" style={{ fontSize: "12px" }}>
                        —
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="text-yellow-400 fill-yellow-400" />
                      <span className="text-gray-600 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 500 }}>
                        {item.rating}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingItem(item);
                          setShowModal(true);
                        }}
                        className="p-1.5 rounded-lg text-gray-400 hover:bg-blue-50 hover:text-blue-500 dark:hover:bg-blue-900/20 transition-colors"
                      >
                        <Edit2 size={14} />
                      </button>
                      {deleteConfirm === item.id ? (
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          >
                            <Check size={12} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="p-1.5 bg-gray-200 dark:bg-gray-700 text-gray-500 rounded-lg transition-colors"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setDeleteConfirm(item.id)}
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <ImageIcon size={40} className="mx-auto mb-2 opacity-30" />
            <p style={{ fontSize: "14px" }}>{lang === "km" ? "រកមិនឃើញមុខទំនិញ" : "No items found"}</p>
          </div>
        )}
      </div>

      {/* Add/Edit modal */}
      {showModal && (
        <MenuItemModal
          item={editingItem}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingItem(null);
          }}
          lang={lang}
          formatPrice={formatPrice}
        />
      )}
    </div>
  );
}

/* ─── Menu Item Add/Edit Modal ─── */

interface MenuItemModalProps {
  item: MenuItem | null;
  onSave: (data: MenuItem) => void;
  onClose: () => void;
  lang: "en" | "km";
  formatPrice: (n: number) => string;
}

function MenuItemModal({ item, onSave, onClose, lang }: MenuItemModalProps) {
  const [form, setForm] = useState<MenuItem>(
    item ?? {
      id: 0,
      name: "",
      nameKm: "",
      price: 0,
      image: "",
      rating: 4.5,
      category: "khmer",
    }
  );
  const [imageMode, setImageMode] = useState<"upload" | "url">(form.image && form.image.startsWith("http") ? "url" : "upload");
  const [dragOver, setDragOver] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  const defaultSizes: MenuItemSize[] = [
    { key: "S", en: "Small", km: "តូច", priceMod: -1.00 },
    { key: "M", en: "Medium", km: "មធ្យម", priceMod: 0 },
    { key: "L", en: "Large", km: "ធំ", priceMod: 2.00 },
  ];
  const defaultAddOns: MenuItemAddOn[] = [
    { key: "extraEgg", en: "Extra Egg", km: "បន្ថែមពងមាន់", price: 0.50 },
    { key: "extraRice", en: "Extra Rice", km: "បន្ថែមបាយ", price: 0.50 },
    { key: "extraVeg", en: "Extra Vegetables", km: "បន្ថែមបន្លែ", price: 0.75 },
    { key: "extraMeat", en: "Extra Meat", km: "បន្ថែមសាច់", price: 1.50 },
    { key: "extraSauce", en: "Extra Sauce", km: "បន្ថែមទឹកជ្រាប់", price: 0.25 },
  ];

  const sizes = form.sizes ?? defaultSizes;
  const addOns = form.addOns ?? defaultAddOns;
  const hasSpice = form.hasSpice ?? true;

  const updateSize = (idx: number, field: keyof MenuItemSize, value: string | number) => {
    const next = [...sizes];
    next[idx] = { ...next[idx], [field]: value };
    setForm({ ...form, sizes: next });
  };
  const removeSize = (idx: number) => {
    const next = sizes.filter((_, i) => i !== idx);
    setForm({ ...form, sizes: next.length ? next : undefined });
  };
  const addSize = () => {
    setForm({ ...form, sizes: [...sizes, { key: "", en: "", km: "", priceMod: 0 }] });
  };
  const updateAddOn = (idx: number, field: keyof MenuItemAddOn, value: string | number) => {
    const next = [...addOns];
    next[idx] = { ...next[idx], [field]: value };
    setForm({ ...form, addOns: next });
  };
  const removeAddOn = (idx: number) => {
    const next = addOns.filter((_, i) => i !== idx);
    setForm({ ...form, addOns: next.length ? next : undefined });
  };
  const addAddOn = () => {
    setForm({ ...form, addOns: [...addOns, { key: `addon_${Date.now()}`, en: "", km: "", price: 0 }] });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) {
      toast.error(lang === "km" ? "សូមបញ្ចូលឈ្មោះ" : "Please enter a name");
      return;
    }
    if (form.price <= 0) {
      toast.error(lang === "km" ? "សូមបញ្ចូលតម្លៃ" : "Please enter a price");
      return;
    }
    onSave(form);
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error(lang === "km" ? "សូមជ្រើសរើសឯកសាររូបភាព" : "Please select an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(lang === "km" ? "រូបភាពធំពេក (អតិបរមា 5MB)" : "Image too large (max 5MB)");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setForm({ ...form, image: result });
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleFileInput = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) handleFileSelect(file);
    };
    input.click();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div
        className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 bg-white dark:bg-gray-900 z-10">
          <h3 className="text-gray-900 dark:text-white" style={{ fontSize: "16px", fontWeight: 600 }}>
            {item
              ? lang === "km"
                ? "កែប្រែមុខទំនិញ"
                : "Edit Item"
              : lang === "km"
                ? "បន្ថែមមុខទំនិញ"
                : "Add Item"}
          </h3>
          <button onClick={onClose} className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Image preview */}
          {form.image && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800">
              <ImageWithFallback src={form.image} alt="Preview" className="w-full h-full object-cover" />
              <button onClick={() => setForm({ ...form, image: "" })} className="absolute top-2 right-2 p-1 bg-black/50 text-white rounded-lg hover:bg-black/70 transition-colors">
                <X size={14} />
              </button>
            </div>
          )}

          {/* Image mode toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-gray-600 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 500 }}>
                {lang === "km" ? "រូបភាព" : "Image"}
              </label>
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-0.5">
                <button onClick={() => setImageMode("upload")} className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${imageMode === "upload" ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
                  <Upload size={11} /> {lang === "km" ? "ផ្ទុកឯកសារ" : "Upload"}
                </button>
                <button onClick={() => setImageMode("url")} className={`flex items-center gap-1 px-2.5 py-1 rounded-md transition-all ${imageMode === "url" ? "bg-white dark:bg-gray-700 shadow text-gray-900 dark:text-white" : "text-gray-500"}`} style={{ fontSize: "11px", fontWeight: 500 }}>
                  <Link size={11} /> URL
                </button>
              </div>
            </div>

            {imageMode === "upload" ? (
              <div
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={handleFileInput}
                className={`w-full border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                  dragOver
                    ? "border-[#22C55E] bg-[#22C55E]/5"
                    : "border-gray-200 dark:border-gray-700 hover:border-[#22C55E]/50 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                }`}
              >
                <Upload size={24} className={`mx-auto mb-2 ${dragOver ? "text-[#22C55E]" : "text-gray-400"}`} />
                <p className="text-gray-600 dark:text-gray-400" style={{ fontSize: "13px", fontWeight: 500 }}>
                  {lang === "km" ? "ចុច ឬ ទម្លាក់រូបភាពនៅទីនេះ" : "Click or drag & drop image here"}
                </p>
                <p className="text-gray-400 mt-1" style={{ fontSize: "11px" }}>
                  PNG, JPG, WEBP • {lang === "km" ? "អតិបរមា" : "Max"} 5MB
                </p>
              </div>
            ) : (
              <input
                type="text"
                value={form.image.startsWith("data:") ? "" : form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                style={{ fontSize: "13px" }}
                placeholder="https://images.unsplash.com/..."
              />
            )}
          </div>

          {/* Names */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: "12px", fontWeight: 500 }}>
                {lang === "km" ? "ឈ្មោះ (English)" : "Name (English)"}
              </label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: "12px", fontWeight: 500 }}>
                {lang === "km" ? "ឈ្មោះ (ខ្មែរ)" : "Name (Khmer)"}
              </label>
              <input
                type="text"
                value={form.nameKm}
                onChange={(e) => setForm({ ...form, nameKm: e.target.value })}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                style={{ fontSize: "13px" }}
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: "12px", fontWeight: 500 }}>
              {lang === "km" ? "ប្រភេទ" : "Category"}
            </label>
            <div className="flex flex-wrap gap-1.5">
              {categoryList
                .filter((c) => c.key !== "allMenu")
                .map((c) => (
                  <button
                    key={c.key}
                    onClick={() => setForm({ ...form, category: c.key })}
                    className={`px-3 py-1.5 rounded-lg border transition-all ${
                      form.category === c.key
                        ? "border-[#22C55E] bg-[#22C55E]/5 text-[#22C55E]"
                        : "border-gray-200 dark:border-gray-700 text-gray-500 hover:border-gray-300"
                    }`}
                    style={{ fontSize: "12px", fontWeight: 500 }}
                  >
                    {lang === "km" ? c.km : c.en}
                  </button>
                ))}
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: "12px", fontWeight: 500 }}>
                {lang === "km" ? "តម្លៃ ($)" : "Price ($)"}
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                style={{ fontSize: "13px" }}
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: "12px", fontWeight: 500 }}>
                {lang === "km" ? "តម្លៃចាស់ ($)" : "Old Price ($)"}
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={form.oldPrice ?? ""}
                onChange={(e) =>
                  setForm({ ...form, oldPrice: e.target.value ? parseFloat(e.target.value) : undefined })
                }
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                style={{ fontSize: "13px" }}
                placeholder="—"
              />
            </div>
            <div>
              <label className="block text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: "12px", fontWeight: 500 }}>
                {lang === "km" ? "បញ្ចុះតម្លៃ (%)" : "Discount (%)"}
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={form.discount ?? ""}
                onChange={(e) =>
                  setForm({ ...form, discount: e.target.value ? parseInt(e.target.value) : undefined })
                }
                className="w-full px-3 py-2.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl outline-none text-gray-700 dark:text-gray-300"
                style={{ fontSize: "13px" }}
                placeholder="—"
              />
            </div>
          </div>

          {/* Rating + Recommended */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-gray-600 dark:text-gray-400 mb-1" style={{ fontSize: "12px", fontWeight: 500 }}>
                {lang === "km" ? "វាយតម្លៃ" : "Rating"}
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.1"
                  value={form.rating}
                  onChange={(e) => setForm({ ...form, rating: parseFloat(e.target.value) })}
                  className="flex-1 accent-[#22C55E]"
                />
                <span className="flex items-center gap-0.5 text-gray-600 dark:text-gray-400" style={{ fontSize: "13px", fontWeight: 600 }}>
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  {form.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.recommended ?? false}
                onChange={(e) => setForm({ ...form, recommended: e.target.checked || undefined })}
                className="w-4 h-4 rounded accent-[#22C55E]"
              />
              <span className="text-gray-600 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 500 }}>
                {lang === "km" ? "ណែនាំ" : "Recommended"}
              </span>
            </label>
          </div>

          {/* Customizations collapsible section */}
          <div className={`border rounded-xl overflow-hidden transition-colors ${(form.customizationEnabled !== false) ? "border-gray-200 dark:border-gray-700" : "border-gray-200/60 dark:border-gray-700/60 opacity-80"}`}>
            <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800">
              <button
                onClick={() => setShowCustomization(!showCustomization)}
                className="flex-1 flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Flame size={14} className="text-orange-500" />
                <span className="text-gray-700 dark:text-gray-200" style={{ fontSize: "13px", fontWeight: 600 }}>
                  {lang === "km" ? "ការកែសម្រួល (ទំហំ, គ្រឿងបន្ថែម, ហិរ)" : "Customizations (Sizes, Add-ons, Spice)"}
                </span>
                {showCustomization ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
              </button>
              <button
                onClick={() => setForm({ ...form, customizationEnabled: !(form.customizationEnabled !== false) })}
                className={`ml-3 relative rounded-full transition-colors ${(form.customizationEnabled !== false) ? "bg-[#22C55E]" : "bg-gray-300 dark:bg-gray-600"}`}
                style={{ width: 40, height: 22, flexShrink: 0 }}
              >
                <div className={`absolute top-0.5 bg-white rounded-full shadow transition-all ${(form.customizationEnabled !== false) ? "left-[20px]" : "left-0.5"}`} style={{ width: 18, height: 18 }} />
              </button>
            </div>

            {showCustomization && (form.customizationEnabled !== false) && (
              <div className="p-4 space-y-5 border-t border-gray-200 dark:border-gray-700">
                {/* Sizes */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-600 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 600 }}>
                      {lang === "km" ? "ទំហំខូច" : "Portion Sizes"}
                    </label>
                    <button onClick={addSize} className="flex items-center gap-1 text-[#22C55E] hover:text-green-600" style={{ fontSize: "11px", fontWeight: 600 }}>
                      <Plus size={12} /> {lang === "km" ? "បន្ថែម" : "Add"}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {sizes.map((s, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input value={s.key} onChange={(e) => updateSize(i, "key", e.target.value)} placeholder="S" className="w-10 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-gray-700 dark:text-gray-300 text-center" style={{ fontSize: "12px" }} />
                        <input value={s.en} onChange={(e) => updateSize(i, "en", e.target.value)} placeholder="Small" className="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "12px" }} />
                        <input value={s.km} onChange={(e) => updateSize(i, "km", e.target.value)} placeholder="តូច" className="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "12px" }} />
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: "10px" }}>$</span>
                          <input type="number" step="0.25" value={s.priceMod} onChange={(e) => updateSize(i, "priceMod", parseFloat(e.target.value) || 0)} className="w-16 pl-4 pr-1 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "12px" }} />
                        </div>
                        <button onClick={() => removeSize(i)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {sizes.length === 0 && (
                    <p className="text-gray-400 text-center py-2" style={{ fontSize: "11px" }}>{lang === "km" ? "គ្មានទំហំ — ទំហំតែមួយ" : "No sizes — single size only"}</p>
                  )}
                </div>

                {/* Spice toggle */}
                <div className="flex items-center justify-between py-2 border-t border-gray-100 dark:border-gray-800">
                  <span className="flex items-center gap-2 text-gray-600 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 600 }}>
                    <Flame size={13} className="text-red-500" />
                    {lang === "km" ? "អនុញ្ញាតកម្រិតហិរ" : "Enable Spice Levels"}
                  </span>
                  <button
                    onClick={() => setForm({ ...form, hasSpice: !hasSpice })}
                    className={`w-10 h-5.5 rounded-full transition-colors relative ${hasSpice ? "bg-[#22C55E]" : "bg-gray-300 dark:bg-gray-600"}`}
                    style={{ width: 40, height: 22 }}
                  >
                    <div className={`absolute top-0.5 w-4.5 h-4.5 bg-white rounded-full shadow transition-transform ${hasSpice ? "left-[20px]" : "left-0.5"}`} style={{ width: 18, height: 18 }} />
                  </button>
                </div>

                {/* Add-ons */}
                <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-600 dark:text-gray-400" style={{ fontSize: "12px", fontWeight: 600 }}>
                      {lang === "km" ? "គ្រឿងបន្ថែម" : "Add-ons"}
                    </label>
                    <button onClick={addAddOn} className="flex items-center gap-1 text-[#22C55E] hover:text-green-600" style={{ fontSize: "11px", fontWeight: 600 }}>
                      <Plus size={12} /> {lang === "km" ? "បន្ថែម" : "Add"}
                    </button>
                  </div>
                  <div className="space-y-2">
                    {addOns.map((a, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <input value={a.en} onChange={(e) => updateAddOn(i, "en", e.target.value)} placeholder="Extra Egg" className="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "12px" }} />
                        <input value={a.km} onChange={(e) => updateAddOn(i, "km", e.target.value)} placeholder="បន្ថែមពង" className="flex-1 px-2 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "12px" }} />
                        <div className="relative">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" style={{ fontSize: "10px" }}>$</span>
                          <input type="number" step="0.25" min="0" value={a.price} onChange={(e) => updateAddOn(i, "price", parseFloat(e.target.value) || 0)} className="w-16 pl-4 pr-1 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none text-gray-700 dark:text-gray-300" style={{ fontSize: "12px" }} />
                        </div>
                        <button onClick={() => removeAddOn(i)} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md">
                          <Trash2 size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {addOns.length === 0 && (
                    <p className="text-gray-400 text-center py-2" style={{ fontSize: "11px" }}>{lang === "km" ? "គ្មានគ្រឿងបន្ថែម" : "No add-ons"}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3 justify-end sticky bottom-0 bg-white dark:bg-gray-900">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl transition-colors"
            style={{ fontSize: "13px", fontWeight: 500 }}
          >
            {lang === "km" ? "បោះបង់" : "Cancel"}
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 bg-[#22C55E] text-white rounded-xl hover:bg-green-600 transition-colors shadow-md shadow-green-200 dark:shadow-green-900"
            style={{ fontSize: "13px", fontWeight: 600 }}
          >
            {item
              ? lang === "km"
                ? "រក្សាទុក"
                : "Save Changes"
              : lang === "km"
                ? "បន្ថែម"
                : "Add Item"}
          </button>
        </div>
      </div>
    </div>
  );
}
