import {useLocation,  Routes, Route, useLocation, BrowserRouter } from "react-router-dom";
import Profile from "./Componnents/Profile/Profile";
import Login from "./Componnents/LoginForm/LoginForm";
import Home from "./Componnents/Home/Home";
import UserManage from "./Componnents/Management/ManagerList";

import ProductList from "./Componnents/Product/ProductList";

import Outbound from "./Componnents/Transaction/Outbound/Outbound";
import TestAxios from "./Pages/TestAxios";
import Inbound from "./Componnents/Transaction/Inbound/Inbound";
import WarehouseManager from "./Componnents/WarehouseManagement/WarehouseManagement"; 
import DisposedGoods from "./Componnents/DisposedGoods/DisposedGoods";
import Sidebar from "./Componnents/Sidebar/Sidebar";


function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div>
      {!isLoginPage && <Sidebar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<UserManage />} />
        <Route path="/warehouse" element={<WarehouseManager />} />
        <Route path="/outbound" element={<Outbound />} />
        <Route path="/inbound" element={<Inbound />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/disposedgoods" element={<DisposedGoods />} />
        <Route path="/login" element={<Login />} />
        <Route path="/axios" element={<TestAxios />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;