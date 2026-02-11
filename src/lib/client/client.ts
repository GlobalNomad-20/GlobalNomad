import axios from "axios";

export const client = axios.create({
  timeout: 5000,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

client.interceptors.request.use((config) => {
  if (config.method?.toUpperCase() === "GET") {
    config.fetchOptions = {
      cache: "force-cache",
      next: { revalidate: 60 },
    };
  } else {
    config.fetchOptions = {
      cache: "no-store",
    };
  }
  return config;
});
