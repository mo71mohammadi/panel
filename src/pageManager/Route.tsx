import React, { useState, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginState } from "../components/profile/userState";

export default function RouteWrapper({ component: Component, ...rest }: any) {
  const signed = false;
  const { login, setLogin } = useContext(LoginState);

  return (
    <Route
      {...rest}
      render={props => {
        console.log(props);

        if (!login.isAuthenticated) return <Redirect to="/Login" />;
        else if (props.location.pathname === "/Logout")
          setLogin({...login, isAuthenticated: false, authorization: undefined });
        else return <Component {...props} />;
      }}
    />
  );
}