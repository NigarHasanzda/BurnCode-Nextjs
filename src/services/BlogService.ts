import { BlogCategoriesResponse, BlogPost, BlogResponse } from "@/types/blog";
import api from "@/lib/api";

export const fetcher = async (url: string): Promise<BlogResponse> => {
  const res = await api.get<BlogResponse>(url);
  return res.data;
};

export const getBlogPosts = async (page: number, lang: string): Promise<BlogResponse> => {
  const res = await api.get<BlogResponse>(`/blog?page=${page}`, {
    headers: { "Accept-Language": lang },
  });
  return res.data;
};

export const getSingleBlogPost = async (
  slug: string,
  lang: string
): Promise<{ data: BlogPost }> => {
  const res = await api.post(
    `/blog/singleNews?slug=${slug}`, // <- query param
    {}, // body boş
    {
      headers: {
        "Accept-Language": lang,
      },
    }
  );

  return res.data;
};

export const getBlogCategories = async (lang: string): Promise<BlogCategoriesResponse> => {
  const res = await api.get<BlogCategoriesResponse>(`/blog/categories`, {
    headers: { "Accept-Language": lang },
  });
  return res.data;
};

/**
 * Səhifə və kateqoriya üzrə blog post-larını gətirir
 */
export const getBlogsByCategory = async (
  categoryId: number,
  page: number,
  lang: string
): Promise<BlogResponse> => {
  const res = await api.get<BlogResponse>(`/blog?category_id=${categoryId}&page=${page}`, {
    headers: { "Accept-Language": lang },
  });
  return res.data;
};

/**
 * Tək blog post-u slug ilə gətirir
 */
export const getSingleBlogPostt= async (
  slug: string,
  lang: string
): Promise<{ data: BlogPost }> => {
  const res = await api.post(
    `/blog/singleNews?slug=${slug}`,
    {},
    { headers: { "Accept-Language": lang } }
  );
  return res.data;
};