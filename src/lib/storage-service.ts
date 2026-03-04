import { supabase, isSupabaseConfigured } from "./supabase";

const BUCKET = "menu-images";

export async function uploadMenuImage(file: File): Promise<string> {
  if (!isSupabaseConfigured()) {
    return fileToDataUrl(file);
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filePath = `menu/${fileName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath);
  return data.publicUrl;
}

export async function deleteMenuImage(url: string) {
  if (!isSupabaseConfigured() || !url.includes(BUCKET)) return;

  const path = url.split(`${BUCKET}/`)[1];
  if (path) {
    await supabase.storage.from(BUCKET).remove([path]);
  }
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
