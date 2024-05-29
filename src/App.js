import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./Componnents/Sidebar/Sidebar";
import Profile from "./Componnents/Profile/Profile";
import Home from "./Componnents/Home/Home";

// import Item from './Componennts/Item/Item';
// import Report from './Componennts/Report/Report';
// import Transaction from './Componennts/Transaction/Transaction';
import Login from "./Componnents/LoginForm/LoginForm";
// import ManagerList from "./Componnents/Management/ManagerList";
import Outbound from "./Componnents/Transaction/Outbound/Outbound";


import ManagerList from "./Componnents/Management/ManagerList";
import ProductList from "./Componnents/Product/ProductList";
import Inbound from "./Componnents/Transaction/Inbound/Inbound";

function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <main className="main">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/users" element={<ManagerList />} />
            <Route path="/outbound" element={<Outbound />} />
            <Route path="/inbound" element={<Inbound />} />
            <Route path="/login" element={<Login />} />

            <Route path="/products" element={<ProductList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
