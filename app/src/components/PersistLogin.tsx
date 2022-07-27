import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axiosInstanceJWT from "API/axiosInstanceJWT";
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
      const user: UserNotNull = JSON.parse(maybeUser);
      axiosInstanceJWT.defaults.headers["auth-token"] = user?.token;
      dispatch({ type: ActionsEnum.SUCCESS_LOGIN, payload: user });
      setIsLoading(false);
    }
    user ? setIsLoading(false) : checkStorage();
  }, [dispatch, user]);
  return isLoading ? <p>LOADING...</p> : <Outlet />;
};
