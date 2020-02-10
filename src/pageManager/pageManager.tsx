import React, { Fragment, useState } from "react";
import {
  Route,
  Switch,
  Link,
  Redirect,
  useHistory,
  useLocation
} from "react-router-dom";
import EditPage from "./pages/editPage";
import  MainTable  from "./pages/mainTable";

function PageManager() {
  const locate = window.location.pathname;
  const history = useHistory();
  const location = useLocation();

  return (
    <Switch>
      <Route exact path="/" component={MainTable} />
      <Route path="/edit" component={EditPage} />
    </Switch>
  );
}

export default PageManager;
