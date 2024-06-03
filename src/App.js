import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    
    <BrowserRouter>
    <div className="">
    <Sidebar />
      <Routes>
        
        <Route path="/" element={<App />}></Route>
        
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/users" element={<UserManage />}></Route>
        <Route path="/warehouse" element={<WarehouseManager />}></Route>
        <Route path="/outbound" element={<Outbound />}></Route>
        <Route path="/inbound" element={<Inbound />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/disposedgoods" element={<DisposedGoods />}></Route>
        <Route path="/axios" element={<TestAxios />}></Route>
      </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
