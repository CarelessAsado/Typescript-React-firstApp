import { CookieOptions } from "express";
export const FRONTEND_URL = process.env.NODE_ENV
  ? "https://amazing-wright-70ac6b.netlify.app"
  : "http://localhost:3000";

export const jwtSecret = process.env.JWT_SECRET as string;
export const HEADER_ACCESS_TOKEN = "auth-token";
export const COOKIE_RT_KEY = "jwtRefreshToken";
export const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  maxAge: 24 * 60 * 60 * 1000,
  sameSite: "none",
  secure: true,
};
export const expirationTokens = {
  access: "2h",
  refresh: "1d",
  emailToken: "30m",
};
