import { NavigateFunction } from "react-router-dom";
import { ActionsEnum } from "Context/actions";
import { Actions } from "Context/reducer";
import { IRegisterInput } from "pages/Register";
import loginAxiosInstance from "./loginAxiosInstance";
import axiosInstanceJWT, { setHeaders } from "./axiosInstanceJWT";
import { BACKEND_URL, LSTORAGE_KEY } from "config/constants";
export const authAPI = {
  renderError: (dispatch: React.Dispatch<Actions>, error: any) => {
    dispatch({
      type: ActionsEnum.FAILURE_FETCH_ALL,
      payload: error.response ? error.response.data : error.message,
    });
  },
  /*-------------------------REGISTER-----------------------------*/
  register: async function (
    e: React.FormEvent<HTMLFormElement>,
    registerInput: IRegisterInput,
    dispatch: React.Dispatch<Actions>,
    navigate: NavigateFunction,
    errorAssert: React.MutableRefObject<HTMLDivElement>
  ): Promise<void> {
    e.preventDefault();
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      await loginAxiosInstance.post("/auth/register", registerInput);
      dispatch({ type: ActionsEnum.SUCCESS_REGISTER });
      navigate("/login");
    } catch (error) {
      console.log(error);
      this.renderError(dispatch, error);
      errorAssert.current.focus();
    }
  },
  /*-------------------------LOGOUT-----------------------------*/
  logout: async function (
    dispatch: React.Dispatch<Actions>,
    navigate: NavigateFunction
  ): Promise<void> {
    dispatch({ type: ActionsEnum.LOG_OUT });
    setHeaders();
    localStorage.removeItem(LSTORAGE_KEY);
    navigate("/login");
  },
  /*-------------------------LOGIN-----------------------------*/
  login: async function (
    e: React.FormEvent<HTMLFormElement>,
    loginInput: ILoginInput,
    dispatch: React.Dispatch<Actions>,
    navigate: NavigateFunction,
    errorAssert: React.MutableRefObject<HTMLDivElement>
  ): Promise<void> {
    e.preventDefault();
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      /* mando los headers ya directamente del backend */
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
  },
  lrealLogin: async function (loginInput: ILoginInput) {
    return loginAxiosInstance.post<UserWithoutTkn>(
      BACKEND_URL.login(),
      loginInput
    );
  },
};
