import React from "react";
import { Redirect, Route } from "react-router-dom";
import Cookies from 'js-cookie'

export default function RouteWrapper({ component: Component, ...rest }: any) {
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
