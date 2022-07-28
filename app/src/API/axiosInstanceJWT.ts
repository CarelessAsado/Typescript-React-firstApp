import axios, { HeadersDefaults } from "axios";
import { BACKEND_ROOT } from "config/constants";

export const headerKey = "auth-token";
const axiosInstanceJWT = axios.create({
  baseURL: BACKEND_ROOT,
  headers: {
    [headerKey]: "",
  },
});
interface CommonHeaderProperties extends HeadersDefaults {
  [headerKey]: string;
}
export function setHeaders(accessToken: string = "") {
  axiosInstanceJWT.defaults.headers = {
    [headerKey]: accessToken,
  } as CommonHeaderProperties;
}

export default axiosInstanceJWT;
