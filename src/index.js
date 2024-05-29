import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import UserManage from "./Pages/UserManage";

import ProductList from "./Componnents/Product/ProductList";

import Outbound from "./Pages/Outbound";
import TestAxios from "./Pages/TestAxios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        xml Copy
        {/* <Route path="/dashboard" element={<Sidebar />}></Route> */}
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/users" element={<UserManage />}></Route>
        <Route path="/outbound" element={<Outbound />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/axios" element={<TestAxios />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
