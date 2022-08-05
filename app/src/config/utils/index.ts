import { setHeaders } from "API/axiosInstanceJWT";
import { LSTORAGE_KEY } from "config/constants";

export function setHeadersAndLStorage(user: UserNotNull) {
  setHeaders(user.accessToken);
  localStorage.setItem(LSTORAGE_KEY, JSON.stringify(user));
}
