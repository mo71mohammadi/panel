import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { LoginProvider } from "./components/login/loginState";
import Dashboard from "./pageManager/pages/dashboard";

const App = () => {

  return (
    <LoginProvider>
      <Dashboard />
    </LoginProvider>
  );
};

export default App;
