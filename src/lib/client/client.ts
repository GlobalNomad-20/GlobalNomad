import axios from "axios";

export const client = axios.create({
  timeout: 5000,
  baseURL: "https://sp-globalnomad-api.vercel.app/20-2",
  headers: {
    "Content-Type": "application/json",
  },
});
