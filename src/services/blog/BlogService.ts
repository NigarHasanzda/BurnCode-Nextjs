// BlogService.ts
import { BlogPost, BlogResponse } from "@/types/blog";
import api from "@/lib/api";

export const fetcher = async (url: string): Promise<BlogResponse> => {
  const res = await api.get(url);
  return res.data;
};

export const getBlogPosts = async (page: number, lang: string): Promise<BlogResponse> => {
  const response = await api.get(`/blog?page=${page}`, {
    headers: {
      "Accept-Language": lang, // hər requestdə cari dili göndəririk
    },
  });
  return response.data;
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