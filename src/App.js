import React from 'react';
import { BrowserRouter as  Route, Routes } from 'react-router-dom';
import Sidebar from './Componnents/Sidebar/Sidebar';
import Profile from './Componnents/Profile/Profile';
// import LoginForm from './Componnents/LoginForm/LoginForm'
// import ManagerList from './Componnents/Management/ManagerList';
import ManagerList from './Componnents/Management/ManagerList';
// import AdminPanel from './Componnents/Management/AdminPanel';
// import Product from './Componnents/Product/Product';
// import AddProduct from './Componnents/Product/AddProduct';
import InventoryOutput from './InventoryOutput/InventoryOutput';
import ProductList from './Componnents/Product/ProductList';
function App() {
    return (
    //    <Profile />
            // <Sidebar>
            //     <Routes>                 
            //         <Route path="/profile" element={<Profile />} />                 
            //     </Routes>
            // </Sidebar>
           
            <div className="app">
            {/* <Product /> */}
            {/* <ProductList /> */}
      {/* <InventoryOutput /> */}
      <ManagerList />
  
          </div>
    
    
    );
}

export default App;
