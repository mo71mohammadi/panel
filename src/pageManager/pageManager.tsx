import React from "react";
import { Route, Switch } from "react-router-dom";
import EditPage from "./pages/prices";
import MainPage from "./pages/main";
import ProtectedRoute from "./Route";
import Login from '../components/Profile/login'
import { ATCsPage, InteractionPage, PricesPage, SignUpPage, UserPage, RolePage } from "./pages";
import Cookies from 'js-cookie'


function PageManager() {
  return (
    <Switch>
      <ProtectedRoute exact path="/" component={MainPage} />
      <ProtectedRoute path="/ATCs" component={ATCsPage} />
      <ProtectedRoute path="/Interaction" component={InteractionPage} />
      <ProtectedRoute path="/Prices" component={PricesPage} />
      <ProtectedRoute path="/Edit" component={EditPage} />
      <ProtectedRoute path="/User" component={UserPage} />
      <ProtectedRoute path="/Role" component={RolePage} />

      <Route path="/Login" render={(props) => (<Login {...props} lastLocation={Cookies.get("currentUrl")} />)} />
      <Route path="/SignUp" component={SignUpPage} />
    </Switch>
  );
}

export default PageManager;
