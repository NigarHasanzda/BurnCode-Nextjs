// types/portfolio.ts
export interface Project {
  id: number;
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