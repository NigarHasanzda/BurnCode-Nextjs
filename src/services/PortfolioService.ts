// services/PortfolioService.ts
import api from "@/lib/api";

// Mövcud getProjects funksiyası burada qalır
import { Project, ProjectsResponse } from "@/types/portfolio";

export const getProjects = async (
  lang: string,
  page: number = 1
): Promise<ProjectsResponse> => {
  const res = await api.get(`/projects?page=${page}`, {
    headers: { "Accept-Language": lang },
  });

  const items: Project[] = res.data.data.map((item: any) => ({
    id: item.id,
    title: item.name || item.title || "Başlıq yoxdur",
    image: item.image,
    // category: item.category || "general",
    createdAt: item.created_at || "",
    slug: item.slug,
    client: item.client_info || "",
    description: item.description || "",
    body: item.body || "",
    project_link: item.project_link || "",
  }));

  return { items, meta: { last_page: res.data.meta?.last_page || 1 } };
};



// Yeni funksiya: portfolio kateqoriyaları gətirir
export const getPortfolioCategories = async (lang: string): Promise<string[]> => {
  const res = await api.get(`/projects/categories`, {
    headers: { "Accept-Language": lang },
  });

  // backend array və ya object qaytara bilər, biz sadəcə string array kimi götürürük
  const categories: string[] = res.data.data.map((item: any) => item.name || item.title || "general");
  return categories;
};