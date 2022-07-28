import { authAPI } from "API/authAPI";
import { headerKey } from "API/axiosInstanceJWT";
import { setHeadersAndLStorage } from "config/utils";
import { createContext, useReducer } from "react";
import { ActionsEnum } from "./actions";
import { Actions, taskReducer } from "./reducer";

type CreateContProps = {
  dispatch: React.Dispatch<Actions>;
  login(input: ILoginInput): Promise<void>;
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
      const { data, headers } = await authAPI.lrealLogin(input);
      const user = { ...data, token: headers[headerKey] };
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
  function renderError(error: any) {
    alert("hubo un error");
    console.log(error);
    dispatch({
      type: ActionsEnum.FAILURE_FETCH_ALL,
      payload: error.response ? error.response.data : error.message,
    });
  }
  return (
    <TareasContext.Provider
      value={{
        ...state,
        dispatch,
        login,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
};

export { TareaContextProvider };
