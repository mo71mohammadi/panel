import React, { Fragment, useState } from "react";
import {
  Route,
  Switch,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import { EditPage } from "./pages/editPage";

function PageManager() {
  const locate = window.location.pathname;
  const history = useHistory();
  const location = useLocation();

  return (
    <Switch>
      <Route path={"/edit"}  />
    </Switch>
  );
}

export default PageManager;
