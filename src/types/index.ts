export interface Category {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  order?: number;  // Optional: auto-generated from row order
  active?: number; // Optional: defaults to 1 (active)
}

export interface Link {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category?: string; // "kuliah" | "tools" | "collection" | etc.
  link?: string; // For level 0 (direct link)
  level: number; // 0 = direct link, 1 = internal page
  active?: number;  // Optional: defaults to 1 (active)
  order?: number;   // Optional: auto-generated from row order
}

export interface LevelOneItem {
  link_id: string; // maps to link.id
  title: string;
  description?: string;
  link: string;
  type?: string; // "materi" | "buku" | "video" | "tugas" | "lainnya"
  icon?: string; // lucide icon name
  urutan?: number; // Optional: auto-generated from row order
  active?: number; // Optional: defaults to 1 (active)
}

export interface AppData {
  categories: Category[];
  links: Link[];
  levelOneItems: LevelOneItem[];
  lastUpdated: string;
}
