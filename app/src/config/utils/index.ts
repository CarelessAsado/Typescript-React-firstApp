import { setHeaders } from "API/axiosInstanceJWT";
import { LSTORAGE_KEY } from "config/constants";

export function setHeadersAndLStorage(user: UserNotNull, accessToken: string) {
  setHeaders(accessToken);
  localStorage.setItem(LSTORAGE_KEY, JSON.stringify(user));
}
