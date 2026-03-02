// types/portfolio.ts
export interface Project {
  id: number;
  name: string;
  client_info: string;
  body: string;
  project_link: string;
  title: string;
  description: string;
  image: string;
//   categories: string;
  createdAt: string;
  slug: string;
}

export interface ProjectsResponse {
  items: Project[];
  meta: { last_page: number };
}

interface PaginationParams {
  page?: number;
  category_id?: number | null;
  lang: string;
}

 export interface SinglePortfolioPayload {
  id?: number;
  slug?: string;
}

export interface SinglePortfolioResponse {
  data: Project;
}






export interface Category {
  id: number;
  name: string;
  slug: string;
}