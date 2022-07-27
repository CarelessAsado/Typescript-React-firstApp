interface ITarea {
  name: string;
  _id: string;
  done: boolean;
  /*   createdAt: Date;
  updatedAt:Date; */
}
type IUser = {
  username: string;
  _id: string;
  email: string;
  token: string;
} | null;

type State = {
  tareas: ITarea[];
  user: IUser;
  error: boolean | string;
  isFetching: boolean;
  successRegister: string;
};
