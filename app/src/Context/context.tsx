import { createContext, useReducer } from "react";
import { Actions, taskReducer } from "./reducer";

interface CreateContProps {
  user: IUser;
  tareas: ITarea[];
  error: boolean | string;
  isFetching: boolean;
  successRegister: string;
  dispatch: React.Dispatch<Actions>;
}

export const TareasContext = createContext<CreateContProps>(
  {} as CreateContProps
);

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
  return (
    <TareasContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </TareasContext.Provider>
  );
};

export { TareaContextProvider };
