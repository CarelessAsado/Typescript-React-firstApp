export const FRONTEND_URL = process.env.NODE_ENV
  ? "https://62e1b83ac9af450008fa268c--amazing-wright-70ac6b.netlify.app"
  : "http://localhost:3000";

export const jwtSecret = process.env.JWT_SECRET as string;
export const HEADER_ACCESS_TOKEN = "auth-token";

export const expirationTokens = {
  access: "2h",
  refresh: "1d",
  emailToken: "30m",
};
