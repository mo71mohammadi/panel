import React from "react";
import { Route, Switch } from "react-router-dom";
import EditPage from "./pages/prices";
import MainPage from "./pages/main";
import ProtectedRoute from "./Route";

import {
  ATCsPage,
  InteractionPage,
  PricesPage,
  LoginPage,
  SignUpPage
} from "./pages";
import App from "../App";
import LOGINO from "./pages/LOGINo";

function PageManager() {
  //const locate = window.location.pathname;
  //const history = useHistory();
  // const location = useLocation();

  return (
    <Switch>
      <ProtectedRoute exact path="/" component={MainPage} />  
      <ProtectedRoute path="/ATCs" component={ATCsPage} />
      <ProtectedRoute path="/Interaction" component={InteractionPage} />
      <ProtectedRoute path="/Prices" component={PricesPage} />
      <ProtectedRoute path="/SignUp" component={SignUpPage} />
      <ProtectedRoute path="/Edit" component={EditPage} />
      <ProtectedRoute path="/Logout" component={LoginPage} />
      <Route path="/Login" component={LoginPage} />

    </Switch>
  );
}

export default PageManager;
