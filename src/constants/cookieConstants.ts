import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

export const COOKIE_OPTIONS: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
};

export const TOKEN_MAX_AGE = {
  ACCESS: 60 * 30,
  REFRESH: 60 * 60 * 24 * 7,
};

export const PUBLIC_PATH = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/kakao",
  "/api/oauth/",
];
