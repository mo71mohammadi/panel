import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { LoginState } from "../components/profile/userState";
import Cookies from 'js-cookie'

export default function RouteWrapper({ component: Component, ...rest }: any) {
  const { login, setLogin } = useContext(LoginState);
  return (
    <Route
      {...rest}
      render={props => {
        if (!Cookies.get("Authorization")) {Cookies.set("currentUrl", props.location.pathname); return <Redirect to="/Login" /> }
        else return <Component {...props} />;
      }}
    />
  );
}
