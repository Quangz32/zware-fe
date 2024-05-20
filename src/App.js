import React from "react";
import { Outlet, BrowserRouter } from "react-router-dom";
import Sidebar from "./Componnents/Sidebar/Sidebar";
import Profile from "./Componnents/Profile/Profile";
import LoginForm from "./Componnents/LoginForm/LoginForm";

function App() {
  return (
    <div>
      <div className="row">
        <div className="col-lg-3">
          <Sidebar></Sidebar>
        </div>
        <div className="col-lg-9">{/* <Outlet></Outlet> */}</div>
      </div>
    </div>
  );
}

export default App;
