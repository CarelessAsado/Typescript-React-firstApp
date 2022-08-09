import loginAxiosInstance from "./loginAxiosInstance";
import { BACKEND_URL } from "config/constants";
import axiosInstanceJWT from "./axiosInstanceJWT";
export const authAPI = {
  /*-------------------------LOGOUT-----------------------------*/
  /* ver si envio la cookie asi la borro en el backend */
  /*-------------------------LOGIN-----------------------------*/
  /*   login: async function (
    e: React.FormEvent<HTMLFormElement>,
    loginInput: ILoginInput,
    dispatch: React.Dispatch<Actions>,
    navigate: NavigateFunction,
    errorAssert: React.MutableRefObject<HTMLDivElement>
  ): Promise<void> {
    e.preventDefault();
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      // mando los headers ya directamente del backend 
      const { data, headers } = await loginAxiosInstance.post(
        "/auth/login",
        loginInput
      );
      const loggedUser = { ...data, token: headers["auth-token"] };
      dispatch({
        type: ActionsEnum.SUCCESS_LOGIN,
        payload: loggedUser,
      });
      setHeaders(loggedUser.token);
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/");
    } catch (error) {
      console.log(error);
       this.renderError(dispatch, error); 
      errorAssert?.current?.focus();
    }
  }, */
  login: function (loginInput: ILoginInput) {
    return axiosInstanceJWT.post<LoginSuccessful>(
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
