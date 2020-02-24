import React from "react";
import { Route, Switch } from "react-router-dom";
import EditPage from "./pages/prices";
import MainPage from "./pages/main";
import ProtectedRoute from './Route'

import {
  ATCsPage,
  InteractionPage,
  PricesPage,
  LoginPage,
  SignUpPage
} from "./pages";

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
      <ProtectedRoute path="/Logout" component={LoginPage} />

      <Route path="/Login" component={LoginPage} />
      <Route path="/SignUp" component={SignUpPage} />

      <Route path="/Edit" component={EditPage} />
    </Switch>
  );
}

export default PageManager;
