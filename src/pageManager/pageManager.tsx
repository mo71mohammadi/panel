import React from "react";
import { Route, Switch } from "react-router-dom";
import EditPage from "./pages/prices";
import MainPage from "./pages/main";
import ProtectedRoute from "./Route";
import Login from './../components/profile/login'
import { ATCsPage, InteractionPage, PricesPage, LoginPage, SignUpPage } from "./pages";
import Cookies from 'js-cookie'


function PageManager() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={MainPage} />
      <ProtectedRoute path="/ATCs" component={ATCsPage} />
      <ProtectedRoute path="/Interaction" component={InteractionPage} />
      <ProtectedRoute path="/Prices" component={PricesPage} />
      <ProtectedRoute path="/Edit" component={EditPage} />
      <Route path="/Login" render={(props) => (<Login {...props} lastLocation={Cookies.get("currentUrl")} />)} />
      <Route path="/SignUp" component={SignUpPage} />
    </Switch>
  );
}

export default PageManager;
