import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { LSTORAGE_KEY } from "config/constants";
import { useAppDispatch, useAppSelector } from "hooks/reduxDispatchAndSelector";
import { refresh } from "context/userSlice";

export const PersistLogin = () => {
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkStorage() {
      try {
        const storage = localStorage.getItem(LSTORAGE_KEY);
        if (storage && JSON.parse(storage)) {
          await dispatch(refresh());
        }
      } catch (error) {
        console.log(
          error,
          "esto deberia de ser dsp de devolver el error el interceptor"
        );
      } finally {
        setIsLoading(false);
      }
    }
    user ? setIsLoading(false) : checkStorage();
  }, [dispatch, user]);
  return isLoading ? <p>LOADING...</p> : <Outlet />;
};
