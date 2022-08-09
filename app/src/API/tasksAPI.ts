import { BACKEND_URL } from "config/constants";
import { ActionsEnum } from "Context/actions";
import { Actions } from "Context/reducer";
import axios from "./axiosInstanceJWT";

export const API = {
  renderError: (dispatch: React.Dispatch<Actions>, error: any) => {
    dispatch({
      type: ActionsEnum.FAILURE_FETCH_ALL,
      payload: error?.response?.data?.message || "Something went wrong. ",
    });
  },
  /*-----------------POST NEW TASK------------*/
  postNewTask(nameNewTask: string) {
    return axios.post<ITarea>(BACKEND_URL.tasks(), {
      name: nameNewTask,
    });
  },
  /*-------------------------------------------  */
  updateDONE(idTask: string, done: boolean) {
    return axios.put<ITarea>(`${BACKEND_URL.tasks()}/done/${idTask}`, {
      done,
    });
  },
  updateNAME(idTask: string, name: string) {
    return axios.put<ITarea>(`${BACKEND_URL.tasks()}/name/${idTask}`, {
      name,
    });
  },
  /* ------------------------------------------- */
  updateTask(task: ITarea) {
    return axios.put<ITarea>(`${BACKEND_URL.tasks()}/${task._id}`, task);
  },
  getTasks: function () {
    return axios.get<ITarea[]>(BACKEND_URL.tasks());
  },
  deleteTask: async function (id: string) {
    return axios.delete<void>(`${BACKEND_URL.tasks()}/${id}`);
  },
};
