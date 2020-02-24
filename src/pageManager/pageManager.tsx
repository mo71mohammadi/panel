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
      <Route path="/ATCs" component={ATCsPage} />
      <Route path="/Interaction" component={InteractionPage} />
      <Route path="/Prices" component={PricesPage} />
      <Route path="/Login" component={LoginPage} />
      <Route path="/SignUp" component={SignUpPage} />

      <Route path="/Edit" component={EditPage} />
    </Switch>
  );
}

export default PageManager;
