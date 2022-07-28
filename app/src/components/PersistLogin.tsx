import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axiosInstanceJWT, { setHeaders } from "API/axiosInstanceJWT";
import { ActionsEnum } from "Context/actions";
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
      if (user) {
        setHeaders(user.token);
        dispatch({ type: ActionsEnum.SUCCESS_LOGIN, payload: user });
      }
      setIsLoading(false);
    }
    user ? setIsLoading(false) : checkStorage();
  }, [dispatch, user]);
  return isLoading ? <p>LOADING...</p> : <Outlet />;
};
