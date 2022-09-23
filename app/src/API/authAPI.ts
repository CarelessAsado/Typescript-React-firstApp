import loginAxiosInstance from "./loginAxiosInstance";
import { BACKEND_URL } from "config/constants";
import axiosInstanceJWT from "./axiosInstanceJWT";
export const authAPI = {
  login: function (loginInput: ILoginInput) {
    return loginAxiosInstance.post<LoginSuccessful>(
      BACKEND_URL.login(),
      loginInput
    );
  },
  register: async function (registerInput: IRegisterInput) {
    return loginAxiosInstance.post(BACKEND_URL.register(), registerInput);
  },
  logout: function () {
    return axiosInstanceJWT.get<void>(BACKEND_URL.logout());
  },
  refresh: function () {
    return axiosInstanceJWT.get<AccessTkn>(BACKEND_URL.refresh());
  },
};
