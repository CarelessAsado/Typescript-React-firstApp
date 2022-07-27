import { ActionsEnum } from "Context/actions";
import { Actions } from "Context/reducer";
import axios from "./axiosInstanceJWT";

export const API = {
  renderError: (dispatch: React.Dispatch<Actions>, error: any) => {
    dispatch({
      type: ActionsEnum.FAILURE_FETCH_ALL,
      payload: error.response ? error.response.data : error.message,
    });
  },
  /*-----------------POST NEW TASK------------*/
  postNewTask: async function (
    userId: string,
    nameNewTask: string,
    dispatch: React.Dispatch<Actions>
  ): Promise<void> {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      const { data } = await axios.post(`/tasks/${userId}`, {
        name: nameNewTask,
      });
      dispatch({
        type: ActionsEnum.SUCCESS_POST_NEW_TASK,
        payload: data,
      });
    } catch (error: any) {
      console.log("hubo error", error.message);
      this.renderError(dispatch, error);
    }
  },
  updateDONE: async function (
    idTask: string,
    userID: string,
    done: boolean,

    dispatch: React.Dispatch<Actions>
  ): Promise<void> {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      const { data } = await axios.put(`/tasks/done/${userID}/${idTask}`, {
        done,
      });
      dispatch({
        type: ActionsEnum.SUCCESS_UPDATE_DONE,
        payload: data,
      });
    } catch (error: any) {
      console.log("hubo error", error.message);
      this.renderError(dispatch, error);
    }
  },
  updateNAME: async function (
    idTask: string,
    userID: string,
    name: string,

    dispatch: React.Dispatch<Actions>
  ): Promise<void> {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      const { data } = await axios.put(`/tasks/name/${userID}/${idTask}`, {
        name,
      });
      dispatch({
        type: ActionsEnum.SUCCESS_UPDATE_NAME,
        payload: data,
      });
    } catch (error: any) {
      this.renderError(dispatch, error);
    }
  },
  getTasks: async function (
    userID: string,
    dispatch: React.Dispatch<Actions>
  ): Promise<void> {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });

    try {
      const { data } = await axios.get(`/tasks/${userID}`);
      dispatch({
        type: ActionsEnum.SUCCESS_FETCH_ALL,
        payload: data,
      });
    } catch (error: any) {
      this.renderError(dispatch, error);
    }
  },
  deleteTask: async function (
    id: string,
    userID: string,
    dispatch: React.Dispatch<Actions>
  ): Promise<void> {
    dispatch({ type: ActionsEnum.START_FETCH_ALL });
    try {
      await axios.delete(`/tasks/${userID}/${id}`);
      dispatch({
        type: ActionsEnum.SUCCESS_DELETE,
        payload: id,
      });
    } catch (error: any) {
      this.renderError(dispatch, error);
    }
  },
};
