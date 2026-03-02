// services/PortfolioService.ts
import api from "@/lib/api";
import { Project, ProjectsResponse, SinglePortfolioPayload, SinglePortfolioResponse } from "@/types/portfolio";


interface PortfolioPaginationParams {
  page?: number;
  category_id?: number | null;
  lang?: string;
}
// Mövcud getProjects funksiyası (category olmadan)
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
export const getPortfolioCategories = async (lang: string): Promise<{id: number, name: string, slug: string}[]> => {
  const res = await api.get(`/projects/categories`, {
    headers: { "Accept-Language": lang },
  });

  // Backend array və ya object qaytara bilər
  return res.data.data.map((item: any) => ({
    id: item.id,
    name: item.name || item.title || "general",
    slug: item.slug || item.name?.toLowerCase().replace(/\s+/g, "-") || "general",
  }));
};

// Yeni funksiya: category ilə portfolioları gətirir
export const getPortfolioWithCategories = async (
  page: number,
  lang: string,
  categoryId?: number
) => {
  let url = `/projects?page=${page}&lang=${lang}`;

  if (categoryId) {
    url += `&category_id=${categoryId}`;
  }

  const res = await api.get(url, {
    headers: { "Accept-Language": lang },
  });

  // res.data.data və res.data.meta olacağını gözləyirik
  return {
    data: res.data.data,
    meta: {
      last_page: res.data.meta?.last_page || 1,
    },
  };
};




export const getSinglePortfolio = async (
  payload: SinglePortfolioPayload
): Promise<Project> => {
  try {
    const response = await api.post<SinglePortfolioResponse>(
      "/projects/singleProject",
      payload
    );

    return response.data.data; // API formatı: { data: {...} }
  } catch (error: any) {
    throw error.response?.data || error.message;
  }
};