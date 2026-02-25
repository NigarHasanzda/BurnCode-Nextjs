import api from "@/lib/api";
import { ContactInfo } from "@/types/contact";

export const getContactInfo = async (): Promise<ContactInfo> => {
  const res = await api.get("/contact/contactInfo");

  return res.data; 
};