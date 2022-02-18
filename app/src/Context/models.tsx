export interface ITarea {
  name: string;
  _id: string;
  done: boolean;
  /*   createdAt: Date;
  updatedAt:Date; */
}
export interface IUser {
  username: string;
  _id: string;
  email: string;
  token: string;
}
export enum ActionsEnum {
  START_FETCH_ALL = "START_ALL_API_CALLS",
  FAILURE_FETCH_ALL = "FAILURE_FETCH_ALL",
  SUCCESS_FETCH_ALL = "SUCCESS_FETCH_ALL",
  SUCCESS_LOGIN = "SUCCESS_LOGIN",
  SUCCESS_REGISTER = "SUCCESS_REGISTER",
  SUCCESS_POST_NEW_TASK = "SUCCESS_POST_NEW_TASK",
  SUCCESS_DELETE = "SUCCESS_DELETE",
  SUCCESS_UPDATE_DONE = "SUCCESS_UPDATE_DONE",
  SUCCESS_UPDATE_NAME = "SUCCESS_UPDATE_NAME",
  LOG_OUT = "LOG_OUT",
  RESET_ERRORS = "RESET_ERRORS",
}
