import axios from "axios";

const api = axios.create({
  baseURL: "https://p.burncode.org/api",
});

// Request interceptor ilə lang əlavə et
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const lang = localStorage.getItem("lang") || "en";
    // AxiosHeaders.set istifadə edirik
    config.headers?.set("Accept-Language", lang);
  }
  return config;
});

// Lang dəyişimi helper
export const setLanguage = (lang: string) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("lang", lang);
    if (api.defaults.headers) {
      (api.defaults.headers as any).set?.("Accept-Language", lang);
    }
  }
};

export default api;