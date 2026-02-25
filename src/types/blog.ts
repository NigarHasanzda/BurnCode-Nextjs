export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  image: string;
  created_at: string;

  body: string; // ✅ content yox, body gəlir
  description?: string;
  meta_description?: string;
  meta_keywords?: string;

  category?: {
    id: number;
    name: string;
    slug: string;
  };
}

export interface BlogResponse {
  data: BlogPost[];
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}
export interface Category {
  id: number;
  name: string;
  slug: string;
}
