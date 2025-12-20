export interface Category {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  order: number;
  active: number;
}

export interface Link {
  id: string;
  name: string;
  description: string;
  icon?: string;
  category?: string; // "kuliah" | "tools" | "collection" | etc.
  link?: string; // For level 0 (direct link)
  level: number; // 0 = direct link, 1 = internal page
  active: number;
  order: number;
}

export interface LevelOneItem {
  link_id: string; // maps to link.id
  title: string;
  description?: string;
  link: string;
  type?: string; // "materi" | "buku" | "video" | "tugas" | "lainnya"
  icon?: string; // lucide icon name
  urutan: number;
  active: number;
}

export interface AppData {
  categories: Category[];
  links: Link[];
  levelOneItems: LevelOneItem[];
  lastUpdated: string;
}
