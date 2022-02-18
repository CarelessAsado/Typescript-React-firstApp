import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useTareasGlobalContext } from "../Hooks/useTareasGlobalContext";

export const ProtectedByAuth = () => {
  const { user } = useTareasGlobalContext();
  const location = useLocation();
  return user?._id ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};
