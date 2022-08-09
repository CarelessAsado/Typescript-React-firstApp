import { authAPI } from "API/authAPI";
import { setHeaders } from "API/axiosInstanceJWT";
import { API } from "API/tasksAPI";
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
  getTasks(): Promise<void>;
  postNewTask(nameNewTask: string): Promise<void>;
  deleteTask(id: string, userID: string): Promise<void>;
  updateTask(task: ITarea, userID: string): Promise<void>;
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
      //dejar de recibir accessToken en HEADERS AXIOS
      const { data } = await authAPI.login(input);
      const user = data.user;
      dispatch({
        type: ActionsEnum.SUCCESS_LOGIN,
        payload: user,
      });
      /* SET HEADER AND LSTORAGE like authAPI.login,ver q guardo el token tmb con el user,creo q no lo necesito, si total lo uso solo p/el lstorage */
      setHeadersAndLStorage(user, data.accessToken);
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

  async function getTasks() {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      const { data } = await API.getTasks();
      console.log("volvio la data, vamos a despachar success fetch all");
      console.log(data);
      return dispatch({
        type: ActionsEnum.SUCCESS_FETCH_ALL,
        payload: data,
      });
    } catch (error) {
      renderError(error);
    }
  }

  async function postNewTask(nameNewTask: string) {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      const { data } = await API.postNewTask(nameNewTask);
      dispatch({
        type: ActionsEnum.SUCCESS_POST_NEW_TASK,
        payload: data,
      });
    } catch (error: any) {
      renderError(error);
    }
  }

  async function deleteTask(id: string, userID: string) {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      await API.deleteTask(id, userID);
      dispatch({
        type: ActionsEnum.SUCCESS_DELETE,
        payload: id,
      });
    } catch (error: any) {
      renderError(error);
    }
  }

  async function updateTask(task: ITarea, userID: string) {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      console.log(task, "ver porque viene en objeto");
      const { data } = await API.updateTask(task, userID);
      console.log(data.done, "ver q vuelve correctamente");
      dispatch({
        type: ActionsEnum.SUCCESS_UPDATE,
        payload: data,
      });
    } catch (error: any) {
      renderError(error);
    }
  }

  function renderError(error: any) {
    console.log(error?.config?.sent, "VER EL CONFIG");
    console.log(error.response);
    if (error?.config?.sent /* && error?.response?.status === 403 */) {
      console.log("aca es un error pos-refresh-token api call", error.config);
      return logout();
    }
    dispatch({
      type: ActionsEnum.FAILURE_FETCH_ALL,
      payload:
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. ",
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
        getTasks,
        postNewTask,
        deleteTask,
        updateTask,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
};

export { TareaContextProvider };
