import { BlogPost, BlogResponse } from "@/types/blog";
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