import React, { useContext, useEffect } from "react";
import "./App.css";
import "antd/dist/antd.css";
import { LoginProvider } from "./components/Profile/userState";
import Dashboard from "./pageManager/pages/dashboard";

const App = () => {
  return (
    <LoginProvider>
      <Dashboard />
    </LoginProvider>
  );
};

export default App;
