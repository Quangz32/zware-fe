import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginForm from "./Componnents/LoginForm/LoginForm";
// import Profile from "./Componnents/Profile/Profile";

import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import UserManage from "./Pages/UserManage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>

        {/* <Route path="/dashboard" element={<Sidebar />}></Route> */}
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/users" element={<UserManage />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
