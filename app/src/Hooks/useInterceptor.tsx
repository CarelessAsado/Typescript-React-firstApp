import { authAPI } from "API/authAPI";
import axiosPOSTLogin, { headerKey } from "API/axiosInstanceJWT";
import { BACKEND_URL } from "config/constants";
import { useRef } from "react";

export const useInterceptor = () => {
  useRef(
    axiosPOSTLogin.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        console.log("error en el interceptor");
        console.log(JSON.stringify(error));
        const previousRequest = error?.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !previousRequest?.sent &&
          error.config.url !== BACKEND_URL.refresh() // necessary to avoid infinite loop in case of failed refresh. If there's an error during refresh, before going to the catch, axios interceptor will intervene and the .sent is undefined
        ) {
          console.log(previousRequest?.sent);
          previousRequest.sent = true;
          try {
            const { data } = await authAPI.refresh();
            console.log(data, "ACCESS TOKEN AFTER REFRESH");
            if (data?.accessToken) {
              previousRequest.headers[headerKey] = data.accessToken;
            }
            return axiosPOSTLogin(previousRequest);
          } catch (error) {
            console.log("errorDuringRefresh, we will log you out");
          }
        }
        return Promise.reject(error);
      }
    )
  );

  return undefined;
};
