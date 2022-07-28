export const FRONTEND_URL = {
  login: "/login",
  register: "/register",
  home: "/",
};

export const BACKEND_URL = {
  auth: "/auth",
  login() {
    return `${this.auth}/login`;
  },
  register() {
    return `${this.auth}/register`;
  },
};
export const BACKEND_ROOT =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://typescript-backend-reactnode.herokuapp.com/api/v1";

export const LSTORAGE_KEY = "user";
