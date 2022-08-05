import { authAPI } from "API/authAPI";
import { headerKey, setHeaders } from "API/axiosInstanceJWT";
import { LSTORAGE_KEY } from "config/constants";
import { setHeadersAndLStorage } from "config/utils";
import { createContext, useReducer } from "react";
import { ActionsEnum } from "./actions";
import { Actions, taskReducer } from "./reducer";

type CreateContProps = {
  dispatch: React.Dispatch<Actions>;
  login(input: ILoginInput): Promise<void>;
  register(input: IRegisterInput): Promise<true | undefined>;
  logout(): Promise<void>;
} & State;

export const TareasContext = createContext({} as CreateContProps);

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

const defaultState: State = {
  tareas: [],
  user: null,
  error: false,
  isFetching: false,
  successRegister: "",
};
const TareaContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer(taskReducer, defaultState);
  async function login(input: ILoginInput) {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      const { data, headers } = await authAPI.login(input);
      const user = { ...data, accessToken: headers[headerKey] };
      dispatch({
        type: ActionsEnum.SUCCESS_LOGIN,
        payload: user,
      });
      /* SET HEADER AND LSTORAGE like authAPI.login,ver q guardo el token tmb con el user,creo q no lo necesito, si total lo uso solo p/el lstorage */
      setHeadersAndLStorage(user);
    } catch (error) {
      renderError(error);
    }
  }

  async function register(input: IRegisterInput) {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      await authAPI.register(input);
      dispatch({ type: ActionsEnum.SUCCESS_REGISTER });
      return true;
    } catch (error) {
      renderError(error);
    }
  }

  async function logout() {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      await authAPI.logout();
      dispatch({ type: ActionsEnum.LOG_OUT });
      setHeaders();
      localStorage.removeItem(LSTORAGE_KEY);
    } catch (error) {
      renderError(error);
    }
  }
  function renderError(error: any) {
    console.log(error);
    console.log(error.response);
    dispatch({
      type: ActionsEnum.FAILURE_FETCH_ALL,
      payload: error?.response?.data?.message || "Something went wrong. ",
    });
  }
  return (
    <TareasContext.Provider
      value={{
        ...state,
        dispatch,
        login,
        register,
        logout,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
};

export { TareaContextProvider };
