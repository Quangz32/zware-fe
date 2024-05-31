import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import UserManage from "./Pages/UserManage";

import ProductList from "./Componnents/Product/ProductList";

import Outbound from "./Pages/Outbound";
import TestAxios from "./Pages/TestAxios";
import Inbound from "./Pages/Inbound";

function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/login" element={ <Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        
        {/* <Route path="/dashboard" element={<Sidebar />}></Route> */}
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/users" element={<UserManage />}></Route>
        <Route path="/outbound" element={<Outbound />}></Route>
        <Route path="/inbound" element={<Inbound />}></Route>
        <Route path="/products" element={<ProductList />}></Route>
        <Route path="/axios" element={<TestAxios />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
