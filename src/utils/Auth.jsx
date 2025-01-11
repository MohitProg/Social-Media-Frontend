import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const Auth = () => {
  const Navigate = useNavigate();
  const token = localStorage.getItem("auth-token");
  console.log(token ,"this is token")

  useEffect(() => {
    if (!token) {
      Navigate("login");
    }
  }, [token, Navigate]);

  return token ? <Outlet /> : null;
};

export default Auth;
