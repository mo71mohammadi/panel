import React, { useState, useContext } from "react";
import "./App.css";
import { Layout, Menu, Icon } from "antd";
import "antd/dist/antd.css";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { PageManager } from "./pageManager";
import { LoginProvider, LoginState } from "./components/login/loginState";
import LOGINO from "./pageManager/pages/LOGINo";
import Login from "./components/login/login";
import {
  LoginPage,
  ATCsPage,
  InteractionPage,
  PricesPage,
  MainPage,
  SignUpPage,
  EditPage
} from "./pageManager/pages";
import Dashboard from "./pageManager/pages/dashboard";
import ProtectedRoute from "./pageManager/Route";
import SignUp from "./components/user/signUp";

const { Header, Sider, Content, Footer } = Layout;

const App = () => {
  const [state, setState] = useState(true);
  const { login, setLogin } = useContext(LoginState);

  function onCollapse() {
    setState(!state);
  }

  return (
    <LoginProvider>
      <Router>
        <>
          {login.isAuthenticated ? (
            <Dashboard />
          ) : (
            <Switch>
              <ProtectedRoute exact path="/" component={Dashboard} />

              <ProtectedRoute path="/Drugs" component={MainPage} />
              <ProtectedRoute path="/ATCs" component={ATCsPage} />
              <ProtectedRoute path="/Interaction" component={InteractionPage} />

              <ProtectedRoute path="/Prices" component={PricesPage} />
              <ProtectedRoute path="/Edit" component={EditPage} />

              <Route path="/SignUp" component={SignUp} />

              <Route path="/Login" component={LoginPage} />
            </Switch>
          )}
        </>
      </Router>
    </LoginProvider>
  );
};

export default App;
