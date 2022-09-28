import axiosPOSTLogin, { headerKey } from "API/axiosInstanceJWT";
import { BACKEND_URL } from "config/constants";
import { refresh } from "context/userSlice";
import { useRef } from "react";
import { useAppDispatch } from "./reduxDispatchAndSelector";

export const useInterceptor = () => {
  const dispatch = useAppDispatch();
  useRef(
    axiosPOSTLogin.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error?.message === "canceled") return Promise.reject(error);

        const previousRequest = error?.config;
        if (
          (error?.response?.status === 401 ||
            error?.response?.status === 403) &&
          !previousRequest?.sent &&
          error.config.url !== BACKEND_URL.REFRESH
        ) {
          console.log(
            previousRequest?.sent,
            666,
            "ver xq no es successful",
            888
          );
          previousRequest.sent = true;

          try {
            const data = await dispatch(refresh()).unwrap();
            console.log(data, "ACCESS TOKEN AFTER REFRESH");
            if (data?.accessToken) {
              previousRequest.headers[headerKey] = data.accessToken;
            }
            return axiosPOSTLogin(previousRequest);
          } catch (error) {
            console.log(error);
            console.log("errorDuringRefresh, we will log you out");
          }
        }
        return Promise.reject(error);
      }
    )
  );

  return undefined;
};
