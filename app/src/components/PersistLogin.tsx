import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axiosInstanceJWT from "API/axiosInstanceJWT";
import { ActionsEnum } from "Context/models";
import { useTareasGlobalContext } from "Hooks/useTareasGlobalContext";

export const PersistLogin = () => {
  const { user, dispatch } = useTareasGlobalContext();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    function checkStorage() {
      const maybeUser = localStorage.getItem("user");
      if (!maybeUser || maybeUser.indexOf('{"') !== 0) {
        /*----NO HAY USER GUARDADO U OBJECT-*/
        return setIsLoading(false);
      }
      /*HAY USER, CALL STATE MANAGEMENT*/
      const user: IUser = JSON.parse(maybeUser);
      axiosInstanceJWT.defaults.headers["auth-token"] = user?.token;
      dispatch({ type: ActionsEnum.SUCCESS_LOGIN, payload: user });
      setIsLoading(false);
    }
    user?._id ? setIsLoading(false) : checkStorage();
  }, [dispatch, user?._id]);
  return isLoading ? <p>LOADING...</p> : <Outlet />;
};
