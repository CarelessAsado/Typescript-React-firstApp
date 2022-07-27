import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useTareasGlobalContext } from "Hooks/useTareasGlobalContext";
import { FRONTEND_URL } from "config/constants";

export const ProtectedByAuth = () => {
  const { user } = useTareasGlobalContext();
  const location = useLocation();
  return user ? (
    <Outlet></Outlet>
  ) : (
    <Navigate
      to={FRONTEND_URL.login}
      state={{ from: location }}
      replace
    ></Navigate>
  );
};
