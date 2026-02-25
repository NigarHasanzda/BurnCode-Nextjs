import api from "@/lib/api";
import { Service } from "@/types/services";

export const fetchServices = async (lang: string): Promise<Service[]> => {
  try {
    // Axios GET çağırışı, lang header ilə
    const res = await api.get(`/services`, {
      headers: { "Accept-Language": lang },
    });
   
    // Axios-da data res.data-da olur
    return res.data.data;
  } catch (error) {
    console.error("fetchServices error:", error);
    return [];
  }
};