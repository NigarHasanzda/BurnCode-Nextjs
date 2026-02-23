import axios from "axios";

const api = axios.create({
  baseURL: "https://p.burncode.org/api",
  headers: {
    "Accept-Language": localStorage.getItem("lang") || "en",
  },
});

export const setLanguage = (lang: string) => {
  localStorage.setItem("lang", lang);
  api.defaults.headers["Accept-Language"] = lang;
};

export default api;