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
  accessToken: string;
} | null;
type UserNotNull = NonNullable<IUser>;
type UserWithoutTkn = Omit<UserNotNull, "accessToken">;
type AccessTkn = Pick<UserNotNull, "accessToken">;

type IRegisterInput = Pick<UserNotNull, "username" | "email"> & {
  password: string;
  confirmPassword: string;
};

type State = {
  tareas: ITarea[];
  user: IUser;
  error: boolean | string;
  isFetching: boolean;
  successRegister: string;
};

type ILoginInput = Pick<IUser, "email"> & {
  password: string;
};
